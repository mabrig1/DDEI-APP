'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { COURSES } = require('../src/data/courseCatalog');
const { SCENE_SECONDS, buildCinematicLesson, evidenceGuardian, sourceScout } =
  require('../src/utils/cinematicSwarm');

const fixtureCourse = {
  id: 'cybersecurity-demo',
  title: 'Introduction to Cybersecurity',
  category: 'Cybersecurity',
};
const fixtureModule = { id: 'intro', title: 'Protect Your Accounts' };
const fixtureLesson = {
  id: 'password-safety',
  title: 'Protect Your Passwords',
  content: [
    'A strong password should be unique to each account. Never share a one-time login code.',
    'Use two-step verification when it is available and review recent sign-in alerts.',
  ],
  keyTakeaways: [
    'Use a different password for each online account.',
    'Ask permission before accessing anyone else’s device.',
  ],
};

test('four cinematic scenes are exactly eight seconds and source-grounded', () => {
  const output = buildCinematicLesson(fixtureCourse, fixtureModule, fixtureLesson);
  assert.equal(SCENE_SECONDS, 8);
  assert.equal(output.scenes.length, 4);
  assert.equal(output.durationSeconds, 32);
  assert.equal(output.mode, 'deterministic-browser-storyboard');
  assert.equal(output.isGeneratedVideo, false);
  assert.equal(output.agents.length, 4);
  assert.equal(output.agents.at(-1).name, 'Evidence Guardian');
  assert.equal(output.scenes.every((scene) => scene.durationSeconds === 8), true);
  assert.equal(evidenceGuardian(output.scenes, sourceScout(fixtureLesson)), true);
  assert.equal(output.scenes.every((scene) => scene.narration === scene.caption), true);
  assert.ok(!JSON.stringify(output).includes('correctIndex'));
});

test('evidence guardian rejects invented factual narration', () => {
  const output = buildCinematicLesson(fixtureCourse, fixtureModule, fixtureLesson);
  output.scenes[1].caption = 'Invented unsupported result with perfect accuracy.';
  assert.equal(evidenceGuardian(output.scenes, sourceScout(fixtureLesson)), false);
});

test('cinematic rendering remains possible without any takeaways', () => {
  const output = buildCinematicLesson(fixtureCourse, fixtureModule, {
    id: 'short-lesson', title: 'One Key Idea', content: ['Only one short lesson paragraph.'],
  });
  assert.equal(output.scenes.length, 4);
  assert.ok(output.scenes.every((scene) => scene.caption));
});

test('entire course catalog can produce cinematic scenes without external AI keys', () => {
  const old = process.env.OPENROUTER_API_KEY;
  delete process.env.OPENROUTER_API_KEY;
  try {
    let covered = 0;
    for (const course of COURSES) {
      for (const module of course.modules) {
        for (const lesson of module.lessons) {
          const result = buildCinematicLesson(course, module, lesson);
          assert.equal(result.scenes.length, 4, course.id + '/' + lesson.id);
          assert.equal(result.durationSeconds, 32);
          assert.ok(result.scenes.every((scene) => scene.caption.length <= 144));
          covered++;
        }
      }
    }
    assert.ok(covered > 0, 'expected at least one published lesson');
  } finally {
    if (old !== undefined) process.env.OPENROUTER_API_KEY = old;
  }
});

test('cinematic API is protected by the same course-entitlement gate as lessons', () => {
  const routes = fs.readFileSync(path.join(__dirname, '../src/routes/courseRoutes.js'), 'utf8');
  assert.match(routes, /router\.get\('\/:id\/lessons\/:lessonId\/cinema', requireAuth, requireActiveAccess, cinematicLesson\)/);
  const frontend = fs.readFileSync(path.join(__dirname, '../../frontend/index.html'), 'utf8');
  const build = fs.readFileSync(path.join(__dirname, '../../frontend/build.js'), 'utf8');
  assert.match(frontend, /onclick="openCinematicLesson\(\)"/);
  assert.match(frontend, /id="cinematicLessonStage"/);
  assert.match(frontend, /\/cinematic-learning\.js/);
  assert.match(build, /cinematic-learning\.js/);
  assert.match(build, /cinematic-learning\.css/);
});

test('cinematic player uses textContent and never injects narrated source as HTML', () => {
  const player = fs.readFileSync(path.join(__dirname, '../../frontend/cinematic-learning.js'), 'utf8');
  assert.match(player, /state\.caption\.textContent = scene\.caption/);
  assert.doesNotMatch(player, /\.innerHTML\s*=/);
  assert.match(player, /prefers-reduced-motion/);
  assert.match(player, /speechSynthesis/);
  assert.match(player, /stop: stop/);
});
