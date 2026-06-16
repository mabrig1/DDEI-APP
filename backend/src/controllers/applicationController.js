const Application = require('../models/Application');

async function createApplication(req, res) {
  const { fullName, email, phone, country, track, tier, motivation } = req.body;

  if (!fullName || !email || !phone || !country || !track || !tier || !motivation) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const application = await Application.create({
    user: req.userId || null,
    fullName,
    email,
    phone,
    country,
    track,
    tier,
    motivation,
  });

  res.status(201).json({ application });
}

async function listMyApplications(req, res) {
  const applications = await Application.find({ user: req.userId }).sort({ createdAt: -1 });
  res.json({ applications });
}

module.exports = { createApplication, listMyApplications };
