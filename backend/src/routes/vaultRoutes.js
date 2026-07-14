const express = require('express');
const { getVault } = require('../controllers/vaultController');
const { asyncHandler } = require('../middleware/asyncHandler');

const router = express.Router();

router.get('/', asyncHandler(getVault));

module.exports = router;
