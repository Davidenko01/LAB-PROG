const express = require('express');

const lpfa = require('../json/liga_argentina_posiciones.json');
const premier= require('../json/premier-league.json');
const seriea= require('../json/serie-A.json');
const laliga  = require('../json/la-liga.json');
const bundesliga = require('../json/bundesliga.json');
const primerab = require('../json/primera-b.json');
const {ligas} = require('../json/ligas-info.json');

const routerTablas = express.Router();

//Middleware
routerTablas.use(express.json());

routerTablas.get('/header', (req, res) => {
  const liga = req.query.liga;
  const resultados = ligas.filter(element => element.liga === liga);
  
  if (resultados.length === 0) {
    return res.status(400).json({ error: 'Liga no válida' });
  }
  res.json(resultados[0]);
});

routerTablas.get('/', (req, res) => {
  const liga = req.query.liga;
  let ligaSelect;
  switch (liga) {
    case 'lpfa': ligaSelect = lpfa; break;
    case 'pl': ligaSelect = premier; break;
    case 'sa': ligaSelect = seriea; break;
    case 'll': ligaSelect = laliga; break;
    case 'bl': ligaSelect = bundesliga; break;
    case 'pb': ligaSelect = primerab; break;
    default: return res.status(400).json({ error: 'Liga no válida' });
  }
  res.json(ligaSelect);
});
/*
routerProgramacion.get('/:lenguaje/:nivel', (req, res) => {
  const lenguaje = req.params.lenguaje;
  const nivel = req.params.nivel;
  const resultados = programacion.filter(curso => curso.lenguaje === lenguaje && curso.nivel === nivel);
  if (resultados.length === 0) {
    return res.status(404).send(`No se encontraron cursos de ${lenguaje} de nivel ${nivel}.`);
  }
  res.send(resultados);
});

//POST

routerProgramacion.post('/', (req, res) => {
  let cursoNuevo = req.body;
  programacion.push(cursoNuevo);
  res.send(programacion);
});

//PUT

routerProgramacion.put('/:id', (req, res) => {
  const cursoActualizado = req.body;
  const id = req.params.id;

  const indice = programacion.findIndex(curso => curso.id == id);

  if(indice >= 0) {
    programacion[indice] = cursoActualizado;
  }
  res.send(programacion);
});

//PATCH

routerProgramacion.patch('/:id', (req, res) => {
  const infoActualizada = req.body;
  const id = req.params.id;

  const indice = programacion.findIndex(curso => curso.id == id);

  if(indice >= 0) {
    const cursoAModificar = programacion[indice];
    Object.assign(cursoAModificar, infoActualizada);
  }
  res.send(programacion);
});

//DELETE

routerProgramacion.delete('/:id', (req, res) => {
  const id = req.params.id;

  const indice = programacion.findIndex(curso => curso.id == id);

  if(indice >= 0) {
    programacion.splice(indice, 1);
  }
  res.send(programacion);
});
*/
module.exports = routerTablas;