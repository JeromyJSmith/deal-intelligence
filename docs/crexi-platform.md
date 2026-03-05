# CREXI Platform Reference

## Overview

CREXI (Commercial Real Estate Exchange, Inc.) is an AI-powered CRE marketplace
with $815B+ in active listings, 50M+ lifetime users, and 153M+ property records.

## Products

| Product | Purpose | Cost |
|---------|---------|------|
| Marketplace | Free listing search and lead generation | Free |
| Intelligence | Property records, comps, ownership data, analytics | ~$299/mo |
| PRO | Marketing, lead gen, deal workflow, CRM | Custom |
| Auction | Competitive bidding (96% close rate) | Transaction-based |

## Data Available (Free Tier)

- Property name, description, images
- Asking price, cap rate, NOI
- Address, property type, subtype
- Square footage, acreage, units
- Broker name and brokerage
- Investment highlights
- Lease type, tenancy info

## Data Available (Intelligence - Paid)

- Days on market history
- Pre-foreclosure status
- Loan maturity dates, CMBS data
- Ownership contact info (1,000+ credits/mo)
- Sales comps (46M+ verified)
- Lease comps (1.7M spaces)
- Tax and demographic data
- Zoning and permitting

## Technical Notes

- SPA with dynamic JavaScript rendering
- Behind Cloudflare WAF protection
- No public read API (official API is for pushing listings only)
- URL parameter-based filtering system
- Internal API exists but is undocumented

## Anti-Bot Protections

- Cloudflare WAF + TLS fingerprinting
- Browser fingerprinting (Canvas, WebGL, Audio)
- Behavioral analysis (mouse, click patterns)
- IP reputation scoring and rate limiting
- Cloudflare Turnstile challenges
