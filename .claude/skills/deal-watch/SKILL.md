---
name: deal-watch
description: Sets up and manages daily automated deal monitoring. Configures cron schedule to run the full pipeline daily, tracks new deals since last run, surfaces only net-new opportunities, and maintains a deal changelog. Use when user says "set up daily monitoring", "/watch", "run this every day", "automate the hunt", "monitor for new deals", "schedule daily scans", "set up alerts", or "run pipeline on a schedule".
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
metadata:
  author: Deal Intelligence
  version: 2.0.0
  category: workflow-automation
  tags: [monitoring, automation, daily-run, scheduling]
---

# Deal Watch

Sets up daily automated deal monitoring and surfaces net-new opportunities since last run.

## Instructions

### Step 1: Check Current Watch Status

Read `data/watch/status.json` if it exists.
Shows: last run timestamp, cron status, deal count history.

If no status file: this is first-time setup. Proceed to Step 2.

### Step 2: Set Up Daily Runner Script

Create/verify `scripts/daily-hunt.sh` exists.
Run: `bash scripts/daily-hunt.sh --check` to verify it executes without errors.

The script runs the full pipeline and saves output with today's date.

### Step 3: Configure Cron Schedule

Check existing cron: `crontab -l`

Add daily 6 AM run:
```
0 6 * * * cd [project-path] && bash scripts/daily-hunt.sh >> data/logs/daily-hunt.log 2>&1
```

Confirm with user before writing cron. Show them the exact line first.

### Step 4: Initialize Deal Changelog

Create `data/watch/deal-changelog.json` if not exists:
```json
{
  "lastRun": null,
  "knownDealIds": [],
  "newDealsThisRun": [],
  "history": []
}
```

### Step 5: Run First Watch Scan

Execute full pipeline via `scripts/daily-hunt.sh`.
Compare results against `knownDealIds`.
Flag anything not in known list as NEW.

### Step 6: Report Net-New Deals

Output only deals that weren't in the last run:
```
NEW DEALS SINCE [last run date]:
[Zone] — [Deal Name] — [Tier] — Score: [X]
[description why it's new/interesting]
```

If no new deals: "No new deals since [date]. [X] existing deals still active."

### Step 7: Update Status

Write to `data/watch/status.json`:
```json
{
  "lastRun": "ISO-8601",
  "cronInstalled": true,
  "totalKnownDeals": 0,
  "newDealsThisRun": 0,
  "runHistory": []
}
```

## Examples

### Example 1: First-time setup
User: "/watch"
Actions: Check status → create daily-hunt.sh → show cron line → run first scan → initialize changelog
Result: Daily monitoring active, first report generated

### Example 2: Check new deals
User: "what's new since yesterday"
Actions: Load changelog → compare latest pipeline run → show only net-new deals
Result: List of new deals with tier and score

### Example 3: View watch status
User: "is the watch running"
Actions: Read status.json → check cron with crontab -l → report status
Result: "Watch active. Last run: [date]. [X] deals tracked."

## Error Handling

- Cron not available: Provide manual run instructions instead
- Script fails: Check data/logs/daily-hunt.log for error details
- No internet during run: Log failure, skip that run, do not corrupt changelog

## References

- `references/cron-setup.md` — Platform-specific cron configuration
