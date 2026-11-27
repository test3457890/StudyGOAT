# Content review and optional public reports

StudyGOAT is for learners in many courses. Content quality matters more than the number of questions. This is the review procedure for authored questions and generated exercises.

## Before a question is added

1. Record the course, topic, source title, edition or date, and a precise chapter, page or URL in the existing [Source Register](Source%20Register.md) or in the relevant course source record. If a course resource is private, record a non-public citation without copying the private file into this repository.
2. Independently solve each question, including every distractor. For multiple-answer questions, verify the whole answer set and explain why excluded options are wrong. For typed answers, list valid equivalent forms and define whether spacing, punctuation and order matter.
3. For diagrams, add a visible label, a keyboard accessible interaction where relevant, and a meaningful text description. Ensure the answer can be found from the description.
4. Review generated variants with an independent reference algorithm across many seeds. Keep a failing seed in a regression test and never infer the key from display order.
5. Add or update tests, then run `npm test` and `npm run test:browser`. Inspect the rendered question, feedback and screenshot at both desktop and phone widths. Record limitations in the handoff document.

The seeded traversal and insertion generators are checked against independent reference implementations for 200 seeds by `tests/algorithm-generators.cjs`. This does not replace expert review of every course explanation.

## How a learner can report a problem

In StudyGOAT, **Feedback** stores a private note and can download JSON to share intentionally. After a missed question, the learner can save a mistake reason. The exam review can flag an ambiguous answer. None of those notes is submitted automatically.

For an optional public report, open [New GitHub issue](https://github.com/test3457890/StudyGOAT/issues/new/choose). State the course, question or feature, what happened, what was expected and the source supporting the correction. Do not post names, student IDs, grades, personal progress backups, or private course documents. A learner may choose to share only a general description.

## Maintainer triage

1. Reproduce the reported item in the current main branch. If a generated item is involved, ask for the seed shown in the report or reproduce with a test.
2. Verify the answer against the cited course source or authoritative public reference. If the key is uncertain, mark it as needing review rather than claiming it is correct.
3. Correct the key, explanation, accepted equivalents or text alternative. Add a regression test for the mistaken case.
4. Update the relevant source note, changelog and AI handoff. Tell the reporter what was verified. Do not copy a student's private data into the repository.

## Deliberate limitations

An override of a written answer in the exam builder is a learner's **self-review**, not an instructor verified grade. Current general bank questions may lack item-level source metadata. Do not advertise a course as fully validated until the whole bank has been reviewed.
