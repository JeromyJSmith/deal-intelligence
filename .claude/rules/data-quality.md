# Data Quality Rules

## Required Fields

Every listing record MUST have:
- `id` — Non-empty string
- `url` — Valid CREXI URL
- `name` — Non-empty string
- `askingPrice` — Positive number
- `type` — Valid property type from CREXI taxonomy

Missing required fields = reject the record and log it.

## Numeric Validation

- `askingPrice` must be > 0 and < 1,000,000,000
- `capRate` must be between 0.01 and 0.50 (1% to 50%)
- `noi` must be > 0 if provided
- `units` must be positive integer if provided
- `sqft` must be positive number if provided
- `daysOnMarket` must be >= 0 if provided

## Date Validation

- All dates in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`
- `scrapeDate` required on every raw data file
- `listDate` should not be in the future

## Deduplication

- Use `id` field as primary key
- Before appending to processed data, check for existing records with same `id`
- If duplicate found, keep the newer record (by `scrapeDate`)

## File Naming

- Raw data: `data/raw/YYYY-MM-DD_<descriptor>.json`
- Processed: `data/processed/YYYY-MM-DD_<descriptor>.json`
- Exports: `data/exports/YYYY-MM-DD_<descriptor>.json`
- All filenames lowercase with hyphens, no spaces
