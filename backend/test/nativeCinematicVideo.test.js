'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { COURSES } = require('../src/data/courseCatalog');
const { buildCinematicLesson } = require('../src/utils/cinematicSwarm');
const {
  configured, trustedScene, scenePrompt, permittedOutputs, remote,
} = require('../src/controllers/cinematicVideoController');

const frontendRoot = path.join(__dirname, '../../frontend');
function read(name) { return fs.readFileSync(path.join(frontendRoot, name), 'utf8'); }

test('native canvas recorder and owner handoff scripts parse without Node globals', () => {
  for (const name of ['native-video-export.js', 'admin-cinema.js', 'cinematic-learning.js']) {
    assert.doesNotThrow(() => new vm.Script(read(name), { filename: name }));
  }
});

test('browser exports actual MediaRecorder video and never a mislabeled placeholder MP4', () => {
  const source = read('native-video-export.js');
  assert.match(source, /MediaRecorder\.isTypeSupported/);
  assert.match(source, /canvas\.captureStream\(24\)/);
  assert.match(source, /new MediaRecorder\(stream/);
  assert.match(source, /new Blob\(chunks/);
  assert.match(source, /video\/mp4/);
  assert.match(source, /video\/webm/);
  assert.match(source, /duration = studio\.scenes\.length \* 8/);
  assert.match(source, /This is an actual silent video file/);
  assert.doesNotMatch(source, /fetch\(/);
  assert.doesNotMatch(source, /OPENROUTER_API_KEY|MAGIC_HOUR_API_KEY|RUNWAY_API_KEY/);
});

test('video pack covers VidMint, AIVideo and Content Engine without automatic transmission', () => {
  const source = read('native-video-export.js');
  assert.match(source, /downloadProductionPack/);
  assert.match(source, /aivideo:/);
  assert.match(source, /vidmint:/);
  assert.match(source, /contentEngine:/);
  const page = read('cinematic-learning.js');
  assert.match(page, /Export full 32s video/);
  assert.match(page, /Export this 8s scene/);
  assert.match(source, /sceneIndex === null \? studio :/);
  assert.match(page, /Download production pack/);
  assert.match(read('index.html'), /src="\/native-video-export\.js"/);
  assert.match(read('build.js'), /native-video-export\.js/);
});

test('all catalog lessons can be used for scene-grounded native production', () => {
  let total = 0;
  for (const course of COURSES) {
    for (const module of course.modules) {
      for (const lesson of module.lessons) {
        const resolved = trustedScene(course.id, lesson.id, 0);
        assert.ok(resolved, course.id + '/' + lesson.id);
        const packageOutput = buildCinematicLesson(course, module, lesson);
        assert.equal(packageOutput.durationSeconds, 32);
        assert.equal(packageOutput.scenes.every((scene) => scene.durationSeconds === 8), true);
        assert.match(scenePrompt(resolved), /No photorealistic likeness/);
        total++;
      }
    }
  }
  assert.ok(total > 0);
});

test('owner GPU bridge is disabled by default and requires a long server secret', async () => {
  assert.equal(configured({}), false);
  assert.equal(configured({ DDEI_AIVIDEO_GPU_ENABLED: 'true', DDEI_AIVIDEO_EXECUTION_TOKEN: 'short' }), false);
  const disabled = { DDEI_AIVIDEO_GPU_ENABLED: 'false', DDEI_AIVIDEO_EXECUTION_TOKEN: 'a'.repeat(40) };
  await assert.rejects(() => remote('POST', '', {}, disabled, () => { throw new Error('Network should not be called'); }), /disabled or not configured/);
});

test('AIVideo submission uses only the fixed HTTPS origin and server-only authorization', async () => {
  const token = 'r'.repeat(40);
  const env = { DDEI_AIVIDEO_GPU_ENABLED: 'true', DDEI_AIVIDEO_EXECUTION_TOKEN: token };
  let observed;
  const fetchImpl = async (url, options) => {
    observed = { url, options };
    return { status: 202, ok: true, text: async () => '{"submission":{"providerId":"local-wan","providerJobId":"job-1"}}' };
  };
  const input = { missionId: 'ddei-test', prompt: 'Original visual lesson', durationSeconds: 8, aspectRatio: '16:9', candidateProviderIds: ['local-wan'] };
  const result = await remote('POST', '', { input }, env, fetchImpl);
  assert.equal(result.submission.providerId, 'local-wan');
  assert.equal(observed.url, 'https://aivideo.mabrigkorie.org/api/video-execution');
  assert.equal(observed.options.headers.Authorization, 'Bearer ' + token);
  assert.equal(observed.options.redirect, 'manual');
  assert.deepEqual(JSON.parse(observed.options.body).input.candidateProviderIds, ['local-wan']);
});

test('output links require explicit trusted HTTPS hostname allowlist', () => {
  const env = { DDEI_VIDEO_OUTPUT_ALLOWED_HOSTS: 'media.mabrigkorie.org' };
  const values = [
    'https://media.mabrigkorie.org/video.mp4',
    'http://media.mabrigkorie.org/unprotected.mp4',
    'https://evil.invalid/out',
    'https://media.mabrigkorie.org.evil.invalid/out',
    'https://username@media.mabrigkorie.org/video.mp4',
  ];
  assert.deepEqual(permittedOutputs(values, env), [values[0]]);
  assert.deepEqual(permittedOutputs(values, {}), []);
});

test('GPU routes remain admin-only with limited submissions and cannot select paid engines', () => {
  const routes = fs.readFileSync(path.join(__dirname, '../src/routes/adminRoutes.js'), 'utf8');
  assert.match(routes, /router\.post\('\/cinematic\/render', requireAdmin, sharedRateLimit\(/);
  assert.match(routes, /router\.get\('\/cinematic\/render\/:requestId', requireAdmin/);
  const controller = fs.readFileSync(path.join(__dirname, '../src/controllers/cinematicVideoController.js'), 'utf8');
  assert.match(controller, /body\.approveCompute !== true/);
  assert.match(controller, /body\.rightsConfirmed !== true/);
  assert.match(controller, /candidateProviderIds: \['local-wan'\]/);
  assert.doesNotMatch(controller, /candidateProviderIds: \['runway'/);
  assert.match(controller, /providerJobId/);
  assert.match(controller, /CinematicVideoJob\.create/);
  assert.match(read('admin.html'), /id="tab-cinema"/);
  assert.match(read('admin.html'), /window\.DDEIAdminCinema\.load\(adminRequest\)/);
  assert.match(read('build.js'), /admin-cinema\.js/);
  assert.doesNotMatch(read('admin-cinema.js'), /DDEI_AIVIDEO_EXECUTION_TOKEN/);
});
