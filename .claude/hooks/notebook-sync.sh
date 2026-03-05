#!/bin/bash
# SubagentStop hook: Auto-triggers NotebookLM upload after pipeline stages
#
# Runs AFTER agent-report.sh. Checks if the completing agent is a pipeline
# agent, and if so, queues a notebook upload of recent outputs.
#
# This is non-blocking — it writes a trigger file that the next session
# or manual /notebook-upload command will pick up.

INPUT=$(cat)
AGENT_TYPE=$(echo "$INPUT" | jq -r '.agent_type // "unknown"')
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

ROOT_DIR="$(cd "$(dirname "$0")/../.." && pwd)"
CONFIG="$ROOT_DIR/data/notebook-config.json"
QUEUE_DIR="$ROOT_DIR/data/logs/notebook-queue"
LOG_FILE="$ROOT_DIR/data/logs/notebook-uploads.jsonl"

# Only trigger for pipeline agents and notebook agents
PIPELINE_AGENTS="data-collector market-analyst deal-scout outreach-specialist lead-researcher"
NOTEBOOK_AGENTS="notebook-uploader notebook-researcher notebook-reporter"

IS_PIPELINE=false
IS_NOTEBOOK=false
for a in $PIPELINE_AGENTS; do
  [ "$AGENT_TYPE" = "$a" ] && IS_PIPELINE=true
done
for a in $NOTEBOOK_AGENTS; do
  [ "$AGENT_TYPE" = "$a" ] && IS_NOTEBOOK=true
done

# Exit early if not a relevant agent
if [ "$IS_PIPELINE" = false ] && [ "$IS_NOTEBOOK" = false ]; then
  exit 0
fi

# Check if notebook config exists and auto-upload is enabled
if [ ! -f "$CONFIG" ]; then
  exit 0
fi

AUTO_UPLOAD=$(jq -r '.autoUpload.enabled // false' "$CONFIG")
if [ "$AUTO_UPLOAD" != "true" ]; then
  exit 0
fi

# Check if notebooklm CLI is available
if ! command -v notebooklm &>/dev/null; then
  exit 0
fi

NOTEBOOK_ID=$(jq -r '.notebookId' "$CONFIG")
mkdir -p "$QUEUE_DIR"

# For pipeline agents: queue upload of their outputs
if [ "$IS_PIPELINE" = true ]; then
  STAGE=""
  UPLOAD_FILES=""
  case "$AGENT_TYPE" in
    data-collector)
      STAGE="scrape"
      UPLOAD_FILES="data/raw/latest-scrape.json"
      ;;
    market-analyst)
      STAGE="analyze"
      UPLOAD_FILES="data/processed/market-analysis.json"
      ;;
    deal-scout)
      STAGE="score"
      UPLOAD_FILES="data/processed/scored-leads.json"
      ;;
    outreach-specialist)
      STAGE="outreach"
      UPLOAD_FILES="data/processed/outreach-scripts.json"
      ;;
    lead-researcher)
      STAGE="research"
      UPLOAD_FILES="data/research/latest-findings.json"
      ;;
  esac

  # Write trigger file for next upload cycle
  TRIGGER=$(jq -n \
    --arg ts "$TIMESTAMP" \
    --arg agent "$AGENT_TYPE" \
    --arg stage "$STAGE" \
    --arg files "$UPLOAD_FILES" \
    --arg notebook "$NOTEBOOK_ID" \
    '{timestamp: $ts, agent: $agent, stage: $stage, files: $files, notebookId: $notebook, status: "queued"}')

  echo "$TRIGGER" > "$QUEUE_DIR/${AGENT_TYPE}-${TIMESTAMP}.json"

  # Log the queue event
  LOG=$(jq -n \
    --arg ts "$TIMESTAMP" \
    --arg agent "$AGENT_TYPE" \
    --arg event "upload-queued" \
    --arg msg "Queued notebook upload after $AGENT_TYPE completed $STAGE stage" \
    '{timestamp: $ts, agent: $agent, event: $event, message: $msg}')
  echo "$LOG" >> "$LOG_FILE"
fi

# For notebook agents completing: log their results
if [ "$IS_NOTEBOOK" = true ]; then
  LOG=$(jq -n \
    --arg ts "$TIMESTAMP" \
    --arg agent "$AGENT_TYPE" \
    --arg event "notebook-agent-completed" \
    --arg msg "$AGENT_TYPE finished its task" \
    '{timestamp: $ts, agent: $agent, event: $event, message: $msg}')
  echo "$LOG" >> "$LOG_FILE"
fi

exit 0
