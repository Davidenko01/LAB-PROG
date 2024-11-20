const { match } = require('assert');
const partidosModel = require('../models/partidosModel');

const getMatchesData = (req, res) => {
  const liga = req.query.liga;
  const team = req.query.equipo;
  if (!liga || !team) {
    return res.status(400).send({ error: 'Faltan parámetros: liga y/o equipo.' });
  }
  const matchesData = partidosModel.getPartidosDataByLiga(liga);
  if (!matchesData) {
    return res.status(404).send({ error: 'Liga no válida o no encontrada' });
  }
  const equipo = partidosModel.getTeamById(team, matchesData.teams);
  if (!equipo) {
    return res.status(404).send({ error: `No se encontró ese equipo.` });
  }
  const equipoSelect = {
    ...equipo,
    dir: matchesData.dir
  };
  res.send(equipoSelect);
};

const createMatch = (req, res) => {
  const dataNewMatch = req.body;
  const liga = req.query.liga;
  const team = req.query.equipo;

  if (!liga || !team) {
    return res.status(400).send({ error: 'Faltan parámetros: liga y/o equipo.' });
  }

  const validation = validateMatchData(dataNewMatch);
  if (!validation.valid) {
    return res.status(400).send({ error: validation.error });
  }

  const matchesData = partidosModel.getPartidosDataByLiga(liga);
  if (!matchesData) {
    return res.status(404).send({ error: 'Liga no válida o no encontrada' });
  }
  const equipo = partidosModel.getTeamById(team, matchesData.teams);
  if (!equipo) {
    return res.status(404).send({ error: `No se encontró ese equipo.` });
  }

  partidosModel.createMatch(dataNewMatch, equipo);

  res.json(equipo.last_5_matches);
};

const updateMatch = (req, res) => {
  const newMatchData = req.body;
  const liga = req.query.liga;
  const team = req.query.equipo;
  var date = req.query.date;

  if (!liga || !team || !date) {
    return res.status(400).send({ error: 'Faltan parámetros: liga y/o equipo.' });
  }

  date = date.split('/');
  // Comprobar si la fecha tiene la cantidad correcta de partes (día, mes, año)
  if (date.length === 3) {
    //Transformar al formato YYYY-MM-DD
    const year = `20${date[2]}`
    date = new Date(year, date[1] - 1, +date[0]);
    if (isNaN(date)) return res.status(400).send({ error: 'Fecha no valida'});
  } else {
    return res.status(400).send({ error: "Formato de fecha incorrecto" });
  }

  const validation = validateMatchData(newMatchData);
  if (!validation.valid) {
    return res.status(400).send({ error: validation.error });
  }

  const matchesData = partidosModel.getPartidosDataByLiga(liga);
  if (!matchesData) {
    return res.status(404).send({ error: 'Liga no válida o no encontrada' });
  }
  const equipo = partidosModel.getTeamById(team, matchesData.teams);
  if (!equipo) {
    return res.status(404).send({ error: `No se encontró ese equipo.` });
  }

  if (!partidosModel.updateMatch(newMatchData, equipo, date)) {
    return res.status(404).send({ error: `No se encontro un partido en la fecha ingresada, no se pudo actualizar la informacion` });
  }

  res.json(equipo.last_5_matches);
};


const validateMatchData = (data) => {
  const { opponent, team_score, opponent_score, date, stadium } = data;

  if (opponent !== undefined && (typeof opponent !== 'string' || opponent.trim().length === 0)) {
    return { valid: false, error: 'El nombre del equipo oponente es invalido' };
  }

  if (team_score !== undefined && (!Number.isInteger(team_score) || team_score < 0)) {
    return { valid: false, error: 'Score del equipo local invalido' };
  }

  if (opponent_score !== undefined && (!Number.isInteger(opponent_score) || opponent_score < 0)) {
    return { valid: false, error: 'Score del equipo visitante invalido' };
  }

  if (date !== undefined && (typeof date !== 'string' || isNaN(Date.parse(date)))) {
    return { valid: false, error: 'La fecha es invalida' };
  }

  if (stadium !== undefined && (typeof stadium !== 'string' || stadium.trim().length === 0)) {
    return { valid: false, error: 'El nombre del estadio es invalido' };
  }

  return { valid: true };
};



module.exports = { getMatchesData, createMatch, updateMatch };