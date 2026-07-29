# The daily grants agent

An agent that keeps the [Grants Directory](GRANTS_DIRECTORY.md) current, running
every morning at 06:00 UTC (07:00 Lagos) via
`.github/workflows/grants-agent.yml`.

## The rule everything here is arranged around

**A language model never publishes a fact to a learner.**

The directory's whole value is that nothing in it states a fact nobody checked.
An agent that wrote straight into the served data would destroy that in a day —
one misread page and a learner is told a grant closes next month when it closed
last week.

So the agent proposes and a human disposes. Findings queue as `pending`
`GrantUpdate` documents with their sources attached. An admin approving one is
what marks a listing `verified` — because at that point a person has read the
evidence. That claim belongs to the platform, not the model.

## Two passes

### Pass 1 — deterministic. Free, always runs.

Date arithmetic and HTTP status codes. No model, no API key needed, no cost.

- **Expired deadlines.** A listing whose deadline has passed but isn't marked
  closed. Needs a human to find the next round or retire it.
- **Dead links.** Only a definitive **404 or 410** counts. A timeout, a TLS
  error, a 403 from a bot-blocker or a restricted network says something about
  *our* connection, not about the grant. Treating those as dead would fire false
  alarms every morning and train the reviewer to ignore the queue — in testing,
  5 of the 13 official pages returned 403 to an automated client.

This half runs even with OpenRouter switched off entirely.

### Pass 2 — research. OpenRouter with web search.

Uses OpenRouter's `web` plugin, which grounds the answer in live search results
and returns `url_citation` annotations. Those citations are the point: they are
the evidence a reviewer reads.

**Re-verification.** Only listings that need it — closing within 3 weeks, closed
(look for the next round), watch-listed, flagged unconfirmed, or unchecked for
90 days. Not all of them every day: that would be 13 web searches every morning
for a directory that mostly doesn't change, on a platform whose owner has been
burned twice by surprise bills.

**Discovery.** Looks for opportunities the directory is missing.

Both are told, in the system prompt, that *"nothing changed" is a good and
common answer* and that guessing a deadline is forbidden.

## The gates a finding must pass

| Gate | Why |
|---|---|
| **Must carry a citation.** A change with nothing to read behind it is dropped silently. | An uncited deadline is a rumour. An unreviewable proposal is noise that erodes trust in the queue. |
| **Deadlines must be ISO `YYYY-MM-DD`.** "Sometime in January" is discarded. | A vague date is a guess wearing a costume. |
| **Discovered grants must be corroborated by host.** The URL's hostname must appear in one of the citations. | A model asked for "the official page" will sometimes return a plausible URL it assembled rather than one it read. |
| **Patches touch an allowlist only** — `deadline`, `deadlineNote`, `value`, `status`, `url`. | Eligibility and summary are editorial and stay with the human who wrote them. |
| **Approval required.** | See above. |

All five are enforced in `backend/tests/grantsAgent.test.js`, not by convention.

## Reviewing

**Admin dashboard → 💰 Grants Review.** Each proposal shows the current value
struck through beside the proposed one, the sources with excerpts, the model's
confidence, and whether it came from a model or an automatic check. A proposal
with no sources is labelled *"Do not approve this."*

Approving applies the change through `utils/grantsOverlay.js` — layered over the
committed baseline at request time, so a correction goes live on the next
request. **No commit, no redeploy.** A finding on Monday morning can be fixed on
the site on Monday morning.

Rejected proposals are kept, not deleted: an agent repeatedly proposing the same
wrong thing is useful signal.

## Running it by hand

```bash
cd backend
npm run grants:check                    # report only, writes nothing
npm run grants:check -- --save          # queue findings for review
npm run grants:check -- --no-links --no-discover
npm run grants:check -- --report=out.md
```

Or **Actions → "Grants agent (daily)" → Run workflow**.

## Setup

Repo → Settings → Secrets and variables → Actions:

| Secret | Effect if missing |
|---|---|
| `MONGODB_URI` | Findings are reported but not queued |
| `OPENROUTER_API_KEY` | Pass 2 skipped; deterministic checks still run |

Optional repository **Variables**: `OPENROUTER_MODEL`, `OPENROUTER_WEB_RESULTS`,
`GRANTS_AGENT_MAX_RESEARCH`.

Atlas → Network Access must allow `0.0.0.0/0`.

The workflow opens a GitHub issue **only when there is something to review**. A
daily "nothing changed" notification is how a channel gets muted.

## Cost

| Dial | Default | Effect |
|---|---|---|
| `GRANTS_AGENT_MAX_RESEARCH` | 6 | Listings researched per run. **The main dial.** |
| `OPENROUTER_WEB_RESULTS` | 5 | Search results per query — billed per result, on top of tokens |
| `OPENROUTER_MODEL` | `openrouter/auto` | Set `openrouter/free` for zero token cost |
| `OPENROUTER_ENABLED` | `true` | `false` pauses pass 2, keeps pass 1 |

Note that **the web plugin is billed per result regardless of model** — a free
model does not make a searching agent free. Six researched listings plus one
discovery query is roughly seven searches a day.

If the OpenRouter account lapses, the run stops the research pass after the
first hard failure rather than burning the budget rediscovering it, reports why
in `aiSkipped`, and still returns the deterministic findings. A directory that
silently stops being checked because a card expired would be the worst outcome
here.
