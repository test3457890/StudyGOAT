# StudyGOAT

StudyGOAT is an interactive browser-based study program with built-in course material, lessons, practice questions, flashcards, study games, and progress tracking.

## Run the program

1. Download or clone this repository.
2. Open `StudyGOAT.html` in a modern web browser.
3. Choose a course or a study activity.

No package manager, build tools, or development server is required for the included study features.

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

If this is a public repository, enable GitHub Pages from the repository Settings, then Pages, then choose to deploy from the default branch and the root folder. The `index.html` file will redirect visitors to the application.

For a private repository, verify your account's GitHub Pages visibility options before enabling hosting, as a published Pages site may be accessible outside the private repository.

## Notes

- This repo packages the original HTML without editing its application code.
- Do not commit API keys, account credentials, classmate documents, or personal data to the repository.
- This repository does not include a license, so no reuse license is granted by default.
