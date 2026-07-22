# CatalystOS Reddit Intelligence Module - Setup & Integration Guide

## Overview

Reddit Intelligence is a production-grade Reddit scraping + Claude AI analysis + Google Sheets storage pipeline. It's built to extract actionable content strategy insights from Reddit communities (especially Nigeria-focused subreddits).

**What it does:**
1. Collects top posts from multiple subreddits
2. Analyzes them with Claude AI (sentiment, psychology, engagement patterns)
3. Stores results in Google Sheets for team access
4. Generates strategic insights on tone, hooks, and audience psychology

---

## Architecture

```
Reddit Collector → Claude Analyzer → Google Sheets Handler
     ↓                  ↓                       ↓
Top Posts        Perspective Shifts      Accessible Dashboard
Engagement       Sentiment Analysis      Strategic Summary
Filtering        Tone Matching           Alternative Angles
```

---

## Quick Setup (5 minutes)

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Set Up Environment Variables

```bash
# Copy template to .env
cp .env.example .env

# Edit .env with your credentials (see sections below)
nano .env
```

### 3. Get Reddit API Credentials

1. Go to https://www.reddit.com/prefs/apps
2. Click "Create an app" or "Create another app"
3. Fill form:
   - Name: `CatalystOS Reddit Intelligence`
   - Type: `Script`
   - Redirect URI: `http://localhost:8000`
4. Click "Create app"
5. Copy **Client ID** (under app name) and **Client Secret**
6. Add to `.env`:
   ```
   REDDIT_CLIENT_ID=your_id
   REDDIT_CLIENT_SECRET=your_secret
   ```

### 4. Get Claude API Key

1. Go to https://console.anthropic.com/
2. Create/view API key
3. Add to `.env`:
   ```
   ANTHROPIC_API_KEY=sk-ant-xxx
   ```

### 5. Set Up Google Sheets (Optional but Recommended)

#### Option A: Create Service Account (Recommended for Production)

1. Go to https://console.cloud.google.com
2. Create a new project: `CatalystOS`
3. Enable APIs:
   - Search "Google Sheets API" → Enable
   - Search "Google Drive API" → Enable
4. Create Service Account:
   - Go to "Credentials" → "Create Credentials" → "Service Account"
   - Fill name: `catalyst-reddit-bot`
   - Click "Create and Continue"
   - Grant Editor role
   - Create JSON key: "Keys" → "Add Key" → "Create new key" → JSON
5. Download JSON and save as `google-credentials.json` in your project directory
6. Update `.env`:
   ```
   GOOGLE_SHEETS_CREDENTIALS=./google-credentials.json
   ```

#### Option B: Quick Test (Use OAuth)

Skip Google Sheets setup for now. The pipeline works without it (data stays in JSON). You can add Sheets later.

---

## Running the Pipeline

### Basic Usage

```bash
python catalyst_reddit_orchestrator.py
```

This will:
1. Collect posts from default Nigeria subreddits
2. Analyze top posts with Claude
3. Create a new Google Sheet (if configured)
4. Save results to `catalyst_reddit_results_YYYYMMDD_HHMMSS.json`

### Python API Usage

```python
from catalyst_reddit_orchestrator import CatalystRedditOS

# Initialize
catalyst = CatalystRedditOS()

# Run full pipeline
results = catalyst.run_full_pipeline(
    subreddits=["Nigeria", "Lagos", "Naija", "NaijaSnark"],
    max_analyses=20,  # Analyze top 20 posts
    save_raw_json=True
)

# Access results
print(f"Collected: {results['posts_collected']}")
print(f"Analyzed: {results['posts_analyzed']}")
print(f"Sheet: {results.get('sheets_url')}")
print(f"Summary: {results['summary']}")
```

### Append to Existing Sheet

```python
# If you have an existing spreadsheet ID
results = catalyst.run_full_pipeline(
    output_spreadsheet_id="1your_sheet_id_here",
    max_analyses=10
)
```

---

## Integration with CatalystOS v2

### File Structure

Place the Reddit Intelligence module in your CatalystOS directory:

```
CatalystOS/
├── modules/
│   └── reddit_intelligence/
│       ├── catalyst_reddit_module.py
│       ├── catalyst_claude_analysis.py
│       ├── catalyst_sheets_handler.py
│       ├── catalyst_reddit_orchestrator.py
│       ├── requirements.txt
│       └── .env.example
├── orchestration/
│   └── reddit_integration_agent.py  # See below
└── config/
    └── reddit_config.json
```

### FastAPI Integration (For Orchestration Agent)

Create `orchestration/reddit_integration_agent.py`:

```python
from fastapi import APIRouter, BackgroundTasks
from modules.reddit_intelligence.catalyst_reddit_orchestrator import CatalystRedditOS
import logging

router = APIRouter(prefix="/reddit", tags=["reddit"])
logger = logging.getLogger(__name__)

catalyst = CatalystRedditOS()

@router.post("/analyze")
async def trigger_reddit_analysis(
    subreddits: list = None,
    max_analyses: int = 10,
    background_tasks: BackgroundTasks = None
):
    """Trigger Reddit analysis pipeline"""
    
    def run_pipeline():
        results = catalyst.run_full_pipeline(
            subreddits=subreddits,
            max_analyses=max_analyses
        )
        catalyst.save_results_locally(results)
        logger.info(f"Pipeline complete: {results['posts_analyzed']} analyzed")
    
    background_tasks.add_task(run_pipeline)
    return {"status": "Pipeline started in background"}

@router.get("/status")
async def get_status():
    """Get current Reddit module status"""
    return {
        "module": "Reddit Intelligence",
        "status": "ready",
        "version": "1.0"
    }
```

Then in your main FastAPI app:

```python
from fastapi import FastAPI
from orchestration.reddit_integration_agent import router as reddit_router

app = FastAPI()
app.include_router(reddit_router)
```

### CLI Integration

Add to your CatalystOS CLI:

```bash
# In your CLI handler
def reddit_command(args):
    from modules.reddit_intelligence.catalyst_reddit_orchestrator import quickstart
    
    subreddits = args.subreddits or ["Nigeria", "Lagos", "Naija"]
    results = quickstart(subreddits=subreddits)
    
    if results:
        print(f"✓ Analysis complete")
        print(f"  - Posts: {results['posts_analyzed']}")
        if results.get('sheets_url'):
            print(f"  - Sheet: {results['sheets_url']}")
```

### React Dashboard Integration

Display Reddit analysis in your React dashboard:

```jsx
// Components/RedditDashboard.jsx
import { useState, useEffect } from 'react';

export function RedditDashboard() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const runAnalysis = async () => {
    setLoading(true);
    const response = await fetch('/api/reddit/analyze', { method: 'POST' });
    // Poll for results...
    setLoading(false);
  };

  return (
    <div className="reddit-dashboard">
      <button onClick={runAnalysis} disabled={loading}>
        {loading ? 'Analyzing...' : 'Run Reddit Analysis'}
      </button>
      
      {results && (
        <div>
          <h3>Results</h3>
          <p>Posts Analyzed: {results.posts_analyzed}</p>
          {results.summary && (
            <div>
              <h4>Strategy Insights</h4>
              <p>{results.summary.content_strategy}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
```

---

## Use Cases for Catalyst

### 1. Sneakers Fest 2026 Content Strategy
```python
results = catalyst.run_full_pipeline(
    subreddits=["Nigeria", "Lagos", "Naija", "FashionNigeria", "NigerianGamers"],
    max_analyses=20
)
# Gets audience hooks, tone, psychology for festival marketing
```

### 2. Client Social Media Strategy (Vice Chairman)
```python
# Target Lagos youth sentiment
results = catalyst.run_full_pipeline(
    subreddits=["Naija", "NaijaSnark", "Lagos"],
    max_analyses=15
)
# Use hooks and tone recommendations for X/Instagram content
```

### 3. Content Hook Research
```python
# Analyze what hooks work for product/service launches
results = catalyst.run_full_pipeline()
# Access: results['analyses'][0]['content_hook'] for each post
# results['summary']['top_hooks'] for winning patterns
```

---

## Troubleshooting

### "Missing Reddit credentials"
- Check .env has REDDIT_CLIENT_ID and REDDIT_CLIENT_SECRET
- Credentials from https://reddit.com/prefs/apps

### "ANTHROPIC_API_KEY not found"
- Get key from https://console.anthropic.com/
- Add to .env

### "Google Sheets client not initialized"
- Optional - module works without it (saves to JSON)
- If needed: Follow "Set Up Google Sheets" section above
- Ensure google-credentials.json in correct path

### "Rate limit on Claude API"
- Reduce max_analyses parameter
- Add delay between batch runs
- Check Anthropic API rate limits at console.anthropic.com

### Posts not appearing in sheet
- Verify service account email has Editor access to sheet
- Check sheet name matches (default: "Sheet1")
- Ensure GOOGLE_SHEETS_CREDENTIALS path is correct

---

## Performance Tips

### Reduce API Calls
```python
# Analyze fewer posts
results = catalyst.run_full_pipeline(max_analyses=5)

# Cache raw posts
results = catalyst.run_full_pipeline(save_raw_json=True)
# Re-analyze later from JSON without re-fetching
```

### Batch Multiple Runs
```python
# Run once per day, not hourly
import schedule

def daily_analysis():
    catalyst.run_full_pipeline(subreddits=["Nigeria", "Lagos"])

schedule.every().day.at("09:00").do(daily_analysis)
```

### Monitor Costs
- Claude: ~$0.003 per post analyzed
- Reddit API: Free (rate limited)
- Google Sheets: Free (need service account setup)

---

## Next Steps

1. **Test locally** with default subreddits
2. **Configure Google Sheets** (optional but recommended)
3. **Integrate with CatalystOS FastAPI** app
4. **Add to React dashboard** for team visibility
5. **Schedule daily/weekly runs** for ongoing research
6. **Use results** to inform content strategy across channels

---

## API Reference

### CatalystRedditOS

```python
catalyst = CatalystRedditOS(
    reddit_client_id="...",
    reddit_secret="...",
    claude_api_key="...",
    sheets_credentials="./google-credentials.json"
)

results = catalyst.run_full_pipeline(
    subreddits=["Nigeria", "Lagos"],
    output_spreadsheet_id=None,  # Create new sheet
    posts_per_sub=20,
    max_analyses=10,
    save_raw_json=True
)
```

### Results Structure

```python
results = {
    "start_time": "2024-01-15T10:30:00",
    "posts_collected": 150,
    "posts_analyzed": 10,
    "analyses": [
        {
            "post_id": "abc123",
            "subreddit": "Nigeria",
            "sentiment_label": "positive",
            "sentiment_score": 0.75,
            "content_hook": "...",
            "catalyst_perspective": "..."
        }
    ],
    "summary": {
        "dominant_sentiment": "positive",
        "top_hooks": ["..."],
        "tone_recommendation": "casual",
        "content_strategy": "..."
    },
    "sheets_url": "https://docs.google.com/spreadsheets/d/...",
    "sheets_status": "success"
}
```

---

## Support & Customization

Modify `RedditConfig.DEFAULT_SUBREDDITS` to track different communities.
Modify `ClaudeAnalysisEngine` prompts for different analysis angles.
Extend with additional analysis methods in any module.

This is yours to customize. Go build.
