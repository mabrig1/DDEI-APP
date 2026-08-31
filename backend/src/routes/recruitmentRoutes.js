const express = require('express');
const {
  createRecruitmentApplication,
  listMyRecruitmentApplications,
} = require('../controllers/recruitmentController');
const { optionalAuth, requireAuth } = require('../middleware/auth');
const { rateLimit } = require('../middleware/security');
const { asyncHandler } = require('../middleware/asyncHandler');

const router = express.Router();
const applicationLimit = rateLimit({ windowMs: 60 * 60 * 1000, max: 5, namespace: 'recruitment' });

router.post('/', applicationLimit, optionalAuth, createRecruitmentApplication);
router.get('/me', requireAuth, asyncHandler(listMyRecruitmentApplications));

module.exports = router;
