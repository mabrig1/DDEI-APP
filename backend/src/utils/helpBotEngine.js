const GREETING = /\b(hi|hello|hey|good morning|good afternoon|good evening)\b/i;
const WHAT_IS = /\b(what is|what's|explain|about this|what does .*do|what do you do)\b/i;
const COST = /\b(cost|price|pricing|fee|how much|naira|₦|expensive|free)\b/i;
const TRIAL = /\b(trial|free trial|try it|test it)\b/i;
const PREMIUM = /\b(premium|upgrade|subscription|subscribe)\b/i;
const SCHOLARSHIP = /\b(scholarship|can't afford|cannot afford|no money|sponsor)\b/i;
const APPLY = /\b(apply|application|sign up|signup|register|join|get started|enroll)\b/i;
const SKILLS_Q = /\b(skills?|tracks?|courses?|learn|what can i study|what do you teach)\b/i;
const TIME_Q = /\b(how long|duration|weeks|months|time.?frame)\b/i;
const EARNING_Q = /\b(earn|salary|pay|income|dollar|money)\b/i;
const AI_ADVISOR_Q = /\b(ai advisor|advisor)\b/i;
const PORTFOLIO_Q = /\b(portfolio)\b/i;
const OPPORTUNITY_Q = /\b(job|gig|client|hire|opportunity|work)\b/i;
const LOGIN_HELP = /\b(log ?in|password|forgot|reset|can't access|cannot access|locked out)\b/i;
const CONTACT_Q = /\b(contact|support|human|talk to someone|whatsapp|help me|reach you)\b/i;

function buildHelpReply(message, history = []) {
  const text = message.trim();

  if (CONTACT_Q.test(text)) {
    return (
      'You can reach our team directly on WhatsApp using the green chat button in the corner of this page, or submit your question there — ' +
      'a real person will get back to you.'
    );
  }

  if (LOGIN_HELP.test(text)) {
    return (
      'If you cannot log in, click "Log In" then "Forgot your password?" to reset it by email. If you never created a password ' +
      '(e.g. you applied a while ago), use the same reset flow — it works for any account on file.'
    );
  }

  if (SCHOLARSHIP.test(text)) {
    return (
      "We offer Limited Scholarships (free access to all courses) and Full Scholarships (every course plus the AI Advisor and Portfolio Builder, free) " +
      "to applicants who can't afford Premium. Mention your situation in the \"why do you want to join\" field when you apply — our team reviews every application."
    );
  }

  if (TRIAL.test(text)) {
    return (
      'We no longer offer free trials. Foundational Digital Skills is the free introductory course. Every other course costs ₦10,000 online or ₦50,000 with human-assisted learning. Existing registered members retain their previous access.'
    );
  }

  if (PREMIUM.test(text)) {
    return (
      'Course pricing has replaced new Premium subscriptions: ₦10,000 per online course or ₦50,000 per course with human-assisted learning. Every paid student also receives access to Premium platform content. Foundational Digital Skills remains free, and existing registered members retain their previous access.'
    );
  }

  if (COST.test(text)) {
    return (
      'Foundational Digital Skills is free. Every other course costs ₦10,000 for online self-paced learning or ₦50,000 for online plus human-assisted learning. Both paid options include Premium platform content. Scholarships may still be available where cost is a barrier.'
    );
  }

  if (AI_ADVISOR_Q.test(text)) {
    return (
      "The AI Advisor is a Premium chat feature that gives you personalized guidance on which skill to learn, realistic earning expectations, and your career path. " +
      "You'll find it further down this page once you're logged in."
    );
  }

  if (PORTFOLIO_Q.test(text)) {
    return (
      "The AI Portfolio Builder (a Premium feature) turns the projects you complete into a polished, internationally-ready portfolio summary you can send to clients."
    );
  }

  if (OPPORTUNITY_Q.test(text)) {
    return (
      "Once you finish a skill track, our Opportunity Matching section shows you sample global gigs and remote roles for your specific skill — real clients from the US, UK, Canada, and Europe " +
      "post roles that fit graduates of each track."
    );
  }

  if (TIME_Q.test(text)) {
    return (
      'Tier 1 tracks (Digital Marketing, Virtual Assistance, Content Writing) take 6-8 weeks. Tier 2 tracks (AI Tools & Automation, UI/UX Design, Web Development) ' +
      'take 10-12 weeks since they go deeper technically.'
    );
  }

  if (EARNING_Q.test(text)) {
    return (
      'Income depends on skill, experience, portfolio quality, location, market demand and client acquisition. Destiny Skills Bridge provides practical training and opportunity guidance, but it does not promise or guarantee a particular income.'
    );
  }

  if (SKILLS_Q.test(text)) {
    return (
      'We teach six skill tracks across two tiers. Tier 1 — Fast Start (6-8 weeks): Digital Marketing, Virtual Assistance & Customer Support, Content Writing & Copywriting. ' +
      'Tier 2 — High Growth (10-12 weeks): AI Tools & Automation, UI/UX & Graphic Design, Web Development Fundamentals. ' +
      'Scroll to the Skills section above, or click "Apply Now" to pick one.'
    );
  }

  if (APPLY.test(text)) {
    return (
      'Click "Apply Now" at the top of the page, fill in your details and chosen skill track, and set a password. No payment is needed to apply or begin the free Foundational Digital Skills course; paid-course enrollment is completed separately.'
    );
  }

  if (WHAT_IS.test(text)) {
    return (
      'Destiny Skills Bridge helps African youth learn in-demand digital skills (like Digital Marketing, AI Tools & Automation, or Web Development) and connect with global, ' +
      'dollar-paying clients and remote opportunities. You get courses, an AI Advisor, a Portfolio Builder, and real opportunity matching.'
    );
  }

  if (GREETING.test(text) && history.length === 0) {
    return (
      "Hi! I'm here to help you understand Destiny Skills Bridge. Ask me about our skill tracks, course pricing, the free introductory course, scholarships, or how to apply."
    );
  }

  return (
    "I can help with questions about our skill tracks, pricing, the free introductory course, scholarships, applying, or contacting our team. " +
    "Could you rephrase your question, or try one of those topics?"
  );
}

module.exports = { buildHelpReply };
