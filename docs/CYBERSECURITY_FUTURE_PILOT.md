# The Cyber Security of the Future — Destiny Skills Bridge

Status: **review-only pilot**, 22 November 2026. This is a teaching design and a separate public demonstration; it is **not** an activated threat feed, enrolled course, certificate or production release.

## Learner promise
Protect yourself today. Return when new credible threats change a decision you need to make.

- Audience: Nigerian students, parents, small businesses, church/media teams and first-time digital workers.
- Format: mobile-first; low bandwidth; 3–7 minute scenarios; optional transcript; no mandatory audio.
- Outcome: demonstrate safe decisions, not memorize jargon.
- Privacy: use fictional messages and identifiers; never solicit passwords, OTPs, payment details, recordings, or real victim data.

## Core curriculum (six stable modules)
| Module | Learner demonstration | NIST CSF 2.0 emphasis |
| --- | --- | --- |
| 1. Digital identity | Set up account recovery checklist and MFA | Protect, Recover |
| 2. Spot scams and impersonation | Verify a hostel notice, scholarship and bank-change request | Identify, Protect |
| 3. AI-era decisions | Independently validate a supposed supervisor's voice note | Protect, Detect |
| 4. Update intelligently | Judge whether an official alert affects the software in use | Identify, Protect |
| 5. Incident response | Simulate recovery from a compromised account and contacts alert | Respond, Recover |
| 6. Small organisation defence | Produce a one-page response and approval plan | Govern, Respond |

## First pilot — Before You Pay
Standalone static browser lesson: `frontend/cybersecurity-future.html`.

Three fictional decisions:
1. **Hostel deadline** — use the independently opened official university portal rather than the message's link.
2. **Supplier bank change** — call a contact verified before the request, then apply independent payment approval.
3. **Church transfer voice note** — use a previously known channel and dual authorization; recognizable voice alone is not proof.

Each scenario supplies three responses, one safer answer, explicit feedback, a final score and retry. No network calls, analytics, actual payment links or account data storage. Scores exist only in page memory.

## Self-updating intelligence system (future work; NOT activated in this pilot)
1. **Ingest** daily from official ngCERT advisories, CISA KEV JSON, and selected authoritative vendor advisories. Use NIST CSF 2.0 as a stable curricular taxonomy rather than a daily alert feed.
2. **Track sources** with source URL, publisher, original advisory ID, observed_at, published_at, source hash, retrieval status and fetched text. Deduplicate by source identity and version. If an official source fails, keep the last successful check and label freshness honestly.
3. **Match relevance** to a specific lesson and user persona, software/product and actual affected versions. CISA KEV entries must not become general student scare alerts unless applicable. No broad claims that a device is vulnerable without verified product/version evidence.
4. **Prepare change proposals** explaining: what changed, who may be affected, evidence, proposed 3-minute scenario, single quiz question, and whether old advice remains valid. AI may summarize but cannot independently publish revised guidance.
5. **Editorial gate**: a reviewer confirms provenance, dates, applicability, safe wording, and links. Approvals are versioned; rejected and withdrawn proposals stay in audit log. Security emergency notices may be fast-tracked by an authorized human but never auto-override a course.
6. **Publish targeted deltas** only for affected lessons. Show change summary, effective date, editor, official source and prior version. Preserve previously earned completion; introduce a separate refresher status. Never silently reduce a prior grade.
7. **Notify cautiously**: show a passive 'What changed?' indicator; let graduates choose optional email preferences later. Avoid fear-triggering push messages.
8. **Protect ingestion**: treat external feeds as untrusted data; do not follow instructions within advisories; sanitize rich text and links; fetch fixed allowlisted origins with size/time limits; do not execute code or visit submitted URLs.
9. **Test**: fixture-based feed parsing, duplicate handling, stale-source display, approval separation, CSRF/auth on editorial routes, idempotent publishing, mobile accessibility, quiz state, and rollback to a previous approved version.
10. **Measure**: scenario completion, correct independent-verification decisions, 3-minute refresher completion, false/irrelevant alert rate, and source freshness. Use aggregated consent-aware analytics only after a privacy review.

## Data contracts (proposed)
- `SourceSnapshot`: id, origin, advisory_id, publisher, source_url, published_at, checked_at, status, content_hash.
- `LessonVersion`: lesson_id, revision, approved_at, editor_id, summary, source_snapshot_ids, content_hash, state.
- `ChangeProposal`: affected_lesson, original_revision, proposed_content, rationale, relevance, evidence, review_status.
- `LearnerRefresher`: learner_id, lesson_revision_seen, optional_completed_at; core course completion remains intact.

## Development order
1. Review the no-cost static pilot and check language with Nigerian learners.
2. Confirm the teaching content with a human cybersecurity editor.
3. Integrate the pilot into the existing DDEI course model and existing learner progress APIs; reuse current course-coach features.
4. Build read-only advisory ingestion into a draft queue and verify freshness states.
5. Add approval/revision audit and targeted refreshers.
6. Test and deploy only after explicit approval.

## Official resources
- ngCERT advisories: https://cert.gov.ng/advisories/
- CISA KEV: https://www.cisa.gov/known-exploited-vulnerabilities-catalog
- CISA's KEV mirror: https://github.com/CISAGov/kev-data
- NIST CSF 2.0: https://www.nist.gov/publications/nist-cybersecurity-framework-csf-20

## Non-goals
No scraping private messages, real phishing links, bulk email simulations, password collection, voice-clone generator, exploit lab, hidden surveillance, automatic publishing of unreviewed model output or claims of active live threat updates in this pilot.
