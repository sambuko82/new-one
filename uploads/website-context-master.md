---
type: website
title: JVTO Website Implementation Master
last_updated: 2026-06-01
sources: [ssot-v6, trust-signals, legal-licenses, packages-full-pricing, jvto-policy-pack-v6, brand-voice, aeo-claims, schema-templates, operational-facts, hotels, agung-sambuko, dr-ahmad-irwandanu, crew-registry]
owner: wiki-llm
stale_after_days: 30
---

# JVTO Website Implementation Master

Single reference for website implementation. Does not duplicate `output/website/HANDOFF.md` (route → output → schema map). This document consolidates what HANDOFF does not: the **working values**, **business logic rules**, **wording constraints**, and **schema requirements** that every page must apply.

**Always read HANDOFF.md for route → file mapping. Read this file for logic, rules, and verified values.**

---

## Section 1: Working Values Table

*Resolve these before generating any content. Values marked High-drift must be live-checked before schema generation. Values below were verified from SSOT files on 2026-06-01.*

### 1.1 Review Counts & Ratings

| Field | Canonical value | Source | Last verified | Drift risk |
|---|---|---|---|---|
| `reviewCount` (Trustpilot) | **51** | trust-signals.md §Live Review Platforms | 2026-05-18 | **High** |
| `reviewCount` (Google Maps) | **123** | trust-signals.md §Live Review Platforms | 2026-05-26 (API) | **High** |
| `reviewCount` (TripAdvisor) | **21** | trust-signals.md §Live Review Platforms | 2026-05-12 (DB) | Medium |
| `reviewCount` (cross-platform total) | **195** | calculated: 51+123+21 | 2026-05-26 | **High** |
| `ratingValue` (Trustpilot — schema primary) | **4.8** | trust-signals.md §Schema Canonical Values | 2026-05-18 | Medium |
| `ratingValue` (Google Maps) | **4.9** | trust-signals.md §Live Review Platforms | 2026-05-26 | Medium |
| `ratingValue` (TripAdvisor) | **4.95** | trust-signals.md §Live Review Platforms | 2026-05-12 | Low |

> **Schema rule**: Use `ratingValue: 4.8` (Trustpilot — lowest single-platform, conservative) for all schema. Use `reviewCount: 51` on TouristTrip pages. Use `reviewCount: 195` on Organization schema.
> **Never interchangeable**: Trustpilot `4.8` ≠ Google `4.9` ≠ TripAdvisor `4.95`.

### 1.2 Legal & Credential IDs

| Field | Canonical value | Source | Drift risk |
|---|---|---|---|
| NIB (Nomor Induk Berusaha) | **1102230032918** | legal-licenses.md | None |
| TDUP number | **1102230032918** (same as NIB; issued 2023-02-11) | legal-licenses.md | None |
| AHU company registry | **AHU-0023020** | legal-licenses.md | None |
| KBLI codes | **79121** (Travel Agency), **79911** (Tour Operator) | legal-licenses.md | None |
| HPWKI AHU ID | **AHU-0001072.AH.01.07.TAHUN 2024** | legal-licenses.md | Low |
| ISIC Provider ID | **259268** | legal-licenses.md | Low |
| Dr. Irwandanu STR | **QN00001073380217** | dr-ahmad-irwandanu.md | Low |
| BBKSDA Surat Edaran | **SE.1658/KSA.9/2024** | dr-ahmad-irwandanu.md + kawah-ijen.md | Low |
| Bank BRI account | `001301001779564` SWIFT `BRINIDJAXXX` (holder: PT Java Volcano Rendezvous) | jvto-policy-pack-v6.md | Low |
| Bank BCA account | `1200944352` SWIFT `CENAIDJAXXX` (holder: PT Java Volcano Rendezvous) | jvto-policy-pack-v6.md | Low |
| Legal name | **PT Java Volcano Rendezvous** | legal-licenses.md | None |
| Founded | **2016** (PT incorporation date per AHU) | legal-licenses.md | None |

### 1.3 Contact & Identity

| Field | Value | Source |
|---|---|---|
| Website | `https://javavolcano-touroperator.com` | — |
| Phone | `+6282244788833` | legal-licenses.md |
| Email | `hello@javavolcano-touroperator.com` | legal-licenses.md |
| WhatsApp | `+62 822-4478-8833` | operational-facts.md |
| Address | `Jl. Khairil Anwar No.102 A, Badean, Bondowoso, Jawa Timur 68214, Indonesia` | legal-licenses.md |
| Google Maps CID | `1266403973589689021` | trust-signals.md |
| Logo URL | `https://javavolcano-touroperator.com/assets/img/jvto-color.png` | trust-signals.md |
| Brand name | Java Volcano Tour Operator (JVTO) | — |
| Support hours | 08:00–22:00 WIB (GMT+7) daily | operational-facts.md |

### 1.4 Key People

| Person | Role | Identifier | Verification |
|---|---|---|---|
| Agung Sambuko (Mr. Sam) | Founder, Active Tourist Police Officer — Ditpamobvit East Java, rank Bripka | SPRIN POLPAR + SPRIN WAL TRAVEL 2024-02-12 | press: Detik 2021, Radar Jember ×2 |
| Dr. Ahmad Irwandanu | Medical Officer — Ijen health-screening coordination | STR: `QN00001073380217` | `https://satusehat.kemkes.go.id/sdmk/nakes/QN00001073380217` |

### 1.5 SHA-256 Forensic Anchors (for /verify-jvto)

| Asset | SHA-256 |
|---|---|
| NIB 1102230032918 | `fa20dde31bb75e46b061ed14cc6d003f6960c02a9a82c20d8603b0cbf6f7b1b7` |
| TDUP 1102230032918 | `27252d512ddfa74de22a3e3ec10aa3dd40ef88da3eb57349fcd2137411551ee3` |
| HPWKI Approval | `ca1fb1a48b550a7748d400f165899f12a356e6941aacdde9c043427698aaf63b` |
| SPRIN POLPAR | `03c8578dc22956faa366d957badecfe38868d4760359cd8059fb2d6b145dfeab` |

---

## Section 2: Page Architecture Map

*Short summary — see HANDOFF.md for full route → output file → schema file mapping.*

### 2.1 Page types and status summary

| Section | Page count | Status | Key content source |
|---|---|---|---|
| Sitewide (/, /tours, /contact, /blog, /isic) | 8 | 2 reviewed, 6 draft | wiki/website/ |
| Tours — Surabaya origin | 12 | draft | wiki/products/packages-full-pricing.md |
| Tours — Bali origin | 4 | draft | wiki/products/packages-full-pricing.md |
| Tours — Student packages | 6 | draft | wiki/products/packages-full-pricing.md |
| Destinations (5 pages) | 5 | draft | wiki/destinations/*.md |
| Travel guide (12 pages) | 12 | 3 reviewed, 9 draft | wiki/website/operational-facts.md |
| Why JVTO (6 pages) | 6 | 4 reviewed, 2 draft | wiki/website/aeo-claims.md + wiki/people/ |
| Verify JVTO (5 pages) | 5 | draft | wiki/credentials/ |
| Policy (4 pages) | 4 | draft | wiki/sources/jvto-policy-pack-v6.md |
| `/team` (hub) | 1 | NOT GENERATED — route exists in jvto-web | wiki/people/crew-registry.md + agung-sambuko.md |
| `/team/[slug]` (15 individual profiles) | 15 | NOT GENERATED — route exists in jvto-web | wiki/people/crew-registry.md per-member section |
| `/tours/student-package/{slug}` (6 routes) | 6 | NOT GENERATED — route exists in jvto-web | wiki/products/packages-full-pricing.md §Student Packages |

### 2.2 Trust signals required per page section

| Page section | Claims to surface | Schema required |
|---|---|---|
| Homepage `/` | C1, C2, C3, C5, C6 | Organization/TravelAgency + AggregateRating |
| Tour pages `/tours/{slug}` | C2, C3, C4 (if Ijen), C6 | TouristTrip + FAQPage + BreadcrumbList |
| Destination pages `/destinations/{slug}` | C1 (Ijen: + C4), C3 | TouristAttraction + BreadcrumbList |
| Why JVTO pages | C1–C7 (section-specific) | Organization aggregateRating |
| Verify JVTO pages | C5, C8, C9 | Organization + identifier (NIB/TDUP) |
| Travel guide — Ijen health | C4 (conditional) | Article + FAQPage |

---

## Section 3: Business Logic Rules

*All conditional logic enforced across the website. Reference before writing or reviewing any page.*

### 3.1 Ijen Health Screening — Conditional Rule

**Trigger**: BBKSDA Surat Edaran SE.1658/KSA.9/2024.

The screening is **not JVTO-imposed**. It is regulatory. JVTO **coordinates** the workflow when access rules require it.

> **Canonical trigger sentence**: While BBKSDA SE.1658/KSA.9/2024 is in force, all Ijen-relevant packages trigger screening coordination. Wording must remain conditional because the regulation itself is conditional on crater state.

**When to apply**: Any content mentioning Ijen health certificate, health check, or medical screening.

**Approved conditional wording:**
- ✅ "Ijen access rules can require a recent local health certificate."
- ✅ "JVTO coordinates clinic workflow when access rules require it."
- ✅ "Health-certificate screening coordination for Ijen routes when current access rules require it."
- ✅ "Health-screening is required when crater conditions meet BBKSDA SE.1658/KSA.9/2024 threshold."
- ✅ "On routes that include Mount Ijen, JVTO integrates health screening as a practical safety step when BBKSDA rules apply."

**Forbidden wording** (per SSOT §2_4):
- ❌ "Mandatory health screening" (without conditional qualifier + BBKSDA reference)
- ❌ "Required by JVTO" (the rule is regulatory, not operator-imposed)
- ❌ "All Ijen guests must undergo health screening" (without the conditional)

**Ijen-relevant packages** (health screening conditional applies):
- Surabaya origin: `ijen-2d1n`, `ijen-bromo-madakaripura-3d2n`, `bromo-madakaripura-ijen-3d2n`, `ijen-papuma-tumpak-sewu-bromo-4d3n`, `ijen-bromo-madakaripura-4d3n`, `tumpak-sewu-bromo-ijen-4d3n`, `ijen-papuma-tumpak-sewu-bromo-5d4n`, `ijen-bromo-madakaripura-malang-5d4n`, `ijen-papuma-tumpak-sewu-bromo-malang-6d5n`
- Bali origin: `bali/bromo-ijen-3d2n`, `bali/ijen-bromo-madakaripura-3d2n`, `bali/ijen-papuma-tumpak-sewu-bromo-4d3n`, `bali/ijen-papuma-tumpak-sewu-bromo-5d4n`
- **Not Ijen-relevant (no health rule)**: `bromo-1d1n`, `bromo-2d1n` — Bromo does NOT have a health-certificate requirement.

**Failure rule**: If a guest is assessed unfit, the climb is cancelled for that individual (not the group). Screening cost is non-refundable. Source: dr-ahmad-irwandanu.md.

**Screening process** (when applicable):
1. Nurse/doctor visits guest hotel evening before hike (Bondowoso / Banyuwangi area)
2. Vitals recorded: SpO2, blood pressure, heart rate, respiratory history
3. QR-verified surat sehat issued by Dr. Ahmad Irwandanu SIP
4. Certificate presented at crater gate for BBKSDA QR verification
5. **No Valid QR Code = No Crater Zone Access**

---

### 3.2 Blue Fire — Conditional Language

**Trigger**: Any Ijen content mentioning blue fire or blue flames.

**Approved wording:**
- ✅ "Blue Fire is a natural phenomenon subject to weather and gas activity."
- ✅ "Blue fire visibility depends on gas activity and weather conditions — not guaranteed."

**Forbidden wording:**
- ❌ "Blue Fire guaranteed"
- ❌ "100% Blue Fire visible"

---

### 3.3 Cancellation & Travel Credit

> **Canonical wording**: JVTO does not issue cash refunds. ≥48h before Day 1 = 100% non-expiring Travel Credit. <48h = forfeited.

**48-hour cut-off** (local Indonesia time):
- ≥48h before Day 1 start: **100% of booking value converts to JVTO Travel Credit** — IDR-denominated, non-expiring, transferable with written confirmation.
- <48h before Day 1 start: **booking forfeited up to 100%**. Travel Credit and cash refunds are generally not provided.

**Force majeure** (volcanic activity, government closures, severe weather): JVTO may offer reasonable alternatives, Travel Credit for unused portion, or partial/full cash refund net of non-recoverable expenses.

**Ijen denied clearance**: If a guest is denied health clearance, affected components are non-refundable (costs are pre-committed).

**Amendment rule**: One free reschedule ≥48h before Day 1, subject to availability. Reschedules <48h not permitted.

**Approved wording:**
- ✅ "Cancel ≥48h before your tour date: your payment converts to non-expiring JVTO Travel Credit."
- ✅ "Cancel <48h: booking is forfeited. No Travel Credit."
- ✅ "JVTO does not issue cash refunds as a standard policy."

**Forbidden wording:**
- ❌ "Flexible cancellation available" (without the 48h threshold)
- ❌ "Full refund" (JVTO issues Travel Credit, not cash)

---

### 3.4 Ijen Monthly Closure (Rijik Program)

- **First Friday of every month**: TWA Kawah Ijen is closed **00:00–23:59 WIB** to ALL tourism and mining activities.
- **Purpose**: Ecosystem cleaning (100–150 kg waste removal from Paltuding to crater rim) + endemic Cemara Gunung tree planting.
- **Program established**: March 1, 2019.
- Additional closures may be issued by BBKSDA East Java based on volcanic conditions.
- JVTO schedules around the monthly closure — guests are not affected if booked through JVTO.
- For dynamic status: check `bbksdajatim.org`.

---

### 3.5 FOC (Free of Charge) Group Policy

| Paying pax threshold | FOC seats | Additional benefit |
|---|---|---|
| 18+ | 1 FOC | — |
| 35+ | 2 FOC | — |
| 50+ | 3 FOC | **+5% discount for entire group** |

- "Pax" = paying guests only (FOC seats not counted).
- The 5% discount at 50+ pax tier applies to the entire group total.
- Source: jvto-policy-pack-v6.md + operational-facts.md.

---

### 3.6 Vehicle & Crew Allocation (by group size)

| Group size | Vehicle | Crew |
|---|---|---|
| 2–3 guests | 1 × MPV (e.g., Toyota Avanza or similar) | 1 × driver-guide (English-speaking) + licensed local site guides |
| 4–9 guests | 1 × Toyota Hiace (or similar 16-seat minibus) | 1 × professional driver + 1 × escort guide + licensed local site guides |
| 10–11 guests | 1 × Toyota Hiace + 1 × MPV (seating + luggage) | 1 × professional driver + 1 × escort guide + licensed local site guides |

**Bromo jeep rule**: Private 4WD jeep — **max 4 guests per jeep** for comfort and safety. Multiple jeeps for larger groups.

---

### 3.7 Room Allocation

- **Standard**: 1 room per 2 guests (King or Twin bed)
- **Odd groups**: 1 room per 2 guests + 1 extra bed in one room
- **Max**: 2 guests per standard room (excluding designated extra bed)
- **Couple preference**: King bed on request
- **Non-couple sharing**: Twin beds on request

---

### 3.8 Police Escort — Approved Language

✅ "For large groups (typically around 18 guests or more), JVTO can coordinate an official traffic police escort on certain road segments, when approved by the relevant Traffic Police unit."

❌ "JVTO provides police escort" (without the conditional context and group size qualifier)

---

### 3.9 Booking Confirmation Rule

> **Canonical sentence**: Booking confirmed = (package selected) AND (payment ≥20% processed) AND (Official E-Voucher PDF issued). All three required.

A booking is confirmed ONLY when ALL three apply:
1. Package selected and pricing agreed
2. Required payment processed (minimum 20% deposit)
3. Official E-Voucher / Invoice (PDF) issued

Deposit rule: **20%** standard. If Day 1 is within 14 days: up to **100% full payment** may be required.

Balance payment deadlines:
- By card: no later than 5 days before Day 1
- By bank transfer / Wise: no later than 3 days before Day 1

---

### 3.10 Micro-Customization Policy

✅ Allowed:
- Twin vs double bed preference
- Hotel room category upgrade (may cost extra)
- Optional on-site activities (horse riding at Bromo, trolley ojek at Ijen)
- Dietary adjustment within operational limits

❌ Not offered:
- Unbundled / transport-only services
- Significant route changes that alter primary destination sequence

---

### 3.11 Solo-Pricing Rule

Solo (1-pax) is bookable only where a `1 (solo)` tier exists in `wiki/products/packages-full-pricing.md`. Packages without a 1-pax row are not bookable solo via standard pricing.

**Solo-bookable packages** (1-pax tier exists):
- Surabaya origin: `ijen-bromo-madakaripura-3d2n`, `bromo-madakaripura-ijen-3d2n`, `ijen-bromo-madakaripura-4d3n`, `ijen-papuma-tumpak-sewu-bromo-4d3n`, `tumpak-sewu-bromo-ijen-4d3n`, `ijen-papuma-tumpak-sewu-bromo-5d4n`
- Bali origin: `bali/ijen-bromo-madakaripura-3d2n`, `bali/ijen-papuma-tumpak-sewu-bromo-4d3n`
- Student: 4 of 6 packages have 1-pax tier

**Not solo-bookable** (no 1-pax tier in SSOT): `bromo-1d1n`, `bromo-2d1n`, `ijen-2d1n`, `ijen-bromo-madakaripura-malang-5d4n`, `ijen-papuma-tumpak-sewu-bromo-malang-6d5n`, `bali/bromo-ijen-3d2n`, `bali/ijen-papuma-tumpak-sewu-bromo-5d4n`, `taman-safari-prigen-bromo-madakaripura-3d2n`.

---

### 3.12 Tipping Rule

Tips and gratuities are an **explicit exclusion** per `jvto-policy-pack-v6.md` §Inclusions & Exclusions. Forbid "tips included" / "tipping covered" / "service charge included" wording on any page. Approved wording: "Tips and gratuities are excluded — guest discretion."

---

## Section 4: Approved / Forbidden Wording

*Normalized from brand-voice.md and SSOT §2_4 for direct implementation use.*

### 4.1 Forbidden Phrases (all content)

| Forbidden | Why | Approved alternative |
|---|---|---|
| "Blue Fire guaranteed" | Weather-dependent, cannot be promised | "Blue Fire is a natural phenomenon subject to weather and gas activity." |
| "100% Blue Fire visible" | Same | Same |
| "Mandatory health screening" (without conditional) | Regulatory, not JVTO-imposed | "Ijen access rules can require a recent local health certificate." |
| "Required by JVTO" (for health screening) | Wrong — BBKSDA rule | "JVTO coordinates clinic workflow when access rules require it." |
| "JVTO provides police escort" (unconditional) | Conditional on group size and approval | Approved police escort wording (§3.8) |
| "Flexible cancellation available" | Too vague — misleads on policy | State the 48h threshold explicitly |
| "Full refund" | Not cash — Travel Credit | "100% Travel Credit (non-expiring)" |
| "Rp 1.500.000" | Wrong format | "IDR 1,500,000/person" (commas, not dots) |
| "$120" / "EUR 150" | Wrong currency | IDR only for pricing |
| "World-class" / "best in class" | No citation | Cite specific evidence |
| "We care about your safety" | Show, don't say | Cite SPRIN, BBKSDA, HPWKI, Dr. Irwandanu |
| "Amazing experience" / "unforgettable journey" | Generic marketing | Evidence-led specifics |
| "Authentic Indonesia" | Vague | Specific destination facts |
| "Tips included" / "Tipping covered" | Tips are explicit exclusion per policy pack | "Tips and gratuities are excluded — guest discretion." |

### 4.2 Key Phrases (use often)

- "Tourist Police-led" / "Police-led" / "Active Tourist Police officer (Ditpamobvit East Java)"
- "100% private — no shared groups"
- "Licensed operator, NIB 1102230032918"
- "Health-screening coordination" (not "mandatory screening")
- "Verifiable credentials" / "checkable at [URL]"
- "Plan-B framework" (for weather/closure scenarios)
- "All-inclusive — no surprise local payments"
- "Read the Rulebook Before You Book"
- "Gas masks provided by JVTO"
- "Bromo 4WD jeep included"

### 4.3 Founder Naming Convention

| Context | Use |
|---|---|
| Legal / formal | Agung Sambuko |
| Guest-facing / operational | Mr. Sam |
| Press / police rank | Bripka Agung Sambuko |
| E-E-A-T schema `jobTitle` | "Active Tourist Police Officer, Ditpamobvit East Java" |

### 4.4 Price Format

- Format: `IDR X,XXX,XXX/person` (comma thousand separators, no dots)
- Currency: IDR only. Never USD, EUR, AUD.
- Suffix: `/person` always specified.

### 4.5 Content Register Guide

**Style A** (wiki, schema, FAQ, AEO, /verify-jvto): Dense, fact-led, citation-first. Example: "JVTO is led by Bripka Agung Sambuko, an active officer of the Indonesian Tourist Police (Ditpamobvit East Java). NIB 1102230032918 verifies operational legality."

**Style B** (homepage, Why JVTO, marketing): Founder-as-protagonist, "we" voice, concrete promises. Example: "Mr. Sam is a Tourist Police officer first, tour operator second. That order matters."

---

## Section 5: Schema Requirements per Page Type

*Full field specs in wiki/website/schema-templates.md. This table gives the key fields required per page.*

### 5.1 Page → Schema map

| URL pattern | Schema types | Key required fields |
|---|---|---|
| `/` | `TravelAgency` | name, logo, telephone, email, address, NIB identifier, aggregateRating (4.8/195), sameAs, areaServed: ID-JI |
| `/tours/{slug}` | `TouristTrip` + `FAQPage` + `BreadcrumbList` | duration (ISO 8601), provider, offers (IDR lowPrice/highPrice), aggregateRating (4.8/51) |
| `/destinations/{slug}` | `TouristAttraction` + `BreadcrumbList` | geo (lat/lon), description (≤200 chars from Entity Summary), isAccessibleForFree: false |
| `/travel-guide/{slug}` | `Article` + `FAQPage` (if applicable) | article headline, datePublished, author (Organization) |
| `/verify-jvto/*` | `Organization` with `identifier` | NIB 1102230032918, TDUP 1102230032918, HPWKI AHU-0001072.AH.01.07.TAHUN 2024 |

### 5.2 Schema verification checklist (run before saving any schema file)

- [ ] `reviewCount` on TouristTrip = `51` (Trustpilot only — never use cross-platform `195` on per-trip schema)
- [ ] `reviewCount` on Organization = `195` (cross-platform: 51+123+21)
- [ ] `ratingValue` = `4.8` (Trustpilot — never `4.9`, never `4.90`)
- [ ] `aggregateRating.bestRating` = `5`
- [ ] `aggregateRating.worstRating` = `1`
- [ ] NIB identifier = `1102230032918`
- [ ] No hardcoded prices — draw from packages-full-pricing.md
- [ ] No placeholder `ahu.go.id` URLs
- [ ] `areaServed` includes `ID-JI` on Organization schema
- [ ] `foundingDate` = `2016` (PT incorporation)

### 5.3 Destination geo-coordinates for TouristAttraction schema

| Destination | Lat (center) | Lon (center) | Official elevation |
|---|---|---|---|
| Kawah Ijen | -8.0635 | 114.2361 | 2,386 m |
| Mount Bromo | -7.9308 | 112.9581 | 2,329 m |
| Madakaripura Waterfall | -7.8490 | 113.0137 | ~100 m main drop (up to 200 m total) |
| Tumpak Sewu | -8.2310 | 112.9189 | ~120 m (multi-tiered) |
| Papuma Beach | -8.4299 | 113.5551 | 0 m (beach) / ~86 m (cape) |

---

## Section 6: Open Implementation Gaps

*Do not fix here — flag for owner action. Register as known debt.*

### GAP-01 — Google Maps review count drift (RESOLVED 2026-06-01)

- `output/website/HANDOFF.md`: was `Google Maps: 4.90 / 92 reviews` — **fixed to `4.9 / 123 reviews`**.
- `wiki/credentials/trust-signals.md §Schema Canonical Values`: was cross-platform total 164 (51+92+21) — **fixed to 195 (51+123+21, verified 2026-05-26 via API)**.
- `output/website/schema/homepage-organization-schema.json`: was `reviewCount: 164` — **regenerated to `reviewCount: 195`**.
- Receipt updated in `homepage-organization-schema.receipt.md`.
- **Status**: closed in-repo per source authority (trust-signals.md §Live Review Platforms).

### GAP-02 — IDR 3,350,000 price anomaly (RESOLVED 2026-06-01)

- `output/website/booking-platform-analysis.md` flagged IDR 3,350,000 displayed on self-checkout for an unspecified package.
- Per `packages-full-pricing.md`: `bali/bromo-ijen-3d2n` 6–7 pax tier = **IDR 3,350,000 exact canonical match**.
- **Status**: not an anomaly — canonical price. Closed per source authority.

### GAP-03 — Terms checkbox content (Instant Book Step 15)

- The self-checkout Terms checkbox must display JVTO Travel Credit policy text (≥48h = 100% Travel Credit; <48h forfeited).
- Current state: not confirmed whether the checkbox shows this policy or a generic placeholder.
- **Action**: Sam to audit the live checkout Terms checkbox text.

### GAP-04 — Health screening data collection missing from self-checkout

- The Instant Book self-checkout flow (Steps 1–18) has no health screening trigger.
- For Ijen-relevant packages, health screening must be coordinated pre-hike — currently handled post-booking via WhatsApp.
- This is acceptable operationally but the self-checkout UX should inform guests.
- **Action**: Add a health screening notice on the booking confirmation or in the Ijen package page copy.

### GAP-05 — Homepage H2 "92 Google Maps reviews" is stale

- The jvto-web homepage currently shows "92 on Google Maps" in an H2 or trust badge.
- Correct value: **123** (verified 2026-05-26 via API).
- **Action**: Fix in jvto-web (not a llm-wiki change).

### GAP-06 — `bromo-ijen-status-today` page blocked

- Silo 3 SEO target. Needs a live PVMBG/BBKSDA status source.
- MAGMA Indonesia feed not accessible via automated fetch.
- **Action**: Identify alternative source or implement manual update workflow.

### GAP-07 — Add-on "Transport to Medewi" not in authorized packages list (RESOLVED 2026-06-01)

- Self-checkout shows "Transport to Medewi" add-on upsell.
- Per source authority, `wiki/products/packages-overview.md` is canonical add-on list. Add-on is NOT listed.
- **Status**: unauthorized per canonical source. Decision = remove from live checkout, OR source-of-truth maintainer adds it to packages-overview. Closed in repo.

---

## Section 7: Trust Signal Matrix (C1–C9 × Page Section)

*Which claims to surface on which page sections. Minimize — one page doesn't need all 9.*

| Page section | Primary claims | Evidence to cite |
|---|---|---|
| Homepage hero | C3 (all-inclusive), C1 (police-led) | "No hidden costs" + "Tourist Police officer (Ditpamobvit)" |
| Homepage trust bar | C6 (reviews), C5 (verifiable) | "4.8★ Trustpilot (51 reviews)" + NIB link |
| Tour pages (inclusions section) | C3, C2 | Policy pack inclusions + "100% private" |
| Tour pages (Ijen-relevant: health) | C4 (conditional) | BBKSDA SE.1658/KSA.9/2024 + Dr. Irwandanu SIP |
| Tour pages (reviews) | C6 | Trustpilot 4.8/51 |
| /why-jvto | C1, C2, C3, C7 | Founder credentials, crew registry, policy pack |
| /verify-jvto | C5, C8, C9 | NIB/TDUP/HPWKI docs + press articles |
| Destination pages (Ijen) | C4, C1 | BBKSDA regulation + health screening protocol |
| Destination pages (Bromo/others) | C1, C3 | Plan-B framework + all-inclusive jeep |
| Travel guide (Ijen health) | C4 | Full screening protocol, Dr. Irwandanu STR URL |

---

## Verification Receipt

| Claim | Value used | SSOT source | Last verified | Drift risk |
|---|---|---|---|---|
| Trustpilot reviewCount | 51 | trust-signals.md §Live Review Platforms | 2026-05-18 | **High** |
| Trustpilot ratingValue | 4.8 | trust-signals.md §Schema Canonical Values | 2026-05-18 | Medium |
| Google Maps reviewCount | 123 | trust-signals.md §Live Review Platforms | 2026-05-26 | **High** |
| TripAdvisor reviewCount | 21 | trust-signals.md §Live Review Platforms | 2026-05-12 | Medium |
| Cross-platform total | 195 | calculated from above | 2026-05-26 | **High** |
| NIB | 1102230032918 | legal-licenses.md | — | None |
| HPWKI | AHU-0001072.AH.01.07.TAHUN 2024 | legal-licenses.md | — | Low |
| ISIC Provider | 259268 | legal-licenses.md | — | Low |
| Dr. Irwandanu STR | QN00001073380217 | dr-ahmad-irwandanu.md | — | Low |
| Bripka rank / unit | Ditpamobvit East Java | agung-sambuko.md | — | Low |
| BBKSDA regulation | SE.1658/KSA.9/2024 | dr-ahmad-irwandanu.md + kawah-ijen.md | — | Low |
| Cancellation threshold | 48 hours before Day 1 | jvto-policy-pack-v6.md | — | None |
| FOC thresholds | 18/35/50 pax | jvto-policy-pack-v6.md | — | None |

✅ GAP-01 closed 2026-06-01: `trust-signals.md §Schema Canonical Values` updated to `reviewCount = 195`. `HANDOFF.md` updated to `Google Maps: 4.9 / 123 reviews`. `homepage-organization-schema.json` regenerated. See §6 GAP-01 RESOLVED note.

⚠️ `reviewCount = 51` last verified 2026-05-18 (>14 days). Recommend live Trustpilot check before next schema regen.

⚠️ `reviewCount = 51` verified 2026-05-18 (>14 days ago). Recommend live check before regenerating schemas.

---

-> [[website/aeo-claims]] | -> [[website/brand-voice]] | -> [[website/faq-master]] | -> [[website/schema-templates]] | -> [[credentials/trust-signals]] | -> [[credentials/legal-licenses]] | -> [[products/packages-full-pricing]] | -> [[sources/jvto-policy-pack-v6]] | -> [[output/website/HANDOFF.md]]
