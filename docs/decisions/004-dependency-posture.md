# ADR 004: Dependency posture

## Status

Accepted. Decided by Jacob (architect) on 2026-05-21, during work 007-timdixon-site-setup.

## Context

The static front-end standard requires dependencies to be kept few, and any third-party script loaded from an external origin to be pinned with Subresource Integrity. This record inventories the current dependencies and sets the standard for any future addition.

## Decision

### Current dependency inventory

This project has no external dependencies at all. This is the cleanest dependency posture the team has adopted.

- No third-party JavaScript. Both `<script>` blocks are the project's own code.
- No web fonts. The page uses a system font stack (`-apple-system`, `BlinkMacSystemFont`, and so on). No font is fetched from any external origin.
- No external images. The two icons in the theme toggle are inline Scalable Vector Graphics (SVG), not files fetched from anywhere.
- No analytics yet. GoatCounter analytics are added during the setup build, following the canonical self-hosting pattern (decision Q21). The `count.js` file is self-hosted; see `AgentTeam/docs/patterns/goatcounter-analytics.md`.

The project should keep this posture. Adding a framework or utility library to a hub page that is served to the browser as plain files would introduce maintenance and supply-chain risk with no gain.

### Standard for any future dependency

If the project ever adds a third-party script or stylesheet:

- Add it only when the need is genuine and the project's own code cannot reasonably do the job.
- Prefer a self-hosted copy, committed to the repository and served from the project's own origin, over a copy loaded from a third-party content delivery network.
- If a resource is loaded from a third-party origin, pin it with Subresource Integrity: an `integrity` attribute holding the resource's hash and a `crossorigin` attribute, pinned to a specific version, never a floating "latest".
- Record every third-party dependency in this decision record so the project keeps an inventory, as the OWASP guidance on vulnerable and outdated components requires.

Dependabot watches package manifests. This project has no package manifest yet (one will be added per the standing standard in global decision 006, standard 4). Once the manifest is in place, Dependabot will watch it.

### Brand fonts

The page uses a system font stack. Tim decided that brand fonts are covered by the Tim Dixon Design System decision (Q23). If a custom font is later adopted, the architecture path is to self-host it under `assets/fonts/` with its licence file, and reference it from `css/styles.css` with `@font-face`, so no third-party request is introduced.

## Alternatives considered

Adopt a framework or component library for the card grid. Rejected. The card grid is a `<ul>` styled with CSS Grid. Plain CSS handles it well.

Add custom web fonts now. Not chosen as part of this review. The brand fonts question is settled by the Tim Dixon Design System decision (Q23). If fonts are added, they are self-hosted.

## Consequences

- Zero third-party dependencies are maintained: no JavaScript library, no external web font, no external image.
- GoatCounter `count.js` is self-hosted when analytics are added; this keeps the zero-external-origin posture intact.
- Any future dependency is added to this record's inventory.
