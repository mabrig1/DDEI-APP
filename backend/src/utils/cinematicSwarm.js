'use strict';

/**
 * DDEI Cinematic Swarm — a zero-key, read-only teaching storyboard.
 *
 * Four deterministic collaborating agents convert already-authorized course
 * lessons to short browser-playable scenes. This is NOT AI video generation;
 * no external provider, image upload, learner data export, or credit spend.
 * Every spoken factual caption is directly traceable to lesson source text.
 */
const SCENE_SECONDS = 8;
const MAX_SCENES = 4;

function plain(value) {
  return String(value == null ? '' : value)
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function clipSource(value, limit = 144) {
  const cleaned = plain(value);
  if (cleaned.length <= limit) return cleaned;
  const candidate = cleaned.slice(0, limit);
  const wordBoundary = candidate.lastIndexOf(' ');
  return (wordBoundary >= 48 ? candidate.slice(0, wordBoundary) : candidate).trim();
}

// Agent 1: Source Scout — select only exact material from the enrolled lesson.
function sourceScout(lesson) {
  const sources = [
    { kind: 'title', index: 0, text: plain(lesson.title) },
    ...(Array.isArray(lesson.content) ? lesson.content : []).map((item, index) =>
      ({ kind: 'content', index, text: plain(item) })),
    ...(Array.isArray(lesson.keyTakeaways) ? lesson.keyTakeaways : []).map((item, index) =>
      ({ kind: 'takeaway', index, text: plain(item) })),
  ].filter((item) => item.text);
  return sources;
}

// Agent 2: Visual Director — choose reproducible camera treatments, never assets.
function visualDirector(course) {
  const category = plain(course.category || course.title).toLowerCase();
  if (/cyber|security|coding|developer|programming|cloud|software|web/.test(category)) return 'tech';
  if (/market|business|entrepreneur|finance|affiliate|sale/.test(category)) return 'business';
  if (/creative|video|design|music|media|content/.test(category)) return 'creative';
  return 'learning';
}

// Agent 3: Narrator — quote exact, bounded evidence instead of hallucinating.
function narrationAgent(source, fallback, label, motion, theme, index) {
  const chosen = source || fallback;
  const caption = clipSource(chosen?.text || '');
  return {
    id: 'scene-' + (index + 1),
    sequence: index + 1,
    durationSeconds: SCENE_SECONDS,
    label,
    caption,
    narration: caption,
    motion,
    theme,
    evidence: {
      sourceKind: chosen?.kind || 'title',
      sourceIndex: chosen?.index || 0,
      excerpt: caption,
    },
  };
}

// Agent 4: Evidence Guardian — reject any output detached from the lesson.
function evidenceGuardian(scenes, sources) {
  return scenes.every((scene) =>
    scene.caption &&
    scene.durationSeconds === SCENE_SECONDS &&
    sources.some((source) =>
      source.kind === scene.evidence.sourceKind &&
      source.index === scene.evidence.sourceIndex &&
      source.text.includes(scene.caption)
    ));
}

function buildCinematicLesson(course, module, lesson) {
  if (!course || !module || !lesson) throw new TypeError('Course, module and lesson are required');
  const sources = sourceScout(lesson);
  if (!sources.length) throw new TypeError('Lesson has no source material');

  const title = sources.find((entry) => entry.kind === 'title') || sources[0];
  const content = sources.filter((entry) => entry.kind === 'content');
  const takeaways = sources.filter((entry) => entry.kind === 'takeaway');
  const picks = [
    title,
    content[0] || takeaways[0] || title,
    takeaways[0] || content[1] || content[0] || title,
    takeaways[1] || content[content.length - 1] || takeaways[0] || title,
  ];
  const labels = ['Opening frame', 'Understand the idea', 'Remember this', 'Put it to work'];
  const motions = ['reveal', 'pan', 'focus', 'rise'];
  const theme = visualDirector(course);
  const scenes = picks.slice(0, MAX_SCENES).map((source, index) =>
    narrationAgent(source, title, labels[index], motions[index], theme, index));
  if (!evidenceGuardian(scenes, sources)) {
    throw new Error('Storyboard failed source-evidence verification');
  }

  const practiceSource = takeaways[0] || content[0] || title;
  return {
    mode: 'deterministic-browser-storyboard',
    isGeneratedVideo: false,
    cost: 'No AI API calls or video credits',
    courseId: String(course.id),
    moduleId: String(module.id),
    lessonId: String(lesson.id),
    title: plain(lesson.title),
    sceneDurationSeconds: SCENE_SECONDS,
    durationSeconds: scenes.length * SCENE_SECONDS,
    scenes,
    practice: {
      prompt: 'In your own words, how would you apply this principle?',
      source: clipSource(practiceSource.text, 200),
      evidence: { sourceKind: practiceSource.kind, sourceIndex: practiceSource.index },
    },
    agents: [
      { name: 'Source Scout', role: 'Extract lesson material', state: 'complete' },
      { name: 'Visual Director', role: 'Build symbolic camera scenes', state: 'complete' },
      { name: 'Narrator', role: 'Prepare captions for optional speech', state: 'complete' },
      { name: 'Evidence Guardian', role: 'Verify every factual caption against the lesson', state: 'complete' },
    ],
    disclosure: 'Interactive animated storyboard with optional browser speech, not a rendered video. All narration comes from this lesson.',
  };
}

module.exports = {
  SCENE_SECONDS,
  buildCinematicLesson,
  evidenceGuardian,
  sourceScout,
  visualDirector,
};
