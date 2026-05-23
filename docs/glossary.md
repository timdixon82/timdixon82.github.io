# Project Glossary

Terms specific to the `timdixon82/timdixon82.github.io` project. For team-wide terms, see the global wiki glossary at `AgentTeam/docs/glossary.md`.

## CNAME file

A one-line text file in the repository root containing the custom domain name. GitHub Pages reads this file and serves the site at that domain. In this repository the file contains `projects.timdixon.net`. Because this is the GitHub user site, the custom domain applies to the whole account: every project page below this repository also receives the `projects.timdixon.net` domain. See [ADR 003](decisions/003-hosting-domain-headers.md).

## GitHub user site

A special GitHub Pages repository named `<username>.github.io`. GitHub serves one user site per account, at the account root. Every project repository's GitHub Pages site is served at a path below the user site. `timdixon82.github.io` is Tim's user site. It is the root of the path namespace and the owner of the custom domain for the whole project family.

## LLBS

Lincoln and Lindsey Blind Society. A charity whose name appears in two project cards on this page: the "LLBS Braille Name Generator" card, and the "LLBS" card. Both abbreviations should be expanded on first use in the page content; see [todo item 4](../todo.md).

## Project card

One entry in the grid on `index.html`. Each card has a heading (the project name, as a link) and a short description. The card grid lists Tim's public projects and links each one to its sub-page under `projects.timdixon.net`.

## td-theme

The `localStorage` key the page uses to remember the user's chosen colour theme. The value is either the string `"light"` or the string `"dark"`. It is not personal data under the United Kingdom General Data Protection Regulation (UK GDPR) because it is a display preference that never leaves the user's own device.

## UEB

Unified English Braille. The standard Braille code used in English-speaking countries. Appears in the Braille Reference card description. The abbreviation should be expanded on first use in the page content; see [todo item 4](../todo.md).
