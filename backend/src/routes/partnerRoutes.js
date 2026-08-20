const express = require('express');
const { asyncHandler } = require('../middleware/asyncHandler');
const { publicImpact, createInquiry } = require('../controllers/partnerController');
const { rateLimit } = require('../middleware/security');

const router = express.Router();
router.get('/impact', asyncHandler(publicImpact));
router.post('/inquiries', rateLimit({ windowMs: 60 * 60 * 1000, max: 5, namespace: 'partner-inquiries' }), asyncHandler(createInquiry));
module.exports = router;
