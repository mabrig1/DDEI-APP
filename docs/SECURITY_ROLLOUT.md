# DDEI security rollout

No production deployment, DNS change or live WAF mutation is authorized by this branch.
Merge may trigger Vercel production deployment, so obtain explicit release approval before merging.

## Production prerequisites

- Node 24, audited `backend/package-lock.json`; frontend root `frontend`, backend root `backend`.
- Strong random `JWT_SECRET` (at least 32 random bytes), `MONGODB_URI`, `PAYSTACK_SECRET_KEY`, explicit HTTPS `FRONTEND_URL`, and exact comma-separated `CLIENT_ORIGIN` values. Do not expose private variables in frontend builds or logs.
- Vercel sets `VERCEL=1`. Other reverse proxies must set `TRUSTED_PROXY_CIDRS` to the actual trusted egress networks; direct hosting trusts none. Verify that the edge overwrites forwarded IPs, including any Cloudflare-to-Vercel chain.
- Production rate limiting uses MongoDB atomic counters, not instance-local memory. Confirm the database user can read/write `ratelimitbuckets` and create its `expiresAt` TTL index (or create the index through an approved migration). Failure of this store returns 503, preserving abuse protection.
- Confirm Atlas network restrictions, TLS, least-privilege database access, and backups. Documentation no longer recommends global ingress. No production database/network settings were changed.
- Deploy backend and frontend together. Password resets/changes revoke previous JWTs. Browser tokens now use sessionStorage; users with old localStorage sessions sign in again. JavaScript can still read sessionStorage: this is persistence reduction, not HttpOnly-cookie protection.
- Back up environment configuration and retain the previous deployment for rollback. New schema fields are additive; do not delete production records for rollout or rollback.

## Preview acceptance

The branch has distinct frontend/backend previews. Set the frontend preview `API_BASE_URL` to the backend preview, and allow that exact frontend origin in the backend preview `CLIENT_ORIGIN`. The built-in default points to production and must not be used for mutation tests.

With a dedicated test database and Paystack **test** key only, exercise registration, login, recovery, revocation, paid course and subscription access, admin credential rotation, payment initialization, signed webhook success/replay, provider retry, and frontend callback. No real payments or production test accounts are required.

`GET /api/health` is minimal liveness; it does not prove database or payment readiness. The CI database suite uses an isolated local MongoDB container and synthetic credentials; it is not a live Paystack sandbox test.

## WAF observation proposal

`security/waf-observation-rules.json` contains three Vercel custom **log-only** rule candidates, not an entire firewall configuration. Do not PUT them over an existing ruleset. First inspect active rules and drafts in both DDEI projects. Use individual insert operations only after resolving project access and checking conflicts. No rule in this proposal blocks, challenges or bypasses traffic.

Paystack webhooks are excluded from general API observation. Do not place browser challenges on webhook routes, and do not add a blanket WAF bypass based on an easily forged header. HMAC verification stays mandatory. Preserve OPTIONS requests and legitimate admin/learner traffic.

Observe at least one normal traffic cycle and a controlled test checkout/retry. Compare authentication failures, 429 rates, webhook retries and ordinary API latency. Shared mobile/NAT IPs can produce false positives. Rate thresholds must be based on traffic; production blocking requires the owner's explicit approval.

If Cloudflare proxies the domain, inspect zone ownership, DNS proxy state, managed rules, rate rules and origin reachability before preparing Cloudflare-specific changes. Cloudflare nameservers alone would not prove traffic is proxied. Protect the backend hostname as well as the frontend; otherwise direct-origin traffic can bypass frontend-only rules.

## DevShield boundary

Pinned DevShield v2.9 provides source scanning, dependency evidence, graph/history/regression policy, remediation proposals, advisory legal signals, SARIF and reports. Its Runtime Guard is a controlled staging probe, **not** an installed production WAF or continuous runtime agent. Application runtime logging and shared rate limits are implemented by DDEI middleware.

The preview Runtime Guard workflow runs observation-only (`runtime-enforce: false`) against the known security-branch backend alias. Run it only after its deployment protection access and preview ownership are confirmed. A blocked Vercel login response is not evidence of application WAF effectiveness. No active probes target production.

The frontend enforces object/base/frame/form restrictions. The stricter script policy is report-only because legacy inline scripts/event handlers and third-party UI assets require a separate migration. Review browser CSP violations before enforcement. No CSP reporting endpoint or external monitoring destination is configured in this change.

Security events contain event type, method and a hashed client identifier, not bodies, tokens, query strings or raw IPs. Configure restricted log retention and alerting at the hosting layer. Existing non-security service logging still warrants a broader privacy review.
