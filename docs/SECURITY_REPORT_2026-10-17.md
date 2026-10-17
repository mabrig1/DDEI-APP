# DDEI security hardening report

**Assessment date:** 17 October 2026. **Repository:** mabrig1/DDEI-APP. **PR:** #20. **Branch:** security/devshield-integration-20261017.

## Release decision

Security fixes are implemented on the review branch. Dependency remediation has produced **zero npm audit vulnerabilities**, and executed CI validates backend behavior, a real isolated MongoDB instance, browser XSS defenses, frontend builds and DevShield. **This is not production acceptance or a production deployment.** Protected preview access, real test-gateway checkout, deployed environment review and WAF inspection still require access. PR remains a draft; main was not changed. Merging may trigger Vercel production deployment and therefore requires explicit release approval after acceptance gates.

## Initial failures and evidence

The initial head was ddf91abfa7c7dbb5e2f7825072051e1cccb603d4. Seven prior PR commits introduced the scanner and attempted remediation. The initial action used unsupported `api-trust: advisory`; commit 8e23e0e had already removed it. All newly configured inputs were checked against the pinned action.yml.

- Security run **38994966813**, job **117285402131**: production npm audit failed, skipping syntax/build steps. Installation reported 13 total findings (1 critical, 6 high, 3 moderate, 3 low); the production-only audit reported 9 (1 critical, 2 high, 3 moderate, 3 low).
- Remediation run **38994964483**, job **117286600913**: compatible audit fixes resolved production dependencies, but development-only braces/chokidar/nodemon advisories caused `npm audit fix` to exit nonzero before tests or lockfile publication. Retrying the unchanged workflow could not resolve this.
- DevShield run **38994966794**, job **117285402106**: high severity `world-open-ingress` matched an Appwrite backup workflow comment recommending unrestricted Atlas ingress. Eleven mutable action references and two regular-expression calls were also flagged. The comment is unsafe guidance, not evidence that the deployed database has unrestricted network access.
- GitHub dependency-review API returned HTTP 403. DevShield deterministic scanning continued; independent npm audit is the authoritative vulnerability gate here. A DevShield count of zero dependency findings is **not** evidence that its unavailable dependency-review API ran.

## Confirmed weaknesses and corrections

| Finding | Evidence / impact | Correction |
|---|---|---|
| Vulnerable dependency graph | Audit advisories included critical proxy IP spoofing, axios/undici denial-of-service/request handling issues, qs parser issues and AI SDK resource consumption | Regenerated lockfile with compatible fixes; retained Express 4 and Appwrite 28; removed vulnerable development watcher chain |
| Unconditional proxy hop trust | Any direct deployment trusted one forwarded hop | Direct hosting defaults to no proxy trust; explicit trusted CIDRs supported; Vercel-only single-hop assumption documented for verification |
| Instance-local throttling | Per-process map resets and splits across serverless instances | Atomic MongoDB production buckets, TTL cleanup, fail-closed store errors; bounded local-development map |
| Reset-token disclosure in logs | Unconfigured mailer printed full reset URL and user email | Removed secret-bearing fallback logging and reduced controller/mailer error payloads; regression test added |
| Stale sessions after password/credential changes | JWT validity did not depend on credential version | User/admin session versions checked against DB; resets, password changes and admin rotation invalidate prior sessions; role/algorithm checks tightened |
| Reset-token race | Read followed by save allowed overlapping reset requests | Atomic reset-token compare-and-swap; concurrent reset integration test |
| Public payment record disclosure | Verify endpoint returned the complete subscription document | Only status, reference and non-sensitive plan are returned; no customer email, user ID, attribution token or provider snapshot |
| Payment retry gaps | Successful settlement could precede a failed benefit write; retries skipped benefits | Retry-safe grants, atomic course predicates, deterministic subscription expiry, benefit marker; success cannot be downgraded by a racing failure |
| Prototype plan names | Object-prototype properties could pass the plan lookup | Own-property plan validation; amounts remain server-controlled |
| XSS sinks | Chat/portfolio text and stored article HTML reached innerHTML | Escaped text/attributes; rich HTML rebuilt from an allowlist into fresh DOM nodes; safe URLs only; inline slug handlers use data attributes |
| Persistent browser credentials | Tokens/user cache stored in localStorage | Tab-scoped sessionStorage; legacy persistent sessions cleared. This does not provide HttpOnly-cookie protection |
| Error and query exposure | Central errors included internal messages; 404 echoed full URL | Generic error responses, sanitized event logging, minimal health response |
| Missing input boundaries and async handling | Structured operators/prototype keys and Express 4 rejected promises needed guards | Bounded JSON/object structure validation, simple query parsing, credential type checks, safe async routers |
| Bcrypt truncation | New long passwords could silently share their first 72 bytes | Byte-length limits on new/change/reset password validation |
| Build-config script breakout | Public deployment variables were serialized directly inside HTML script tags | Escape script delimiters; adversarial config regression test |
| Unsafe infrastructure guidance | Docs/workflow recommended global Atlas ingress | Replaced with fixed-egress/private-network guidance; no live network setting changed |

Existing controls preserved: exact raw-body Paystack HMAC-SHA512 with timing-safe comparison, payment reference and amount/currency validation, server-defined plan pricing, callback-origin allowlist, admin-only management routes, request size bounds, and private Appwrite account/payment tables. No real payment was made.

## Dependency versions

| Package | Before | After |
|---|---:|---:|
| proxy-addr | 2.0.7 | 2.0.8 |
| axios | 1.18.1 | 1.20.0 |
| undici | 6.28.0 | 6.29.1 |
| qs | 6.15.3 | 6.16.1 |
| express | 4.22.2 | 4.22.3 |
| @ai-sdk/provider-utils | 4.0.6 | 4.0.61 |
| @ai-sdk/gateway | 3.0.14 | 3.0.217 |
| ai | 6.0.34 | 6.0.309 |
| nodemon | 3.1.14 | Removed; Node --watch |
| chokidar | 3.6.0 | Removed |
| braces | 3.0.3 | Removed |
| node-appwrite | 28.0.0 | 28.0.0 |

The application targets Node 24 in CI and requires Node >=24 in its package manifest. No force/major Express upgrade was used. Both all-dependency and production vulnerability risks are covered by the stricter all-dependency audit.

## DevShield implementation and boundaries

Pinned **MABRIG DevShield v2.9.0** to **6ff4c21138d685cda4e5f06c90dead60a59481ba**. Implemented full repository scanning (500-file limit), high-severity gate, secrets/source rules, dependency inventory/mission, security graph/history, regression policy enforcement, deterministic remediation proposals, advisory legal signals, SARIF and retained report artifacts. Actions are SHA-pinned; CI is read-only except the narrowly scoped remediation job, which can commit verified lockfile changes only to the security branch. No force push or branch-protection bypass.

Two medium scanner warnings remain visible and unsuppressed:

1. `backend/src/scripts/syncToAppwrite.js`: RegExp.exec parses a duration, not a shell command.
2. `frontend/dsb-backup.js`: RegExp.exec matches a browser route, not a shell command.

These are reviewed false positives. There are no confirmed high/critical source findings remaining from this review, but this is a scoped code assessment, not a claim that every possible defect is absent. Legal advisory findings remain: licence missing (high advisory), privacy notice absent, terms absent, AI disclosure recommended. They are not silently waived or represented as legal compliance. Selecting a software licence is an owner decision.

Runtime Guard has an observation-only preview workflow. It has **not executed successfully against an accessible application preview**. It is a probe facility, not a deployed WAF or continuous runtime monitoring agent. Runtime security events and shared throttling come from DDEI middleware; hosting log retention, external alerting and durable security-history baselines still need operational configuration.

## Tests and validation

Executed evidence:

- Remediation run **38995901152**: existing **15/15 tests**, compatible dependency regeneration, npm audit **0 vulnerabilities**, successful lockfile commit.
- Hardening run **38996361854**: **38/38 tests**, all-dependency audit **0 vulnerabilities**, backend/frontend/inline-script syntax and frontend build passed.
- Expanded run **38996610821** and PR run **38996613291**: unit/security suite, isolated **MongoDB 8** integration, **Chromium/Playwright 1.62.1** browser tests, audit and build passed.
- Real MongoDB checks cover concurrent webhook/verification replay, exactly one purchased-course grant, no successful-payment downgrade, single-use password reset, credential version change, shared limits across independent middleware instances, and TTL index existence.
- Browser checks cover legacy token cleanup, chat and quote escaping, rich-text sanitization, allowed formatting/links, and mutation-XSS markup.
- Latest logging/legacy-admin fixes and config regression run: see the final verification addendum and PR checks for exact commit/run results.
- Local build/syntax and DevShield gates executed successfully. Local npm installation was blocked by terminal network restrictions; dependency-backed backend and browser execution took place in GitHub Actions, not falsely reported as local runs.

Tests use random synthetic test secrets and mocked payment HTTP responses; real MongoDB is disposable CI infrastructure. No live Paystack test account credentials were available. Real provider checkout/settlement remains unverified. The added config test initially matched an example script in an HTML comment; this test defect was corrected to select the emitted runtime configuration, and the local regression passed.

## WAF, DNS and live observations

CI's read-only inspection on 17 October 2026 returned:

- Nameservers: **thea.ns.cloudflare.com**, **vicky.ns.cloudflare.com**.
- A records: **64.29.17.65**, **216.198.79.65**.
- `https://ddei.online`: **HTTP 200**, server **Vercel**, HSTS, nosniff, DENY framing. Sample request approximately **120 ms**; not a performance benchmark.
- Known backend `https://ddei-app-kh6q.vercel.app/api/health`: **HTTP 200**, Vercel and the same basic security headers. Sample approximately **2.54 s**; database/auth/payment readiness was not established by that response.
- Both branch previews returned **302 to Vercel SSO**, so build readiness must not be confused with application acceptance.

Cloudflare DNS usage is confirmed; proxying and Cloudflare WAF activation are not. No Cloudflare plugin was found in the available directory search. Vercel firewall reads returned 404 (unavailable config); this does **not** prove the absence of all firewall protection. Deployment list/read attempts and authenticated preview fetch returned 403. No Vercel CLI with credentials was available locally.

Prepared `security/waf-observation-rules.json`: log-only auth/API/secret-path candidates, webhook exclusion, no blanket bypass. It is a proposal, **not staged or active provider configuration**. Active rules, false-positive traffic, plan support and origin routing must be inspected before application. No DNS, production WAF or blocking changes were made.

## Preview and production readiness

GitHub Vercel status checks for reviewed commits report success for both `ddei-app` and `ddei-app-backend`. Protected previews:

- Frontend: https://ddei-app-git-security-f6bbe2-victoryonline1-gmailcoms-projects.vercel.app
- Backend: https://ddei-app-backend-git-s-068d6a-victoryonline1-gmailcoms-projects.vercel.app

**Blocked acceptance items:** authorize the Vercel connection for team **team_fcMqhex2OhliCCJera74Q8ao**, projects **prj_7W45lIkgpzT7tabeMJMD8DXCmFIg** and **prj_nCctTtshycqNSOuu2WYYUoUsBnHF**, with deployment read/protected-preview access. Inspect environment keys/settings without disclosing values. Use isolated preview DB and Paystack test credentials. Ensure frontend preview points to backend preview (the source fallback is production), exact CORS origins are set, proxy topology is verified, and production DB permissions permit shared counter writes/TTL indexes.

GitHub branch-protection inspection returned 403; no protection was changed or bypassed. No independent human review is recorded. PR stays draft pending live acceptance and release approval.

## Commits and PR work

- **b14763dc** — repair remediation workflow; replace vulnerable development watcher.
- **c9d479f1** — CI-generated audited lockfile.
- **3b3bba63** — application hardening and DevShield gates.
- **d171725f** — CI lockfile whitespace normalization.
- **48d0fa46** — browser/Mongo integration, payment race fix, rollout and observation WAF proposal.
- **e87ae493** — redact recovery/error logs; legacy admin version handling.
- **88424dfe** — correct emitted-config regression selection.

A concurrent bot lockfile normalization rejected a non-fast-forward update. Its diff was inspected, preserved, and the next commit was rebased onto the actual branch head without forcing. Detached/unapplied commit objects were not merged. Later report/test commits are recorded in PR #20's final history.

## Remaining risks and next actions

1. Grant scoped Vercel project/team access, verify protected previews and environment configuration, and run a real Paystack **test-mode** checkout/replay before production approval.
2. Inspect Cloudflare zone and Vercel WAF settings; apply only reviewed observation rules, measure false positives, and obtain explicit approval for any blocking/DNS change.
3. Confirm shared rate-limit DB/index permissions and proxy IP integrity. Fail-closed store failures can affect availability; monitor 503/429 rates.
4. Strict script CSP remains report-only; legacy inline code and third-party UI scripts need a separate migration before enforcement. Session storage is still script-readable.
5. Verify external conversion endpoints deduplicate repeated payment references. Local entitlement delivery is idempotent; external commission-service behavior was not tested.
6. Review backup restoration of new authentication/settlement metadata; Appwrite schema/provisioning was not changed or executed against production. Rotate signing secrets after a disaster restore if revocation history cannot be preserved.
7. Resolve legal policy/licence decisions, configure log retention/alerts, and make security/build/database/browser checks required through an authorized repository administrator. Native GitHub dependency-review permissions remain unavailable; npm audit remains mandatory.
8. Review and approve the exact release commit only after acceptance. Stage and test production configuration, then explicitly approve deployment. No production data was deleted and no production deployment was performed.

See **docs/SECURITY_ROLLOUT.md** for operational prerequisites and rollback considerations.
