# Brief: 009-theme-dropdown

## Summary

Replace the two theme toggle buttons in the page header with a single accessible `<select>` dropdown offering all four Tim Dixon Design System themes.

- Status: active
- Branch: feat/theme-dropdown
- Priority: 8
- Blockers: None

## Out of scope

- Any other changes to index.html
- Changes to assets/colors_and_type.css or assets/theme.js

## Risk and rollback

Low. UI-only change. Rollback: revert the feature branch before merge.

## Definition of done

- [ ] Two toggle buttons replaced with a single `<select>` element
- [ ] Four options: Light, Dark, Muted light, Muted dark (values: light, dark, muted-light, muted-dark)
- [ ] Select is labelled accessibly (visible label or aria-label "Colour theme")
- [ ] Selected option reflects the current theme on page load
- [ ] Changing the select calls `window.tdTheme.set(value)` and updates data-theme immediately
- [ ] Select meets 44px minimum touch target height
- [ ] Select is styled to sit comfortably in the dark-navy header
- [ ] Old button JS (syncToggle, toggleMode, toggleFamily) removed; replaced with select change handler
- [ ] Carol signs off: WCAG 2.2 AAA, keyboard operable, screen-reader announcement correct

## Pre-approved GitHub actions

- [x] Create a branch
- [x] Commit to a branch
- [x] Push a branch (not main)
- [x] Open a pull request
- [x] Comment on a pull request or issue
- [x] Create an issue
