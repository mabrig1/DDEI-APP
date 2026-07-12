const User = require('../models/User');
const Subscription = require('../models/Subscription');
const ActivityLog = require('../models/ActivityLog');
const { COURSES } = require('../data/courses');

const DAY_MS = 24 * 60 * 60 * 1000;

function courseLessonCounts() {
  const map = {};
  for (const course of COURSES) {
    map[course.id] = {
      title: course.title,
      lessonCount: course.modules.reduce((sum, m) => sum + m.lessons.length, 0),
    };
  }
  return map;
}

function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

// ── GET /api/admin/analytics/overview ────────────────────────
async function overview(req, res) {
  const now = Date.now();
  const today = startOfToday();
  const counts = courseLessonCounts();

  const users = await User.find(
    {},
    'name createdAt lastSeenAt visitCount totalMinutes isPremium scholarship courseProgress purchasedCourses'
  ).lean();

  const totalUsers = users.length;
  let onlineNow = 0;
  let dau = 0;
  let wau = 0;
  let mau = 0;
  let newToday = 0;
  let newThisWeek = 0;
  let premiumUsers = 0;
  let totalLessonsCompleted = 0;
  let totalMinutesAll = 0;
  let totalVisitsAll = 0;
  let retainedEligible = 0;
  let retainedActive = 0;

  // Per-enrollment progress stats
  let enrollments = 0;
  let progressSum = 0;
  let completedEnrollments = 0;
  let droppedEnrollments = 0;
  const distribution = { notStarted: 0, quarter: 0, half: 0, threeQuarters: 0, almost: 0, completed: 0 };

  for (const u of users) {
    const lastSeen = u.lastSeenAt ? new Date(u.lastSeenAt).getTime() : 0;
    if (lastSeen >= now - 5 * 60 * 1000) onlineNow += 1;
    if (lastSeen >= now - DAY_MS) dau += 1;
    if (lastSeen >= now - 7 * DAY_MS) wau += 1;
    if (lastSeen >= now - 30 * DAY_MS) mau += 1;

    const created = new Date(u.createdAt).getTime();
    if (created >= today.getTime()) newToday += 1;
    if (created >= now - 7 * DAY_MS) newThisWeek += 1;
    if (created <= now - 7 * DAY_MS) {
      retainedEligible += 1;
      if (lastSeen >= now - 7 * DAY_MS) retainedActive += 1;
    }

    if (u.isPremium || u.scholarship === 'full') premiumUsers += 1;
    totalMinutesAll += u.totalMinutes || 0;
    totalVisitsAll += u.visitCount || 0;

    const inactive7d = lastSeen < now - 7 * DAY_MS;
    for (const cp of u.courseProgress || []) {
      const info = counts[cp.courseId];
      const done = (cp.completedLessons || []).length;
      totalLessonsCompleted += done;
      if (!info || info.lessonCount === 0) continue;
      enrollments += 1;
      const pct = Math.min(100, Math.round((done / info.lessonCount) * 100));
      progressSum += pct;
      if (pct >= 100) {
        completedEnrollments += 1;
        distribution.completed += 1;
      } else {
        if (pct === 0) distribution.notStarted += 1;
        else if (pct < 25) distribution.quarter += 1;
        else if (pct < 50) distribution.half += 1;
        else if (pct < 75) distribution.threeQuarters += 1;
        else distribution.almost += 1;
        if (pct > 0 && inactive7d) droppedEnrollments += 1;
      }
    }
  }

  // 30-day signup + active-user trends
  const since = new Date(now - 30 * DAY_MS);
  const [signupTrendRaw, activityTrendRaw, revenueAgg] = await Promise.all([
    User.aggregate([
      { $match: { createdAt: { $gte: since } } },
      { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]),
    ActivityLog.aggregate([
      { $match: { createdAt: { $gte: since }, user: { $ne: null } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          users: { $addToSet: '$user' },
        },
      },
      { $project: { count: { $size: '$users' } } },
      { $sort: { _id: 1 } },
    ]),
    Subscription.aggregate([
      { $match: { status: 'success' } },
      { $group: { _id: null, totalNGN: { $sum: '$amount' }, payments: { $sum: 1 } } },
    ]),
  ]);

  // Fill missing days with zeros so charts render continuous lines
  const signupTrend = [];
  const activityTrend = [];
  const signupMap = Object.fromEntries(signupTrendRaw.map((d) => [d._id, d.count]));
  const activityMap = Object.fromEntries(activityTrendRaw.map((d) => [d._id, d.count]));
  for (let i = 29; i >= 0; i -= 1) {
    const day = new Date(now - i * DAY_MS).toISOString().slice(0, 10);
    signupTrend.push({ day, count: signupMap[day] || 0 });
    activityTrend.push({ day, count: activityMap[day] || 0 });
  }

  res.json({
    totals: {
      totalUsers,
      onlineNow,
      dau,
      wau,
      mau,
      newToday,
      newThisWeek,
      premiumUsers,
      totalLessonsCompleted,
      enrollments,
      completionRate: enrollments ? Math.round((completedEnrollments / enrollments) * 100) : 0,
      avgProgress: enrollments ? Math.round(progressSum / enrollments) : 0,
      dropOffRate: enrollments ? Math.round((droppedEnrollments / enrollments) * 100) : 0,
      retentionRate: retainedEligible ? Math.round((retainedActive / retainedEligible) * 100) : 0,
      avgSessionMinutes: totalVisitsAll ? Math.round(totalMinutesAll / totalVisitsAll) : 0,
      totalHoursOnPlatform: Math.round(totalMinutesAll / 60),
      revenueNGN: revenueAgg.length ? revenueAgg[0].totalNGN : 0,
      successfulPayments: revenueAgg.length ? revenueAgg[0].payments : 0,
    },
    distribution,
    signupTrend,
    activityTrend,
  });
}

// ── GET /api/admin/analytics/courses ─────────────────────────
async function courseAnalytics(req, res) {
  const now = Date.now();
  const users = await User.find({}, 'lastSeenAt courseProgress').lean();

  const lessonCompletionCounts = {};
  const perCourse = {};
  for (const course of COURSES) {
    perCourse[course.id] = {
      id: course.id,
      title: course.title,
      category: course.category,
      lessonCount: course.modules.reduce((s, m) => s + m.lessons.length, 0),
      enrolled: 0,
      completed: 0,
      inProgress: 0,
      stalled: 0,
      progressSum: 0,
      quizScoreSum: 0,
      quizAttempts: 0,
    };
  }

  for (const u of users) {
    const inactive7d = !u.lastSeenAt || new Date(u.lastSeenAt).getTime() < now - 7 * DAY_MS;
    for (const cp of u.courseProgress || []) {
      const stats = perCourse[cp.courseId];
      if (!stats) continue;
      stats.enrolled += 1;
      const done = (cp.completedLessons || []).length;
      const pct = stats.lessonCount ? Math.min(100, Math.round((done / stats.lessonCount) * 100)) : 0;
      stats.progressSum += pct;
      if (pct >= 100) stats.completed += 1;
      else if (pct > 0 && inactive7d) stats.stalled += 1;
      else stats.inProgress += 1;

      for (const lessonId of cp.completedLessons || []) {
        lessonCompletionCounts[lessonId] = (lessonCompletionCounts[lessonId] || 0) + 1;
      }
      for (const qa of cp.quizAttempts || []) {
        if (qa.total > 0) {
          stats.quizScoreSum += (qa.score / qa.total) * 100;
          stats.quizAttempts += 1;
        }
      }
    }
  }

  const courses = Object.values(perCourse).map((s) => ({
    id: s.id,
    title: s.title,
    category: s.category,
    lessonCount: s.lessonCount,
    enrolled: s.enrolled,
    completed: s.completed,
    inProgress: s.inProgress,
    stalled: s.stalled,
    avgProgress: s.enrolled ? Math.round(s.progressSum / s.enrolled) : 0,
    avgQuizScore: s.quizAttempts ? Math.round(s.quizScoreSum / s.quizAttempts) : null,
  }));

  // Most / least completed lessons (only lessons someone has completed)
  const lessonTitleMap = {};
  for (const course of COURSES) {
    for (const mod of course.modules) {
      for (const lesson of mod.lessons) {
        lessonTitleMap[lesson.id] = { title: lesson.title, courseTitle: course.title };
      }
    }
  }
  const rankedLessons = Object.entries(lessonCompletionCounts)
    .filter(([id]) => lessonTitleMap[id])
    .map(([id, count]) => ({ id, count, ...lessonTitleMap[id] }))
    .sort((a, b) => b.count - a.count);

  res.json({
    courses: courses.sort((a, b) => b.enrolled - a.enrolled),
    topLessons: rankedLessons.slice(0, 5),
    bottomLessons: rankedLessons.slice(-5).reverse(),
  });
}

// ── GET /api/admin/analytics/user/:id ────────────────────────
async function userAnalytics(req, res) {
  const user = await User.findById(req.params.id).lean();
  if (!user) return res.status(404).json({ message: 'User not found' });
  delete user.password;

  const logs = await ActivityLog.find({ user: user._id })
    .sort({ createdAt: -1 })
    .limit(50)
    .lean();

  const counts = courseLessonCounts();
  let lessonsCompleted = 0;
  let certificates = 0;
  const courseSummaries = [];
  for (const cp of user.courseProgress || []) {
    const info = counts[cp.courseId];
    const done = (cp.completedLessons || []).length;
    lessonsCompleted += done;
    courseSummaries.push({
      courseId: cp.courseId,
      courseTitle: info ? info.title : cp.courseId,
      completedLessons: done,
      totalLessons: info ? info.lessonCount : null,
      pct: info && info.lessonCount ? Math.min(100, Math.round((done / info.lessonCount) * 100)) : 0,
      quizAttempts: (cp.quizAttempts || []).length,
      lastActivity: cp.updatedAt || null,
    });
  }
  for (const p of user.purchasedCourses || []) {
    if (p.certificateId) certificates += 1;
  }

  const loginEvents = await ActivityLog.countDocuments({
    user: user._id,
    action: { $in: ['login', 'visit'] },
  });

  res.json({
    user,
    engagement: {
      totalLogins: loginEvents || user.visitCount || 0,
      totalMinutes: user.totalMinutes || 0,
      lastSeenAt: user.lastSeenAt || null,
      lessonsCompleted,
      certificates,
    },
    courses: courseSummaries,
    timeline: logs,
  });
}

// ── GET /api/admin/analytics/feed ────────────────────────────
async function activityFeed(req, res) {
  const limit = Math.min(parseInt(req.query.limit, 10) || 30, 100);
  const logs = await ActivityLog.find({ action: { $ne: 'visit' } })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();
  res.json({ feed: logs });
}

module.exports = { overview, courseAnalytics, userAnalytics, activityFeed };
