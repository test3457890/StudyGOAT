# StudyGOAT study strategy and product roadmap

StudyGOAT already includes lessons, flashcards, mixed quizzes, a mastery based Learn mode, Match, exam preparation, and saved browser progress. The next work should improve recall, feedback, and retention before adding more arcade games. A higher score during a single session is not the same as durable learning.

## Added in this update

- Walkthroughs show a clear title, goal, step counter, accessible progress, and a read aloud control beside the current step.
- Read aloud also works for practice questions, Learn prompts, and visible flashcard faces. Playback starts only on request; pause, stop, voice (when available), and speed controls are provided. The selected speed and voice travel with exported progress.
- Recall Sprint asks for an answer before revealing it. Learners self grade honestly. Remembered cards return after 1, 3, 7, then 14 days; missed cards become due immediately. Progress is saved in the existing browser state.
- The single HTML export includes these features. Audio uses the browser's speech synthesis voices, so available voices and quality depend on the device and browser. No recording or speech recognition is used.

## Build next, in order

1. **Daily review dashboard:** show due cards by course, estimated session size, and a missed concept queue. Keep an option to study ahead. Measure completed reviews and later recall, not only streaks.
2. **Exam blueprint builder:** mix multiple choice, multiple answer, true/false, code tracing, and short answers in the proportions the learner chooses. Score multi-answer questions as complete sets and explain each option. Add diagrams with accessible text alternatives.
3. **Mistake diagnosis:** after a miss, ask which rule failed; give a short explanation, a worked example, and a new transfer question. Let the learner mark a question ambiguous or incorrectly keyed.
4. **More useful games:** a timed graph or tree traversal challenge with an untimed option; a sequencing game for sorting and data structure operations; cooperative team rounds with private progress and opt-in sharing. Connect each game to explanations and later reviews.
5. **Audio study playlist:** selectable set of prompts with a pause for spoken recall before each answer; optional repeats for missed items. Check browser audio behavior before promising background play or offline voices across devices.
6. **Content quality:** review course scope and each answer with sources; offer an authoring flow for user provided materials and image descriptions. Verify imported questions before using them for exam practice.

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
