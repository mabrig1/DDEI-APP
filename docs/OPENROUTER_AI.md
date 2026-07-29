# Agentic AI via OpenRouter

Three features on this platform are powered by a language model: the **AI
Advisor** (Premium), the **Help Assistant** (public), and the **AI Portfolio
Builder** (Premium). All three go through [OpenRouter](https://openrouter.ai),
a single OpenAI-compatible endpoint sitting in front of hundreds of models from
every major vendor.

OpenRouter was chosen over any one vendor's SDK for two reasons that matter for
this specific app:

- **The model is a config value, not a code change.** Switching from a paid
  frontier model to a zero-cost one — or between vendors when pricing shifts —
  is one environment variable and a redeploy.
- **Nothing here is load-bearing.** With no API key, every feature falls back to
  the rule-based engines that were always in the codebase. This site has already
  been shut down twice by billing surprises; an unfunded AI account must never
  be able to take a page down.

## Turning it on

1. Get a key at <https://openrouter.ai/keys>.
2. **Set a credit limit on the key while you are there.** The in-app rate limit
   is a guard against runaway loops, not a spend cap — the credit limit is.
3. Add to the **backend** Vercel project → Settings → Environment Variables:

```
OPENROUTER_API_KEY = sk-or-v1-...
OPENROUTER_MODEL   = openrouter/free
```

4. Redeploy the backend, then check `https://<backend-url>/api/health`:

```json
"ai": { "provider": "openrouter", "configured": true, "enabled": true, "model": "openrouter/free" }
```

`configured: false` means the key never arrived — the usual cause is the
variable being marked **Sensitive**, or not being applied to Production.

## Choosing a model

| `OPENROUTER_MODEL` | What it does |
|---|---|
| `openrouter/free` | Routes only to zero-cost models. **Start here.** The bill is ₦0. |
| `openrouter/auto` | OpenRouter picks a suitable model per request. Costs money; survives models being retired. This is the built-in default. |
| a specific slug | e.g. `google/gemini-2.0-flash-001`. Copy exact slugs from <https://openrouter.ai/models>. |

Slugs ending in `:free` are also free, but individual free models rotate in and
out of OpenRouter constantly — a pinned `:free` slug will eventually 404. Prefer
`openrouter/free`, which keeps working across that rotation.

`OPENROUTER_FALLBACK_MODELS` takes a comma-separated list. OpenRouter tries them
**within the same request** if the primary is rate limited, down, or over its
context length — cheaper and faster than us retrying.

## What makes it agentic

The models don't answer from a system prompt stuffed with the catalogue. They
call tools — defined in `backend/src/utils/aiTools.js` — that read the same data
modules the website renders from:

| Tool | Returns |
|---|---|
| `list_skill_tracks` | Every track with tier, duration and earning range |
| `list_courses` | Course search, with a direct `/course/<slug>` link |
| `get_course_outline` | Module-by-module breakdown of one course |
| `list_opportunities` | Sample global roles matched to a track |
| `get_pricing_and_access` | Live pricing, trial terms, scholarship options |
| `search_ai_video_tools` | The AI Video Tools Vault — 123 free tools, each with its free-tier terms and a link |
| `list_ai_video_tool_categories` | The vault's nine categories and their counts |

This is the point of the design: an answer about pricing comes from the pricing
data, not from the model's memory. A price the model invents is a price a
learner budgets against.

Every tool is a pure local read — no writes, no outbound network, no cost. A
hallucinated tool call wastes a round trip and nothing more.

### Entitlements are enforced in code, not in the prompt

The vault is a paid perk of the ₦4,000 Special Edition course.
`search_ai_video_tools` checks `context.vaultAccess` and, without it, returns
tool **names and free-tier terms but no links**, plus the enrolment message. The
advisor recomputes that entitlement per request against the same rule as
`vaultController` (purchased the course, or a full scholarship).

A prompt instruction is a request. An `if` is a rule. The paywall is an `if`.

## Failure behaviour

Every path degrades to the rule-based reply and logs one line:

```
[ai] advisor fell back to the rule-based engine — OpenRouter account is out of credit (402): ...
```

It falls back on: no key, `OPENROUTER_ENABLED=false`, 401/402/404/429, a
timeout, an empty or malformed completion, the per-caller rate limit, and the
turn's time budget running out. The learner still gets an answer.

The API response carries `source: "ai" | "fallback"` alongside `reply`, so you
can tell which one served a given answer. Clients that only read `reply` are
unaffected.

## Timeouts on serverless

An agent turn can span several HTTP calls — one per tool round — and Vercel
kills the invocation at its own limit regardless. So the client enforces a
**wall-clock budget for the whole turn** (`OPENROUTER_BUDGET_MS`, 15s on
Vercel), not just a per-call timeout, and gives each call whatever is left of
it. When too little remains to be worth starting a call, it stops and falls
back. A timeout we control returns a useful answer; the platform's timeout
returns nothing.

The last permitted round is sent **without** tools, so the model has to answer
in prose rather than spending the final round on a tool call nobody will read.

## Cost control

- `OPENROUTER_MODEL=openrouter/free` — zero cost.
- `OPENROUTER_ENABLED=false` — pause every AI call instantly, key left in place.
- `OPENROUTER_MAX_TOKENS` (default 700) — caps output, the expensive half.
- `OPENROUTER_RATE_LIMIT_PER_MINUTE` (default 12) — per signed-in user, or per
  IP for the public help bot. **Counted per server instance**: on Vercel each
  function instance has its own counter, so a caller spread across instances
  gets more than the nominal limit. It stops a stuck retry loop; it is not a
  security control.
- The credit limit on the OpenRouter key — the only real cap. Set one.

## Files

| File | Role |
|---|---|
| `backend/src/config/openrouter.js` | Env parsing, defaults, `aiStatus()` for `/api/health` |
| `backend/src/utils/aiClient.js` | The agent loop: HTTP, tool rounds, time budget |
| `backend/src/utils/aiTools.js` | Tool definitions and their local data reads |
| `backend/src/utils/aiAgents.js` | System prompts and each agent's tool allowlist |
| `backend/src/utils/aiAssist.js` | Run-an-agent-or-fall-back helper for controllers |
| `backend/src/utils/aiRateLimit.js` | Per-caller ceiling, in-memory |
| `backend/src/utils/advisorEngine.js`, `helpBotEngine.js` | The rule-based fallbacks — still live, still maintained |
