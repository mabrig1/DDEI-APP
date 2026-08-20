const express = require('express');
const { createApplication, listMyApplications } = require('../controllers/applicationController');
const { requireAuth, optionalAuth } = require('../middleware/auth');
const { rateLimit } = require('../middleware/security');

const router = express.Router();

router.post('/', rateLimit({ windowMs: 60 * 60 * 1000, max: 10, namespace: 'applications' }), optionalAuth, createApplication);
router.get('/me', requireAuth, listMyApplications);

module.exports = router;
