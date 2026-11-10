# StudyGOAT

StudyGOAT is a browser study application for students and working professionals. It includes lessons, questions, flashcards, games, mistake review and saved progress. The original CS 315 and CPSC 222 courses remain available.

## Run locally

1. Download or clone the complete repository.
2. Keep the `courses` folder beside `StudyGOAT.html`.
3. Open `StudyGOAT.html` in a modern browser and select a course.

No server, account or AI key is needed for built-in study. `index.html` redirects to the app on static hosting. Downloading the HTML file alone no longer includes the new tracks.

## Study program status

Updated November 10, 2026. All 12 sourced tracks have partial coverage. None is a complete certification or state permit course.

| Track | Lessons | Questions | Coverage |
| --- | ---: | ---: | --- |
| Security+ SY0-701 | 14 | 64 | Selected security foundations, assets, governance and incident response |
| FAA Part 107 | 19 | 82 | Selected regulations, Remote ID and METAR/TAF interpretation |
| CAP Cadet Study | 38 | 156 | Selected lessons and practice in all 16 Learn to Lead chapters |
| Wilderness First Aid | 4 | 20 | Provider-neutral safety and heat awareness |
| Amateur Radio Technician | 8 | 36 | Rules, Ohm’s law and radio-wave foundations; no full official pool |
| Arizona Driving Prep | 6 | 30 | Selected Arizona signs, signals, yielding and crossings |
| New Jersey Driving Prep | 6 | 24 | Selected NJ intersections, turns and school-bus situations |
| California Driving Prep | 4 | 16 | Selected California turns, merging and lane changes |
| New York Driving Prep | 4 | 16 | Selected New York signals, NYC exception and intersection conflicts |
| Texas Driving Prep | 4 | 16 | Selected Texas signal decisions and school-bus roadway exceptions |
| Florida Driving Prep | 4 | 16 | Selected Florida signal decisions and school-bus median exceptions |
| National Driving Foundations | 4 | 16 | Shared safety lessons accessible through all 50 states and DC; not state-specific permit prep |

Current sourced-content total: 12 tracks, 115 lessons and 492 original questions. The national driving course is one shared bank, counted once. Arizona, New Jersey, California, New York, Texas and Florida have partial state-specific courses; the other 44 states and DC still need their own manual-based lessons and questions. No program is complete.

Each new track includes source links, section/objective mappings, version notices, coverage gaps, glossary cards, worked scenarios and ten-question practice tests without duplicate questions. Timers are optional practice pacing. Raw scores do not reproduce official scoring or establish readiness.

Current CompTIA V7/V8 pages returned 403. The accessible SY0-701 objectives document is version 6.0; latest revision and exam availability require rechecking. No SY0-801 track is offered.

The corrected NCVEC pool and diagrams could not be retrieved directly. Technician study currently uses original rule questions, with no official-pool simulation. WFA is provider-neutral and excludes treatment algorithms, medication doses and evacuation thresholds pending provider and clinical review. CAP content uses public national pages and excludes controlled exams. StudyGOAT awards no credentials or official credit and has no affiliation with the named providers.

## Documentation

- [Detailed coverage checklist](docs/wiki/Coverage-Checklist.md)
- [Source register](docs/Source%20Register.md)
- [Coverage and development roadmap](docs/wiki/Roadmap.md)
- [Changelog](CHANGELOG.md)
- [Developer guide](docs/wiki/Developer-Guide.md)
- [Wiki source pages](docs/wiki)
- [Publication status](docs/Publication%20Status.md)

## Progress and optional AI

Existing progress keys are preserved. Progress saves in this browser's local storage. Clearing storage or changing browsers can remove or separate it. Use Settings backups before moving devices.

The original university and custom-course tools retain optional Gemini and Claude integrations. They require configuration and do not automatically work on GitHub Pages. Gemini keys are stored in local storage, not a secure vault. Never publish keys, private records, employer files or controlled test material.

The new built-in tracks use checked static content. Their navigation omits AI generation controls, and registration restores their sourced banks after custom-course updates so generated additions are not silently treated as verified.

## Development checks

```sh
npm install
npx playwright install chromium
npm test
npm run test:browser
```

Set `CHROMIUM_PATH` if using a system Chromium. To edit content, change `courses/catalog.json`, run `node courses/build.cjs`, and rerun checks. GitHub Actions runs the browser suite on Ubuntu 24.04.

## Hosting and Wiki

The [live StudyGOAT application](https://test3457890.github.io/StudyGOAT/StudyGOAT.html) was verified on November 9, 2026. GitHub Pages deploys from `main`, `/(root)`, with HTTPS.

The [live Wiki](https://github.com/test3457890/StudyGOAT/wiki) now contains the prepared study guides, roadmap, sidebar and footer. The Wiki is a separate Git repository. Future documentation updates still need publication there.

The repository has no project license. No license was added.

Earlier curriculum expansion, before the national driving foundation: selected lessons and original practice now exist in all 16 CAP Learn to Lead chapters, with chapter-specific quizzes. Added California and New York partial driving programs, Security+ governance/assets/incident response, Part 107 METAR/TAF exercises and Technician electronics/radio foundations. Totals: 103 lessons and 444 questions across nine partial sourced tracks.


November 10 achievement-map update: the app now lists all 16 achievements and five milestone awards, with national source links, leadership chapter practice, aerospace reading assignments and supervised-work reminders. This is a planning map, not a complete eligibility checklist or aerospace course. Achievement 16 is explicitly unresolved because the national page names chapter 14; no automatic chapter mapping is assigned. CAPR 60-1 reconciliation and full curriculum coverage remain open.


November 10 FAA expansion: 19 FAA lessons and 82 original questions now include loading/CG, density altitude, fixed-wing load factors and stalls, thunderstorms/wind hazards and PAVE risk decisions. Synthetic calculations identify their assumptions. The August 2016 FAA study guide is used only for selected enduring principles, not current regulatory authority. Full ACS coverage and independent review remain open. At that stage, totals were 103 lessons and 444 questions, before the shared national driving course was added.


Navigation update: the home screen now opens Classes, Certifications or Driving Tests. Classes and Certifications have course searches; Driving Tests has state-name/abbreviation search and distinguishes six partial courses from states offering only shared national foundations across all 50 states and DC. Built-in professor names have been removed. FAA study is specifically Part 107 drone remote pilot preparation; no crewed-aircraft pilot-license course is included.


CPSC 222 lecture update: added four topics and eight lessons on finite state machines, turnstile transition matrices, a binary suffix-01 DFA and Python/login-state design, with 32 original questions. The interactive FSM lab traces turnstile events and binary strings. Access through Classes > CPSC 222. Content summarizes the uploaded lecture; the slide deck and professor name are not published. Certification/driving counts are unchanged.


## National driving foundations for every state

All 50 states and DC now offer access to the shared national safety course: four lessons and 16 original questions on attention/distraction, speed, and seat-belt safety. This is one shared course, not 51 different state question banks. NHTSA sources support safety principles; they do not verify state laws or permit-test requirements. Overall sourced totals are now 115 lessons and 492 questions across 12 tracks, excluding the separate university content.

Arizona, New Jersey, California, New York, Texas and Florida retain their state-specific partial courses. The other states and DC still need their own manual reviews, laws, eligibility rules, lessons and questions. The directory labels these entries “national foundations only” and links to USAGov motor-vehicle services. No complete state course or readiness claim is made.

November 10 Texas and Florida batch: each adds four lessons and 16 original questions on selected signal and school-bus rules, checked against official state statutes. Six states now have partial state-specific study. Full manual review, licensing requirements, remaining topics and complete exam coverage are still pending. The shared national foundation remains one course counted once.
