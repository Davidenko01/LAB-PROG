const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.API_KEY;
const BASE_URL = "https://api.football-data.org/v4/competitions";

const getLigaDataById = async (liga) => {
    if (!liga) return null;

    try {
        const { data } = await axios.get(`${BASE_URL}/${liga}/standings`, {
            headers: { 'X-Auth-Token': API_KEY },
        });

        const competition = data?.competition;
        const tabla = data?.standings?.[0]?.table;

        if (!competition?.id || !competition?.name || !competition?.emblem || !tabla) {
            console.warn("Respuesta inesperada:", JSON.stringify(data));
            return null;
        }

        const { id, name, emblem } = competition;

        return { id, name, emblem, tabla };

    } catch (error) {
        console.error(`Error al obtener datos de la liga ${liga}:`, error.message);
        return null;
    }
};

module.exports = { getLigaDataById };