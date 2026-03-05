#!/bin/bash
# PreCompact hook: Preserves critical context before compaction
# Ensures important data survives context compression

INPUT=$(cat)
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
mkdir -p data/logs

echo "{\"timestamp\":\"$TIMESTAMP\",\"event\":\"pre_compact\"}" >> data/logs/sessions.jsonl

# The main protection is that CLAUDE.md and agent memory are re-read
# from disk after compaction. This hook just logs the event.
exit 0
