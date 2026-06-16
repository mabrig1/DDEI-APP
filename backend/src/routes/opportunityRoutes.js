const express = require('express');
const { listOpportunities } = require('../controllers/skillsController');

const router = express.Router();

router.get('/', listOpportunities);

module.exports = router;
