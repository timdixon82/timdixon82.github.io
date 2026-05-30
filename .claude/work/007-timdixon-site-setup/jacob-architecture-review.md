# Architecture Review: timdixon82.github.io

This is the backfilled architecture review for work 007-timdixon-site-setup, the
adoption of `timdixon82/timdixon82.github.io`, Tim Dixon's main GitHub Pages site
served at `projects.timdixon.net`. The review assesses the single `index.html`
file against the team's static front-end stack standard, and records the
Architecture Decision Records (ADRs) the project needs.

The review is read-only. It changes nothing in the repository. It is written by
Jacob (architect) on 2026-05-21 and reports to Sonja.

## What was reviewed

Two files make up the repository:

- `index.html`: a single 335-line file holding the page structure (HyperText
  Markup Language, HTML), the presentation (Cascading Style Sheets, CSS, inline
  in a `<style>` block at lines 17 to 232), and the behaviour (JavaScript, in two
  inline `<script>` blocks: a theme bootstrap at lines 9 to 16 and the
  theme-toggle logic at lines 305 to 332).
- `CNAME`: a one-line file containing `projects.timdixon.net`, the custom domain.

The page is a landing page. It shows a heading, a tagline, a light-and-dark
theme toggle, and a grid of eight cards. Each card links to one of Tim's project
pages (Braille Reference, Clock Practice, Image Colour Contrast Checker, the LLBS
Braille Name Generator, LLBS, Periodic Table, Poop Breakout, and the Social Media
Accessibility Checker extension). It has a footer link to `timdixon.net`.

## How this project differs from the projects below it

This repository is not an ordinary project repository. It is a GitHub *user
site*. GitHub serves one user site per account, from a repository named
`<username>.github.io`. That single fact drives three architectural points that
do not apply to Periodic-Table, Clock-Practice, or LLBS:

1. **It is the root of the path namespace.** A GitHub user site is served at the
   account root, and every project repository's GitHub Pages site is served at a
   path beneath it. So `timdixon82.github.io` is the parent, and
   `timdixon82.github.io/Periodic-Table`, `timdixon82.github.io/Clock-Practice`,
   and the rest are children. The cards in `index.html` link to those children
   with root-relative paths such as `/Periodic-Table`.

2. **Its custom domain governs the children.** The `CNAME` file sets
   `projects.timdixon.net` on the user site. A custom domain on a GitHub user
   site applies to the whole account: every project page is then reached under
   that domain too, for example `projects.timdixon.net/Periodic-Table`. The
   project repositories do not each need their own `CNAME`; they inherit the
   domain from this repository. This makes `timdixon82.github.io` the single
   point that owns the public domain for the whole project family.

3. **It is a hub, not an application.** The page has one job: route a visitor to
   a project. It has no application logic, no data set, no forms, and no state
   beyond a remembered theme choice. That makes it the simplest project the team
   has adopted, and the architecture should stay that simple.

These points are the reason this review records its own ADRs rather than only
pointing at the Periodic-Table and Clock-Practice records. The decisions are the
same in shape, but the hosting decision in particular carries extra weight here:
this repository owns the domain for everything below it.

## Conformance against the static front-end standard

The team's static front-end standard is in the global wiki at
`docs/stacks/static-front-end.md`. The page is measured against it below.

### Where the page already conforms

- **Clear entry point.** `index.html` is the entry point the standard asks for.
- **Standards-based code.** The HTML is valid and semantic: a `<header>`, a
  `<main>` with an `id` for the skip link, a `<footer>`, a single `<h1>`, an
  unordered list of cards, and a real `<button>` for the theme toggle. This meets
  the team's "semantic HTML first" standard.
- **No third-party JavaScript.** All behaviour is the project's own code. This is
  the dependency posture the standard wants and is recorded in ADR 004 below.
- **No web fonts.** The page uses a system font stack (`-apple-system`,
  `BlinkMacSystemFont`, and so on). It loads nothing from Google Fonts. This is a
  cleaner starting point than Periodic-Table, which had a Google Fonts
  dependency to remove.
- **HTTPS and the platform headers.** GitHub Pages serves the site over HTTPS and
  sends `Strict-Transport-Security` and `X-Content-Type-Options` itself once
  "Enforce HTTPS" is on. The accessibility and reduced-motion handling
  (`prefers-reduced-motion`, `prefers-color-scheme`, a visible focus outline, a
  skip link, 44-pixel touch targets) is strong; the detailed conformance call is
  Carol's, not this review's.

### Where the page does not conform

- **Structure, presentation, and behaviour are not separate.** The standard says
  "Keep structure (HTML), presentation (CSS), and behaviour (JavaScript)
  separate." The page holds all three in one file. ADR 001 addresses this.
- **No lint or accessibility checks run.** The standard says the HTML, CSS, and
  JavaScript are linted in continuous integration, and the accessibility checks
  run on every change. The repository has no `.github/workflows` folder, no lint
  configuration, and no continuous integration. This is expected for an adopted
  repository and is Sean's repository-configuration task in this work; the
  architecture only needs to confirm that a no-build-step project still requires
  these checks, which ADR 002 does.
- **Security headers are only partly deliverable.** The standard says to set the
  security response headers through the hosting configuration. GitHub Pages does
  not allow custom response headers. ADR 003 addresses this.

None of these gaps is a defect in the page. They are the normal shape of a small
single-file page that predates the team's standards. The ADRs below decide what
to do about each.

## Decision Record 001: File structure

### Status

Proposed. Recorded by Jacob (architect) on 2026-05-21, during work
007-timdixon-site-setup. One part, the timing of the file split, depends on
Tim's answer to the question in the "Decisions needing Tim" section of this
review.

### Context

`index.html` holds structure, presentation, and behaviour in one file:

- The HTML for the header, the card grid, and the footer.
- A `<style>` block of about 215 lines (lines 17 to 232).
- Two `<script>` blocks. The first, at lines 9 to 16, is a small theme bootstrap
  that runs in the `<head>` before the page paints, so the page does not flash
  the wrong theme. The second, at lines 305 to 332, wires up the theme toggle.

The static front-end standard asks for the three concerns to be in separate
files. The single-file layout does not meet that.

This is the third time the team has met this exact gap. Periodic-Table's ADR 001
decided to split, and Clock-Practice's ADR 001 decided to split as named
follow-up work after the adoption. The decision here follows the same reasoning.

### Decision

Split `index.html` into three files. The target layout is:

- `index.html`: the page structure only. It links the stylesheet and the script.
- `css/styles.css`: all presentation, moved out of the `<style>` block.
- `js/theme.js`: all behaviour, moved out of both `<script>` blocks.

File names follow the team's kebab-case naming standard. A flat `css/` and `js/`
layout is right for a page this small; the standard's "organised by feature"
guidance does not call for more, because the page is one feature, a project
index, with one small behaviour, the theme toggle. No data file is needed: unlike
Periodic-Table, this page has no data set, only eight hand-written card links.

There is one detail specific to this page. The theme bootstrap at lines 9 to 16
must keep running in the `<head>`, before the page paints, or the page will
flash the wrong theme on load. When the script moves to `js/theme.js`, that file
is referenced from the `<head>` as a render-blocking `<script>` (no `defer`),
and the toggle-wiring code, which needs the document body, either guards for the
button's presence or runs from a `DOMContentLoaded` handler. Splitting the file
must not lose the no-flash behaviour. This is a note for Sean and for Carol's
regression check.

The split is a refactor only. It must not change the page's behaviour, its
appearance, or its accessibility. The HTML, CSS, and JavaScript move to new files
unchanged in content.

The timing of the split is the open question. Clock-Practice's ADR 001 chose to
review the adopted file first and split as separate follow-up work, so the audit
trail of the security and code reviews stays readable against the file the team
actually adopted. The same reasoning applies here. The recommendation is to
split as named follow-up work after this adoption, but the timing is Tim's call;
see "Decisions needing Tim".

### Alternatives considered

#### Keep the single-file layout permanently

Rejected. A single file is fine for a throwaway page, but this is now a
maintained team project and, more than that, the public front door to every
other project. The standard requires the three concerns to be separate, and the
real costs apply here: a browser cannot cache the CSS and JavaScript separately
from the HTML, a style change shares a diff with a behaviour change, and the lint
tools cannot check a `.css` or `.js` file that does not exist. Carrying a
permanent recorded exception is worse than doing the refactor once.

#### Split into many feature files

Rejected as premature. The team's standard is to prefer the simple solution. The
page is one screen with one behaviour. Three files match it. If the page later
grows, for example into a filterable or searchable index, revisit the structure
then.

### Consequences

- Sean carries out the split as a `refactor` change, with no change to behaviour,
  appearance, or accessibility. Carol's regression check confirms the page,
  including the no-flash theme load, is unchanged.
- The browser can cache `css/styles.css` and `js/theme.js` separately from
  `index.html`, so a repeat visit downloads less.
- The split is a precondition for the stricter Content-Security-Policy in
  ADR 003. Until the script is an external file, the policy must allow
  `'unsafe-inline'` for scripts, which weakens it.
- The theme bootstrap must stay render-blocking in the `<head>` so the no-flash
  behaviour survives the move.

## Decision Record 002: No build step

### Status

Accepted. Decided by Jacob (architect) on 2026-05-21, during work
007-timdixon-site-setup. Reviewed by Sonja.

### Context

The static front-end standard says a small project needs no build step, and a
larger one may use a light bundler such as Vite. This repository has no build
step today: the file is served to the browser exactly as written. This record
decides whether the project should adopt one.

### Decision

The project keeps no build step. The files are written in standards-based HTML,
modern CSS, and modern JavaScript, and are served to the browser unchanged.

This page is the smallest project the team has adopted. After the split in
ADR 001 it is one HTML file, one CSS file, and one short JavaScript file. It has
no third-party JavaScript libraries to bundle (see ADR 004) and no data set.
Modern browsers run the page's modern CSS and JavaScript directly, so there is
nothing a build step would transform.

A build step would add a dependency, a configuration file, a step that can fail,
and a gap between the source a developer reads and the code the browser runs. For
a project this size none of that is repaid. The team's general standard is to
prefer the simple solution and add complexity only when a real need arrives.

This decision is not permanent. The trigger to revisit it is a genuine need: for
example, the page grows a feature, such as a live search across many project
entries, whose JavaScript would measurably benefit from being split into bundled
modules; or a third-party library is adopted that ships only as a package needing
a bundler. If that arrives, a light bundler such as Vite is the expected choice,
and a new decision record will record it.

### Alternatives considered

#### Adopt a bundler now, such as Vite

Rejected as premature. A bundler earns its place with many modules to combine,
third-party packages to resolve, or transforms to run. This page has none.
Adopting one now adds setup and a failure point with no return.

#### Add a minification-only step

Rejected for now. Minifying the CSS and JavaScript would shave a tiny amount off
an already tiny download. The cost is a build step that makes the served code
differ from the source. The free win, separate-file browser caching, comes from
ADR 001. Reconsider minification only if the asset size grows, which is unlikely
for a hub page.

### Consequences

- The repository's source is exactly what the browser runs, which keeps
  debugging and review direct.
- Continuous integration still lints the HTML, CSS, and JavaScript and runs the
  accessibility checks, as the stack standard requires. Linting and testing are
  not a build step; they check the code without transforming it. Sean sets up the
  lint and accessibility workflows as part of the repository configuration in
  this work.
- GitHub Pages serves the repository files directly, with no build action in
  between. This is covered in ADR 003.
- If the project later outgrows this decision, the named trigger and the expected
  choice (a light bundler such as Vite) are recorded above.

## Decision Record 003: GitHub Pages hosting, the custom domain, and security headers

### Status

Accepted. Decided by Jacob (architect) on 2026-05-21, during work
007-timdixon-site-setup. The Content-Security-Policy value is proposed and
depends on the file split in ADR 001 and on Gerrie's security review.

### Context

`timdixon82.github.io` is hosted on GitHub Pages, served from the `main` branch
of the public `timdixon82/timdixon82.github.io` repository. GitHub Pages is the
team's standard host for static projects, set in the global wiki's ADR 001
(foundations).

Two things make this hosting decision wider than the one in Periodic-Table's
ADR 003 or Clock-Practice's ADR 003.

First, this is the GitHub user site, so it is served at the account root, and
every project page is served at a path beneath it.

Second, the `CNAME` file sets the custom domain `projects.timdixon.net`. A
custom domain on a user site applies to the whole account. So this one file
governs the public address of `timdixon82.github.io` *and* of every project
page below it: `projects.timdixon.net/Periodic-Table`,
`projects.timdixon.net/Clock-Practice`, and the rest. This repository owns the
domain for the whole project family.

The team's coding standard requires a set of security response headers on every
site: `Content-Security-Policy`, `Strict-Transport-Security`,
`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, and
`Permissions-Policy`. The stack standard says to set them through the hosting
configuration. GitHub Pages has a hard limit: it does not let the site owner set
custom HTTP response headers. This record decides how the site meets the
security-header standard within that limit, and records the custom-domain
architecture.

### Decision

#### Hosting

Confirm GitHub Pages as the host, served from `main`. This is the standard
static-project host and needs no change.

#### Custom domain

`projects.timdixon.net` is set through the `CNAME` file. Three architectural
points follow, and they should be recorded so the project family is configured
consistently:

1. **The domain is owned here.** Because this is the user site, the `CNAME` file
   in this repository sets the domain for the whole account. The project
   repositories below it should *not* each carry a `CNAME` for
   `projects.timdixon.net`; they inherit it. If a project repository has its own
   conflicting `CNAME`, that is a misconfiguration to flag. This review notes it
   for Sonja to cross-check against the other adopted projects, but does not
   change anything.

2. **DNS must point the domain at GitHub Pages.** A custom subdomain such as
   `projects.timdixon.net` is served correctly only when its DNS record (a
   `CNAME` record pointing to `timdixon82.github.io`) is in place at the
   `timdixon.net` domain's DNS provider. That DNS configuration is outside this
   repository. This review cannot verify it from the cloned files; Sonja should
   confirm with Tim that the DNS record exists and is correct, and that "Enforce
   HTTPS" is enabled for the custom domain. This is listed under "Decisions
   needing Tim".

3. **Links below the hub are root-relative.** The cards in `index.html` link to
   project pages with root-relative paths such as `/Periodic-Table`. That is
   correct for a user site: a root-relative path resolves against the domain
   root, so `/Periodic-Table` works whether the site is reached at
   `timdixon82.github.io` or at `projects.timdixon.net`. The link slugs must
   match the project repository names exactly, because GitHub Pages serves each
   project at a path equal to its repository name. One card links to
   `/LLBS-Braile-Name-Generator`; the word "Braile" looks like a misspelling of
   "Braille". A link slug must match the repository name character for
   character, so this is only a defect if the repository is actually named
   `LLBS-Braille-Name-Generator`. This review flags the spelling for Sonja and
   Jed to verify against the real repository name; it is a link-correctness
   point, not an architecture decision.

#### Security headers, given the GitHub Pages limit

Because GitHub Pages cannot send custom response headers, the site meets the
security-header standard as far as a static page on this host can. This is the
same pattern recorded in Periodic-Table's ADR 003 and Clock-Practice's ADR 003.

1. **Content-Security-Policy: meta tag.** The policy is delivered through a
   `<meta http-equiv="Content-Security-Policy">` tag, placed first in the
   `<head>` after `<meta charset>`, so it is in force before any script runs. A
   meta-tag policy is honoured by browsers. Its known limits are that it cannot
   use the `frame-ancestors`, `report-uri`, `report-to`, or `sandbox`
   directives.

2. **Strict-Transport-Security.** Sent by GitHub Pages itself once "Enforce
   HTTPS" is on. No project action beyond keeping that setting on. With a custom
   domain, "Enforce HTTPS" must be enabled for the custom domain specifically;
   see "Decisions needing Tim".

3. **X-Content-Type-Options.** GitHub Pages sends `nosniff` by default. The
   protection is in place through the platform.

4. **Referrer-Policy.** Delivered through a `<meta name="referrer">` tag set to
   `strict-origin-when-cross-origin`. The page should add this tag; it does not
   carry one today.

5. **X-Frame-Options and clickjacking.** This header cannot be set on GitHub
   Pages, and the `frame-ancestors` directive that would replace it is ignored
   in a meta-tag policy. This leaves a residual gap. The risk is low: the page
   has no login, no form, no cookie, and no state-changing action. The theme
   toggle only writes a theme preference to this origin's `localStorage`; there
   is nothing for a clickjacking attack to capture. The gap is recorded as a
   low-risk security exception for Gerrie to assess, not hidden.

6. **Permissions-Policy.** This header cannot be set on GitHub Pages and its
   meta-tag form is not reliably supported. The risk is low: the page never uses
   geolocation, the camera, or the microphone. Recorded as a low-risk security
   exception alongside the X-Frame-Options gap.

#### Content-Security-Policy value

The proposed policy, after the file split in ADR 001:

`default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self';
object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'none'`

Notes:

- Every directive can be `'self'` because the page loads nothing from a third
  party: no web fonts, no third-party script, no external image. This is a
  tighter starting point than Periodic-Table, whose policy had to allow the
  Google Fonts origins.
- `script-src 'self'` is reachable only after ADR 001 moves the inline scripts
  into `js/theme.js`. While the page is still a single file, the policy needs
  `script-src 'self' 'unsafe-inline'` and `style-src 'self' 'unsafe-inline'`,
  because the script and style are inline. That interim policy is weaker and is
  another reason to schedule the split.
- `frame-ancestors 'none'` is included for completeness; a meta-tag policy
  ignores it, so the residual framing gap above still stands.
- The policy must be tested in a real browser before release. The theme
  bootstrap reads `localStorage` and `matchMedia`, which a Content-Security-Policy
  does not block, so the risk of the policy breaking the page is low, but the
  test is still required.

### Alternatives considered

#### Move to a host that allows custom headers, such as Netlify or Cloudflare Pages

Rejected for now, and the bar is higher here than for a single project. Moving
this repository would move the user site, which would move the custom domain and
the serving of every project page beneath it. That is a large, family-wide
change. For a static hub page with no personal data, no forms, and no
state-changing action, the headers GitHub Pages cannot deliver are the
lower-risk ones. The move is not justified. It remains the recorded answer if
the site ever gains an interactive action worth protecting from clickjacking.

#### Put a content delivery network in front of GitHub Pages to add headers

Rejected. A content delivery network in front of the site could add the missing
headers. It also adds a platform to configure and maintain and another place for
the domain and the site to break. For a page of this risk profile that is
disproportionate. The principle "prefer the simple solution" applies.

#### Skip the Content-Security-Policy because it cannot be a real header

Rejected. A meta-tag policy is weaker than a header policy but is not worthless:
browsers honour it, and it still restricts where code and resources may load
from. Shipping the meta-tag policy is clearly better than shipping nothing.

### Consequences

- `index.html` should carry a `<meta http-equiv="Content-Security-Policy">` tag,
  placed first in the `<head>` after `<meta charset>`, and a
  `<meta name="referrer">` tag. Adding them is a small content change for Sean;
  it is not a GitHub action and needs no separate approval.
- The strict target Content-Security-Policy depends on the file split in
  ADR 001. Until the split, the page uses the interim policy with
  `'unsafe-inline'`.
- Two low-risk security exceptions are recorded in the project wiki's
  `exceptions/` folder: the X-Frame-Options and `frame-ancestors` gap, and the
  missing Permissions-Policy. Gerrie assesses and signs them off; Tim approves.
- The custom domain `projects.timdixon.net` is owned by this repository's
  `CNAME` file and governs every project page below it. Sonja confirms with Tim
  that the DNS record is correct and that "Enforce HTTPS" is on for the custom
  domain. Sonja also cross-checks that no project repository carries its own
  conflicting `CNAME`.
- The card link slugs must match the project repository names exactly. The
  `LLBS-Braile-Name-Generator` slug is flagged for verification.

## Decision Record 004: Dependency posture

### Status

Accepted. Decided by Jacob (architect) on 2026-05-21, during work
007-timdixon-site-setup. Reviewed by Sonja.

### Context

The static front-end standard sets two dependency rules: keep dependencies few,
and load a third-party script only when genuinely needed and pinned with
Subresource Integrity. This record records what the site depends on today and the
standard it follows for any future dependency.

### Decision

#### Current dependency inventory

`timdixon82.github.io` has **no external dependencies at all**. This is the
cleanest dependency posture the team has adopted, cleaner than Periodic-Table,
which carried a Google Fonts dependency.

- **No third-party JavaScript.** Both `<script>` blocks are the project's own
  code: a theme bootstrap and a theme toggle.
- **No web fonts.** The page uses a system font stack
  (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
  Arial, sans-serif`). It loads no font from any third-party origin, so there is
  no Google Fonts request, no integrity question, and no privacy concern from a
  font request.
- **No external image.** The two icons in the theme toggle are inline Scalable
  Vector Graphics (SVG) markup, not files fetched from anywhere.

This is the right posture for a hub page and the project should keep it. The page
is small enough that any framework or utility library would add risk and
maintenance for no gain.

#### Standard for any future dependency

If the project ever adds a third-party script or stylesheet, it follows these
rules, which match Periodic-Table's ADR 004:

- Add it only when the need is genuine and the project's own code cannot
  reasonably do the job.
- Prefer a self-hosted copy, committed to the repository and served from the
  project's own origin, over a copy loaded from a third-party content delivery
  network.
- If a resource is loaded from a third-party origin, pin it with Subresource
  Integrity: an `integrity` attribute holding the resource's hash and a
  `crossorigin` attribute, pinned to a specific version, never a floating
  "latest".
- Record every third-party dependency in this decision record so the project
  keeps an inventory, as the OWASP guidance on vulnerable and outdated components
  requires.

Dependabot, the team's dependency tool from the global ADR 001, watches package
manifests. This project has no package manifest, so Dependabot has nothing to
track here. Keeping the inventory in this record is the project's substitute for
an automated dependency list.

### Alternatives considered

#### Adopt a small framework or component library for the card grid

Rejected. The card grid is a `<ul>` styled with CSS Grid. It needs no library.
Adding one would introduce a dependency to keep updated and secure for a layout
that plain CSS already handles well.

#### Add custom web fonts for the brand

Considered and not chosen as part of this review. The page currently uses a
system font stack, which is the zero-dependency option. Whether the site should
use Tim's brand fonts is a design question for Simon, not an architecture
decision. If Simon decides custom fonts are wanted, the architecture answer is to
self-host them, as Periodic-Table's ADR 004 sets out, so the no-dependency,
no-third-party-request posture is preserved. This review records the point so it
is not lost; it does not decide it.

### Consequences

- The project keeps zero third-party dependencies: no JavaScript library, no web
  font, no external image.
- Any future dependency follows the standard above and is added to this record's
  inventory.
- If Simon later wants brand fonts, they are self-hosted under an
  `assets/fonts/` folder with their licence files, and referenced from
  `css/styles.css` with `@font-face`, so no third-party request is introduced.

## Summary for Sonja

The site is in good architectural shape for an adopted single-file page, and it
is the cleanest the team has taken on: no third-party JavaScript, no web fonts,
no external images, valid semantic HTML, and strong built-in accessibility
handling. Four ADRs are recorded:

- **ADR 001 (file structure): proposed.** Split the one file into `index.html`,
  `css/styles.css`, and `js/theme.js`. The timing is the open question for Tim.
  The theme bootstrap must stay render-blocking in the `<head>` so the page does
  not flash the wrong theme.
- **ADR 002 (no build step): accepted.** Keep no build step. Lint and
  accessibility checks still run in continuous integration.
- **ADR 003 (hosting, custom domain, headers): accepted**, with the
  Content-Security-Policy value proposed. GitHub Pages, served from `main`. The
  `CNAME` file in this repository owns `projects.timdixon.net` for the whole
  account, including every project page below it. Security headers are delivered
  by meta tag as far as the platform allows; two low-risk header gaps go to
  Gerrie as exceptions.
- **ADR 004 (dependency posture): accepted.** Zero dependencies today; keep it.

The architecturally distinctive point of this project is that it is the GitHub
user site: it is the root of the path namespace, and its `CNAME` governs the
custom domain for every project page served beneath it. ADR 003 records that.

When the project wiki is scaffolded, these four ADRs belong in its `decisions/`
folder, renumbered if the wiki needs it but keeping the same content. The
GitHub Pages user-site-and-custom-domain pattern (a user site owns the domain;
project repositories inherit it and should not carry their own `CNAME`) is
cross-cutting: it would help any future project that sits in a GitHub Pages
account with a user site. I flag it to you to decide whether it should also be
written to the global wiki, perhaps as a pattern page.

## Decisions needing Tim

Batched for Sonja to put to Tim:

1. **Timing of the file split (ADR 001).** Splitting `index.html` into three
   files is recommended, because it unlocks the stricter Content-Security-Policy
   and lets the lint tools run on real `.css` and `.js` files. It is a refactor
   that can introduce a subtle regression in a page that currently works. Should
   the team schedule the split as named follow-up work after this adoption (the
   recommendation, matching how Clock-Practice handled the same choice), or split
   it inside this work, or leave the page as one file for now?

2. **Custom domain DNS and HTTPS (ADR 003).** This review cannot verify, from the
   cloned files, that the DNS for `projects.timdixon.net` points to GitHub Pages
   and that "Enforce HTTPS" is enabled for the custom domain. Can Tim confirm
   both are in place? If "Enforce HTTPS" is off, turning it on is needed so the
   site keeps `Strict-Transport-Security` and the HTTPS-everywhere standard.

3. **Brand fonts (ADR 004).** The page uses a system font stack today, which is
   the zero-dependency option. Does Tim want the site to use his brand fonts
   instead? This is really a question for Simon to advise on; if the answer is
   yes, the architecture path is to self-host them. Flagged so it is not lost.

One further item is for Sonja, not Tim: cross-check that the card link slug
`/LLBS-Braile-Name-Generator` matches the real repository name (the word
"Braile" may be a misspelling of "Braille"), and that no project repository
carries its own `CNAME` that conflicts with the domain owned here.
