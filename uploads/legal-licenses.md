---
type: credential
title: JVTO Legal Licenses & Verifiable Credentials
last_updated: 2026-05-26
sources: [ssot-v6, jvto-homepage-clip, ssot-image-asset-map, ijen-safety-protocol, jvto-verification-dossier]
owner: wiki-llm
stale_after_days: 60
---

# JVTO Legal Licenses & Verifiable Credentials

All credentials below are publicly verifiable. SHA-256 hashes of source documents are published in `public/llms.txt` on the JVTO website for forensic integrity checks.

## Business Registration (Indonesian regulatory)

| Credential | Number | Issued | Verifiable at |
|---|---|---|---|
| **Legal name** | PT Java Volcano Rendezvous | 2016-01-01 | AHU registry: https://ahu.go.id/pencarian/perseroan |
| **AHU** (Company Registry) | AHU-0023020 | — | https://ahu.go.id/pencarian/perseroan |
| **NIB** (Nomor Induk Berusaha) | 1102230032918 | — | oss.go.id (Online Single Submission) |
| **NIB (historical)** | 0220001393513 | — | *Possible legacy OSS record — not the canonical active license. Do not use in marketing copy.* |
| **TDUP** (Tanda Daftar Usaha Pariwisata) | 1102230032918 | 2023-02-11 | Dinas Pariwisata · Sistem Tanda Daftar OSS |

### KBLI codes (business activity classification)

| KBLI | Activity |
|---|---|
| **79121** | Travel Agency (Agen Perjalanan Wisata) |
| **79911** | Tour Operator (Penyelenggara Wisata) |
| **62019** | Other computer programming / IT services |
| **79120** | Travel agency activities (related) |
| **79921** | Tour guide activities (Pemanduan Wisata) |

## Tourism & Safety Credentials

| Credential | Identifier | Authority | Function |
|---|---|---|---|
| **HPWKI** | AHU-0001072.AH.01.07.TAHUN 2024 | State-Recognized association (AHU) | Himpunan Pelaku Wisata Khusus Ijen — Ijen specialist guide association. Membership = BBKSDA-supervised volcanic safety training |
| **POLPAR** | Founder is active Tourist Police officer (Ditpamobvit) | Indonesian National Police | Tourist Police affiliation — see [[people/agung-sambuko]] |
| **BBKSDA** | Operator clearance for Bromo Tengger Semeru National Park + Ijen | BBKSDA Jatim (https://bbksdajatim.org) | National-park operator authorization |
| **ISIC** | Provider ID 259268 | UNESCO-endorsed | Official ISIC provider — student-pricing eligibility via Alive Verify API |
| **INDECON** | Live member | NGO — Indonesian Ecotourism Network | Validates community-based tourism + Local Boys employment policy — https://www.indecon.id/spotlight-networks/java-volcano-tour-operator |

## Medical Credentials

| Credential | Identifier | Authority | Verification |
|---|---|---|---|
| **Dr. Ahmad Irwandanu SIP** | (on file, SHA-256 anchored) | Kemenkes RI · SatuSehat SDMK · KKI | STR: https://satusehat.kemkes.go.id/sdmk/nakes/QN00001073380217 · KKI: https://www.kki.go.id/cekdokter/form |

See [[people/dr-ahmad-irwandanu]] for screening protocol.

## SHA-256 Forensic Anchors

Hashes published in `public/llms.txt` on JVTO website (per [[sources/ssot-v6]] §3_1 + §12 trust_graph):

| Asset | SHA-256 |
|---|---|
| NIB 1102230032918 | `fa20dde31bb75e46b061ed14cc6d003f6960c02a9a82c20d8603b0cbf6f7b1b7` |
| TDUP 1102230032918 | `27252d512ddfa74de22a3e3ec10aa3dd40ef88da3eb57349fcd2137411551ee3` |
| HPWKI Approval | `ca1fb1a48b550a7748d400f165899f12a356e6941aacdde9c043427698aaf63b` |
| SPRIN POLPAR | `03c8578dc22956faa366d957badecfe38868d4760359cd8059fb2d6b145dfeab` |
| SPRIN WAL TRAVEL 2024-02-12 | `179b061eae558943fdccc51d2ea3c8233a704b61f03ca3d212433f3e8d6f3bd3` |
| Press — Detik.com 2021-03-14 | `b257b75b3d2b9edebf07c9af89a6c6aa9a4e01d6a716ef3f7c4ca75deda64b77` |
| Press — Radar Jember 2021-03-24 | `2a60eb168274004283b2b9939ccbf5982c12a7db854fda014308a2494ee2abf4` |

## Document Image Assets

Source: [[sources/ssot-image-asset-map]]. All documents have two published formats (PNG = full image copy, WebP = preview). Use on `verify-jvto/legal` and `verify-jvto/police-safety` pages.

| Document | PNG | WebP |
|---|---|---|
| NIB 1102230032918 | https://javavolcano-touroperator.com/legal/NIB-1102230032918-preview.png | https://javavolcano-touroperator.com/legal/NIB-1102230032918-preview.webp |
| TDUP 1102230032918 | https://javavolcano-touroperator.com/legal/TDUP-1102230032918-preview.png | https://javavolcano-touroperator.com/legal/TDUP-1102230032918-preview.webp |
| HPWKI approval letter | https://javavolcano-touroperator.com/legal/HPWKI-approval-preview.png | https://javavolcano-touroperator.com/legal/HPWKI-approval-preview.webp |
| SPRIN POLPAR (Tourist Police assignment) | https://javavolcano-touroperator.com/legal/SPRIN-POLPAR.png | https://javavolcano-touroperator.com/legal/SPRIN-POLPAR.webp |
| SPRIN WAL-TRAVEL 2024-02-12 (travel order) | https://javavolcano-touroperator.com/legal/SPRIN-WAL-TRAVEL-2024-02-12.png | https://javavolcano-touroperator.com/legal/SPRIN-WAL-TRAVEL-2024-02-12.webp |

Office photo: https://javavolcano-touroperator.com/legal/office-photo.jpg — used on homepage and why-jvto.

## Address Continuity (institutional anchor)

JVTO office (PT Java Volcano Rendezvous, 2016–present):
- Jl. Khairil Anwar No.102 A, Badean, Bondowoso, Jawa Timur 68214, Indonesia

**Pre-PT entity**: "Ijen Bondowoso Homestay" operated at this same address from at least 2015. The Booking.com Guest Review Award 2015 (9.4/10) was shipped to this address, confirming operational continuity. → [[sources/why-jvto-trust-architecture]]

> [stale?] Historical NIB 0220001393513 — mentioned in audit documents as a possible legacy OSS record. Verify on OSS portal whether this is a prior registration or an error before acting on it. Active NIB 1102230032918 is the canonical license.
- Google Maps CID: 1266403973589689021 → https://www.google.com/maps?cid=1266403973589689021

Booking.com 2015 award shipped to "Agung, Jl. Khairil Anwar No.102, Bondowoso" — same address line as today's PT office, demonstrating continuous operational presence at the same Bondowoso location across the guesthouse era → PT entity → TDUP formalization timeline.

## Trust Anchors

Owns claim **C5** (Proof-first trust — verification layer). Supports **C1** (safety-led operations), **C8** (Partners as context). See [[website/aeo-claims]] and [[sources/ssot-v6]] §12.

-> [[credentials/trust-signals]] | -> [[credentials/police-integration]] | -> [[credentials/medical-screening]] | -> [[people/agung-sambuko]] | -> [[people/dr-ahmad-irwandanu]] | -> [[website/aeo-claims]]
