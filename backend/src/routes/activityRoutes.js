const express = require('express');
const { ping } = require('../controllers/activityController');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.post('/ping', requireAuth, ping);

module.exports = router;
