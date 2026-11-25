# DDEI management swarm Worker

This Worker is an external scheduler, not a migration of DDEI. It calls the existing protected Vercel backend, which retains MongoDB access, Paystack verification, the shared execution lease and all management-agent policies.

## Deploy and activate

1. Merge this PR and verify the backend deploys successfully. Keep the default Vercel scheduler until cutover.
2. In Cloudflare Workers & Pages, connect the GitHub repository mabrig1/DDEI-APP; root directory: workers/management-swarm; build command: npm install; deploy command: npx wrangler deploy. Alternatively from that directory run npm install, npm test, npm run dry-run, npm run deploy after authenticating Wrangler.
3. Generate a strong random secret (at least 32 characters) privately. Set SWARM_WORKER_SECRET as an encrypted Worker secret and the same value in the Vercel backend production environment. Never paste it into chat, code or logs.
4. In Vercel backend set MANAGEMENT_SWARM_ENABLED=true, MANAGEMENT_SWARM_SCHEDULER=cloudflare and MANAGEMENT_SWARM_ACTIONS=true if bounded autonomous actions are wanted. Redeploy. Set SWARM_WORKER_ENABLED=true in wrangler.toml and deploy that configuration (a dashboard-only variable override may be replaced by the next Git build).
5. Check the Worker /health endpoint for enabled=true and Cloudflare Observability for a scheduled completion. Check DDEI admin Management Swarm for a real last-run entry with trigger cloudflare. A health response alone does not verify backend execution.

The cron triggers every 15 minutes (UTC). Only the selected scheduler runs; backend lease and minimum interval prevent overlapping/repeated Cloudflare dispatch. Vercel's existing daily trigger remains installed but skips when Cloudflare is selected. The Worker does not contain learner data or Paystack credentials, and has no public mutation route. The normal enrollment/payment webhook path remains unchanged.

Rollback: disable the Worker and switch MANAGEMENT_SWARM_SCHEDULER=vercel in the backend; redeploy with the existing CRON_SECRET configured. The default Worker is disabled so deployment alone cannot change production.
