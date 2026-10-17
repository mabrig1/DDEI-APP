'use strict';
// Server-side model selection. Student input cannot override provider or model.
const TASKS = Object.freeze({
  tutoring: ['HF_TUTOR_MODEL', 'OPENROUTER_TUTOR_MODEL'],
  coding: ['HF_CODE_MODEL', 'OPENROUTER_CODING_MODEL', 'OPENROUTER_CODE_MODEL'],
  reasoning: ['HF_REASONING_MODEL', 'OPENROUTER_REASONING_MODEL'],
  assessment: ['HF_ASSESS_MODEL', 'OPENROUTER_ASSESSMENT_MODEL', 'OPENROUTER_ASSESS_MODEL'],
  career: ['HF_CAREER_MODEL', 'OPENROUTER_CAREER_MODEL'],
  agent: ['HF_AGENT_MODEL', 'OPENROUTER_AGENT_MODEL'],
  vision: ['HF_VISION_MODEL', 'OPENROUTER_VISION_MODEL'],
  fallback: ['HF_FALLBACK_MODEL', 'OPENROUTER_FALLBACK_MODEL'],
});
const ALLOWED_PROVIDERS = Object.freeze(['huggingface', 'openrouter']);
function resolveRoute(task, env = process.env) {
  if (!Object.prototype.hasOwnProperty.call(TASKS, task)) throw new Error('Unsupported AI task');
  const preferred = (env.DDEI_AI_PROVIDER || 'huggingface').toLowerCase();
  if (!ALLOWED_PROVIDERS.includes(preferred)) throw new Error('Unsupported AI provider');
  const prefix = preferred === 'openrouter' ? 'OPENROUTER_' : 'HF_';
  for (const key of TASKS[task].filter(k => k.startsWith(prefix))) {
    const model = env[key];
    const secret = preferred === 'openrouter' ? env.OPENROUTER_API_KEY : env.HF_TOKEN;
    if (typeof model === 'string' && model.trim() && typeof secret === 'string' && secret.trim()) {
      return Object.freeze({ provider: preferred, model: model.trim(), task });
    }
  }
  throw new Error('No configured AI provider for this task');
}
module.exports = { resolveRoute, TASKS };
