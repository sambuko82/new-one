---
type: seo
title: GEO/AEO Strategy — Generative & Answer Engine Optimization
last_updated: 2026-05-26
sources: [geo-aeo-strategy-2026-05, eav-ai-optimization-2026-05, seo-audit-2026-05, guardian-authority-framework-2026-05]
owner: wiki-llm
stale_after_days: 60
---

# GEO/AEO Strategy

*Companion to [[seo/seo-strategy]]. Where seo-strategy covers traditional search rankings, this page covers AI answer engine visibility: Google AI Overviews, Perplexity, ChatGPT, and similar.*

---

## Strategic Context

In 2026, answer engines synthesize responses directly — users never click through. JVTO's trust content is best-in-class. The gap: **machine-readability**. AI needs structured, verifiable, entity-rich data to cite JVTO confidently.

Two disciplines:
- **GEO** (Generative Engine Optimization): teach LLMs *who* JVTO is — entity, authority, credentials
- **AEO** (Answer Engine Optimization): format content so AI can extract and read it verbatim

---

## GEO: Entity Architecture

### What to implement

1. **Organization JSON-LD** on every page (root layout injection)
   - `"@type": ["TravelAgency", "LocalBusiness"]`
   - `"name": "PT Java Volcano Rendezvous"` with `"alternateName": "Java Volcano Tour Operator (JVTO)"`
   - `"identifier"`: NIB 1102230032918 as `PropertyValue`
   - `"foundingDate": "2016-01-01"`
   - `"telephone": "+6282244788833"`
   - `"email": "hello@javavolcano-touroperator.com"`
   - Google Maps CID: `1266403973589689021`
   - `"sameAs"`: Trustpilot, TripAdvisor, INDECON spotlight, Detik.com article, BBKSDA report

2. **Founder Person schema** — Agung Sambuko
   - `"jobTitle": "Active Tourist Police Officer"` (NOT "Founder" — the police role is the trust signal)
   - Link to Ditpamobvit / Indonesian National Police (Wikidata if available)

3. **Staff Person schemas** — each crew card
   - Guide members: link to HPWKI license, BBKSDA training
   - Dr. Ahmad Irwandanu: STR QN00001073380217
   - Cross-reference Trustpilot reviews mentioning staff names (Ahboy, Rendi, Gufron, Fauzi)

4. **SHA-256 hashes in schema**
   - NIB hash: `E0ABC309A4F04EE9460FF7FB87A33659B79BE2B8F3BC05D20DB9AFDCEFB6CC25`
   - TDUP hash: `FA13B599A3CB5F1D31819B5ACC3AC670ECA5F22C5B5DEE719D45289D593178E6`
   - SPRIN POLPAR + SPRIN WAL-TRAVEL hashes: see [[credentials/police-integration]]
   - Include as `identifier` PropertyValues on the verify-jvto page entities

5. **sameAs cross-press linking**
   - Detik.com "Suka Duka Polisi Pariwisata" (2021-03-14)
   - Radar Jember Geopark article (2021-03-24)
   - Radar Jember sulfur patrol article (2021-05-27)
   - BBKSDA pelatihan pemandu 2024
   - Explicit `sameAs` in Organization schema → proves external entities corroborate internal claims

6. **llms.txt** file in root
   - Markdown-formatted JVTO operational summary
   - Optimized for GPTBot / ClaudeBot / Bingbot native crawl
   - Reduces token load for AI entity ingestion vs JSON

---

## AEO: Content Formatting Rules

### Universal rules (apply to all /travel-guide and /policy pages)

- **Answer-First**: Open every section with a 1–2 sentence standalone answer AI can extract verbatim
- **Conversational headings**: H2/H3 as questions ("What happens if Bromo is closed?" not "Closure Policy")
- **Max 200–400 words per chunk** on knowledge pages
- **HTML tables** for all logistics data: permit fees, weather data, packing lists
- **`<ul>` with ItemList JSON-LD** for gear requirements

### Per-page AEO targets

| Page | Action | Schema to add |
|---|---|---|
| Homepage (root) | Add AI TL;DR block immediately after H1 | `Organization` + `LocalBusiness` |
| `/tours/{slug}` | Add TouristTrip + Offer + FAQPage | `TouristTrip`, `Offer`, `AggregateRating` |
| `/destinations/kawah-ijen` | Add Blue Fire causality chain (chemical → temperature → visual); gear ItemList | `TouristAttraction`, `ItemList` |
| `/destinations/mount-bromo` | Add Bromo vs Ijen comparison table | `TouristAttraction` |
| `/tours/from-bali/*` | Add Gilimanuk→Ketapang ferry timestamps | `TouristTrip`, `TransferAction` |
| `/travel-guide/ijen-health-screening` | Structure as FAQ with YMYL causal language | `FAQPage` |
| `/verify-jvto/*` | Add sameAs press links; SHA-256 as PropertyValues | `AboutPage`, `ProfilePage` |
| `/why-jvto/our-story` | Explicit entity bridge: Ijen Bondowoso Homestay → PT Java Volcano Rendezvous | `Organization` with `sameAs` (historical entity) |

### Fan-out pre-answers (LLM agents ask these autonomously)

Plant these as explicit Q&A blocks:
- "What permits for Ijen?" → IDR 100,000 weekday / IDR 150,000 weekend (foreign)
- "Is Bromo safe?" → See [[seo/seo-strategy]] §Silo 3 `bromo-ijen-status-today`
- "How to get from Bali to Bromo?" → Ferry table with Gilimanuk→Ketapang timestamps
- "Can I cancel if volcano closes?" → Travel Credit (not cash refund), 48-hour window

---

## Digital Trust Gap Evaluation

*From [[sources/guardian-authority-framework-2026-05]] §3 (GEO Blueprint, 2026-05).*

Assessment of where offline authority fails to translate to digital/AI presence:

| Attribute | Offline Authority (SSOT Reality) | Digital Presence (Audit Findings) | AI Retrieval Risk |
|---|---|---|---|
| Entity Identity | Active Tourist Police Leadership (Bripka Agung Sambuko) | Missing `/our-story/` (404); broken E-E-A-T chain | **High** |
| Medical Integrity | Mandatory physician-led screening (Dr. Ahmad Irwandanu) | Text-only mentions; no `MedicalProcedure` schema | **Critical** |
| Verifiability | 14 Credentials & 52 SHA-256 evidence assets | Fragmented schema; assets siloed from machine layer | **Medium** |
| Policy Logic | Unified "JVTO Travel Credit" system | Conflicting refund terms across 51 URLs | **High** |
| Geographic Anchor | Licensed East Java Entity (NIB: 1102230032918) | Missing `geoCoordinates` and ISO regional codes | **Medium** |

> [stale?] The `/our-story/` 404 finding dates from 2026-05 audit. `/why-jvto/our-story` may now be live in jvto-web — verify before treating as a gap.

## ISO 3166-2:ID Geospatial Anchoring

*From [[sources/guardian-authority-framework-2026-05]] §9.*

Use `areaServed` with ISO 3166-2:ID code **`ID-JI`** (East Java / Jawa Timur) in Organization schema. Prevents AI engines from confusing JVTO with Bali-based resellers and aggregators. Hardcode regional polygons for Surabaya, Bondowoso, and Banyuwangi as specific `serviceArea` entries.

See [[website/schema-templates]] for implementation in Organization JSON-LD.

---

## EAV Structuring Principles

*From [[sources/eav-ai-optimization-2026-05]]*

Transform JVTO claims from narrative to machine-readable Entity→Attribute→Value triples:

| Entity | Attribute | Value |
|---|---|---|
| Organization | `founder.jobTitle` | "Active Tourist Police Officer" |
| Organization | `identifier.NIB` | "1102230032918" |
| HealthScreening | `isRequired` | true |
| HealthScreening | `regulatoryBasis` | "BBKSDA SE.1658" |
| CancellationPolicy | `refundType` | "TravelCredit" |
| TourPackage | `StartLocation` | "Surabaya" or "Bali" (primary discriminator) |

NLP sharpening rule: every claim must state **cause → effect**. "Police officer" → "risk mitigation protocols exceed civilian operators." "Health screening" → "enforced per BBKSDA SE.1658, not a formality."

---

## Confirmed Rankings (AEO proof-of-concept)

JVTO already ranks #1 for:
- "tourist police bromo tour"
- "licensed bromo tour operator indonesia tourist police"

Pattern to scale: long-tail + branded + regulatory intent + low competition. These queries have no OTA competition.

---

## OTA / App Engine

- **GetYourGuide + Viator**: ensure NIB, founding date, and entity name match SSOT exactly
- **OTA images**: prioritize police-lineup photos and official vehicle fleet over scenic shots
- **trip.javavolcano-touroperator.com**: implement as PWA (Progressive Web App) for offline itinerary access in poor-connectivity volcanic areas

---

## Status

| Item | Owner | Status |
|---|---|---|
| TL;DR block on homepage | Dev (jvto-web) | Pending |
| Organization JSON-LD complete | Dev (jvto-web) | Partial (missing hashes, sameAs) |
| TouristTrip schema on tour pages | Dev (jvto-web) | Pending |
| FAQPage on /travel-guide/ijen-health-screening | Dev (jvto-web) | Pending |
| llms.txt | Dev (jvto-web) | Pending |
| sameAs press links in Organization schema | Dev (jvto-web) | Pending |
| Person schema for crew | Dev (jvto-web) | Pending |

---

-> [[seo/seo-strategy]] | -> [[sources/geo-aeo-strategy-2026-05]] | -> [[sources/eav-ai-optimization-2026-05]] | -> [[website/schema-templates]] | -> [[website/aeo-claims]]
