const express = require('express');
const { ping } = require('../controllers/activityController');
const { requireAuth } = require('../middleware/auth');
const { rateLimit } = require('../middleware/security');

const router = require('../utils/safeRouter')();

router.post('/ping', rateLimit({ windowMs: 5 * 60 * 1000, max: 10, namespace: 'activity' }), requireAuth, ping);

module.exports = router;

