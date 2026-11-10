# Developer Guide

StudyGOAT is currently a browser-based application written primarily as a single HTML document with embedded CSS and JavaScript. The repository also contains a small static hosting entry point.

## Repository files

- `StudyGOAT.html`: main application, course data, study modes, styles, and optional AI integration code.
- `index.html`: redirects static website visitors to `StudyGOAT.html`.
- `README.md`: repository overview and setup notes.
- `.gitignore`: ignores local-only files.
- `docs/wiki/`: source documents prepared for the GitHub Wiki.

## Run locally

Clone or download the repository. Open `StudyGOAT.html` in a current web browser. No Node.js installation or package build is required for built-in study modes.

## How the application is organized

The source includes several content collections and helper functions:

- `COURSES`: built-in course definitions, including CS 315 and CPSC 222.
- `TOPICS`: study topic metadata and question generators.
- `LESSONS`: guided lessons and examples.
- `BANK` and `GLOSS`: questions and term-definition content.
- Study screens for learning, quizzes, exams, games, and review.
- `CUSTOM`: dynamically created course and topic data.
- Browser local storage for progress and relevant settings.
- Optional Claude environment and Gemini API integration paths.

The HTML includes an embedded StudyGOAT build specification. Read it before changing the data formats or course builder behavior.

## Adding or editing content

1. Create a branch.
2. Review the build specification inside the HTML file.
3. Change only the intended content or feature.
4. Check that generated questions have a clear, correct answer.
5. Run relevant examples and check for syntax errors.
6. Test study activities and settings in a browser.
7. Open a pull request describing the change.

## Important development considerations

- Keep API keys, tokens, and private records out of the repository.
- Do not add copyrighted exam dumps or restricted course materials.
- Keep the app readable, keyboard-friendly, and usable on smaller screens.
- Test generated answers and random question logic.
- Avoid promising that AI-generated content is always correct.
- The repository currently does not include a complete automated test or deployment pipeline.

## Deployment

For GitHub Pages, enable Settings > Pages, choose Deploy from a branch, and select `main` with `/(root)`. Deployment state should be confirmed in GitHub before advertising a live URL.

If you propose architecture changes, document the migration and how existing browser progress will be preserved.


## Sourced content model and adapter

`courses/catalog.json` is the authoring source. `courses/build.cjs` generates `catalog.js`, a classic script that works with both file URLs and static hosting. `courses/integration.js` adapts data to the existing COURSES, TOPICS, BANK, GLOSS and LESSONS objects. It reuses grading, timers, progress and mistake review. The existing `cs315trainer` and `sg_custom` keys are preserved.

Every topic, lesson and question has objective IDs and source/section pairs. The source register includes publisher, title, URL, version, effective date, check date, review deadline, rights and status. Unresolved sources are marked needs-review and cannot support a verified question. Glossary and topic notes inherit their topic references. Coverage is partial even where an objective is listed.

Run `node courses/build.cjs`, `npm test`, then `npm run test:browser`. Content checks validate ID uniqueness, four distinct answers, citation resolution, review dates, objective mapping and generated-data parity. They cannot prove subject-matter accuracy; review each answer against its cited section. Browser tests exercise original and new courses, grading, walkthrough completion, game access, source screens, duplicate-free tests, timeout, missed answers, persistence, keyboard entry and mobile width.

Current known limits: general source dates need recurring review; new tracks are introductory; no full official-pool exam is enabled; no provider-specific WFA protocols; no controlled CAP content. Current CompTIA availability is unconfirmed. A source failure blocks dependent content, not unrelated original courses.

To synchronize Wiki drafts after enabling and initializing the separate Wiki, use `node tools/sync-wiki.cjs` with authenticated Git access. The script only copies managed Markdown pages and verifies the remote commit after push. It does not create credentials or change repository settings.
