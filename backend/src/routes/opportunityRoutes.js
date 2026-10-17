const express = require('express');
const { listOpportunities } = require('../controllers/skillsController');

const router = require('../utils/safeRouter')();

router.get('/', listOpportunities);

module.exports = router;

