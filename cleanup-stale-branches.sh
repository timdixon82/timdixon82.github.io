#!/usr/bin/env bash
# Deletes local and remote branches whose work has already reached main,
# or whose pull request was closed unmerged in favour of a later sync.
# Run this from inside /Users/timdixon/Code/Github/timdixon82.github.io.
set -euo pipefail

echo "Deleting local branches..."
# These four were merged via squash, so git does not see them as a literal
# ancestor of main even though their content is on main. Confirmed against
# GitHub's merge records: add-legal-pages (PR #26), chore/sync-template-v1.6.3
# (PR #21), chore/sync-template-v1.8.1 (PR #27). chore/sync-template-v1.6.2's
# PR (#19) was closed unmerged, superseded by v1.6.3 -- also safe to remove.
git branch -D \
  add-legal-pages \
  chore/sync-template-v1.6.2 \
  chore/sync-template-v1.6.3 \
  chore/sync-template-v1.8.1

echo "Deleting remote branch chore/sync-template-v1.6.2..."
git push origin --delete chore/sync-template-v1.6.2

echo "Done. Remaining branches:"
git branch -a
