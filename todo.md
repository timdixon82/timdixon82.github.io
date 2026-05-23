# Todo: timdixon82.github.io

Outstanding items from the setup backfill and items deferred for later phases. Items are numbered for reference. An item is removed from this list when the work is done and merged to `main`.

## Fix during setup build

These items are part of the current setup build and must be resolved before the setup-build pull request is merged.

1. Fix the broken card link: the URL `/LLBS-Braile-Name-Generator` misspells "Braille" as "Braile". Verify the actual GitHub repository name and correct the link slug in `index.html` to match. Flagged by Carol and Jacob during the backfill (2026-05-21). Do not change `index.html` on the wiki-scaffold branch; this is a code change for Sean on the setup-build branch.

2. Rewrite the LLBS card description: the current text "LLBS Repo for LLBS Projects" does not tell a visitor what the project is (Q18A). The setup build will produce new copy for Tim's approval before the pull request is opened.

3. Add the GoatCounter analytics snippet to `index.html`: self-host `count.js`, add the snippet before `</body>`, and record the privacy posture in the project wiki. Tim has decided analytics go in all projects, including this page (Q21). Sonja asks Tim for the tracker code before the pull request is opened.

4. Add a contact link pointing to `https://www.timdixon.net/contact/` (Q22). Sean adds the link to `index.html` during the setup build. The exact placement and styling are for Simon to advise on.

5. Add the Content-Security-Policy meta tag and the Referrer-Policy meta tag to `index.html`. The proposed CSP value is in [ADR 003](docs/decisions/003-hosting-domain-headers.md). Use the interim policy with `'unsafe-inline'` until the file split in item 7 is complete.

6. Add a `VERSION` file at the repository root, per the global coding standard.

7. Add a `README.md` at the repository root, per the global coding standard.

8. Add a `role="list"` attribute to the project grid `<ul>` element to restore list semantics in Safari and VoiceOver (Carol finding F-06).

9. Fix the footer link: add visually hidden text "(opens in new window)" inside the link to `https://timdixon.net` to warn users before a new tab opens (Carol finding F-03).

10. Fix muted text contrast in light mode: darken `--fg-muted` from `#4b5563` to approximately `#374151` or darker to reach the 7 to 1 AAA contrast ratio (Carol finding F-01). Simon confirms the final value.

11. Fix card link contrast in dark mode: lighten the card heading link colour or darken the card background so orange on the card background reaches 7 to 1. The brand-approved navy `#061528` as the card background gives 7.23 to 1 with the orange accent (Carol finding F-02). Simon advises on the final values.

12. Fix tap target size for card heading links: add padding to `<h2> a` links to reach at least 44 by 44 CSS pixels (Carol finding F-04).

13. Expand abbreviations in page content: use `<abbr title="Lincoln and Lindsey Blind Society">LLBS</abbr>` and `<abbr title="Unified English Braille">UEB</abbr>` on first occurrence, and also expand the full form in visible text (Carol finding F-05).

14. Add a `package.json` (marked `"private": true`) with the project's linters pinned as `devDependencies`, and a `package-lock.json`. Set up the lint and accessibility workflows in `.github/workflows/`. Per the standing standard in `AgentTeam/docs/decisions/006-adopted-static-project-standards.md` (standard 4).

## Deferred to later phases

These items are recorded but not part of the current setup build. They are raised here so they are not lost.

16. Split `index.html` into separate files: `index.html` (structure), `css/styles.css` (presentation), and `js/theme.js` (behaviour), per [ADR 001](docs/decisions/001-file-structure.md). This unlocks the stricter Content-Security-Policy. Scheduled as named follow-up work after the setup build.

17. Review and update the projects listed in the card grid: some projects may be missing (Q19). Tim asked for this to be reviewed after the setup build. Raise a separate piece of work when ready.

18. Decide whether to remove the card `box-shadow` and the header `linear-gradient`, which contradict the flat-design brand requirement (Carol advisory V-02). Simon and Tim decide.

19. Confirm with Tim that the DNS record for `projects.timdixon.net` is correct and that "Enforce HTTPS" is enabled for the custom domain in the GitHub Pages repository settings. This is a configuration check, not a code change. Sonja raises with Tim.

20. Review the quarter-cadence for refreshing the self-hosted GoatCounter `count.js` file once analytics are in place, per `AgentTeam/docs/patterns/goatcounter-analytics.md`.
