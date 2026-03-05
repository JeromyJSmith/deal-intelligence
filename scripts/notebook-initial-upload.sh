#!/bin/bash
# Initial upload of project sources to CREXI Deal Finder NotebookLM notebook
# Run this once after authentication to seed the knowledge base

set -e

NOTEBOOK_ID="20df62c7-c167-4b61-accb-343d7e23b3bc"
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
LOG_FILE="$ROOT_DIR/data/logs/notebook-uploads.jsonl"
DELAY=3  # seconds between uploads to avoid rate limits

mkdir -p "$ROOT_DIR/data/logs"

upload_file() {
  local file="$1"
  local desc="$2"

  if [ ! -f "$file" ]; then
    echo "  [SKIP] $desc — file not found: $file"
    return
  fi

  echo "  [UPLOAD] $desc: $file"
  RESULT=$(notebooklm source add "$file" -n "$NOTEBOOK_ID" --json 2>&1) || {
    echo "  [ERROR] Failed to upload $file: $RESULT"
    jq -n --arg ts "$(date -u +%Y-%m-%dT%H:%M:%SZ)" --arg f "$file" --arg e "$RESULT" \
      '{timestamp: $ts, file: $f, status: "error", error: $e}' >> "$LOG_FILE"
    return
  }

  SOURCE_ID=$(echo "$RESULT" | jq -r '.source_id // .id // "unknown"')
  echo "  [OK] Source ID: $SOURCE_ID"

  jq -n --arg ts "$(date -u +%Y-%m-%dT%H:%M:%SZ)" --arg f "$file" --arg sid "$SOURCE_ID" --arg d "$desc" \
    '{timestamp: $ts, file: $f, sourceId: $sid, description: $d, status: "uploaded"}' >> "$LOG_FILE"

  sleep $DELAY
}

upload_url() {
  local url="$1"
  local desc="$2"

  echo "  [UPLOAD] $desc: $url"
  RESULT=$(notebooklm source add "$url" -n "$NOTEBOOK_ID" --json 2>&1) || {
    echo "  [ERROR] Failed to upload $url: $RESULT"
    return
  }

  SOURCE_ID=$(echo "$RESULT" | jq -r '.source_id // .id // "unknown"')
  echo "  [OK] Source ID: $SOURCE_ID"

  jq -n --arg ts "$(date -u +%Y-%m-%dT%H:%M:%SZ)" --arg u "$url" --arg sid "$SOURCE_ID" --arg d "$desc" \
    '{timestamp: $ts, url: $u, sourceId: $sid, description: $d, status: "uploaded"}' >> "$LOG_FILE"

  sleep $DELAY
}

echo "========================================"
echo "CREXI Deal Finder — NotebookLM Initial Upload"
echo "Notebook: $NOTEBOOK_ID"
echo "========================================"
echo ""

# Check auth first
echo "[1/2] Checking authentication..."
if ! notebooklm auth check --quiet 2>/dev/null; then
  echo "ERROR: Not authenticated. Run 'notebooklm login' first."
  exit 1
fi
echo "  [OK] Authenticated"
echo ""

# Upload project documentation
echo "[2/2] Uploading sources..."
echo ""

echo "--- Project Documentation ---"
upload_file "$ROOT_DIR/CLAUDE.md" "Project README and configuration"
upload_file "$ROOT_DIR/docs/architecture.md" "System architecture"
upload_file "$ROOT_DIR/docs/pipeline.md" "Pipeline documentation"

echo ""
echo "--- Agent Specifications ---"
for agent_file in "$ROOT_DIR/.claude/agents/"*.md; do
  [ -f "$agent_file" ] || continue
  name=$(basename "$agent_file" .md)
  upload_file "$agent_file" "Agent spec: $name"
done

echo ""
echo "--- Pipeline Data ---"
upload_file "$ROOT_DIR/data/state.json" "Current pipeline state"

# Upload seed data if it exists
if [ -f "$ROOT_DIR/data/seed/seed-leads.json" ]; then
  upload_file "$ROOT_DIR/data/seed/seed-leads.json" "Seed lead data"
fi

echo ""
echo "--- Relevant URLs ---"
upload_url "https://www.crexi.com" "CREXI commercial real estate marketplace"
upload_url "https://www.loopnet.com" "LoopNet commercial listings (competitor reference)"

echo ""
echo "========================================"
echo "Upload complete! Check $LOG_FILE for details."
echo "========================================"
