const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const { sendPasswordResetEmail } = require('../utils/mailer');
const { logActivity, requestClientInfo } = require('../utils/activityLogger');
const { normalizeEmail, isValidEmail, passwordError, cleanText } = require('../utils/validation');

const TRIAL_DURATION_MS = 7 * 24 * 60 * 60 * 1000;
const RESET_TOKEN_DURATION_MS = 60 * 60 * 1000;

function signToken(user) {
  return jwt.sign({ sub: user._id.toString() }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
}

async function register(req, res) {
  try {
    const { password } = req.body;
    const name = cleanText(req.body.name, 120);
    const email = normalizeEmail(req.body.email);
    const track = cleanText(req.body.track, 128) || null;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'name, email and password are required' });
    }
    if (!isValidEmail(email)) return res.status(400).json({ message: 'Enter a valid email address' });
    const validationError = passwordError(password);
    if (validationError) return res.status(400).json({ message: validationError });

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'An account with this email already exists' });
    }

    const trialExpiresAt = new Date(Date.now() + TRIAL_DURATION_MS);
    const user = await User.create({ name, email, password, track, trialExpiresAt });
    const token = signToken(user);
    logActivity(user._id, user.name, 'signup', requestClientInfo(req));
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
    const email = normalizeEmail(req.body.email);
    const { password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'email and password are required' });
    }

    if (!isValidEmail(email)) return res.status(401).json({ message: 'Invalid email or password' });
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = signToken(user);
    logActivity(user._id, user.name, 'login', requestClientInfo(req));
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

async function forgotPassword(req, res) {
  try {
    const email = normalizeEmail(req.body.email);
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = isValidEmail(email) ? await User.findOne({ email }) : null;
    if (user) {
      const rawToken = crypto.randomBytes(32).toString('hex');
      user.resetPasswordToken = crypto.createHash('sha256').update(rawToken).digest('hex');
      user.resetPasswordExpires = new Date(Date.now() + RESET_TOKEN_DURATION_MS);
      await user.save();

      const frontendUrl = process.env.FRONTEND_URL || process.env.CLIENT_ORIGIN || 'http://localhost:5500';
      const resetUrl = `${frontendUrl}/?resetToken=${rawToken}`;
      await sendPasswordResetEmail(user, resetUrl);
    }

    // Always return the same response, whether or not the email is registered,
    // so this endpoint can't be used to discover which emails have accounts.
    res.json({ message: "If an account exists for that email, we've sent a password reset link." });
  } catch (err) {
    console.error('Forgot password failed:', err);
    res.status(500).json({ message: 'Could not process your request right now. Please try again.' });
  }
}

async function resetPassword(req, res) {
  try {
    const { token, password } = req.body;
    if (!token || !password) {
      return res.status(400).json({ message: 'Token and new password are required' });
    }
    const validationError = passwordError(password);
    if (validationError) return res.status(400).json({ message: validationError });

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!user) {
      return res.status(400).json({ message: 'This reset link is invalid or has expired. Please request a new one.' });
    }

    user.password = password;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    const jwtToken = signToken(user);
    res.json({ token: jwtToken, user });
  } catch (err) {
    console.error('Reset password failed:', err);
    res.status(500).json({ message: 'Could not reset your password right now. Please try again.' });
  }
}

module.exports = { register, login, me, forgotPassword, resetPassword };
