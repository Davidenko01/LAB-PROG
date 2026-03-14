const axios = require('axios');
const NodeCache = require('node-cache');
require('dotenv').config();

const API_KEY = process.env.API_KEY;
const BASE_URL = "https://api.football-data.org/v4/competitions";
const LEAGUE_IDS = ["PL", "SA", "BL1", "FL1", "PD"]; // Argentina, Premier, Serie A, La Liga

//600 segs
const cache = new NodeCache({ stdTTL: 600 });

const getLigas = async () => {
  const cacheKey = "ligas";

  //Verifico si ya hay datos en cache
  const cachedLigas = cache.get(cacheKey);
  if (cachedLigas) {
    console.log("Devolviendo ligas desde cache");
    return cachedLigas;
  }
  //Sino consulto a la API
  try {
    const responses = await Promise.all(
      LEAGUE_IDS.map(id =>
        axios.get(`${BASE_URL}/${id}`, {
          headers: {
            'X-Auth-Token': API_KEY
          }
        })
      )
    );

    //Por cada respuesta
    const ligas = responses.map(res => {
      const data = res.data;
      //Verifico que lo retornado sea correcto
      if (!data || !data.id || !data.name) {
        console.warn("Respuesta inesperada:", JSON.stringify(data));
        return null;
      }
      //Me quedo con el id, name y logo
      const { id, name, emblem} = data;
      const country = data.area?.name;
      return { id, name, emblem, country };
    }).filter(Boolean);

    //Guardar en cache
    cache.set(cacheKey, ligas);
    console.log("Ligas obtenidas y guardadas en cache");

    //Retorno las ligas
    return ligas;

  } catch (error) {
    console.error("Error al obtener datos de las ligas:", error.message);
    return [];
  }
};

module.exports = { getLigas };
