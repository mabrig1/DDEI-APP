const express = require('express');
const { chat } = require('../controllers/advisorController');

const router = express.Router();

router.post('/chat', chat);

module.exports = router;
