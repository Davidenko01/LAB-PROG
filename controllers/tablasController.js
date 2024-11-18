const { getLigaDataById } = require('../models/tablasModel');

const getTableData = (req, res) => {
  const liga = req.query.liga;
  const ligaData = getLigaDataById(liga);

  if (!ligaData) {
    return res.status(400).json({ error: 'Liga no válida' });
  }
  res.json(ligaData);
};

module.exports = { getTableData };



