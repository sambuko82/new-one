---
type: seo
title: Why JVTO — Hub & Spoke Architecture Reference
last_updated: 2026-05-24
sources: [digital-trust-fortress-blueprint, why-jvto-trust-architecture]
owner: wiki-llm
stale_after_days: 60
---

# Why JVTO — Hub & Spoke Architecture Reference

*Dev-facing reference for the /why-jvto cluster. For content strategy, see [[sources/why-jvto-trust-architecture]]. For the full technical blueprint, see [[sources/digital-trust-fortress-blueprint]].*

---

## URL Map

| Level | URL | Title | Template type |
|---|---|---|---|
| L1 Hub | /why-jvto | Why Travel with Java Volcano Tour Operator | TRUST_HUB (dashboard) |
| L2 Spoke | /why-jvto/our-story | Our Story: From Homestay to Police-Led Operator | KNOWLEDGE_TRUST |
| L2 Spoke | /why-jvto/the-jvto-difference | The JVTO Difference: Standards & Protocols | KNOWLEDGE_TRUST |
| L2 Spoke | /why-jvto/reviews | Guest Reviews & Historical Proof | KNOWLEDGE_TRUST |
| L2 Spoke | /why-jvto/community-standards | Community & Sustainability | KNOWLEDGE_TRUST |
| Registry | /verify-jvto | Verify JVTO: Legal & Official Documents | EVIDENCE_REGISTRY |
| Registry | /team | Our Team | CREW_MANIFEST |
| Dynamic | /team/[slug] | Individual crew profile (e.g., /team/gufron) | CREW_PROFILE |

---

## Schema Injection Layers

| Layer | File | Schema |
|---|---|---|
| Global (all pages) | `/src/app/layout.tsx` | `TravelAgency`, `Organization`, `PostalAddress` |
| Hub layout | `/src/app/why-jvto/layout.tsx` | `ItemList` (6 trust pillars), `Person` (police authority), `MedicalBusiness` (health screening) |
| /verify-jvto | page-level | `AboutPage`, `ProfilePage`, SHA-256 `PropertyValue` identifiers |
| /team/[slug] | page-level | `Person` with `knowsAbout` skills |

---

## Key Components

| Component | File | Purpose |
|---|---|---|
| `AuthorityShield` | `components/atomic/trust/AuthorityShield.tsx` | Sticky display: Police status + NIB — persistent trust signal |
| `ForensicGallery` | `components/atomic/trust/ForensicGallery.tsx` | Evidence viewer with filename, size, upload date, SHA-256 hash |
| `CrewCard` | `components/atomic/trust/CrewCard.tsx` | Dynamic profile card pulling crew data + linked review excerpts |
| `TrustNavigation` | `components/atomic/trust/TrustNavigation.tsx` | Sub-navigation for the full Why JVTO cluster |
| `SSOTRenderer` | (implied) | Renders /why-jvto hub from `why-jvto-ssot.json` — auto-updates on SSOT change |

---

## Data Architecture

```
/data/why-jvto-ssot.json      ← Knowledge graph (generated at build time)
/data/raw/crews.csv           ← Source: crew operational manifest
/data/raw/reviews.csv         ← Source: aggregated Trustpilot + Google reviews
```

Build scripts:
- `scripts/forensics/generate-hashes.ts` — calculates SHA-256 for all /proof files
- `scripts/forensics/build-ssot.ts` — stitches CSV + hashes → JSON

`lib/ssot/stitcher.ts` — maps Crew ↔ Reviews ↔ Evidence (three-way join logic)

---

## Evidence Asset Structure

```
/public/assets/proof/
  /legal/     ← NIB, TDUP, Tax IDs
              ← Naming: YYYY-MM-DD_TYPE_ID.pdf
  /police/    ← SPRIN POLPAR, SPRIN WAL-TRAVEL, KTA (redacted), uniform photos
  /history/   ← Booking.com 2015 award plaque scan, Stefan Loose pages
  /partners/  ← HPWKI, INDECON certificates
```

Anti-duplication rule: evidence PDFs stored **only** in /public/assets/proof/. All other pages reference by Asset ID, not path duplication.

---

## API Endpoint

`/api/verifiable-credentials/route.ts` — exposes SSOT JSON for 3rd-party validation (AI agents, B2B clients, OTA integrations).

---

## 6 Trust Pillars (Hub Dashboard)

1. Tourist Police Leadership
2. Legal Compliance (NIB, TDUP, PT status)
3. Medical Protocols (Ijen health screening — BBKSDA SE.1658)
4. Private & All-Inclusive Logistics
5. Historical Continuity (2015 → present, Booking.com + Stefan Loose)
6. Crew Competence (HPWKI-trained, review-verified)

---

-> [[sources/digital-trust-fortress-blueprint]] | -> [[sources/why-jvto-trust-architecture]] | -> [[seo/geo-aeo-strategy]] | -> [[seo/seo-strategy]]
