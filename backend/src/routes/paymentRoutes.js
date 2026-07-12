const express = require('express');
const { initializePayment, verifyPayment } = require('../controllers/paymentController');
const { optionalAuth } = require('../middleware/auth');
const { asyncHandler } = require('../middleware/asyncHandler');

const router = express.Router();

router.post('/initialize', optionalAuth, asyncHandler(initializePayment));
router.get('/verify/:reference', asyncHandler(verifyPayment));

module.exports = router;
