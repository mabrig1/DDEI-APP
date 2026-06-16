const express = require('express');
const { listSkills } = require('../controllers/skillsController');

const router = express.Router();

router.get('/', listSkills);

module.exports = router;
