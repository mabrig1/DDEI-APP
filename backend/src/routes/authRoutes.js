const express = require('express');
const { register, login, me, forgotPassword, resetPassword } = require('../controllers/authController');
const { requireAuth } = require('../middleware/auth');
const { rateLimit } = require('../middleware/security');

const router = express.Router();

const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10, namespace: 'user-auth' });
const recoveryLimiter = rateLimit({ windowMs: 60 * 60 * 1000, max: 5, namespace: 'user-recovery' });

router.post('/register', authLimiter, register);
router.post('/login', authLimiter, login);
router.post('/forgot-password', recoveryLimiter, forgotPassword);
router.post('/reset-password', recoveryLimiter, resetPassword);
router.get('/me', requireAuth, me);

module.exports = router;
