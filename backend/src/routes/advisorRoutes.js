const express = require('express');
const { chat } = require('../controllers/advisorController');
const { requireAuth } = require('../middleware/auth');
const { requirePremium } = require('../middleware/access');

const router = express.Router();

router.post('/chat', requireAuth, requirePremium, chat);

module.exports = router;
