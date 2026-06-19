const express = require('express');
const {
  listCourses,
  getCourse,
  updateProgress,
  submitQuiz,
  getProgress,
  selectCourse,
} = require('../controllers/courseController');
const { requireAuth, optionalAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/', listCourses);
router.get('/:id', optionalAuth, getCourse);
router.get('/:id/progress', requireAuth, getProgress);
router.post('/:id/select', requireAuth, selectCourse);
router.post('/:id/lessons/:lessonId/complete', optionalAuth, updateProgress);
router.post('/:id/lessons/:lessonId/quiz', optionalAuth, submitQuiz);

module.exports = router;
