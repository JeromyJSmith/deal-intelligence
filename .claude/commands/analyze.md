---
description: Analyze scraped CREXI listings for deal quality and market positioning
argument-hint: "[data-file]"
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, WebSearch
---

# Analyze Listings

Enrich raw CREXI listing data with market analysis.

## Arguments

- `$0` — Path to raw data file (optional). Default: most recent file in `data/raw/`

## Process

1. Read raw listings from specified file or latest in `data/raw/`
2. For each listing:
   - Compare price to market benchmarks (see `references/market-benchmarks.md`)
   - Validate cap rate and NOI against expense ratio norms
   - Calculate price per unit/sqft/pad
   - Detect distress signals (DOM, price cuts, keywords)
   - Identify owner financing signals
3. Output enriched data to `data/processed/`

Delegate to `market-analyst` agent for execution.
