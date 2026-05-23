# Accessibility: timdixon82.github.io

## Standard that applies

The team's WCAG 2.2 AAA standard is in the global wiki at `AgentTeam/docs/accessibility.md`. Every rule and testing protocol in that document applies to this project. This page records the project-specific findings from Carol's baseline audit (2026-05-21) and the gaps that need rework during the setup build.

## Carol's baseline audit verdict

The page meets Level A in full. It meets Level AA in full except for a borderline contrast case in the muted text colour. It does not meet Level AAA. Five criteria are unmet (F-01 through F-05); one further issue affects Safari list semantics (F-06). Three brand compliance advisories are also noted.

Carol's full audit is in the work folder at `AgentTeam/.claude/work/007-timdixon-site-setup/carol-baseline-audit.md`.

## Gaps requiring rework in the setup build

### F-01: Muted text contrast in light mode (major)

Criterion: 1.4.6 Contrast Enhanced, Level AAA. Required ratio: 7 to 1.

The muted text colour `--fg-muted: #4b5563` on the light background `--bg: #f4f6f8` gives a ratio of 6.88 to 1. This is below the 7 to 1 AAA threshold. It affects all eight card descriptions and the footer text.

Fix: darken `--fg-muted` in light mode to approximately `#374151` or darker to reach 7 to 1 against `#f4f6f8`. Simon confirms the new value meets the brand palette.

### F-02: Card link contrast in dark mode (major)

Criterion: 1.4.6 Contrast Enhanced, Level AAA. Required ratio: 7 to 1.

In dark mode, the orange accent `#FF7C00` on the card background `#0d2040` gives 6.26 to 1. This is below the 7 to 1 threshold. It affects all eight card heading links.

Fix: lighten the orange accent for dark-mode card links, or darken the card background to match the full navy `#061528`. The brand-approved pairing of orange on full navy gives 7.23 to 1, which passes. Simon advises on the final value.

### F-03: Footer link opens new window without warning (major)

Criterion: 3.2.5 Change on Request, Level AAA.

The footer link opens `https://timdixon.net` in a new browser tab without warning the user. Screen reader users may be disoriented.

Fix: add visually hidden text "opens in new window" inside the link element, for example a `<span class="visually-hidden">(opens in new window)</span>`.

### F-04: Tap target size for card links (minor)

Criterion: 2.5.5 Target Size Enhanced, Level AAA. Required: 44 by 44 CSS pixels.

The card heading links are inline `<a>` elements. Their tap target is smaller than 44 by 44 CSS pixels because no padding expands the hit area beyond the text bounds.

Fix: add padding to the `<h2> a` links to reach 44 by 44 CSS pixels, using negative margins if needed to preserve visual layout.

### F-05: Abbreviations not expanded (minor)

Criterion: 3.1.4 Abbreviations, Level AAA.

"LLBS" and "UEB" appear in page content without expansion. Screen reader users browsing by links will hear the abbreviations without knowing what they mean.

Fix: use `<abbr title="...">` for each abbreviation, and also expand the full form in visible text on first occurrence. See the [glossary](glossary.md) for the expansions.

### F-06: List semantics stripped in Safari and VoiceOver (minor)

Criterion: 1.3.1 Info and Relationships, Level A.

The project grid `<ul class="project-grid">` has `list-style: none` in CSS. Safari and VoiceOver remove the list role from a `<ul>` styled this way. Tim's primary screen reader pairing is VoiceOver on macOS, so this affects him directly.

Fix: add `role="list"` explicitly to the `<ul>` element.

## Brand compliance advisories (not WCAG failures)

### V-01: Font stack does not prioritise brand typeface

The body font declaration uses a system font stack in which Arial appears sixth and Inter is absent. On most systems the rendered font will be a system UI face rather than the brand face. This is an advisory for Simon to consider during the setup build.

### V-02: Card shadow and header gradient contradict brand style

The brand requires flat design with no gradients or shadows. The page uses `box-shadow` on cards and a `linear-gradient` on the header `::after` element. Simon and Tim should decide whether to remove these.

### V-03: Link path spelling inconsistency

The card link `/LLBS-Braile-Name-Generator` spells "Braile" with one "l". The card heading and description spell "Braille" correctly. This is recorded as a functional todo item rather than a WCAG finding. See [todo item 1](../todo.md).

## What passes

The following criteria passed Carol's audit: 1.1.1 Non-text Content (A), 1.3.1 Info and Relationships subject to F-06, 1.3.2 Meaningful Sequence (A), 1.4.1 Use of Colour (A), 1.4.3 Contrast Minimum (AA), 1.4.4 Resize Text (AA), 1.4.10 Reflow (AA), 1.4.12 Text Spacing (AA), 2.1.1 Keyboard (A), 2.1.2 No Keyboard Trap (A), 2.1.3 Keyboard No Exception (AAA), 2.4.1 Bypass Blocks (A), 2.4.2 Page Titled (A), 2.4.4 Link Purpose in Context (A), 2.4.7 Focus Visible (AA), 2.4.11 Focus Not Obscured Minimum (AA), 2.4.12 Focus Not Obscured Enhanced (AAA), 2.4.13 Focus Appearance (AAA), 2.5.3 Label in Name (A), 3.1.1 Language of Page (A), 3.2.1 On Focus (A), 3.2.2 On Input (A), 3.3.7 Redundant Entry (A), 4.1.2 Name, Role, Value (A).
