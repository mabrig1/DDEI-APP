const express = require('express');
const { chat } = require('../controllers/helpController');
const { createTicket, listMyTickets, replyAsLearner } = require('../controllers/supportController');
const { requireAuth } = require('../middleware/auth');
const { asyncHandler } = require('../middleware/asyncHandler');
const { rateLimit } = require('../middleware/security');

const router = express.Router();

router.post('/chat', rateLimit({ windowMs: 15 * 60 * 1000, max: 40, namespace: 'help-chat' }), chat);
router.post('/tickets', requireAuth,
  rateLimit({ windowMs: 60 * 60 * 1000, max: 8, namespace: 'help-ticket' }), asyncHandler(createTicket));
router.get('/tickets', requireAuth, asyncHandler(listMyTickets));
router.post('/tickets/:id/reply', requireAuth,
  rateLimit({ windowMs: 60 * 60 * 1000, max: 20, namespace: 'help-reply' }), asyncHandler(replyAsLearner));

module.exports = router;
