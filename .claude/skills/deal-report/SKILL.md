---
name: deal-report
description: Generates formatted deal intelligence reports from pipeline output. Produces executive summary, zone-by-zone breakdown for NCA (Grass Valley/Nevada City CA), Colorado, and nationwide top 3, hidden gems section, prediction market context, and ready-to-send deal packages. Use when user says "generate report", "/report", "summarize deals", "create deal summary", "what did the pipeline find", "show me the results", or "compile the findings".
allowed-tools: Read, Write, Glob, Grep
metadata:
  author: Deal Intelligence
  version: 2.0.0
  category: document-creation
  tags: [reporting, deal-summary, pipeline-output]
---

# Deal Report

Compiles pipeline output into a formatted, actionable deal intelligence report.

## Instructions

### Step 1: Load Data

Read latest files from:
- `data/processed/` — scored deals (use most recent by date)
- `data/raw/` — fallback if no processed data exists

If no data exists: output error "No pipeline data found. Run /hunt first."

### Step 2: Build Executive Summary

```
## Deal Intelligence Report
Date: [today]
Pipeline Run: [timestamp from data file]
Sources Scanned: [list sources that returned data]
Total Listings Found: [count]
After Scoring: [X] HOT | [Y] WARM | [Z] WATCH | [N] PASS
Hidden Gems Detected: [count]
```

### Step 3: Zone NCA — Grass Valley / Nevada City

For all NCA deals, sorted by score descending:

For each HOT/WARM deal:
```
### [Deal Name] — [Tier Badge]
Score: [X]/100 [+ hidden gem flag if applicable]
Asset Type: [type — never assume "commercial real estate"]
Location: [city, county, state]
Price: $[X] | DOM: [X] days | [Owner Finance / Auction / Pain-Point]
Why: [2-sentence explanation of what makes this deal]
Regional Context: [zone regionalScore context from market-analyst]
Action: [specific next step]
```

### Step 4: Zone CO — Colorado

Same format as NCA. Group by sub-zone (Denver Metro / Front Range / Western Slope) if multiple deals.

### Step 5: Zone USA — Nationwide Top 3

CRITICAL: These 3 deals MUST be different asset classes.
If top 3 are same type, replace #2 or #3 with next highest-scoring different type.

Label each: "Deal #1 of 3 — [Asset Type]"

### Step 6: Hidden Gems Section

List all deals where `isHiddenGem: true`, regardless of zone.

For each gem:
```
### [Deal Name] — HIDDEN GEM
Surface Score: [X] | True Score: [Y] (after gem bonus)
Gem Reason: [gemReason field]
Why it matters: [what the surface miss is + what the intelligence layer found]
```

### Step 7: Prediction Market Context

Summarize current signals:
- Fed rate direction + probability
- Recession odds
- Regional housing trajectory (NCA + CO)
- Timing recommendation: ACT NOW / WAIT / MONITOR

### Step 8: Next Actions

For each HOT deal: "Call [broker/seller] today. LOI template at templates/loi.md."
For WATCH deals: "Set reminder to re-score in [X] days."

### Step 9: Save Report

Save to: `data/exports/YYYY-MM-DD_deal-intelligence-report.md`

Also save a condensed version (HOT deals only):
`data/exports/YYYY-MM-DD_hot-deals.md`

## Examples

### Example 1: Full report
User: "/report"
Actions: Load latest processed data → build full report → save both versions
Result: Full report + hot-deals summary in data/exports/

### Example 2: Zone-specific
User: "report on NCA deals only"
Actions: Filter to NCA zone → build report for that zone only
Result: NCA-only report

### Example 3: Quick hot deals
User: "show me just the hot deals"
Actions: Load scored data → filter HOT tier only → format as brief summary
Result: Console output of HOT deals with scores and action items

## Error Handling

- No HOT deals found: Report "No HOT deals this run. Top WARM deals shown." — show top 3 WARM
- Missing prediction market data: Show "Market signal unavailable — check /prediction-market-intel"
- Incomplete zone data: Note which zones had scan failures → still report on zones with data

## References

- `references/report-template.md` — Full report format template
