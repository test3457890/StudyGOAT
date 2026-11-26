# StudyGOAT study strategy and product roadmap

StudyGOAT already includes lessons, flashcards, mixed quizzes, a mastery based Learn mode, Match, exam preparation, and saved browser progress. The next work should improve recall, feedback, and retention before adding more arcade games. A higher score during a single session is not the same as durable learning.

## Added in this update

- Walkthroughs show a clear title, goal, step counter, accessible progress, and a read aloud control beside the current step.
- Read aloud also works for practice questions, Learn prompts, and visible flashcard faces. Playback starts only on request; pause, stop, voice (when available), and speed controls are provided. The selected speed and voice travel with exported progress.
- Recall Sprint asks for an answer before revealing it. Learners self grade honestly. Remembered cards return after 1, 3, 7, then 14 days; missed cards become due immediately. Progress is saved in the existing browser state.
- The single HTML export includes these features. Audio uses the browser's speech synthesis voices, so available voices and quality depend on the device and browser. No recording or speech recognition is used.

## 2026-11-26 implementation status

| Priority | Status | Follow-up |
| --- | --- | --- |
| Daily review dashboard | Added due, studied, new, missed, and topic accuracy views | Add measured retention and a course-specific time estimate |
| Exam blueprint | Added course banks, select all, written answers, saved sessions and review | Expand curated items and accepted written equivalents; add diagrams |
| Mistake diagnosis | Added reason and private note after misses | Add generated transfer problems with reviewed keys |
| Algorithm games | Added tree traversal, graph visit order and insertion sorting | Replace fixed examples with verified generators and accessibility-tested diagrams |
| Audio playlist | Added manual prompt/answer playback and resume | Add optional timed recall pauses with browser support checks |
| Content quality and feedback | Added question flags and private feedback JSON export | Build source review and an opt-in community report process |

[Product position and AI handoff](Product%20Position%20and%20AI%20Handoff.md) tracks competitors, exact product capabilities, verification steps, and known limits. The new features are useful first versions; do not claim instructor-approved keys or complete parity with established products.

## Why this order

Research reviews rate practice testing and distributed practice highly for learning, while interleaving and self explanation can help in appropriate settings. Listening can improve access and convenience; it is not itself a substitute for active recall. The new game therefore requires an answer before reveal and schedules later reviews.

Quizlet currently offers personalized Learn, practice tests, audio controls, Match, and shared study sessions. StudyGOAT can differentiate by making saved offline study, accessible explanations, transparent answers, and course specific code and diagram practice reliable.

## Sources

- Dunlosky et al., *Improving Students' Learning With Effective Learning Techniques* (2013): https://www.psychologicalscience.org/journals/pspi/1529100612453266/
- Dunlosky, *Strengthening the Student Toolbox*: https://www.aft.org/ae/fall2013/dunlosky
- MDN, *Using the Web Speech API*: https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API
- Quizlet Help, *Studying with Learn*: https://help.quizlet.com/hc/en-us/articles/360030986971-Studying-with-Learn
- Quizlet Help, *Studying with Test*: https://help.quizlet.com/hc/en-ca/articles/360030642972-Studying-with-Test
- Quizlet Help, *Using Study with friends*: https://help.quizlet.com/hc/en-us/articles/48158602540685-Using-Study-with-friends
