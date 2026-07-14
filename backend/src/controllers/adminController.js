const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const Application = require('../models/Application');
const User = require('../models/User');
const Subscription = require('../models/Subscription');
const { sendScholarshipEmail, sendCustomEmail } = require('../utils/mailer');

const APPLICATION_STATUSES = ['pending', 'reviewing', 'accepted', 'rejected'];
const SCHOLARSHIP_LEVELS = ['none', 'limited', 'full'];
const ADMIN_PREVIEW_EMAIL = 'admin-preview@destinyskillsbridge.internal';
const MESSAGE_CHANNELS = ['email', 'whatsapp'];
const BROADCAST_AUDIENCES = ['all', 'trial', 'premium', 'scholarship'];

async function resolveUserPhone(user) {
  if (user.phone) return user.phone;
  const application = await Application.findOne({
    $or: [{ user: user._id }, { email: user.email }],
  }).sort({ createdAt: -1 });
  return application ? application.phone : null;
}

function buildWhatsAppLink(phone, message) {
  const digits = phone.replace(/[^\d+]/g, '').replace(/^\+/, '');
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

async function resolveAudienceUsers(audience) {
  if (audience === 'premium') return User.find({ isPremium: true });
  if (audience === 'scholarship') return User.find({ scholarship: { $in: ['limited', 'full'] } });
  if (audience === 'trial') {
    const candidates = await User.find({ isPremium: false, scholarship: 'none' });
    const now = new Date();
    return candidates.filter((user) => user.trialEndsAt() > now);
  }
  return User.find();
}

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

async function setUserPassword(req, res) {
  const { password } = req.body;

  if (!password || password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters' });
  }

  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.password = password;
  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;
  await user.save();

  res.json({ user });
}

async function grantScholarship(req, res) {
  const { level } = req.body;

  if (!SCHOLARSHIP_LEVELS.includes(level)) {
    return res.status(400).json({ message: 'level must be one of: none, limited, full' });
  }

  const application = await Application.findById(req.params.id);

  if (!application) {
    return res.status(404).json({ message: 'Application not found' });
  }

  let user = null;
  let tempPassword = null;

  if (application.user) {
    user = await User.findById(application.user);
  }

  if (!user) {
    user = await User.findOne({ email: application.email });
  }

  if (!user && level !== 'none') {
    tempPassword = crypto.randomBytes(6).toString('hex');
    user = await User.create({
      name: application.fullName,
      email: application.email,
      password: tempPassword,
      track: application.track,
    });
    application.user = user._id;
  }

  if (user) {
    user.scholarship = level;
    await user.save();
  }

  application.scholarship = level;
  await application.save();

  if (level !== 'none') {
    await sendScholarshipEmail(application, level, tempPassword);
  }

  res.json({ application, user, tempPassword });
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
      scholarship: 'full',
    });
  } else if (!user.isPremium || user.scholarship !== 'full') {
    // Full scholarship = unrestricted: bypasses trial gates, paid-only
    // (pay-and-start) courses, the Tools Vault, and certificate fees.
    user.isPremium = true;
    user.premiumExpiresAt = null;
    user.scholarship = 'full';
    await user.save();
  }

  const token = jwt.sign({ sub: user._id.toString() }, process.env.JWT_SECRET, {
    expiresIn: '4h',
  });

  res.json({ token });
}

async function messageUser(req, res) {
  const { channel, subject, message } = req.body;

  if (!MESSAGE_CHANNELS.includes(channel)) {
    return res.status(400).json({ message: 'channel must be "email" or "whatsapp"' });
  }
  if (!message || !message.trim()) {
    return res.status(400).json({ message: 'Message is required' });
  }

  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (channel === 'email') {
    if (!subject || !subject.trim()) {
      return res.status(400).json({ message: 'Subject is required for email' });
    }
    const result = await sendCustomEmail(user.email, subject, message);
    if (!result.ok) {
      return res.status(502).json({ message: result.error || 'Could not send email' });
    }
    return res.json({ sent: true });
  }

  const phone = await resolveUserPhone(user);
  if (!phone) {
    return res.status(400).json({ message: `${user.name} has no phone number on file.` });
  }
  res.json({ whatsappLink: buildWhatsAppLink(phone, message) });
}

async function broadcastMessage(req, res) {
  const { channel, subject, message, audience } = req.body;

  if (!MESSAGE_CHANNELS.includes(channel)) {
    return res.status(400).json({ message: 'channel must be "email" or "whatsapp"' });
  }
  if (!BROADCAST_AUDIENCES.includes(audience)) {
    return res.status(400).json({ message: `audience must be one of: ${BROADCAST_AUDIENCES.join(', ')}` });
  }
  if (!message || !message.trim()) {
    return res.status(400).json({ message: 'Message is required' });
  }

  const users = await resolveAudienceUsers(audience);

  if (channel === 'email') {
    if (!subject || !subject.trim()) {
      return res.status(400).json({ message: 'Subject is required for email' });
    }
    let sent = 0;
    let failed = 0;
    for (const user of users) {
      const result = await sendCustomEmail(user.email, subject, message);
      if (result.ok) sent += 1;
      else failed += 1;
    }
    return res.json({ total: users.length, sent, failed });
  }

  const recipients = [];
  let skipped = 0;
  for (const user of users) {
    const phone = await resolveUserPhone(user);
    if (!phone) {
      skipped += 1;
      continue;
    }
    recipients.push({ name: user.name, email: user.email, whatsappLink: buildWhatsAppLink(phone, message) });
  }
  res.json({ recipients, skipped, total: users.length });
}

module.exports = {
  login,
  listApplications,
  updateApplicationStatus,
  listUsers,
  listSubscriptions,
  setUserPremium,
  setUserPassword,
  grantScholarship,
  createAccessLink,
  messageUser,
  broadcastMessage,
};
