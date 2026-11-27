# StudyGOAT product position and AI handoff

Last checked: 2026-11-26. This document describes implemented behavior and evidence, so another maintainer can continue without guessing from the UI. StudyGOAT is meant for other learners as well as its creator.

## Product promise

Browser based study by course: learn a concept, recall it without seeing the answer, check a clear explanation, review mistakes, and return on later days. Built-in course content does not require an AI key. Browser progress persists on the same origin; the Settings progress code supports transfer. Keep downloaded repository files together, or use the application's self-contained HTML export. Never describe either kind of local progress as an account sync unless a separately verified integration provides it.

## Current features

| Area | Implemented | Limitations / verification |
| --- | --- | --- |
| Course lessons | Walkthroughs with diagrams, goals, predict mode, notes, and optional read aloud | Read aloud depends on browser and device voices; lessons must be reviewed for factual accuracy |
| Recall | Flashcards, adaptive Learn, Recall Sprint (1/3/7/14 day intervals), due count on Today | Recall Sprint is self graded; the intervals are a simple rule, not a validated personalization algorithm |
| Practice | Course question banks, mixed quizzes, existing exam simulator, CPSC 315 practice, configurable Build Exam with multiple choice/select all/written questions | Build Exam uses existing course banks plus a small curated select all set; authored items allow listed equivalent forms; other written answers use strict matching and optional self-review, not automatic semantic grading |
| Games | Match and existing games; new Tree Traversal, Graph Explorer, Sorting Steps, and Audio Recall | Seeded BST, graph and insertion examples have labeled SVG or textual descriptions; still require human accessibility review |
| Feedback | Mistake reason and private note, question feedback in exam review, product feedback form with JSON export | Notes remain in local progress unless the user chooses to share a downloaded file; no inbox or moderation backend |
| Accessibility | Keyboard friendly controls for new games, visible status messages, speech options, mobile lesson layout | Run keyboard and screen reader checks before claiming full WCAG conformance |
| Data | Local browser progress, export/import, JSON backup/restore, self-contained HTML export | Hosted same-origin storage persists across browser sessions; private browsing, file URLs, data clearing or different devices require a backup. Do not publish learner results |\n| Wellness | Saved focus and break timer, in-page reminder, optional browser notifications, calendar file | Browser alerts need a supported open page and permission; calendar alerts require import and calendar support |

## Competitive map (official product descriptions)

| Product | Verified offering | StudyGOAT response |
| --- | --- | --- |
| Quizlet | Personalized Learn with written modes and audio options; Test and AI Practice Tests; Match; study with friends | Prioritize transparent answers, open local progress transfer, course-specific code and algorithms, and review that crosses days. Do not claim features or pricing parity. |
| Wayground (formerly Quizizz) | Self paced Practice, Accuracy, and Testing modes; flashcard review; live gamified modes | Offer meaningful review and assessment controls without confusing game points with learning; group sessions remain future work. |
| Kahoot! | Solo Flashcards and Learn modes with saved in-progress study | Keep solo review usable across sessions and build course-specific interaction rather than copying branding or UI. |
| Anki | Spaced repetition and FSRS scheduling | Treat Anki as a benchmark for durable scheduling; StudyGOAT's fixed intervals are much simpler. |

Sources: [Quizlet Learn](https://help.quizlet.com/hc/en-us/articles/360030986971-Studying-with-Learn), [Quizlet Practice Tests](https://help.quizlet.com/hc/en-us/articles/25946589648013-Studying-with-Practice-Tests), [Quizlet Study with friends](https://help.quizlet.com/hc/en-us/articles/48158602540685-Using-Study-with-friends), [Wayground session modes](https://help.wayground.com/support/solutions/articles/158000404919), [Kahoot self-study](https://support.kahoot.com/hc/en-us/articles/31566898896029-How-to-learn-and-practice-with-Kahoot-self-study-modes), [Anki manual](https://docs.ankiweb.net/deck-options.html#fsrs).

## What to build next

1. Extend reviewed generators to more topics and record reproducible failing seeds. The current tree, graph and insertion generators have independent checks across 200 seeds; add a real screen reader audit of their diagrams.
2. Continue item-by-item source review for every course bank; expand curated multi-answer questions, documented written equivalents and diagram text. Only use partial credit when a specific grading policy is approved.
3. Review the actual user feedback JSON and course mistake reasons; prioritize repeat confusion before introducing new game mechanics. Offer a safe way for learners to share issue reports without exposing all of their progress.
4. Expand accessibility: run Firefox, Chrome, Edge and Safari plus keyboard and screen reader audits; verify notifications and speech across browsers and operating systems.
5. Consider optional study group sessions only after privacy defaults, consent to share progress, moderation, and account infrastructure are designed. No public leaderboard should expose student performance by default.

## Persistence and reminder contract\n\nThe hosted HTTPS page is the recommended path for automatic browser storage. The same browser and origin retain results across restarts unless the user clears site data or browses privately. A raw local `file:` URL can have undefined storage behavior; the [download guide](Download%20and%20Study%20Guide.md) gives a stable localhost option. The JSON backup/restore in Settings is an explicit replacement of current progress, verified by reading storage after import. Each generated game saves its seed and next question position; completed scores and delayed self-graded card results live in `S`.\n\nThe wellness page checks saved timer deadlines on reload. Browser notifications and daily time checks require an open page and permission where supported. The optional .ics file is imported by the learner into a calendar for reminders beyond the page lifetime. No background push service exists.\n\nThe [content review process](Content%20Review%20and%20Reporting.md) and GitHub issue templates make reporting optional. In-app notes remain private until a learner exports or separately posts a report; do not imply that maintainers automatically receive them.\n\n## For future AI development sessions

1. Read this document, [Study Strategy Roadmap](Study%20Strategy%20Roadmap.md), README, and current repository code. Recheck GitHub main because branches and course content can change.
2. Respect the existing adapter: `StudyGOAT.html` loads `courses/catalog.js`, `courses/integration.js`, then dynamic add-ons. `getPristine()` in the adapter embeds add-on functions into the single-file download. A new add-on must be included in both paths.
3. Progress is in `S` and saved through `save()`. Use namespaced keys and avoid changing existing answers, card IDs, or progress schema without migration. Check imports and exports.
4. Keep answer keys and explanations verifiable. Preserve correct choice order in source banks, shuffle only at presentation, and test saved exam resumption, skipped questions, strict multi-answer grading, and repeated results. Never claim instructor approval or predict exam questions.
5. Run `npm test`, `npm run test:browser`, and `npm run screenshots:study` in a browser-capable environment. Inspect generated screenshots; the screenshot workflow commits only when it can capture the running app. If capture fails, say so and leave old images intact.
6. Review any feedback notes the user chooses to provide. Notes are private in a browser unless exported; do not assume you can read them from GitHub.

## Evidence and open risks

- Practice testing and distributed practice have strong evidence across many contexts: [Dunlosky et al. review](https://www.psychologicalscience.org/journals/pspi/1529100612453266/).
- Browser speech synthesis exposes voices, rate, pause and stop, but voice availability varies: [MDN Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API).
- New UI code uses existing globals and dynamic script order. A Node smoke check exercises state transitions, but the CI browser suite verifies hosted app behavior in Chromium; separate Firefox, Edge, Safari and assistive technology checks remain open.
