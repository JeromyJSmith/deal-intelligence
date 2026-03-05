---
description: Generate a summary report of CREXI deal findings
argument-hint: "[date]"
allowed-tools: Read, Write, Glob, Grep
---

# Deal Report

Compile a summary report of all findings from a research run.

## Arguments

- `$0` — Date of run to report on (YYYY-MM-DD). Default: today

## Report Sections

1. **Executive Summary**
   - Total listings scraped
   - Listings analyzed
   - Hot/warm/cold breakdown
   - Top 3 opportunities

2. **Market Overview**
   - Average cap rates by property type
   - Average DOM by property type
   - Price trends observed

3. **Top Opportunities**
   - Top 10 deals by score
   - Score breakdown for each
   - Key highlights and risks

4. **Outreach Status**
   - Scripts generated
   - Seller types identified
   - Recommended first contacts

5. **Recommendations**
   - Markets to watch
   - Property types trending
   - Strategy adjustments

## Output

Save report to `data/exports/YYYY-MM-DD_report.md`
