const { getLigasInfo, getLigaDataById } = require('../models/tablasModel');

const getHeaderData = (req, res) => {
  const liga = req.query.liga;
  const ligasInfo = getLigasInfo(liga);

  if (ligasInfo.length === 0) {
    return res.status(400).json({ error: 'Liga no válida' });
  }
  res.json(ligasInfo[0]);
};


const getTableData = (req, res) => {
  const liga = req.query.liga;
  const ligaData = getLigaDataById(liga);

  if (!ligaData) {
    return res.status(400).json({ error: 'Liga no válida' });
  }
  res.json(ligaData);
};

module.exports = { getHeaderData, getTableData };



