# Security Governance Review: timdixon82.github.io

Review date: 2026-05-21
Reviewer: Gerrie (security governance)
Site: projects.timdixon.net
Stack: static front-end, HTML, CSS, and JavaScript, hosted on GitHub Pages
Source examined: `index.html` (335 lines), `CNAME` (1 line)

---

## Summary

This is a minimal static index page. It has no server, no database, no authentication, no forms, and no third-party scripts or assets. That removes almost every server-side risk class from scope. The main governance concerns are:

1. Security response headers are absent. GitHub Pages serves no custom headers by default, so none of the team's required headers are in place.
2. The `localStorage` use for theme preference is not personal data and does not trigger UK General Data Protection Regulation (UK GDPR) obligations, but this must be stated clearly.
3. No third-party request is made. No visitor data is disclosed externally by the page itself.
4. One question for Tim about analytics is batched at the end of this review.

---

## OWASP Top 10

The Open Worldwide Application Security Project (OWASP) Top 10 is the team's security baseline. Each category is mapped to what this site does or must do.

### A01 Broken Access Control

The site is a public, read-only page. There is no access control boundary to break. No authentication, no user roles, no protected resources.

Status: not applicable.

### A02 Cryptographic Failures

The CNAME record points to `projects.timdixon.net`. GitHub Pages supports HTTPS for custom domains using Let's Encrypt certificates, and the HTTPS enforcement toggle is available in the repository settings. The page contains no personal or sensitive data to protect in transit or at rest.

Status: no cryptographic failure in the code itself. HTTPS enforcement must be confirmed as enabled in the GitHub Pages repository settings. This is a configuration check, not a code change.

Required action: confirm that "Enforce HTTPS" is checked in the repository's Pages settings.

### A03 Injection

The page accepts no user input. There are no forms, no URL parameters read into the DOM, no `eval`, and no `innerHTML` assignments driven by external data. The only dynamic behaviour is reading `localStorage` for a theme value of `'dark'` or `'light'`, with an explicit allow-check before writing to `dataset.theme`. This is safe.

Status: no injection risk.

### A04 Insecure Design

A static index page with no server-side logic has a minimal threat surface by design. The choice to serve from GitHub Pages is appropriate for this use case.

Status: no concern.

### A05 Security Misconfiguration

This is the highest-severity finding. The site ships no security response headers. The team's required set, drawn from `docs/coding-standards.md`, covers:

- `Content-Security-Policy`: not present. Without it, any script injected via a future cross-site scripting (XSS) vulnerability or a supply-chain compromise could execute without restriction.
- `Strict-Transport-Security`: not present. Browsers will not automatically enforce HTTPS-only access.
- `X-Content-Type-Options: nosniff`: not present.
- `Referrer-Policy`: not present.
- `X-Frame-Options` or a `frame-ancestors` Content Security Policy directive: not present. The page can be framed, which is the precondition for a clickjacking attack.
- `Permissions-Policy`: not present.

GitHub Pages does not allow custom HTTP headers through repository configuration alone. The standard remedy for a GitHub Pages site with a custom domain is to place a content delivery network (CDN) or reverse proxy, such as Cloudflare, in front of it, and configure the headers there. Alternatively, a `_headers` file works on platforms such as Netlify but has no effect on GitHub Pages.

Severity: medium. The site is static and contains no user data or authentication today. However, the absence of a Content Security Policy and `X-Frame-Options` leaves the page open to clickjacking and removes the last line of defence if an injected script ever appears in a child project that shares the same origin.

Required action: add a Cloudflare proxy (or equivalent) in front of `projects.timdixon.net` and configure all six required headers there. A specific Content Security Policy is proposed below.

Proposed Content Security Policy for this page as it stands today:

`Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'`

The `'unsafe-inline'` allowances are required because the page uses inline `<script>` and `<style>` blocks. A stricter policy using a nonce or hash is possible once the project has a build step. The `frame-ancestors 'none'` directive replaces `X-Frame-Options: DENY`.

### A06 Vulnerable and Outdated Components

The page loads no external JavaScript libraries, frameworks, or fonts. There are no `<link>` stylesheet imports from a CDN, and no `<script src>` references to any third party. All code is inline. There are no dependencies to audit.

Status: not applicable.

### A07 Identification and Authentication Failures

No authentication exists and none is needed on a public read-only page.

Status: not applicable.

### A08 Software and Data Integrity Failures

No external scripts or stylesheets are loaded, so there is nothing that requires Subresource Integrity checking. The inline script reads only from `localStorage` and `window.matchMedia`. If a third-party resource is added in future, Subresource Integrity must be applied and must be documented in the project wiki.

Status: not applicable now. Must be enforced if third-party resources are added.

### A09 Security Logging and Monitoring Failures

GitHub Pages provides no server-side logging to the team. There is no application-level event to log on a static page. If a CDN is added (see A05), access logs should be enabled and retained for a reasonable period.

Status: noting the absence. If Cloudflare or equivalent is added, enable access logging.

### A10 Server-Side Request Forgery

No server-side code exists. Not applicable.

Status: not applicable.

---

## Security headers: current posture

The table below summarises the current state and the required state.

Header | Present | Required | Gap
---|---|---|---
Content-Security-Policy | No | Yes | Add via CDN proxy
Strict-Transport-Security | No | Yes | Add via CDN proxy; also enable HTTPS enforcement in Pages settings
X-Content-Type-Options | No | Yes | Add via CDN proxy
Referrer-Policy | No | Yes | Add via CDN proxy
X-Frame-Options or frame-ancestors | No | Yes | Add via Content Security Policy
Permissions-Policy | No | Yes | Add via CDN proxy

Remedying all six gaps requires one infrastructure change: placing a CDN or reverse proxy in front of the domain and configuring headers there. The code in `index.html` does not need to change for the headers.

---

## UK GDPR review

### Personal data collected

The page collects no personal data directly. There is no contact form, no sign-up form, no comment box, and no analytics script.

### localStorage

The script writes the string `'dark'` or `'light'` to `localStorage` under the key `td-theme`. This records a display preference. It does not identify an individual, does not leave the user's own device, and does not reach any server. It is not personal data under the UK GDPR.

No cookie consent banner or privacy notice is required for this preference alone.

### Outbound requests made by the page

The only external request the page makes is the link in the footer, `https://timdixon.net`, which is a standard hyperlink that the user must activate. Following a hyperlink sends the referring page URL to the destination in the standard HTTP Referer header, but this is normal browser behaviour and is not a data collection act by this page.

No fonts are loaded from Google Fonts or another CDN. No analytics pixel or tracking script is present. No images are loaded from a remote origin.

### Lawful basis

There is nothing to establish a lawful basis for, because no personal data is collected or processed by the page.

### Third-party data disclosures

GitHub, as the hosting provider, receives the IP address of every visitor as a standard part of serving the site. This is unavoidable for any hosted service. GitHub's data processing terms govern this. There is no additional third-party disclosure from the page code itself.

### Verdict

The page is currently UK GDPR-compliant by absence of data collection. If analytics, a contact form, embedded fonts, or third-party scripts are added, this review must be revisited before deployment.

---

## Secrets handling

No secrets are present in the source. The `CNAME` file contains only the domain name. There are no API keys, tokens, or credentials in `index.html`. The inline JavaScript reads only browser APIs (`localStorage`, `window.matchMedia`).

Status: compliant.

---

## Access control and logging hygiene

The repository is public, which is required for GitHub Pages. There are no private files or configuration in the repository. No secrets are in version control. Logging hygiene is not applicable to a static page with no server component.

---

## Questions for Tim (batched)

There is one decision that requires Tim's input before the security configuration can be finalised. It must be relayed through Sonja.

Question 1: Security headers require a CDN or reverse proxy in front of projects.timdixon.net, because GitHub Pages does not support custom HTTP headers natively. The team's standard recommendation is Cloudflare's free tier, which can add all six required headers through its Transform Rules feature. Do you have an existing Cloudflare account for timdixon.net or projects.timdixon.net, and are you willing to route traffic through Cloudflare for this domain? If you prefer a different approach, please say so.

Question 2: Analytics. The site currently has no analytics or visitor tracking. This is the best outcome for UK GDPR compliance. Do you want to add any analytics to this site? If yes, the team will need to select a compliant tool (such as Plausible, which is privacy-preserving and does not require consent under the UK GDPR) and update this review before deployment.

---

## Exception record

No formal security exceptions are raised at this time. The missing headers are a gap against the team standard, but they result from a platform constraint (GitHub Pages), not a deliberate policy choice. The resolution is an infrastructure change rather than an exception. If Tim decides the headers cannot be added, a formal exception will be recorded in the project wiki's `exceptions/` folder with the reason and an agreed mitigation.

---

## Review status

This review is complete subject to Tim's answers to the two questions above. The only action the team can take now, before those answers arrive, is to confirm that HTTPS enforcement is enabled in the repository settings. That check can be done by Sonja or Sean at any time.
