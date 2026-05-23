# ADR 003: GitHub Pages hosting, custom domain, and security headers

## Status

Accepted. Decided by Jacob (architect) on 2026-05-21, during work 007-timdixon-site-setup. The Content-Security-Policy value is proposed and depends on the file split in ADR 001.

## Context

This repository is hosted on GitHub Pages, served from the `main` branch. GitHub Pages is the team's standard host for static projects, set in the global wiki's ADR 001 (foundations).

Two things make this hosting decision wider than a single project.

First, this is the GitHub user site, served at the account root. Every project repository's GitHub Pages site is served at a path below it.

Second, the `CNAME` file sets the custom domain `projects.timdixon.net`. A custom domain on a user site applies to the whole account. This one file governs the public address of `timdixon82.github.io` and of every project page below it: `projects.timdixon.net/Periodic-Table`, `projects.timdixon.net/Clock-Practice`, and so on. This repository owns the domain for the whole project family.

The team's coding standard requires a set of security response headers. GitHub Pages does not allow the site owner to set custom HTTP response headers.

## Decision

### Hosting

Confirm GitHub Pages as the host, served from `main`.

### Custom domain

`projects.timdixon.net` is set through the `CNAME` file. Three points follow:

1. The domain is owned here. The `CNAME` file in this repository sets the domain for the whole account. Project repositories below it should not carry their own `CNAME` for `projects.timdixon.net`; they inherit it. A conflicting `CNAME` in a child repository is a misconfiguration.

2. DNS must point the domain at GitHub Pages. The subdomain `projects.timdixon.net` is served correctly only when its DNS record, a `CNAME` record pointing to `timdixon82.github.io`, is in place at the `timdixon.net` DNS provider. That configuration is outside this repository.

3. Links below the hub are root-relative. The cards in `index.html` link to project pages with root-relative paths such as `/Periodic-Table`. That is correct: a root-relative path resolves against the domain root whether the site is reached at `timdixon82.github.io` or at `projects.timdixon.net`.

### Security headers within the GitHub Pages limit

The standing standard is in the global wiki at `AgentTeam/docs/decisions/006-adopted-static-project-standards.md` (standard 3). The pattern is the same as for Periodic-Table and Clock-Practice.

1. Content-Security-Policy: delivered through a `<meta http-equiv="Content-Security-Policy">` tag, placed first in the `<head>` after `<meta charset>`.

2. Strict-Transport-Security: sent by GitHub Pages itself once "Enforce HTTPS" is on. No project action beyond keeping that setting on.

3. X-Content-Type-Options: GitHub Pages sends `nosniff` by default.

4. Referrer-Policy: delivered through a `<meta name="referrer">` tag. The page does not carry one today; adding it is a task for the setup build.

5. X-Frame-Options and Permissions-Policy: cannot be set on GitHub Pages and cannot be reliably set via meta tags either. Recorded as a low-risk exception; see [security exception record](../exceptions/security-header-gaps.md).

### Content-Security-Policy value

Target policy, after the file split in ADR 001:

`default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'none'`

Interim policy until the split is complete (while inline scripts and styles remain):

`default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'none'`

Every directive can be `'self'` because the page loads nothing from a third party. The `frame-ancestors 'none'` directive is included for completeness but is ignored by browsers in a meta-tag policy.

## Alternatives considered

Move to a host that allows custom headers (Netlify, Cloudflare Pages). Rejected for now. Moving this repository would move the user site and the custom domain, affecting every project page in the family. The residual header gaps are low-risk for a static page with no personal data, no forms, and no state-changing action.

Put a CDN in front of GitHub Pages to add headers. Rejected. Adds a platform to configure and maintain. Disproportionate for this risk profile.

Skip the Content-Security-Policy because it cannot be a real header. Rejected. A meta-tag policy is weaker but not worthless; browsers honour it.

## Consequences

- `index.html` carries a `<meta http-equiv="Content-Security-Policy">` tag and a `<meta name="referrer">` tag (setup build task for Sean).
- The stricter target policy depends on the file split in ADR 001.
- Two low-risk exceptions are in `exceptions/security-header-gaps.md`.
- The `CNAME` file must not be removed or changed without a deliberate decision.
- Sonja confirms with Tim that the DNS record for `projects.timdixon.net` is correct and that "Enforce HTTPS" is on for the custom domain.
