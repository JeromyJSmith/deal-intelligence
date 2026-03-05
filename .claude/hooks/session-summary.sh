#!/bin/bash
# Stop hook: Saves session summary when Claude finishes responding
# Creates a session log entry

TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
mkdir -p data/logs

echo "{\"timestamp\":\"$TIMESTAMP\",\"event\":\"session_stop\"}" >> data/logs/sessions.jsonl

exit 0
