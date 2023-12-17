
//Initialisation des données de la vue (user, messages d'erreur, notifications etc...)
function initData(req, res, next) {
  req.viewData = {
    //Informations de session
    sessionInfos: {
        //Informations de l'utilisateur connecté
        user: {}
    },
    //Messages personnalisés
    //Pourraient être utilisés pour afficher des alert d'erreur ou de notification
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