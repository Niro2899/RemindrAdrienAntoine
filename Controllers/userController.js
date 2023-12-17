//This Controller is forced to work with the Model Prisma.
//The Controller and the Model should be independant: to improve.

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const path = require('path');

async function showIndex (req, res) {
  res.render('User/index', req.viewData);
}

function showSignIn(req, res) {
  res.render('User/signIn', req.viewData);
}

function showSignUp(req, res) {
  if (req.query.logout)
  {
    req.viewData.messages.notification = "Vous êtes déconnecté."
  }

  res.render('User/signUp', req.viewData);
}

function showDashboard(req, res) {
  var vd = req.viewData;
  console.log(vd.sessionInfos.user.pseudoUser);
  res.render('User/fake_dashboard', req.viewData);
}

async function create (req, res) {

  const newUser = await prisma.users.create({
    data: {
      nameUser : req.body.name,
      pseudoUser : req.body.pseudo,
      mailUser : req.body.email,
      passwdUser : req.body.password,
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
    res.send('Login incorrect');
    return;
  }
  //On check si l'utilsateur existe et que 
  //le mot de passe est correct
  if (getUser.passwdUser == req.body.password)
  {
    var userInfos = {
    // store user information in session
    idUser: getUser.idUser,
    nameUser: getUser.nameUser,
    firstnameUser: getUser.firstnameUser,
    pseudoUser: getUser.pseudoUser,
    mailUser: getUser.mailUser
    }
  }
  else 
  {
    res.send('Mot de passe incorrect');
    return;
  }

  req.session.regenerate(function (err) {
    if (err)
    { 
      res.send(err);
      return;
      //next(err)
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