const express = require('express');
const { generatePortfolio } = require('../controllers/portfolioController');
const { optionalAuth } = require('../middleware/auth');

const router = express.Router();

router.post('/generate', optionalAuth, generatePortfolio);

module.exports = router;
