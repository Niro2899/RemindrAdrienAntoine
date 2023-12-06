//This Controller is forced to work with the Model Prisma.
//The Controller and the Model should be independant: to improve.

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function index (req, res) {
  res.send('Hello, world!');
  //\todo: appeler fonctions de Prisma & de la vue Handlebars
  
}

function showLogin (req, res) {
  res.send('Hello, world!');
}

async function create (req, res) {

  const newUser = await prisma.user.create({
    data: {
      nameUser : req.body.name,
      firstnameUser : req.body.firstname,
      pseudoUser : req.body.pseudo,
      mailUser : req.body.email,
      passwdUser : req.body.password,
    }
  });
}

module.exports = { index, showLogin, create };