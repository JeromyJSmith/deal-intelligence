#!/bin/bash
# PreToolUse hook: Validates Bash commands for safety
# Exit 0 = allow, Exit 2 = block

INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

# Block dangerous commands
if echo "$COMMAND" | grep -qE 'rm -rf /|rm -rf ~|sudo rm|chmod 777'; then
  echo "BLOCKED: Dangerous command detected: $COMMAND"
  exit 2
fi

# Block credential access
if echo "$COMMAND" | grep -qE '\.env|\.aws|\.ssh|credentials'; then
  echo "BLOCKED: Credential file access detected: $COMMAND"
  exit 2
fi

# Warn on curl piped to shell
if echo "$COMMAND" | grep -qE 'curl.*\|.*sh|wget.*\|.*sh'; then
  echo "BLOCKED: Pipe-to-shell detected: $COMMAND"
  exit 2
fi

exit 0
