# Technician explanation review

Release date: November 13, 2026.

The separate NCVEC study bank now has one original StudyGOAT explanation for every one of its 409 questions. Official prompts, answer letters, option order and the three embedded diagrams are unchanged. The explanations are stored in a separate ID-keyed registry, bound to the original imported-question SHA-256 fingerprint. They are not described as NCVEC-authored explanations or independently reviewed instruction.

## Source basis

- The retained revised NCVEC public-domain PDF, February 19, 2026 release, provides the question, choices, answer and group for every item. Its source and examiner-hosted mirror provenance are recorded in courses/catalog.json. The PDF is at courses/sources/NCVEC Technician 2026.pdf; npm run test:pool compares every official field against it.
- [47 CFR Part 97](https://www.ecfr.gov/current/title-47/chapter-I/subchapter-D/part-97), checked November 13, 2026, supplies regulatory context. Particular attention was given to sections 97.113, 97.115, 97.313 and 97.403: narrow compensation/content exceptions, third-party traffic, power restrictions and the immediate-safety provision when normal communication systems are unavailable. Broad emergency permission is not asserted.
- [OSHA electrical overview](https://www.osha.gov/electrical) and [ARRL RF exposure guidance](https://www.arrl.org/rf-exposure) were consulted to cross-check the distinction between low voltage and fault-current hazards, electrical injuries, non-ionizing RF, heating, and station exposure evaluation. Explanations link to the underlying NCVEC group rather than presenting these overview pages as detailed tower or service procedures.

## Review approach

All 409 explanation entries were written against their actual question and keyed answer. Items with an all-choices answer were compared with every listed choice. Diagram explanations were checked against the retained figure descriptions and labels. Worked examples show substitutions, units and results for conversions, decibels, DC power and Ohm's law. Approximate antenna lengths, customary frequencies and simplified battery runtime are identified as approximations or conventions rather than universal installation instructions.

Safety explanations preserve critical limits: charged capacitors remain hazardous after power-off; meter mode and connection matter; RF is non-ionizing but can heat or burn; power-line clearance must include the fall envelope; tower construction and electrical work require applicable codes and qualified procedures. The ten-foot answer is presented as the pool's value, with actual requirements potentially greater. A tuner is distinguished from improved antenna efficiency; low SWR is not presented as proof of efficient radiation. Packet-system ARQ is qualified by protocol/mode.

## Application and verification

Study mode displays the explanation only after an answer. Exam mode reveals no explanation until submission, then supplies one for each of the 35 selected questions. Group selectors now have descriptive subject labels. Standalone exports embed all explanations for offline use. Existing question IDs and saved progress remain compatible.

Content tests require exactly the 409 published IDs, unique nonempty explanation text, valid source sections, the original pool fingerprint and independently computed arithmetic results. Browser tests exercise every explanation through the study flow, check no premature explanation, verify all 35 explanations after exam submission and confirm offline export. The unchanged PDF comparison independently validates the official bank. GitHub Actions must pass before merge; publication evidence is recorded in the release PR.

The course now adds 70 group lessons to the earlier eight lessons, with 70 new concept checks and complete item-by-item walkthroughs for all 409 questions. The all-group teaching implementation remains subject to independent review. Explanation completeness refers to the 409-item question bank, not a complete hands-on amateur-radio curriculum or an instructor safety qualification.
