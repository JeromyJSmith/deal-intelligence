#!/bin/bash
# PostToolUse hook: Validates data files after write operations
# Checks JSON validity for data directory files

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // .tool_input.path // empty')

# Only validate files in data/ directory
if [[ "$FILE_PATH" == data/*.json ]]; then
  if [ -f "$FILE_PATH" ]; then
    if ! jq empty "$FILE_PATH" 2>/dev/null; then
      echo "WARNING: Invalid JSON written to $FILE_PATH"
      exit 1
    fi
  fi
fi

exit 0
