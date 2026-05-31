# Work Log: 007-timdixon-site-setup

This log is chronological and append-only.

## [2026-05-21] setup | Work folder created

Tim directed the team to backfill the `timdixon82/timdixon82.github.io` repository, his main GitHub Pages site at `projects.timdixon.net`. Triaged as an adopt-and-backfill job, the same pattern as Periodic-Table, Clock-Practice, and LLBS.

## [2026-05-21] clone | Repository cloned

Cloned `timdixon82/timdixon82.github.io` to `Github/timdixon82.github.io`. Current state: a single `index.html` and a `CNAME` domain file. Stack: a static front-end of HTML, CSS, and JavaScript.

## [2026-05-21] dispatch | Backfill reviews dispatched

Dispatched Tad, Jacob, Gerrie, Jed, and Carol in parallel, in the background, to backfill the business-analysis, architecture, and security reviews, and to baseline-audit the page against WCAG 2.2 AAA. Each writes its report into this work folder. This phase is read-only; the repository itself is not changed.
Note (2026-05-22, intake I1): Gerrie's work is now covered by Jed, the team's penetration tester, code reviewer, and security governance agent.

## [2026-05-21] consolidate | timdixon82.github.io backfill complete

All five backfill reviews are in. The site is a single-file project-index landing page at `projects.timdixon.net`, listing eight projects, with a theme toggle, no third-party dependencies, and no personal data. Jacob recorded four Architecture Decision Records, noting that this user site owns the custom domain for every project page served beneath it. Gerrie and Jed found the recurring GitHub Pages header gap. Carol's baseline WCAG 2.2 AAA audit: Level A and AA met, three major and three minor AAA gaps; these become the project's later accessibility phase. Carol and Jacob both flagged a likely broken link: the project-card URL `/LLBS-Braile-Name-Generator` has "Braile" misspelled.

Open questions for Tim: Tad and Gerrie raised the LLBS card description, possible missing projects, the public listing of a game, analytics, a contact route, and brand fonts. The file-split and security-header questions are cross-cutting and folded into the cross-cutting decision set put to Tim. Next: Sonja scaffolds the project wiki and the setup build follows, pending Tim's cross-cutting answers.
Note (2026-05-22, intake I1): Gerrie's work is now covered by Jed, the team's penetration tester, code reviewer, and security governance agent.

## [2026-05-23] scaffold | Tad wrote the project wiki for timdixon82.github.io

Tad wrote the full project wiki scaffold for `timdixon82/timdixon82.github.io` on branch `chore/project-setup`. Files written:

- `docs/index.md`: wiki catalogue.
- `docs/log.md`: opening log entry.
- `docs/glossary.md`: project-specific terms (CNAME file, GitHub user site, LLBS, project card, td-theme, UEB).
- `docs/coding-standards.md`: cites global standard; notes file-split status, zero-dependency posture, analytics decision (Q21), contact link (Q22), and missing VERSION and README.
- `docs/accessibility.md`: Carol's baseline audit findings F-01 through F-06 and three advisory items; passing criteria listed.
- `docs/release-process.md`: cites global process; adds user-site-specific caution about CNAME.
- `docs/decisions/001-file-structure.md`: ADR 001, proposed, file split as follow-up work.
- `docs/decisions/002-no-build-step.md`: ADR 002, accepted.
- `docs/decisions/003-hosting-domain-headers.md`: ADR 003, accepted; records custom-domain ownership and security-header posture.
- `docs/decisions/004-dependency-posture.md`: ADR 004, accepted; zero dependencies, analytics self-hosting, brand-fonts decision (Q23).
- `docs/exceptions/security-header-gaps.md`: X-Frame-Options and Permissions-Policy gaps; pending Tim's sign-off.
- `docs/stacks/.gitkeep` and `docs/patterns/.gitkeep`: stub folders.
- `todo.md` at repository root: 20 items, 15 for the setup build and 5 deferred.

Decisions recorded: Q18A, Q19, Q20A, Q21, Q22, Q23. Broken-link finding recorded in todo item 1.

Git operations (branch creation and commit) require Bash execution and were not available to Tad directly. Sonja must run: `git -C "<repo-path>" checkout -b chore/project-setup`, `git -C "<repo-path>" add docs/ todo.md`, `git -C "<repo-path>" commit -m "docs: scaffold project wiki and decisions"`.

## [2026-05-22] decision | Tim answered the timdixon82.github.io landing-page questions

Tim answered the timdixon82.github.io projects-landing-page questions Q18 to Q23:

- Q18A: keep the LLBS project card, with clearer text. It currently reads "LLBS Repo for LLBS Projects", which does not say what the project is. The team drafts a clearer description for Tim's approval during the setup build.
- Q19: some projects are missing from the eight cards, but the page is left as it is for now. A todo item, "review and update the projects listed", is recorded for this project's todo list.
- Q20A: keep the Poop Breakout card on the public landing page.
- Q21: analytics. Tim's instruction is clear and final: analytics in all projects, the landing page included. This resolves the earlier apparent contradiction.
- Q22: add a contact link to `https://www.timdixon.net/contact/`. Tim wrote "timdixon.net/contract"; Sonja checked the site and corrected the host, path, and trailing slash.
- Q23: brand fonts are covered by the Tim Dixon Design System decision.

Tim also asked for a todo list in every project, to track outstanding and future work. Recorded as a new team practice, to be built into the standard project setup. All timdixon82.github.io questions are now answered; the setup build is unblocked.

## [2026-05-27] close | Work folder closed

Tim approved Q53 (LLBS card copy draft accepted as written) and Q54 (GoatCounter tracker URL confirmed as `https://timdixon82.goatcounter.com/count`, matching the team default). The placeholder swap was already committed in commit `110183c` in the previous session. PR 3 is already merged to `main` with all seven CI checks passing. Work folder marked done.

## [2026-05-23] commit | Setup build committed; pull request opened

Sean completed the seven-commit setup build on `chore/project-setup` on top of Tad's two wiki commits. All 15 setup-build items closed. Three linters exit 0; the static-stack accessibility regression suite is clear (S-03 through S-10 checked; S-01, S-02, S-05, S-11, S-12 not applicable). Pull request 3 opened at https://github.com/timdixon82/timdixon82.github.io/pull/3, head `chore/project-setup`, base `main`. Two open Tim questions raised in the dispatch: Q53 (LLBS card copy draft) and Q54 (GoatCounter tracker URL). Deferred to later phases: file split (item 16), project-card review (17), brand shadow/gradient decision (18), DNS and HTTPS confirmation (19), and the GoatCounter quarterly-refresh cadence (20). Pre-existing AAA gaps V-01 (card box-shadow), V-02 (header linear-gradient), and the stricter CSP go to the later AAA phase. Next: dispatch Carol for the test pass and release checklist.
- [2026-05-27 23:56:19] subagent completed
- [2026-05-27 23:59:43] subagent completed
- [2026-05-28 00:07:15] subagent completed
- [2026-05-28 00:15:12] subagent completed
- [2026-05-28 00:17:04] subagent completed
- [2026-05-28 00:37:36] subagent completed
- [2026-05-30 23:14:23] subagent completed
- [2026-05-30 23:30:44] subagent completed
- [2026-05-30 23:48:29] subagent completed
- [2026-05-31 12:03:26] subagent completed
- [2026-05-31 13:02:01] subagent completed
- [2026-05-31 13:23:16] subagent completed
- [2026-05-31 13:47:23] subagent completed
