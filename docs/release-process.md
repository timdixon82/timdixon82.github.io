# Release Process: timdixon82.github.io

## Standard that applies

The team's release process is defined in the global wiki at `AgentTeam/docs/release-process.md`. This project follows every step in that document: branches, pull requests, the merge gate, and the release-please workflow. This page records only the project-specific detail.

## Deployment target

The site is served by GitHub Pages from the `main` branch of `timdixon82/timdixon82.github.io`. There is no separate build step. GitHub Pages serves the repository files directly. A push to `main` deploys immediately.

## Custom domain

The custom domain `projects.timdixon.net` is set by the `CNAME` file at the repository root. This file must not be removed or changed without a deliberate decision, because changing or removing it would break every project page in the family. The domain architecture is described in [ADR 003](decisions/003-hosting-domain-headers.md).

## Branch names

Work branches follow the global naming convention: a type prefix then a brief description in kebab-case. For example, `chore/project-setup`, `fix/muted-text-contrast`, or `feat/contact-link`.

## Merge gate

Before Sonja merges to `main`, the global merge gate requirements must all hold:

- The required workflow checks pass: continuous integration, accessibility at WCAG 2.2 AAA, and security checks. These workflows are added during the setup build and will run on every pull request once in place.
- Carol has signed off functional, accessibility, and visual testing.
- The architecture and security conformance check has passed.

Sonja merges only with Tim's express approval at the time. This project is the GitHub user site and its `main` branch serves the live domain for the whole project family. Extra care is taken before any merge.

## Special consideration: this repository owns the domain

Because this is the GitHub user site, a misconfigured `main` branch can affect every project page, not only this one. Sonja confirms the `CNAME` file is intact and that "Enforce HTTPS" is enabled for the custom domain before each merge gate run.
