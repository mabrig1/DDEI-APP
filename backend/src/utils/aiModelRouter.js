'use strict';
// Provider-agnostic, server-side routing policy. No client-provided model IDs or API keys.
const TASKS = Object.freeze({
  tutoring: ['HF_TUTOR_MODEL', 'OPENROUTER_TUTOR_MODEL'],
  coding: ['HF_CODE_MODEL', 'OPENROUTER_CODE_MODEL'],
  assessment: ['HF_ASSESS_MODEL', 'OPENROUTER_ASSESS_MODEL'],
  career: ['HF_CAREER_MODEL', 'OPENROUTER_CAREER_MODEL'],
});
const ALLOWED_PROVIDERS = Object.freeze(['huggingface', 'openrouter']);
function resolveRoute(task, env = process.env) {
  if (!Object.prototype.hasOwnProperty.call(TASKS, task)) throw new Error('Unsupported AI task');
  const preferred = (env.DDEI_AI_PROVIDER || 'huggingface').toLowerCase();
  if (!ALLOWED_PROVIDERS.includes(preferred)) throw new Error('Unsupported AI provider');
  const keys = TASKS[task];
  const selected = preferred === 'huggingface' ? keys : [...keys].reverse();
  for (const key of selected) {
    const model = env[key];
    const provider = key.startsWith('HF_') ? 'huggingface' : 'openrouter';
    const secret = provider === 'huggingface' ? env.HF_TOKEN : env.OPENROUTER_API_KEY;
    if (typeof model === 'string' && model.trim() && typeof secret === 'string' && secret.trim()) {
      return Object.freeze({ provider, model: model.trim(), task });
    }
  }
  throw new Error('No configured AI provider for this task');
}
module.exports = { resolveRoute, TASKS };
