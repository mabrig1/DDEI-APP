const express = require('express');
const {
  login,
  listApplications,
  updateApplicationStatus,
  listUsers,
  listSubscriptions,
  setUserPremium,
  grantScholarship,
  createAccessLink,
} = require('../controllers/adminController');
const { requireAdmin } = require('../middleware/adminAuth');

const router = express.Router();

router.post('/login', login);
router.get('/applications', requireAdmin, listApplications);
router.patch('/applications/:id', requireAdmin, updateApplicationStatus);
router.patch('/applications/:id/scholarship', requireAdmin, grantScholarship);
router.get('/users', requireAdmin, listUsers);
router.patch('/users/:id/premium', requireAdmin, setUserPremium);
router.get('/subscriptions', requireAdmin, listSubscriptions);
router.post('/access-link', requireAdmin, createAccessLink);

module.exports = router;
