//This Controller is forced to work with the Model Prisma.
//The Controller and the Model should be independant: to improve.

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const path = require('path');
const bcrypt = require('bcrypt');

async function showIndex (req, res) {
  res.render('User/index', req.viewData);
}

function showSignIn(req, res) {
  res.render('User/signIn', req.viewData);
}

function showSignUp(req, res) {
  if (req.query.logout)
    req.viewData.messages.notification = "Vous êtes déconnecté."
  else if (req.query.wrongCredentials)
    req.viewData.messages.error = "Mot de passe ou login incorrect."


  res.render('User/signUp', req.viewData);
}

async function showDashboard(req, res) {
  console.log(req.viewData.sessionInfos.user.pseudoUser);

  //On récupère tout les rappels de l'utilisateur connecté
  //Il faut faire une requête qui récupère les rappels des groupes auxquels l'utilisateur appartient
  req.viewData.Infos.reminders = await prisma.reminders.findMany({
    where: {
      //Groupes auxquels l'utilisateur appartient
        groupes: {
          //Users correspondants à l'utilisateur connecté
            appartenir: {
                some: {
                    idUser: req.viewData.sessionInfos.user.idUser
                }
            }
        }
    },
    select: {
        idReminder: true,
        name: true,
        date: true,
        description: true,
        idGroupe: true,
        colorHex: true
    },
    orderBy: {
        date: 'desc'
    }
  });
  

  res.render('User/dashboardUser', req.viewData);
}

async function create (req, res) {

  const hashedPassword = await bcrypt.hash(req.body.password, 10)

  console.log(hashedPassword);

  const newUser = await prisma.users.create({
    data: {
      nameUser : req.body.name,
      pseudoUser : req.body.pseudo,
      mailUser : req.body.email,
      passwdUser : hashedPassword,
      firstnameUser : req.body.firstname,
    }
  });

  res.redirect(req.baseUrl + "/login");
  
}

async function login (req, res) {
  //On trouve l'utilsateur correspondant
  const getUser = await prisma.users.findFirst({
    where: {
      mailUser: req.body.email,
    },
  })
  if (!getUser)
  {
    res.redirect(req.baseUrl + "/login?wrongCredentials=true");
    return;
  }
  var userInfos = {};
  //On check si l'utilsateur existe et que 
  //le mot de passe est correct
  var bVerifPasswd = await bcrypt.compare(req.body.password, getUser.passwdUser);
  if (bVerifPasswd)
  {
      userInfos = {
      idUser: getUser.idUser,
      nameUser: getUser.nameUser,
      firstnameUser: getUser.firstnameUser,
      pseudoUser: getUser.pseudoUser,
      mailUser: getUser.mailUser 
      };
  }

  if (!userInfos.idUser) 
  {
    res.redirect(req.baseUrl + "/login?wrongCredentials=true")
    return;
  }

  req.session.regenerate(function (err) {
    if (err)
    { 
      res.send(err);
      return;
    }
    req.session.user = userInfos;
    // save the session before redirection to ensure page
    // load does not happen before session is saved
    req.session.save(function (err) {
      if (err)
      { 
        res.send(err);
        return;
        //next(err)
      }

      res.redirect(req.baseUrl);
    })
  })
}

function logout (req, res) {
  req.session.destroy(function (err) {
    if (err)
    {
      res.send(err)
      return;
    }
    else
    res.redirect(req.baseUrl + "/login?logout=true");
  })

}

module.exports = {
  showIndex,
  showSignUp,
  showSignIn,
  showDashboard,

  create,
  login,
  logout
};