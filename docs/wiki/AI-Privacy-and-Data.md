# AI, Privacy and Data

StudyGOAT includes optional AI features. The built-in study modes can be used without providing an AI key.

## Supported environments

### Local browser or GitHub Pages
The program runs as browser-based HTML and JavaScript. Its built-in course content and many study activities work without a server. AI features require an available provider.

### Claude artifact environment
The source includes code that uses Claude-specific APIs when the application runs inside a compatible Claude environment. Those capabilities are not supplied by GitHub Pages.

### Gemini API
The source supports an optional user-provided Gemini key. Requests are sent from the browser to Google's Generative Language API when that connection is configured. Provider availability, usage limits, prices, and policies are separate from StudyGOAT.

## API key safety

The current application stores the manually entered Gemini API key in browser local storage. It is not hardcoded in the public GitHub repository.

Browser local storage is not a secure vault. Anyone using the same browser profile, or a malicious script running in the same origin, may be able to access the key. Do not use this option on shared or untrusted computers. Do not commit keys to GitHub, post them in issues, or include them in screenshots.

A future improvement would be a safer, optional server-side key handling model.

## Your progress

Local progress is saved in the browser. Clearing browser storage can erase progress. The current public static site does not provide StudyGOAT accounts or automatic cross-device syncing.

Some connected Claude environments may offer separate cloud features. Do not assume that data moves automatically between a public site and Claude.

Use available export or backup options before changing devices or clearing browser data.

## Uploaded files and confidential material

When you use AI-assisted course building, selected file content or extracted material may be sent to the selected AI provider. Never upload passwords, private student records, personal identifiers, confidential workplace files, restricted exam questions, or materials you do not have permission to share.

## AI accuracy

AI tutors and generated course materials may be wrong or incomplete. Check important information against official sources and current exam objectives.

See [FAQ](https://github.com/test3457890/StudyGOAT/wiki/FAQ).

