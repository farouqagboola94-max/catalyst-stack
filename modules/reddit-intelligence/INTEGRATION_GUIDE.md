# CatalystOS Reddit Intelligence - Integration Guide

## For Existing CatalystOS v2 Deployment

This guide integrates the Reddit Intelligence module into your existing CatalystOS FastAPI orchestration agent, React dashboard, and CLI infrastructure.

---

## File Placement

```
your_catalystos_root/
├── modules/
│   ├── reddit_intelligence/
│   │   ├── __init__.py
│   │   ├── catalyst_reddit_module.py
│   │   ├── catalyst_claude_analysis.py
│   │   ├── catalyst_sheets_handler.py
│   │   ├── catalyst_reddit_orchestrator.py
│   │   ├── requirements.txt
│   │   └── .env
│   └── [other modules...]
│
├── orchestration/
│   ├── reddit_integration_agent.py  # NEW - See below
│   └── [other orchestrators...]
│
├── dashboard/
│   ├── src/
│   │   ├── components/
│   │   │   └── RedditIntelligence.jsx  # NEW - See below
│   │   └── [other components...]
│   └── [existing React setup...]
│
├── cli/
│   ├── commands/
│   │   └── reddit.py  # NEW - See below
│   └── main.py
│
├── config/
│   ├── reddit_config.json  # NEW - See below
│   └── [other configs...]
│
└── .env  # Add Reddit Intelligence vars here
```

---

## Step 1: Add Module to requirements.txt

Update your main `requirements.txt`:

```txt
# Existing dependencies...

# Reddit Intelligence Module
praw==7.7.0
google-auth==2.27.0
gspread==5.12.0
```

Install updated dependencies:
```bash
pip install -r requirements.txt
```

---

## Step 2: Create Orchestration Agent

Create `orchestration/reddit_integration_agent.py`:

```python
"""
Reddit Intelligence Integration Agent
Connects Reddit module to CatalystOS FastAPI orchestrator
"""

from fastapi import APIRouter, BackgroundTasks, Query
from typing import Optional, List
import logging
import asyncio
from datetime import datetime
import json

# Import Reddit Intelligence modules
import sys
sys.path.insert(0, 'modules/reddit_intelligence')
from catalyst_reddit_orchestrator import CatalystRedditOS

router = APIRouter(prefix="/api/reddit", tags=["reddit"])
logger = logging.getLogger(__name__)

# Maintain pipeline state
pipeline_state = {
    "running": False,
    "last_result": None,
    "last_run": None
}

# Initialize catalyst instance (lazy load on first use)
catalyst_instance = None

def get_catalyst():
    global catalyst_instance
    if catalyst_instance is None:
        try:
            catalyst_instance = CatalystRedditOS()
        except Exception as e:
            logger.error(f"Failed to initialize CatalystRedditOS: {str(e)}")
            return None
    return catalyst_instance


@router.post("/run-analysis")
async def trigger_reddit_analysis(
    subreddits: Optional[List[str]] = Query(None),
    max_analyses: int = Query(10, ge=1, le=50),
    background_tasks: BackgroundTasks = None
):
    """
    Trigger Reddit analysis pipeline
    
    Args:
        subreddits: List of subreddit names (default: configured defaults)
        max_analyses: Maximum posts to analyze with Claude (1-50)
        background_tasks: FastAPI background task handler
    
    Returns:
        Job status
    """
    
    if pipeline_state["running"]:
        return {
            "status": "error",
            "message": "Pipeline already running"
        }
    
    def run_pipeline():
        try:
            pipeline_state["running"] = True
            catalyst = get_catalyst()
            
            if catalyst is None:
                pipeline_state["running"] = False
                return
            
            logger.info(f"Starting Reddit analysis: {subreddits or 'default subreddits'}")
            
            results = catalyst.run_full_pipeline(
                subreddits=subreddits,
                max_analyses=max_analyses,
                save_raw_json=True
            )
            
            pipeline_state["last_result"] = results
            pipeline_state["last_run"] = datetime.utcnow().isoformat()
            pipeline_state["running"] = False
            
            logger.info(f"Analysis complete: {results['posts_analyzed']} posts analyzed")
            
        except Exception as e:
            logger.error(f"Pipeline error: {str(e)}")
            pipeline_state["running"] = False
    
    background_tasks.add_task(run_pipeline)
    
    return {
        "status": "started",
        "message": "Analysis pipeline started in background",
        "subreddits": subreddits or "default",
        "max_analyses": max_analyses
    }


@router.get("/status")
async def get_pipeline_status():
    """Get current pipeline status"""
    return {
        "module": "Reddit Intelligence",
        "running": pipeline_state["running"],
        "last_run": pipeline_state["last_run"],
        "posts_analyzed": pipeline_state["last_result"]["posts_analyzed"] if pipeline_state["last_result"] else 0
    }


@router.get("/results")
async def get_latest_results():
    """Get latest analysis results"""
    if pipeline_state["last_result"] is None:
        return {
            "status": "no_results",
            "message": "No analysis results yet"
        }
    
    results = pipeline_state["last_result"]
    
    # Return formatted results for UI
    return {
        "status": "success",
        "run_time": results["end_time"],
        "posts_collected": results["posts_collected"],
        "posts_analyzed": results["posts_analyzed"],
        "summary": results.get("summary"),
        "top_analyses": [
            {
                "title": a["original_title"],
                "subreddit": a["subreddit"],
                "sentiment": a["sentiment_label"],
                "hook": a["content_hook"],
                "tone": a["tone_match"]
            }
            for a in results["analyses"][:5]
        ],
        "sheets_url": results.get("sheets_url")
    }


@router.get("/default-config")
async def get_default_config():
    """Get default Reddit Intelligence configuration"""
    return {
        "default_subreddits": [
            "Nigeria",
            "Lagos", 
            "Naija",
            "NaijaSnark",
            "FashionNigeria",
            "NigerianGamers"
        ],
        "max_analyses_default": 10,
        "posts_per_sub_default": 20
    }


# Add this router to your main FastAPI app:
# In your main.py or app.py:
# from orchestration.reddit_integration_agent import router as reddit_router
# app.include_router(reddit_router)
```

---

## Step 3: Update Main FastAPI App

In your main FastAPI app file (e.g., `app.py` or `main.py`):

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import routers
from orchestration.reddit_integration_agent import router as reddit_router

app = FastAPI(
    title="CatalystOS",
    description="Integrated automation and intelligence platform"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(reddit_router)
# ... include other routers ...

@app.get("/")
async def root():
    return {"message": "CatalystOS API", "version": "2.0"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

---

## Step 4: Add React Dashboard Component

Create `dashboard/src/components/RedditIntelligence.jsx`:

```jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RedditIntelligence = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [status, setStatus] = useState(null);
  const [subreddits, setSubreddits] = useState([]);
  const [maxAnalyses, setMaxAnalyses] = useState(10);
  const [defaultConfig, setDefaultConfig] = useState(null);

  useEffect(() => {
    // Fetch default config
    axios.get('/api/reddit/default-config').then(res => {
      setDefaultConfig(res.data);
      setSubreddits(res.data.default_subreddits);
    });

    // Fetch initial status
    checkStatus();
  }, []);

  const checkStatus = async () => {
    try {
      const res = await axios.get('/api/reddit/status');
      setStatus(res.data);

      if (!res.data.running) {
        const resultsRes = await axios.get('/api/reddit/results');
        if (resultsRes.data.status === 'success') {
          setResults(resultsRes.data);
        }
      }
    } catch (error) {
      console.error('Status check failed:', error);
    }
  };

  const runAnalysis = async () => {
    setLoading(true);
    try {
      const res = await axios.post('/api/reddit/run-analysis', null, {
        params: {
          subreddits: subreddits,
          max_analyses: maxAnalyses
        }
      });

      if (res.data.status === 'started') {
        // Poll for completion
        const pollInterval = setInterval(async () => {
          const statusRes = await axios.get('/api/reddit/status');
          setStatus(statusRes.data);

          if (!statusRes.data.running) {
            clearInterval(pollInterval);
            await checkStatus();
            setLoading(false);
          }
        }, 2000);
      }
    } catch (error) {
      console.error('Analysis failed:', error);
      setLoading(false);
    }
  };

  return (
    <div className="reddit-intelligence-panel p-6 bg-gray-900 rounded-lg border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-6">Reddit Intelligence</h2>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm text-gray-300 mb-2">
            Subreddits
          </label>
          <div className="flex flex-wrap gap-2">
            {subreddits.map((sub, i) => (
              <span
                key={i}
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
              >
                r/{sub}
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-2">
            Max Analyses: {maxAnalyses}
          </label>
          <input
            type="range"
            min="1"
            max="50"
            value={maxAnalyses}
            onChange={(e) => setMaxAnalyses(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      <button
        onClick={runAnalysis}
        disabled={loading}
        className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold py-2 px-4 rounded"
      >
        {loading ? `Analyzing... (${status?.posts_analyzed || 0})` : 'Run Analysis'}
      </button>

      {results && (
        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-bold text-white">Results</h3>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-800 p-3 rounded">
              <p className="text-gray-400">Posts Collected</p>
              <p className="text-xl font-bold text-white">
                {results.posts_collected}
              </p>
            </div>
            <div className="bg-gray-800 p-3 rounded">
              <p className="text-gray-400">Posts Analyzed</p>
              <p className="text-xl font-bold text-white">
                {results.posts_analyzed}
              </p>
            </div>
          </div>

          {results.summary && (
            <div className="bg-gray-800 p-4 rounded">
              <h4 className="text-white font-bold mb-2">Strategy Summary</h4>
              <div className="text-sm text-gray-300 space-y-2">
                <p>
                  <span className="text-gray-400">Tone:</span>{' '}
                  {results.summary.tone_recommendation}
                </p>
                <p>
                  <span className="text-gray-400">Sentiment:</span>{' '}
                  {results.summary.dominant_sentiment}
                </p>
              </div>
            </div>
          )}

          {results.top_analyses && (
            <div className="bg-gray-800 p-4 rounded">
              <h4 className="text-white font-bold mb-3">Top Hooks</h4>
              <div className="space-y-2 text-sm">
                {results.top_analyses.map((post, i) => (
                  <div key={i} className="border-l-2 border-purple-600 pl-2">
                    <p className="text-gray-300 truncate">{post.title}</p>
                    <p className="text-gray-500 text-xs">
                      r/{post.subreddit} • {post.sentiment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {results.sheets_url && (
            <a
              href={results.sheets_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-green-600 hover:bg-green-700 text-white text-center py-2 rounded font-semibold"
            >
              View Full Analysis in Google Sheets →
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default RedditIntelligence;
```

---

## Step 5: Add CLI Command

Create `cli/commands/reddit.py`:

```python
"""Reddit Intelligence CLI commands"""

import click
import sys
import os

sys.path.insert(0, 'modules/reddit_intelligence')
from catalyst_reddit_orchestrator import CatalystRedditOS

@click.group()
def reddit():
    """Reddit Intelligence commands"""
    pass


@reddit.command()
@click.option('--subreddits', multiple=True, default=None, help='Subreddit names')
@click.option('--max-analyses', default=10, type=int, help='Max posts to analyze')
@click.option('--output-sheet', default=None, help='Google Sheet ID to append to')
def analyze(subreddits, max_analyses, output_sheet):
    """Run Reddit analysis pipeline"""
    try:
        catalyst = CatalystRedditOS()
        
        subs = list(subreddits) if subreddits else None
        click.echo("Starting Reddit analysis...")
        
        results = catalyst.run_full_pipeline(
            subreddits=subs,
            output_spreadsheet_id=output_sheet,
            max_analyses=max_analyses
        )
        
        click.echo(f"✓ Complete: {results['posts_analyzed']} analyzed")
        if results.get('sheets_url'):
            click.echo(f"View: {results['sheets_url']}")
            
    except Exception as e:
        click.echo(f"✗ Error: {str(e)}", err=True)
        sys.exit(1)


@reddit.command()
def status():
    """Check Reddit Intelligence status"""
    try:
        catalyst = CatalystRedditOS()
        click.echo("✓ Reddit Intelligence module ready")
    except Exception as e:
        click.echo(f"✗ {str(e)}", err=True)


# Add to main CLI in cli/main.py:
# from commands.reddit import reddit
# cli.add_command(reddit)
```

---

## Step 6: Update .env

Add these variables to your `.env`:

```env
# Reddit Intelligence Module
REDDIT_CLIENT_ID=your_client_id
REDDIT_CLIENT_SECRET=your_client_secret
REDDIT_USER_AGENT=CatalystOS/1.0
GOOGLE_SHEETS_CREDENTIALS=./google-credentials.json
```

---

## Testing Integration

### Test 1: API Endpoint
```bash
curl -X POST http://localhost:8000/api/reddit/run-analysis \
  -H "Content-Type: application/json" \
  -d '{"subreddits": ["Nigeria", "Lagos"], "max_analyses": 5}'
```

### Test 2: CLI Command
```bash
python -m cli.main reddit analyze --subreddits Nigeria Lagos --max-analyses 5
```

### Test 3: Dashboard
Navigate to dashboard and trigger "Run Analysis"

---

## Deployment

### Update Docker (if using)

Add to `Dockerfile`:
```dockerfile
# Install Reddit module dependencies
RUN pip install -r modules/reddit_intelligence/requirements.txt
```

### Systemd Service (if running on Linux)

Create `/etc/systemd/system/catalyst-reddit.service`:
```ini
[Unit]
Description=CatalystOS Reddit Intelligence
After=network.target

[Service]
Type=simple
User=catalyst
WorkingDirectory=/opt/catalystos
ExecStart=/usr/bin/python -m uvicorn app:app --host 0.0.0.0 --port 8000
Restart=always

[Install]
WantedBy=multi-user.target
```

---

## Monitoring

Check logs:
```bash
# API logs
tail -f logs/api.log

# Reddit module logs
tail -f logs/reddit_intelligence.log

# Full system
journalctl -u catalyst-reddit.service -f
```

---

## Performance Notes

- **API calls scale:** Each post analyzed = ~1 Claude API call
- **Rate limits:** Claude: 50 posts/min, Reddit: 60 requests/min
- **Storage:** ~1KB per analysis result
- **Time:** ~10 posts = ~30 seconds (including Claude analysis)

---

## Next Steps

1. ✓ Add module files to `modules/reddit_intelligence/`
2. ✓ Create orchestration agent
3. ✓ Add React component to dashboard
4. ✓ Add CLI command
5. Test locally with `python app.py`
6. Deploy to production
7. Schedule daily/weekly analyses
8. Monitor results in Google Sheets

---

## Support

Issues? Check:
- API credentials in `.env`
- Reddit app setup at reddit.com/prefs/apps
- Claude API key at console.anthropic.com
- Google Sheets credentials (if using Sheets)
