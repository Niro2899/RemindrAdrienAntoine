const express = require('express');

const rtrUsers = express.Router();
const userController = require('../Controllers/userController');

rtrUsers.get('/', userController.index);

rtrUsers.get('/create', userController.showLogin);
rtrUsers.post('/create', userController.create);

rtrUsers.get('/dashboard', userController.showDashboard);

module.exports = { rtrUsers };

