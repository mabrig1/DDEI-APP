const { SKILLS } = require('../data/skills');
const { OPPORTUNITIES } = require('../data/opportunities');

function listSkills(req, res) {
  res.json({ skills: SKILLS });
}

function listOpportunities(req, res) {
  const { skillId } = req.query;
  const opportunities = skillId
    ? OPPORTUNITIES.filter((o) => o.skillId === skillId)
    : OPPORTUNITIES;
  res.json({ opportunities });
}

module.exports = { listSkills, listOpportunities };
