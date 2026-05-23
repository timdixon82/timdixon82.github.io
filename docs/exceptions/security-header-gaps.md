# Security Exception: Missing HTTP response headers

## Criterion

OWASP Top 10 A05: Security Misconfiguration. Jed's code review finding F-02 (Medium), 2026-05-21.

## What is missing

Two security response headers cannot be delivered on GitHub Pages:

1. `X-Frame-Options: DENY` (or an equivalent `frame-ancestors` directive in the Content-Security-Policy, which is ignored when the policy is delivered by meta tag).
2. `Permissions-Policy: geolocation=(), camera=(), microphone=()`.

The other required headers are handled as far as this host allows:

- `Content-Security-Policy`: delivered by a `<meta>` tag (setup build task).
- `Strict-Transport-Security`: sent by GitHub Pages once "Enforce HTTPS" is on.
- `X-Content-Type-Options: nosniff`: sent by GitHub Pages by default.
- `Referrer-Policy`: delivered by a `<meta>` tag (setup build task).

## Why these two cannot be delivered

GitHub Pages does not allow the site owner to set custom HTTP response headers. The `frame-ancestors` directive that would replace `X-Frame-Options` is explicitly excluded from the list of directives a `<meta>`-tag Content-Security-Policy may use. `Permissions-Policy` has no reliable meta-tag equivalent.

This is a platform constraint, not a code defect. The platform choice is recorded in [ADR 003](../decisions/003-hosting-domain-headers.md).

## Risk assessment

Both gaps are low risk for this site.

`X-Frame-Options`: without this header the page can be framed by another site, which is the precondition for a clickjacking attack. However, the page has no login, no form, no cookie, and no state-changing action beyond writing a theme preference to `localStorage`. A clickjacking attack on this page has nothing meaningful to capture.

`Permissions-Policy`: without this header the browser does not explicitly disable geolocation, camera, and microphone access on this origin. The page never uses any of those features and never requests them in its own code, so the practical risk is negligible.

## Mitigation

The Content-Security-Policy meta tag includes `frame-ancestors 'none'` and `form-action 'none'`. Browsers that support `frame-ancestors` in a meta-tag policy (behaviour varies) will enforce the directive. The defence is partial but not zero.

## Review

This exception is reviewed:

- When the site gains a feature that changes its risk profile (a login, a form, or a state-changing action).
- When the team considers moving the site to a host that can send custom headers (such as Cloudflare or Netlify), per the alternative noted in ADR 003.

## Approval

Pending Tim Dixon's sign-off. This record is raised for Tim's review during the setup-build pull request. No exception is valid without Tim's explicit approval.

Review date: to be set when Tim signs off.
