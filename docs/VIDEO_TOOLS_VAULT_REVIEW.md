# AI Filmmaking Resources Vault: accuracy and maintenance

Review baseline: **2026-10-11**. The catalogue is a student resource; it is not a paid/free-tier entitlement or an AI inference service.

## Audit summary

- The original data listed 123 entries across nine categories; some services appeared more than once for different capabilities. Not all entries actually generated video.
- Replaced retired **Unscreen** with an improved toolkit including **MuseTalk**, **RIFE**, and **FFmpeg**, giving **125** entries. User-facing count is computed by the backend.
- Replaced blanket **FREE** and **verified** wording with conservative access labels.
- Resolved **₦4,000** marketing text to **₦10,000** in the student vault, link page, and API lock message, matching the existing course definition and checkout plan. **No payment amounts or payment functionality were changed.**
- Corrected several particularly risky old claims about free availability, watermark restrictions, and commercial rights; other third-party claims remain *unverified*.

## Data contract

Each tool returns original `name`, `url`, `free` (legacy access description), `how`, and `prompt` fields, plus:

| Field | Meaning |
|---|---|
| `accessType` | `open-source`, `open-weights`, `trial`, `reported-free`, or `unverified`. Classification is based on **unverified** historic descriptions. |
| `verificationStatus` | `unverified` until a human explicitly checks the provider's live offer and licensing. |
| `freeLimit` | `null` means not documented or verified, **not unlimited**. |
| `watermark` | `unknown` unless documented; selected known limitations are flagged. |
| `commercialUse` | `unknown` unless reviewed; selected free-plan restrictions are flagged. |
| `regionRestrictions` | `unknown` until independently checked. |
| `lastVerified` | `null` until verified with a date. |
| `sourceUrl` | `null` until a **provider pricing/terms source** is recorded. |
| `tasks` | Searchable production tags. These are conveniences and may require manual corrections. |

**A successful HTTP request never establishes a free tier, feature availability, model version, regional access, or commercial rights.** Open-source code can still require paid compute, model downloads, or license review.

## Review procedure

1. Open the service's official pricing and license pages; verify whether a free plan exists **today** and for the intended country.
2. Record free credits/limits, watermarks, commercial-use rights, and region restrictions. Test signup/generation manually where permitted. Don't make throwaway accounts to circumvent usage limits.
3. Only then set `verificationStatus: 'verified'` alongside `lastVerified` in ISO date format and an actual source URL. The initial automated enrichment intentionally leaves them unverified.
4. Re-check high-traffic services monthly and the remainder quarterly; expire stale badges instead of silently asserting free access.
5. Use the optional link health script to **triage** potential broken destinations; false failures can arise from anti-bot blocks and redirects.

### Running checks

From `backend/`:

```bash
npm test
node src/scripts/auditVideoToolLinks.js --limit=20
# Manually audit larger batches only when necessary:
node src/scripts/auditVideoToolLinks.js --limit=125
```

The link script checks HTTP reachability only. It does not update catalogue records, deploy, contact paying students, or certify any free offer. Do not run it in CI without reviewing rate limits and terms.

### Important product distinctions

- **DDEI** hosts education, prompts, and external links; it **does not provide free GPU processing** simply by listing models.
- Hosted third-party free offers can be temporary, watermarked, non-commercial, region-locked, or unavailable.
- A separate authorized GPU worker is needed to connect rendering from **aivideo.mabrigkorie.org** for public customers. Kaggle notebooks must not be positioned as a continuous commercial server.
- Existing payment gating stays in place. If the intended course price is actually ₦4,000, update the backend course and payment configuration deliberately in a **separate** reviewed change.
