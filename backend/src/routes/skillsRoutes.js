const express = require('express');
const { listSkills } = require('../controllers/skillsController');

const router = require('../utils/safeRouter')();

router.get('/', listSkills);

module.exports = router;

