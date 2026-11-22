/* DDEI Cinematic Lessons: a low-data, evidence-based browser scene player. */
(function () {
  'use strict';

  var active = null;
  var preferredReducedMotion = !!(window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var saveData = !!(navigator.connection && navigator.connection.saveData);
  var themeNames = new Set(['tech', 'business', 'creative', 'learning']);

  function element(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = String(text);
    return node;
  }

  function button(text, label, callback) {
    var control = element('button', 'ddei-cinema-button', text);
    control.type = 'button';
    control.setAttribute('aria-label', label || text);
    control.addEventListener('click', callback);
    return control;
  }

  function stopVoice() {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  }

  function stop() {
    if (!active) return;
    if (active.timer) window.clearInterval(active.timer);
    stopVoice();
    if (window.DDEINativeClip) window.DDEINativeClip.cancel();
    active = null;
  }

  function say(scene) {
    if (!active || !active.voice || !('speechSynthesis' in window)) return;
    stopVoice();
    var utterance = new SpeechSynthesisUtterance(String(scene.narration || scene.caption).slice(0, 220));
    utterance.lang = 'en-NG';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }

  function paint() {
    var state = active;
    if (!state) return;
    var scene = state.studio.scenes[state.index];
    var theme = themeNames.has(scene.theme) ? scene.theme : 'learning';
    state.screen.className = 'ddei-cinema-screen ddei-cinema-theme-' + theme +
      (preferredReducedMotion || saveData ? ' ddei-cinema-still' : '');
    state.kicker.textContent = scene.label;
    state.caption.textContent = scene.caption;
    state.counter.textContent = 'Scene ' + (state.index + 1) + ' of ' + state.studio.scenes.length;
    state.source.textContent = 'Evidence: ' + scene.evidence.sourceKind +
      ' ' + (Number(scene.evidence.sourceIndex) + 1);
    state.progress.style.width = (100 * (state.index + 1) / state.studio.scenes.length) + '%';
    state.play.textContent = state.timer ? 'Pause' : 'Play scenes';
    state.voiceButton.textContent = state.voice ? 'Voice on' : 'Voice off';
    state.time.textContent = (state.studio.sceneDurationSeconds - state.elapsed) + 's';
    if (state.voice) say(scene);
  }

  function pause() {
    if (!active) return;
    if (active.timer) window.clearInterval(active.timer);
    active.timer = null;
    active.play.textContent = 'Play scenes';
    stopVoice();
  }

  function step(offset) {
    if (!active) return;
    var state = active;
    var next = Math.min(state.studio.scenes.length - 1, Math.max(0, state.index + offset));
    if (next === state.index && offset > 0) { pause(); return; }
    state.index = next;
    state.elapsed = 0;
    paint();
  }

  function play() {
    if (!active) return;
    if (active.timer) { pause(); return; }
    var state = active;
    state.play.textContent = 'Pause';
    if (state.voice) say(state.studio.scenes[state.index]);
    state.timer = window.setInterval(function () {
      if (active !== state || !state.screen.isConnected) { stop(); return; }
      state.elapsed += 1;
      if (state.elapsed >= state.studio.sceneDurationSeconds) {
        if (state.index >= state.studio.scenes.length - 1) { pause(); state.time.textContent = 'Finished'; return; }
        step(1);
      } else state.time.textContent = (state.studio.sceneDurationSeconds - state.elapsed) + 's';
    }, 1000);
  }

  async function copyDirections() {
    if (!active) return;
    var s = active.studio;
    var text = s.title + '\n\n' + s.scenes.map(function (scene) {
      return 'Scene ' + scene.sequence + ' (' + scene.durationSeconds + ' seconds) — ' +
        scene.label + '\nCamera: ' + scene.motion + '\nTheme: ' + scene.theme +
        '\nOn-screen caption: ' + scene.caption +
        '\nAudio: optional browser narration, no generated soundtrack';
    }).join('\n\n');
    try {
      await navigator.clipboard.writeText(text);
      if (active) active.message.textContent = 'Storyboard copied. You can adapt it in a video editor.';
    } catch (_) {
      if (active) active.message.textContent = 'Clipboard unavailable. Use the scene captions above.';
    }
  }

  function mount(container, studio) {
    var state = active;
    var outer = element('section', 'ddei-cinema', undefined);
    outer.setAttribute('aria-label', 'Cinematic learning scene player');

    var heading = element('div', 'ddei-cinema-heading');
    heading.appendChild(element('h5', '', 'Cinematic Lesson Studio'));
    heading.appendChild(element('p', '', 'Four 8-second scenes · play, export a real clip, or send a production pack to your video apps'));
    outer.appendChild(heading);

    var screen = element('div', 'ddei-cinema-screen');
    screen.setAttribute('role', 'group');
    screen.setAttribute('aria-label', 'Current lesson scene');
    var glow = element('div', 'ddei-cinema-glow');
    glow.setAttribute('aria-hidden', 'true');
    screen.appendChild(glow);
    var picture = element('div', 'ddei-cinema-art', '✦');
    picture.setAttribute('aria-hidden', 'true');
    screen.appendChild(picture);
    var overlay = element('div', 'ddei-cinema-overlay');
    state.kicker = element('span', 'ddei-cinema-kicker');
    state.caption = element('p', 'ddei-cinema-caption');
    overlay.appendChild(state.kicker);
    overlay.appendChild(state.caption);
    screen.appendChild(overlay);
    state.screen = screen;
    outer.appendChild(screen);

    var position = element('div', 'ddei-cinema-meta');
    state.counter = element('span');
    state.time = element('span');
    position.appendChild(state.counter);
    position.appendChild(state.time);
    outer.appendChild(position);

    var track = element('div', 'ddei-cinema-track');
    track.setAttribute('aria-hidden', 'true');
    state.progress = element('div', 'ddei-cinema-progress');
    track.appendChild(state.progress);
    outer.appendChild(track);

    var controls = element('div', 'ddei-cinema-controls');
    controls.appendChild(button('Previous', 'Previous scene', function () { step(-1); }));
    state.play = button('Play scenes', 'Play or pause cinematic scenes', play);
    state.play.classList.add('ddei-cinema-primary');
    controls.appendChild(state.play);
    controls.appendChild(button('Next', 'Next scene', function () { step(1); }));
    state.voiceButton = button('Voice off', 'Turn spoken narration on or off', function () {
      if (!('speechSynthesis' in window)) {
        state.message.textContent = 'Spoken narration is not supported on this device.';
        return;
      }
      state.voice = !state.voice;
      if (state.voice) say(state.studio.scenes[state.index]);
      else stopVoice();
      state.voiceButton.textContent = state.voice ? 'Voice on' : 'Voice off';
    });
    controls.appendChild(state.voiceButton);
    controls.appendChild(button('Copy storyboard', 'Copy scene directions', copyDirections));
    controls.appendChild(button('Download production pack', 'Download a scene package for VidMint, AIVideo and Content Engine', function () {
      if (!window.DDEINativeClip) return;
      window.DDEINativeClip.downloadProductionPack(state.studio);
      state.message.textContent = 'Saved a reusable, lesson-grounded production pack for your connected video workflow. No data was sent externally.';
    }));
    function beginExport(sceneIndex) {
      if (!window.DDEINativeClip) {
        state.message.textContent = 'The native video recorder is not loaded.';
        return;
      }
      if (!window.DDEINativeClip.available()) {
        state.message.textContent = 'This browser cannot encode a canvas video. Try an updated desktop browser or download the production pack.';
        return;
      }
      var seconds = sceneIndex === null ? 32 : 8;
      if (!window.confirm('Record an actual ' + seconds + '-second silent video with source-verified captions? No provider credits are spent.')) return;
      pause();
      state.exportButton.disabled = true;
      state.sceneExportButton.disabled = true;
      state.exportButton.textContent = 'Recording video…';
      window.DDEINativeClip.exportVideo(state.studio, function (message) {
        if (active === state) state.message.textContent = message;
      }, sceneIndex === null ? {} : { sceneIndex: sceneIndex }).then(function () {
        if (active === state) {
          state.exportButton.disabled = false;
          state.sceneExportButton.disabled = false;
          state.exportButton.textContent = 'Export full 32s video';
        }
      }).catch(function (error) {
        if (active === state) {
          state.message.textContent = error.message;
          state.exportButton.disabled = false;
          state.sceneExportButton.disabled = false;
          state.exportButton.textContent = 'Export full 32s video';
        }
      });
    }
    state.exportButton = button('Export full 32s video', 'Render and download the full 32-second lesson', function () {
      beginExport(null);
    });
    state.exportButton.classList.add('ddei-cinema-primary');
    controls.appendChild(state.exportButton);
    state.sceneExportButton = button('Export this 8s scene', 'Render and download only the currently selected eight-second scene', function () {
      beginExport(state.index);
    });
    controls.appendChild(state.sceneExportButton);
    outer.appendChild(controls);

    state.source = element('p', 'ddei-cinema-evidence');
    outer.appendChild(state.source);
    var practice = element('div', 'ddei-cinema-practice');
    practice.appendChild(element('strong', '', 'Practice with the Learning Coach'));
    practice.appendChild(element('p', '', studio.practice.prompt));
    practice.appendChild(element('p', 'ddei-cinema-practice-source', studio.practice.source));
    outer.appendChild(practice);

    state.message = element('p', 'ddei-cinema-message',
      'Video export creates a genuine silent MP4 where supported, otherwise WebM; narrated playback is separate. Optional GPU video generation requires its own approval.');
    state.message.setAttribute('aria-live', 'polite');
    outer.appendChild(state.message);
    container.replaceChildren(outer);
    paint();
  }

  async function open(options) {
    if (!options || !options.container || typeof options.request !== 'function') return;
    stop();
    var container = options.container;
    var requestId = Symbol('scene');
    active = { id: requestId, timer: null, voice: false, elapsed: 0, index: 0 };
    container.replaceChildren(element('p', 'ddei-cinema-loading', 'Preparing a cinematic lesson from the course material…'));
    try {
      var route = '/api/courses/' + encodeURIComponent(options.courseId) +
        '/lessons/' + encodeURIComponent(options.lessonId) + '/cinema';
      var data = await options.request(route);
      if (!active || active.id !== requestId || !container.isConnected) return;
      var studio = data && data.studio;
      if (!studio || !Array.isArray(studio.scenes) || studio.scenes.length !== 4 ||
          studio.scenes.some(function (scene) {
            return typeof scene.caption !== 'string' || !scene.evidence ||
              scene.durationSeconds !== 8;
          })) throw new Error('Incomplete cinematic lesson data');
      active.studio = studio;
      mount(container, studio);
    } catch (error) {
      if (!active || active.id !== requestId || !container.isConnected) return;
      container.replaceChildren(element('p', 'ddei-cinema-error',
        'The cinematic lesson could not load. ' +
        (error && error.status === 402
          ? 'Your enrolment does not include this course.'
          : 'Try again, or use the ordinary lesson below.')));
    }
  }

  window.DDEICinema = { open: open, stop: stop };
})();
