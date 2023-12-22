const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const path = require('path');

async function findGroupsForUser(userID) {
    var groupes = await prisma.$queryRaw`CALL FindGroupsForUser(${parseInt(userID)})`;
    var groupesDetails = [];
    
    for (var i = 0; i < groupes.length; i++) {
        var fetchName = await prisma.groupes.findMany(
            {
            where: {
                idGroupe: groupes[i].f0
            },
            select: {
                nameGroupe: true,
            }
        }
        )
        try {
        var userPerGroups = await prisma.$queryRaw`CALL FindUsersForGroup(${groupes[i].f0})`;
        var remindersPerGroups = await prisma.$queryRaw`CALL FindRemindersForGroup(${groupes[i].f0})`;
        }
        catch (err) {
            console.log(err);
            return;
        }

        groupesDetails.push(
        {
            idGroupe: groupes[i].f0,
            nameGroupe: fetchName[0].nameGroupe,
            memberCount: userPerGroups.length,
            reminderCount: remindersPerGroups.length
        });
    }
    return groupesDetails;
};

async function findGroupDetails(idGroupe) {
    var fetchName = await prisma.groupes.findMany(
        {
        where: {
            idGroupe: parseInt(idGroupe)
        },
        select: {
            nameGroupe: true,
        }
    }
    )
    try {
    var userPerGroups = await prisma.$queryRaw`CALL FindUsersForGroup(${idGroupe})`;
    //var remindersPerGroups = await prisma.$queryRaw`CALL FindRemindersForGroup(${idGroupe})`;
    }
    catch (err) {
        console.log(err);
        return;
    }  
    
    return {
        idGroupe: idGroupe,
        nameGroupe: fetchName[0].nameGroupe,
        memberCount: userPerGroups.length,
        //reminderCount: remindersPerGroups.length,
        //Mise en page pour correspondre à viewData
        users: (userPerGroups.map(x => {return {idUser: x.f0, pseudoUser: x.f1}}))
    };
}

async function showGroupes(req, res) {
    try {
        req.viewData.Infos.userGroupes = await findGroupsForUser(req.session.user.idUser);
    }
    catch (err) {
        res.status(500).send(err.message);
        return;
    }

    res.render('User/Groups/dashboardGroups', req.viewData);
}

function showCreateGroup(req, res) {
    res.render('User/Groups/createGroup', req.viewData);
}

function createGroup(req, res) {
    if (!req.body.nameGroupe)
        return;

    prisma.groupes.create({
        data: {
            nameGroupe: req.body.nameGroupe,
            descriptionGroupe: req.body.descriptionGroupe,
            idCreator: req.session.user.idUser
        }
    })
    .then((result) => {
        res.redirect('/');
    });

    //Note: the user is automatically added to the group
    //when it is created with a SQL trigger on the SGBD.
}

async function showManageGroup(req, res) {
    if (req.query.reminderDeleted)
        req.viewData.messages.notification = "Le rappel a bien été supprimé !";
    else if (req.query.reminderCreated)
        req.viewData.messages.notification = "Le rappel a bien été créé !";
    else if (req.query.reminderEdited)
        req.viewData.messages.notification = "Le rappel a bien été modifié !";

    if (!req.params.idGroupe)
    {
        res.status(500).send("Tu n'as pas précisé de groupe à gérer !");
        return;
    }
    try {
        req.viewData.Infos.userGroupes = await findGroupsForUser(req.session.user.idUser);
    }
    catch (err) {
        res.status(500).send(err.message);
        return;
    }
    if (req.viewData.Infos.userGroupes.find(x => x.idGroupe == req.params.idGroupe) == undefined)
    {
        res.status(500).send("Tu n'es pas membre de ce groupe ! <a href='/'>Retourner à l'accueil</a>");
        return;
    }

    //Recherche des informations du groupe
    req.viewData.Infos.selectedGroupe = await findGroupDetails(req.params.idGroupe);

    //\todo Attention l'affichage affichera tout les utilisateurs du site.
    //Doit être amélioré pour n'afficher que les utilisateurs recherchés au bout du 3ème caractère.
    var globalMembers;
    try {
    globalMembers = await prisma.users.findMany({
        select: {
            idUser: true,
            pseudoUser: true
        }
    });
    }
    catch (err) {
        res.send(err);
        return;
    }
    try {
        req.viewData.Infos.reminders = await prisma.reminders.findMany({
            where: {
                idGroupe: parseInt(req.params.idGroupe)
            },
            select: {
                idReminder: true,
                name: true,
                date: true,
                description: true,
                idGroupe: true
            }
        });
    }
    catch (err) {
        console.log(err);
        return;
    }

    if (globalMembers[0].idUser || globalMembers[0].pseudoUser)
        req.viewData.Infos.globalMembers = globalMembers;
    else
        throw new Error("Pas d'utilisateur à ajouter trouvés");

    res.render(`User/Groups/manageGroup`, req.viewData);
}

async function inviteGroup(req, res) {
    if (!req.params.idGroupe || !req.params.idUser)
    {
        res.status(500).send("Pas de groupe ou d'utilisateur à inviter donné !");
        return;
    }
    try {
        req.viewData.Infos.userGroupes = await findGroupsForUser(req.session.user.idUser);
    }
    catch (err) {
        res.status(500).send(err.message);
        return;
    }
    if (req.viewData.Infos.userGroupes.find(x => x.idGroupe == req.params.idGroupe) == undefined)
    {
        res.status(500).send("Tu n'es pas membre de ce groupe !");
        return;
    }

    prisma.appartenir.create({
        data: {
            idGroupe: parseInt(req.params.idGroupe),
            idUser: parseInt(req.params.idUser)
        }
    })
    .then((result) => {
        res.redirect(`/users/groups/manage/${req.params.idGroupe}`);
    });
}

function showCreateReminder(req, res) {
    res.render('User/Groups/Reminders/createReminder', req.viewData);
}

async function createReminder(req, res) {
    if (!req.params.idGroupe)
    {
        res.status(500).send("Pas de groupe donné !");
        return;
    }
    if (!req.body.nameReminder)
    {
        res.status(500).send("Pas de nom de rappel donné !");
        return;
    }
    if (!req.body.dateReminder)
    {
        res.status(500).send("Pas de date de rappel donné !");
        return;
    }
    try {
        req.viewData.Infos.userGroupes = await findGroupsForUser(req.session.user.idUser);
    }
    catch (err) {
        res.status(500).send(err.message);
        return;
    }
    if (req.viewData.Infos.userGroupes.find(x => x.idGroupe == req.params.idGroupe) == undefined)
    {
        res.status(500).send("Tu n'es pas membre de ce groupe !");
        return;
    }

    var dateReminder = new Date(req.body.dateReminder);

    prisma.reminders.create({
        data: {
            name: req.body.nameReminder,
            description: req.body.descriptionReminder,
            date: dateReminder,
            createdByUser: req.session.user.idUser,
            idGroupe: parseInt(req.params.idGroupe)
        }
    })
    .then((result) => {
        res.redirect(`/users/groups/manage/${req.params.idGroupe}/?reminderCreated=true`);
    });
}

async function showEditReminder(req, res) {

    var infosReminder;
    try {
    infosReminder = await prisma.reminders.findUnique({
            where: {
                idReminder: parseInt(req.params.idReminder)
            },
            select: {
                idReminder: true,
                name: true,
                date: true,
                description: true,
                idGroupe: true
            }
        });
    }
    catch (err) {
        console.log(err);
        return;
    }

    //Adaptaption pour la vue
    infosReminder.date = infosReminder.date.toISOString().split('.000Z')[0];
    req.viewData.Infos.selectedReminder = infosReminder;

    console.log(req.viewData.Infos.selectedReminder);

    res.render('User/Groups/Reminders/editReminder', req.viewData);
}

function editReminder(req, res) {
    if (!req.params.idReminder)
    {
        res.status(500).send("Pas de rappel donné !");
        return;
    }

    prisma.reminders.update({
        where: {
            idReminder: parseInt(req.params.idReminder)
        },
        data: {
            name: req.body.nameReminder,
            description: req.body.descriptionReminder,
            //la date est en format ISO par défaut ce qui est compatible avec le type Date de MySQL !!
            //donc on a juste à la faire passer dans le constructeur Date pour que ça marche.
            date: new Date(req.body.dateReminder), 
        }
    })
    .then((result) => {
        res.redirect(`/users/groups/manage/${req.params.idGroupe}?reminderEdited=true`);
    });
}

function deleteReminder(req, res) {
    if (!req.params.idReminder)
    {
        res.status(500).send("Pas de rappel donné !");
        return;
    }

    prisma.reminders.delete({
        where: {
            idReminder: parseInt(req.params.idReminder)
        }
    })
    .then((result) => {
        res.redirect(`/users/groups/manage/${req.params.idGroupe}?reminderDeleted=true`);
    });
}

module.exports = {
    showGroupes,
    showCreateGroup,
    createGroup,
    showManageGroup,
    inviteGroup,
    showCreateReminder,
    createReminder,
    showEditReminder,
    editReminder,
    deleteReminder
};