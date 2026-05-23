# ADR 002: No build step

## Status

Accepted. Decided by Jacob (architect) on 2026-05-21, during work 007-timdixon-site-setup.

## Context

The static front-end standard says a small project needs no build step. This repository has no build step today. After the file split in ADR 001, the project will have one HTML file, one CSS file, and one short JavaScript file. This record decides whether the project should adopt a build step.

## Decision

The project keeps no build step. The files are written in standards-based HTML, modern CSS, and modern JavaScript, and are served to the browser unchanged.

This page is the smallest project the team has adopted. It has no third-party JavaScript libraries to bundle (ADR 004) and no data set. Modern browsers run the page's code directly. A build step would add a dependency, a configuration file, a failure point, and a gap between the source a developer reads and the code the browser runs.

Continuous integration still lints the HTML, CSS, and JavaScript and runs the accessibility checks, as the stack standard requires. Linting and testing are not a build step; they check the code without transforming it. Sean sets up the lint and accessibility workflows as part of the repository configuration in this work.

The trigger to revisit this decision: the page grows a feature whose JavaScript would measurably benefit from being split into bundled modules, or a third-party library is adopted that needs a bundler. If that arrives, a light bundler such as Vite is the expected choice.

## Alternatives considered

Adopt a bundler now, such as Vite. Rejected as premature. A bundler earns its place when there are many modules to combine or transforms to run. This page has none.

Add a minification-only step. Rejected for now. The separate-file browser caching from ADR 001 is the free win. Minification saves a tiny amount on an already tiny download and adds a build step.

## Consequences

- The repository source is exactly what the browser runs.
- GitHub Pages serves the files directly with no build action in between.
- Linting and accessibility checks still run in continuous integration.
