# Brief: 011-emotion-wheel-card

## Summary

Add a project card for Emotion Wheel to `index.html`, using the same dual-link card pattern (live site + GitHub repo) established in work folder 010.

- Status: archived
- Branch: feat/emotion-wheel-card
- Mockup mode: D (no mockup — reuses the existing established card pattern)
- Priority: 8
- Blockers: None

## Requirements

No separate requirements document. Per Tim's direction (Q1 option B), this reuses the card pattern already implemented and tested in work folder 010-card-dual-links. Sean builds directly from that pattern; no Tad dispatch for this work.

Card data:

| Field | Value |
|---|---|
| Project name | Emotion Wheel |
| Description | Accessible emotion wheel selector with a local-only browser log (from repo description; Sean may lightly adapt wording to match the site's card copy style, consistent with other cards) |
| Live site URL | `https://emotionwheel.timdixon.net/` (confirmed live, HTTP 200) |
| GitHub repo URL | `https://github.com/timdixon82/Emotion-Wheel` |

## Routing plan

Sean builds the card on a branch, following the exact `.card-links` markup, ARIA labelling, and external-link pattern used for the other ten cards. Carol tests (functional and accessibility passes in parallel). Sonja reviews and takes to Tim for merge approval.

## Out of scope

- Any changes to CSS tokens, fonts, or design system files beyond what the existing `.card-links` block already provides
- Adding, removing, or reordering any other project card
- Changes to any file other than `index.html`
- Any new requirements-gathering pass by Tad

## Risk and rollback

Risk: the new card's markup could diverge from the established pattern (missing aria-label, missing "opens in new window" span, wrong link order) and fail accessibility checks.

Rollback: revert the branch commit before merge; no production impact until merged.

## Definition of done

- [x] New card added to `index.html` with plain-text `<h2>` (not a link)
- [x] Card has a `.card-links` section after the description paragraph, matching the existing pattern exactly
- [x] Card shows both a "Live site" link (`https://emotionwheel.timdixon.net/`) and a "GitHub" link (`https://github.com/timdixon82/Emotion-Wheel`)
- [x] Both links have descriptive `aria-label` attributes naming "Emotion Wheel" in context
- [x] Both links carry `target="_blank" rel="noopener noreferrer"` and a visually-hidden "(opens in new window)" span
- [x] No changes made to any file other than `index.html`
- [x] WCAG 2.2 AAA passes with axe-core and Pa11y
- [x] Carol signs off on functional and accessibility passes

## Approved GitHub actions

- [x] Create a branch
- [x] Commit to a branch
- [x] Push a branch other than the main branch
- [x] Open a pull request
- [x] Comment on a pull request or an issue
- [x] Create an issue

## Not pre-approved

These always pause for Tim, whatever is ticked above:

- Merging to the main branch. This always needs Tim's express approval at the time.
- Publishing to a blog or a social media account.

## Never allowed

The hard deny-list from `CLAUDE.md`. These are refused outright, whatever a brief says: force-push, branch deletion, history rewrite, repository deletion, repository visibility change, branch-protection edits, collaborator changes, release deletion, and disabling secret or code scanning.
