const express = require('express');

const routerPartidos = express.Router();
const controllerPartidos = require('../controllers/partidosController');


routerPartidos.use(express.json());

routerPartidos.get('/', controllerPartidos.getMatchesData);

routerPartidos.post('/', controllerPartidos.createMatch);

routerPartidos.patch('/', controllerPartidos.updateMatch);

module.exports = routerPartidos;