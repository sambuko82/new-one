---
profile: website-copy
page: /destinations/papuma-beach
output_date: 2026-05-12
status: reviewed
sources: [papuma-beach, packages-overview, ssot-v6]
content_source: DB
type: data-structure-spec
---

# Page Data Structure: /destinations/papuma-beach

> Data fetched from DB at runtime. This file defines display schema only.

## Section Order

1. Hero
2. Quick Facts
3. What to Expect
4. Packages That Include This Destination
5. CTA

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
| Location | `destinations.location_text` | Plain text: "Jember Regency, East Java, Indonesia" | No |
| Type | `destinations.type_label` | Plain text: "White-sand beach with rocky cape headland (Tanjung Papuma)" | No |
| Cape headland elevation | `destinations.headland_elevation_m` | "~86 m (cape headland)" | No |
| Role in itinerary | `destinations.itinerary_role` | Plain text: "Coastal contrast stop between Ijen and Tumpak Sewu legs — Papuma-family packages (4D+)" | No |

Display as: icon-labelled key-value list or compact table. 4 rows max.

---

### What to Expect

| Field | DB source hint | Display format | Conditional? |
|---|---|---|---|
| Section heading | Static: "What to Expect" | H2 | No |
| Beach description | `destinations.beach_description` | Paragraph — white sand, calm conditions during dry season, dramatic offshore rock formations visible from the shoreline | No |
| Headland description | `destinations.headland_description` | Paragraph — short walk rising to ~86 m above sea level, elevated coastal views, rock formations below | No |
| Itinerary context | `destinations.itinerary_context_copy` | Inline note: "Papuma is the only coastal stop on a JVTO East Java circuit — positioned between the Ijen night hike and the Tumpak Sewu canyon descent to shift pace, scenery, and physicality." | No |

Display as: two-feature layout (The Beach / The Cape) or flowing prose — frontend decides based on available image assets.

---

### Packages That Include This Destination

| Field | DB source hint | Display format | Conditional? |
|---|---|---|---|
| Package list | `packages WHERE destinations_array CONTAINS 'papuma-beach'` | Grid of package cards | No — if 0 results show fallback |
| Package card: name | `packages.name` | Plain text link | — |
| Package card: duration | `packages.duration_label` | Badge or tag, e.g. "4D3N" | — |
| Package card: origin | `packages.origin_city` | Plain text, e.g. "Surabaya" or "Bali" | — |
| Package card: price-from | `packages.price_from_idr` | "From IDR X,XXX,XXX/person" — Rupiah only, comma thousand separators | — |

Note: Only 5 of 16 JVTO packages include Papuma. All are 4D3N or longer. The package grid will typically show 5 cards.

---

### CTA

| Field | DB source hint | Display format | Conditional? |
|---|---|---|---|
| Primary CTA | Static | Button: "View Papuma Packages" → links to filtered /tours?destination=papuma-beach | No |
| Secondary CTA | Static | Text link: "Contact us on WhatsApp" → `https://wa.me/6282244788833` | No |
