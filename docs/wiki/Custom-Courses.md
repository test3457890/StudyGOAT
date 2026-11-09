# Creating Custom Courses

StudyGOAT includes a course builder for creating new study areas. AI-assisted reading and course generation require an available AI provider. A public GitHub Pages deployment does not provide its own AI service.

## Create a study course

1. Open the application and choose the course-building option.
2. Enter a course code or short label and a course name.
3. Choose the subject type and a programming language if relevant.
4. Add the study materials you are allowed to use.
5. Use Read to have the configured AI examine the selected materials.
6. Check the extracted topics before choosing Build.
7. Review the resulting lessons, questions, and notes for correctness.

The source includes a limit of 15 files per batch and up to 12 batches per custom course. Supported file types shown in the upload picker include PowerPoint, PDF, Word, plain text, Markdown, CSV, source code, and common images. What the AI can successfully read depends on the provider, format, size, and connection.

## For college classes

Start with your professor's slides, assigned readings, and learning objectives. Verify generated questions against the material provided in class.

## For professional certification preparation

Use the current official exam objectives to guide your topic list. Only upload source materials you are authorized to share. Review AI-generated questions carefully, especially for regulations and other frequently changing topics.

## Quality checklist

- Are topic names accurate?
- Are the key concepts explained in plain language?
- Are answers and explanations correct?
- Are formulas and code examples correct?
- Does the content cover the intended exam or training objectives?
- Does it avoid unsupported claims?

## Limitations

Creating a course does not guarantee that every topic has been covered. AI generation may be unavailable without a supported connection, and generated material can contain errors. The built-in CS 315 and CPSC 222 courses are not templates for an official certification syllabus.

See [Developer Guide](https://github.com/test3457890/StudyGOAT/wiki/Developer-Guide) for implementation details.

