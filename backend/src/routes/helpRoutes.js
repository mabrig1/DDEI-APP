const express = require('express');
const { chat } = require('../controllers/helpController');

const router = require('../utils/safeRouter')();

router.post('/chat', chat);

module.exports = router;

