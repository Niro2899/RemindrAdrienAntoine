const express = require('express');

const groupesController = require('../Controllers/groupesController.js');
const fileAuthMiddlewares = require('../Middlewares/Authentification/authMiddlewares');

const rtrGroupes = express.Router();

rtrGroupes.get('/', fileAuthMiddlewares.NecessitateAuth, groupesController.showGroupes);

rtrGroupes.get('/create', fileAuthMiddlewares.NecessitateAuth, groupesController.showCreateGroup);
rtrGroupes.post('/create', fileAuthMiddlewares.NecessitateAuth, groupesController.createGroup);

rtrGroupes.get('/manage/:idGroupe', fileAuthMiddlewares.NecessitateAuth, groupesController.showManageGroup);
rtrGroupes.post('/manage/:idGroupe/invite/:idUser', fileAuthMiddlewares.NecessitateAuth, groupesController.inviteGroup);

rtrGroupes.get('/manage/:idGroupe/reminders/create', fileAuthMiddlewares.NecessitateAuth, groupesController.showCreateReminder);
rtrGroupes.post('/manage/:idGroupe/reminders/create', fileAuthMiddlewares.NecessitateAuth, groupesController.createReminder);

rtrGroupes.get('/manage/:idGroupe/reminders/:idReminder/edit', fileAuthMiddlewares.NecessitateAuth, groupesController.showEditReminder);
rtrGroupes.post('/manage/:idGroupe/reminders/:idReminder/edit', fileAuthMiddlewares.NecessitateAuth, groupesController.editReminder);

rtrGroupes.get('/manage/:idGroupe/reminders/:idReminder/delete', fileAuthMiddlewares.NecessitateAuth, groupesController.deleteReminder);

module.exports = {rtrGroupes};
