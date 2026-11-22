/* DDEI native scene video export: record original canvas animation, no cloud calls. */
(function () {
  'use strict';

  var current = null;
  var busy = false;
  var SUPPORTED = [
    { mime: 'video/mp4;codecs="avc1.42E01E"', extension: 'mp4' },
    { mime: 'video/mp4', extension: 'mp4' },
    { mime: 'video/webm;codecs=vp9', extension: 'webm' },
    { mime: 'video/webm;codecs=vp8', extension: 'webm' },
    { mime: 'video/webm', extension: 'webm' },
  ];
  var backgrounds = {
    tech: ['#060a22', '#185d98', '#38bdf8'],
    creative: ['#120930', '#783cb2', '#e879f9'],
    business: ['#190e29', '#a05732', '#fbbf24'],
    learning: ['#071b28', '#167e82', '#67e8f9'],
  };
  function available() {
    return typeof MediaRecorder !== 'undefined' &&
      typeof HTMLCanvasElement !== 'undefined' &&
      typeof HTMLCanvasElement.prototype.captureStream === 'function' &&
      !!SUPPORTED.find(function (item) { return MediaRecorder.isTypeSupported(item.mime); });
  }
  function format() {
    return SUPPORTED.find(function (item) { return MediaRecorder.isTypeSupported(item.mime); }) || null;
  }
  function safeName(value) {
    return String(value || 'lesson').replace(/[^a-z0-9_-]/gi, '-').slice(0, 70);
  }
  function download(blob, filename) {
    var url = URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(function () { URL.revokeObjectURL(url); }, 90 * 1000);
  }
  function wrappedLines(ctx, text, maxWidth, maxLines) {
    var words = String(text).trim().split(/\s+/).filter(Boolean);
    var lines = [];
    var currentLine = '';
    words.forEach(function (word) {
      var next = currentLine ? currentLine + ' ' + word : word;
      if (ctx.measureText(next).width > maxWidth && currentLine) {
        lines.push(currentLine); currentLine = word;
      } else currentLine = next;
    });
    if (currentLine) lines.push(currentLine);
    if (lines.length > maxLines) {
      lines = lines.slice(0, maxLines);
      var last = lines[maxLines - 1];
      while (last.length && ctx.measureText(last + '…').width > maxWidth) last = last.slice(0, -1);
      lines[maxLines - 1] = last + '…';
    }
    return lines;
  }
  function draw(ctx, canvas, studio, elapsedSeconds, reducedMotion) {
    var width = canvas.width;
    var height = canvas.height;
    var secondsPerScene = 8;
    var index = Math.min(studio.scenes.length - 1, Math.floor(elapsedSeconds / secondsPerScene));
    var scene = studio.scenes[index];
    var seconds = elapsedSeconds - (index * secondsPerScene);
    var palette = backgrounds[scene.theme] || backgrounds.learning;
    var dynamic = reducedMotion ? 0 : seconds;

    var gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, palette[0]); gradient.addColorStop(.55, palette[1]); gradient.addColorStop(1, '#030712');
    ctx.fillStyle = gradient; ctx.fillRect(0, 0, width, height);

    ctx.save();
    var anchorX = width * (.72 + .04 * Math.sin(dynamic * .21));
    var anchorY = height * (.40 + .07 * Math.cos(dynamic * .16));
    for (var ring = 0; ring < 6; ring++) {
      ctx.beginPath();
      ctx.arc(anchorX, anchorY, height * (.11 + ring * .086) + dynamic * 2.2, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(218,242,255,' + Math.max(.03, .22 - ring * .03) + ')';
      ctx.lineWidth = 2.5;
      ctx.stroke();
    }
    for (var i = 0; i < 55; i++) {
      var x = (((i * 1277) % 997) / 997) * width;
      var y = (((i * 751) % 929) / 929) * height;
      var offset = reducedMotion ? 0 : Math.sin(dynamic * .9 + i) * 3;
      ctx.fillStyle = 'rgba(230,249,255,' + (.08 + (i % 5) * .045) + ')';
      ctx.beginPath(); ctx.arc(x + offset, y, 1.4 + (i % 3), 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();

    var bottom = ctx.createLinearGradient(0, height * .35, 0, height);
    bottom.addColorStop(0, 'rgba(0,4,16,0)'); bottom.addColorStop(1, 'rgba(0,4,16,.95)');
    ctx.fillStyle = bottom; ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#81e6ff';
    ctx.font = '700 ' + Math.round(height * .027) + 'px system-ui, sans-serif';
    ctx.fillText('DESTINY SKILLS BRIDGE  /  MABRIG TECHNOLOGIES', width * .06, height * .09);

    ctx.fillStyle = '#a5f3fc';
    ctx.font = '700 ' + Math.round(height * .029) + 'px system-ui, sans-serif';
    ctx.fillText(String(scene.label || 'Cinematic lesson').toUpperCase(), width * .06, height * .63);

    var fontSize = Math.round(height * .058);
    ctx.font = '700 ' + fontSize + 'px system-ui, sans-serif';
    var lines = wrappedLines(ctx, scene.caption, width * .86, 4);
    ctx.fillStyle = '#ffffff';
    lines.forEach(function (line, row) {
      ctx.fillText(line, width * .06, height * .71 + row * fontSize * 1.2);
    });

    ctx.font = '500 ' + Math.round(height * .022) + 'px system-ui, sans-serif';
    ctx.fillStyle = '#dbeafe';
    ctx.fillText('Scene ' + (index + 1) + ' / ' + studio.scenes.length + '  •  Source-verified lesson',
      width * .06, height * .955);
    ctx.fillStyle = 'rgba(250,250,255,.21)';
    ctx.fillRect(width * .06, height * .978, width * .88, Math.max(2, height * .006));
    ctx.fillStyle = palette[2];
    ctx.fillRect(width * .06, height * .978,
      width * .88 * Math.min(1, elapsedSeconds / (studio.scenes.length * secondsPerScene)),
      Math.max(2, height * .006));
  }
  function notify(callback, text) {
    if (typeof callback === 'function') callback(text);
  }
  function cancel() {
    if (!current) return;
    var job = current;
    job.cancelled = true;
    if (job.frameId) cancelAnimationFrame(job.frameId);
    if (job.recorder && job.recorder.state !== 'inactive') job.recorder.stop();
    if (job.stream) job.stream.getTracks().forEach(function (track) { track.stop(); });
    current = null;
    busy = false;
  }

  function exportVideo(studio, onStatus, options) {
    if (busy) return Promise.reject(new Error('A lesson clip is already being recorded.'));
    if (!available()) return Promise.reject(new Error('This browser cannot record a canvas video. Try a recent version of Chrome, Edge, Firefox or Safari.'));
    if (!studio || studio.isGeneratedVideo !== false ||
        !Array.isArray(studio.scenes) || studio.scenes.length !== 4 ||
        studio.scenes.some(function (s) {
          return s.durationSeconds !== 8 || typeof s.caption !== 'string' || s.caption.length > 144;
        })) return Promise.reject(new Error('A verified four-scene storyboard is required.'));
    var sceneIndex = options && Number.isInteger(options.sceneIndex) ? options.sceneIndex : null;
    if (sceneIndex !== null && (sceneIndex < 0 || sceneIndex > 3)) return Promise.reject(new Error('Invalid scene index.'));
    var recordingStudio = sceneIndex === null ? studio : { ...studio, scenes: [studio.scenes[sceneIndex]] };
    var selected = format();
    if (!selected) return Promise.reject(new Error('No supported video recording format.'));
    var canvas = document.createElement('canvas');
    var small = !!(navigator.connection && navigator.connection.saveData) || window.innerWidth < 650;
    canvas.width = small ? 960 : 1280;
    canvas.height = small ? 540 : 720;
    var ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return Promise.reject(new Error('Canvas graphics are unavailable.'));
    var duration = recordingStudio.scenes.length * 8;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var stream = canvas.captureStream(24);
    var recorder;
    try {
      recorder = new MediaRecorder(stream, { mimeType: selected.mime, videoBitsPerSecond: small ? 1500000 : 2500000 });
    } catch (error) {
      stream.getTracks().forEach(function (track) { track.stop(); });
      return Promise.reject(new Error('Could not initialize the browser video encoder.'));
    }
    busy = true;
    var job = { recorder: recorder, stream: stream, cancelled: false, frameId: 0 };
    current = job;
    return new Promise(function (resolve, reject) {
      var chunks = [], begun = 0, previousSecond = -1, finished = false;
      function finalize(error, result) {
        if (finished) return;
        finished = true;
        if (job.frameId) cancelAnimationFrame(job.frameId);
        stream.getTracks().forEach(function (track) { track.stop(); });
        if (current === job) current = null;
        busy = false;
        if (error) reject(error);
        else resolve(result);
      }
      recorder.ondataavailable = function (event) {
        if (event.data && event.data.size) chunks.push(event.data);
      };
      recorder.onerror = function () { finalize(new Error('The browser encoder failed.')); };
      recorder.onstop = function () {
        if (job.cancelled) return finalize(new Error('Recording cancelled.'));
        var blob = new Blob(chunks, { type: selected.mime });
        if (blob.size < 1024) return finalize(new Error('No usable video was recorded.'));
        var suffix = sceneIndex === null ? '' : '-scene-' + (sceneIndex + 1);
        var name = 'DDEI-' + safeName(studio.courseId) + '-' + safeName(studio.lessonId) + suffix + '.' + selected.extension;
        download(blob, name);
        notify(onStatus, 'Saved ' + name + ' (' + Math.round(blob.size / 1024) + ' KB). This is an actual silent video file.');
        finalize(null, { fileName: name, extension: selected.extension, size: blob.size });
      };
      function tick(now) {
        if (job.cancelled || finished) return;
        var elapsed = (now - begun) / 1000;
        draw(ctx, canvas, recordingStudio, Math.min(elapsed, duration - .01), reduce);
        var whole = Math.floor(elapsed);
        if (whole !== previousSecond) {
          previousSecond = whole;
          notify(onStatus, 'Recording actual ' + selected.extension.toUpperCase() + ' clip: ' + Math.min(duration, whole) + '/' + duration + ' seconds. Keep this tab open.');
        }
        if (elapsed >= duration) {
          if (recorder.state === 'recording') recorder.stop();
          return;
        }
        job.frameId = requestAnimationFrame(tick);
      }
      draw(ctx, canvas, recordingStudio, 0, reduce);
      try {
        recorder.start(1000);
        begun = performance.now();
        job.frameId = requestAnimationFrame(tick);
      } catch (error) {
        finalize(new Error('Browser video recording could not start.'));
      }
    });
  }

  function downloadProductionPack(studio) {
    if (!studio || !Array.isArray(studio.scenes)) return;
    var scenes = studio.scenes.map(function (scene) {
      return {
        number: scene.sequence, durationSeconds: 8, prompt: [
          'Produce a cinematic 8-second teaching scene with original abstract educational visuals.',
          'On-screen caption: ' + scene.caption,
          'Visual direction: ' + scene.theme + ' / ' + scene.motion,
          'Do not invent factual claims or imitate a real person.',
        ].join('\n'),
        caption: scene.caption,
        evidence: scene.evidence,
      };
    });
    var pack = {
      schemaVersion: 'ddei-native-video-v1',
      title: String(studio.title || ''),
      source: 'DDEI authorized cinematic lesson',
      courseId: studio.courseId, lessonId: studio.lessonId,
      aspectRatio: '16:9', durationSeconds: 32,
      scenes: scenes,
      handoffs: {
        aivideo: 'Import the approved MP4/WebM or use the enabled local GPU adapter to generate a new scene.',
        vidmint: 'Use the source-grounded scene prompts in owner-only VidMint. Paid rendering requires separate approval.',
        contentEngine: 'Use the finished video and factual captions as a new authenticated media draft; do not auto-publish.',
      },
      policy: 'Use only the approved lesson material. No automatic spending, publishing, or external media transfers.',
    };
    download(new Blob([JSON.stringify(pack, null, 2)], { type: 'application/json' }),
      'DDEI-' + safeName(studio.lessonId) + '-production-pack.json');
    return pack;
  }

  window.DDEINativeClip = {
    exportVideo: exportVideo,
    downloadProductionPack: downloadProductionPack,
    available: available,
    cancel: cancel,
  };
})();
