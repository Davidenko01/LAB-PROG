const express = require('express');
const tablasController = require('../controllers/tablasController');

const routerTablas = express.Router();

//Middleware
// routerTablas.use(express.json());

routerTablas.get('/', tablasController.getTableData);


module.exports = routerTablas;