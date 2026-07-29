#!/usr/bin/env node
/**
 * Grant, inspect or revoke a learner's access level.
 *
 *   node src/scripts/grantAccess.js --email you@example.com --level full
 *   node src/scripts/grantAccess.js --email you@example.com --level premium
 *   node src/scripts/grantAccess.js --email you@example.com --show
 *   node src/scripts/grantAccess.js --email you@example.com --level none
 *
 * Levels
 *   full     Full scholarship + permanent premium. Unrestricted: Premium
 *            features, every course including pay-and-start Special Editions,
 *            the Tools Vault, the Grants Directory, no trial expiry.
 *   premium  Permanent Premium only. Grants Directory, AI Advisor, Portfolio
 *            Builder — but NOT the paid Special Edition courses or the Vault.
 *   limited  Limited scholarship: all standard courses free, no Premium extras.
 *   none     Revoke everything back to a plain trial account.
 *
 * Runs anywhere MONGODB_URI is available: a laptop, or the "Grant access"
 * GitHub Actions workflow, which is the intended route when there is no local
 * development environment.
 *
 * There is deliberately no HTTP endpoint for this. Self-service permanent
 * access granting is exactly the sort of thing that should require database
 * credentials, not a session cookie.
 */

require('dotenv').config();
const mongoose = require('mongoose');
const crypto = require('crypto');
const User = require('../models/User');

const LEVELS = ['full', 'premium', 'limited', 'none'];

function parseArgs(argv) {
  const args = { level: null, email: null, show: false, create: false };
  for (let i = 0; i < argv.length; i += 1) {
    const [flag, inline] = argv[i].split('=');
    const value = () => (inline !== undefined ? inline : argv[++i]);
    if (flag === '--email') args.email = (value() || '').trim().toLowerCase();
    else if (flag === '--level') args.level = (value() || '').trim().toLowerCase();
    else if (flag === '--show') args.show = true;
    else if (flag === '--create') args.create = true;
  }
  return args;
}

/** What the account can currently reach, in the words a person would use. */
function describe(user) {
  return {
    name: user.name,
    email: user.email,
    isPremium: user.isPremium,
    premiumExpiresAt: user.premiumExpiresAt,
    scholarship: user.scholarship,
    trialExpiresAt: user.trialExpiresAt,
    'Premium features (AI Advisor, Portfolio, Grants Directory)': user.hasPremiumAccess() ? 'yes' : 'no',
    'Standard course access': user.hasActiveAccess() ? 'yes' : 'no',
    'Paid Special Edition courses + Tools Vault': user.scholarship === 'full' ? 'yes' : 'only if purchased',
    purchasedCourses: (user.purchasedCourses || []).map((p) => p.courseId),
  };
}

function apply(user, level) {
  if (level === 'full') {
    // Matches what createAccessLink() builds for the admin preview account:
    // full scholarship is the unrestricted tier, bypassing trial gates,
    // pay-and-start courses, the Vault and certificate fees.
    user.isPremium = true;
    user.premiumExpiresAt = null;
    user.scholarship = 'full';
  } else if (level === 'premium') {
    user.isPremium = true;
    user.premiumExpiresAt = null;
    if (user.scholarship === 'full') user.scholarship = 'none';
  } else if (level === 'limited') {
    user.scholarship = 'limited';
  } else if (level === 'none') {
    user.isPremium = false;
    user.premiumExpiresAt = null;
    user.scholarship = 'none';
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (!args.email) {
    console.error('Usage: node src/scripts/grantAccess.js --email <address> [--level full|premium|limited|none] [--show] [--create]');
    process.exit(1);
  }
  if (!args.show && !LEVELS.includes(args.level)) {
    console.error(`--level must be one of: ${LEVELS.join(', ')} (or pass --show to just inspect)`);
    process.exit(1);
  }
  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI is not set. Add it to backend/.env, or run the "Grant access" GitHub Actions workflow.');
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI);

  try {
    let user = await User.findOne({ email: args.email });
    let tempPassword = null;

    if (!user) {
      if (!args.create) {
        // Failing loudly beats silently creating an account nobody expects —
        // a typo in an email would otherwise leave an orphan with full access.
        console.error(`\nNo account found for ${args.email}.`);
        console.error('If they have never signed up, re-run with --create to make the account now.\n');
        process.exit(2);
      }
      tempPassword = crypto.randomBytes(6).toString('hex');
      user = await User.create({
        name: args.email.split('@')[0],
        email: args.email,
        password: tempPassword,
      });
      console.log(`Created a new account for ${args.email}.`);
    }

    if (args.show) {
      console.log(`\nCurrent access for ${args.email}:`);
      console.log(JSON.stringify(describe(user), null, 2));
      return;
    }

    apply(user, args.level);
    await user.save();

    console.log(`\n✅ Set ${args.email} to "${args.level}".\n`);
    console.log(JSON.stringify(describe(user), null, 2));

    if (tempPassword) {
      console.log(`\n⚠  Temporary password: ${tempPassword}`);
      console.log('   Log in with it and change it immediately, or use "Forgot your password?" to set your own.');
    }
    console.log('\nLog out and back in on the site — the access level is read from the account at each request,');
    console.log('but a stale page may still be showing the old state.\n');
  } finally {
    await mongoose.disconnect();
  }
}

main().catch((err) => {
  console.error('Failed:', err.message);
  process.exit(1);
});
