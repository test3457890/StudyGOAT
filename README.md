# StudyGOAT

StudyGOAT is a browser study application for students and working professionals. It includes lessons, questions, flashcards, games, mistake review and saved progress. The original CS 315 and CPSC 222 courses remain available.

## Run locally

1. Download or clone the complete repository.
2. Keep the `courses` folder beside `StudyGOAT.html`.
3. Open `StudyGOAT.html` in a modern browser and select a course.

No server, account or AI key is needed for built-in study. `index.html` redirects to the app on static hosting. Downloading the HTML file alone no longer includes the new tracks.

## Study program status

Checked November 9, 2026. All six sourced tracks have partial coverage, not complete certification courses.

| Track | Lessons | Questions | Coverage |
| --- | ---: | ---: | --- |
| Security+ SY0-701 | 8 | 40 | Selected foundations in 1.2, 1.3 and 1.4 |
| FAA Part 107 | 5 | 26 | Selected regulations and operating limits |
| CAP cadet | 6 | 28 | Phase I Curry orientation |
| Wilderness First Aid | 4 | 20 | Provider-neutral safety introduction |
| Amateur Radio Technician | 4 | 20 | Original rules primer; NCVEC pool not imported |
| Arizona driving prep | 6 | 30 | Selected Arizona signs, signals, yielding and crossings |

Each new track includes source links, section/objective mappings, version notices, coverage gaps, glossary cards, worked scenarios and ten-question practice tests without duplicate questions. Timers are optional practice pacing. Raw scores do not reproduce official scoring or establish readiness.

Current CompTIA V7/V8 pages returned 403. The accessible SY0-701 objectives document is version 6.0; latest revision and exam availability require rechecking. No SY0-801 track is offered.

The corrected NCVEC pool and diagrams could not be retrieved directly. Technician study currently uses original rule questions, with no official-pool simulation. WFA is provider-neutral and excludes treatment algorithms, medication doses and evacuation thresholds pending provider and clinical review. CAP content uses public national pages and excludes controlled exams. StudyGOAT awards no credentials or official credit and has no affiliation with the named providers.

## Documentation

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

The [live Wiki](https://github.com/test3457890/StudyGOAT/wiki) now contains all 18 prepared Markdown pages, including five track guides, the sidebar and footer. The Wiki is a separate Git repository. Future documentation updates still need publication there.

The repository has no project license. No license was added.

November 9 expansion: 10 additional lessons and 40 original questions across phishing defenses, Remote ID, CAP Core Values, heat awareness and amateur transmission boundaries. All six sourced tracks remain partial.

November 9 driving and curriculum expansion: Arizona is the first state module, with six lessons and 30 original questions. Security+ adds backup and recovery preparation; CAP adds Learn to Lead chapter 2 active listening (objectives 41 to 44). Totals across six sourced tracks: 33 lessons and 164 questions. Other states remain planned.
