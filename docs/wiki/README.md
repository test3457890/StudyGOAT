# StudyGOAT Wiki Source

This folder holds Markdown content prepared for the StudyGOAT GitHub Wiki.

## Important

Files under `docs/wiki/` are ordinary repository files. They do not automatically appear in the GitHub Wiki tab. The Wiki is a separate Git repository, so these files must be published there.

## Publish the first page

1. Open https://github.com/test3457890/StudyGOAT/wiki
2. Choose Create the first page, or edit Home if one already exists.
3. Copy the content of `Home.md` into the Wiki's Home page.
4. Save the page.

## Publish the remaining pages

For each Markdown file in this folder, create a Wiki page with the matching name and copy the file contents. Use `_Sidebar.md` and `_Footer.md` for the Wiki navigation sidebar and footer.

Advanced Git users can clone the separate wiki repository after creating the Home page:

```sh
git clone https://github.com/test3457890/StudyGOAT.wiki.git
```

Copy the Markdown pages into that clone, then commit and push them. Only changes in the wiki repository appear in the Wiki tab.

## Content principles

- Explain what works today separately from proposed features.
- Position StudyGOAT for students and professionals, including certification candidates.
- Do not claim official certification endorsement or guaranteed exam results.
- Keep AI, privacy, and data-handling limitations easy to find.
- Use clear, practical language and verify course material.

