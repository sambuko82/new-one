---
type: ops
title: Extended Trust Bundle — Verification Receipt
generated: 2026-06-01
sources: [trust-signals, legal-licenses, packages-full-pricing, jvto-policy-pack-v6, brand-voice, crew-registry, agung-sambuko, dr-ahmad-irwandanu, operational-facts, hotels]
---

# Extended Trust Bundle — Verification Receipt

Generated: 2026-06-01 | Method: jvto-verified-output skill (Steps 1–4)

## Working Values Used

| Claim | Value used | SSOT source | Last verified | Drift risk |
|---|---|---|---|---|
| Trustpilot reviewCount | 51 | trust-signals.md §Live Review Platforms | 2026-05-18 | **High** |
| Trustpilot ratingValue | 4.8 | trust-signals.md §Schema Canonical Values | 2026-05-18 | Medium |
| Google Maps reviewCount | 123 | trust-signals.md §Live Review Platforms | 2026-05-26 (API) | **High** |
| TripAdvisor reviewCount | 21 | trust-signals.md §Live Review Platforms | 2026-05-12 (DB) | Medium |
| Cross-platform total | 195 | calculated: 51+123+21 | 2026-05-26 | **High** |
| NIB | 1102230032918 | legal-licenses.md | — | None |
| TDUP | 1102230032918 (issued 2023-02-11) | legal-licenses.md | — | None |
| HPWKI AHU ID | AHU-0001072.AH.01.07.TAHUN 2024 | legal-licenses.md | — | Low |
| ISIC Provider ID | 259268 | legal-licenses.md | — | Low |
| Dr. Irwandanu STR | QN00001073380217 | dr-ahmad-irwandanu.md | — | Low |
| Agung Sambuko rank | Bripka | agung-sambuko.md | — | Low |
| Agung Sambuko unit | Ditpamobvit East Java | agung-sambuko.md | — | None |
| BBKSDA regulation | SE.1658/KSA.9/2024 | dr-ahmad-irwandanu.md + kawah-ijen.md | — | Low |
| Cancellation threshold | 48 hours before Day 1 | jvto-policy-pack-v6.md | — | None |
| FOC thresholds | 18/35/50 pax | jvto-policy-pack-v6.md | — | None |
| Total crew | 14 (7 guides + 7 drivers) | crew-registry.md | 2026-05-26 | Low |
| KTA-confirmed crew | 11 | crew-registry.md | 2026-05-26 | Low |
| Total hotel partners | 23 | hotels.md | 2026-05-12 | Low |
| Ijen monthly closure | First Friday every month | operational-facts.md | — | None |

## Drift Warnings

⚠��� `reviewCount (Trustpilot) = 51` verified 2026-05-18. More than 14 days ago. Recommend live Trustpilot check before regenerating schemas.

⚠️ `reviewCount (cross-platform) = 195` (used here). The `trust-signals.md §Schema Canonical Values` still shows 164 (calculated from old Google count of 92). This section is STALE — it was not updated when Google moved from 92 → 123 on 2026-05-26. **Flagged as GAP-01 in wiki/website/website-context-master.md.** Action: update §Schema Canonical Values in trust-signals.md.

⚠️ `HANDOFF.md` line ~175 shows `Google Maps: 4.90 / 92 reviews` — stale. See GAP-01.

## Files Generated

| File | Records | Source verified |
|---|---|---|
| products.json | 22 packages (11 Surabaya canonical + 4 Bali + 6 student + 1 specialty) | packages-full-pricing.md — all prices verified |
| policies.json | booking, cancellation, inclusions, exclusions, vehicle allocation, FOC, health screening, forbidden wording | jvto-policy-pack-v6.md + brand-voice.md |
| destinations.json | 5 destinations with geo, entity summaries, package lists | wiki/destinations/*.md |
| people.json | 1 founder + 1 medical officer + 14 crew | crew-registry.md + agung-sambuko.md + dr-ahmad-irwandanu.md |
| operational.json | temperatures, travel times, closures, seasonal guide, 23 hotels | operational-facts.md + hotels.md |

## Policy Wording Verification

All conditional wording verified against SSOT:
- ✅ Health screening: conditional framing with BBKSDA SE.1658/KSA.9/2024 reference
- ✅ Cancellation: 48-hour threshold explicit in both the `on_time` and `late` objects
- ✅ Travel Credit: non-expiring, IDR-denominated, transferable with written confirmation
- ✅ FOC tiers: 18/35/50 pax canonical per jvto-policy-pack-v6.md
- ✅ Vehicle allocation: 2-3 MPV / 4-9 Hiace / 10-11 Hiace+MPV per policy pack
- ✅ Blue fire: no guarantee language anywhere in destinations.json

## Price Verification (products.json)

All prices drawn directly from wiki/products/packages-full-pricing.md without modification. No price was drawn from memory or prior context.

**⚠️ ANOMALY flagged (GAP-02 in website-context-master.md):**
The self-checkout shows IDR 3,350,000 for an unspecified package/pax combination. `bali-bromo-ijen-3d2n` at 6–7 pax = IDR 3,350,000 per SSOT — plausible match. Sam to verify the specific package+pax combination this price appears for in live checkout.
