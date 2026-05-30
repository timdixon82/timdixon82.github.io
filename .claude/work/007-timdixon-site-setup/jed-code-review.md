# Code Review and Penetration Test: timdixon82.github.io

Reviewer: Jed
Date: 2026-05-21
Scope: `index.html` (335 lines), reviewed against the OWASP Top 10 and the team coding standards in `docs/coding-standards.md`.

## Summary

The site is a static GitHub Pages page with no server-side code, no form submissions, no database, and no authentication. The attack surface is therefore narrow. No cross-site scripting (XSS) vector was found in the HTML markup or JavaScript. No unsafe DOM injection, no inline event handlers, and no use of dangerous APIs was found. The JavaScript is minimal and well-scoped.

Three findings require action before release: the absence of a Content-Security-Policy (CSP), the absence of all other required security response headers, and one informational note about inline script blocks. One earlier draft finding about external links was closed on re-inspection; the link is already correctly attributed.

Severity scale used: Critical, High, Medium, Low, Informational.

## Finding 1: No Content-Security-Policy header

Severity: High
OWASP Top 10 category: A05 Security Misconfiguration

### Description

The page loads no Content-Security-Policy (CSP) header or `<meta http-equiv="Content-Security-Policy">` tag. All resources on the page are same-origin or inline (one inline style block and two inline script blocks), so a CSP could be deployed without requiring external origins.

Without a CSP, if an attacker were ever able to inject content into the page (for example through a compromised GitHub Pages pipeline or a future dependency), the browser would execute that injected content without restriction.

### How to reproduce

Open the site at `https://projects.timdixon.net` in a browser. Open the browser's developer tools. Check the Response Headers panel. No `Content-Security-Policy` header is present.

### Recommended fix

GitHub Pages does not allow custom response headers directly. The correct fix is to add a `<meta>` CSP tag in the `<head>` element. Because all resources are inline or same-origin, a strict policy is achievable. The `unsafe-inline` exceptions are required because the page uses two inline script blocks and one inline style block. The long-term fix is to move those blocks into external files and use a hash-based or nonce-based CSP, removing `unsafe-inline` entirely. That stronger posture should be addressed in a follow-on task.

## Finding 2: Missing security response headers

Severity: Medium
OWASP Top 10 category: A05 Security Misconfiguration

### Description

The team's coding standard in `docs/coding-standards.md` (Security Response Headers section) requires six headers. GitHub Pages serves none of these by default, and the page does no custom configuration:

- `Strict-Transport-Security` (HSTS): absent
- `X-Content-Type-Options: nosniff`: absent
- `Referrer-Policy`: absent
- `X-Frame-Options` or a `frame-ancestors` CSP directive: absent
- `Permissions-Policy`: absent

GitHub Pages does not support custom response headers. However, the project can add a `_headers` file if delivery is moved to Cloudflare Pages or a similar host. Given that the site is served directly from GitHub Pages, the only controls available at page level are `<meta>` tags. `X-Content-Type-Options`, `Referrer-Policy`, and `Strict-Transport-Security` cannot be set via `<meta>`. `frame-ancestors` can be addressed via the CSP `<meta>` tag described in Finding 1. `Permissions-Policy` can be set via a `<meta>` tag in Chromium-based browsers.

This is a platform limitation, not a code defect, but it must be recorded as a known gap.

### How to reproduce

Inspect the live response headers at `https://projects.timdixon.net` using a browser's developer tools. The listed headers are absent from the response.

### Recommended fix

Two actions are needed.

First, add the CSP `<meta>` tag from Finding 1, which covers `frame-ancestors` and `object-src`.

Second, record the remaining header gaps (`Strict-Transport-Security`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`) as a security exception in the project wiki at `exceptions/security-header-gaps.md`. The exception must name the platform constraint (GitHub Pages), state that the gap is accepted for now, and set a review date. Sonja should determine whether a CDN or proxy layer (for example Cloudflare) in front of the site would allow the headers to be added, and if so raise that as a future task.

## Finding 3 (Informational): localStorage theme toggle

Severity: Informational
OWASP Top 10 category: Not applicable

### Description

The page uses `localStorage` under the key `td-theme` to persist the user's dark or light mode preference. The values written are either the string `dark` or the string `light`, both checked against an explicit allow-list before use on line 13 of the inline script. The theme value is assigned only to `html.dataset.theme`, a data attribute. The value never reaches any code-execution surface. No injection risk exists.

`localStorage` is not a secure storage mechanism and must not be used for secrets or tokens. Its use here for a cosmetic preference is appropriate.

No action required.

## Finding 4 (Informational): Inline script blocks and future CSP posture

Severity: Informational
OWASP Top 10 category: A05 Security Misconfiguration

### Description

The page contains two inline script blocks (lines 9 to 15 and lines 305 to 332) and one inline style block (lines 17 to 232). As noted under Finding 1, these require the `unsafe-inline` exception in any CSP deployed today. Moving to external files would allow `unsafe-inline` to be dropped entirely, which is the stronger long-term posture.

This is not an immediate vulnerability. It is recorded so the team can address it in a follow-on task.

No immediate action required. Recommend creating a task to externalise the inline blocks.

## External link review

Line 302:

```html
<a href="https://timdixon.net" target="_blank" rel="noopener noreferrer">
```

This is the only external link on the page. It correctly carries `rel="noopener noreferrer"`, which prevents the opened page from accessing the opener window and prevents referrer leakage. No finding.

## Coverage against OWASP Top 10

The table below maps each OWASP Top 10 category to the findings above, or records why the category does not apply.

A01 Broken Access Control: Not applicable. No access control, no authenticated routes, no server.

A02 Cryptographic Failures: Not applicable. No personal data is stored or transmitted by this page. HTTPS is enforced by GitHub Pages.

A03 Injection: No finding. There is no user input, no dynamic HTML construction, and no unsafe APIs used.

A04 Insecure Design: Not applicable. The site is a static directory listing with no business logic.

A05 Security Misconfiguration: Findings 1 and 2, and the informational note at Finding 4.

A06 Vulnerable and Outdated Components: Not applicable. No third-party JavaScript or CSS libraries are loaded.

A07 Identification and Authentication Failures: Not applicable. No authentication.

A08 Software and Data Integrity Failures: No third-party scripts are loaded, so no Subresource Integrity (SRI) attributes are needed. Not applicable.

A09 Security Logging and Monitoring Failures: Not applicable. No server-side code.

A10 Server-Side Request Forgery: Not applicable. No server-side code.

## Actions required before release

The following findings must be resolved before the pull request merges.

Finding 1 (High): Add a `<meta>` Content-Security-Policy tag.

Finding 2 (Medium): Record the missing response header gaps as a security exception in the project wiki.

## No findings on

- Unsafe DOM injection: none found.
- Cross-site scripting surfaces: none found.
- Missing Subresource Integrity on third-party resources: no third-party resources are loaded.
- Unsafe links: the one external link carries the correct `rel` attributes.
- Inline event handlers: none found. Event listeners are attached via `addEventListener`.
