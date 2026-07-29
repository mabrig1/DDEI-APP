const { SKILLS } = require('../data/skills');

const GREETING = /\b(hi|hello|hey|good morning|good afternoon)\b/i;
const SKILL_CHOICE = /\b(which skill|what skill|choose|recommend|best skill|start with)\b/i;
const EARNING = /\b(earn|salary|pay|money|income|dollar|naira)\b/i;
const TIME = /\b(how long|duration|weeks|months|time)\b/i;
const PORTFOLIO = /\b(portfolio|resume|cv|showcase)\b/i;
const JOB = /\b(job|gig|client|hire|opportunity|work)\b/i;
const NO_EXPERIENCE = /\b(no experience|beginner|new to this|never done)\b/i;

function findMentionedSkill(message) {
  const lower = message.toLowerCase();
  return SKILLS.find((s) => lower.includes(s.name.toLowerCase()) || lower.includes(s.id.replace(/-/g, ' ')));
}

function buildReply(message, history = []) {
  const text = message.trim();
  const mentioned = findMentionedSkill(text);

  if (mentioned) {
    return (
      `${mentioned.name} is a great choice. Most learners finish the core track in about ${mentioned.durationWeeks} weeks, ` +
      // Skills carry ngnMonthly only — an earlier version read a usdMonthly
      // field that has never existed on this data, so this line shipped the
      // word "undefined" to learners asking what they could earn.
      `and global clients in this field typically pay ${mentioned.earningPotential.ngnMonthly} per month at local rates. ` +
      `Want me to show you the application steps, or compare it with another skill track?`
    );
  }

  if (GREETING.test(text) && history.length === 0) {
    return (
      "Hi, I'm your Destiny Skills Bridge AI Advisor. Tell me a bit about your goals — for example, " +
      "\"I want to earn in dollars within 3 months\" or \"I'm a complete beginner, what should I learn?\" — and I'll point you to the right skill track."
    );
  }

  if (NO_EXPERIENCE.test(text)) {
    const starter = SKILLS.filter((s) => s.tier === 'tier1');
    const names = starter.map((s) => s.name).join(', ');
    const weeks = starter.map((s) => s.durationWeeks);
    return (
      `No experience needed to start. Our Tier 1 — Fast Start tracks (${names}) are designed for complete beginners ` +
      `and take ${Math.min(...weeks)}-${Math.max(...weeks)} weeks. They're the fastest path to your first dollar-paying client.`
    );
  }

  if (SKILL_CHOICE.test(text)) {
    return (
      'It depends on your timeline. If you want income fast, start with Tier 1 (Digital Marketing, Virtual Assistance, or Content Writing) — ' +
      'these have shorter learning curves. If you want higher long-term earning potential and can invest more time, Tier 2 ' +
      '(AI Tools & Automation, UI/UX Design, or Web Development) pays significantly more. What matters more to you right now: speed or long-term growth?'
    );
  }

  if (EARNING.test(text)) {
    return (
      'Earning potential ranges from $350-$2,000/month in Tier 1 skills up to $800-$5,000/month in Tier 2 skills, paid in dollars via platforms ' +
      'like Upwork, Fiverr, or direct remote contracts (often settled through Payoneer). Which skill would you like exact numbers for?'
    );
  }

  if (TIME.test(text)) {
    return (
      'Tier 1 tracks take 6-8 weeks to job-ready. Tier 2 tracks take 10-12 weeks since they cover more technical depth. ' +
      'Either way, you can apply for gigs as soon as you complete your first project-based milestone — you do not need to finish the whole track first.'
    );
  }

  if (PORTFOLIO.test(text)) {
    return (
      "Once you've completed a couple of milestones, our AI-powered Portfolio Builder (Premium feature) turns your projects into a polished, " +
      "internationally-ready portfolio you can send to clients. Want me to walk you through generating one?"
    );
  }

  if (JOB.test(text)) {
    return (
      "After your skill track, you'll get matched in our Opportunity Matching section with sample global gigs and remote roles for your specific skill — " +
      "real clients from the US, UK, Canada, and Europe post roles that fit graduates of each track."
    );
  }

  return (
    "Got it. I can help you pick a skill track, estimate your earning potential in dollars, explain timelines, or guide you on building a portfolio. " +
    "What would be most useful right now?"
  );
}

module.exports = { buildReply };
