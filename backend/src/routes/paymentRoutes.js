const express = require('express');
const { initializePayment, verifyPayment, paystackWebhook, myPayments } = require('../controllers/paymentController');
const { optionalAuth, requireAuth } = require('../middleware/auth');
const { asyncHandler } = require('../middleware/asyncHandler');
const { rateLimit } = require('../middleware/security');

const router = express.Router();

router.post('/initialize', rateLimit({ windowMs: 15 * 60 * 1000, max: 10, namespace: 'payment-init' }), optionalAuth, asyncHandler(initializePayment));
router.get('/mine', requireAuth, asyncHandler(myPayments));
router.get('/verify/:reference', rateLimit({ windowMs: 15 * 60 * 1000, max: 20, namespace: 'payment-verify' }), optionalAuth, asyncHandler(verifyPayment));
router.post('/webhook', asyncHandler(paystackWebhook));

module.exports = router;
