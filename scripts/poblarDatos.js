const fs = require('fs');
const path = require('path');
require('dotenv').config();

const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://api.football-data.org/v4';

const LIGAS = [
  { liga_id: 1, competition_code: 'PL',  nombre: 'Premier League', pais: 'Inglaterra' },
  { liga_id: 2, competition_code: 'SA',  nombre: 'Serie A',        pais: 'Italia'     },
  { liga_id: 3, competition_code: 'BL1', nombre: 'Bundesliga',     pais: 'Alemania'   },
  { liga_id: 4, competition_code: 'FL1', nombre: 'Ligue 1',        pais: 'Francia'    },
  { liga_id: 5, competition_code: 'PD',  nombre: 'La Liga',        pais: 'España'     },
];

const fetchConHeader = async (url) => {
  const res = await fetch(url, {
    headers: { 'X-Auth-Token': API_KEY }
  });
  if (!res.ok) throw new Error(`Error en ${url}: ${res.status}`);
  return res.json();
};

const esperar = (ms) => new Promise(r => setTimeout(r, ms));

const poblar = async () => {
  const resultado = { ligas: [] };

  for (const liga of LIGAS) {
    console.log(`Obteniendo equipos de ${liga.nombre}...`);

    const competencia = await fetchConHeader(`${BASE_URL}/competitions/${liga.competition_code}`);
    await esperar(6000);

    const data = await fetchConHeader(`${BASE_URL}/competitions/${liga.competition_code}/teams`);
    await esperar(6000);

    const equipos = data.teams.map(team => ({
      id: team.id,
      nombre: team.name,
      nombre_corto: team.shortName,
      escudo: team.crest,
    }));

    resultado.ligas.push({
      liga_id: liga.liga_id,
      nombre: liga.nombre,
      pais: liga.pais,
      logo: competencia.emblem,
      equipos,
      partidos: [],
    });

    console.log(`✅ ${liga.nombre} - ${equipos.length} equipos`);
  }

  const outputPath = path.join(__dirname, '../json/partidos.json');
  fs.writeFileSync(outputPath, JSON.stringify(resultado, null, 2));
  console.log('✅ partidos.json generado correctamente');
};

poblar();