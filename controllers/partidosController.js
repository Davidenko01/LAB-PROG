const { match } = require("assert");
const partidosModel = require("../models/partidosModel");

const getMatchesData = async (req, res) => {
  const liga = req.query.liga;
  const team = req.query.equipo;

  if (!liga || !team) {
    return res
      .status(400)
      .send({ error: "Faltan parámetros: liga y/o equipo." });
  }

  try {
    const matchesData = await partidosModel.getPartidosDataByLiga(liga, team);

    if (!matchesData) {
      return res.status(404).send({ error: "Liga o equipo no válidos" });
    }

    res.send(matchesData);
  } catch (error) {
    console.error("Error al obtener partidos:", error.message);
    res.status(500).send({ error: "Error interno del servidor" });
  }
};

const createMatch = (req, res) => {
  const dataNewMatch = req.body;
  const liga = req.query.liga;
  const team = req.query.equipo;

  if (!liga || !team) {
    return res
      .status(400)
      .send({ error: "Faltan parámetros: liga y/o equipo." });
  }

  const validation = validateMatchData(dataNewMatch);
  if (!validation.valid) {
    return res.status(400).send({ error: validation.error });
  }

  const matchesData = partidosModel.getPartidosDataByLiga(liga);
  if (!matchesData) {
    return res.status(404).send({ error: "Liga no válida o no encontrada" });
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
    return res
      .status(400)
      .send({ error: "Faltan parámetros: liga y/o equipo." });
  }

  date = date.split("/");
  // Comprobar si la fecha tiene la cantidad correcta de partes (día, mes, año)
  if (date.length === 3) {
    //Transformar al formato YYYY-MM-DD
    const year = `20${date[2]}`;
    date = new Date(year, date[1] - 1, +date[0]);
    if (isNaN(date)) return res.status(400).send({ error: "Fecha no valida" });
  } else {
    return res.status(400).send({ error: "Formato de fecha incorrecto" });
  }

  const validation = validateMatchData(newMatchData);
  if (!validation.valid) {
    return res.status(400).send({ error: validation.error });
  }

  const matchesData = partidosModel.getPartidosDataByLiga(liga);
  if (!matchesData) {
    return res.status(404).send({ error: "Liga no válida o no encontrada" });
  }
  const equipo = partidosModel.getTeamById(team, matchesData.teams);
  if (!equipo) {
    return res.status(404).send({ error: `No se encontró ese equipo.` });
  }

  if (!partidosModel.updateMatch(newMatchData, equipo, date)) {
    return res.status(404).send({
      error: `No se encontro un partido en la fecha ingresada, no se pudo actualizar la informacion`,
    });
  }

  res.json(equipo.last_5_matches);
};

const validateMatchData = (data) => {
  const { opponent, team_score, opponent_score, date, stadium } = data;

  if (
    opponent !== undefined &&
    (typeof opponent !== "string" || opponent.trim().length === 0)
  ) {
    return { valid: false, error: "El nombre del equipo oponente es invalido" };
  }

  if (
    team_score !== undefined &&
    (!Number.isInteger(team_score) || team_score < 0)
  ) {
    return { valid: false, error: "Score del equipo local invalido" };
  }

  if (
    opponent_score !== undefined &&
    (!Number.isInteger(opponent_score) || opponent_score < 0)
  ) {
    return { valid: false, error: "Score del equipo visitante invalido" };
  }

  if (
    date !== undefined &&
    (typeof date !== "string" || isNaN(Date.parse(date)))
  ) {
    return { valid: false, error: "La fecha es invalida" };
  }

  if (
    stadium !== undefined &&
    (typeof stadium !== "string" || stadium.trim().length === 0)
  ) {
    return { valid: false, error: "El nombre del estadio es invalido" };
  }

  return { valid: true };
};

const getProximosPartidos = (req, res) => {
  // Ahora solo requerimos el equipo_id
  const { equipo_id } = req.query;

  if (!equipo_id) {
    return res.status(400).json({ error: "Falta parámetro: equipo_id" });
  }

  try {
    const datos = partidosModel.leerPartidos();
    let todosLosPartidosDelEquipo = [];

    // Recorremos todas las ligas buscando los partidos donde juegue este equipo
    datos.ligas.forEach((liga) => {
      const partidos = liga.partidos.filter(
        (p) =>
          Number(p.equipo_local.id) === Number(equipo_id) ||
          Number(p.equipo_visitante.id) === Number(equipo_id),
      );
      todosLosPartidosDelEquipo = todosLosPartidosDelEquipo.concat(partidos);
    });

    // Devolvemos el resultado simulando la estructura original
    // para que el frontend (proximosData?.ligas?.[0]?.partidos) lo lea sin problemas
    res.json({
      ligas: [
        {
          partidos: todosLosPartidosDelEquipo,
        },
      ],
    });
  } catch (error) {
    console.error("Error al obtener próximos partidos:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const crearProximoPartido = (req, res) => {
  const { liga_id, equipo_local_id, equipo_visitante_id, fecha } = req.body;

  if (!liga_id || !equipo_local_id || !equipo_visitante_id || !fecha) {
    return res.status(400).json({ error: "Faltan campos requeridos" });
  }

  if (Number(equipo_local_id) === Number(equipo_visitante_id)) {
    return res.status(400).json({ error: "Los equipos no pueden ser iguales" });
  }

  const resultado = partidosModel.crearProximoPartido(
    liga_id,
    equipo_local_id,
    equipo_visitante_id,
    fecha,
  );
  if (!resultado.ok) return res.status(404).json({ error: resultado.error });

  res
    .status(201)
    .json({ message: "Partido creado", partido: resultado.partido });
};

const getLigas = (req, res) => {
  const datos = partidosModel.leerPartidos();
  const ligas = datos.ligas.map((l) => ({
    id: l.liga_id,
    name: l.nombre,
    logo: l.logo,
  }));
  res.json(ligas);
};

const getEquiposByLiga = (req, res) => {
  const { liga_id } = req.query;
  const datos = partidosModel.leerPartidos();
  const liga = datos.ligas.find((l) => l.liga_id === Number(liga_id));
  if (!liga) return res.status(404).json({ error: "Liga no encontrada" });
  res.json(liga.equipos);
};

module.exports = {
  getMatchesData,
  createMatch,
  updateMatch,
  getProximosPartidos,
  crearProximoPartido,
  getLigas,
  getEquiposByLiga,
};
