const express = require('express');
const {
  login,
  listApplications,
  updateApplicationStatus,
  listUsers,
  listSubscriptions,
  setUserPremium,
  setUserPassword,
  grantScholarship,
  createAccessLink,
  messageUser,
  broadcastMessage,
} = require('../controllers/adminController');
const { requireAdmin } = require('../middleware/adminAuth');

const router = express.Router();

router.post('/login', login);
router.get('/applications', requireAdmin, listApplications);
router.patch('/applications/:id', requireAdmin, updateApplicationStatus);
router.patch('/applications/:id/scholarship', requireAdmin, grantScholarship);
router.get('/users', requireAdmin, listUsers);
router.patch('/users/:id/premium', requireAdmin, setUserPremium);
router.patch('/users/:id/password', requireAdmin, setUserPassword);
router.get('/subscriptions', requireAdmin, listSubscriptions);
router.post('/access-link', requireAdmin, createAccessLink);
router.post('/users/:id/message', requireAdmin, messageUser);
router.post('/broadcast', requireAdmin, broadcastMessage);

module.exports = router;
