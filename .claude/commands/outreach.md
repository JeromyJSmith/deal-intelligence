---
description: Generate personalized outreach scripts for top CREXI deal opportunities
argument-hint: "[data-file] [min-score]"
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
---

# Generate Outreach

Create personalized phone scripts, email drafts, and follow-up plans for top deals.

## Arguments

- `$0` — Path to scored data file (optional). Default: most recent scored file
- `$1` — Minimum deal score (optional). Default: 70 (hot leads only)

## Process

1. Read scored listings from specified file or latest scored file
2. Filter to listings with score >= minimum (default 70)
3. For each qualifying listing:
   - Classify seller type (retiring, motivated, estate, etc.)
   - Generate personalized phone script
   - Draft email template
   - Create follow-up schedule
   - Prepare objection handling notes
4. Save to `data/exports/`

Delegate to `outreach-specialist` agent for execution.
