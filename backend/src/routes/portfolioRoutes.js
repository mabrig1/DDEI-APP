const express = require('express');
const { generatePortfolio } = require('../controllers/portfolioController');
const { requireAuth } = require('../middleware/auth');
const { requirePremium } = require('../middleware/access');

const router = express.Router();

router.post('/generate', requireAuth, requirePremium, generatePortfolio);

module.exports = router;
