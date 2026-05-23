# Project Wiki: timdixon82.github.io

This wiki documents the `timdixon82/timdixon82.github.io` repository, the project-index landing page served at `projects.timdixon.net`. It is the root of the GitHub Pages path namespace for Tim Dixon's project family.

## How this wiki works

The project wiki follows the same layout as the global wiki in the AgentTeam `docs/` folder. Pages here are project-specific. Where a page cites the global wiki, it means the rule or standard applies across all projects, not only this one.

## Pages in this wiki

### Standards and process

- [Coding standards](coding-standards.md): project-specific coding notes; cites the global standard.
- [Accessibility](accessibility.md): project-specific accessibility notes and known gaps.
- [Release process](release-process.md): branching, pull requests, and the merge gate for this project.

### Reference

- [Glossary](glossary.md): terms specific to this project.
- [Log](log.md): chronological record of operations. Append-only.

### Decisions

Architecture Decision Records for this project, in the order Jacob recorded them.

- [ADR 001: File structure](decisions/001-file-structure.md)
- [ADR 002: No build step](decisions/002-no-build-step.md)
- [ADR 003: GitHub Pages hosting, custom domain, and security headers](decisions/003-hosting-domain-headers.md)
- [ADR 004: Dependency posture](decisions/004-dependency-posture.md)

### Exceptions

Security and accessibility gaps that have been assessed and accepted. The GitHub Pages security-header exception is covered by the team's standing exception, approved by Tim on 2026-05-23.

- [GitHub Pages security-header gap](exceptions/github-pages-headers.md): pointer to the team's standing exception in the global wiki.

### Outstanding items

- [Todo list](../todo.md): items outstanding from the setup backfill and items deferred for later phases.

## Stack

Static front-end: HyperText Markup Language (HTML), Cascading Style Sheets (CSS), and JavaScript. Served from the `main` branch via GitHub Pages. Custom domain: `projects.timdixon.net` (owned by the `CNAME` file in this repository). See [ADR 003](decisions/003-hosting-domain-headers.md) for the hosting and domain architecture.
