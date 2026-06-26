const express = require('express');
const { getPublic } = require('../controllers/serviceUpdateController');

const router = express.Router();

router.get('/', getPublic);

module.exports = router;
