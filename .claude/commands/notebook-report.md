# Generate NotebookLM artifacts

Generate reports, slide decks, audio podcasts, mind maps, and other deliverables from our knowledge base.

## What to generate

$ARGUMENTS

If no arguments, generate a briefing-doc report on latest findings.

## Artifact types

| Type | Command | Use Case |
|------|---------|----------|
| **report** | `notebooklm generate report -n <id>` | Market analysis, deal summaries |
| **slide-deck** | `notebooklm generate slide-deck -n <id>` | Investor proposals, opportunity cards |
| **audio** | `notebooklm generate audio -n <id>` | Deal briefings, research summaries |
| **mind-map** | `notebooklm generate mind-map -n <id>` | Relationship mapping, concept exploration |
| **quiz** | `notebooklm generate quiz -n <id>` | Knowledge verification |
| **data-table** | `notebooklm generate data-table -n <id>` | Comparative analysis |

## Process

1. Load notebook config from `data/notebook-config.json`
2. Generate artifact: `notebooklm generate <type> -n 20df62c7-c167-4b61-accb-343d7e23b3bc`
3. Wait: `notebooklm artifact wait <artifact_id> -n 20df62c7-c167-4b61-accb-343d7e23b3bc`
4. Download: `notebooklm download <artifact_id> -n 20df62c7-c167-4b61-accb-343d7e23b3bc`
5. Move to `data/artifacts/<type>/`
6. Update `data/artifacts/manifest.json`
7. Generate actionable task list → `data/research/next-actions-<timestamp>.json`

## Report styles

- **briefing-doc** — Executive summary for quick decisions (default)
- **study-guide** — Comprehensive deep-dive
- **blog-post** — Narrative format
- **custom "<instructions>"** — Specify exact format

## Audio formats

- **deep-dive** — 15-30min comprehensive discussion (default)
- **brief** — 5-10min quick overview
- **critique** — Analytical evaluation
- **debate** — Multiple perspectives

## Important

- Audio/video generation may be rate-limited — retry with 60s backoff
- Mind maps are synchronous (instant), everything else is async
- Always wait for generation before downloading
- Slide decks can be revised: `notebooklm generate revise-slide <id> <index> "<instructions>"`
