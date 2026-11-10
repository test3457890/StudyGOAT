# StudyGOAT

StudyGOAT is a browser study application for students and working professionals. It includes lessons, questions, flashcards, games, mistake review and saved progress. The original CS 315 and CPSC 222 courses remain available.

## Run locally

1. Download or clone the complete repository.
2. Keep the `courses` folder beside `StudyGOAT.html`.
3. Open `StudyGOAT.html` in a modern browser and select a course.

No server, account or AI key is needed for built-in study. `index.html` redirects to the app on static hosting. Downloading the HTML file alone no longer includes the new tracks.

## Study program status

Checked November 9, 2026. All five new tracks are partial introductory slices, not complete certification courses.

| Track | Lessons | Questions | Coverage |
| --- | ---: | ---: | --- |
| Security+ SY0-701 | 4 | 24 | Selected foundations in 1.2, 1.3 and 1.4 |
| FAA Part 107 | 3 | 18 | Selected regulations and operating limits |
| CAP cadet | 2 | 12 | Phase I Curry orientation |
| Wilderness First Aid | 2 | 12 | Provider-neutral safety introduction |
| Amateur Radio Technician | 2 | 12 | Original rules primer; NCVEC pool not imported |

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

GitHub Pages returned 404 on November 9, 2026. To enable it, use repository Settings > Pages, select Deploy from a branch, `main`, and `/(root)`. The expected address is https://test3457890.github.io/StudyGOAT/; it is not confirmed live.

The Wiki URL redirects to the repository. Its separate Git clone cannot be accessed, and the available browser is signed out. Updated `docs/wiki` files are source drafts, not a published Wiki. See publication status for the remaining steps.

The repository has no project license. No license was added.
