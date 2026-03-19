const lpfaData = require('../json/partidoslpfa.json');
//const premier = require('../json/premier-league.json');
//const seriea = require('../json/serie-A.json');
//const laliga = require('../json/la-liga.json');
//const bundesliga = require('../json/bundesliga.json');
//const primerab = require('../json/primera-b.json');

const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.API_KEY;
const BASE_URL = "https://api.football-data.org/v4";

const fs = require('fs');
const path = require('path');

const PARTIDOS_PATH = path.join(__dirname, '../json/partidos.json');

const getPartidosDataByLiga = async (liga, equipo) => {
  try {
    if (!liga || !equipo) return null;

    const { data: teamData } = await axios.get(`${BASE_URL}/teams/${equipo}`, {
      headers: { 'X-Auth-Token': API_KEY },
    });

    const team = teamData.name;

    const { data: competitionData } = await axios.get(`${BASE_URL}/competitions/${liga}`, {
      headers: { 'X-Auth-Token': API_KEY },
    });

    const competition = competitionData.name;

    const { data: matchesData } = await axios.get(`${BASE_URL}/teams/${equipo}/matches`, {
      headers: { 'X-Auth-Token': API_KEY },
      params: { competitions: liga },
    });

    const matches = matchesData.matches.map((match) => ({
      date: match.utcDate,
      id: match.id,
      homeTeam: {
        id: match.homeTeam.id,
        shortName: match.homeTeam.shortName,
        crest: match.homeTeam.crest,
      },
      awayTeam: {
        id: match.awayTeam.id,
        shortName: match.awayTeam.shortName,
        crest: match.awayTeam.crest,
      },
      score: {
        home: match.score.fullTime.home,
        away: match.score.fullTime.away,
        winner: match.score.winner,
      },
    }));

    return { team, competition, matches };

  } catch (error) {
    console.error(`Error al obtener datos:`, error.message);
    return null;
  }
};

const getTeamById = (equipo, array) => {
    if (!Array.isArray(array)) return [];
    return array.find(team => team.name === equipo);
};

const createMatch = (matchData, team) => {
    const teamName = matchData.opponent.toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/\([^)]*\)/g, '') 
          .replace(/[^a-z0-9]/g, '');

    matchData = {
        ...matchData,
        icon: `${teamName}.png`
    };

    if (!team.last_5_matches) {
        team.last_5_matches = []; 
      }
    team.last_5_matches.push(matchData);
};

const updateMatch = (newMatchData, equipo, date) => {
    date = date.toISOString().split('T')[0]; 
//    console.log(new Date().getTimezoneOffset());
    const matchIndex = equipo.last_5_matches.findIndex(match => 
        ((new Date(match.date)).toISOString().split('T')[0]) === date);

    if (matchIndex === -1) return false;

    equipo.last_5_matches[matchIndex] ={
        ...equipo.last_5_matches[matchIndex],
        ...newMatchData
      };

    return true;
};


/* PARTE NUEVA DE LOS PROXIMOS PARTIDOS */
const leerPartidos = () => {
  const raw = fs.readFileSync(PARTIDOS_PATH, 'utf-8');
  return JSON.parse(raw);
};

const guardarPartidos = (datos) => {
  fs.writeFileSync(PARTIDOS_PATH, JSON.stringify(datos, null, 2));
};

const getProximosPartidos = (ligaId, equipoId) => {
  const datos = leerPartidos();
  const liga = datos.ligas.find(l => l.liga_id === Number(ligaId));
  if (!liga) return null;

  const partidos = liga.partidos.filter(p =>
    p.equipo_local.id === Number(equipoId) ||
    p.equipo_visitante.id === Number(equipoId)
  );

  return { liga: liga.nombre, logo: liga.logo, partidos };
};

const crearProximoPartido = (ligaId, equipoLocalId, equipoVisitanteId, fecha) => {
  const datos = leerPartidos();

  const liga = datos.ligas.find(l => l.liga_id === Number(ligaId));
  if (!liga) return { ok: false, error: 'Liga no encontrada' };

  const equipoLocal = liga.equipos.find(e => e.id === Number(equipoLocalId));
  const equipoVisitante = liga.equipos.find(e => e.id === Number(equipoVisitanteId));

  if (!equipoLocal || !equipoVisitante) {
    return { ok: false, error: 'Uno o ambos equipos no pertenecen a esta liga' };
  }

  // ID autoincremental
  const todosLosPartidos = datos.ligas.flatMap(l => l.partidos);
  const maxId = todosLosPartidos.reduce((max, p) => Math.max(max, p.partido_id), 0);

  const nuevoPartido = {
    partido_id: maxId + 1,
    fecha,
    estado: 'programado',
    equipo_local: {
      id: equipoLocal.id,
      nombre: equipoLocal.nombre,
      escudo: equipoLocal.escudo,
    },
    equipo_visitante: {
      id: equipoVisitante.id,
      nombre: equipoVisitante.nombre,
      escudo: equipoVisitante.escudo,
    },
  };

  liga.partidos.push(nuevoPartido);
  guardarPartidos(datos);

  return { ok: true, partido: nuevoPartido };
};

module.exports = { 
  getPartidosDataByLiga, 
  getTeamById, 
  createMatch, 
  updateMatch,
  getProximosPartidos,
  crearProximoPartido,
};
