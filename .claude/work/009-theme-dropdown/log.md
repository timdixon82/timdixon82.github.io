## [2026-06-08] open | Replace theme toggle buttons with dropdown

Work folder 009 opened. Triage: small feature.

Tim requested: replace the two theme toggle buttons (mode + family) with a single accessible select dropdown offering all four themes.

Dispatching Sean to implement.
- [2026-06-08 23:57:56] subagent completed
- [2026-06-09 00:07:32] subagent completed

## [2026-06-09] Carol blocked | two issues + CI failing

Carol found two blocking issues: (1) select border rgba(255,255,255,0.35) at 2.75:1 against header background — fails WCAG 1.4.11; (2) data URI chevron blocked by CSP, select had no visible dropdown arrow. CI also failing: 47 stylelint errors in assets/colors_and_type.css (design system file doesn't match project stylelint config).

Sean fixed all three in one commit: stylelint --fix plus manual expansion of multi-declaration single lines; border opacity raised to 0.4 (3.46:1 — passes); appearance:none and data URI chevron removed, native dropdown arrow restored.

Carol re-tested: all checks pass. CI: all 7 checks pass. Signed off for merge.

Token usage: Carol (initial) 60,024. Sean (fixes) 44,429. Carol (re-test) 42,299.
- [2026-06-09 00:45:47] subagent completed
