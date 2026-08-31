const express = require('express');
const {
  listCourses,
  getCourse,
  updateProgress,
  submitQuiz,
  coachCourse,
  getProgress,
  selectCourse,
  getCertificate,
} = require('../controllers/courseController');
const { requireAuth } = require('../middleware/auth');
const { requireActiveAccess } = require('../middleware/access');
const { rateLimit } = require('../middleware/security');

const router = express.Router();
const coachRateLimit = rateLimit({ windowMs: 15 * 60 * 1000, max: 30, namespace: 'course-coach' });

router.get('/', listCourses);
router.get('/:id', requireAuth, requireActiveAccess, getCourse);
router.get('/:id/progress', requireAuth, getProgress);
router.post('/:id/select', requireAuth, requireActiveAccess, selectCourse);
router.post('/:id/lessons/:lessonId/complete', requireAuth, requireActiveAccess, updateProgress);
router.post('/:id/lessons/:lessonId/quiz', requireAuth, requireActiveAccess, submitQuiz);
router.post('/:id/coach', coachRateLimit, requireAuth, requireActiveAccess, coachCourse);
router.get('/:id/certificate', requireAuth, getCertificate);

module.exports = router;
