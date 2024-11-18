const express = require('express');
const tablasController = require('../controllers/tablasController');

const routerTablas = express.Router();

//Middleware
// routerTablas.use(express.json());

routerTablas.get('/', tablasController.getTableData);

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