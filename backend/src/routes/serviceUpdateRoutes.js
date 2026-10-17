const express = require('express');
const { getPublic } = require('../controllers/serviceUpdateController');

const router = require('../utils/safeRouter')();

router.get('/', getPublic);

module.exports = router;

