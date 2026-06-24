const jwt = require('jsonwebtoken');
const User = require('../models/User');

const TRIAL_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

function signToken(user) {
  return jwt.sign({ sub: user._id.toString() }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
}

async function register(req, res) {
  try {
    const { name, email, password, track } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'name, email and password are required' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: 'An account with this email already exists' });
    }

    const trialExpiresAt = new Date(Date.now() + TRIAL_DURATION_MS);
    const user = await User.create({ name, email, password, track: track || null, trialExpiresAt });
    const token = signToken(user);
    res.status(201).json({ token, user });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'An account with this email already exists' });
    }
    console.error('Register failed:', err);
    res.status(500).json({ message: 'Could not create your account right now. Please try again.' });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'email and password are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = signToken(user);
    res.json({ token, user });
  } catch (err) {
    console.error('Login failed:', err);
    res.status(500).json({ message: 'Could not log you in right now. Please try again.' });
  }
}

async function me(req, res) {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user });
  } catch (err) {
    console.error('Fetch profile failed:', err);
    res.status(500).json({ message: 'Could not load your account right now. Please try again.' });
  }
}

module.exports = { register, login, me };
