const ENDPOINT = 'https://api.ddei.online/api/management-swarm/cloudflare';
const json = (data, status = 200) => new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });

export async function dispatch(env, fetcher = fetch) {
  if (env.SWARM_WORKER_ENABLED !== 'true') return { status: 'disabled' };
  if (typeof env.SWARM_WORKER_SECRET !== 'string' || env.SWARM_WORKER_SECRET.length < 32) return { status: 'missing-secret' };
  // Fixed destination, no redirects, no user-controlled request parameters.
  try {
    const result = await fetcher(ENDPOINT, {
      method: 'POST',
      headers: { authorization: 'Bearer ' + env.SWARM_WORKER_SECRET, accept: 'application/json' },
      redirect: 'error',
      signal: AbortSignal.timeout(25000),
    });
    if (!result.ok) return { status: 'backend-error', httpStatus: result.status };
    const body = await result.json();
    if (body.skipped === true) return { status: 'skipped', reason: ['disabled','already-running','wrong-scheduler','interval-limit'].includes(body.reason) ? body.reason : 'other' };
    if (!Array.isArray(body.agents) || body.agents.length !== 5) return { status: 'unexpected-response' };
    return { status: body.agents.some(a => a.status === 'error') ? 'completed-with-errors' : 'completed', agentCount: 5 };
  } catch (_) {
    // No credentials, learner identifiers or response body in logs.
    return { status: 'transport-error' };
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method !== 'GET' || url.pathname !== '/health') return json({ error: 'Not found' }, 404);
    return json({ service: 'ddei-management-swarm', enabled: env.SWARM_WORKER_ENABLED === 'true', mode: 'scheduler' });
  },
  async scheduled(controller, env, ctx) {
    ctx.waitUntil((async () => {
      const result = await dispatch(env);
      console.log(JSON.stringify({ service: 'ddei-management-swarm', scheduledTime: controller.scheduledTime, ...result }));
      if (['missing-secret','backend-error','unexpected-response','transport-error','completed-with-errors'].includes(result.status)) throw new Error('Swarm scheduled run: ' + result.status);
    })());
  },
};
