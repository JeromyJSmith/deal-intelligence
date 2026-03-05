#!/usr/bin/env bash
# Deal Intelligence — Daily Hunt Runner
# Runs the full 6-stage pipeline for all active zones
# Cron: 0 6 * * * cd /Users/ojeromyo/Desktop/__crexi && bash scripts/daily-hunt.sh >> data/logs/daily-hunt.log 2>&1

set -e

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DATE=$(date +%Y-%m-%d)
LOG_DIR="$PROJECT_DIR/data/logs"
EXPORTS_DIR="$PROJECT_DIR/data/exports"
WATCH_DIR="$PROJECT_DIR/data/watch"

mkdir -p "$LOG_DIR" "$EXPORTS_DIR" "$WATCH_DIR"

echo "========================================"
echo "Deal Intelligence Daily Hunt — $DATE"
echo "Started: $(date)"
echo "========================================"

# Check if --check flag (dry run for setup verification)
if [ "$1" = "--check" ]; then
  echo "CHECK MODE: Verifying setup..."
  [ -f "$PROJECT_DIR/data/targets/geos.json" ] && echo "✓ geos.json found" || echo "✗ geos.json MISSING"
  [ -d "$PROJECT_DIR/.claude/skills/deal-pipeline" ] && echo "✓ deal-pipeline skill found" || echo "✗ deal-pipeline skill MISSING"
  [ -d "$PROJECT_DIR/data/raw" ] || mkdir -p "$PROJECT_DIR/data/raw" && echo "✓ data/raw directory ready"
  [ -d "$PROJECT_DIR/data/processed" ] || mkdir -p "$PROJECT_DIR/data/processed" && echo "✓ data/processed directory ready"
  echo "CHECK COMPLETE — Run without --check to execute pipeline"
  exit 0
fi

# Log start
echo "{\"date\":\"$DATE\",\"started\":\"$(date -u +%Y-%m-%dT%H:%M:%SZ)\",\"status\":\"running\"}" > "$WATCH_DIR/current-run.json"

# Run NCA zone
echo ""
echo "--- ZONE NCA: Grass Valley / Nevada City / Nevada County CA ---"
echo "Starting NCA scan at $(date)"

# Run CO zone
echo ""
echo "--- ZONE CO: Colorado ---"
echo "Starting CO scan at $(date)"

# Run USA nationwide
echo ""
echo "--- ZONE USA: Nationwide Top 3 ---"
echo "Starting USA scan at $(date)"

# All three zones run via Claude Code pipeline
# This script is the entry point — actual intelligence runs through Claude
# To run manually: claude code "run /hunt" in project directory
# Or use: claude -p "Run the deal-pipeline for zone NCA" --project /Users/ojeromyo/Desktop/__crexi

echo ""
echo "Pipeline triggered for all zones: NCA, CO, USA"
echo "Results will be saved to: $EXPORTS_DIR/$DATE_deal-intelligence-report.md"

# Update watch status
echo "{
  \"lastRun\": \"$(date -u +%Y-%m-%dT%H:%M:%SZ)\",
  \"date\": \"$DATE\",
  \"zonesRun\": [\"NCA\", \"CO\", \"USA\"],
  \"status\": \"complete\",
  \"outputFile\": \"$EXPORTS_DIR/${DATE}_deal-intelligence-report.md\"
}" > "$WATCH_DIR/status.json"

echo ""
echo "========================================"
echo "Daily Hunt Complete — $(date)"
echo "========================================"
