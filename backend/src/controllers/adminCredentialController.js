const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const AdminCredential = require('../models/AdminCredential');

const PRIMARY_KEY = 'primary';
const MIN_PASSWORD_LENGTH = 12;
// SHA-256 of a high-entropy, one-time recovery token. The token itself is never committed.
const RECOVERY_TOKEN_HASH = '86e800b60d6d41bac6bbea8780187f398748533cd2024752a85aa0145a7e8d55';

function signAdminToken() {
  return jwt.sign({ sub: 'admin', isAdmin: true }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
}

function validRecoveryToken(token) {
  if (!token || typeof token !== 'string') return false;
  const supplied = crypto.createHash('sha256').update(token).digest();
  const expected = Buffer.from(RECOVERY_TOKEN_HASH, 'hex');
  return supplied.length === expected.length && crypto.timingSafeEqual(supplied, expected);
}

function normalizeUsername(value) {
  return String(value || '').trim();
}

function validateCredentials(username, password) {
  if (username.length < 3) return 'Username must be at least 3 characters';
  if (!password || password.length < MIN_PASSWORD_LENGTH) {
    return `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;
  }
  return null;
}

async function login(req, res) {
  try {
    const username = normalizeUsername(req.body.username);
    const password = req.body.password;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const credential = await AdminCredential.findOne({ key: PRIMARY_KEY });

    let validUsername = false;
    let validPassword = false;

    if (credential) {
      validUsername = username.toLowerCase() === credential.username.toLowerCase();
      validPassword = validUsername && (await bcrypt.compare(password, credential.passwordHash));
    } else {
      // Backward-compatible fallback until the one-time recovery is completed.
      validUsername = username === process.env.ADMIN_USERNAME;
      validPassword =
        validUsername && (await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH || ''));
    }

    if (!validUsername || !validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    return res.json({ token: signAdminToken() });
  } catch (err) {
    console.error('Admin login failed:', err);
    return res.status(500).json({ message: 'Could not log in right now. Please try again.' });
  }
}

async function recover(req, res) {
  try {
    const recoveryToken = req.body.recoveryToken;
    const username = normalizeUsername(req.body.username);
    const password = req.body.password;

    const validationError = validateCredentials(username, password);
    if (validationError) return res.status(400).json({ message: validationError });

    if (!validRecoveryToken(recoveryToken)) {
      return res.status(401).json({ message: 'Invalid recovery token' });
    }

    const existing = await AdminCredential.findOne({ key: PRIMARY_KEY });
    if (existing) {
      return res.status(409).json({
        message: 'This recovery link has already been used. Sign in with the restored admin credentials.',
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    await AdminCredential.create({
      key: PRIMARY_KEY,
      username,
      passwordHash,
      recoveryUsedAt: new Date(),
      updatedBy: 'one-time-recovery',
    });

    return res.json({
      token: signAdminToken(),
      username,
      message: 'Admin access restored. The previous environment password is now overridden.',
    });
  } catch (err) {
    if (err && err.code === 11000) {
      return res.status(409).json({ message: 'Admin recovery has already been completed.' });
    }
    console.error('Admin recovery failed:', err);
    return res.status(500).json({ message: 'Could not restore admin access right now. Please try again.' });
  }
}

async function changeCredentials(req, res) {
  try {
    const username = normalizeUsername(req.body.username);
    const password = req.body.password;
    const validationError = validateCredentials(username, password);
    if (validationError) return res.status(400).json({ message: validationError });

    const passwordHash = await bcrypt.hash(password, 12);
    const credential = await AdminCredential.findOneAndUpdate(
      { key: PRIMARY_KEY },
      {
        $set: {
          username,
          passwordHash,
          recoveryUsedAt: new Date(),
          updatedBy: 'authenticated-admin',
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return res.json({
      username: credential.username,
      message: 'Admin credentials updated successfully.',
    });
  } catch (err) {
    console.error('Admin credential update failed:', err);
    return res.status(500).json({ message: 'Could not update admin credentials right now.' });
  }
}

module.exports = { login, recover, changeCredentials };
