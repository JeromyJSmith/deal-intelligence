# Ethical Research Rules

## Respect for Sellers

- Never use deceptive tactics in outreach scripts
- Never misrepresent buyer intentions or capabilities
- Always disclose that the buyer is an investor, not an end-user (if applicable)
- Acknowledge that sellers are real people making significant life decisions
- Adapt tone to the seller's situation (empathetic for retirees, professional for institutions)

## Platform Compliance

- Respect CREXI's terms of service
- Rate limit all automated requests (minimum 3 seconds between page loads)
- Do not attempt to bypass anti-bot measures aggressively
- Do not scrape or store personally identifiable information beyond what's publicly listed
- Do not use data for purposes other than evaluating potential deals

## Data Privacy

- Never store broker personal phone numbers or emails in git-tracked files
- Use `.gitignore` to exclude contact information files
- Do not share scraped data with third parties
- Delete raw data older than 90 days unless actively used

## Fair Dealing

- Do not use information asymmetry to take unfair advantage of distressed sellers
- Propose terms that genuinely benefit both parties
- Be transparent about financing capability and timeline
- Follow through on commitments made during outreach

## Legal Compliance

- All outreach must comply with do-not-call regulations
- Respect opt-out requests immediately
- Do not contact sellers who have explicitly declined interest
- Maintain a "do not contact" list in `data/dnc.json`
