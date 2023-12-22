const express = require('express');
const fileAuthMiddlewares = require('../Middlewares/Authentification/authMiddlewares');

const rtrUsers = express.Router();
const userController = require('../Controllers/userController');

//Sous-routeur groupes
const fileRtrGroupes = require('../Routers/groupesRouter');
rtrUsers.use('/groups', fileRtrGroupes.rtrGroupes);

rtrUsers.get('/', fileAuthMiddlewares.NecessitateAuth, userController.showIndex);

rtrUsers.get('/create', userController.showSignIn);
rtrUsers.post('/create', userController.create);

rtrUsers.get('/login', fileAuthMiddlewares.NecessitateNotAuth, userController.showSignUp);
rtrUsers.post('/login', userController.login);

rtrUsers.get('/logout', fileAuthMiddlewares.NecessitateAuth, userController.logout);

rtrUsers.get('/dashboard', fileAuthMiddlewares.NecessitateAuth, userController.showDashboard)


module.exports = { rtrUsers };

