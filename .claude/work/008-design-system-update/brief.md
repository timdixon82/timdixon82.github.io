# Brief: 008-design-system-update

## Summary

Apply the Tim Dixon Design System (version 2026-06-08b) to the site for the first time, and update the project card listing to include all public GitHub repositories.

- Status: done
- Branch: feat/design-system-update
- Priority: 8
- Blockers: None
- Mockup mode: C (no mockup — build directly from design system components)

## Out of scope

- Changes to any sub-project repositories (Periodic-Table, Clock-Practice, LLBS, etc.)
- Any new page structure or navigation beyond the existing single-page index
- Analytics script changes
- The Content Security Policy (CSP) meta tag — leave as-is

## Risk and rollback

Low risk. Changes are CSS and asset additions; HTML structure is preserved. Rollback: revert the feature branch before merge. The live site is not affected until Tim approves the merge.

The Roboto font is self-hosted; no external network requests are introduced.

## Definition of done

- [ ] `assets/colors_and_type.css` present, copied from AgentTeam source (ds-version 2026-06-08b)
- [ ] `assets/theme.js` present, copied from AgentTeam source
- [ ] `assets/fonts/Roboto-VariableFont.ttf`, `Roboto-Italic-VariableFont.ttf`, and `OFL.txt` present
- [ ] `theme.js` is the first script in `<head>`, before any stylesheet link
- [ ] `colors_and_type.css` is linked in `<head>` after `theme.js`
- [ ] Inline `<style>` block stripped of CSS custom property definitions (now provided by colors_and_type.css); page-specific layout and component styles remain
- [ ] No hardcoded old hex values remain (`#061528`, `#FF7C00`, `#63D2FF`)
- [ ] Theme toggle updated to support all four themes: light, dark, muted-light, muted-dark
- [ ] All 11 public projects listed as cards (see project list below)
- [ ] Carol signs off: WCAG 2.2 AAA, axe-core, Pa11y, no regressions

## Pre-approved GitHub actions

- [x] Create a branch
- [x] Commit to a branch
- [x] Push a branch (not main)
- [x] Open a pull request
- [x] Comment on a pull request or issue
- [x] Create an issue

## Project card list (11 projects)

All cards link to the project's live URL where one exists, otherwise to the GitHub repository.

1. **Braille Reference** — An accessible braille reference for UEB (Unified English Braille) Grade 1 and Grade 2. Link: `/Braille-Reference`
2. **Clock Practice** — An interactive HTML page for practising telling the time with an analogue clock. Link: `/Clock-Practice`
3. **Image Colour Contrast Checker** — A tool for checking colour contrast ratios within images. Link: `https://timdixon82.github.io/Image-Colour-Contrast-Checker/`
4. **LLBS Braille Name Generator** — A braille name generator built for LLBS (Lincoln and Lindsey Blind Society). Link: `https://projects.timdixon.net/LLBS-Braille-Name-Generator/`
5. **LLBS Living Well Together Strategy** — The Living Well Together Strategy site for LLBS (Lincoln and Lindsey Blind Society). Includes the LLBS Photo Brander tool. Link: `/LLBS`
6. **Periodic Table** — An accessible interactive periodic table. Link: `/Periodic-Table`
7. **Poop Breakout** — A poop-themed Breakout game. Link: `/Poop-Breakout`
8. **Social Media Accessibility Checker** — A browser extension to check a post's accessibility, including colour contrast in images. Link: `/Social-Media-Accessibility-Checker-Extension`
9. **Sophie's Escape: The Witch's Castle** — A first-person browser 3D puzzle adventure. Ten rooms, inventory and hint system, full keyboard and touchscreen support, WCAG 2.2 AAA accessibility target. Link: `https://github.com/timdixon82/sophies-escape-witchs-castle`
10. **SWOT Builder** — A guided SWOT analysis interview that runs entirely in your browser. No server, no account, no data leaving your device. Link: `https://github.com/timdixon82/SWOT-Builder`
11. **James Nerf Squad** — A platform game where you play James and lead a nerf squad through missions against big bosses. Link: `https://github.com/timdixon82/James-Nerf-Squad`

## Design system source files

All from `/Users/timdixon/Code/AgentTeam/docs/design-system/`:

| File | Source path |
|---|---|
| Colour and type tokens | `tokens/colors_and_type.css` |
| Theme bootstrap | `tokens/theme.js` |
| Roboto upright font | `fonts/Roboto-VariableFont.ttf` |
| Roboto italic font | `fonts/Roboto-Italic-VariableFont.ttf` |
| Font licence | `fonts/OFL.txt` |

Full adoption guidance: `/Users/timdixon/Code/AgentTeam/docs/patterns/design-system-adoption.md`

## Font path note

`colors_and_type.css` uses `url('fonts/…')` relative to itself. Place the CSS at `assets/colors_and_type.css` and the fonts at `assets/fonts/` so the relative path resolves correctly. Update the `@font-face` src lines in the copied CSS if the directory layout differs.

## Theme toggle note

The current toggle is a two-state light/dark button. The updated toggle should expose all four themes. Recommended pattern: two separate accessible toggle buttons in the header.

- Button 1 (existing): "Switch to dark mode" / "Switch to light mode" — calls `window.tdTheme.toggleMode()`
- Button 2 (new): "Switch to muted colours" / "Switch to vivid colours" — calls `window.tdTheme.toggleFamily()`

Both buttons must meet the 44px minimum touch target, have clear `aria-label` text that reflects the current state, and be keyboard operable.
