#!/bin/bash
# SubagentStop hook: Captures agent completion and updates dashboard
#
# Receives JSON on stdin with agent info.
# Logs to activity JSONL, then triggers dashboard state rebuild.

INPUT=$(cat)
AGENT_TYPE=$(echo "$INPUT" | jq -r '.agent_type // "unknown"')
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

ROOT_DIR="$(cd "$(dirname "$0")/../.." && pwd)"
LOG_DIR="$ROOT_DIR/data/logs"
LOG_FILE="$LOG_DIR/agent-activity.jsonl"

mkdir -p "$LOG_DIR"

# Map agent to pipeline stage
STAGE=""
case "$AGENT_TYPE" in
  data-collector)   STAGE="scrape" ;;
  market-analyst)   STAGE="analyze" ;;
  deal-scout)       STAGE="score" ;;
  outreach-specialist) STAGE="outreach" ;;
esac

# Log agent completion
LOG_ENTRY=$(jq -n \
  --arg ts "$TIMESTAMP" \
  --arg agent "$AGENT_TYPE" \
  --arg stage "$STAGE" \
  --arg event "completed" \
  --arg msg "$AGENT_TYPE completed pipeline stage: $STAGE" \
  '{timestamp: $ts, agent: $agent, stage: $stage, event: $event, message: $msg}')

echo "$LOG_ENTRY" >> "$LOG_FILE"

# Trigger dashboard update in background (non-blocking)
if [ -f "$ROOT_DIR/scripts/update-dashboard.sh" ]; then
  ARGS=""
  [ -n "$STAGE" ] && ARGS="--stage $STAGE"
  [ "$AGENT_TYPE" != "unknown" ] && ARGS="$ARGS --agent $AGENT_TYPE"
  bash "$ROOT_DIR/scripts/update-dashboard.sh" $ARGS &>/dev/null &
fi

exit 0
