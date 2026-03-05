---
name: deal-outreach
description: Generates personalized outreach scripts for motivated sellers across any asset class. Profiles seller type — retiree, estate/probate, tired landlord, distressed, institutional — and crafts phone scripts, email drafts, and follow-up sequences. Scripts are built around seller pain points, not buyer wants. Use when user says "write outreach", "generate scripts", "/outreach", "how do I contact this seller", "write me a pitch", "create seller scripts", "what do I say to this broker", or "write a cold call script".
allowed-tools: Read, Write, Glob, Grep
metadata:
  author: Deal Intelligence
  version: 2.0.0
  category: document-creation
  tags: [outreach, scripts, seller-profiling, negotiation]
---

# Deal Outreach

Generates personalized, seller-specific outreach scripts for motivated-seller opportunities.

## CRITICAL
Scripts lead with seller pain, not buyer need. Never say "I want to buy your property."
Always say "I may be able to help solve [their problem]."

## Instructions

### Step 1: Load Deal Data
Read scored deals from `data/processed/YYYY-MM-DD_scored.json`.
Focus on HOT and WARM tier deals. WATCH only if user requests.

### Step 2: Profile Each Seller

Determine seller type from listing description, DOM, and context:

**Retiree / Retiring Owner**
- Signals: "retiring", "owner retiring", "40 years in business", "ready to move on"
- Pain: Tax hit from lump sum sale. Wants income, not event.
- Angle: "You become the bank — monthly checks, no tax event, income for life."

**Estate / Probate**
- Signals: "estate sale", "heirs", "trust sale", "court approval required"
- Pain: Multiple decision-makers, want fast clean exit, don't want hassle
- Angle: "Simplest possible close. Full price. No bank delays. Done."

**Tired Landlord / Operator**
- Signals: Long DOM, deferred maintenance language, "as-is", price cuts
- Pain: Done managing, wants relief, may be underwater on time investment
- Angle: "You walk away clean. We take over everything including headaches."

**Distressed / Motivated**
- Signals: Multiple price cuts, 180+ DOM, "must sell", "motivated"
- Pain: Can't close with traditional buyer. Stuck.
- Angle: "I don't need a bank. We can close on your timeline."

**Institutional / Broker-Represented**
- Signals: Professional listing, multiple properties, corporate language
- Pain: Fiduciary duty to maximize return for portfolio
- Angle: Full-price offer with clean terms. Minimize their liability.

### Step 3: Generate Phone Script

Structure:
```
Line 1: Pattern interrupt (not "Hi I'm calling about your property")
Line 2: Acknowledge their situation specifically
Line 3: One-sentence value prop relevant to their pain type
Line 4: Single soft question — not "are you interested?"
Line 5: Bridge to next step
```

Include:
- Objection handling for: "We have other offers", "Not interested", "Call my broker"
- Follow-up timing: 3 days, 7 days, 14 days
- Voicemail version (30 seconds max)

### Step 4: Generate Email

- Subject line: specific to their pain (not "Regarding Your Property")
- Body: 4 sentences max
- CTA: single, low-friction ask
- No attachments first contact

### Step 5: Build Owner Finance Pitch

If deal type supports it, generate offer structure:
```
Purchase Price: [asking or negotiated]
Down Payment: [lowest viable — 0-10%]
Seller Note: [balance]
Interest Rate: 5-7% (seller earns more than savings account)
Amortization: 20-30 years
Balloon: 5-10 years
Monthly Payment: [calculated]
```

Frame: "You become the bank. Higher rate than any savings account. Secured by the property you know."

### Step 6: Save Output

Save to: `data/exports/YYYY-MM-DD_outreach_[deal-id].md`

Each file includes:
- Deal summary (1 paragraph)
- Seller profile
- Phone script (with objections)
- Voicemail script
- Email draft
- Owner finance pitch
- Follow-up schedule

## Examples

### Example 1: Outreach for top deals
User: "/outreach"
Actions: Load HOT + WARM deals → profile each seller → generate scripts → save
Result: One outreach file per deal in data/exports/

### Example 2: Single deal
User: "write outreach for this listing [URL or deal name]"
Actions: Profile seller from listing → generate full outreach package
Result: Phone script + email + offer structure

### Example 3: Specific script type
User: "write me a cold call script for the Grass Valley motel"
Actions: Find matching deal → profile seller → generate phone script only
Result: Phone script with objections and voicemail

## Error Handling

- No seller name available: Use "the owner" — never "Sir/Ma'am"
- Broker-listed: Generate broker version first, seller direct version second
- No contact info: Note "Find broker contact on listing page" — do not fabricate contacts
- Auction deal: Shift to "competitive bidding strategy" instead of outreach script

## References

- `references/seller-types.md` — Full seller profiling guide with signals and angles
- `references/objection-handling.md` — Objection handling bank for all seller types
- `references/owner-finance-framing.md` — Owner finance pitch language guide
