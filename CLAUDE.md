# Deal Intelligence - Agent Team Project

## Project Purpose

Automated deal opportunity discovery across ANY asset class.
A multi-agent intelligence system that researches, analyzes, and surfaces
owner-financed and motivated-seller opportunities — real estate, businesses,
notes, land, franchises, and any cash-flowing asset.

**CRITICAL: Deal Intelligence is NOT limited to commercial real estate.**
The methodology — motivated seller identification, deal scoring, owner
financing structure, prediction market signals — applies universally.
Never pigeonhole this system as "CRE" or "CREXI-only."

## Strategy (The Playbook)

1. **Find listings with long days-on-market** (5+ months = motivated seller)
2. **Filter for owner financing** keywords and seller-carry terms
3. **Target property types**: Gas stations, car washes, mobile home parks, self storage, special purpose
4. **Analyze deal economics**: Cap rate, NOI, price per unit, asking vs market value
5. **Profile sellers**: Identify retirement signals, portfolio liquidation, distress indicators
6. **Generate outreach**: Craft personalized contact scripts for each opportunity

## Architecture

- **5 specialized agents** work as a team (see `.claude/agents/`)
- **Shared memory** enables cross-session learning (`.claude/agent-memory/`)
- **Hooks** validate data quality and enforce safety rules
- **Skills** encapsulate reusable workflows (scraping, analysis, outreach)
- **Rules** enforce CRE-specific conventions and ethical guidelines

## Key URLs

- Platform: https://www.crexi.com
- Search: https://www.crexi.com/properties
- Owner Finance: https://www.crexi.com/properties?term=owner+financing
- Mobile Home Parks: https://www.crexi.com/properties?types[]=Mobile+Home+Park
- Gas Stations: https://www.crexi.com/properties?types[]=Special+Purpose&subtypes[]=Gas+Station
- Car Washes: https://www.crexi.com/properties?types[]=Special+Purpose&subtypes[]=Car+Wash

## CREXI Search URL Parameters

```
Base: https://www.crexi.com/properties?
  types[]=<PropertyType>
  &subtypes[]=<Subtype>
  &term=<keyword>
  &sort=<Relevance|Newest|Price>
  &page=<number>
```

## Target Keywords for Motivated Sellers

owner financing, seller financing, owner will carry, motivated seller,
below market, must sell, price reduced, value add, distressed, as-is,
estate sale, bank owned, REO, retiring, portfolio sale

## Property Types of Interest

| Category | Subtypes | Why |
|----------|----------|-----|
| Special Purpose | Gas Station, Car Wash, Auto Shop | Cash flow, owner-operated |
| Mobile Home Park | All | Passive income, scalable |
| Self Storage | All | Low maintenance, recession-proof |
| Multifamily | Apartment Building | Cash flow, appreciation |
| Business for Sale | All | Operating businesses with revenue |
| Hospitality | Motel | Value-add opportunities |

## Data Schema (Per Opportunity)

```json
{
  "id": "crexi-listing-id",
  "url": "listing-url",
  "name": "property-name",
  "type": "property-type",
  "subtype": "subtype",
  "address": "full-address",
  "state": "state",
  "askingPrice": 0,
  "capRate": 0,
  "noi": 0,
  "pricePerUnit": 0,
  "units": 0,
  "sqft": 0,
  "acreage": 0,
  "daysOnMarket": 0,
  "broker": "broker-name",
  "brokerage": "firm-name",
  "financingTerms": "owner-finance-details",
  "distressSignals": [],
  "investmentHighlights": [],
  "sellerMotivation": "analysis",
  "outreachScript": "personalized-pitch",
  "dealScore": 0,
  "scrapedAt": "iso-datetime",
  "analyzedAt": "iso-datetime"
}
```

## Commands

| Command | Purpose |
|---------|---------|
| `/hunt` | Run full pipeline: scrape -> analyze -> score -> report |
| `/scrape` | Scrape CREXI listings for target property types |
| `/analyze` | Analyze scraped listings for deal quality |
| `/score` | Score and rank opportunities |
| `/outreach` | Generate seller contact scripts |
| `/report` | Generate summary report of findings |
| `/watch` | Set up monitoring for new listings |

## NotebookLM Integration (Second Brain & Research Team)

Our knowledge base lives in Google NotebookLM, powered by `notebooklm-py` CLI.

**Notebook**: `20df62c7-c167-4b61-accb-343d7e23b3bc`
**Config**: `data/notebook-config.json`

### Commands

| Command | Purpose |
|---------|---------|
| `/notebook-upload` | Upload project artifacts to knowledge base |
| `/notebook-research` | Query knowledge base, run deep research |
| `/notebook-report` | Generate reports, slides, audio, mind maps |

### Subagent Team

| Agent | Role |
|-------|------|
| `notebook-uploader` | Uploads pipeline outputs, docs, URLs to NotebookLM |
| `notebook-researcher` | Queries knowledge graph, runs deep research |
| `notebook-reporter` | Generates deliverables (reports, slides, audio, etc.) |

### Auto-Sync

The `notebook-sync.sh` hook fires after every pipeline agent completes:
- Queues notebook upload of the agent's outputs
- Logs sync events to `data/logs/notebook-uploads.jsonl`
- Upload queue stored in `data/logs/notebook-queue/`

### Artifact Storage

- Reports: `data/artifacts/reports/`
- Slides: `data/artifacts/slides/`
- Audio: `data/artifacts/audio/`
- Research findings: `data/research/`
- Manifest: `data/artifacts/manifest.json`

### CLI Usage

Always pass `-n 20df62c7-c167-4b61-accb-343d7e23b3bc` explicitly.
```bash
notebooklm ask "question" -n 20df62c7-c167-4b61-accb-343d7e23b3bc
notebooklm source add <file-or-url> -n 20df62c7-c167-4b61-accb-343d7e23b3bc
notebooklm generate report -n 20df62c7-c167-4b61-accb-343d7e23b3bc
notebooklm research deep "query" -n 20df62c7-c167-4b61-accb-343d7e23b3bc
```

## Conventions

- All data files in `data/` directory
- Raw scrapes go to `data/raw/` with ISO date prefix
- Processed data goes to `data/processed/`
- Export reports go to `data/exports/`
- Scripts use Node.js or Python
- All monetary values in USD, no currency symbols in data
- Dates in ISO 8601 format
- Cap rates as decimals (0.08 not 8%)

@docs/crexi-platform.md
@docs/deal-criteria.md
