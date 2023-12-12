//This Controller is forced to work with the Model Prisma.
//The Controller and the Model should be independant: to improve.

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function index (req, res) {
  res.send('Hello, world!');
  //\todo: appeler fonctions de Prisma & de la vue Handlebars
  
}

function showLogin (req, res) {
  res.send(`<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=*, initial-scale=1.0">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossorigin="anonymous">
      <title>formulaire_inscription</title>
  </head>
  <body>
      <form method="post">
          <div class="form-group">
            <label for="nom">Nom</label>
            <input type="text" class="form-control" id="exampleInputEmail1" name = "name">
          </div>
          <div class="form-group">
            <label for="prenom">Prenom</label>
            <input type="text" class="form-control" id="exampleInputEmail1" name = "firstname">
          </div>
          <div class="form-group">
            <label for="pseudo">Pseudo</label>
            <input type="text" class="form-control" id="exampleInputEmail1" name = "pseudo">
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" id="exampleInputEmail1" name = "email" aria-describedby="emailHelp" placeholder="Enter email">
          </div>
          <div class="form-group">
            <label for="mdp">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" name = "password" placeholder="Password">
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
  </body>
  </html>
  
  firstnameUser`);
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

  res.redirect('../Templates/Users/dashboardUser.hbs');
  
}

module.exports = { index, showLogin, create };