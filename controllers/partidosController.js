const { match } = require('assert');
const { getPartidosDataById, getTeamById } = require('../models/partidosModel');

const getMatchesData = (req, res) => {
    const liga = req.query.liga;
    const team = req.query.equipo;
    if (!liga || !team) {
        return res.status(400).send({ error: 'Faltan parámetros: liga y/o equipo.' });
    }
    const matchesData = getPartidosDataById(liga);
    if (!matchesData) {
      return res.status(404).send({ error: 'Liga no válida o no encontrada' });
    }
    let equipo = getTeamById(team, matchesData.teams);
    if (equipo.length === 0) {
        return res.status(404).send({error: `No se encontró ese equipo.`});
    }
    const equipoSelect= {
        ...equipo[0],
        dir: matchesData.dir
    };
  res.send(equipoSelect);
  };
  
  module.exports = { getMatchesData };