/**
 * Tools the AI agents can call.
 *
 * This is what makes the integration agentic rather than a chat box with a
 * system prompt: instead of stuffing the whole catalogue into every request and
 * hoping the model quotes it back accurately, the model asks for exactly the
 * records it needs and answers from the returned JSON. Prices, durations and
 * tool links come from the same modules the site renders from, so an answer
 * cannot drift from what the learner sees on the page.
 *
 * Every tool is a pure read over local data — no writes, no network, nothing
 * that costs money. A model that hallucinates a tool call can waste a round
 * trip; it cannot change anything.
 *
 * Entitlements are enforced here, not in the prompt. `search_ai_video_tools`
 * redacts the links unless the caller actually owns the Special Edition course,
 * because a prompt instruction is a request and an `if` is a rule.
 */

const { SKILLS } = require('../data/skills');
const { COURSES } = require('../data/courses');
const { OPPORTUNITIES } = require('../data/opportunities');
const { VAULT_CATEGORIES, VAULT_TOOL_COUNT } = require('../data/videoToolsVault');

const VAULT_COURSE_ID = 'ai-cinematic-special-edition';

// Keeps a runaway tool result from eating the model's context (and the bill).
const MAX_RESULTS = 12;

function summariseCourse(course) {
  return {
    id: course.id,
    slug: course.slug,
    title: course.title,
    description: course.description,
    category: course.category,
    estimatedHours: course.estimatedHours,
    moduleCount: Array.isArray(course.modules) ? course.modules.length : 0,
    skillIds: course.skillIds,
    paidOnly: Boolean(course.paidOnly),
    priceNaira: course.price || null,
    link: `https://ddei.online/course/${course.slug || course.id}`,
  };
}

function matches(haystack, query) {
  if (!query) return true;
  const needles = String(query).toLowerCase().split(/\s+/).filter(Boolean);
  const text = haystack.toLowerCase();
  return needles.some((needle) => text.includes(needle));
}

/**
 * Definitions in OpenAI function-calling shape, which is what OpenRouter
 * normalises to regardless of the underlying vendor.
 */
const TOOL_DEFINITIONS = {
  list_skill_tracks: {
    definition: {
      type: 'function',
      function: {
        name: 'list_skill_tracks',
        description:
          'List every Destiny Skills Bridge skill track with its tier, duration in weeks and realistic earning range. Call this before recommending a track or quoting any earnings figure.',
        parameters: {
          type: 'object',
          properties: {
            tier: {
              type: 'string',
              enum: ['tier1', 'tier2'],
              description: 'Optional. tier1 = Fast Start (6-8 weeks), tier2 = High Growth (10-12 weeks).',
            },
          },
        },
      },
    },
    run({ tier }) {
      const tracks = SKILLS.filter((skill) => !tier || skill.tier === tier);
      return {
        count: tracks.length,
        tracks: tracks.map((skill) => ({
          id: skill.id,
          name: skill.name,
          tier: skill.tier,
          tierLabel: skill.tierLabel,
          description: skill.description,
          durationWeeks: skill.durationWeeks,
          earningPotential: skill.earningPotential,
        })),
      };
    },
  },

  list_courses: {
    definition: {
      type: 'function',
      function: {
        name: 'list_courses',
        description:
          'Search the course catalogue. Returns titles, module counts, price where a course is paid, and a direct link the learner can open.',
        parameters: {
          type: 'object',
          properties: {
            query: { type: 'string', description: 'Optional keywords to match against title and description.' },
            skillId: { type: 'string', description: 'Optional skill track id, e.g. digital-marketing.' },
          },
        },
      },
    },
    run({ query, skillId }) {
      const found = COURSES.filter((course) => {
        if (skillId && !(course.skillIds || []).includes(skillId)) return false;
        return matches(`${course.title} ${course.description} ${course.category || ''}`, query);
      });
      return { count: found.length, courses: found.slice(0, MAX_RESULTS).map(summariseCourse) };
    },
  },

  get_course_outline: {
    definition: {
      type: 'function',
      function: {
        name: 'get_course_outline',
        description: 'Get the module-by-module outline of one course. Use this when a learner asks what a course actually covers.',
        parameters: {
          type: 'object',
          properties: { courseId: { type: 'string', description: 'Course id or slug from list_courses.' } },
          required: ['courseId'],
        },
      },
    },
    run({ courseId }) {
      const course = COURSES.find((c) => c.id === courseId || c.slug === courseId);
      if (!course) return { found: false, message: `No course with id or slug "${courseId}".` };
      return {
        found: true,
        ...summariseCourse(course),
        modules: (course.modules || []).map((module, index) => ({
          number: index + 1,
          title: module.title,
          lessonCount: Array.isArray(module.lessons) ? module.lessons.length : 0,
        })),
      };
    },
  },

  list_opportunities: {
    definition: {
      type: 'function',
      function: {
        name: 'list_opportunities',
        description: 'List sample global remote roles and gigs matched to a skill track, with pay ranges.',
        parameters: {
          type: 'object',
          properties: { skillId: { type: 'string', description: 'Optional skill track id to filter by.' } },
        },
      },
    },
    run({ skillId }) {
      const found = OPPORTUNITIES.filter((opp) => !skillId || opp.skillId === skillId);
      return { count: found.length, opportunities: found.slice(0, MAX_RESULTS) };
    },
  },

  get_pricing_and_access: {
    definition: {
      type: 'function',
      function: {
        name: 'get_pricing_and_access',
        description:
          'Get current pricing, the free trial, scholarship options and what Premium unlocks. Call this for any question about cost, money or access — never quote a price from memory.',
        parameters: { type: 'object', properties: {} },
      },
    },
    run() {
      const specialEdition = COURSES.find((c) => c.id === VAULT_COURSE_ID);
      return {
        freeTrial: { days: 7, cardRequired: false, note: 'Every new account starts on a 7-day free trial of its chosen skill track.' },
        premium: {
          monthlyNaira: 2000,
          yearlyNaira: 24000,
          unlocks: ['AI Advisor', 'AI-Powered Portfolio Builder', 'Priority opportunity matching', 'Full course access'],
        },
        scholarships: {
          limited: 'Free access to all courses.',
          full: 'Every course plus the AI Advisor and Portfolio Builder, free.',
          howToApply: 'Explain your situation in the "why do you want to join" field on the application form — the team reviews every application.',
        },
        specialEdition: specialEdition
          ? {
            courseId: specialEdition.id,
            title: specialEdition.title,
            priceNaira: specialEdition.price || 4000,
            oneOffPayment: true,
            includes: `Unlocks the ${VAULT_TOOL_COUNT}-tool AI Video Tools Vault.`,
          }
          : null,
      };
    },
  },

  search_ai_video_tools: {
    definition: {
      type: 'function',
      function: {
        name: 'search_ai_video_tools',
        description:
          'Search the AI Video Tools Vault — a curated library of free AI video, avatar, image, voice and editing tools, each with its free-tier terms and a direct link. Use this whenever someone asks how to make AI video, avatars, voiceovers or thumbnails for free.',
        parameters: {
          type: 'object',
          properties: {
            query: { type: 'string', description: 'Keywords, e.g. "talking avatar", "text to video", "free voice cloning".' },
            categoryId: { type: 'string', description: 'Optional category id from list_ai_video_tool_categories.' },
            limit: { type: 'integer', description: `Maximum tools to return (default 8, max ${MAX_RESULTS}).` },
          },
        },
      },
    },
    run({ query, categoryId, limit }, context = {}) {
      const cap = Math.min(Math.max(Number(limit) || 8, 1), MAX_RESULTS);
      const hits = [];

      for (const category of VAULT_CATEGORIES) {
        if (categoryId && category.id !== categoryId) continue;
        for (const tool of category.tools) {
          const text = `${tool.name} ${tool.free || ''} ${tool.how || ''} ${category.title}`;
          if (!matches(text, query)) continue;
          hits.push({ category: category.title, categoryId: category.id, tool });
        }
      }

      // The vault is a paid perk of the Special Edition course. Unentitled
      // callers get names and descriptions — enough for the model to give a
      // genuinely useful answer and an honest upsell — but not the links,
      // which are the thing being sold.
      if (!context.vaultAccess) {
        return {
          locked: true,
          totalToolsInVault: VAULT_TOOL_COUNT,
          matches: hits.length,
          preview: hits.slice(0, 5).map((hit) => ({ name: hit.tool.name, category: hit.category, freeTier: hit.tool.free })),
          unlockMessage:
            `The full vault of ${VAULT_TOOL_COUNT} free AI video tools — every one with a direct link, its free-tier limits and a ready-made prompt — `
            + 'is included with the AI Cinematic Video & Avatar Creation Mastery Special Edition course (₦4,000, one-off). '
            + 'Tell the learner what is in it and how to unlock it. Do not invent or guess the links.',
          courseId: VAULT_COURSE_ID,
        };
      }

      return {
        locked: false,
        totalToolsInVault: VAULT_TOOL_COUNT,
        matches: hits.length,
        tools: hits.slice(0, cap).map((hit) => ({
          name: hit.tool.name,
          category: hit.category,
          link: hit.tool.url,
          freeTier: hit.tool.free,
          howToUse: hit.tool.how,
          starterPrompt: hit.tool.prompt,
        })),
      };
    },
  },

  list_ai_video_tool_categories: {
    definition: {
      type: 'function',
      function: {
        name: 'list_ai_video_tool_categories',
        description: 'List the categories of the AI Video Tools Vault and how many tools each holds.',
        parameters: { type: 'object', properties: {} },
      },
    },
    run() {
      return {
        totalTools: VAULT_TOOL_COUNT,
        categories: VAULT_CATEGORIES.map((category) => ({
          id: category.id,
          title: category.title,
          toolCount: category.tools.length,
        })),
      };
    },
  },
};

/** OpenRouter-shaped definitions for the named tools. */
function toolDefinitions(names) {
  return names.filter((name) => TOOL_DEFINITIONS[name]).map((name) => TOOL_DEFINITIONS[name].definition);
}

/**
 * Run one tool call. Never throws: a tool failure comes back as an error object
 * the model can read and recover from, which is far better than collapsing the
 * whole conversation over one bad argument.
 */
function runTool(name, args, context) {
  const tool = TOOL_DEFINITIONS[name];
  if (!tool) return { error: `Unknown tool "${name}".` };
  try {
    return tool.run(args || {}, context || {});
  } catch (err) {
    return { error: `Tool "${name}" failed: ${err.message}` };
  }
}

module.exports = { TOOL_DEFINITIONS, toolDefinitions, runTool, VAULT_COURSE_ID };
