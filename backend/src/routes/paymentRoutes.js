const express = require('express');
const { initializePayment, verifyPayment } = require('../controllers/paymentController');
const { optionalAuth } = require('../middleware/auth');

const router = express.Router();

router.post('/initialize', optionalAuth, initializePayment);
router.get('/verify/:reference', verifyPayment);

module.exports = router;
