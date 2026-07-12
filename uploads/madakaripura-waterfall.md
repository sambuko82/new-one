---
profile: website-copy
page: /destinations/madakaripura-waterfall
output_date: 2026-05-12
status: reviewed
sources: [madakaripura, packages-overview, ssot-v6]
content_source: DB
type: data-structure-spec
---

# Page Data Structure: /destinations/madakaripura-waterfall

> Data fetched from DB at runtime. This file defines display schema only.

## Section Order

1. Hero
2. Quick Facts
3. The Approach
4. Historical Context
5. Packages That Include This Destination
6. CTA

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
| Distinction | `destinations.distinction_label` | "Tallest waterfall in Java" — display as badge or highlighted label | No |
| Main curtain height | `destinations.height_main_m` | "~100 m (main curtain)" | No |
| Total height (incl. upper tiers) | `destinations.height_total_m` | "~200 m total (incl. upper tiers)" | No |
| Location | `destinations.location_text` | Plain text: "Probolinggo Regency, East Java, Indonesia" | No |
| Approach | `destinations.access_mode` | Plain text: "~1.5 km canyon walk (~20 min) from roadside parking; horse option available" | No |
| Type | `destinations.type_label` | Plain text: "Horseshoe curtain waterfall in narrow canyon" | No |

Display as: icon-labelled key-value list or compact table. 6 rows max.

> Note: Height figures sourced from SSOT §9_4 (main curtain ~100 m) and indonesia.travel official portal (total ~200 m). Both values should be labelled as estimates where displayed.

---

### The Approach

| Field | DB source hint | Display format | Conditional? |
|---|---|---|---|
| Section heading | Static: "The Approach" | H2 | No |
| Canyon walk description | `destinations.approach_description` | Rich text / paragraphs — covers ~1.5 km gorge walk, narrowing canyon walls, wet and slippery terrain, anticipation building before the waterfall opens | No |
| Wet conditions note | `destinations.wet_conditions_note` | Callout or inline note: "Visitors inevitably get wet from spray. Raincoat strongly recommended — JVTO guides brief guests before entry." | No |
| Horse option note | `destinations.horse_option_note` | Inline note: horse available for guests preferring not to walk the canyon stretch | No |
| Gear note | `destinations.gear_note` | Inline note: helmets at the canyon entrance are provided by the local waterfall site management team (not JVTO equipment) | No |

> CRITICAL: Do NOT list helmets as JVTO-provided equipment. Per packages-overview (SSOT §6_4): helmets at Madakaripura are provided by local site management, not JVTO. DB content for `gear_note` must reflect this.

---

### Historical Context

| Field | DB source hint | Display format | Conditional? |
|---|---|---|---|
| Section heading | Static: "Gajah Mada's Final Days" | H2 | YES — render only if `destinations.historical_context_content IS NOT NULL` |
| Historical body | `destinations.historical_context_content` | Rich text / paragraphs — covers Gajah Mada as 14th-century Majapahit prime minister, site's spiritual significance in local culture | YES — same condition |

Condition logic: `IF destinations.historical_context_content IS NOT NULL AND destinations.historical_context_content != '' THEN render section ELSE skip`

---

### Packages That Include This Destination

| Field | DB source hint | Display format | Conditional? |
|---|---|---|---|
| Package list | `packages WHERE destinations_array CONTAINS 'madakaripura-waterfall'` | Grid of package cards | No — if 0 results show fallback |
| Package card: name | `packages.name` | Plain text link | — |
| Package card: duration | `packages.duration_label` | Badge or tag, e.g. "3D2N" | — |
| Package card: origin | `packages.origin_city` | Plain text, e.g. "Surabaya" or "Bali" | — |
| Package card: price-from | `packages.price_from_idr` | "From IDR X,XXX,XXX/person" — Rupiah only, comma thousand separators | — |

---

### CTA

| Field | DB source hint | Display format | Conditional? |
|---|---|---|---|
| Primary CTA | Static | Button: "View Madakaripura Packages" → links to filtered /tours?destination=madakaripura-waterfall | No |
| Secondary CTA | Static | Text link: "Contact us on WhatsApp" → `https://wa.me/6282244788833` | No |
