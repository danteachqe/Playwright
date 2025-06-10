#!/usr/bin/env bash
set -euo pipefail

# Install Node dependencies if not present
if [ ! -d node_modules ]; then
  echo "Installing npm dependencies..."
  npm ci
fi

# Install Playwright browsers
npx playwright install --with-deps

# Execute tests, forwarding any arguments
npx playwright test "$@"
