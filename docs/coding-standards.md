# Coding Standards: timdixon82.github.io

## Standards that apply here

The full coding standard is in the global wiki at `AgentTeam/docs/coding-standards.md`. This project follows every rule in that document. The stack-specific rules for a static HTML, CSS, and JavaScript project are in `AgentTeam/docs/stacks/static-front-end.md`. Both documents apply here without exception.

This page records only what is specific to this project.

## Project-specific notes

### Single-file architecture will be split

The current `index.html` holds HTML structure, CSS in a `<style>` block, and JavaScript in two inline `<script>` blocks. The global standard requires these three concerns to be in separate files. The split is scheduled as named follow-up work after this adoption (see [ADR 001](decisions/001-file-structure.md)).

The split is a refactor only. It must not change the page's behaviour, appearance, or accessibility.

### No external dependencies

This project has zero third-party dependencies at present: no external JavaScript libraries, no web fonts loaded from a third-party origin, and no external images. The team's standard is to keep it that way. Any future dependency follows the rules in [ADR 004](decisions/004-dependency-posture.md).

### Security response headers via meta tags

GitHub Pages cannot send custom HTTP response headers. The project delivers the Content-Security-Policy and Referrer-Policy through `<meta>` tags in `index.html`. Two headers cannot be delivered at all on this host; they are recorded as exceptions. See [ADR 003](decisions/003-hosting-domain-headers.md) and the [security exception record](exceptions/security-header-gaps.md).

### Analytics

Tim has decided that analytics are added to all projects, including this landing page (decision Q21). The team's analytics tool is GoatCounter, following the canonical pattern in `AgentTeam/docs/patterns/goatcounter-analytics.md`. The tracker code for this project is requested from Tim before the setup-build pull request is opened. Adding the snippet is Sean's task during the setup build.

### Contact link

Tim has decided to add a contact link pointing to `https://www.timdixon.net/contact/`. Adding this link is Sean's task during the setup build (decision Q22).

### Version string

Every repository must carry a `VERSION` file at the root, per the global coding standard. This file does not exist yet; adding it is part of the setup-build work.

### README

The repository has no README at present. The global standard requires one. Adding a README is part of the setup-build work.
