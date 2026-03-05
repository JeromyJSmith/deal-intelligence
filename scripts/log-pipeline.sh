#!/bin/bash
# Pipeline Stage Logger
#
# Call from commands/agents to log pipeline activity and update dashboard.
#
# Usage:
#   ./scripts/log-pipeline.sh --stage scrape --agent data-collector --event started
#   ./scripts/log-pipeline.sh --stage scrape --agent data-collector --event completed --message "Scraped 15 listings"
#   ./scripts/log-pipeline.sh --event info --message "Manual dashboard refresh"

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
LOG_DIR="$ROOT_DIR/data/logs"
LOG_FILE="$LOG_DIR/agent-activity.jsonl"
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

STAGE=""
AGENT=""
EVENT="info"
MESSAGE=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --stage)  STAGE="$2"; shift 2 ;;
    --agent)  AGENT="$2"; shift 2 ;;
    --event)  EVENT="$2"; shift 2 ;;
    --message) MESSAGE="$2"; shift 2 ;;
    *) shift ;;
  esac
done

[ -z "$MESSAGE" ] && MESSAGE="${AGENT:-system} ${EVENT} ${STAGE:+stage: $STAGE}"

mkdir -p "$LOG_DIR"

LOG_ENTRY=$(jq -n \
  --arg ts "$TIMESTAMP" \
  --arg agent "${AGENT:-system}" \
  --arg stage "$STAGE" \
  --arg event "$EVENT" \
  --arg msg "$MESSAGE" \
  '{timestamp: $ts, agent: $agent, stage: $stage, event: $event, message: $msg}')

echo "$LOG_ENTRY" >> "$LOG_FILE"

# Update dashboard state
if [ -f "$ROOT_DIR/scripts/update-dashboard.sh" ]; then
  ARGS=""
  [ -n "$STAGE" ] && ARGS="--stage $STAGE"
  [ -n "$AGENT" ] && ARGS="$ARGS --agent $AGENT"
  bash "$ROOT_DIR/scripts/update-dashboard.sh" $ARGS
fi
