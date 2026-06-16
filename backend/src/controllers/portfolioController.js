const User = require('../models/User');
const { SKILLS } = require('../data/skills');

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

async function generatePortfolio(req, res) {
  const { name, trackId, highlights } = req.body;
  if (!name || !trackId) {
    return res.status(400).json({ message: 'name and trackId are required' });
  }

  const skill = SKILLS.find((s) => s.id === trackId) || null;
  const cleanHighlights = Array.isArray(highlights) ? highlights.filter(Boolean) : [];

  const portfolio = {
    headline: generateHeadline(name, skill),
    summary: generateSummary(name, skill, cleanHighlights),
    skills: skill ? [skill.name] : [],
    highlights: cleanHighlights,
    generatedAt: new Date(),
  };

  if (req.userId) {
    await User.findByIdAndUpdate(req.userId, { portfolio });
  }

  res.json({ portfolio });
}

module.exports = { generatePortfolio };
