const express = require('express');
const { initializePayment, verifyPayment, paystackWebhook, myPayments } = require('../controllers/paymentController');
const { optionalAuth, requireAuth } = require('../middleware/auth');
const { asyncHandler } = require('../middleware/asyncHandler');
const { sharedRateLimit } = require('../middleware/adminRateLimit');

const router = express.Router();

router.post('/initialize', sharedRateLimit('payment-init', 10, 15 * 60 * 1000, 'Payment service'), optionalAuth, asyncHandler(initializePayment));
router.get('/mine', requireAuth, asyncHandler(myPayments));
router.get('/verify/:reference', sharedRateLimit('payment-verify', 20, 15 * 60 * 1000, 'Payment verification'), optionalAuth, asyncHandler(verifyPayment));
router.post('/webhook', asyncHandler(paystackWebhook));

module.exports = router;
