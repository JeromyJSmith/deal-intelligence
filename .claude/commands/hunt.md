---
description: Run the full CREXI deal-finding pipeline — scrape, analyze, score, and generate outreach
argument-hint: "[property-type] [location]"
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, Agent, WebSearch, WebFetch
---

# Full Pipeline Hunt

Run the complete deal-finding pipeline for CREXI listings.

## Arguments

- `$0` — Property type (optional): mobile-home-park, gas-station, car-wash, self-storage, all
- `$1` — Location (optional): state abbreviation or "nationwide"

Default: all property types, nationwide

## Pipeline Steps

1. **Scrape**: Delegate to `data-collector` agent to gather current listings
   - Target property types: $0 or all target types
   - Target location: $1 or nationwide
   - Keywords: owner financing, motivated seller, must sell
   - Save to `data/raw/`

2. **Analyze**: Delegate to `market-analyst` agent to enrich with market context
   - Compare prices to market benchmarks
   - Validate cap rates and NOI
   - Identify distress signals
   - Save to `data/processed/`

3. **Score**: Delegate to `deal-scout` agent to rank opportunities
   - Apply 100-point scoring rubric
   - Classify into hot/warm/cold tiers
   - Save to `data/processed/`

4. **Outreach**: Delegate to `outreach-specialist` for top deals (score >= 70)
   - Profile seller type
   - Generate phone scripts and email drafts
   - Create follow-up plans
   - Save to `data/exports/`

5. **Report**: Compile final summary
   - Total listings found
   - Top 10 opportunities with scores
   - Outreach scripts for hot leads
   - Save report to `data/exports/`

## Usage

```
/hunt                           # All types, nationwide
/hunt mobile-home-park          # MHP only, nationwide
/hunt gas-station TX            # Gas stations in Texas
/hunt all CA                    # All types in California
```
