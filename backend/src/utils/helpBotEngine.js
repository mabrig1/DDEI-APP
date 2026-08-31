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
const RECRUITMENT_Q = /\b(work with us|earn while you learn|recruit|recruitment|internship|trainee|part.?time work|join the team)\b/i;
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
      "Yes — every new account gets a 7-day free trial with access to your chosen skill track, no card required. After the trial, you can upgrade to Premium " +
      "or apply for a scholarship to keep going for free."
    );
  }

  if (PREMIUM.test(text)) {
    return (
      'Premium is ₦2,000/month or ₦24,000/year. It unlocks the AI-Powered Portfolio Builder, priority opportunity matching, and the AI Advisor — on top of full course access. ' +
      'You can upgrade any time from the Premium section on the homepage.'
    );
  }

  if (COST.test(text)) {
    return (
      "Getting started is free — every account starts with a 7-day free trial. After that, Premium is ₦2,000/month (or ₦24,000/year), " +
      "or you can apply for a scholarship if cost is a barrier. Which would you like to know more about — Premium or scholarships?"
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

  if (RECRUITMENT_Q.test(text)) {
    return (
      'Open the “Work With Us” section and choose an opportunity track under Earn While You Learn. You can apply for trainee, project-based, commission-based, internship or paid part-time opportunities. ' +
      'There is no application fee, and the role, workload and compensation will be explained before you accept an engagement.'
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
      'Earning potential ranges from $350-$2,000/month in Tier 1 skills to $800-$5,000/month in Tier 2 skills, paid in dollars via platforms like Upwork, Fiverr, ' +
      'or direct remote contracts. Want a breakdown for a specific skill?'
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
      'Click "Apply Now" at the top of the page, fill in your details and chosen skill track, and set a password — this creates your account with an instant 7-day free trial. ' +
      "No payment needed to apply."
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
      "Hi! I'm here to help you understand Destiny Skills Bridge. Ask me about our skill tracks, pricing, the free trial, scholarships, or how to apply."
    );
  }

  return (
    "I can help with questions about our skill tracks, pricing, the free trial, scholarships, applying, or contacting our team. " +
    "Could you rephrase your question, or try one of those topics?"
  );
}

module.exports = { buildHelpReply };
