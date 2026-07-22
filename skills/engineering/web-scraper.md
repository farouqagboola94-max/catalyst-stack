---
skill: web-scraper
category: Engineering | Web Automation
catalyst_use: Market research automation, competitor monitoring, content aggregation
---

# WEB SCRAPER SKILL — Intelligent Multi-Strategy Scraping

Intelligent multi-strategy scraping system with validation, stealth browsing, and API detection.

## Scraping Strategy Selection

### Strategy 1: Direct HTTP (Fastest, simplest)
Use when: static HTML pages, no JavaScript rendering needed
```python
import httpx
from bs4 import BeautifulSoup

response = httpx.get("https://target.com", headers={"User-Agent": "Mozilla/5.0"})
soup = BeautifulSoup(response.text, "html.parser")
data = soup.select(".product-title")
```

### Strategy 2: Playwright (Dynamic sites)
Use when: JavaScript-rendered content, infinite scroll, login required
```python
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://target.com")
    page.wait_for_selector(".content")
    html = page.content()
```

### Strategy 3: API Detection (Most stable)
Before scraping HTML: check if there's a public API
- Open DevTools → Network → XHR/Fetch tab
- Find the JSON endpoints the site uses
- Call the API directly (faster, more reliable than scraping HTML)

## Anti-Bot Evasion
```python
# Realistic headers
headers = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) ...",
    "Accept-Language": "en-US,en;q=0.9",
    "Referer": "https://google.com"
}
# Random delays
import time, random
time.sleep(random.uniform(1.5, 4.0))
```

## Data Validation
Before storing scraped data:
- Type check: is price actually a number?
- Range check: is price in expected range (not $0 or $1M)?
- Completeness: are required fields present?
- Deduplication: have we seen this item before?

## Legal & Ethical
- Check robots.txt before scraping
- Don't overload servers (rate limit requests)
- Don't scrape personal data without purpose
- Respect Terms of Service for commercial use

## Output
Working scraper for target site. Data pipeline to structured storage. Error handling included.
