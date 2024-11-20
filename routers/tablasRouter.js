const express = require('express');
const tablasController = require('../controllers/tablasController');

const routerTablas = express.Router();

//Middleware
// routerTablas.use(express.json());

routerTablas.get('/', tablasController.getTableData);

routerTablas.get('/:liga', tablasController.getCantidad);

module.exports = routerTablas;