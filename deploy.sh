#!/usr/bin/env bash
# Build the static site and publish it to GitHub Pages (main branch).
set -euo pipefail
cd "$(dirname "$0")"
REMOTE="git@github.com:SriramkOfc/SriramkOfc.github.io.git"
npx next build
touch out/.nojekyll
TMP="$(mktemp -d)"
cp -R out/. "$TMP"
cd "$TMP"
git init -q -b main
git add -A
git commit -q -m "Deploy site $(date -u +%Y-%m-%dT%H:%MZ)"
git push -f "$REMOTE" main
rm -rf "$TMP"
echo "Deployed → https://sriramkofc.github.io"
