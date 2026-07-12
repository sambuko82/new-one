---
type: website
title: JVTO Website Booking Flow Analysis
last_updated: 2026-05-31
sources: [tango-workflow-jvto-website-booking, faq-master, packages-overview]
creator: Agung Sambuko
owner: wiki-llm
stale_after_days: 60
---

# JVTO Website Booking Flow Analysis

**Tango workflow reference**: JVTO Website Self-Checkout Flow — 18 steps across 4 PDF pages, created by Agung Sambuko 2026-05-31
**Source**: R065 → [[sources/tango-workflow-jvto-website-booking]]
**Price point captured**: IDR 3,350,000 (likely 2 pax, `ijen-bromo-madakaripura-3d2n`)

**Key framing**: This is the **Instant Book / self-checkout** path on javavolcano-touroperator.com — parallel to, not replacing, the WhatsApp-assisted booking flow in [[products/packages-overview]] §booking-flow.

---

## Workflow Summary (18 Steps)

### Phase 1: Package Discovery & Selection (Steps 1–6)

| Step | Action | Wiki Parallel | Notes |
|------|--------|---------------|-------|
| 1 | Package listing page — origin/difficulty/type filters | [[products/packages-overview]] | Origin selector, difficulty filter (moderate = Ijen + Bromo routes) |
| 2 | "Private Expedition" label | 100% private guarantee | JVTO private-only guarantee surfaced in listing |
| 3 | Select package | [[products/packages-overview]] package catalog | Implied: `ijen-bromo-madakaripura-3d2n` |
| 4 | Type "2026-06-25" (date) | Booking inquiry → package confirmation | Date of Day 1 |
| 5 | Click "1 Travelers" | Pax tier selector | Solo pricing tier |
| 6 | Click "DONE" | Summary screen | Confirms package, date, pax → price quote shown |

**Price captured**: IDR 3,350,000. Needs reconciliation against SSOT (IDR 3,570,000 for 2 pax or IDR 6,300,000 solo).

---

### Phase 2: Instant Book & Add-Ons (Steps 7–10)

| Step | Action | Wiki Parallel | Notes |
|------|--------|---------------|-------|
| 7 | Click "INSTANT BOOK" | JVTO website self-checkout | Triggers checkout — skips WhatsApp inquiry path |
| 8 | "Enhance Your Trip…" modal | Upsell / optional add-ons | JVTO website offers extras at checkout |
| 9 | Check "Transport to Medewi…" | Optional add-on | Medewi = Bali coastal town; JVTO Bali extension option |
| 10 | Click "CONTINUE" | Advance to checkout | Confirms selected add-ons |

**Note**: Step 7 "INSTANT BOOK" is the distinguishing trigger of the self-checkout path. Guests using WhatsApp inquiry never hit this button.

---

### Phase 3: Trip Configuration & Auth (Steps 11–13)

| Step | Action | Wiki Parallel | Notes |
|------|--------|---------------|-------|
| 11 | Click "TRIP CONFIGURATION…" | Special requests / dietary / mobility needs | Guest inputs pre-trip requirements |
| 12 | Click "Google" | Google sign-in (auth shortcut) | Guest logs in via Google to autofill contact details |
| 13 | Click "REVIEW & PAY →" | [[products/packages-overview]] step 4 (payment) | Summary + total before charging |

---

### Phase 4: Terms & Payment (Steps 14–16)

| Step | Action | Wiki Parallel | Notes |
|------|--------|---------------|-------|
| 14 | Click "REVIEW & PAYMENT…" | Payment details entry | Card entry, billing address |
| 15 | Check "I agree to Terms & Conditions and Cancellation Policy" | JVTO Travel Credit policy | **CRITICAL**: Terms text must display JVTO Travel Credit (100% credit ≥48h, forfeited <48h) — verify UI text matches [[website/faq-master]] Q17 |
| 16 | Click "PAY IDR 3.350.000" | Deposit charged (20% or full per close-dep rule) | Price anomaly: see §Critical Gaps |

---

### Phase 5: Post-Payment & Order Summary (Steps 17–18)

| Step | Action | Wiki Parallel | Notes |
|------|--------|---------------|-------|
| 17 | Click "🇮🇩…" (currency/country) | Indonesia IDR billing region | Confirms IDR as billing currency |
| 18 | Click "Order Summary…" | E-Voucher issuance | Final confirmation; e-voucher emailed + WhatsApp handoff triggered |

**Expected outcome**: E-Voucher emailed + WhatsApp contact to +62 822 4478 8833 for pick-up + itinerary confirmation.

---

## Key Correlations & Gaps

### Flow Alignment ✓

- **Package selection** (Steps 1–6) → dates, origin, group size confirmed before payment
- **Payment** (Step 16) → deposit via secure JVTO checkout
- **Terms acceptance** (Step 15) → JVTO policy checkbox (must show Travel Credit terms)
- **E-Voucher** (Step 18) → full trip details + pre-trip guide

### Critical Gaps ⚠

1. **Terms Checkbox Content** (Step 15)
   - **Required**: Display JVTO Travel Credit (Q17: 100% credit ≥48h notice, forfeited <48h)
   - **Risk**: If boilerplate or outdated text shown, guest has wrong cancellation expectations
   - **Action**: UI audit — verify exact text of Terms & Cancellation Policy shown at Step 15

2. **Price Anomaly** (Step 16)
   - **Displayed**: IDR 3,350,000
   - **SSOT reference**: IDR 3,570,000 (2 pax) or IDR 6,300,000 (solo) for `ijen-bromo-madakaripura-3d2n`
   - **Action**: Sam to verify pricing — promotional discount, commission adjustment, or different pax tier?

3. **Add-On Alignment** (Step 9: Medewi transport)
   - Not in [[products/packages-overview]] §inclusions / §exclusions
   - **Action**: Audit JVTO website checkout upsells against authorised add-ons list; update packages-overview

4. **Health Screening Missing** (Ijen routes)
   - BBKSDA-required for all Ijen routes ([[website/faq-master]] Q6, [[destinations/kawah-ijen]])
   - Self-checkout flow has no health screening step — presumably collected post-booking via WhatsApp
   - **Action**: Confirm health screening trigger: Is it a post-booking automated WA message? Is pre-screening data collected anywhere in this flow?

5. **packages-overview §booking-flow Stale** (structural)
   - Current page describes 6-step WA-assisted flow ("Inquiry via WhatsApp" as Step 1)
   - Self-checkout / Instant Book path exists and is not documented
   - **Action**: Add "Instant Book path" to [[products/packages-overview]] §booking-flow alongside WA-assisted path

---

## Owner Tasks

**For Sam** (Agung Sambuko):
- [ ] Verify IDR 3,350,000 price — what pax tier/discount applies?
- [ ] Confirm Terms & Conditions text at Step 15 shows JVTO Travel Credit policy
- [ ] Audit JVTO website checkout upsells (Medewi transport + any others) vs authorised add-ons
- [ ] Confirm health screening data collection method for Instant Book Ijen routes
- [ ] Test full e2e flow (Instant Book → e-voucher → WhatsApp handoff → pick-up confirmation)
- [ ] Update [[products/packages-overview]] §booking-flow to include Instant Book path

---

### Trust Anchors

-> [[website/faq-master]] (Q15: booking flow, Q16: payments, Q17: Travel Credit/cancellation) | -> [[products/packages-overview]] (booking-flow, payment-rules, inclusions) | -> [[destinations/kawah-ijen]] (health-screening requirement) | -> [[people/dr-ahmad-irwandanu]] (screening protocol) | -> [[sources/tango-workflow-jvto-website-booking]] (source PDF, R065)
