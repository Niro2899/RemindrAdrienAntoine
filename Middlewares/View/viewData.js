//Initialisation des données de la vue (user, messages d'erreur, notifications etc...)
//Devrait être séparé en plusieurs fonctions pour plus de clarté (une fonction par page).
function initData(req, res, next) {
  req.viewData = {
    //Informations de session
    sessionInfos: {
        //Informations de l'utilisateur connecté
        user: {}
    },
    Infos: {
        userGroupes: [
          idGroupe = 0,
          nameGroupe = "",
          memberCount = 0,
          reminderCount = 0
        ],
        selectedGroupe: {
          idGroupe: 0,
          nameGroupe: "",
          memberCount: 0,
          reminderCount: 0,
          users: [
            idUser = 0,
            pseudoUser = ""
          ]
        },
        globalMembers: [
          idUser = 0,
          pseudoUser = ""
        ],
        reminders: [
          idReminder = 0,
          name = "",
          date = "",
          description = "",
          idGroupe = 0,
        ],
        selectedReminder: {
          idReminder: 0,
          name: "",
          date: new Date(),
          description: "",
          idGroupe: 0,
        },
    },
    //Messages personnalisés
    //Peuvent être utilisés pour afficher des alert d'erreur ou de notification
    //Marche sur tout les templates car défini dans le layout
    //Je ne les utilise plus car je n'ai pas trouvé comment les utiliser avec les redirections
    //Mais à voir si on peut le faire
    messages: {
        error: "",
        notification: ""
    },
  };

  if (req.session.user)
  {
    req.viewData.sessionInfos.user = req.session.user;
  }

  next();
}

module.exports = {
    initData
    };