const User = require('../models/User');
const { SKILLS } = require('../data/skills');
const { runAgent } = require('../utils/aiClient');
const { getAgent } = require('../utils/aiAgents');
const { isAiEnabled, openRouterConfig } = require('../config/openrouter');
const { allowAiCall, callerKey } = require('../utils/aiRateLimit');

function generateHeadline(name, skill) {
  return `${name} — ${skill ? skill.name : 'Multi-skilled'} Professional | Global Remote Talent`;
}

function generateSummary(name, skill, highlights) {
  const skillName = skill ? skill.name : 'in-demand digital skills';
  const highlightLine = highlights.length
    ? ` Recent work includes ${highlights.slice(0, 3).join(', ')}.`
    : '';
  return (
    `${name} is a results-driven professional skilled in ${skillName}, trained through Destiny Skills Bridge's ` +
    `global-standard curriculum.${highlightLine} Available for remote engagements with international clients and teams.`
  );
}

/** The original template writer — still the fallback whenever AI is unavailable. */
function templatePortfolio(name, skill, highlights) {
  return {
    headline: generateHeadline(name, skill),
    summary: generateSummary(name, skill, highlights),
    strengths: [],
  };
}

/**
 * Ask the model for portfolio copy.
 *
 * Returns null rather than throwing on any failure — including a reply that
 * isn't the JSON we asked for. Portfolio copy is client-facing: shipping
 * half-parsed model output would be worse than the template, which is at least
 * always coherent.
 */
async function aiPortfolio({ req, name, skill, highlights }) {
  if (!isAiEnabled()) return null;
  if (!allowAiCall(callerKey(req), openRouterConfig().rateLimitPerMinute)) return null;

  const agent = getAgent('portfolio');
  const brief = [
    `Name: ${name}`,
    `Skill track: ${skill ? `${skill.name} (${skill.id}) — ${skill.description}` : 'not specified'}`,
    highlights.length ? `Completed work:\n- ${highlights.join('\n- ')}` : 'Completed work: none listed yet.',
  ].join('\n');

  try {
    const result = await runAgent({
      system: agent.system,
      message: `Write the portfolio copy for this learner.\n\n${brief}`,
      tools: agent.tools,
      maxTokens: agent.maxTokens,
      temperature: agent.temperature,
    });

    // Models wrap JSON in code fences often enough to be worth handling rather
    // than discarding an otherwise good response over three backticks.
    const json = result.reply.replace(/^```(?:json)?/i, '').replace(/```$/, '').trim();
    const parsed = JSON.parse(json.slice(json.indexOf('{'), json.lastIndexOf('}') + 1));

    if (typeof parsed.headline !== 'string' || typeof parsed.summary !== 'string') return null;
    if (!parsed.headline.trim() || !parsed.summary.trim()) return null;

    return {
      headline: parsed.headline.trim().slice(0, 140),
      summary: parsed.summary.trim().slice(0, 900),
      strengths: Array.isArray(parsed.strengths)
        ? parsed.strengths.filter((s) => typeof s === 'string' && s.trim()).slice(0, 3).map((s) => s.trim())
        : [],
      model: result.model,
    };
  } catch (err) {
    console.warn(`[ai] portfolio fell back to the template writer — ${err.message}`);
    return null;
  }
}

async function generatePortfolio(req, res) {
  const { name, trackId, highlights } = req.body;
  if (!name || !trackId) {
    return res.status(400).json({ message: 'name and trackId are required' });
  }

  const skill = SKILLS.find((s) => s.id === trackId) || null;
  const cleanHighlights = Array.isArray(highlights) ? highlights.filter(Boolean) : [];

  const written = await aiPortfolio({ req, name, skill, highlights: cleanHighlights })
    || templatePortfolio(name, skill, cleanHighlights);

  const portfolio = {
    headline: written.headline,
    summary: written.summary,
    strengths: written.strengths,
    skills: skill ? [skill.name] : [],
    highlights: cleanHighlights,
    source: written.model ? 'ai' : 'template',
    generatedAt: new Date(),
  };

  if (req.userId) {
    await User.findByIdAndUpdate(req.userId, { portfolio });
  }

  res.json({ portfolio });
}

module.exports = { generatePortfolio };
