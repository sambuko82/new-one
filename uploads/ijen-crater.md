---
profile: website-copy
page: /destinations/ijen-crater
output_date: 2026-05-16
status: reviewed
sources: [kawah-ijen, packages-overview, ssot-v6, credentials/medical-screening]
content_source: DB
type: data-structure-spec
---

# Page Data Structure: /destinations/ijen-crater

> Data fetched from DB at runtime. This file defines display schema only.

## Section Order

1. Hero
2. Quick Facts
3. The Blue Fire
4. The Hike
5. Health Screening Note
6. Sulfur Mining Context
7. Packages That Include This Destination
8. CTA

---

## Section Definitions

### Hero

| Field | DB source hint | Display format | Conditional? |
|---|---|---|---|
| Destination name | `destinations.name` | H1 heading | No |
| Tagline | `destinations.tagline` | Subtitle/deck text below H1 | No |
| Hero image | `destinations.hero_image_url` | Full-width background image, lazy-loaded | No |
| Hero image alt text | `destinations.hero_image_alt` | `alt` attribute on img element | No |

---

### Quick Facts

| Field | DB source hint | Display format | Conditional? |
|---|---|---|---|
| Elevation | `destinations.elevation_m` | "2,386 m" — display with unit label | No |
| Location | `destinations.location_text` | Plain text, e.g. "Banyuwangi / Bondowoso Regency, East Java" | No |
| Type | `destinations.type_label` | Plain text, e.g. "Active stratovolcano" | No |
| Best season | `destinations.best_season` | Plain text, e.g. "Dry season: April–October" | No |
| Access mode | `destinations.access_mode` | Plain text, e.g. "Night hike from Paltuding trailhead (~3 km, ~90 min ascent)" | No |
| Regulatory authority | `destinations.regulatory_authority` | Plain text + hyperlink to regulatory body URL | No |

Display as: icon-labelled key-value list or compact table. 6 rows max.

---

### The Blue Fire

| Field | DB source hint | Display format | Conditional? |
|---|---|---|---|
| Section heading | Static: "The Blue Fire" | H2 | No |
| Description body | `destinations.blue_fire_description` | Rich text / paragraphs | No |
| Weather caveat | `destinations.blue_fire_caveat` | Callout box or inline note — distinct visual treatment. Must convey: phenomenon is subject to weather and gas conditions, not guaranteed | Always shown — caveat is not conditional; it is part of the section. Never omit. |

> Forbidden text: "Blue Fire guaranteed", "100% Blue Fire visible". These strings must not appear in DB content or template copy.

---

### The Hike

| Field | DB source hint | Display format | Conditional? |
|---|---|---|---|
| Trail distance (one-way) | `destinations.hike_distance_km` | "~3 km one-way" | No |
| Ascent time | `destinations.hike_ascent_time` | "~90 min" | No |
| Trailhead name | `destinations.trailhead_name` | Plain text: "Paltuding" | No |
| Departure timing | `destinations.departure_timing` | Plain text: "00:00 for blue-fire window; 03:00 for sunrise only" | No |
| Equipment provided | `destinations.equipment_provided` | Bulleted list — gas masks, headlamps | No |
| Optional crater descent note | `destinations.crater_descent_note` | Plain text note about ~700 m optional descent to crater floor | No |

---

### Health Screening Note

| Field | DB source hint | Display format | Conditional? |
|---|---|---|---|
| Section heading | Static: "Health Certificate Coordination" | H2 | YES — render only if `destinations.ijen_relevant = true` |
| Regulatory reference | `destinations.health_reg_reference` | Plain text: "BBKSDA SE.1658/KSA.9/2024" | YES — same condition |
| Approved framing copy | `destinations.health_screening_copy` | Paragraph. Must use conditional framing: "Ijen access rules can require a recent local health certificate. JVTO coordinates clinic workflow when access rules require it." | YES — same condition |
| Doctor reference | `people.dr_irwandanu_display_name` + `people.sip_number` | Inline text link to /travel-guide/ijen-health-screening for full protocol details | YES — same condition |
| Full screening details | Static | "See: [How Ijen Health Screening Works →](/travel-guide/ijen-health-screening)" | YES — same condition |

> Forbidden text: "mandatory health screening" without conditional qualifier. The screening is conditional on BBKSDA rules, not unilaterally imposed by JVTO.

Condition logic: `IF destinations.ijen_relevant = true THEN render section ELSE skip`

---

### Sulfur Mining Context

| Field | DB source hint | Display format | Conditional? |
|---|---|---|---|
| Section heading | Static: "Sulfur Miners" | H2 | No |
| Context description | `destinations.mining_context_copy` | Paragraph — covers miner load weights, shared trail, etiquette briefing by guides | No |

---

### Packages That Include This Destination

| Field | DB source hint | Display format | Conditional? |
|---|---|---|---|
| Package list | `packages WHERE destinations_array CONTAINS 'ijen-crater'` | Grid of package cards — each card: package name, duration, origin city, price-from (lowest pax tier), link to package page | No — always shown; if 0 results, show "No packages currently available" fallback |
| Package card: name | `packages.name` | Plain text link | — |
| Package card: duration | `packages.duration_label` | Badge or tag, e.g. "3D2N" | — |
| Package card: origin | `packages.origin_city` | Plain text, e.g. "Surabaya" or "Bali" | — |
| Package card: price-from | `packages.price_from_idr` | "From IDR X,XXX,XXX/person" — Rupiah only, comma thousand separators | — |

---

### CTA

| Field | DB source hint | Display format | Conditional? |
|---|---|---|---|
| Primary CTA | Static | Button: "View Ijen Packages" → links to filtered /tours?destination=ijen-crater | No |
| Secondary CTA | Static | Text link: "Contact us on WhatsApp" → `https://wa.me/6282244788833` | No |
