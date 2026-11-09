# StudyGOAT

StudyGOAT is a browser-based learning and exam preparation platform for students, working professionals, and certification candidates. It combines lessons, practice questions, flashcards, study games, and progress tracking. Built-in content includes two university courses and a partial Security+ SY0-701 foundation track. Other subjects and certification topics can be supported through custom course creation with an optional AI connection.

## Who it is for

- Students preparing for classes, assignments, and exams.
- Working professionals learning technical or business subjects.
- Certification candidates organizing study topics against official objectives.
- Educators and contributors improving accessible study experiences.

StudyGOAT is an independent study companion, not an official certification provider or an exam-pass guarantee.

## Project documentation

A full set of [GitHub Wiki source pages](docs/wiki/README.md) is available in [docs/wiki](docs/wiki). The files must be published to the separate GitHub Wiki before they appear under the repository Wiki tab.

## Run the program

1. Download or clone this repository.
2. Open `StudyGOAT.html` in a modern web browser.
3. Choose a course or a study activity.

Keep the `courses` folder beside the HTML file. No package manager or server is needed to study. Node.js and Playwright are development-only test tools.

## Files

- `StudyGOAT.html`: the complete StudyGOAT application, preserved from the original uploaded file.
- `index.html`: a simple entry page that redirects to `StudyGOAT.html` for static hosting.
- `README.md`: setup and project information.
- `.gitignore`: ignores common local-only files.

## Optional AI functions

The application includes optional AI tutoring and class-material building capabilities. These depend on a supported AI provider and settings. When StudyGOAT is opened as an ordinary HTML file or hosted on GitHub Pages, the Claude artifact integration and artifact database are not available. Some AI functions may instead use a user-provided Gemini API key if configured within the app. Review any provider's cost and key-handling guidance before enabling those features.

Built-in lessons, questions, and supported local study activities do not require a GitHub account or AI provider.

## Saving progress

Local progress is stored by the app in your browser's local storage. Clearing browser data, switching browsers or devices, or using private browsing may remove or separate your local progress. Claude artifact cloud features are environment-specific and are not supplied by GitHub Pages.

## Host using GitHub Pages (optional)

This repository is public. To make StudyGOAT available as a website:

1. Open [Settings > Pages](https://github.com/test3457890/StudyGOAT/settings/pages).
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select branch **main** and folder **/(root)**.
4. Click **Save**.

Once GitHub Pages finishes deploying, visit **https://test3457890.github.io/StudyGOAT/**. The `index.html` file redirects visitors to `StudyGOAT.html`.

A public repository makes source code visible, but it does not automatically publish a GitHub Pages website.

## Notes

- Existing university courses and local progress keys are preserved.
- Do not commit API keys, account credentials, classmate documents, or personal data to the repository.
- This repository does not include a license, so no reuse license is granted by default.

## Study program status (2026-11-09)

Security+ SY0-701 has four introductory lessons and 24 original source-linked questions for parts of objectives 1.2, 1.3 and 1.4. This is partial coverage, not a complete preparation course. The accessible objectives document is version 6.0; current exam availability and the latest revision could not be checked directly because CompTIA version pages returned 403. SY0-801 is not offered by this app.

See [source register](docs/Source%20Register.md) and [roadmap](docs/wiki/Roadmap.md). FAA Part 107, CAP cadet study, WFA and Technician development follows in that order.

Tests: `npm install`, `npx playwright install chromium`, `npm test`, `npm run test:browser`.

GitHub Pages returned HTTP 404 on the check date. The Wiki URL redirected to the repository and the separate Wiki clone requested authentication. Wiki publication is not confirmed.
