# Destiny Skills Bridge

**Global Skills. Dollar Opportunities. African Futures.**

Destiny Skills Bridge bridges the gap between African youth and global economic opportunity. The platform teaches in-demand digital skills, builds an AI-powered international portfolio, and matches graduates to freelance gigs and remote jobs that pay in dollars.

## Project Structure

```
ddei-app/
├── frontend/
│   ├── index.html          # Single-file Tailwind (CDN) frontend — landing page, auth, application form,
│   │                        # AI Advisor chat, Premium/Paystack upgrade, Portfolio Builder, Opportunity Matching
│   └── dsb-backup.js       # Read-only failover to the Appwrite backup backend
├── backend/
│   ├── src/
│   │   ├── config/db.js            # MongoDB connection
│   │   ├── config/appwrite*.js     # Appwrite backup backend client & schema
│   │   ├── models/                 # User, Application, Subscription (Mongoose)
│   │   ├── controllers/             # Route handlers (auth, applications, advisor, payments, skills, portfolio)
│   │   ├── routes/                  # Express routers mounted under /api/*
│   │   ├── middleware/              # JWT auth (required/optional), error handling
│   │   ├── data/                    # Static skill tracks & sample opportunities
│   │   ├── config/openrouter.js    # OpenRouter (agentic AI) configuration
│   │   ├── utils/ai*.js             # Agent loop, tool definitions, prompts, rate limit
│   │   ├── utils/advisorEngine.js   # Rule-based AI Advisor replies (fallback when AI is off)
│   │   └── server.js                # App entrypoint
│   ├── package.json
│   └── .env.example
└── README.md
```

## Features

- **Authentication** — JWT-based register/login with bcrypt password hashing
- **Skills Selection** — Tier 1 (Fast Start) and Tier 2 (High Growth) tracks with NGN & USD earning potential
- **Application/Onboarding** — apply to a skill track / cohort
- **AI Advisor Chat** — agentic career and skills guidance. Real models via OpenRouter, calling tools that
  read the live catalogue, pricing and tool vault, so answers can't drift from what the site shows.
  Falls back to the built-in rule-based replies when no key is set. See [docs/OPENROUTER_AI.md](docs/OPENROUTER_AI.md)
- **Payments** — Paystack integration for Premium subscriptions (monthly/yearly)
- **Premium features** — AI-powered Portfolio Builder, Opportunity Matching (sample global gigs & remote jobs)
- **AI Video Tools Vault** — 123 curated free AI video, avatar, voice and editing tools, each with a direct
  link, its free-tier limits and a starter prompt. Included with the Special Edition course; the AI Advisor
  can search it for entitled learners
- **Appwrite backup backend** — MongoDB is continuously mirrored to Appwrite Cloud, and the public site
  falls back to that mirror (read-only) if the primary API goes down. See [docs/APPWRITE_BACKUP.md](docs/APPWRITE_BACKUP.md)

## Running locally

### Backend

```bash
cd backend
npm install
cp .env.example .env   # set MONGODB_URI, JWT_SECRET, PAYSTACK_SECRET_KEY
npm run dev             # starts on http://localhost:5000
```

Optional — enable the Appwrite backup backend (set `APPWRITE_API_KEY` in `.env` first):

```bash
npm run appwrite:provision   # create the backup database, tables and indexes
npm run appwrite:sync        # seed it from MongoDB
```

### Frontend

`frontend/index.html` is a static file — open it directly in a browser, or serve it with any static file server. It talks to the backend via `API_BASE_URL` (defaults to `http://localhost:5000`; override by setting `window.DSB_API_BASE_URL` before the script runs, e.g. in a `<script>` tag for production deployments).

The build (`node build.js`) also bakes in the Appwrite failover config and copies `dsb-backup.js` into `dist/`,
so a deployed frontend can still serve public content when the backend is unreachable.

See `backend/README.md` for the full API reference,
[docs/DEPLOY_BACKEND_VERCEL.md](docs/DEPLOY_BACKEND_VERCEL.md) for running the API on Vercel,
[docs/APPWRITE_BACKUP.md](docs/APPWRITE_BACKUP.md) for the backup backend,
and [docs/OPENROUTER_AI.md](docs/OPENROUTER_AI.md) for the agentic AI integration.
