---
type: website
title: JSON-LD Schema Templates — Page Type Reference
last_updated: 2026-05-26
sources: [seo-audit-2026-05, ssot-v6, sitemap-2026-05, guardian-authority-framework-2026-05]
owner: wiki-llm
stale_after_days: 60
---

# JSON-LD Schema Templates

*Reference page for all JSON-LD structured-data patterns used on javavolcano-touroperator.com. Use the `schema` compilation profile (see [[ops/compilation-profiles]] §schema) to generate actual output. This page documents structure and field rules; it does not contain pre-filled schema.*

---

## Page-Type → Schema Map

| Page URL pattern | Schema types required |
|---|---|
| `/` (Homepage) | `Organization` / `TravelAgency` (global) |
| `/tours/{slug}` | `TouristTrip` + `FAQPage` + `AggregateRating` + `BreadcrumbList` |
| `/destinations/{slug}` | `TouristAttraction` + `BreadcrumbList` |
| `/why-jvto/reviews` | `Organization` with `aggregateRating` + `review` array |
| `/travel-guide/{slug}` | `Article` + `FAQPage` (if applicable) |
| `/verify-jvto/*` | `Organization` with `identifier` (NIB, TDUP) + `memberOf` (HPWKI, INDECON) |

---

## Organization / TravelAgency (Homepage)

**SSOT draw-from**: [[credentials/legal-licenses]] + [[credentials/trust-signals]] §Schema Canonical Values + §Social Media Profiles

**Required fields:**
```
@type: TravelAgency
name, url, logo, telephone, email, address (streetAddress, addressLocality, postalCode, addressCountry)
foundingDate, identifier (NIB), sameAs (social URLs array)
aggregateRating (ratingValue: 4.8, reviewCount: 195 cross-platform)
memberOf (HPWKI, INDECON)
```

**Forbidden**: `ratingValue: 4.9` without platform attribution. `reviewCount: 47` (stale). Placeholder `ahu.go.id` URL for INDECON.

**Output file**: `output/schema/homepage-organization-schema.json`

---

## TouristTrip (Tour pages)

**SSOT draw-from**: [[products/packages-full-pricing]] (price, currency) + [[website/faq-master]] (FAQ block) + [[credentials/trust-signals]] §Schema Canonical Values (reviewCount, ratingValue)

**Required fields:**
```
@type: TouristTrip
name, url, description, duration (ISO 8601: P1D, P2D, P3D, ...)
provider (TravelAgency — JVTO)
itinerary (ItemList of Trip objects per day)
subjectOf (TouristAttraction inline — primary destination only)
offers (AggregateOffer: priceCurrency IDR, lowPrice, highPrice, offerCount)
aggregateRating (ratingValue: 4.8, reviewCount: 51 Trustpilot)
```

**Always paired with**: `FAQPage` block in the same JSON array. Minimum 4 Q&As per page.

**BreadcrumbList pattern**: Home > Tours > [From City] > [Tour Name]

**Price format**: full integer IDR (e.g. `1550000` not `1.55M`).

**Output file**: `output/schema/[tour-slug]-schema.json`

---

## FAQPage (Tour and destination pages)

**SSOT draw-from**: [[website/faq-master]] — draw questions relevant to the specific page.

**Required fields:**
```
@type: FAQPage
mainEntity: array of Question objects
  each Question: name (question text), acceptedAnswer.Answer.text (answer text)
```

**Minimum**: 4 Q&As per page. Each answer must be self-contained (no "see above" references).

**Always paired as a second element in the schema array** on tour pages. On destination pages, omit or include a short 3–4 Q&A block about the destination.

---

## TouristAttraction (Destination pages)

**SSOT draw-from**: [[destinations/{slug}]] (Entity Summary, geo bbox, Quick Facts) + [[credentials/legal-licenses]] (provider NIB)

**Required fields:**
```
@type: TouristAttraction
name, url, description (from Entity Summary — ≤200 chars)
geo (GeoCoordinates: latitude, longitude — use bbox center)
address (PostalAddress: addressLocality, addressRegion "Jawa Timur", addressCountry "ID")
```

**Optional but valuable:**
```
touristType, isAccessibleForFree (false — park entrance fee applies)
containedInPlace (AdministrativeArea: East Java)
```

**Always paired with**: `BreadcrumbList` in the same JSON array.

**Output file**: `output/schema/[destination-slug]-schema.json`

---

## BreadcrumbList (All sub-pages)

**SSOT draw-from**: [[sources/sitemap-2026-05]] (URL structure)

**Pattern for destination pages:**
```
ListItem 1: name "Home", item "https://javavolcano-touroperator.com"
ListItem 2: name "Destinations", item "https://javavolcano-touroperator.com/destinations"
ListItem 3: name "[Destination Name]", item "https://javavolcano-touroperator.com/destinations/[slug]"
```

**Pattern for tour pages:**
```
ListItem 1: name "Home"
ListItem 2: name "Tours"
ListItem 3: name "From [City]" (e.g. "From Surabaya")
ListItem 4: name "[Tour Name]"
```

---

## Numeric Verification Checklist

Before saving any schema output, grep [[credentials/trust-signals]] §Schema Canonical Values and confirm:

- [ ] `reviewCount` on TouristTrip = `51` (Trustpilot, verified 2026-05-18)
- [ ] `reviewCount` on Organization = `195` (cross-platform: 51 TP + 123 Google + 21 TA, as of 2026-05-26)
- [ ] `ratingValue` = `4.8` (Trustpilot — not `4.9`, not `4.90`)
- [ ] NIB = `1102230032918`
- [ ] No placeholder `ahu.go.id` URLs
- [ ] No hardcoded prices from memory — draw from [[products/packages-full-pricing]]

---

## ISO 3166-2:ID Geospatial Anchoring

*From [[sources/guardian-authority-framework-2026-05]] §9 + [[seo/geo-aeo-strategy]] §ISO 3166-2:ID.*

Add `areaServed` with ISO 3166-2:ID code **`ID-JI`** (East Java / Jawa Timur) to Organization schema. This prevents AI engines from confusing JVTO with Bali-based resellers when processing geographic queries.

```json
"areaServed": {
  "@type": "AdministrativeArea",
  "name": "East Java",
  "identifier": "ID-JI"
}
```

For hyper-local precision, add `serviceArea` entries for Surabaya, Bondowoso, and Banyuwangi as `City` types with `containedInPlace: "East Java"`.

---

-> [[ops/compilation-profiles]] §schema | -> [[credentials/trust-signals]] §Schema Canonical Values | -> [[credentials/legal-licenses]] | -> [[sources/seo-audit-2026-05]] | -> [[sources/guardian-authority-framework-2026-05]]
