# CREXI URL Patterns Reference

## Base URL

```
https://www.crexi.com/properties
```

## Query Parameters

### Property Type (`types[]`)

Supports multiple via repeated parameter:
```
types[]=Mobile+Home+Park&types[]=Self+Storage
```

Available values:
- `Retail`
- `Office`
- `Industrial`
- `Multifamily`
- `Mixed+Use`
- `Special+Purpose`
- `Business+for+Sale`
- `Hospitality`
- `Self+Storage`
- `Mobile+Home+Park`
- `Senior+Living`
- `Note/Loan`
- `Land`

### Subtypes (`subtypes[]`)

Must pair with parent type. Examples:

**Special Purpose:**
- `Gas+Station`
- `Car+Wash`
- `Auto+Shop`
- `Parking+Garage`
- `Church`
- `Day+Care`
- `Marina`

**Retail:**
- `Strip+Mall`
- `Shopping+Center`
- `Convenience+Store`
- `Restaurant`

**Land:**
- `Commercial+Land`
- `Agricultural/Farmland`
- `Industrial+Land`

### Keyword Search (`term`)

Free text search across listing titles and descriptions:
```
term=owner+financing
term=motivated+seller
term=must+sell
term=price+reduced
term=retiring
```

### Sort (`sort`)

- `Relevance` (default)
- `Newest`
- `Price` (ascending)
- `-Price` (descending)

### Pagination (`page`)

1-indexed: `page=1`, `page=2`, etc.

### Location

- `placeIds[]` — Google Place IDs for geographic filtering
- SEO-friendly paths: `/properties/CA/Gas-Station`

## Common Search Combinations

```bash
# Owner-financed mobile home parks
"?types[]=Mobile+Home+Park&term=owner+financing"

# Distressed gas stations
"?types[]=Special+Purpose&subtypes[]=Gas+Station&term=motivated+seller"

# Below-market self storage
"?types[]=Self+Storage&term=below+market"

# All owner financing, sorted by relevance
"?term=owner+financing&sort=Relevance"

# Car washes with value-add potential
"?types[]=Special+Purpose&subtypes[]=Car+Wash&term=value+add"
```
