/* Owner-only AIVideo handoff panel. GPU execution is never automatic. */
(function () {
  'use strict';
  var ready = false;
  var catalog = [];
  var lastRequest = null;
  var request = null;

  function byId(id) { return document.getElementById(id); }
  function status(text) {
    var node = byId('cinemaStudioStatus');
    if (node) node.textContent = text;
  }
  function choices(select, values, placeholder) {
    select.replaceChildren();
    var blank = document.createElement('option');
    blank.value = '';
    blank.textContent = placeholder;
    select.appendChild(blank);
    values.forEach(function (v) {
      var option = document.createElement('option');
      option.value = v.id;
      option.textContent = v.title;
      select.appendChild(option);
    });
  }
  function chosenCourse() { return catalog.find(function (c) { return c.id === byId('cinemaCourseSelect').value; }); }
  function chosenLesson() {
    var course = chosenCourse();
    return course && course.modules.flatMap(function (mod) { return mod.lessons; })
      .find(function (lesson) { return lesson.id === byId('cinemaLessonSelect').value; });
  }
  function updateLessons() {
    var course = chosenCourse();
    var lessons = course ? course.modules.flatMap(function (mod) {
      return mod.lessons.map(function (lesson) {
        return { id: lesson.id, title: mod.title + ': ' + lesson.title };
      });
    }) : [];
    choices(byId('cinemaLessonSelect'), lessons, 'Choose a lesson');
  }
  function showLinks(list) {
    var target = byId('cinemaVideoLinks');
    target.replaceChildren();
    (list || []).forEach(function (url) {
      var link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.className = 'inline-block underline text-[#0A66C2] mr-3 break-all';
      link.textContent = 'Open approved generated clip';
      target.appendChild(link);
    });
  }
  function renderJob(job) {
    if (!job) return;
    lastRequest = job.id;
    status('AIVideo mission ' + job.id + ': ' + job.state +
      (job.error ? '. ' + job.error : '') +
      (job.providerJobId ? ' (GPU job ' + job.providerJobId + ')' : ''));
    showLinks(job.outputUrls);
  }
  async function refresh() {
    if (!request || !lastRequest) return status('No GPU mission has been submitted in this tab.');
    status('Checking AIVideo native GPU job…');
    try {
      var data = await request('/api/admin/cinematic/render/' + encodeURIComponent(lastRequest));
      renderJob(data.job);
    } catch (error) { status('Could not check the AIVideo GPU: ' + error.message); }
  }
  async function run() {
    if (!request || !ready) return status('AIVideo local GPU must be configured first. No external job was sent.');
    var course = chosenCourse();
    var lesson = chosenLesson();
    var sceneIndex = Number(byId('cinemaSceneSelect').value);
    if (!course || !lesson || !Number.isInteger(sceneIndex) || sceneIndex < 0 || sceneIndex > 3) {
      return status('Choose a valid course, lesson and scene.');
    }
    if (!byId('cinemaRightsConfirm').checked || !byId('cinemaComputeConfirm').checked) {
      return status('Confirm content rights and GPU compute approval before submission.');
    }
    if (!window.confirm('Send only this one verified 8-second scene to your private AIVideo WAN GPU? Compute resources may be consumed. No paid video provider will be selected.')) return;
    var runButton = byId('cinemaSubmitBtn');
    runButton.disabled = true;
    var requestId = crypto.randomUUID();
    lastRequest = requestId;
    status('Submitting exactly one scene. This request cannot automatically retry.');
    try {
      var data = await request('/api/admin/cinematic/render', {
        method: 'POST',
        body: JSON.stringify({
          courseId: course.id,
          lessonId: lesson.id,
          sceneIndex: sceneIndex,
          requestId: requestId,
          approveCompute: true,
          rightsConfirmed: true,
        }),
      });
      renderJob(data.job);
    } catch (error) {
      status('Submission not confirmed: ' + error.message + '. Inspect AIVideo before starting a new GPU job.');
    } finally { runButton.disabled = false; }
  }
  function initialize() {
    if (byId('cinemaCourseSelect').dataset.ready === '1') return;
    byId('cinemaCourseSelect').dataset.ready = '1';
    byId('cinemaCourseSelect').addEventListener('change', updateLessons);
    byId('cinemaSubmitBtn').addEventListener('click', run);
    byId('cinemaStatusBtn').addEventListener('click', refresh);
  }
  async function load(adminRequest) {
    request = adminRequest;
    initialize();
    status('Checking private AIVideo GPU bridge…');
    try {
      var data = await request('/api/admin/cinematic/catalog');
      ready = data.enabled === true && data.renderEnabled === true;
      catalog = Array.isArray(data.courses) ? data.courses : [];
      choices(byId('cinemaCourseSelect'), catalog, 'Choose a course');
      updateLessons();
      byId('cinemaSubmitBtn').disabled = !ready;
      status(ready
        ? 'Owner GPU bridge configured. Select one scene, confirm ownership and approve compute.'
        : 'AIVideo GPU bridge is disabled or its server token is missing. Native browser MP4/WebM export remains available to enrolled learners.');
    } catch (error) { ready = false; status('Could not load cinematic studio: ' + error.message); }
  }

  window.DDEIAdminCinema = { load: load };
})();
