const express = require('express');
const { listGrants } = require('../controllers/grantsController');
const { optionalAuth } = require('../middleware/auth');
const { asyncHandler } = require('../middleware/asyncHandler');

const router = express.Router();

// optionalAuth, not requireAuth: the locked teaser is public on purpose, so a
// visitor can see what is closing this week before they have an account. The
// controller decides how much of each record to return.
router.get('/', optionalAuth, asyncHandler(listGrants));

module.exports = router;
