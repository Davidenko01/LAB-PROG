const express = require('express');

const routerPartidos = express.Router();
const controllerPartidos = require('../controllers/partidosController');

routerPartidos.get('/', controllerPartidos.getMatchesData);
    
module.exports = routerPartidos;