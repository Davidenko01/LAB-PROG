const express = require('express');
const ligasController = require('../controllers/ligasController');

const routerLigas = express.Router();

routerLigas.get('/', ligasController.getLigasData);

module.exports = routerLigas;