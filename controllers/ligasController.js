const { getLigas } = require('../models/ligasModel');

const getLigasData = async (req, res) => {
  const ligasData = await getLigas();
  if (!ligasData) {
    return res.status(400).json({ error: 'No hay ligas' });
  }  
  res.json(ligasData);
};

module.exports = { getLigasData };