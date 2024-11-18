const lpfa = require('../json/liga_argentina_posiciones.json');
const premier = require('../json/premier-league.json');
const seriea = require('../json/serie-A.json');
const laliga = require('../json/la-liga.json');
const bundesliga = require('../json/bundesliga.json');
const primerab = require('../json/primera-b.json');

const getLigaDataById = (liga) => {
    switch (liga) {
        case 'lpfa': return lpfa;
        case 'pl': return premier;
        case 'sa': return seriea;
        case 'll': return laliga;
        case 'bl': return bundesliga;
        case 'pb': return primerab;
        default: return null;
    }
};

module.exports = { getLigaDataById };
