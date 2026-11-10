# StudyGOAT

StudyGOAT is a browser study application for students and working professionals. It includes lessons, questions, flashcards, games, mistake review and saved progress. The original CS 315 and CPSC 222 courses remain available.

## Run locally

1. Download or clone the complete repository.
2. Keep the `courses` folder beside `StudyGOAT.html`.
3. Open `StudyGOAT.html` in a modern browser and select a course.

No server, account or AI key is needed for built-in study. `index.html` redirects to the app on static hosting. Downloading the HTML file alone no longer includes the new tracks.

## Study program status

Updated November 10, 2026. All seven sourced tracks have partial coverage, not complete certification courses.

| Track | Lessons | Questions | Coverage |
| --- | ---: | ---: | --- |
| Security+ SY0-701 | 8 | 40 | Selected security foundations; incomplete domain coverage |
| FAA Part 107 | 5 | 26 | Selected regulations, operating limits and Remote ID |
| CAP Cadet Study | 12 | 52 | Selected Learn to Lead chapters 1-3; readings linked for all 16 |
| Wilderness First Aid | 4 | 20 | Provider-neutral safety and heat awareness |
| Amateur Radio Technician | 4 | 20 | Original rules primer; full official pool not imported |
| Arizona Driving Prep | 6 | 30 | Selected Arizona signs, signals, yielding and crossings |
| New Jersey Driving Prep | 6 | 24 | Selected NJ intersections, turns and school-bus situations |

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

November 10 expansion: six more CAP lessons and 24 questions, an all-16-chapter Learn to Lead reading/coverage navigator, New Jersey driving foundations (six lessons and 24 questions), and a 50-state plus DC availability directory. Totals: 45 lessons and 212 questions across seven partial sourced tracks.
