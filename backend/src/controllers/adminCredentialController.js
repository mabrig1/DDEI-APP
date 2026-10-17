const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const AdminCredential = require('../models/AdminCredential');
const { sendAdminRecoveryEmail, sendAdminPasswordChangedEmail } = require('../utils/mailer');

const PRIMARY_KEY = 'primary';
const MIN_PASSWORD_LENGTH = 12;

function signAdminToken(credential) {
  return jwt.sign({ sub: 'admin', isAdmin: true, sv: credential?.sessionVersion || null }, process.env.JWT_SECRET, {
    expiresIn: process.env.ADMIN_JWT_EXPIRES_IN || '4h',
  });
}

function validRecoveryToken(token) {
  if (!token || typeof token !== 'string') return false;
  const recoveryTokenHash = String(process.env.ADMIN_RECOVERY_TOKEN_HASH || '');
  if (!/^[a-f0-9]{64}$/i.test(recoveryTokenHash)) return false;
  const supplied = crypto.createHash('sha256').update(token).digest();
  const expected = Buffer.from(recoveryTokenHash, 'hex');
  return supplied.length === expected.length && crypto.timingSafeEqual(supplied, expected);
}

function normalizeUsername(value) {
  return typeof value === 'string' ? value.trim().slice(0, 254) : '';
}

function validateCredentials(username, password) {
  if (username.length < 3) return 'Username must be at least 3 characters';
  if (typeof password !== 'string' || password.length < MIN_PASSWORD_LENGTH) {
    return `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;
  }
  if (Buffer.byteLength(password, 'utf8') > 72) return 'Password must be no more than 72 bytes (shorten special characters if needed).';
  return null;
}

async function login(req, res) {
  try {
    const username = normalizeUsername(req.body.username);
    const password = req.body.password;

    if (!username || typeof password !== 'string' || !password || Buffer.byteLength(password, 'utf8') > 72) {
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
      validUsername = username.toLowerCase() === String(process.env.ADMIN_USERNAME || process.env.ADMIN_RECOVERY_EMAIL || '').trim().toLowerCase();
      validPassword =
        validUsername && (await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH || ''));
    }

    if (!validUsername || !validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    return res.json({ token: signAdminToken(credential) });
  } catch (err) {
    console.error('Admin login failed');
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
    const credential = await AdminCredential.create({
      key: PRIMARY_KEY,
      username,
      passwordHash,
      recoveryUsedAt: new Date(),
      updatedBy: 'one-time-recovery',
      sessionVersion: crypto.randomUUID(),
    });

    return res.json({
      token: signAdminToken(credential),
      username,
      message: 'Admin access restored. The previous environment password is now overridden.',
    });
  } catch (err) {
    if (err && err.code === 11000) {
      return res.status(409).json({ message: 'Admin recovery has already been completed.' });
    }
    console.error('Admin recovery failed');
    return res.status(500).json({ message: 'Could not restore admin access right now. Please try again.' });
  }
}

async function changeCredentials(req, res) {
  try {
    const username = normalizeUsername(req.body.username);
    const password = req.body.password;
    const validationError = validateCredentials(username, password);
    if (validationError) return res.status(400).json({ message: validationError });

    const existing = await AdminCredential.findOne({ key: PRIMARY_KEY });
    const currentHash = existing?.passwordHash || process.env.ADMIN_PASSWORD_HASH || '';
    if (typeof req.body.currentPassword !== 'string' || Buffer.byteLength(req.body.currentPassword, 'utf8') > 72 || !(await bcrypt.compare(req.body.currentPassword, currentHash))) {
      return res.status(401).json({ message: 'Enter your current administrator password to change credentials.' });
    }
    const passwordHash = await bcrypt.hash(password, 12);
    const credential = await AdminCredential.findOneAndUpdate(
      { key: PRIMARY_KEY, sessionVersion: req.adminSessionVersion || null },
      {
        $set: {
          username,
          passwordHash,
          recoveryUsedAt: new Date(),
          updatedBy: 'authenticated-admin',
          sessionVersion: crypto.randomUUID(),
          resetTokenHash: null,
          resetExpiresAt: null,
          resetEmail: null,
        },
      },
      { upsert: !existing, new: true, setDefaultsOnInsert: true }
    );

    if (!credential) return res.status(401).json({ message: 'Your admin session has ended. Please sign in again.' });
    return res.json({
      token: signAdminToken(credential),
      username: credential.username,
      message: 'Admin credentials updated successfully.',
    });
  } catch (err) {
    console.error('Admin credential update failed');
    return res.status(500).json({ message: 'Could not update admin credentials right now.' });
  }
}


const RECOVERY_MESSAGE = 'If that address matches the administrator recovery email, a reset link will arrive shortly. Check your inbox and spam folder. Use the newest email; links expire after 30 minutes.';
const INVALID_LINK = 'This reset link has expired, was already used, or was replaced by a newer request. Request a fresh link below.';
const hashToken = (token) => crypto.createHash('sha256').update(token).digest('hex');
const recoveryEmail = () => String(process.env.ADMIN_RECOVERY_EMAIL || '').trim().toLowerCase();

function recoveryUrl(token) {
  // Never trust Host, Origin, or a client-supplied redirect for credential links.
  const origin = new URL(process.env.ADMIN_RECOVERY_ORIGIN || 'https://ddei.online');
  if (origin.protocol !== 'https:' || origin.username || origin.password) throw new Error('Invalid recovery origin');
  const url = new URL('/admin-recovery', origin.origin);
  url.hash = `token=${token}`; // Not sent to web-server logs or referrer headers.
  return url.toString();
}

async function forgotPassword(req, res) {
  try {
    const email = recoveryEmail();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !process.env.RESEND_API_KEY) {
      return res.status(503).json({ message: 'Email recovery is not configured yet. Please contact the site owner.' });
    }
    const suppliedEmail = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : '';
    if (!suppliedEmail || suppliedEmail.length > 254) return res.status(400).json({ message: 'Enter your administrator recovery email.' });
    if (suppliedEmail !== email) return res.json({ message: RECOVERY_MESSAGE });

    const token = crypto.randomBytes(32).toString('hex');
    const url = recoveryUrl(token);
    // Preserve the environment credentials during initial migration. Requesting a
    // reset does not change the password, username, or validity of current sessions.
    let credential = await AdminCredential.findOne({ key: PRIMARY_KEY });
    if (!credential) {
      const passwordHash = process.env.ADMIN_PASSWORD_HASH;
      if (!/^\$2[aby]\$\d{2}\$/.test(passwordHash || '')) {
        return res.status(503).json({ message: 'Administrator credentials need owner configuration before recovery can begin.' });
      }
      try {
        credential = await AdminCredential.create({
          key: PRIMARY_KEY, username: process.env.ADMIN_USERNAME || email,
          passwordHash, updatedBy: 'environment-migration',
        });
      } catch (err) { if (err.code !== 11000) throw err; }
    }
    const now = new Date();
    const tokenHash = hashToken(token);
    // A global per-account cooldown also prevents email flooding across IPs.
    const issued = await AdminCredential.findOneAndUpdate({
      key: PRIMARY_KEY,
      $or: [{ resetRequestedAt: null }, { resetRequestedAt: { $lte: new Date(now.getTime() - 60000) } }],
    }, { $set: {
      resetTokenHash: tokenHash, resetExpiresAt: new Date(now.getTime() + 30 * 60 * 1000),
      resetRequestedAt: now, resetEmail: email,
    } }, { new: true });
    if (!issued) return res.json({ message: RECOVERY_MESSAGE });
    try {
      await sendAdminRecoveryEmail(email, url);
    } catch (_) {
      // Only clear this issuance; do not clobber a newer request or log its URL.
      await AdminCredential.updateOne({ key: PRIMARY_KEY, resetTokenHash: tokenHash }, {
        $set: { resetTokenHash: null, resetExpiresAt: null, resetEmail: null, resetRequestedAt: null },
      });
      console.error('Administrator recovery email delivery failed');
      return res.status(503).json({ message: 'The recovery email could not be sent. Please try again shortly. If this continues, the site owner must check the email provider configuration.' });
    }
    return res.json({ message: RECOVERY_MESSAGE });
  } catch (_) {
    console.error('Administrator email recovery unavailable');
    return res.status(503).json({ message: 'Recovery is temporarily unavailable. Please try again shortly.' });
  }
}

async function resetPassword(req, res) {
  try {
    const { token, password } = req.body;
    if (typeof token !== 'string' || !/^[a-f0-9]{64}$/.test(token)) {
      return res.status(400).json({ code: 'INVALID_RESET_LINK', message: INVALID_LINK });
    }
    const email = recoveryEmail();
    const validationError = validateCredentials(email, password);
    if (validationError) return res.status(400).json({ message: validationError });
    const tokenHash = hashToken(token);
    const filter = { key: PRIMARY_KEY, resetTokenHash: tokenHash, resetEmail: email, resetExpiresAt: { $gt: new Date() } };
    const existing = await AdminCredential.findOne(filter);
    if (!existing) return res.status(400).json({ code: 'INVALID_RESET_LINK', message: INVALID_LINK });
    const passwordHash = await bcrypt.hash(password, 12);
    // The final expiry check and token consumption are one atomic write: only
    // one concurrent request can succeed, and bcrypt time cannot extend expiry.
    const credential = await AdminCredential.findOneAndUpdate({ ...filter, resetExpiresAt: { $gt: new Date() } }, {
      $set: { username: email, passwordHash, sessionVersion: crypto.randomUUID(),
        resetTokenHash: null, resetExpiresAt: null, resetEmail: null,
        recoveryEmail: email, recoveryEmailVerifiedAt: new Date(),
        recoveryUsedAt: new Date(), updatedBy: 'verified-email-recovery' },
    }, { new: true });
    if (!credential) return res.status(400).json({ code: 'INVALID_RESET_LINK', message: INVALID_LINK });
    let notificationSent = true;
    try { await sendAdminPasswordChangedEmail(email); }
    catch (_) { notificationSent = false; console.error('Administrator password-change notification failed'); }
    return res.json({ username: email, notificationSent,
      message: 'Your administrator email is verified and your password has been reset. All previous admin sessions are signed out. Sign in with your recovery email and new password.' });
  } catch (_) {
    console.error('Administrator password reset unavailable');
    return res.status(503).json({ message: 'Could not reset your password right now. Please try again shortly.' });
  }
}

module.exports = { login, recover, changeCredentials, forgotPassword, resetPassword };
