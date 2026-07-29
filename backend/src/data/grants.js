/**
 * Digital Skills Grants Directory.
 *
 * Funding, fellowships and fully-funded training that Nigerians can actually
 * apply to — for learners, developers, AI engineers and technical founders.
 *
 * ── On verification ──────────────────────────────────────────────────────────
 * This is money and deadlines. Someone will rearrange their week around what
 * this file says, and a wrong closing date costs them the opportunity. So every
 * entry carries its own provenance:
 *
 *   verified: true   — the headline facts (deadline, value, who can apply) were
 *                      checked against reporting or the programme's own site on
 *                      `verifiedOn`.
 *   verified: false  — the programme is real, but at least one detail here is
 *                      unconfirmed. `caveat` says exactly which. The UI shows
 *                      these differently and never presents them as certain.
 *
 * No entry states a figure or a date that was not checked. Where a number could
 * not be confirmed, the field says so in words rather than guessing — an
 * invented deadline is worse than no deadline.
 *
 * Grant rounds open and close constantly. `verifiedOn` ages; the UI shows it,
 * and every entry tells the learner to confirm on the official page before
 * applying. Re-check this file each quarter.
 */

// Bump when entries are re-checked, so the UI can show how fresh the list is.
const DIRECTORY_VERIFIED_ON = '2026-07-29';

const CATEGORIES = [
  { id: 'stipend', title: 'Paid Fellowships', icon: '💸', blurb: 'Training that pays you a stipend while you learn.' },
  { id: 'training', title: 'Fully-Funded Training', icon: '🎓', blurb: 'Free structured training, mentorship and certification.' },
  { id: 'credits', title: 'Cloud & AI Credits', icon: '☁️', blurb: 'Free infrastructure and AI compute for builders shipping real products.' },
  { id: 'capital', title: 'Seed Capital & Innovation Funds', icon: '🚀', blurb: 'Cash for founders and technical teams turning code into a business.' },
  { id: 'institutional', title: 'Institutional Grants', icon: '🏛️', blurb: 'Funding organisations apply for to train others. Not for individuals.' },
];

const LEVELS = [
  { id: 'beginner', label: 'Beginner / Career changer' },
  { id: 'intermediate', label: 'Intermediate developer' },
  { id: 'expert', label: 'Expert / AI engineer' },
  { id: 'founder', label: 'Founder / Organisation' },
];

const GRANTS = [
  {
    id: 'bosun-tijani-gen-ai-fellowship',
    name: 'Bosun Tijani Foundation Gen AI Fellowship (Cohort 2)',
    provider: 'Bosun Tijani Foundation',
    category: 'stipend',
    levels: ['beginner', 'intermediate', 'expert'],
    value: '₦50,000 monthly stipend + 6 months fully-funded training',
    summary:
      'A six-month Generative AI fellowship for young Nigerians, running in two tracks: AI Engineering '
      + '(machine learning, model fine-tuning, MLOps, agentic RAG, cloud deployment, AI security) and AI Application '
      + '(Next.js, React, AI API integration, AI UX and product design, backend and database integration).',
    whatYouGet: [
      '₦50,000 monthly stipend for six months',
      'Mentorship from working AI professionals',
      'Hands-on real-world projects',
      'Certificate of completion',
      'Premium learning materials and software',
      'Job placement and career support',
    ],
    eligibility: 'Young Nigerians. In-person at the ICT Park, Abeokuta or the ICT Park, Kano.',
    deadline: '2026-07-31',
    startsOn: '2026-09-01',
    url: 'https://www.bosuntijanifoundation.org/',
    location: 'Abeokuta & Kano (in person)',
    effort: '6 months, full programme',
    verified: true,
    verifiedOn: DIRECTORY_VERIFIED_ON,
    tags: ['ai', 'machine learning', 'nextjs', 'react', 'mlops', 'rag', 'stipend', 'nigeria', 'fellowship'],
  },

  {
    id: '3mtt-deeptech-ready',
    name: '3MTT DeepTech_Ready Upskilling Programme',
    provider: 'Federal Government of Nigeria (3MTT / NITDA) with Google.org and Data Science Nigeria',
    category: 'training',
    levels: ['intermediate', 'expert'],
    value: 'Free advanced AI & data science training (funded by a ₦2.8bn Google.org grant)',
    summary:
      'Advanced, fully-funded training in Data Science and AI for Nigerians who already have basic-to-intermediate '
      + 'technical skills. Five AI specialisation tracks, nine courses and 54 practical topics, taught by Nigerian AI '
      + 'professionals, combining self-paced and on-site learning with projects, mentorship and job matching.',
    whatYouGet: [
      'Five AI specialisation tracks across nine courses',
      'Data Science, Machine Learning, Computer Vision, NLP, Advanced Data Analysis',
      'Hands-on projects and mentorship',
      'Job matching support',
    ],
    eligibility: 'Nigerians with basic-to-intermediate technical knowledge. Open to 3MTT fellows and to individuals.',
    deadline: null,
    deadlineNote: 'Rolling cohorts — applications were open when this was checked. Confirm on the portal.',
    url: 'https://3mtt.nitda.gov.ng/deeptech/',
    location: 'Nigeria — self-paced plus on-site',
    effort: '6 months, blended',
    verified: true,
    verifiedOn: DIRECTORY_VERIFIED_ON,
    tags: ['ai', 'data science', 'machine learning', 'nlp', 'computer vision', 'free', 'nigeria', 'government'],
  },

  {
    id: '3mtt',
    name: '3 Million Technical Talent (3MTT)',
    provider: 'Federal Ministry of Communications, Innovation & Digital Economy (NITDA)',
    category: 'training',
    levels: ['beginner', 'intermediate'],
    value: 'Free training across the full technical stack',
    summary:
      "Nigeria's national technical talent programme, and the front door to DeepTech_Ready. Covers software "
      + 'development, cloud computing, DevOps, cybersecurity, data science, AI/ML, UI/UX and product management.',
    whatYouGet: [
      'Structured training in a chosen technical track',
      'Community and peer learning',
      'A route into the advanced DeepTech_Ready programme',
    ],
    eligibility: 'Nigerian citizens. Entry-level tracks available — no prior experience needed for most.',
    deadline: null,
    deadlineNote: 'Runs in cohorts. Check the portal for the current application window.',
    url: 'https://3mtt.nitda.gov.ng/',
    location: 'Nigeria — nationwide',
    effort: 'Varies by track',
    verified: true,
    verifiedOn: DIRECTORY_VERIFIED_ON,
    tags: ['web development', 'cloud', 'devops', 'cybersecurity', 'data science', 'ui/ux', 'free', 'nigeria'],
  },

  {
    id: 'google-africa-applied-ai-lab',
    name: 'Google Africa Applied AI Lab',
    provider: 'Google / Google DeepMind (AI Futures Fund)',
    category: 'capital',
    levels: ['expert', 'founder'],
    value: 'Early access to Google DeepMind models, technical mentorship and potential funding connections',
    summary:
      "Google's first African Applied AI Lab, based in Ghana, supporting African AI founders and researchers in turning "
      + 'ideas into market-ready AI products. Focus areas: the future of work, knowledge, software development, '
      + 'creativity and entertainment.',
    whatYouGet: [
      'Early access to Google DeepMind models',
      'Co-development period with Google technical experts',
      'Mentorship and potential funding connections',
    ],
    eligibility:
      'African AI founders, teams and researchers with a real project, prototype or startup. Not a beginner scholarship — '
      + 'you need something already built or seriously specified.',
    deadline: '2026-08-31',
    url: 'https://labs.google/aifuturesfund/africaailab',
    location: 'Ghana-based lab, open across Africa',
    effort: 'Co-development from mid-September to early December',
    verified: true,
    verifiedOn: DIRECTORY_VERIFIED_ON,
    tags: ['ai', 'deepmind', 'research', 'startup', 'founder', 'africa'],
  },

  {
    id: 'us-mission-nigeria-pd-grants',
    name: 'U.S. Mission Nigeria — Public Diplomacy Grants (digital, tech & innovation)',
    provider: 'U.S. Embassy Abuja / U.S. Consulate General Lagos',
    category: 'institutional',
    levels: ['founder'],
    value: 'Awards in the tens of thousands of US dollars — check the current Annual Program Statement for the exact band',
    summary:
      'The U.S. Mission in Nigeria funds projects in entrepreneurship and innovation, including digital and 21st-century '
      + 'skills, technology and artificial intelligence, and youth workforce readiness. This is the most relevant fit for an '
      + 'organisation seeking funding to train a cohort of Nigerian AI and web developers.',
    whatYouGet: [
      'Project funding for a defined training or innovation programme',
      'Association with the U.S. Mission programme network',
    ],
    eligibility:
      'Organisations only — Nigerian nonprofits, NGOs and higher-education institutions. For-profit companies are NOT eligible. '
      + 'Individuals cannot apply.',
    deadline: null,
    deadlineNote:
      'Deadlines run per Annual Program Statement and change every cycle. Take the current dates from the official grants page.',
    url: 'https://ng.usembassy.gov/grants/',
    contact: 'LagosPASGrants@state.gov · PASAbujaGrants@State.gov',
    location: 'Nigeria',
    effort: 'Full proposal — allow several weeks',
    verified: false,
    caveat:
      'The programme family is real and covers digital skills, tech and AI. A specific "Creative, Digital & Innovation Economy '
      + 'Initiative" round at $20,000–$60,000 closing 20 August 2026 could NOT be confirmed against an official source. '
      + 'Treat the amount and any deadline as unconfirmed and read the live Annual Program Statement before planning around it.',
    verifiedOn: DIRECTORY_VERIFIED_ON,
    tags: ['institutional', 'nonprofit', 'university', 'digital skills', 'ai', 'nigeria', 'usa'],
  },

  {
    id: 'google-for-startups-cloud',
    name: 'Google for Startups Cloud Program',
    provider: 'Google Cloud',
    category: 'credits',
    levels: ['expert', 'founder'],
    value: 'Google Cloud and AI credits, scaled by startup stage, plus technical support',
    summary:
      'Non-dilutive cloud and AI credits for startups building on Google Cloud, including Vertex AI. Covers the hosting and '
      + 'model-inference bill that usually kills an early AI product before it finds users.',
    whatYouGet: [
      'Google Cloud and Vertex AI credits',
      'Technical mentorship and architecture support',
      'Google Workspace and startup community access',
    ],
    eligibility:
      'Early-stage startups and independent developers with a product. Higher credit tiers generally need institutional '
      + 'funding or an accelerator association.',
    deadline: null,
    deadlineNote: 'Applications are open continuously.',
    url: 'https://cloud.google.com/startup',
    location: 'Global — open to Nigerian founders and developers',
    effort: 'Short online application',
    verified: false,
    caveat:
      'Credit amounts are tiered and Google revises them regularly. The specific figure quoted around the internet '
      + '(commonly "$100,000" or "$200,000") is the top tier, not what a solo developer should expect. Read the current tiers on the page.',
    verifiedOn: DIRECTORY_VERIFIED_ON,
    tags: ['cloud', 'ai', 'vertex ai', 'credits', 'startup', 'developer', 'infrastructure'],
  },

  {
    id: 'aws-activate',
    name: 'AWS Activate',
    provider: 'Amazon Web Services',
    category: 'credits',
    levels: ['intermediate', 'expert', 'founder'],
    value: 'AWS credits scaled by stage, plus technical support and training',
    summary:
      'AWS credits for startups and independent builders, covering compute, storage, databases and Bedrock model access. '
      + 'The self-service tier is open to any builder with a project; larger packages come through an accelerator or VC referral.',
    whatYouGet: [
      'AWS credits toward hosting and AI/ML services',
      'AWS technical support credits',
      'Training and architecture resources',
    ],
    eligibility: 'Startups and developers with a working product or MVP. Open self-service tier requires no referral.',
    deadline: null,
    deadlineNote: 'Applications are open continuously.',
    url: 'https://aws.amazon.com/activate/',
    location: 'Global — open to Nigerian developers',
    effort: 'Short online application',
    verified: false,
    caveat: 'Credit tiers change and the largest packages require an accelerator or investor referral. Check the current tiers.',
    verifiedOn: DIRECTORY_VERIFIED_ON,
    tags: ['cloud', 'aws', 'credits', 'startup', 'developer', 'infrastructure', 'bedrock'],
  },

  {
    id: 'microsoft-founders-hub',
    name: 'Microsoft for Startups Founders Hub',
    provider: 'Microsoft',
    category: 'credits',
    levels: ['intermediate', 'expert', 'founder'],
    value: 'Azure credits, Azure OpenAI access, GitHub Enterprise and developer tooling',
    summary:
      'Self-service programme giving founders Azure credits and AI compute, plus GitHub, Visual Studio and Microsoft 365. '
      + 'Notably open without a referral or investor introduction, which makes it one of the more accessible credit programmes.',
    whatYouGet: [
      'Azure credits including AI and OpenAI service access',
      'GitHub Enterprise and developer tooling',
      'Mentorship and technical guidance',
    ],
    eligibility: 'Anyone building a software product. No referral needed for the entry tier.',
    deadline: null,
    deadlineNote: 'Applications are open continuously.',
    url: 'https://www.microsoft.com/en-us/startups',
    location: 'Global — open to Nigerian developers',
    effort: 'Sign-up, minutes',
    verified: false,
    caveat: 'Benefit tiers change regularly. Confirm the current offer on the page.',
    verifiedOn: DIRECTORY_VERIFIED_ON,
    tags: ['cloud', 'azure', 'openai', 'github', 'credits', 'startup', 'developer'],
  },

  {
    id: 'data-science-nigeria',
    name: 'Data Science Nigeria — bootcamps, AI Invasion & upskilling',
    provider: 'Data Science Nigeria (DSN)',
    category: 'training',
    levels: ['beginner', 'intermediate', 'expert'],
    value: 'Free AI/ML bootcamps, competitions and research programmes',
    summary:
      'A long-running Nigerian AI capacity organisation, and the implementing partner for DeepTech_Ready. Runs free '
      + 'bootcamps, the AI Invasion campus programme, competitions and research tracks from beginner to advanced.',
    whatYouGet: [
      'Free AI and machine learning training',
      'Competitions with real datasets',
      'Access to a serious Nigerian AI community',
    ],
    eligibility: 'Nigerians at any level. Specific programmes have their own entry requirements.',
    deadline: null,
    deadlineNote: 'Multiple programmes with rolling intakes.',
    url: 'https://datasciencenigeria.org/',
    location: 'Nigeria',
    effort: 'Varies by programme',
    verified: true,
    verifiedOn: DIRECTORY_VERIFIED_ON,
    tags: ['ai', 'machine learning', 'data science', 'bootcamp', 'free', 'nigeria'],
  },

  {
    id: 'ncair',
    name: 'NCAIR — AI & Robotics programmes and internships',
    provider: 'National Centre for Artificial Intelligence and Robotics (NITDA)',
    category: 'training',
    levels: ['beginner', 'intermediate'],
    value: 'Free AI and robotics training, internships and mentorship',
    summary:
      "Nigeria's national AI and robotics centre. Runs internships combining AI/robotics training with practical work and "
      + 'mentorship, plus professional AI training, certification and university partnership programmes.',
    whatYouGet: [
      'Practical AI and robotics training',
      'Internship placement and mentorship',
      'Certification pathways',
    ],
    eligibility: 'Nigerian youth and emerging professionals.',
    deadline: null,
    deadlineNote: 'Runs in cohorts — watch for new intakes.',
    url: 'https://ncair.nitda.gov.ng/',
    location: 'Abuja, Nigeria',
    effort: 'Varies by programme',
    verified: true,
    verifiedOn: DIRECTORY_VERIFIED_ON,
    tags: ['ai', 'robotics', 'internship', 'free', 'nigeria', 'government'],
  },

  {
    id: 'tony-elumelu-foundation',
    name: 'Tony Elumelu Foundation Entrepreneurship Programme',
    provider: 'Tony Elumelu Foundation',
    category: 'capital',
    levels: ['founder'],
    value: '$5,000 non-refundable seed capital + business training and mentorship',
    summary:
      'Africa-wide seed funding and structured business training for early-stage entrepreneurs, including digital and '
      + 'technology ventures. One of the most accessible routes to genuine non-dilutive seed capital on the continent.',
    whatYouGet: [
      '$5,000 non-refundable seed capital',
      'Business management training',
      'Mentorship and alumni network access',
    ],
    eligibility: 'African entrepreneurs with an early-stage business or a business idea, including tech and digital products.',
    deadline: null,
    deadlineNote:
      'Runs annually with the application window typically opening at the start of the year. Confirm the current cycle on the site.',
    url: 'https://www.tonyelumelufoundation.org/',
    location: 'Pan-African, open to Nigerians',
    effort: 'Full application plus a training programme',
    verified: false,
    caveat: 'The $5,000 figure and the annual cycle are long-standing, but the exact dates of the current round were not confirmed.',
    verifiedOn: DIRECTORY_VERIFIED_ON,
    tags: ['seed capital', 'entrepreneurship', 'founder', 'africa', 'nigeria'],
  },

  {
    id: 'africas-business-heroes',
    name: "Africa's Business Heroes",
    provider: 'Africa Netpreneur Prize Initiative',
    category: 'capital',
    levels: ['founder'],
    value: 'US$1.5m total grant pool — up to US$300,000 for the winner',
    summary:
      'A major pan-African competition for established businesses with real traction. Not for a beginner or an idea — but a '
      + 'serious target for a Nigerian technology company with revenue history.',
    whatYouGet: [
      'A share of a US$1.5m grant pool for the Top 10',
      'Up to US$300,000 for the overall winner',
      'Global visibility and mentorship',
    ],
    eligibility:
      'Businesses registered, headquartered and operating in Africa, with at least three years of revenue and demonstrated '
      + 'market traction.',
    deadline: null,
    deadlineNote: 'The 2026 round has closed. Applications typically reopen early in the year — put it on the 2027 calendar.',
    status: 'closed',
    url: 'https://africabusinessheroes.org/',
    location: 'Pan-African',
    effort: 'Multi-stage competition across several months',
    verified: false,
    caveat: 'Prize structure is well established; the 2027 opening date is not yet announced.',
    verifiedOn: DIRECTORY_VERIFIED_ON,
    tags: ['seed capital', 'competition', 'founder', 'africa', 'established business'],
  },

  {
    id: 'google-africa-developer-scholarship',
    name: 'Google Africa Developer Scholarship (GADS)',
    provider: 'Google, with Pluralsight and partners',
    category: 'training',
    levels: ['beginner', 'intermediate'],
    value: 'Fully-funded developer training tracks and certification prep',
    summary:
      'A long-running Google scholarship for African developers, historically covering Mobile, Web (React, Node), Cloud and '
      + 'Data/AI tracks with curated Pluralsight access. Nigeria has received a large share of places in past cohorts.',
    whatYouGet: [
      'Structured developer learning tracks',
      'Curated third-party learning platform access',
      'Certification preparation',
    ],
    eligibility: 'African developers, beginner to intermediate.',
    deadline: null,
    deadlineNote: 'No open 2026 cohort was confirmed. Treat this as one to watch rather than one to apply to today.',
    status: 'watch',
    url: 'https://developers.google.com/community/gdsc-africa',
    location: 'Africa-wide',
    effort: 'Varies by cohort',
    verified: false,
    caveat:
      'GADS runs in cohorts and no currently-open 2026 round was found. Programme branding has shifted over the years — '
      + "check Google's African developer channels for the current equivalent before relying on this.",
    verifiedOn: DIRECTORY_VERIFIED_ON,
    tags: ['web development', 'react', 'node', 'cloud', 'mobile', 'free', 'africa', 'scholarship'],
  },
];

const GRANT_COUNT = GRANTS.length;

/**
 * Whole days left before a deadline. Null when there is no fixed date.
 *
 * Floors rather than rounds up, deliberately. With a deadline of the 31st and
 * today the 29th, a learner counts two days; rounding up would tell them three
 * and hand them a day that does not exist. On a deadline, the safe error is the
 * one that makes you hurry.
 */
function daysUntil(deadline, now = new Date()) {
  if (!deadline) return null;
  const end = new Date(`${deadline}T23:59:59Z`);
  if (Number.isNaN(end.getTime())) return null;
  return Math.floor((end.getTime() - now.getTime()) / 86400000);
}

/**
 * Deadline state, computed at request time rather than stored — a hardcoded
 * "closing soon" is wrong the moment it is written.
 */
function deadlineState(grant, now = new Date()) {
  const days = daysUntil(grant.deadline, now);
  if (days === null) return { state: grant.status === 'closed' ? 'closed' : 'rolling', daysLeft: null };
  if (days < 0) return { state: 'closed', daysLeft: days };
  if (days <= 7) return { state: 'closing-soon', daysLeft: days };
  return { state: 'open', daysLeft: days };
}

module.exports = {
  GRANTS,
  GRANT_COUNT,
  CATEGORIES,
  LEVELS,
  DIRECTORY_VERIFIED_ON,
  daysUntil,
  deadlineState,
};
