const express = require('express');
const {
  login,
  listApplications,
  updateApplicationStatus,
  listUsers,
  listSubscriptions,
} = require('../controllers/adminController');
const { requireAdmin } = require('../middleware/adminAuth');

const router = express.Router();

router.post('/login', login);
router.get('/applications', requireAdmin, listApplications);
router.patch('/applications/:id', requireAdmin, updateApplicationStatus);
router.get('/users', requireAdmin, listUsers);
router.get('/subscriptions', requireAdmin, listSubscriptions);

module.exports = router;
