# FAA ACS inventory and chart review

Review date: November 13, 2026.

## Complete source inventory, partial teaching coverage

The FAA ACS endpoint returned FAA-S-ACS-10B, April 2021, effective April 6, 2021. Its 17 tasks contain 176 published knowledge codes when parent elements and lettered sub-elements are counted individually. All 176 are indexed with their source description and PDF page. The PDF has 35 pages; knowledge elements occur on PDF pages 8-25. UA.I.B.K23 continues at the page break; the printed footer 3 was explicitly excluded from its description.

The retained text extraction at courses/sources/FAA ACS 10B.txt preserves the source for completeness checks. PDF SHA-256: `9ee24463b40f023a3140d0c8a4d14ab295ede7a869fbacb7b7cd5ceb4caef431`.

Topic-level associations link 75 codes to selected related material and leave 101 as official reading only. None is labeled fully taught. Existing topic IDs, question IDs and bank content are preserved; existing FAA topics receive an additional acsCodes metadata field without replacing their original objective labels. The source inventory is not a validated full-exam blueprint or a flight skill evaluation.

## Chart sources and values

The FAA Chart Users' Guide landing page lists July 9, 2026 as the effective date. Its linked 56,002,392-byte PDF was checked for Class B/C/D/E depiction, vertical references, airports and obstructions. PDF SHA-256: `6d1bde94d5aee0d2a61e1c65e3061b262965d9b576d91d1f74e6faf681609e56`.

The FAA testing-supplement listing identifies FAA-CT-8080-2H (2018), effective June 11, 2018. The direct 176,480,343-byte FAA PDF has SHA-256 `738a0cd5c429e20888e94fd490d90ba09223ac4d350d06fe228788d4b502f4fd`. Figure 59 is PDF page 90, printed 2-56, a Toledo-area sectional excerpt. It was rendered directly as a 2000-pixel JPEG, without redrawing, and embedded once in the catalog for shared use by six original questions. Its byte fingerprint is stored in faaChartFigures.figure59.

Visible source values were inspected at higher resolution: Toledo Class C 47/SFC and 47/20; obstacle top 1848 MSL with height (1253) AGL; WOOD CO (1G0) airport elevation 673 MSL. The bank tests those published values and reference surfaces. These are historical test-chart facts, not current operational values. The FAA's not-to-scale/not-for-navigation warning is retained in the study caption. Enlarged and text-equivalent views support reading; no actual FAA examination questions are copied.

## Additional lesson review

Twelve lessons and 36 questions add chart interpretation, airspace symbols/vertical references, notices and special-use distinctions, airport information/listening, contingency planning, and fitness. FAA totals become 47 lessons and 182 questions.

Current eCFR Part 107 sections 107.17, .19, .21, .41, .43, .45, .47 and .49 were checked. The 2016 FAA study guide supplies enduring radio, airspace and human-performance principles, not superseding regulatory requirements. Rules are separated from chart reading: authorization is not inferred from a decoded symbol; an ATC authorization does not remove unrelated restrictions; emergency deviation under 107.21 is limited by necessity and has a written-report obligation upon FAA request. Aircraft-specific failure responses are deferred to actual instructions; listening is not permission to transmit on aviation frequencies.

## Validation and remaining scope

Content tests compare all 176 codes with the retained FAA source extraction, check source and image fingerprints, verify 17 task references and distinguish related lessons from reading-only entries. Browser tests cover exact-code and task search, availability filters, source-page links, lesson navigation, image decoding/enlargement, correct answer handling, mobile scrolling and standalone export. Existing original-bank and NCVEC/PDF checks continue.

Full ACS teaching coverage, additional chart/weather exercises, detailed Remote ID/category compliance, a validated exam blueprint and independent subject-matter review remain explicitly incomplete. Release PRs record checks, Pages verification and separate Wiki publication.
