---
profile: website-copy
page: /destinations/tumpak-sewu-waterfall
output_date: 2026-05-12
status: reviewed
sources: [tumpak-sewu, packages-overview, ssot-v6]
content_source: DB
type: data-structure-spec
---

# Page Data Structure: /destinations/tumpak-sewu-waterfall

> Data fetched from DB at runtime. This file defines display schema only.

## Section Order

1. Hero
2. Quick Facts
3. Two Vantage Points
4. Safety Note
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
| Height | `destinations.height_m` | "~120 m (multi-tiered curtain)" | No |
| Location | `destinations.location_text` | Plain text: "Lumajang Regency, East Java, Indonesia" | No |
| Nickname | `destinations.nickname` | Plain text: "Java's Niagara" — display as secondary label or badge | No |
| Type | `destinations.type_label` | Plain text: "Multi-tiered curtain waterfall" | No |
| Access mode | `destinations.access_mode` | Plain text: "Rim viewpoint — short walk from parking. Canyon descent: ~300 steps, moderate-challenging fitness." | No |

Display as: icon-labelled key-value list or compact table. 5 rows max.

---

### Two Vantage Points

| Field | DB source hint | Display format | Conditional? |
|---|---|---|---|
| Section heading | Static: "Two Ways to See It" | H2 | No |
| Rim viewpoint description | `destinations.rim_viewpoint_description` | Paragraph — panoramic view of full curtain, short walk from parking, suitable for all fitness levels | No |
| Canyon descent description | `destinations.canyon_descent_description` | Paragraph — steep descent (~300 steps, ropes in places), base of falls, mist and noise, guides assess fitness on the day | YES — render if `destinations.canyon_descent_available = true` |
| Descent decision note | `destinations.descent_decision_note` | Inline note: "The decision to descend stays with the guest — guides assess conditions on the day and brief the route before starting." | YES — same condition as canyon descent |

Condition logic for canyon descent: `IF destinations.canyon_descent_available = true THEN render canyon descent block ELSE show rim viewpoint only`

Display as: two-column or stacked comparison layout — Rim Viewpoint vs Canyon Descent.

---

### Safety Note

| Field | DB source hint | Display format | Conditional? |
|---|---|---|---|
| Section heading | Static: "Conditions on the Ground" | H2 | No |
| Wet conditions note | `destinations.safety_wet_conditions` | Plain text: "Trails are wet year-round. Canyon approach involves ropes in places. Guides assess fitness before descent." | No |
| Helmet note | `destinations.safety_helmet_note` | Plain text: "Helmets for the canyon section are provided by the local Tumpak Sewu site management — not JVTO equipment." | No |
| Footwear note | `destinations.safety_footwear_note` | Plain text: closed-toe, non-slip footwear recommended | No |

---

### Packages That Include This Destination

| Field | DB source hint | Display format | Conditional? |
|---|---|---|---|
| Package list | `packages WHERE destinations_array CONTAINS 'tumpak-sewu-waterfall'` | Grid of package cards | No — if 0 results show fallback |
| Package card: name | `packages.name` | Plain text link | — |
| Package card: duration | `packages.duration_label` | Badge or tag, e.g. "4D3N" | — |
| Package card: origin | `packages.origin_city` | Plain text, e.g. "Surabaya" or "Bali" | — |
| Package card: price-from | `packages.price_from_idr` | "From IDR X,XXX,XXX/person" — Rupiah only, comma thousand separators | — |

---

### CTA

| Field | DB source hint | Display format | Conditional? |
|---|---|---|---|
| Primary CTA | Static | Button: "View Tumpak Sewu Packages" → links to filtered /tours?destination=tumpak-sewu-waterfall | No |
| Secondary CTA | Static | Text link: "Contact us on WhatsApp" → `https://wa.me/6282244788833` | No |
