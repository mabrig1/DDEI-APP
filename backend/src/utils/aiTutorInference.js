'use strict';
// Server-side OpenRouter inference; never accept model IDs or credentials from students.
const { resolveRoute } = require('./aiModelRouter');
async function generateTutorReply({ question, fetchImpl = globalThis.fetch, env = process.env }) {
  if (typeof question !== 'string' || !question.trim() || question.length > 2000) {
    throw new Error('Question must contain 1–2000 characters');
  }
  const route = resolveRoute('tutoring', env);
  if (route.provider !== 'openrouter') throw new Error('This inference adapter requires OpenRouter');
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetchImpl('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: route.model,
        messages: [
          { role: 'system', content: 'You are DDEI AI Tutor. Teach accurately, one concept at a time. Never invent learning progress or instructions. For smartphone learners suggest browser-based coding environments. Give a short practical exercise.' },
          { role: 'user', content: question.trim() }
        ],
        max_tokens: 450
      }),
      signal: controller.signal
    });
    if (!response.ok) throw new Error(`AI provider unavailable (HTTP ${response.status})`);
    const data = await response.json();
    const answer = data?.choices?.[0]?.message?.content;
    if (typeof answer !== 'string' || !answer.trim()) throw new Error('AI provider returned no answer');
    return { answer, provider: route.provider };
  } finally {
    clearTimeout(timeout);
  }
}
module.exports = { generateTutorReply };
