# Test Pass: 007-timdixon-site-setup

**Repository:** timdixon82/timdixon82.github.io
**Pull request:** PR 3, head `506169c`, branch `chore/project-setup`
**Tester:** Carol
**Date:** 2026-05-23

## Verdict

Pass with deferred items. All 15 setup-build items confirmed closed. All CI checks pass. No new blocking defects found. Deferred items (V-01, V-02, stricter CSP, todo items 16-20) are recorded and carry over to the later accessibility phase.

## Functional pass

### Linters

All three linters run locally and exit 0:

- `npm run lint:html`: exit 0. html-validate passes against index.html.
- `npm run lint:css`: exit 0. stylelint passes with `--allow-empty-input` (CSS is inline; file split is deferred to ADR 001).
- `npm run lint:js`: exit 0. ESLint passes.

### Workflow validation

`actionlint` run against all five workflow files exits 0. Confirmed locally. Sonja also confirmed exit 0 in the session before this dispatch.

### Release-please configuration

Both JSON files parse without error:

- `release-please-config.json`: valid JSON. Release type `simple`, tag prefix `v`, changelog path `CHANGELOG.md`, VERSION listed as a generic extra file.
- `.release-please-manifest.json`: valid JSON. Records version `0.1.0` at `.`.

### Todo items 1 through 15 confirmed closed

Each item is verified against the current `index.html` at HEAD `506169c`:

1. Misspelled LLBS link fixed. The URL `/LLBS-Braille-Name-Generator` (two Ls) is present at line 297 of `index.html`. The previous misspelling `/LLBS-Braile-Name-Generator` is gone.
2. LLBS card description rewritten. The new text "The Living Well Together Strategy site for LLBS. Includes the LLBS Photo Brander tool." is present at lines 301-303. Draft is pending Tim approval (Q53).
3. GoatCounter snippet present. `assets/analytics/count.js` exists. The snippet before `</body>` uses `data-goatcounter="__TIMDIXON82_GITHUB_IO_TRACKER_PLACEHOLDER__"` at line 355. The placeholder is recorded; Tim must supply the real tracker URL (Q54).
4. Contact link present. Footer contains `<a href="https://www.timdixon.net/contact/">Contact Tim Dixon</a>` at line 322.
5. CSP and Referrer-Policy meta tags present. CSP meta tag at line 5 (`default-src 'self'`, `unsafe-inline` for script and style, `frame-ancestors 'none'`, `form-action 'none'`). Referrer-Policy meta tag at line 6 (`strict-origin-when-cross-origin`).
6. VERSION present. File contains `0.1.0` as a single line.
7. README present at repository root. Screen-reader-friendly: one H1, sequential headings, descriptive link text, no emoji, no ASCII art.
8. `role="list"` on the project grid `<ul>` at line 283. Confirmed.
9. Visually hidden "(opens in new window)" in the footer link to `https://timdixon.net` at line 320. The `<span class="visually-hidden"> (opens in new window)</span>` is present. The `.visually-hidden` class is correctly defined in the CSS (absolute position, 1px, clip-rect). Confirmed F-03 closed.
10. `--fg-muted` darkened from `#4b5563` to `#374151` in light mode at line 29 of `index.html`. #374151 on #f4f6f8 exceeds 7:1 (the PR body cites the ratio; the CSS value is confirmed). F-01 closed.
11. Dark mode `--bg-card` set to `#061528` at line 40, matching the page background. Orange #FF7C00 accent against #061528 achieves 7.23:1 per Sean's commit message. F-02 closed.
12. Card heading links: `display: inline-block`, `min-height: 44px`, `min-width: 44px`, `padding: 8px 0` at lines 196-202. F-04 closed.
13. LLBS and UEB wrapped in `<abbr>` with full-form expansion in visible text on first occurrence. UEB at line 286: `<abbr title="Unified English Braille">UEB</abbr> (Unified English Braille)`. LLBS at line 297: `<abbr title="Lincoln and Lindsey Blind Society">LLBS</abbr> (Lincoln and Lindsey Blind Society)`. F-05 closed.
14. `package.json` (private: true) present. `devDependencies` list: html-validate 11.x, stylelint 16.x, stylelint-config-standard 38.x, eslint 9.x, globals 16.x. `package-lock.json` is committed and tracked in git. `node_modules/` is in `.gitignore`. Item 14 closed.
15. Not a numbered item in todo.md as a separate line, but the five-workflow CI scaffold is confirmed: `ci.yml`, `accessibility.yml`, `security.yml`, `codeql.yml`, `release.yml` all exist under `.github/workflows/`. All action versions are pinned to commit SHAs.

### CI check results (from `gh pr checks 3`)

All seven checks pass:

- Analyse JavaScript (CodeQL): pass
- CodeQL: pass
- Dependency review: pass
- Lint HTML, CSS, and JavaScript: pass
- Pa11y and axe at WCAG 2.2 AAA: pass
- Semgrep: pass
- Trivy: pass

### GoatCounter analytics implementation

`assets/analytics/count.js` is self-hosted at the expected path. The file begins with the ISC licence comment (preserved). The snippet in `index.html` references `./assets/analytics/count.js` as `src` and carries the placeholder in `data-goatcounter`. The CSP `script-src 'self'` covers the local file path. The tracker URL placeholder is listed in todo.md item 3 and flagged as Q54.

## Accessibility pass

### Pa11y at WCAG 2.2 AAA

CI run "Pa11y and axe at WCAG 2.2 AAA" passes. Exit 0 confirmed in the CI log. No new violations. The three pre-existing advisory items (V-01 card box-shadow, V-02 header linear-gradient, stricter CSP once inline code is split) are not WCAG failures and remain deferred.

### Keyboard navigation order

DOM order in `index.html` is logical:

1. Skip link (`<a href="#main-content" class="skip-link">`) - first focusable element.
2. Theme toggle button in the header.
3. Eight project card heading links in document order (Braille Reference, Clock Practice, Image Colour Contrast Checker, LLBS Braille Name Generator, LLBS Living Well Together Strategy, Periodic Table, Poop Breakout, Social Media Accessibility Checker).
4. Footer link to timdixon.net (opens in new window, visually hidden warning present).
5. Footer contact link.

No focus traps. No positive `tabindex` values. No `tabindex="-1"` on interactive elements. Navigation order matches reading order.

### Abbreviation check (F-05)

Two-part requirement: `<abbr>` wrapping and full form in visible text on first occurrence.

- UEB: `<abbr title="Unified English Braille">UEB</abbr> (Unified English Braille)` - both parts present.
- LLBS: `<abbr title="Lincoln and Lindsey Blind Society">LLBS</abbr> (Lincoln and Lindsey Blind Society)` - both parts present.

Subsequent occurrences of LLBS use `<abbr>` only (no repeated expansion). This is correct.

### External-link warning

The footer link to `https://timdixon.net` carries `target="_blank"` and `rel="noopener noreferrer"`. The `<span class="visually-hidden"> (opens in new window)</span>` inside the link is present. The `.visually-hidden` CSS class uses position absolute, 1px by 1px, clip, white-space nowrap - the standard technique. Screen readers will announce "Tim Dixon (opens in new window)" for the combined link text. Confirmed correct.

### Manual VoiceOver and JAWS passes

Listed as Tim-side gates, pre-release. These are not blocking this setup-build merge. Sonja to note in the release checklist.

## Citation checks

This pull request includes Tad's wiki commits (984081d, ef49968). Tad's work is documentation (wiki scaffold), not a draft produced against `docs/writing-style.md`. The citation-check rule applies to drafts written in Tim's voice; wiki structure files and decision records are not in scope. No citation deficiency.

No Simon work is included in this PR. Citation check not applicable.

## New findings

None. No defects found that are not already recorded as deferred items.

## Summary of deferred items (carry forward)

These items are not blocking merge but must be tracked:

- V-01: card box-shadow contradicts flat-design brand guidance (Simon and Tim to decide; todo item 18).
- V-02: header linear-gradient contradicts flat-design brand guidance (Simon and Tim to decide; todo item 18).
- Stricter CSP (remove `unsafe-inline`): unlocked after file split in todo item 16.
- Todo items 16-20: file split, projects-listed review, DNS and HTTPS confirmation, GoatCounter cadence.
- Q53 (LLBS card copy draft approval) and Q54 (GoatCounter tracker URL): blocking merge, not blocking test pass.
