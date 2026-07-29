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
  grantCourseAccess,
  messageUser,
  broadcastMessage,
} = require('../controllers/adminController');
const { getAdmin: getServiceUpdateAdmin, postUpdate: postServiceUpdate } = require('../controllers/serviceUpdateController');
const {
  overview,
  courseAnalytics,
  userAnalytics,
  activityFeed,
  learnerBoard,
} = require('../controllers/analyticsController');
const { listUpdates, reviewUpdate } = require('../controllers/grantReviewController');
const { requireAdmin } = require('../middleware/adminAuth');
const { asyncHandler } = require('../middleware/asyncHandler');

const router = express.Router();

router.post('/login', login);
router.get('/applications', requireAdmin, listApplications);
router.patch('/applications/:id', requireAdmin, updateApplicationStatus);
router.patch('/applications/:id/scholarship', requireAdmin, grantScholarship);
router.get('/users', requireAdmin, listUsers);
router.patch('/users/:id/premium', requireAdmin, setUserPremium);
router.patch('/users/:id/password', requireAdmin, setUserPassword);
router.post('/users/:id/grant-course', requireAdmin, asyncHandler(grantCourseAccess));
router.get('/subscriptions', requireAdmin, listSubscriptions);
router.post('/access-link', requireAdmin, createAccessLink);
router.post('/users/:id/message', requireAdmin, messageUser);
router.post('/broadcast', requireAdmin, broadcastMessage);
router.get('/service-update', requireAdmin, getServiceUpdateAdmin);
router.post('/service-update', requireAdmin, postServiceUpdate);
router.get('/analytics/overview', requireAdmin, asyncHandler(overview));
router.get('/analytics/courses', requireAdmin, asyncHandler(courseAnalytics));
router.get('/analytics/user/:id', requireAdmin, asyncHandler(userAnalytics));
router.get('/analytics/feed', requireAdmin, asyncHandler(activityFeed));
router.get('/analytics/learners', requireAdmin, asyncHandler(learnerBoard));
router.get('/grant-updates', requireAdmin, asyncHandler(listUpdates));
router.patch('/grant-updates/:id', requireAdmin, asyncHandler(reviewUpdate));

module.exports = router;
