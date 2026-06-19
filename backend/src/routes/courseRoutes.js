const express = require('express');
const {
  listCourses,
  getCourse,
  updateProgress,
  submitQuiz,
  getProgress,
  selectCourse,
} = require('../controllers/courseController');
const { requireAuth } = require('../middleware/auth');
const { requireActiveAccess } = require('../middleware/access');

const router = express.Router();

router.get('/', listCourses);
router.get('/:id', requireAuth, requireActiveAccess, getCourse);
router.get('/:id/progress', requireAuth, getProgress);
router.post('/:id/select', requireAuth, requireActiveAccess, selectCourse);
router.post('/:id/lessons/:lessonId/complete', requireAuth, requireActiveAccess, updateProgress);
router.post('/:id/lessons/:lessonId/quiz', requireAuth, requireActiveAccess, submitQuiz);

module.exports = router;
