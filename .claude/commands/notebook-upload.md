# Upload sources to NotebookLM

Upload project artifacts, pipeline outputs, and research findings to our CREXI Deal Finder notebook.

## What to upload

$ARGUMENTS

If no arguments provided, upload recent pipeline outputs:
1. Read `data/notebook-config.json` for notebook ID
2. Check `data/state.json` for latest pipeline data
3. Upload scored leads, outreach scripts, and any new reports

## Process

1. Load notebook config from `data/notebook-config.json`
2. Verify auth: `notebooklm auth check`
3. For each source:
   - Files: `notebooklm source add <path> -n <notebook_id>`
   - URLs: `notebooklm source add <url> -n <notebook_id>`
   - Large JSON: Summarize to markdown temp file first, then upload
4. Wait for indexing: `notebooklm source wait <source_id> -n <notebook_id>`
5. Log results to `data/logs/notebook-uploads.jsonl`

## Upload targets

- `data/state.json` — Current pipeline state (summarized)
- `data/leads/*.json` — Scored lead data
- `data/outreach/*.json` — Outreach scripts
- `data/reports/*.md` — Generated reports
- `CLAUDE.md` — Project documentation
- `.claude/agents/*.md` — Agent specifications
- Any URLs or files specified in arguments

## Important

- Always use `-n 20df62c7-c167-4b61-accb-343d7e23b3bc` explicitly
- Max file size ~20MB per source
- Add 2s delay between uploads to avoid rate limits
- Log every upload with timestamp and status
