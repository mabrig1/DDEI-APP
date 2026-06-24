const jwt = require('jsonwebtoken');
const Application = require('../models/Application');
const User = require('../models/User');
const { sendApplicationNotification } = require('../utils/mailer');

const TRIAL_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

function signToken(user) {
  return jwt.sign({ sub: user._id.toString() }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
}

async function createApplication(req, res) {
  try {
    const { fullName, email, phone, country, track, tier, motivation, password } = req.body;

    if (!fullName || !email || !phone || !country || !track || !tier || !motivation) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    let userId = req.userId || null;
    let token = null;
    let user = null;

    // Anonymous applicants need an account created so they can log in and
    // track their application — requireAuth only covers users who were
    // already logged in when they opened the form.
    if (!userId) {
      if (!password || password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters' });
      }

      const existing = await User.findOne({ email: email.toLowerCase() });
      if (existing) {
        if (!(await existing.comparePassword(password))) {
          return res.status(409).json({ message: 'An account with this email already exists. Log in first, then submit your application.' });
        }
        user = existing;
      } else {
        const trialExpiresAt = new Date(Date.now() + TRIAL_DURATION_MS);
        user = await User.create({ name: fullName, email, password, track, trialExpiresAt });
      }
      userId = user._id;
      token = signToken(user);
    }

    const application = await Application.create({
      user: userId,
      fullName,
      email,
      phone,
      country,
      track,
      tier,
      motivation,
    });

    await sendApplicationNotification(application);

    const response = { application };
    if (token) {
      response.token = token;
      response.user = user;
    }
    res.status(201).json(response);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'An account with this email already exists. Log in first, then submit your application.' });
    }
    console.error('Create application failed:', err);
    res.status(500).json({ message: 'Could not submit your application right now. Please try again.' });
  }
}

async function listMyApplications(req, res) {
  const applications = await Application.find({ user: req.userId }).sort({ createdAt: -1 });
  res.json({ applications });
}

module.exports = { createApplication, listMyApplications };
