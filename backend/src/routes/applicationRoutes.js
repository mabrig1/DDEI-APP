const express = require('express');
const { createApplication, listMyApplications } = require('../controllers/applicationController');
const { requireAuth, optionalAuth } = require('../middleware/auth');

const router = express.Router();

router.post('/', optionalAuth, createApplication);
router.get('/me', requireAuth, listMyApplications);

module.exports = router;
