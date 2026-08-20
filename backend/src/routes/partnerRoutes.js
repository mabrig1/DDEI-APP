const express = require('express');
const { asyncHandler } = require('../middleware/asyncHandler');
const { publicImpact, createInquiry } = require('../controllers/partnerController');

const router = express.Router();
router.get('/impact', asyncHandler(publicImpact));
router.post('/inquiries', asyncHandler(createInquiry));
module.exports = router;
