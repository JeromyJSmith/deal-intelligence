---
description: Set up monitoring for new CREXI listings matching target criteria
argument-hint: "[type] [keyword]"
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
---

# Watch for New Listings

Configure monitoring criteria and check for new listings since last run.

## Arguments

- `$0` — Property type to watch (or "all")
- `$1` — Keyword to monitor (optional)

## Process

1. Read existing watch criteria from `data/watchlist.json`
2. If new criteria provided, add to watchlist
3. For each watch item:
   - Construct CREXI search URL with `sort=Newest`
   - Compare results to previously seen listing IDs
   - Flag new listings not in `data/processed/seen-ids.json`
4. If new listings found, run them through the analysis pipeline
5. Update `seen-ids.json` with new IDs

## Watchlist Schema

```json
{
  "watches": [
    {
      "id": "watch-1",
      "type": "Mobile Home Park",
      "subtype": "",
      "keyword": "owner financing",
      "location": "",
      "createdAt": "ISO-datetime",
      "lastChecked": "ISO-datetime"
    }
  ]
}
```

## Output

- Updated `data/watchlist.json`
- Updated `data/processed/seen-ids.json`
- New listings added to analysis pipeline if found
