# Upgrade roadmap

- [x] Audit current app and accessible production configuration; evidence in UPGRADE_AUDIT.md.
- [ ] Enable Paddle test payments — blocked by Free plan and pending explicit enable confirmation; then collect tier prices.
- [ ] Implement billing/history and signed, idempotent webhook entitlements — blocked by payment enablement.
- [x] Verify resofit-cdn, MEDIA_BUCKET, and the three custom domain mappings without mutations.
- [ ] Inspect DNS — blocked by Cloudflare DNS Read permission or zone scope (HTTP 403).
- [x] Audit deployed Worker media handlers and bundled publisher source; limitations documented in UPGRADE_AUDIT.md.
- [ ] Diagnose live content missing-object GET returning 500 — requires deployed error logs and intended service change confirmation.
- [ ] Implement authenticated R2 uploads/metadata and verify readback/CDN — depends on Worker audit and authorized test media.
- [ ] Preserve capture/router safeguards and verify publisher isolation/health — blocked by absent source/contracts and safe test job/account.
- [ ] Add real luxury billing/media controls and AssistLoop — blocked by provider/capture/personalization contracts; do not invent data.
- [ ] Verify actual checkout/webhook/entitlement/upload/CDN/publisher flows — blocked as above; no production deployment or readiness claim.