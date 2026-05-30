# Release Checklist: 007-timdixon-site-setup

**Repository:** timdixon82/timdixon82.github.io
**Pull request:** PR 3, head `506169c`, branch `chore/project-setup`, base `main`
**Release manager:** Carol
**Date:** 2026-05-23

## Verdict

Not ready to merge. Two Tim-approval gates are open (Q53 and Q54). All technical gates pass. The pull request is ready for the merge gate the moment Tim approves Q53 and provides Q54.

## Checklist

### Continuous integration

- [x] Lint HTML, CSS, and JavaScript: pass (CI and local both exit 0).
- [x] Pa11y and axe at WCAG 2.2 AAA: pass (CI exit 0).
- [x] Semgrep: pass.
- [x] Trivy: pass.
- [x] Dependency review: pass.
- [x] CodeQL (Analyse JavaScript): pass.
- [x] actionlint: exit 0. All five workflow files are clean.

### Accessibility

- [x] Automated accessibility gate passed: Pa11y and axe-core both exit 0 in CI at WCAG 2.2 AAA.
- [x] All six Carol baseline findings (F-01 through F-06) are closed and confirmed in the test pass.
- [ ] Manual VoiceOver pass (macOS): Tim-side gate, pre-release. Not blocking this setup-build merge.
- [ ] Manual JAWS pass (Windows): Tim-side gate, pre-release. Not blocking this setup-build merge.

### Security

- [x] Semgrep: pass.
- [x] Trivy: pass.
- [x] Dependency review: pass.
- [x] CodeQL: pass.
- [x] GitHub Pages security-header exception: the standing exception (global wiki decision 011, approved by Tim on 2026-05-23) covers this project. The project pointer file at `docs/exceptions/github-pages-headers.md` is correct and complete. No per-project sign-off required.

### Functional and visual testing

- [x] All 15 setup-build todo items confirmed closed (see test pass for item-by-item evidence).
- [x] Three linters exit 0 locally.
- [x] Release-please JSON files parse without error.
- [x] GoatCounter `count.js` is self-hosted; ISC licence is preserved; placeholder is in place.
- [x] Contact link points to `https://www.timdixon.net/contact/`.
- [x] CSP and Referrer-Policy meta tags present.
- [x] VERSION (0.1.0) and README present and correct.
- [x] `package.json` (private: true), `package-lock.json` committed, `node_modules/` gitignored.
- [x] PR body lists all nine commits accurately and matches the actual commit history.

### Architecture and security conformance

- [x] Jacob's backfill ADRs (001-004) recorded in the project wiki.
- [x] Jed's security review (code review and penetration test) is complete as part of the backfill. No high or critical findings blocking merge.
- [x] OWASP Top 10 coverage: CSP, Referrer-Policy, no external scripts, no innerHTML, HTTPS enforced by platform, all noted in the standing exception and ADR 003.
- [x] Sonja has confirmed architecture-and-security conformance check is done (per the brief routing plan step 6).

### Version number and changelog

- [x] VERSION file: `0.1.0` (single line, semantic).
- [x] `.release-please-manifest.json`: version `0.1.0` at `.`.
- [ ] CHANGELOG.md: not yet present. This is correct for a pre-first-release state. Release-please generates `CHANGELOG.md` on the first tagged release. No action required before this merge.

### GitHub Actions log

- [x] All five workflows exist and have run against this PR.
- [x] The work folder log at `.claude/work/007-timdixon-site-setup/log.md` records the setup build completion on 2026-05-23.

## Blocking items

These items block merge. They are Tim-approval gates, not technical defects.

1. Q53: Tim must approve the LLBS hub card copy draft ("The Living Well Together Strategy site for LLBS. Includes the LLBS Photo Brander tool.") or provide alternative text. The draft is visible in the PR body.
2. Q54: Tim must provide the real GoatCounter tracker URL for this project (from the GoatCounter dashboard). The placeholder `__TIMDIXON82_GITHUB_IO_TRACKER_PLACEHOLDER__` must be replaced in `index.html` before merge.

## Deferred items (carry forward, not blocking)

These items are recorded in `todo.md` and are not blocking merge.

- V-01: card `box-shadow` vs. flat-design brand guidance. Simon and Tim to decide (todo item 18).
- V-02: header `linear-gradient` vs. flat-design brand guidance. Simon and Tim to decide (todo item 18).
- Stricter CSP (drop `unsafe-inline`): deferred until file split (todo item 16).
- Todo items 16-20: file split, projects-listed review, brand shadow/gradient decision, DNS and HTTPS confirmation, GoatCounter cadence.
- Manual VoiceOver and JAWS passes: listed as Tim-side gates pre-release.

## Release statement

The pull request is technically clean and ready for the merge gate. Two Tim-approval gates (Q53, Q54) must be resolved first. Once Tim approves Q53 and provides the tracker URL for Q54, Sean makes the one-line edit to replace the placeholder, and Sonja runs the merge gate with Tim's express merge approval.
