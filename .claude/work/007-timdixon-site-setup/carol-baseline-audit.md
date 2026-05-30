# Baseline WCAG 2.2 AAA Accessibility Audit: timdixon82.github.io

Audited by Carol, 2026-05-21. Page under review: `index.html` at `projects.timdixon.net`. Method: full code inspection of the single HTML file. Automated tool runs (axe-core via Pa11y) were not possible in this session because server execution was denied. All findings are from static analysis of the markup and CSS.

## Verdict

The page does not meet WCAG 2.2 AAA. It meets Level A in full. It meets Level AA in full except for one contrast borderline case. It falls short of AAA on five criteria: contrast of muted text in light mode, contrast of link text on dark-mode card backgrounds, tap target size for text links, new-window context change without warning, and unexpanded abbreviations.

Conformance levels met:

- Level A: pass.
- Level AA: conditional pass (see F-03, which is a borderline AA failure as well as an AAA failure).
- Level AAA: fail. Five criteria not met (see findings F-01 through F-05).

Additionally, three brand compliance deviations are noted (V-01 through V-03).

Automated tool runs are recommended once serve-and-test permissions are granted. This report covers everything detectable by code inspection and manual contrast calculation. A green automated run is necessary but not sufficient, as the team's testing protocol states.

## Summary by severity

| Severity | Count | Criteria |
|----------|-------|----------|
| Major    | 2     | F-01, F-02 (contrast failures) |
| Major    | 1     | F-03 (new-window change of context) |
| Minor    | 1     | F-04 (tap target size for text links) |
| Minor    | 1     | F-05 (abbreviations not expanded) |
| Minor    | 1     | F-06 (Safari list semantics) |
| Advisory | 3     | V-01, V-02, V-03 (brand compliance) |

## Functional tests

### F-FUNC-01: Skip link

A skip link `<a href="#main-content" class="skip-link">Skip to main content</a>` is present. It targets `<main id="main-content">`. The link is visually hidden off-screen and becomes visible on focus via `top: 0`. The target landmark exists. Pass.

### F-FUNC-02: Theme toggle

The theme toggle button reads the user's `prefers-color-scheme` preference and any stored `localStorage` value on page load. The `aria-label` is set to "Switch to dark mode" in the HTML. JavaScript calls `syncToggle()` on load to correct the label to match the actual current theme. The label updates correctly on each toggle. The icon SVGs are `aria-hidden="true"` and `focusable="false"`. The visible label span is `aria-hidden="true"`. The button's accessible name comes from `aria-label` alone, which is kept current by the script. Pass.

One edge case noted: the hardcoded `aria-label="Switch to dark mode"` in the HTML is wrong if the page loads in dark mode (for example, if `localStorage` has `td-theme=dark`). The mismatch is corrected when `syncToggle()` runs, but there is a brief period between DOM parse and script execution where a screen reader could read the stale label. This is a very short window and not treated as a failure here, but it is noted.

### F-FUNC-03: Navigation and page structure

The page has a `<header>` (implicit `role="banner"`), `<main id="main-content">` (implicit `role="main"`), and `<footer>` (implicit `role="contentinfo"`). Landmark structure is present and correct. The `<h1>` is "Tim Dixon's Projects". Card headings are `<h2>`. Heading order is H1 then H2 with no skipped levels. Pass.

### F-FUNC-04: Language

`<html lang="en-GB">` is set correctly. Pass.

### F-FUNC-05: Page title

`<title>Tim Dixon's Projects</title>` is descriptive. Pass.

### F-FUNC-06: Keyboard navigation

From code inspection: all interactive elements are natively focusable (`<a>` and `<button>`). The theme toggle has `min-height: 44px; min-width: 44px`. Focus styles are defined in `:focus-visible` (3px outline, 3px offset) and overridden specifically for the theme toggle. The `prefers-reduced-motion` media query disables transitions. No JavaScript-driven focus traps detected. Keyboard navigation appears sound from static analysis; confirm with live keyboard test.

### F-FUNC-07: Reduced motion

`@media (prefers-reduced-motion: reduce)` sets `animation-duration: 0.01ms !important; transition-duration: 0.01ms !important`. Covers all animations and transitions sitewide. Pass.

## Accessibility tests

### F-01: Contrast failure — muted text in light mode (major)

Criterion: 1.4.6 Contrast Enhanced, Level AAA. Required ratio: 7:1 for normal text.

In light mode, `--fg-muted: #4b5563` is used on `--bg: #f4f6f8` for card paragraph text and the footer muted text. Calculated relative luminances: `#4b5563` = 0.08956, `#f4f6f8` = 0.9096. Contrast ratio: (0.9096 + 0.05) / (0.08956 + 0.05) = 0.9596 / 0.13956 = 6.88:1.

This falls below the 7:1 AAA threshold and also marginally misses it at AA (where 4.5:1 is required, so it does pass AA, but AAA requires 7:1 and it does not reach that). Severity: major. The muted colour is used for every card description paragraph and for the footer, making it a widespread failure.

Affected elements: `.card p` (all eight card descriptions) and `.app-footer`.

Recommendation for rework: darken `--fg-muted` in light mode from `#4b5563` to approximately `#374151` or darker to reach 7:1 against `#f4f6f8`.

### F-02: Contrast failure — card link text in dark mode (major)

Criterion: 1.4.6 Contrast Enhanced, Level AAA. Required ratio: 7:1 for normal text (card links are 1.1rem, not large text).

In dark mode, `--accent: #FF7C00` is the link colour and `--bg-card: #0d2040` is the card background. Calculated relative luminances: `#FF7C00` = 0.35428, `#0d2040` = 0.014581. Contrast ratio: (0.35428 + 0.05) / (0.014581 + 0.05) = 0.40428 / 0.064581 = 6.26:1.

This falls below the 7:1 AAA threshold. It passes AA (4.5:1). Severity: major. All eight card heading links fail AAA in dark mode.

Affected elements: `.card h2 a` in dark mode (`[data-theme="dark"]`).

Recommendation for rework: lighten the orange accent for dark mode, or darken the card background, to achieve 7:1. For example, `#FF8C1A` has L ≈ 0.404 and still gives approximately 6.3:1, so a more significant adjustment is needed. Alternatively, use white `#ffffff` for card link text in dark mode and reserve orange for decorative or large-text use only.

Note: the brand.md states orange works only on dark backgrounds. The card background `#0d2040` is dark but not the full navy `#061528`. The brand-approved pairing is orange on navy — if the card background matched navy, the ratio would be orange `#FF7C00` on `#061528` = 7.23:1, which passes AAA. The issue is that the card sits slightly lighter than the page background.

### F-03: New window opened without warning (major)

Criterion: 3.2.5 Change on Request, Level AAA. Also relevant: 2.4.4 Link Purpose In Context (Level A) — the lack of context about new-window behaviour reduces link purpose clarity.

The footer link `<a href="https://timdixon.net" target="_blank" rel="noopener noreferrer">© Tim Dixon</a>` opens in a new browser tab without any indication to the user. Opening a new browsing context is a change of context. WCAG 3.2.5 requires that changes of context happen only when the user requests them and are predictable. A screen reader user who is not warned will find themselves in a new tab without warning and may not know where they have gone.

Recommendation for rework: add visually hidden text "opens in new window" within the link, for example: `<a href="https://timdixon.net" target="_blank" rel="noopener noreferrer">© Tim Dixon <span class="visually-hidden">(opens in new window)</span></a>`.

### F-04: Tap target size insufficient for text links (minor)

Criterion: 2.5.5 Target Size (Enhanced), Level AAA. Required: 44 by 44 CSS pixels.

The project links are inline `<a>` elements inside `<h2>` headings at 1.1rem (approximately 17.6px). Their tap target height is constrained by the line-height (1.6 × 17.6 ≈ 28px) and their width is constrained to the link text. The link "LLBS" is especially narrow. None of these links has padding added to expand the hit area beyond the text bounds.

The theme toggle meets this criterion with `min-height: 44px; min-width: 44px`.

Recommendation for rework: add padding to the `<h2> a` links (e.g. `padding: 8px 4px`) to increase the click or touch area to at least 44 × 44px, using negative margins if needed to preserve visual layout.

### F-05: Abbreviations not expanded (minor)

Criteria: 3.1.4 Abbreviations, Level AAA, and 3.1.3 Unusual Words, Level AAA.

Two abbreviations appear in the page content without expansion:

1. "LLBS" is used as both a standalone card heading link and within the description "A braille name generator built for the Lincoln and Lindsey Blind Society." The link text "LLBS" (the standalone card) appears without any expansion, and the card heading "LLBS Braille Name Generator" uses the abbreviation unexpanded in the `<h2>` and link text. A screen reader user browsing the links list will hear "LLBS" without knowing what it means.

2. "UEB" appears in "An accessible braille reference for UEB Grade 1 and Grade 2." UEB stands for Unified English Braille. No expansion is provided inline.

Recommendation for rework: use `<abbr title="Lincoln and Lindsey Blind Society">LLBS</abbr>` and `<abbr title="Unified English Braille">UEB</abbr>` on first occurrence. Note that VoiceOver and JAWS do not consistently announce `title` attributes on `<abbr>`, so also consider spelling out the full form on first use in visible text, for example "LLBS (Lincoln and Lindsey Blind Society)" or rewriting card descriptions to introduce the expansion.

### F-06: List semantics stripped by CSS in Safari and VoiceOver (minor)

Criterion: 1.3.1 Info and Relationships, Level A. Also relevant to 4.1.2 Name, Role, Value, Level A.

The project grid `<ul class="project-grid">` has CSS `list-style: none; padding: 0; margin: 0`. In Safari, VoiceOver removes the list role from a `<ul>` that has `list-style: none`, treating it as a generic group rather than a list. This means VoiceOver users on macOS (Tim's primary pairing) will not hear "list, 8 items" and will not be able to navigate the items as a list.

This is a known browser behaviour rather than a WCAG failure in the strict sense, but it does break the intended semantics for Tim's primary screen reader.

Recommendation for rework: add `role="list"` to the `<ul>` to restore list semantics explicitly, overriding Safari's behaviour.

### Passing criteria (selected)

The following criteria were assessed and pass from code inspection:

- 1.1.1 Non-text Content (A): no images on the page. SVG icons are `aria-hidden="true"`. Pass.
- 1.3.1 Info and Relationships (A): semantic HTML used throughout. Headings, lists, landmarks present. Subject to F-06 above for Safari.
- 1.3.2 Meaningful Sequence (A): DOM order matches reading order. Pass.
- 1.4.1 Use of Colour (A): no information conveyed by colour alone. Pass.
- 1.4.3 Contrast Minimum (AA): body text and headings in both modes meet 4.5:1. Pass.
- 1.4.4 Resize Text (AA): relative units (`rem`, `em`) used for font sizes. Pass.
- 1.4.10 Reflow (AA): responsive grid with `auto-fill, minmax(300px, 1fr)` and single-column at 640px. Pass.
- 1.4.12 Text Spacing (AA): no fixed-height text containers detected. Pass.
- 2.1.1 Keyboard (A): all interactive elements are natively keyboard-operable. Pass.
- 2.1.2 No Keyboard Trap (A): no custom widget or focus trap code. Pass.
- 2.1.3 Keyboard No Exception (AAA): no mouse-only features. Pass.
- 2.4.1 Bypass Blocks (A): skip link present and functional. Pass.
- 2.4.2 Page Titled (A): `<title>Tim Dixon's Projects</title>`. Pass.
- 2.4.4 Link Purpose in Context (A): card links are descriptive in context of card heading. Pass.
- 2.4.7 Focus Visible (AA): `:focus-visible` outline defined. Pass.
- 2.4.11 Focus Not Obscured Minimum (AA): no sticky headers or overlapping elements. Pass.
- 2.4.12 Focus Not Obscured Enhanced (AAA): no sticky headers. Pass.
- 2.4.13 Focus Appearance (AAA): 3px outline at 3px offset. Light mode: navy `#061528` outline against `#f4f6f8` background gives 18.8:1, well above the 3:1 minimum. Dark mode: orange `#FF7C00` outline against `#061528` gives 7.23:1. Both pass.
- 2.5.3 Label in Name (A): the theme toggle `aria-label` matches the visible `.theme-toggle-label` text content (both controlled by `syncToggle()`). Pass.
- 3.1.1 Language of Page (A): `lang="en-GB"`. Pass.
- 3.2.1 On Focus (A): no context changes on focus. Pass.
- 3.2.2 On Input (A): no context changes on input without warning. Pass.
- 3.3.7 Redundant Entry (A): no forms. Pass.
- 4.1.2 Name, Role, Value (A): native elements used throughout. The theme toggle is a `<button>` with correct `aria-label`. SVG icons are `aria-hidden`. Pass.

## Visual checks

### V-01: Font stack does not prioritise brand typeface (advisory)

The brand reference (`docs/brand.md`) specifies Arial or Inter for web use. The body `font` declaration uses `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`. Arial appears as a sixth-priority fallback; Inter is not referenced at all. On most systems the rendered font will be a system UI face such as San Francisco (macOS), Segoe UI (Windows), or Roboto (Android) rather than Arial. This is a brand compliance deviation.

Severity: advisory. The brand style is recognisable from its colour palette even without the specified typeface, and system fonts render clearly. Flagged for consideration when Sean adds the team's repository configuration.

### V-02: Card shadow and header gradient contradict brand style (advisory)

The brand reference states "minimalist flat vector: clean geometric shapes, no gradients or shadows or textures". The page uses `box-shadow` on cards (`--shadow` variable) and a `linear-gradient` on the `::after` pseudo-element of the header. Both contradict the brand's flat design requirement.

Severity: advisory. These are visual refinements that Tim may choose to keep or remove; they do not affect accessibility. Flagged for a conscious decision.

### V-03: Spelling inconsistency in link text (advisory)

The card heading "LLBS Braille Name Generator" has `href="/LLBS-Braile-Name-Generator"` (path spells "Braile" with one "l"). The link text and card description both spell "Braille" correctly. The broken path may cause a 404 error; this is a functional concern as well as a visual one.

Severity: advisory (the broken path is in the existing live site, outside the scope of this audit to fix, but worth flagging). Tim should confirm whether the repository path actually matches the URL used in production.

## Questions for Tim (batched)

No questions requiring Tim's decision arise from this audit. The findings are clear enough to route to Sean for rework without needing Tim's clarification. Sonja should review whether the dark-mode contrast fix for card links conflicts with the brand's orange-on-dark pairing and decide whether an exception record is appropriate.

## Automated testing note

Pa11y and axe-core runs were not completed in this session because starting a local HTTP server required Bash execution that was denied. The code-inspection audit above covers all findings detectable from static analysis. To complete the automated portion of the protocol, the following commands should be run when serve-and-test permissions are available:

```
npx pa11y --standard WCAG2AAA http://localhost:PORT/
npx axe http://localhost:PORT/ --chrome-options="--no-sandbox"
```

Both tools should be run against the served page in both light and dark modes (by setting `localStorage.setItem('td-theme','dark')` in the browser before the axe run).

## Usage

- Duration: single session, 2026-05-21.
- Tool calls: approximately 8 (Read and Bash calls).
- Tokens: within normal Sonnet 4.6 session usage; no Opus escalation needed.
- No repository files were modified. Audit is read-only.
