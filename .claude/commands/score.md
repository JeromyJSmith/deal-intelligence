---
description: Score and rank CREXI deal opportunities by investment quality
argument-hint: "[data-file]"
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
---

# Score Deals

Apply scoring rubric to analyzed listings and rank by opportunity quality.

## Arguments

- `$0` — Path to analyzed data file (optional). Default: most recent in `data/processed/`

## Process

1. Read analyzed listings from specified file or latest analyzed file
2. Apply 100-point scoring rubric:
   - Seller Motivation (30 pts): DOM, price cuts, keywords, financing offered
   - Deal Economics (30 pts): Cap rate, price vs market, NOI credibility
   - Financing Terms (20 pts): Owner financing, down payment, flexibility
   - Property Quality (20 pts): Cash flow, essential service, value-add, scale
3. Classify: Hot (70+), Warm (50-69), Cold (<50)
4. Rank by total score descending
5. Save to `data/processed/`

Delegate to `deal-scout` agent for execution.
