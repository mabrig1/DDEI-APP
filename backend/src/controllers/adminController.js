const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const Application = require('../models/Application');
const User = require('../models/User');
const Subscription = require('../models/Subscription');

const APPLICATION_STATUSES = ['pending', 'reviewing', 'accepted', 'rejected'];
const ADMIN_PREVIEW_EMAIL = 'admin-preview@destinyskillsbridge.internal';

async function login(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const validUsername = username === process.env.ADMIN_USERNAME;
  const validPassword =
    validUsername && (await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH || ''));

  if (!validUsername || !validPassword) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ sub: 'admin', isAdmin: true }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

  res.json({ token });
}

async function listApplications(req, res) {
  const applications = await Application.find().sort({ createdAt: -1 });
  res.json({ applications });
}

async function updateApplicationStatus(req, res) {
  const { status } = req.body;

  if (!APPLICATION_STATUSES.includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  const application = await Application.findByIdAndUpdate(req.params.id, { status }, { new: true });

  if (!application) {
    return res.status(404).json({ message: 'Application not found' });
  }

  res.json({ application });
}

async function listUsers(req, res) {
  const users = await User.find().sort({ createdAt: -1 });
  res.json({ users });
}

async function listSubscriptions(req, res) {
  const subscriptions = await Subscription.find()
    .populate('user', 'name email')
    .sort({ createdAt: -1 });
  res.json({ subscriptions });
}

async function setUserPremium(req, res) {
  const { isPremium } = req.body;

  if (typeof isPremium !== 'boolean') {
    return res.status(400).json({ message: 'isPremium must be true or false' });
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { isPremium, premiumExpiresAt: null },
    { new: true }
  );

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json({ user });
}

async function createAccessLink(req, res) {
  let user = await User.findOne({ email: ADMIN_PREVIEW_EMAIL });

  if (!user) {
    user = await User.create({
      name: 'Admin Preview',
      email: ADMIN_PREVIEW_EMAIL,
      password: crypto.randomBytes(16).toString('hex'),
      isPremium: true,
      premiumExpiresAt: null,
    });
  } else if (!user.isPremium) {
    user.isPremium = true;
    user.premiumExpiresAt = null;
    await user.save();
  }

  const token = jwt.sign({ sub: user._id.toString() }, process.env.JWT_SECRET, {
    expiresIn: '4h',
  });

  res.json({ token });
}

module.exports = {
  login,
  listApplications,
  updateApplicationStatus,
  listUsers,
  listSubscriptions,
  setUserPremium,
  createAccessLink,
};
