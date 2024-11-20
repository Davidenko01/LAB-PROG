const lpfaData = require('../json/partidoslpfa.json');
//const premier = require('../json/premier-league.json');
//const seriea = require('../json/serie-A.json');
//const laliga = require('../json/la-liga.json');
//const bundesliga = require('../json/bundesliga.json');
//const primerab = require('../json/primera-b.json');

const getPartidosDataByLiga = (liga) => {
    switch (liga) {
        case 'lpfa': return lpfaData;
        case 'pl': return null;
        case 'sa': return null;
        case 'll': return null;
        case 'bl': return null;
        case 'pb': return null;
        default: return null;
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

module.exports = { getPartidosDataByLiga, getTeamById, createMatch, updateMatch };
