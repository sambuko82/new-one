---
type: seo
title: 301 Redirect Map — Legacy → SSOT URLs
last_updated: 2026-05-17
sources: [seo-audit-2026-05, sitemap-2026-05]
owner: wiki-llm
stale_after_days: 60
---

# 301 Redirect Map

**Purpose**: Map legacy Laravel URL routes to their canonical Next.js SSOT equivalents. This is a **dev handoff document** — the wiki holds the intent; implementation is in `jvto-web` (`next.config.js` or middleware).

**Priority**: Critical (QW-1 in [[seo/seo-strategy]]). Google has indexed both the legacy and new routes at the same domain. Authority dilution and duplicate content penalties are active.

---

## Minimum Required Redirects

| Legacy URL | 301 Target | Notes |
|---|---|---|
| `/about` | `/why-jvto/our-story` | |
| `/contact` | `/contact` | Verify this is the new route — keep if same |
| `/faq` | `/travel-guide/faq` | |
| `/reviews` | `/why-jvto/reviews` | |
| `/all-inclusive` | `/policy/inclusions-exclusions` | |
| `/student-package` | `/isic/student-package` | |
| `/custom-package` | `/tours` | |
| `/office` | `/contact` | |
| `/how-to-book` | `/travel-guide/booking-information` | |
| `/terms-and-condition` | `/policy` | |
| `/blog` | `/travel-guide` | |
| `/packages/surabaya/3d2n/1` → `/packages/surabaya/3d2n/{N}` | Map each `{N}` to specific `/tours/from-surabaya/{slug}` | Requires individual mapping — see tour slug table below |
| `/packages/yogyakarta` | `/tours` (interim) or `/tours/from-yogyakarta` (future) | Yogyakarta origin not in SSOT canonical yet |

---

## Legacy Package ID → Tour Slug Map

These are the `/packages/surabaya/3d2n/{N}` legacy IDs and their SSOT equivalents. Verify exact IDs from server logs or Google Search Console before implementation.

| Legacy slug / pattern | SSOT slug |
|---|---|
| Bromo 1-day | `/tours/from-surabaya/bromo-1d` |
| Bromo 2D1N | `/tours/from-surabaya/bromo-2d1n` |
| Ijen 2D1N | `/tours/from-surabaya/ijen-2d1n` |
| Bromo Madakaripura Ijen 3D2N | `/tours/from-surabaya/bromo-madakaripura-ijen-3d2n` |
| Ijen Bromo Madakaripura 3D2N | `/tours/from-surabaya/ijen-bromo-madakaripura-3d2n` |
| (All 12 Surabaya tours) | Cross-reference with [[sources/sitemap-2026-05]] for the exact slug list |

Verify all 12 Surabaya slugs from [[sources/sitemap-2026-05]] before implementation.

---

## Subdomain / Cross-Domain Decisions

| Domain | Current status | Recommended action |
|---|---|---|
| `legacy.javavolcano-touroperator.com` | Serving images from this subdomain on new tour pages | Migrate all images to main domain; 301 the subdomain itself to main domain |
| `java-tour.com` | Listed on JVTO Facebook; content unknown | **Sam to decide**: (a) 301 to main domain (best — consolidates authority), (b) `canonical` tag pointing to main domain (acceptable), (c) keep with overlapping content (bad — current unknown status). Inspect and decide. |
| `www.` prefix | Some pages served with www., others without | Verify one version 301s to the other; self-referencing canonicals handle the rest |

---

## Implementation Notes for Dev

1. Implement in `next.config.js` under `redirects` (permanent: true = 308, or set status: 301 for old clients)
2. After redirects go live: **resubmit sitemap.xml in Google Search Console** and request re-indexing of top 10 high-value pages
3. Remove all legacy URLs from `sitemap.xml` — the sitemap should contain only SSOT routes
4. Monitor GSC "Coverage" report over 4 weeks — indexed page count should drop initially (legacy URLs), then rise (new content)

---

## Meta Description Template Fix (QW-3 — separate from redirects)

`/tours/from-surabaya` and `/tours/from-bali` show "Discover all tour packages starting from **From-surabaya**" in Google's SERP cache. This is a template variable humanization bug — the `{slug}` component is not converting kebab-case to title case.

Fix: ensure the meta description template converts route segments to human-readable text before rendering. "from-surabaya" → "Surabaya", "from-bali" → "Bali".

---

-> [[seo/seo-strategy]] | -> [[sources/sitemap-2026-05]] | -> [[sources/seo-audit-2026-05]]
