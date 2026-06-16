const User = require('../models/User');
const { COURSES } = require('../data/courses');

function findCourse(id) {
  return COURSES.find((c) => c.id === id) || null;
}

function sanitizeCourse(course) {
  return {
    ...course,
    modules: course.modules.map((mod) => ({
      ...mod,
      quiz: {
        id: mod.quiz.id,
        questions: mod.quiz.questions.map((q) => ({
          id: q.id,
          question: q.question,
          options: q.options,
        })),
      },
    })),
  };
}

function courseSummary(course) {
  const lessonCount = course.modules.reduce((sum, mod) => sum + mod.lessons.length, 0);
  return {
    id: course.id,
    slug: course.slug,
    title: course.title,
    description: course.description,
    skillIds: course.skillIds,
    category: course.category,
    estimatedHours: course.estimatedHours,
    moduleCount: course.modules.length,
    lessonCount,
  };
}

function listCourses(req, res) {
  res.json({ courses: COURSES.map(courseSummary) });
}

async function getCourse(req, res) {
  const course = findCourse(req.params.id);
  if (!course) return res.status(404).json({ message: 'Course not found' });

  const sanitized = sanitizeCourse(course);

  let progress = null;
  if (req.userId) {
    const user = await User.findById(req.userId);
    progress = user && user.courseProgress
      ? user.courseProgress.find((p) => p.courseId === course.id) || null
      : null;
  }

  res.json({ course: sanitized, progress });
}

function findLesson(course, lessonId) {
  for (const mod of course.modules) {
    const lesson = mod.lessons.find((l) => l.id === lessonId);
    if (lesson) return { module: mod, lesson };
  }
  return null;
}

function findQuizByLessonOrModule(course, lessonId) {
  const mod = course.modules.find(
    (m) => m.quiz.id === lessonId || m.lessons.some((l) => l.id === lessonId)
  );
  return mod ? mod.quiz : null;
}

async function getOrCreateProgress(userId, courseId) {
  const user = await User.findById(userId);
  if (!user) return null;
  if (!user.courseProgress) user.courseProgress = [];
  let progress = user.courseProgress.find((p) => p.courseId === courseId);
  if (!progress) {
    user.courseProgress.push({ courseId, completedLessons: [], quizAttempts: [], updatedAt: new Date() });
    progress = user.courseProgress[user.courseProgress.length - 1];
  }
  return { user, progress };
}

async function updateProgress(req, res) {
  const course = findCourse(req.params.id);
  if (!course) return res.status(404).json({ message: 'Course not found' });

  const { lessonId } = req.params;
  const found = findLesson(course, lessonId);
  if (!found) return res.status(404).json({ message: 'Lesson not found' });

  const completed = req.body.completed !== false;

  if (!req.userId) {
    return res.json({ lessonId, completed });
  }

  const result = await getOrCreateProgress(req.userId, course.id);
  if (!result) return res.status(404).json({ message: 'User not found' });
  const { user, progress } = result;

  if (completed) {
    if (!progress.completedLessons.includes(lessonId)) {
      progress.completedLessons.push(lessonId);
    }
  } else {
    progress.completedLessons = progress.completedLessons.filter((id) => id !== lessonId);
  }
  progress.updatedAt = new Date();

  await user.save();
  res.json({ lessonId, completed, progress });
}

async function submitQuiz(req, res) {
  const course = findCourse(req.params.id);
  if (!course) return res.status(404).json({ message: 'Course not found' });

  const quiz = findQuizByLessonOrModule(course, req.params.lessonId);
  if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

  const answers = Array.isArray(req.body.answers) ? req.body.answers : [];

  const results = quiz.questions.map((q, idx) => {
    const selectedIndex = typeof answers[idx] === 'number' ? answers[idx] : null;
    const correct = selectedIndex === q.correctIndex;
    return {
      id: q.id,
      question: q.question,
      selectedIndex,
      correctIndex: q.correctIndex,
      correct,
      explanation: q.explanation,
    };
  });

  const score = results.filter((r) => r.correct).length;
  const total = results.length;
  const passed = total > 0 && score / total >= 0.7;

  if (req.userId) {
    const result = await getOrCreateProgress(req.userId, course.id);
    if (result) {
      const { user, progress } = result;
      progress.quizAttempts.push({
        lessonId: quiz.id,
        score,
        total,
        attemptedAt: new Date(),
      });
      progress.updatedAt = new Date();
      await user.save();
    }
  }

  res.json({ score, total, passed, results });
}

async function getProgress(req, res) {
  const course = findCourse(req.params.id);
  if (!course) return res.status(404).json({ message: 'Course not found' });

  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const progress = (user.courseProgress || []).find((p) => p.courseId === course.id) || null;
  res.json({ progress });
}

module.exports = { listCourses, getCourse, updateProgress, submitQuiz, getProgress };
