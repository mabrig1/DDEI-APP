const test = require('node:test');
const assert = require('node:assert/strict');

const {
  buildStudyPlan,
  createPracticeSet,
  evaluateTeachBack,
  lessonContext,
  progressSnapshot,
  runCourseCoach,
} = require('../src/utils/courseCoachAgent');

const course = {
  id: 'test-course',
  title: 'Practical Digital Skills',
  modules: [
    {
      id: 'module-1',
      title: 'Research Foundations',
      lessons: [
        {
          id: 'lesson-1',
          title: 'Verify Your Sources',
          content: ['Compare <strong>credible sources</strong> before making a decision.'],
          keyTakeaways: ['Source verification reduces misinformation.', 'Compare evidence across multiple sources.'],
        },
        {
          id: 'lesson-2',
          title: 'Present the Evidence',
          content: ['Turn evidence into a clear recommendation.'],
          keyTakeaways: ['Explain the evidence and its limitations.'],
        },
      ],
    },
  ],
};

const moduleOne = course.modules[0];
const lessonOne = moduleOne.lessons[0];

test('lessonContext strips markup and keeps trusted lesson material', () => {
  const context = lessonContext(course, moduleOne, lessonOne);

  assert.equal(context.courseTitle, course.title);
  assert.equal(context.lessonTitle, lessonOne.title);
  assert.equal(context.content[0], 'Compare credible sources before making a decision.');
  assert.deepEqual(context.keyTakeaways, lessonOne.keyTakeaways);
});

test('progressSnapshot and study plan use unfinished lessons', () => {
  const progress = { completedLessons: ['lesson-1'] };
  const snapshot = progressSnapshot(course, progress);
  const plan = buildStudyPlan(course, progress, { daysPerWeek: 3, sessionMinutes: 20 });

  assert.equal(snapshot.completedCount, 1);
  assert.equal(snapshot.percentComplete, 50);
  assert.equal(snapshot.nextLesson.id, 'lesson-2');
  assert.equal(plan.plan.length, 1);
  assert.equal(plan.plan[0].focus, 'Present the Evidence');
  assert.equal(plan.plan[0].sessionMinutes, 20);
});

test('practice prompts are grounded in lesson takeaways', () => {
  const context = lessonContext(course, moduleOne, lessonOne);
  const practice = createPracticeSet(context, 2);

  assert.equal(practice.length, 2);
  assert.match(practice[0].prompt, /Source verification reduces misinformation/);
  assert.match(practice[1].prompt, /Compare evidence across multiple sources/);
});

test('teach-back scoring rewards coverage of lesson concepts', () => {
  const context = lessonContext(course, moduleOne, lessonOne);
  const weak = evaluateTeachBack(context, 'It is about research.');
  const strong = evaluateTeachBack(
    context,
    'Source verification reduces misinformation because credible sources provide evidence. I compare evidence across multiple sources before making a decision and explain any limitations clearly.'
  );

  assert.ok(strong.score > weak.score);
  assert.ok(strong.strengths.includes('sources'));
});

test('course coach has a deterministic no-key fallback', async () => {
  const previousKey = process.env.OPENROUTER_API_KEY;
  delete process.env.OPENROUTER_API_KEY;

  try {
    const result = await runCourseCoach({
      action: 'practice',
      course,
      module: moduleOne,
      lesson: lessonOne,
      progress: { completedLessons: [] },
    });

    assert.equal(result.mode, 'offline');
    assert.match(result.reply, /Practice set/);
    assert.match(result.reply, /Source verification reduces misinformation/);
  } finally {
    if (previousKey === undefined) delete process.env.OPENROUTER_API_KEY;
    else process.env.OPENROUTER_API_KEY = previousKey;
  }
});
