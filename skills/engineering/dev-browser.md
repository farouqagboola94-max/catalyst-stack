---
skill: dev-browser
category: Engineering | Browser Automation
catalyst_use: Playwright automation, Higgsfield browser control, web testing pipelines
---

# DEV BROWSER SKILL — Autonomous Web Browsing

Gives AI autonomous web browsing abilities for QA, automation, and online research tasks.

## Playwright Foundation
```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto("https://target.com")
    page.fill("#username", "user@email.com")
    page.click("button[type='submit']")
    content = page.content()
    browser.close()
```

## Automation Patterns

### Login Automation
```python
def login(page, url, username, password):
    page.goto(url)
    page.fill('[name="email"]', username)
    page.fill('[name="password"]', password)
    page.click('[type="submit"]')
    page.wait_for_load_state("networkidle")
```

### Data Extraction
```python
items = page.query_selector_all('.product-card')
data = []
for item in items:
    data.append({
        'title': item.query_selector('h2').text_content(),
        'price': item.query_selector('.price').text_content(),
    })
```

### Screenshot and Recording
```python
page.screenshot(path="screenshot.png", full_page=True)
# Video recording:
context = browser.new_context(record_video_dir="videos/")
```

## Higgsfield MCP Integration (CatalystOS)
1. Launch browser in non-headless mode
2. Navigate to higgsfield.ai
3. Upload product image via file input
4. Set prompt parameters
5. Trigger generation
6. Wait for completion (polling or network idle)
7. Download output files
8. Organize into CatalystOS folder structure

## Anti-Detection
- Use realistic viewport (1280×800)
- Random delays between actions (0.5-2s)
- Rotate user agents
- Disable WebDriver flag

## Output
Playwright scripts for target workflows. Error handling included.
