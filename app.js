const express = require('express');
const routerTablas = require('./routers/tablas.js');
//const routerPartidos = require('./routers/partidos.js');

const app = express();

app.use(express.static('public'));

//ROUTERS
app.use('/api/tablas', routerTablas);
// app.use('/api/partidos', routerPartidos);

//Routing
app.get('/api', (req, res) => {
  res.send('Primer server con EXPRESS!');
});

const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO, () => {
  console.log(`El servidor se encuentra escuchando en el puerto http://localhost:${PUERTO}`);
});