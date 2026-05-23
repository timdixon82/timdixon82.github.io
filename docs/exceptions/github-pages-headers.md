# Exception: GitHub Pages security-header gap

## Status

Covered by the team's standing exception. Approved by Tim Dixon on 2026-05-23 in the global wiki. No project-specific sign-off is required.

## Statement

This project relies on the team's standing exception for the GitHub Pages security-header gap. The exception, the headers affected (`X-Frame-Options` and `Permissions-Policy`), the residual-risk acceptance, and the compensating controls are recorded once in the global wiki at [Standing exception: GitHub Pages security-header gap](../../../AgentTeam/docs/exceptions/github-pages-security-headers.md).

The timdixon82.github.io project-index landing page meets every condition the standing exception names: a static front-end of HTML, CSS, and JavaScript; no personal data; no login, no authenticated session, no cookie; no form that submits data to a server, and no action with a side effect (the only state-changing local action is writing a theme preference to `localStorage`, which is a client-side preference and not a server side-effect); and no external scripts or styles from third-party origins. Self-hosted GoatCounter analytics follow the team's GoatCounter pattern and remain within the conditions.

This pointer file exists so the project's exception ledger remains complete on its own.

## References

- [Standing exception: GitHub Pages security-header gap](../../../AgentTeam/docs/exceptions/github-pages-security-headers.md).
- [Decision Record 011: Standing GitHub Pages security-header exception](../../../AgentTeam/docs/decisions/011-standing-github-pages-security-header-exception.md).
- [Project ADR 003: GitHub Pages hosting, custom domain, and security headers](../decisions/003-hosting-domain-headers.md).
