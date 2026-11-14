const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const User = require('../src/models/User');
const { COURSES } = require('../src/data/courseCatalog');
const { requireActiveAccess } = require('../src/middleware/access');
const { buildHelpReply } = require('../src/utils/helpBotEngine');

const webDir = path.join(__dirname, '../../frontend');

function response() {
  return {
    statusCode: 200, body: null,
    status(code) { this.statusCode = code; return this; },
    json(body) { this.body = body; return this; },
  };
}

async function checkEntitlement(user, courseId) {
  const original = User.findById;
  try {
    User.findById = async () => user;
    const res = response();
    let nextCalled = false;
    await requireActiveAccess({ params: { id: courseId }, userId: 'sample' }, res, () => { nextCalled = true; });
    return { res, nextCalled };
  } finally {
    User.findById = original;
  }
}

test('legacy and new trial dates never unlock course lessons, even far in the future', async () => {
  const standard = COURSES.find((course) => !course.paidOnly);
  assert.ok(standard, 'A standard course must exist');
  const user = new User({
    name: 'Legacy learner', email: 'legacy-demo@example.com', password: 'not-a-real-secret',
    trialExpiresAt: new Date('2099-01-01T00:00:00Z'), scholarship: 'none',
  });
  assert.equal(user.hasActiveAccess(), false);
  const { res, nextCalled } = await checkEntitlement(user, standard.id);
  assert.equal(nextCalled, false);
  assert.equal(res.statusCode, 402);
  assert.equal(res.body.demoUrl, '/#demo');
  assert.equal(res.body.courseId, standard.id);
  assert.doesNotMatch(res.body.message, /trial/i);
});

test('paid courses, Premium and scholarships retain their correct permissions', async () => {
  const standard = COURSES.find((course) => !course.paidOnly);
  const special = COURSES.find((course) => course.paidOnly);
  assert.ok(standard && special, 'Standard and paid-only course fixtures should exist');
  const user = new User({ name: 'Learner', email: 'learner-demo@example.com', password: 'example-password' });
  assert.equal((await checkEntitlement(user, special.id)).res.statusCode, 402);

  user.premiumExpiresAt = new Date(Date.now() + 86400000);
  user.isPremium = true;
  assert.equal((await checkEntitlement(user, standard.id)).nextCalled, true);
  assert.equal((await checkEntitlement(user, special.id)).nextCalled, false);

  user.isPremium = false; user.scholarship = 'limited';
  assert.equal((await checkEntitlement(user, standard.id)).nextCalled, true);
  assert.equal((await checkEntitlement(user, special.id)).nextCalled, false);

  user.scholarship = 'full';
  assert.equal((await checkEntitlement(user, special.id)).nextCalled, true);

  user.scholarship = 'none';
  user.purchasedCourses.push({ courseId: special.id, purchasedAt: new Date() });
  assert.equal((await checkEntitlement(user, special.id)).nextCalled, true);
});

test('no stale free-trial promises remain in public enrollment and support messaging', () => {
  for (const filename of ['index.html','admin.html','earn-online.html']) {
    const html = fs.readFileSync(path.join(webDir, filename), 'utf8');
    assert.doesNotMatch(html, /start free week|free trial|free skill courses|trial expired|free courses/i, filename);
  }
  const html = fs.readFileSync(path.join(webDir,'index.html'),'utf8');
  for (const marker of ['id="demo"','id="demoQuizAnswers"','id="demoBuildProject"','id="demoPortfolioProject"','/demo.js','/demo.css']) {
    assert.ok(html.includes(marker), marker);
  }
  const reply = buildHelpReply('Can I get a 7-day free trial?');
  assert.match(reply, /demonstration/i);
  assert.match(reply, /no longer/i);
});

test('the public demo really progresses through lesson, quiz, project and portfolio in-browser', () => {
  function element() {
    return {
      dataset: {}, attrs: {}, children: [], style: {}, disabled: false, value: '', textContent: '', hidden: false,
      handlers: {},
      addEventListener(name, callback) { this.handlers[name] = callback; },
      setAttribute(name, value) { this.attrs[name] = value; },
      getAttribute(name) { return this.attrs[name]; },
      replaceChildren(...children) { this.children = children; },
      click() { assert.ok(this.handlers.click, 'Expected interactive event binding'); this.handlers.click(); },
      scrollIntoView() {},
    };
  }

  const html = fs.readFileSync(path.join(webDir,'index.html'),'utf8');
  const ids = [
    'demoStatus','demoTrackName','demoLessonTitle','demoLessonText','demoLessonExample',
    'demoQuizQuestion','demoQuizWhy','demoProjectBrief','demoProjectIdea',
    'demoProjectResult','demoPortfolioProject','demoPortfolioSkills','demoPortfolioBadge',
    'demoStageLabel','demoProgressBar','demoProgressText','demoQuizAnswers',
    'demoQuizNext','demoProjectNext','demoLessonNext','demoQuizCheck',
    'demoBuildProject','demoRestart',
  ];
  const map = Object.fromEntries(ids.map((id) => {
    assert.ok(html.includes('id="' + id + '"'), 'HTML control missing: ' + id);
    return [id, element()];
  }));
  const tracks = ['ai','web','marketing'].map((track) => Object.assign(element(), {dataset:{demoTrack:track}}));
  const steps = [0,1,2,3].map((step) => Object.assign(element(), {dataset:{demoStep:String(step)}}));
  const panels = [0,1,2,3].map((step) => Object.assign(element(), {dataset:{demoPanel:String(step)}}));
  const host = element();
  host.querySelectorAll = (selector) => ({
    '[data-demo-track]':tracks, '[data-demo-step]':steps,
    '[data-demo-panel]':panels, '.demo-option': map.demoQuizAnswers.children,
  })[selector] || [];
  const document = {
    callbacks:{},
    addEventListener(name,callback){this.callbacks[name]=callback;},
    getElementById(id){return id==='demo'?host:map[id];},
    createElement(){return element();},
  };
  const script = fs.readFileSync(path.join(webDir,'demo.js'),'utf8');
  assert.doesNotMatch(script, /\bfetch\s*\(|XMLHttpRequest|localStorage|sessionStorage/, 'Demo must have no network or storage access');
  vm.runInNewContext(script, { document });
  document.callbacks.DOMContentLoaded();
  assert.equal(map.demoProgressBar.style.width,'25%');
  map.demoLessonNext.click();
  assert.equal(map.demoStageLabel.textContent,'Answer a practice quiz');
  map.demoQuizAnswers.children[1].click();
  map.demoQuizCheck.click();
  assert.equal(map.demoQuizNext.disabled, false);
  map.demoQuizNext.click();
  map.demoProjectIdea.value = 'A community bookstore';
  map.demoBuildProject.click();
  assert.match(map.demoProjectResult.textContent,/community bookstore/i);
  map.demoProjectNext.click();
  assert.equal(map.demoProgressBar.style.width,'100%');
  assert.match(map.demoPortfolioProject.textContent,/community bookstore/i);
  tracks[1].click();
  assert.equal(map.demoProgressBar.style.width,'25%');
  assert.equal(map.demoTrackName.textContent,'Web Development');
});
