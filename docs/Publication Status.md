# Publication status

Checked 2026-11-09.

## GitHub repository

Changes are published in staged commits on `development/study-programs` with pull request #1. Final merge status and CI results are recorded in the release report.

## GitHub Pages

`https://test3457890.github.io/StudyGOAT/` returned HTTP 404. No live deployment is claimed. An authorized repository administrator can enable Settings > Pages > Deploy from a branch > main > /(root), then verify the deployed application.

## Separate GitHub Wiki

The Wiki URL redirects to the repository and there is no Wiki tab in the public navigation. `git ls-remote https://github.com/test3457890/StudyGOAT.wiki.git` fails with an authentication request. The available browser is signed out. The connector supports repository file operations but not Wiki initialization or repository feature settings.

The exact feature setting cannot be confirmed without signed-in settings access. Updated files under `docs/wiki` are not live Wiki pages.

Remaining steps for an authenticated repository administrator:

1. Enable Wikis in repository Settings if disabled.
2. Create a Home page once through the Wiki UI to initialize the separate repository.
3. With authenticated Git access, run `node tools/sync-wiki.cjs` from this repository.
4. Open the live Wiki and confirm the new pages and sidebar.

The sync script verifies the pushed commit against the remote branch. It does not delete unrelated Wiki pages or embed credentials.
