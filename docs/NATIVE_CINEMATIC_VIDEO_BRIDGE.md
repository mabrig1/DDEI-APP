# DDEI → native video creation → MABRIG video ecosystem

Status: implementation in a review-only branch, not a production deployment.

## What works without keys or credits

An enrolled learner can open a DDEI course lesson, select **Play Cinematic Lesson**, then click **Approve & export video**. The browser paints four evidence-grounded 8-second scenes on an HTML canvas and captures a genuine silent video using MediaRecorder. Output is MP4 only where supported by the browser, otherwise WebM. The download belongs to the learner's device; no source or media is sent to any external provider. Reduced-motion and mobile Save-Data paths avoid unnecessary animation and resolution.

The file is **not** a generated photorealistic AI scene, synthetic presenter or lip-synced video. Browser text-to-speech is for playback and is **not** embedded in the exported file. Close the page or navigate away to cancel the render.

A **Download production pack** button generates a JSON scene pack, including verified source captions, visual direction, duration and handoff notes for:

1. **AIVideo** — can ingest the real downloaded footage in its existing local scene-master path (requires operator upload, audio file, configured FFmpeg/Redis/Mongo worker), or generate a new 8-second clip on a configured local WAN GPU through the approved operator bridge below.
2. **VidMint** — owner can use original prompts in its protected creator studio. Paid Magic Hour generation must be deliberately approved there and is not called by DDEI.
3. **MABRIG Content Engine** — owner can upload the finished video, author a promotional post, and publish only after review. It has an authenticated media library, not an established public machine-to-machine file import; DDEI does not claim one-click publishing.

No external app is connected by just downloading the pack. The handoff is an interoperable production workflow, not a background synchronization system.

## Optional owner-only AIVideo WAN GPU connection

DDEI server-only environment:

```sh
DDEI_AIVIDEO_GPU_ENABLED=false
DDEI_AIVIDEO_EXECUTION_TOKEN=<random server-only token, 32+ characters>
DDEI_VIDEO_OUTPUT_ALLOWED_HOSTS=
```

AIVideo server-only environment, configured separately by the owner:

```sh
VIDEO_EXECUTION_ENABLED=true
VIDEO_EXECUTION_TOKEN=<same random token>
GPU_WORKER_URL=https://<private-authorized-gpu-worker-host>
GPU_WORKER_TOKEN=<GPU worker token>
```

The GPU worker must return `{ "ok": true, "generationReady": true }` on its authenticated `/health` endpoint, accept `POST /jobs`, and support `GET /jobs/:id`. Those existing AIVideo capabilities require a real WAN GPU backend; no worker, credits, or cloud keys are automatically provisioned by this integration.

Then **and only after reviewing the GPU's own operating costs and securing the worker**, set `DDEI_AIVIDEO_GPU_ENABLED=true`.

At DDEI `/admin`:

1. Sign in as administrator and open **Cinematic Video Studio**.
2. Select course, lesson and 8-second scene.
3. Check rights confirmation and explicit GPU compute approval.
4. Choose **Approve & Generate One Clip**.
5. Use **Check Job Status** to query the accepted AIVideo local-WAN job. The admin can open AIVideo directly for output management.

The DDEI route is authenticated with the existing revocable admin session, rate-limited using shared MongoDB counters, and uses a durable idempotency record in MongoDB. Its remote target is a fixed HTTPS AIVideo origin and the only candidate is `local-wan`, never Runway/Gemini Veo/Magic Hour. There are **no automatic GPU retries or cross-provider fallbacks**. A network timeout is treated as ambiguous, requiring owner inspection.

The integration never uses AIVideo's weak/unsigned public production-planning API. It uses only its existing token-protected video-execution API. The video output link is shown in the DDEI admin screen **only** if its hostname matches `DDEI_VIDEO_OUTPUT_ALLOWED_HOSTS`; otherwise the owner completes artifact handling in AIVideo. Do not add arbitrary download/storage origins to this allowlist.

## Deployment and review order

1. Review DDEI security hardening PR #31.
2. Review the cinematic lesson studio PR #32, stacked on #31.
3. Review and run automated tests for this bridge; open a preview for its frontend screen.
4. Manually test one browser download in Chrome and Safari, checking actual playable codecs/length.
5. Test AIVideo local-worker health and a single 8-second GPU mission in a disposable/staging setup. Never use paid providers for this smoke test.
6. Configure API secrets securely on both backends only when the actual worker is ready. Review rollback and compute quotas before any production rollout.
7. Publish only after explicit operator approval.

## Important limits

- MP4 and WebM depend on browser capabilities; never rename a WebM as MP4.
- Export is a browser-encoded moving graphic with source-grounded text, not photorealistic AI footage.
- Large devices or browser background-tab throttling can affect recording timing or output.
- Owner GPU generation requires separate private infrastructure; merely merging this PR does not provision one.
- VidMint and Content Engine export packs are manual handoffs until authenticated import APIs exist.
- No automatic publishing, billing, original footage generation, lip-sync, course-entitlement change or deployment occurs.
