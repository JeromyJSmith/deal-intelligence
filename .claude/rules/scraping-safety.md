# Scraping Safety Rules

## Rate Limiting

- Minimum 3-second delay between page requests
- Maximum 100 pages per session
- If rate-limited or blocked, stop immediately and wait 30 minutes
- Never use concurrent requests to the same domain

## Error Handling

- Log all HTTP errors (403, 429, 500) to `data/raw/errors.log`
- On 403 (Forbidden): Stop scraping, note in memory, try again later
- On 429 (Rate Limited): Back off exponentially (30s, 60s, 120s, etc.)
- On 500 (Server Error): Retry once after 10 seconds, then skip

## Data Integrity

- Always validate JSON before saving to disk
- Include `scrapeDate` and `searchParams` in every output file
- Never overwrite existing data files — create new timestamped files
- Verify record count matches expected total

## Browser Automation

- Prefer `WebFetch` over browser automation when possible (lighter weight)
- When using `agent-browser`, always close sessions after completion
- Set realistic viewport sizes and user agents
- Do not modify cookies or inject JavaScript to bypass protections
