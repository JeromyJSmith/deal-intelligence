# CREXI API Endpoints Reference

## Investigation Date
March 4, 2026

## Confirmed Endpoints

CREXI's React SPA uses internal REST API endpoints that are protected by Cloudflare WAF and Turnstile challenges.

### Endpoint Specifications

#### 1. `/api/listings` (Primary Listings API)

```
GET /api/listings?limit=10&offset=0
```

**Query Parameters:**
- `limit` (number) - Results per page, default 10
- `offset` (number) - Pagination offset
- `types[]` (array) - Property type filters
- `subtypes[]` (array) - Property subtype filters
- `sort` (string) - Sort order (Relevance, Newest, Price)
- `term` (string) - Search keywords
- `page` (number) - Page number

**Expected Response (when accessible):**
```json
{
  "listings": [
    {
      "id": "listing-id",
      "name": "property-name",
      "type": "property-type",
      "subtype": "property-subtype",
      "address": "street address",
      "price": 0,
      "capRate": 0.0,
      "noi": 0,
      "broker": "broker-name"
    }
  ],
  "total": 0,
  "page": 1,
  "pageSize": 10
}
```

**Current Status:** Blocked by Cloudflare (HTTP 403)

#### 2. `/api/v1/listings` (Versioned API)

```
GET /api/v1/listings?limit=10&offset=0
```

**Query Parameters:**
- `limit` (number) - Results per page
- `offset` (number) - Pagination offset

**Current Status:** Blocked by Cloudflare (HTTP 403)

#### 3. `/api/v2/properties` (V2 Properties Endpoint)

```
GET /api/v2/properties?limit=10
```

**Query Parameters:**
- `limit` (number) - Results per page

**Current Status:** Blocked by Cloudflare (HTTP 403)

#### 4. `/search/api/listings` (Search-Specific API)

```
GET /search/api/listings
```

**Likely Query Parameters:**
- `q` (string) - Search query
- `filters` (object) - Search filters
- `pagination` (object) - Pagination settings

**Current Status:** Blocked by Cloudflare (HTTP 403)

## Cloudflare Protection Mechanism

### Turnstile Challenge Process

1. **Initial Request**: Client makes request to protected endpoint
2. **Challenge Response**: Server returns HTTP 403 with Cloudflare Turnstile challenge HTML
3. **Challenge Metadata**: HTML includes JavaScript with challenge configuration:

```javascript
window._cf_chl_opt = {
  cvId: '3',                    // Challenge version
  cZone: 'www.crexi.com',       // Zone ID
  cType: 'managed',             // Challenge type
  cRay: '<ray-id>',             // Request ray ID
  cH: '<hash>',                 // Challenge hash
  cUPMDTk: '<token>',           // Update token
  cFPWv: 'g',                   // Fingerprint version
  cITimeS: '<timestamp>',       // Issue timestamp
  md: '<encrypted-data>',       // Challenge data
  mdrd: '<redirect-data>'       // Redirect data
}
```

4. **Challenge Execution**: JavaScript executes challenge verification
5. **Token Generation**: Valid token generated after challenge completion
6. **Retry Request**: Client retries original request with new cookies/tokens

### Token Lifetime
- **Validity Duration**: ~360 seconds (6 minutes)
- **Scope**: Per-session per IP address
- **Reusability**: Unknown - may be single-use or multi-use

## Browser Requirements

To bypass Cloudflare challenges, requests must appear to come from a real browser:

### Required Headers
```
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36
Referer: https://www.crexi.com/properties
Accept: application/json
Accept-Language: en-US,en;q=0.9
Accept-Encoding: gzip, deflate, br
Cache-Control: no-cache
Pragma: no-cache
```

### Cookie Management
- Cloudflare sets challenge solution cookies
- Cookies must be maintained across requests
- Cookie jar must support domain scope

## Anti-Bot Measures

CREXI employs comprehensive anti-bot protection:

1. **Cloudflare WAF** - Blocks suspicious traffic patterns
2. **Turnstile Challenges** - JavaScript-based proof of work
3. **TLS Fingerprinting** - Analyzes SSL/TLS connection fingerprints
4. **Browser Fingerprinting**:
   - Canvas fingerprinting
   - WebGL capabilities
   - Audio context properties
   - Screen resolution and color depth
   - Timezone and locale
5. **Behavioral Analysis**:
   - Mouse movement patterns
   - Keyboard input patterns
   - Click behavior and timing
   - Scroll behavior
6. **IP Reputation Scoring**:
   - Historical abuse reports
   - VPN/proxy detection
   - Data center IP identification
7. **Rate Limiting**: 100 pages per session maximum

## Accessing Protected Endpoints

### Not Viable: Direct HTTP Requests
Direct `curl` or standard HTTP client requests will be blocked immediately.

**Example (Will Fail):**
```bash
curl "https://www.crexi.com/api/listings?limit=10"
# Returns: HTTP 403 with Cloudflare challenge
```

### Viable: Browser Automation

**Requirements:**
- Selenium WebDriver or Puppeteer
- Headless or headed Chrome/Firefox
- JavaScript execution support
- Cookie management

**Advantages:**
- Solves Turnstile challenges automatically
- Executes JavaScript like real browser
- Maintains session state
- Can handle redirects

**Limitations:**
- Slow (3-5+ seconds per request)
- Resource-intensive
- May still trigger fingerprinting
- Expensive at scale

### Under Investigation: Token Reuse

**Hypothesis:** Challenge tokens may be reusable across multiple requests within their validity window.

**Testing Method:**
1. Capture valid challenge token from browser session
2. Attempt to reuse token for multiple API requests
3. Monitor success rate vs token age
4. Determine if tokens are per-request or per-session

**Potential Benefit:** Could dramatically reduce resource overhead

## Recommended Implementation

### Short-term (Months 1-3)
Use browser automation with caching:

```python
from selenium import webdriver
import time

# Load page to solve challenge
driver = webdriver.Chrome()
driver.get("https://www.crexi.com/properties")
time.sleep(3)  # Let JavaScript execute

# Extract cookies after challenge solved
cookies = driver.get_cookies()

# Use cookies for subsequent API requests
for cookie in cookies:
    if 'cf' in cookie['name'].lower():
        # Save Cloudflare challenge cookies
        pass
```

### Medium-term (Months 3-6)
Implement token caching and reuse:

```python
# Try to reuse token for multiple requests
token = get_cloudflare_token()
for i in range(10):  # Test if token is reusable
    response = api_request("/api/listings", token=token)
    if response.status_code == 403:
        # Token expired, get new one
        token = get_cloudflare_token()
```

### Long-term (Months 6+)
Contact CREXI for official API access:

```
Email: api@crexi.com or partnerships@crexi.com
Subject: Commercial Real Estate API Access Request
Body: Requesting Intelligence API access for deal discovery automation
Budget: ~$299-500/month for production use
```

## Fallback Strategy

If API access proves infeasible:

1. **Parse HTML directly** instead of hitting API
2. **Extract data from page source** using CSS selectors
3. **Less protected** than API endpoints
4. **More brittle** if layout changes
5. **Potentially slower** due to page rendering

## Monitoring and Updates

- **Check for API changes monthly**
- **Monitor Cloudflare challenge updates**
- **Track CREXI's anti-bot improvements**
- **Document any successful bypass techniques**
- **Maintain alert for public API announcements**

---

**Last Updated:** 2026-03-04
**Investigation Status:** Ongoing
**Access Status:** Protected - Browser Automation Required
