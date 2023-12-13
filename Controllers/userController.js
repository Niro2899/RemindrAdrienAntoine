//This Controller is forced to work with the Model Prisma.
//The Controller and the Model should be independant: to improve.

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const path = require('path');

async function index (req, res) {
  res.send('Hello, world!');
  //\todo: appeler fonctions de Prisma & de la vue Handlebars
  
}

function showLogin (req, res) {
  const createUserPath = path.join(__dirname, '..', 'Static', 'Users', 'createUser.html');
  res.sendFile(createUserPath);
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

  res.redirect(req.baseUrl + "/dashboard");
  
}


module.exports = { index, showLogin, create};