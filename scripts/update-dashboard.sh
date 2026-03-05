#!/bin/bash
# Dashboard State Updater (shell wrapper)
#
# Usage:
#   ./scripts/update-dashboard.sh                          # Full refresh
#   ./scripts/update-dashboard.sh --stage scrape           # After scrape pipeline
#   ./scripts/update-dashboard.sh --agent data-collector   # After agent run
#   ./scripts/update-dashboard.sh --stage score --agent deal-scout  # Both

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"

cd "$ROOT_DIR" || exit 1

# Check Node.js is available
if ! command -v node &>/dev/null; then
  echo "Node.js required for dashboard updates" >&2
  exit 1
fi

# Run the updater, pass all args through
node "$SCRIPT_DIR/update-dashboard.js" "$@"
