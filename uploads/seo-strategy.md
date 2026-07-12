---
type: seo
title: SEO Strategy — Keyword Targets & Content Silos
last_updated: 2026-05-17
sources: [seo-audit-2026-05, guardian-authority-framework-2026-05]
owner: wiki-llm
stale_after_days: 60
---

# SEO Strategy

*Derived from [[sources/seo-audit-2026-05]] (May 2026). Update when a new SEO audit is ingested or when significant SERP movement is observed.*

---

## Strategic Position

JVTO already ranks #1 for police-led and licensed-operator queries. The moat is built. The growth path is:
1. **Defend the #1 positions** — content freshness on C1/C5 claims
2. **Win the regulatory/safety niche** (Silo 3) — uncontested SERP territory, 4–6 weeks content
3. **Capture pre-purchase planning traffic** (Silo 4) — high funnel, converts to commercial intent
4. **Long-term**: domain authority compounds against OTAs via aged, authoritative regulatory content

**DO NOT** fight head-on for `bromo tour`, `ijen blue fire tour` — OTAs (Klook, GetYourGuide, Viator) and 25-year-old domains own these. Minimum 12-18 months for competitive parity.

---

## Prioritized Keyword Targets

| # | Keyword | Est. volume | Difficulty | JVTO position | Recommended page |
|---|---|---|---|---|---|
| 1 | `tourist police bromo tour` | <100/mo | Low | **#1** ✅ | Homepage / `/why-jvto/police-safety` |
| 2 | `licensed bromo tour operator indonesia` | 100–300/mo | Low | **#1** ✅ | `/verify-jvto/legal` |
| 3 | `ijen health certificate` | 200–500/mo | **Low** | Not ranking | `/travel-guide/ijen-health-screening` |
| 4 | `BBKSDA SE 1658` | <100/mo | **Very Low** | Not ranking | New: `/travel-guide/bbksda-regulations-ijen` |
| 5 | `madakaripura waterfall tour` | 500–1,500/mo | Medium | Not in top 20 | `/destinations/madakaripura-waterfall` |
| 6 | `bromo ijen 3d2n private tour` | 500–1,500/mo | Medium | Not in top 20 | Tour pages — need schema |
| 7 | `is bromo open today` / `bromo status` | 500–2,000/mo (seasonal spike) | Low | Not ranking | New: `/travel-guide/bromo-ijen-status-today` |
| 8 | `ISIC student tour indonesia` | <100/mo | Very Low | Not ranking | `/isic/student-package` |
| 9 | `papuma beach tour` | Low | Low | Not in top 20 | `/destinations/papuma-beach` |
| 10 | `bromo ijen tour singapore` | 200–500/mo | Low-Medium | Not in top 20 | New: `/markets/singapore` or geo-targeted copy |
| 11 | `bromo ijen tour malaysia` | 100–300/mo | Low-Medium | Not in top 20 | New: `/markets/malaysia` |
| 12 | `bromo vs ijen which better` | 500–1,500/mo | Low | Not ranking | New: `/travel-guide/bromo-vs-ijen-comparison` |
| 13 | `tumpak sewu waterfall guide` | Low-Medium | Low | Likely not ranking | `/destinations/tumpak-sewu-waterfall` expanded |
| 14 | `bromo ijen tour hong kong` | Low | Low | Not in top 20 | New: `/markets/hong-kong` |
| 15 | `ijen gas mask rental` | Low | Low | Not ranking | New: `/travel-guide/ijen-gas-mask-equipment` |

*Volumes are estimated — Ahrefs MCP unavailable at time of audit. Verify with Google Keyword Planner or Ahrefs when access is restored.*

---

## Content Silo Map

### Silo 1 — Commercial Tour Pages (BUILT — needs schema)

```
/tours (hub)
/tours/from-surabaya (listing)
/tours/from-bali (listing)
/tours/from-surabaya/{slug} × 12
/tours/from-bali/{slug} × 4
```
**Wiki status**: All 16 pages have output files in `output/website/tours/`. TouristTrip + AggregateRating schema generated for all 16 (2026-05-18). 6 student packages have output copy but no schema yet.  
**Action**: ~~Generate TouristTrip + FAQPage schema for all 16 tour pages.~~ DONE (2026-05-18). Remaining: generate schema for 6 student packages.

---

### Silo 2 — Destinations (FOUNDATION BUILT — needs depth + schema)

```
/destinations (hub)
/destinations/mount-bromo
/destinations/ijen-crater
/destinations/tumpak-sewu-waterfall
/destinations/madakaripura-waterfall
/destinations/papuma-beach
NEW: /destinations/banyuwangi (gateway content)
NEW: /destinations/cemoro-lawang (Bromo village)
```
**Wiki status**: All 5 existing destinations have pages. Banyuwangi + Cemoro Lawang are gaps.  
**Action**: Expand madakaripura + tumpak-sewu + papuma to 1,500+ words. Add TouristAttraction schema.

---

### Silo 3 — Regulatory + Safety (HIGHEST OPPORTUNITY — mostly sourceable)

```
/travel-guide/ijen-health-screening (EXISTS)
/travel-guide/bbksda-regulations-ijen (NEW)
/travel-guide/bbksda-regulations-bromo (NEW)
/travel-guide/ijen-gas-mask-equipment (NEW)
/travel-guide/permit-requirements-east-java (NEW — partial source)
/travel-guide/bromo-ijen-status-today (NEW — needs replacement live source)
/travel-guide/yadnya-kasada-2026 (NEW — needs ingest)
/travel-guide/sulfur-mining-cultural-guide (NEW — partial source)
```

**Wiki readiness per page**:

| Page | Wiki source | Status |
|---|---|---|
| `ijen-health-screening` | [[credentials/medical-screening]] | ✅ Output exists — can publish |
| `bbksda-regulations-ijen` | [[credentials/medical-screening]] + [[sources/bbksda-pelatihan-pemandu-2024]] | ✅ Generate output |
| `ijen-gas-mask-equipment` | [[website/faq-master]] Q14 + [[products/packages-overview]] | ✅ Generate output |
| `permit-requirements-east-java` | [[credentials/legal-licenses]] (partial) | ⚠️ Needs more permit detail |
| `bromo-ijen-status-today` | [[destinations/mount-bromo]] + [[destinations/kawah-ijen]] | ⚠️ Needs replacement live source (MAGMA feed not active) |
| `yadnya-kasada-2026` | ❌ No source | Ingest needed |
| `sulfur-mining-cultural-guide` | [[destinations/kawah-ijen]] (brief) | ⚠️ Needs expansion |
| `bbksda-regulations-bromo` | [[destinations/mount-bromo]] + [[credentials/legal-licenses]] | ⚠️ Partial — BBKSDA Bromo detail thin |

---

### Silo 4 — Pre-Purchase Planning (TOP-OF-FUNNEL — partially sourceable)

```
/travel-guide/bromo-vs-ijen-comparison (NEW)
/travel-guide/bromo-ijen-itinerary-guide (NEW)
/travel-guide/what-to-pack-bromo-ijen (NEW)
/travel-guide/best-time-to-visit-bromo-ijen (NEW — partial)
/travel-guide/private-vs-shared-tour-comparison (NEW)
/travel-guide/surabaya-vs-bali-starting-point (NEW)
/travel-guide/from-singapore-to-bromo-guide (NEW — needs geo data)
/travel-guide/from-malaysia-to-bromo-guide (NEW — needs geo data)
```

| Page | Wiki source | Status |
|---|---|---|
| `bromo-vs-ijen-comparison` | Both destination pages | ✅ Generate output |
| `what-to-pack-bromo-ijen` | [[sources/jvto-travel-guide-en]] §6 | ✅ Generate output |
| `private-vs-shared-tour-comparison` | [[website/aeo-claims]] C2 + [[products/packages-overview]] | ✅ Generate output |
| `best-time-to-visit-bromo-ijen` | [[website/operational-facts]] | ⚠️ Seasonal data thin |
| `from-singapore-to-bromo-guide` | ❌ No flight/logistics source | Needs geo data source |
| `from-malaysia-to-bromo-guide` | ❌ No flight/logistics source | Needs geo data source |

---

## Geographic Landing Pages

Target markets (per JVTO business intelligence): Singapore, Malaysia, Hong Kong, Taiwan, China.

| URL | Target query | English-only value | Localized value |
|---|---|---|---|
| `/markets/singapore` | "bromo ijen tour singapore" | High (SG market searches in EN) | Very High (add SG-specific logistics) |
| `/markets/malaysia` | "bromo ijen tour malaysia" | High | Very High (halal food note, AirAsia connection) |
| `/markets/hong-kong` | "bromo ijen tour hong kong" | Medium (HK searches in EN + ZH) | High |
| `/markets/taiwan` | "bromo ijen tour taiwan" | Low (needs ZH-TW) | High |
| `/markets/china` | "bromo ijen tour china" | Low (needs ZH-CN) | Very High |

*EN-only pages cover SG/MY/HK adequately. TW/CN require localized content — Phase 2 after SEO results validate the channel.*

---

## Title Tag Rewrites (10 Priority Pages)

These are SEO-optimized titles derived from the audit. Apply when generating or updating website-copy output files.

| Page URL | Current title | Recommended title |
|---|---|---|
| `/` (Homepage) | Tourist Police-Led Private Volcano Tours in East Java \| JVTO | Bromo Ijen Tour from Surabaya & Bali — Private \| JVTO |
| `/tours` | (verify) | 16 Private Bromo, Ijen & Tumpak Sewu Tours \| JVTO |
| `/tours/from-surabaya` | (templating bug) | Bromo Ijen Tour from Surabaya — 16 Private Packages \| JVTO |
| `/tours/from-bali` | (templating bug) | Bromo Ijen Tour from Bali — 4 Private Packages \| JVTO |
| `/tours/from-surabaya/bromo-madakaripura-ijen-3d2n` | 3 Day Bromo, Madakaripura & Ijen – Surabaya to Bali \| JVTO | 3D2N Bromo Ijen Madakaripura Private Tour Surabaya → Bali |
| `/destinations/ijen-crater` | Kawah Ijen Blue Fire Volcano – Complete Trekking Guide \| JVTO | Mount Ijen Blue Fire Tour Guide — Permits, Health, Hike \| JVTO |
| `/destinations/mount-bromo` | (verify) | Mount Bromo Sunrise Guide — Tours, Tickets & Tips \| JVTO |
| `/destinations/tumpak-sewu-waterfall` | (verify) | Tumpak Sewu Waterfall — Tour, Trail & Tips \| JVTO |
| `/destinations/madakaripura-waterfall` | (verify) | Madakaripura Waterfall — Tour, Canyon Hike, Tips \| JVTO |
| `/tours/from-bali/bromo-ijen-3d2n` | (verify) | 3D2N Private Bromo Ijen Blue Fire Tour from Bali \| JVTO |

*Note on /destinations/ijen-crater: lead with "Mount Ijen" (5–10× more searched than "Kawah Ijen" internationally). Kawah is the Indonesian word for crater — use in subheadings and body, not in the title lead.*

---

## Quick-Win Action Tracker

| # | Action | Owner | Impact | Status |
|---|---|---|---|---|
| QW-1 | Build 301 redirect map from legacy → SSOT routes | Dev | Critical | See [[seo/redirect-map]] — table ready |
| QW-2 | Fix footer: `/destinations` → `/destinations/{slug}` | Dev | High | Pending dev |
| QW-3 | Fix meta description template "From-surabaya" → "Surabaya" | Dev | High | Pending dev |
| QW-4 | Submit updated sitemap.xml in GSC (legacy URLs excluded) | Sam | High | Pending |
| QW-5 | Add Organization/TravelAgency JSON-LD globally | Dev | High | Schema needed from wiki |
| QW-6 | Add FAQPage JSON-LD to tour pages (from Quick Answers sections) | Dev | High | Schema needed from wiki |
| QW-7 | Add TouristTrip + AggregateRating JSON-LD to tour pages | Dev | High | Schema needed from wiki |
| QW-8 | Rewrite title tags on top 10 pages (see table above) | Dev/Content | High | Table ready above |
| QW-9 | Rewrite meta descriptions per 3-part formula | Content | Medium-High | Formula in [[website/brand-voice]] |
| QW-10 | Decide fate of `java-tour.com` and `legacy.` subdomain | Sam + Dev | High | Pending decision |
| QW-11 | Improve image alt text (Gallery 1 → descriptive) | Content/Dev | Medium | Pending |
| QW-12 | Add BreadcrumbList schema to sub-pages | Dev | Medium | Schema needed from wiki |
| QW-13 | Resubmit GSC URL inspection for top 10 pages after redirects | Sam | Medium | After QW-1 |
| QW-14 | Add social profile URLs to `sameAs` in Organization JSON-LD | Dev | Medium | See [[credentials/trust-signals]] §social |

---

## GEO/AEO Extension

*Traditional SEO (above) covers blue-link rankings. For AI answer engine visibility (Google AI Overviews, Perplexity, ChatGPT), see [[seo/geo-aeo-strategy]].*

**Already confirmed #1 for answer-engine-style queries:**
- "tourist police bromo tour"
- "licensed bromo tour operator indonesia tourist police"

**Pattern to scale**: long-tail + branded + regulatory intent (e.g., "BBKSDA SE 1658", "ijen health certificate") — no OTA competition in these query clusters.

**Key action**: Implement TL;DR Summary Block on homepage (after H1) + complete Organization JSON-LD with SHA-256 PropertyValues and press `sameAs` links — see [[seo/geo-aeo-strategy]] for full implementation checklist.

**Sources**: [[sources/geo-aeo-strategy-2026-05]] | [[sources/eav-ai-optimization-2026-05]] | [[sources/seo-ux-integration-2026-05]]

---

## 90-Day Measurable Targets

If QW-1 through QW-14 are executed in Weeks 1–2:
- Indexed pages: net +20–30% real-value URLs after legacy 301s
- Position on `tourist police bromo`, `licensed bromo tour operator`, `ijen health certificate`: hold #1–3
- Position on `bromo ijen 3d2n private tour`, `madakaripura waterfall tour`: break into top 30
- Rich results: FAQ snippets + AggregateRating stars on at least 5 tour pages in SERP
- Organic clicks: +25–50% vs current baseline

---

## Sprint 0 Recovery (GEO Blueprint)

*From [[sources/guardian-authority-framework-2026-05]] §5. Cross-reference with QW tracker above — some overlap.*

| Phase | Days | Task | Overlap with QW |
|---|---|---|---|
| Phase 1 | 1–2 | 301 redirects from conflicting refund terms → canonical `/policy/booking-payment-cancellation/`. Standardize "JVTO Travel Credit" as exclusive term. | QW-1, QW-10 |
| Phase 2 | 3–4 | Re-publish `/our-story/` using founder police narrative. Restore `/destinations/tumpak-sewu/`. | — |
| Phase 3 | 5–7 | C6 Review Registry: index specific Trustpilot Review IDs as evidence assets. Standardize NAP (Jl. Khairil Anwar No.102 A, Badean, Bondowoso, 68214) across all 51 canonical URLs. | QW-14 |

> [stale?] Phase 2 items may already be live in jvto-web. Verify current site state before treating as action items.

---

## Related Ops Pages

-> [[seo/competitors]] | -> [[seo/redirect-map]] | -> [[ops/compilation-profiles]] | -> [[sources/seo-audit-2026-05]] | -> [[sources/guardian-authority-framework-2026-05]]
