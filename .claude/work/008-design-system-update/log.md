## [2026-06-08] open | Design system update + project card list

Work folder 008 opened. Triage: small feature.

Tim requested: apply the Tim Dixon Design System (v2026-06-08b) to this project for the first time, and update the project cards to include all 11 public GitHub repositories.

Mockup mode: C (no mockup — build directly from design system components and adoption pattern).

Missing projects identified from GitHub: Sophie's Escape: The Witch's Castle, SWOT Builder, James Nerf Squad.

Dispatching Sean to implement. Carol to test after Sean's branch is raised.
- [2026-06-08 23:23:55] subagent completed

## [2026-06-08] Sean complete | PR #16 open

Sean raised PR #16 on branch feat/design-system-update. Files changed: index.html, assets/colors_and_type.css, assets/theme.js, assets/fonts/ (Roboto TTFs + OFL.txt).

Design finding from Sean: brand-sky (#52C7EB) on brand-navy (#0C3B64) for the tagline fails WCAG AAA at small text size (~5.8:1). Workaround: tagline changed to #ffffff (11.3:1). Alternative sky-tinted value: #A8D6EC (7.2:1). Logged as low-priority Simon task.

Token usage: Sean 99,744 tokens (above 80k soft ceiling — reviewed; binary font files and full HTML rewrite account for the overage; brief was appropriately scoped, not a runaway).

Dispatching Carol to test PR #16 branch.

- [2026-06-08 23:35:55] subagent completed

## [2026-06-08] Carol rework flag | muted-light --fg-muted fails AAA

Blocking failure: `--fg-muted: #5A636D` in `[data-theme="muted-light"]` gives 6.1:1 on white and 5.33:1 on the page background (#EDF0F3). WCAG 2.2 AAA requires 7:1. 15 axe-core violations on muted-light theme. All other checks passed.

Carol suggests #434B53 (8.7:1 on white, 7.7:1 on #EDF0F3). Dispatching contrast-master to confirm the value clears all five checkers (WCAG, APCA, Vestibular, Cognitive, CVD) as the muted theme requires. Then Sean to apply the single-token fix.

Note: this is a bug in the canonical AgentTeam colors_and_type.css — flag for global fix at team root after this project PR is merged.

Token usage: Carol 77,700 tokens. contrast-master 28,878 tokens. Sean (fix) 23,627 tokens. Carol (re-test) 39,088 tokens.

- [2026-06-08 23:40:52] subagent completed
- [2026-06-08 23:41:46] subagent completed
- [2026-06-08 23:46:15] subagent completed

## [2026-06-08] Carol re-test | PASS — all four themes clear

axe-core and Pa11y pass on all four themes after the --fg-muted fix. Zero violations. Four pre-existing Pa11y G17.Abs warnings on .visually-hidden spans (false positive; logged as low-priority Sean task).

Carol signed off. PR #16 ready for Tim's merge approval.
- [2026-06-08 23:52:25] subagent completed
- [2026-06-09 00:13:23] subagent completed
- [2026-06-09 00:25:34] subagent completed
