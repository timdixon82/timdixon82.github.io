# Business Analysis: timdixon82.github.io (projects.timdixon.net)

## Purpose

This document reverse-engineers the requirements and acceptance criteria for Tim Dixon's project landing page at `projects.timdixon.net`. It covers the site's purpose, its intended users, its functional and non-functional requirements, and notes on personal data.

## Site Purpose

The site is a single-page index of Tim's public web projects. It is served at `projects.timdixon.net` via GitHub Pages and acts as the landing point above the individual project pages such as Periodic Table, Clock Practice, and the LLBS tools. Its job is to let any visitor find and reach any listed project in one step.

## Target Users

Three groups are likely to use this page.

1. Tim Dixon himself, as the site's author, who may share links with others or return to the page as a navigation hub. Tim is severely sight-impaired and uses VoiceOver on macOS and JAWS on Windows.
2. Members of the disability and assistive technology communities who follow Tim's work. Many in this group will use screen readers or other assistive technology.
3. General members of the public who arrive via a search engine, a shared link, or a social media reference, and want to explore accessible, interactive web tools.

## Functional Requirements

Requirements are numbered and written as conditions the site must satisfy.

### Navigation and Routing

1. The page must display a list of all current projects as navigable links.
2. Each project link must open the corresponding project sub-page within the same GitHub Pages domain.
3. The page must include a skip-to-main-content link that moves keyboard focus past the site header to the project list.
4. The theme-toggle control must be reachable and operable from the keyboard alone.

### Project Listing Content

5. Each project card must display the project's name as its heading.
6. Each project card must display a short, plain-language description of what the project does.
7. The list of projects shown must match the live sub-pages deployed under the `timdixon82` GitHub organisation at any given time. (See open questions: the current list may be incomplete or stale.)

### Theme Switching

8. The page must respect the operating system or browser `prefers-color-scheme` setting on first load.
9. The user must be able to switch between light mode and dark mode by activating the theme-toggle button.
10. The user's theme choice must be remembered across page loads within the same browser, using the `td-theme` key in `localStorage`.
11. When the operating system colour scheme changes and no manual preference has been saved, the page must update its theme to match.

### Footer

12. The footer must display a copyright attribution that links to Tim's main website at `timdixon.net`. The link must open in a new tab and must carry `rel="noopener noreferrer"`.

## Non-Functional Requirements

### Accessibility

13. The page must conform to the Web Content Accessibility Guidelines (WCAG) 2.2 at AAA. This is the team's unconditional baseline.
14. The page must have a single, descriptive `<title>` element that names the page's purpose.
15. The HTML `lang` attribute must be set correctly. The current value is `en-GB` and must be maintained.
16. The document must use one `<h1>` element, with subsequent headings at `<h2>` level, and no skipped levels.
17. Every image, icon, and SVG that conveys information must have a text alternative. Decorative SVGs must carry `aria-hidden="true"`.
18. The theme-toggle button must carry an `aria-label` that describes the action it will perform: "Switch to dark mode" when in light mode, and "Switch to light mode" when in dark mode.
19. The skip link must become visible on keyboard focus.
20. Focus indicators must meet the WCAG 2.2 AAA focus appearance criterion (2.4.13): a visible focus ring of sufficient size and contrast.
21. Minimum touch and pointer target size for interactive elements must be 44 by 44 CSS pixels (2.5.5 Target Size Enhanced, AAA).
22. Animations and transitions must be suppressed when the user has set `prefers-reduced-motion: reduce`.
23. Colour contrast for body text must meet the enhanced ratio of 7 to 1 (1.4.6 Contrast Enhanced, AAA).
24. Colour contrast for large text and user interface components must meet at least 4.5 to 1.

### Performance and Hosting

25. The page must load without any external network requests, scripts, fonts, or stylesheets; all styles and scripts are inline. This keeps load fast and removes any third-party dependency.
26. The site must be served over HTTPS at `projects.timdixon.net`, confirmed by the CNAME file.

### Security

27. The page must not include any third-party scripts. No external JavaScript is loaded; all behaviour is inline.
28. The footer link that opens `timdixon.net` must carry `rel="noopener noreferrer"` to prevent reverse tabnapping.

### Maintainability

29. When a new project sub-page is published under the same GitHub Pages domain, the project list in `index.html` must be updated to include it.
30. The site must be maintained in the `timdixon82/timdixon82.github.io` public repository on GitHub. GitHub Pages will serve from the default branch.

## Acceptance Criteria

Each criterion below can be tested as true or false.

### User story 1: Finding and reaching a project

As a visitor, I want to see a list of all available projects with short descriptions, so that I can choose the right project and open it in one action.

- [ ] The page renders a visible list of projects with at least the eight projects shown in the current `index.html`.
- [ ] Each project card contains a heading with the project's name.
- [ ] Each project card contains a description of what the project does.
- [ ] Activating a project card link navigates to the correct project URL.
- [ ] All project links are operable from the keyboard using the Tab and Enter keys, with no mouse interaction required.

### User story 2: Skipping past repeated navigation

As a screen reader or keyboard user, I want a skip-to-main-content link at the top of the page, so that I can reach the project list without moving through the header on every visit.

- [ ] A skip link is the first focusable element in the page.
- [ ] The skip link is visually hidden until it receives keyboard focus, then becomes visible.
- [ ] Activating the skip link moves keyboard focus to the `#main-content` element.
- [ ] VoiceOver on macOS and JAWS on Windows announce the skip link correctly.

### User story 3: Choosing a colour theme

As a user, I want to switch between light and dark colour modes, so that the page suits my visual needs or environment.

- [ ] On first load, the page matches the operating system colour scheme preference.
- [ ] Activating the theme-toggle button switches the page between light and dark mode.
- [ ] The page retains the chosen theme after a reload.
- [ ] The button's `aria-label` text accurately describes the action the button will perform (not the current state).
- [ ] When no preference has been stored and the operating system colour scheme changes, the page updates without a reload.
- [ ] The button is reachable and activatable from the keyboard.
- [ ] In both light and dark themes, body text contrast meets the AAA enhanced ratio of 7 to 1.

### User story 4: Understanding who made the site

As a visitor, I want to see a clear attribution to Tim Dixon in the footer, with a link to his main website, so that I know who is responsible for the page.

- [ ] The footer contains the text "Tim Dixon" or equivalent attribution.
- [ ] The footer link navigates to `https://timdixon.net`.
- [ ] The link opens in a new tab.
- [ ] The link carries `rel="noopener noreferrer"`.

### User story 5: Accessible to screen reader users

As a screen reader user, I want the page structure to be correct and announced consistently, so that I can understand and navigate the content using my assistive technology.

- [ ] The page `<title>` is "Tim Dixon's Projects" or equivalent and is announced on load.
- [ ] The `lang` attribute on `<html>` is set to `en-GB`.
- [ ] One `<h1>` element is present with no skipped heading levels below it.
- [ ] The project list is a `<ul>` element with `<li>` items, so a screen reader announces the list structure.
- [ ] All SVG icons that are decorative carry `aria-hidden="true"`.
- [ ] All interactive controls have a programmatically determined, meaningful accessible name.
- [ ] A manual screen reader pass using VoiceOver with Safari on macOS produces no unexpected announcements.
- [ ] A manual screen reader pass using JAWS with Chrome on Windows produces no unexpected announcements.

## Personal Data

The current site does not collect, store, or transmit any personal data. It has no forms, no analytics scripts, no cookies, and no server-side processing. The only data written to the browser is the `td-theme` key in `localStorage`, which records only the user's chosen colour theme (the string `"light"` or `"dark"`). This is not personal data under the United Kingdom General Data Protection Regulation (UK GDPR) because it is a UI preference, not information about an identifiable person. No UK GDPR obligations apply to the current site.

If analytics or contact forms are added in future, this assessment must be revisited.

## Open Questions for Tim

The following questions need Tim's input before requirements can be finalised. These will be relayed to Tim by Sonja.

1. The current project list in `index.html` contains eight entries. Are all eight projects live and should all remain listed? Specifically: the "LLBS" card links to `/LLBS` and describes itself as "LLBS Repo for LLBS Projects", which does not tell a visitor what the project does. Should this card be retained as-is, removed, or given a more helpful description?

2. Are there any projects not currently listed that should appear on the page?

3. The "Poop Breakout" card describes a game. Should this remain on the public-facing landing page, or is it intended only as a personal or demonstration project?

4. The site currently has no analytics. Should any privacy-respecting, cookie-free analytics (for example Plausible or Fathom) be added to track how often the site is visited?

5. Should the page include any mechanism for visitors to contact Tim, for example a link to his email address or a contact form?

## Notes for Downstream Agents

- Simon (designer): the colour palette uses navy `#061528`, orange `#FF7C00`, and blue `#63D2FF`. The dark theme swaps the accent to orange on a dark navy background. Contrast ratios for these combinations should be verified against the AAA 7:1 threshold for body text and 4.5:1 for large text and UI components.
- Carol (tester): automated axe-core and Pa11y scans should be run at WCAG 2.2 AAA level. Manual screen reader passes are required on VoiceOver with Safari and JAWS with Chrome.
- Jacob (architect): the site is a single static HTML file with no build step and no external dependencies. Any architecture work should preserve this simplicity unless a clear reason to introduce tooling is identified.
