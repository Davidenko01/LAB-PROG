const lpfa = require('../json/partidoslpfa.json');
//const premier = require('../json/premier-league.json');
//const seriea = require('../json/serie-A.json');
//const laliga = require('../json/la-liga.json');
//const bundesliga = require('../json/bundesliga.json');
//const primerab = require('../json/primera-b.json');

const getPartidosDataById = (liga) => {
    switch (liga) {
        case 'lpfa': return lpfa;
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
    return array.filter(team => team.name === equipo);
}

module.exports = { getPartidosDataById, getTeamById };
