const { getLigaDataById } = require('../models/tablasModel');

const getTableData = (req, res) => {
  const liga = req.query.liga;
  const ligaData = getLigaDataById(liga);
  if (!liga) {
    return res.status(400).json({ error: 'Parametro liga no especificado' });
  }

  if (!ligaData) {
    return res.status(400).json({ error: 'Liga no válida' });
  }
  
  res.json(ligaData);
};

const getCantidad = (req, res) => {
  const cantidad = req.query.cantidad;
  const from = req.query.from;
  const liga = req.params.liga;
  const ligaData = getLigaDataById(liga);

  if (!ligaData) {
    return res.status(400).json({ error: 'Liga no válida' });
  }

  if (!cantidad && !from) {
    return res.status(400).json({ error: 'Parametro rango no especificado' });
  }
  if (from < 0 && cantidad <= from && (cantidad + from) >= (ligaData.positions.length)) {
    return res.status(400).json({ error: 'Parametros no válidos' });
  } 

  const positions = ligaData.positions;
  const paginatedPositions = positions.slice(from, from + cantidad);

  return res.json(paginatedPositions);

};

module.exports = { getTableData , getCantidad};



