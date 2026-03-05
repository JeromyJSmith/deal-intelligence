# Research via NotebookLM

Query our knowledge base, run deep research, and extract insights for deal-finding and project development.

## Research topic

$ARGUMENTS

If no arguments provided, run default research queries from notebook config.

## Process

1. Load notebook config from `data/notebook-config.json`
2. Verify auth: `notebooklm auth check`

### For knowledge queries (quick answers):
```bash
notebooklm ask "<question>" -n 20df62c7-c167-4b61-accb-343d7e23b3bc --save-as-note
```

### For deep research (comprehensive):
```bash
notebooklm research deep "<query>" -n 20df62c7-c167-4b61-accb-343d7e23b3bc
notebooklm research wait <research_id>
notebooklm research wait --import-all <research_id>
```

## Research modes

1. **deal** — Research each hot lead: market conditions, comparable sales, demographics
2. **feature** — Research CRE analytics best practices, what features to build
3. **deep "<query>"** — Full deep research on a specific topic
4. **ask "<question>"** — Quick knowledge query across all sources

## Output

- Write findings to `data/research/<topic>-<timestamp>.json`
- Include source citations in all findings
- Generate actionable next-steps list
- Save important discoveries as notes in the notebook

## Important

- Add 2-second delays between API calls
- Deep research can take minutes — be patient with `research wait`
- Always save important findings as notebook notes
- If a query fails, log it and continue with the next
