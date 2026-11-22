const express = require('express');
const { register, login, me, forgotPassword, resetPassword } = require('../controllers/authController');
const { requireAuth } = require('../middleware/auth');
const { sharedRateLimit } = require('../middleware/adminRateLimit');

const router = express.Router();

const authLimiter = sharedRateLimit('user-auth', 10, 15 * 60 * 1000, 'Learner sign-in');
const recoveryLimiter = sharedRateLimit('user-recovery', 5, 60 * 60 * 1000, 'Password recovery');

router.post('/register', authLimiter, register);
router.post('/login', authLimiter, login);
router.post('/forgot-password', recoveryLimiter, forgotPassword);
router.post('/reset-password', recoveryLimiter, resetPassword);
router.get('/me', requireAuth, me);

module.exports = router;
