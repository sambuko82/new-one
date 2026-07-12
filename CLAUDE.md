# JVTO Website — Build & Edit Guardrails

> Auto-injected into every conversation in this project. These are **hard gates**, not
> suggestions. Every number, name, date, price, and address below is a **canonical value**:
> copy it **verbatim**. Never paraphrase a fact, never re-type a figure from memory, never
> invent a fact to fill a gap. If a needed fact is not in the canonical tables or the
> `uploads/` knowledge base, **leave a placeholder and ask** — do not guess.
>
> Source of truth: the `uploads/*.md` dossiers (SSOT v6). On any conflict, the dossier wins
> over existing page copy. This file is a distilled lock of the values most often got wrong.

---

## 1. Canonical Facts Lock — copy these verbatim

| Field | Canonical value | Common wrong value (do NOT use) |
|---|---|---|
| Legal entity | PT Java Volcano Rendezvous | — |
| Brand / short | Java Volcano Tour Operator · JVTO | — |
| NIB | 1102230032918 | legacy `0220001393513` (never in copy) |
| TDUP | 1102230032918 · issued **2023-02-11** | — |
| AHU (company registry) | AHU-0023020 | — |
| Incorporated | **2016** (2016-01-01) | ~~2020~~ |
| Guesthouse era | 2015 (Ijen Bondowoso Homestay, Booking.com 9.4/10) | — |
| HQ address | **Jl. Khairil Anwar No.102 A, Badean, Bondowoso, Jawa Timur 68214** | ~~Banyuwangi, East Java, Indonesia~~ |
| Phone | +62 822 4478 8833 (`+6282244788833`) | — |
| Email | hello@javavolcano-touroperator.com | — |
| Founder | Agung "Mr. Sam" Sambuko · press rank **Bripka Agung Sambuko** | — |
| Founder unit | **Ditpamobvit** (Directorate of Vital Object Security), East Java | generic "POLRI Tourist Police" |
| Founder jobTitle (schema) | "Active Tourist Police Officer, Ditpamobvit East Java" | ~~"Founder"~~ / ~~"Tour Operator"~~ |
| Physician | **Dr. Ahmad Irwandanu**, SIP · STR **QN00001073380217** (Kemenkes/KKI) | unnamed "clinic doctor" |
| HPWKI | AHU-0001072.AH.01.07.TAHUN 2024 | — |
| ISIC provider | 259268 | — |
| Ijen health rule | **BBKSDA SE.1658/KSA.9/2024** (conditional) | — |
| Crew | 14 (7 guides + 7 drivers) · 11 KTA · 5 HPWKI-KTA guides | — |
| Deposit | **20%** (card via secure link); ≤14 days out → up to 100% | ~~30%~~ |
| Balance due | card **≤5 days** before Day 1 · wire/Wise **≤3 days** before | ~~"at pickup"~~ ; no PayPal |
| Cancellation | ≥48h → 100% **Lifetime Travel Credit** (no expiry, transferable); <48h → forfeited | cash refund / "deposit minus 5%" |
| Police escort | qualifying size **≈18 guests or more** · Traffic Police (Ditlantas) · **approval not guaranteed** | ~~"groups of 6+"~~ ; not a default inclusion |
| FOC | 18→1 free · 35→2 · 50→3 + 5% group discount | — |
| Stefan Loose | 4th ed., **2018**, ISBN 978-3-7701-7881-0, **p.287** | — |
| Heights | Kawah Ijen 2,386 m · Mount Bromo 2,329 m | — |

### Reviews (single source — see `uploads/trust-signals.md` §Schema Canonical Values)

| Platform | Rating | Count |
|---|---|---|
| Trustpilot (schema primary) | **4.8 / 5** | **51** |
| Google Maps | **4.9 / 5** | **123** |
| TripAdvisor | **4.95 / 5** | **21** |
| **Cross-platform total** | 4.8 (conservative) | **195** |

Schema: Organization `reviewCount` = **195**, ratingValue **4.8**. TouristTrip `reviewCount` = **51**.
**Stale values that must never appear:** 112 reviews, 4.9/112, 47 reviews, 92 Google, "5.0/5".

### Verified press (the ONLY press that exists — see `uploads/press-coverage.md`)
Detik.com 2021-03-14 · Radar Jember 2021-03-24 · Radar Jember 2021-05-27 · BBKSDA Jatim 2024-05-24 · Stefan Loose guidebook · Booking.com 2015 award.
**Never invent press** (no "Trip.com", "Travel + Leisure SEA", "Detik Travel Ijen logistics", Condé Nast, Aman).

### Do-not-invent list (facts that were hallucinated before)
Health-certificate "14-day validity" · clinic "MoU" framing · "Banyuwangi clinic, 15 min" · PayPal · under-12 sulfur ban · "USD/cash preferred in the field".

---

## 2. Voice invariants — forbidden → approved (from `uploads/brand-voice.md`)

| ❌ Never write | ✅ Write instead |
|---|---|
| "Blue Fire guaranteed" / "100% Blue Fire visible" | "Blue Fire is a natural phenomenon subject to weather and gas activity." |
| "Mandatory health screening" / "required for all guests" / "must hold a valid clearance" / "Required by JVTO" | "Ijen access rules can require a recent local health certificate." / "JVTO coordinates clinic workflow when access rules require it." |
| "JVTO provides police escort" (unconditional) | "For large groups (≈18+), JVTO can coordinate an official traffic police escort … when approved by the relevant Traffic Police unit." |
| "Full refund" / cash refund | "100% Lifetime Travel Credit (non-expiring, transferable)" |
| "$120" / "EUR 150" / "Rp 1.500.000" | **IDR only**, comma thousands, per person: `IDR 1,550,000/person` |
| "World-class" / "best in class" / "we care about your safety" / "trust us" | Cite the evidence: SPRIN, BBKSDA, HPWKI, NIB, Dr. Irwandanu |

**Register:** dossier/FAQ/schema/verify = Style A (dense, fact-led). Homepage/Why-JVTO/Our-Story = Style B (founder-as-protagonist, "we", but still fact-anchored).
**Founder naming:** legal → Agung Sambuko · guest-facing → Mr. Sam · press/police → Bripka Agung Sambuko.

---

## 3. Per-page required elements

- **Every footer / contact block** → canonical HQ address (§1).
- **Any review figure anywhere** → must match the Reviews table (§1) exactly.
- **Any Ijen health mention** → conditional wording + cite BBKSDA SE.1658/KSA.9/2024. On the health-screening page also name Dr. Ahmad Irwandanu + STR link + the QR-gate rule + the four-step protocol.
- **Police escort copy** → ≈18-guest threshold + "approval not guaranteed" + Ditlantas (escort) is distinct from Ditpamobvit (founder's unit).
- **Booking / tour pricing** → 20% deposit, Travel-Credit cancellation, IDR-only prices.
- **JSON-LD per `uploads/schema-templates.md`:** Homepage = `TravelAgency`; tours = `TouristTrip` + `FAQPage` + `AggregateRating` + `BreadcrumbList`; destinations = `TouristAttraction` + `BreadcrumbList`; travel-guide = `Article`/`MedicalWebPage` (+ `FAQPage`); verify = `Organization` with `identifier`. Add `areaServed` ID-JI to Organization. Draw every numeric from §1 — never hardcode from memory.

---

## 4. Pre-delivery validation — run before `done`

Grep the project for these drift patterns; **every hit is a bug** unless it's inside `uploads/` (the dossiers legitimately quote the forbidden strings as examples):

```
Banyuwangi, East Java,<br />Indonesia      # footer drift
112\+|4\.9 / 5 · 92|47 reviews|5\.0 / 5     # stale review counts
incorporated 2020|Issued.{0,4}2020          # wrong founding year
[Mm]andatory health|must hold a valid|required for all .{0,8}guests
[Bb]lue [Ff]ire guaranteed|100% [Bb]lue
\$\d|EUR \d|Rp \d                            # non-IDR / wrong price format
30% deposit|balance.{0,12}at pickup         # wrong booking terms
[Gg]roups of 6|6\+ travel                    # wrong escort threshold
Trip\.com|Travel \+ Leisure                  # invented press
```

Then confirm each new `<script type="application/ld+json">` block `JSON.parse`s and its numbers match §1.

---

## 5. Build conventions
- Shared chrome lives in `_parts/chrome.json`; fixing a fact there prevents future drift.
- Reuse the design system in `jvto-system.css` (`data-box`, `proof-grid`, `timeline`, `cred-table`, accordion). Don't invent new visual languages.
- Canonical HTML (close every tag, double-quote attrs) so direct-edit works.
