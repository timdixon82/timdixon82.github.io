# ADR 001: File structure

## Status

Proposed. Recorded by Jacob (architect) on 2026-05-21, during work 007-timdixon-site-setup. The timing of the file split is settled by the team's standing standard (see Context below).

## Context

`index.html` holds HTML structure, CSS in a `<style>` block of about 215 lines, and JavaScript in two inline `<script>` blocks. The static front-end stack standard requires the three concerns to be in separate files.

This is the third time the team has met this gap in an adopted project. The team's standing standard in the global wiki at `AgentTeam/docs/decisions/006-adopted-static-project-standards.md` (standard 1) settles the question: single-file adopted projects are split as part of their setup. The timing is no longer a per-project question.

There is one detail specific to this page. The theme bootstrap at lines 9 to 16 must stay running in the `<head>`, before the page paints, or the page will flash the wrong theme on load. When the script moves to `js/theme.js`, it is referenced from the `<head>` as a render-blocking `<script>` (no `defer`), and the toggle-wiring code either guards for the button's presence or runs from a `DOMContentLoaded` handler.

## Decision

Split `index.html` into three files:

- `index.html`: the page structure only.
- `css/styles.css`: all presentation, moved from the `<style>` block.
- `js/theme.js`: all behaviour, moved from both `<script>` blocks.

The split is a refactor only. It must not change the page's behaviour, its appearance, or its accessibility. The theme bootstrap must stay render-blocking in the `<head>` so the no-flash behaviour survives. This is a note for Sean and for Carol's regression check.

This split is also a precondition for the stricter Content-Security-Policy in ADR 003. While the page is a single file, the policy must allow `'unsafe-inline'` for scripts and styles.

## Alternatives considered

Keeping the single-file layout permanently. Rejected. A permanent recorded exception is worse than doing the refactor once. A single file prevents the lint tools from running on the CSS and JavaScript, prevents separate browser caching, and makes the Content-Security-Policy weaker.

Splitting into many feature files. Rejected as premature. The page is one feature with one behaviour. Three files match it.

## Consequences

- Sean carries out the split as a `refactor` change. Carol's regression check confirms the page, including the no-flash theme load, is unchanged.
- The browser can cache `css/styles.css` and `js/theme.js` separately from `index.html`.
- The stricter Content-Security-Policy in ADR 003 becomes achievable once the split is done.
