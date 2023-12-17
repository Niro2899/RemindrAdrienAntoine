const express = require('express');

const rtrMain = express.Router();
const mainController = require('../Controllers/mainController.js');

rtrMain.get('/', mainController.showHome);

module.exports = { rtrMain };