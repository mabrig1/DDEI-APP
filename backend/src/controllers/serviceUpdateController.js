const ServiceUpdate = require('../models/ServiceUpdate');

async function getPublic(req, res) {
  const update = await ServiceUpdate.findOne().sort({ updatedAt: -1 });
  res.json({ update: update || null });
}

async function getAdmin(req, res) {
  const update = await ServiceUpdate.findOne().sort({ updatedAt: -1 });
  res.json({ update: update || null });
}

async function postUpdate(req, res) {
  const { message } = req.body;

  if (!message || !message.trim()) {
    return res.status(400).json({ message: 'message is required' });
  }

  const update = await ServiceUpdate.findOneAndUpdate(
    {},
    { message: message.trim() },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  res.json({ update });
}

module.exports = { getPublic, getAdmin, postUpdate };
