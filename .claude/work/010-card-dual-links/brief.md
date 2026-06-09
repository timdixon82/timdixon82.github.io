# Brief: 010-card-dual-links

## Summary

Update every project card in `index.html` to show two links: a live site link (GitHub Pages URL) and a GitHub repository link. Cards with no GitHub Pages URL show only the GitHub repository link.

- Status: done
- Branch: feat/card-dual-links
- Priority: 8
- Blockers: None

## Out of scope

- Any changes to CSS tokens, fonts, or design system files
- Adding or removing project cards
- Changes to any other file beyond `index.html`

## Risk and rollback

Low. HTML-only change. Rollback: revert before merge.

## Definition of done

- [ ] Every card h2 is plain text (not a link)
- [ ] Every card has a `.card-links` section after the description paragraph
- [ ] Cards with a Pages URL show a "Live site" link and a "GitHub" link
- [ ] Cards without a Pages URL show only a "GitHub" link
- [ ] All links have descriptive `aria-label` attributes giving the project name in context
- [ ] External links (GitHub repo, and any Pages URL not on projects.timdixon.net) carry `target="_blank" rel="noopener noreferrer"` and a visually-hidden "(opens in new window)" span
- [ ] `.card-links` CSS added to the inline style block
- [ ] WCAG 2.2 AAA passes with axe-core and Pa11y
- [ ] Carol signs off

## Pre-approved GitHub actions

- [x] Create a branch
- [x] Commit to a branch
- [x] Push a branch (not main)
- [x] Open a pull request
- [x] Comment on a pull request or issue
- [x] Create an issue

## Card link data (confirmed from GitHub API)

| Card | Live site URL | GitHub repo URL |
|---|---|---|
| Braille Reference | `https://projects.timdixon.net/Braille-Reference/` | `https://github.com/timdixon82/Braille-Reference` |
| Clock Practice | `https://projects.timdixon.net/Clock-Practice/` | `https://github.com/timdixon82/Clock-Practice` |
| Image Colour Contrast Checker | `https://timdixon82.github.io/Image-Colour-Contrast-Checker/` | `https://github.com/timdixon82/Image-Colour-Contrast-Checker` |
| James Nerf Squad | `https://projects.timdixon.net/James-Nerf-Squad/` | `https://github.com/timdixon82/James-Nerf-Squad` |
| LLBS Braille Name Generator | `https://projects.timdixon.net/LLBS-Braille-Name-Generator/` | `https://github.com/timdixon82/LLBS-Braille-Name-Generator` |
| LLBS Living Well Together Strategy | `https://projects.timdixon.net/LLBS/` | `https://github.com/timdixon82/LLBS` |
| Periodic Table | `https://projects.timdixon.net/Periodic-Table/` | `https://github.com/timdixon82/Periodic-Table` |
| Poop Breakout | `https://projects.timdixon.net/Poop-Breakout/` | `https://github.com/timdixon82/Poop-Breakout` |
| Social Media Accessibility Checker | (none) | `https://github.com/timdixon82/Social-Media-Accessibility-Checker-Extension` |
| Sophie's Escape: The Witch's Castle | `https://projects.timdixon.net/sophies-escape-witchs-castle/` | `https://github.com/timdixon82/sophies-escape-witchs-castle` |
| SWOT Builder | `https://projects.timdixon.net/SWOT-Builder/` | `https://github.com/timdixon82/SWOT-Builder` |
