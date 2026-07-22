# CatalystOS Reddit Intelligence Module v1.0

**Extract actionable content strategy from real audience psychology on Reddit.**

Built for Catalyst OS: A multi-disciplinary venture framework designed for Lagos-based execution and scale.

---

## What This Does

```
Reddit Communities
       ↓
   [Scraper] ← PRAW API
       ↓
   [Analyzer] ← Claude AI
   - Sentiment
   - Psychology
   - Content hooks
   - Tone matching
       ↓
   [Storage] → Google Sheets
       ↓
Actionable Strategy Insights
```

In plain language:
- Scrapes top posts from Nigerian Reddit communities
- Analyzes them with Claude AI to extract audience psychology
- Identifies what content hooks actually work
- Stores results in Google Sheets for team access
- Generates strategy recommendations

**Use cases:**
- Sneakers Fest 2026 marketing research
- Vice Chairman social strategy (X/Instagram)
- Content hook validation before publishing
- Audience psychology research for any brand/product

---

## Quick Start (< 5 minutes)

### 1. Get API Credentials
- **Reddit**: reddit.com/prefs/apps → Create app → Copy ID & Secret
- **Claude**: console.anthropic.com → Create API key
- **Google Sheets** (optional): console.cloud.google.com → Service account JSON

### 2. Install & Configure
```bash
# Install dependencies
pip install -r requirements.txt

# Copy and fill .env
cp .env.example .env
# Edit .env with your credentials
```

### 3. Run
```bash
# Run from command line
python reddit_cli.py

# Or use Python directly
from catalyst_reddit_orchestrator import CatalystRedditOS
catalyst = CatalystRedditOS()
results = catalyst.run_full_pipeline()
```

---

## File Structure

```
reddit_intelligence/
├── catalyst_reddit_module.py           # Reddit scraper (PRAW)
├── catalyst_claude_analysis.py         # AI analysis engine
├── catalyst_sheets_handler.py          # Google Sheets integration
├── catalyst_reddit_orchestrator.py     # Main orchestrator
├── reddit_cli.py                       # Command-line interface
├── requirements.txt                    # Python dependencies
├── .env.example                        # Environment template
├── README.md                           # This file
├── REDDIT_INTELLIGENCE_SETUP.md        # Detailed setup guide
└── INTEGRATION_GUIDE.md                # CatalystOS integration
```

---

## Core Features

### 1. Reddit Collection
- Fetch top posts from multiple subreddits
- Filter by engagement (score + comments)
- Deduplicate posts
- Configurable time windows (hour, day, week, month, year)

### 2. Claude AI Analysis
Per post:
- **Sentiment** (score: -1 to 1, label: positive/negative/neutral)
- **Core Insight** (what the post reveals about the audience)
- **Audience Psychology** (what need/frustration does it tap?)
- **Content Hook** (the single most powerful hook)
- **Alternative Angles** (3+ ways to reframe the content)
- **Tone Match** (what tone resonates: casual/authoritative/irreverent/educational)
- **Engagement Potential** (why did this post stick?)
- **Catalyst Perspective** (brutal analysis from "void year" detachment)

Batch insights:
- **Dominant Sentiment** across all posts
- **Top Hooks** (winning patterns)
- **Tone Recommendation**
- **Psychology Synthesis** (what the audience really wants)
- **Content Strategy** (actionable recommendations)
- **Red Flags** (what to avoid)

### 3. Google Sheets Storage
- Automatic sheet creation
- Analysis append (one row per post)
- Strategy summary sheet
- Shareable with team
- Persistent data for iteration

---

## Configuration

### Default Subreddits
Edit `catalyst_reddit_module.py`:
```python
DEFAULT_SUBREDDITS = [
    "Nigeria",
    "Lagos",
    "Naija",
    "NaijaSnark",
    "FashionNigeria",
    "NigerianGamers"
]
```

### Analysis Parameters
```python
results = catalyst.run_full_pipeline(
    subreddits=["Nigeria", "Lagos"],      # Which communities
    posts_per_sub=20,                     # Top N posts per sub
    max_analyses=10,                      # Max posts to analyze with Claude
    output_spreadsheet_id=None,           # Sheet ID (create new if None)
    save_raw_json=True                    # Save raw posts to JSON
)
```

### CLI Usage
```bash
# Show help
python reddit_cli.py --help

# Run with custom subreddits
python reddit_cli.py --subreddits Nigeria Lagos Naija --max-analyses 20

# Append to existing sheet
python reddit_cli.py --output-sheet 1abc123xyz...

# Validate setup
python reddit_cli.py --validate-env

# Show setup instructions
python reddit_cli.py --help-setup
```

---

## Results Format

```json
{
  "start_time": "2024-01-15T10:30:00",
  "end_time": "2024-01-15T10:35:00",
  "posts_collected": 150,
  "posts_analyzed": 10,
  "subreddits": ["Nigeria", "Lagos", "Naija"],
  
  "analyses": [
    {
      "post_id": "abc123",
      "subreddit": "Nigeria",
      "original_title": "Post title",
      "sentiment_label": "positive",
      "sentiment_score": 0.75,
      "core_insight": "Community values X",
      "audience_psychology": "Tapping into fear of missing out",
      "content_hook": "The single most powerful hook",
      "alternative_angles": ["Angle 1", "Angle 2", "Angle 3"],
      "tone_match": "casual_irreverent",
      "engagement_potential": "Why this stuck",
      "catalyst_perspective": "Brutal analysis of what's really happening"
    },
    // ... more analyses
  ],
  
  "summary": {
    "dominant_sentiment": "positive",
    "top_hooks": ["Hook 1", "Hook 2", "Hook 3"],
    "tone_recommendation": "casual",
    "psychology_synthesis": "What the audience really wants",
    "content_strategy": "Here's what to do",
    "red_flags": ["Avoid this", "Never do that"]
  },
  
  "sheets_url": "https://docs.google.com/spreadsheets/d/...",
  "sheets_status": "success",
  "raw_json_saved": "reddit_posts_20240115_103000.json"
}
```

---

## Integration with CatalystOS

### For FastAPI App
```python
from orchestration.reddit_integration_agent import router as reddit_router
app.include_router(reddit_router)

# Endpoints:
# POST /api/reddit/run-analysis
# GET /api/reddit/status
# GET /api/reddit/results
# GET /api/reddit/default-config
```

### For React Dashboard
```jsx
import RedditIntelligence from './components/RedditIntelligence';

export function Dashboard() {
  return (
    <>
      <RedditIntelligence />
      {/* other components */}
    </>
  );
}
```

### For CLI
```bash
python -m cli.main reddit analyze --subreddits Nigeria Lagos
python -m cli.main reddit status
```

See `INTEGRATION_GUIDE.md` for detailed integration steps.

---

## Cost Analysis

| Service | Cost | Notes |
|---------|------|-------|
| Claude API | ~$0.003/post analyzed | Sonnet model |
| Reddit API | Free | Rate limited to 60 req/min |
| Google Sheets | Free | Need service account setup |
| **Total/100 posts** | **~$0.30** | One-time |

---

## Troubleshooting

### Issue: "Missing Reddit credentials"
→ Check .env has REDDIT_CLIENT_ID and REDDIT_CLIENT_SECRET from reddit.com/prefs/apps

### Issue: "ANTHROPIC_API_KEY not found"
→ Get key from console.anthropic.com and add to .env

### Issue: "Google Sheets not configured"
→ Optional. Module works without it (saves to JSON). Follow REDDIT_INTELLIGENCE_SETUP.md if you want Sheets.

### Issue: "Rate limit on Claude"
→ Reduce max_analyses or schedule runs further apart. Check Anthropic console for limits.

### Issue: "Posts not in Google Sheet"
→ Verify service account has Editor access. Check sheet name (default: Sheet1).

---

## Performance

| Task | Time |
|------|------|
| Collect 100 posts | ~5 seconds |
| Analyze 10 posts | ~30 seconds |
| Store to Sheets | ~2 seconds |
| **Total (default)** | **~1 minute** |

---

## What's Actually Happening

This module is built on a specific philosophy about content strategy:

**Most content fails because it doesn't understand audience psychology.**

Reddit is the rawest reflection of audience psychology available:
- People say what they actually think (anonymity)
- The algorithm rewards genuine engagement
- Comments show psychology more than posts

This module extracts that psychology and turns it into actionable patterns.

For Catalyst specifically:
- Sneakers Fest needs hooks that hit Lagos youth psychology
- Vice Chairman social needs tone that resonates with his audience
- Every brand you work with needs this data

**One run = Understanding your audience better than 90% of competitors.**

---

## Examples

### Example 1: Sneakers Fest Content Research
```python
catalyst = CatalystRedditOS()
results = catalyst.run_full_pipeline(
    subreddits=["Nigeria", "Lagos", "Naija", "FashionNigeria"],
    max_analyses=20
)

# Check what hooks work
top_hooks = results['summary']['top_hooks']
tone = results['summary']['tone_recommendation']

# Use in festival marketing:
# - Hooks: Use these exact hooks in ads/social
# - Tone: Match this tone in all copy
# - Psychology: Understand what your audience values
```

### Example 2: Client Social Strategy
```python
results = catalyst.run_full_pipeline(
    subreddits=["Naija", "NaijaSnark", "Lagos"],
    max_analyses=15
)

# Extract hooks for Vice Chairman social
for analysis in results['analyses']:
    print(f"Hook: {analysis['content_hook']}")
    print(f"Tone: {analysis['tone_match']}")
    print(f"Psychology: {analysis['audience_psychology']}")
    
# Feed these into content calendar
```

### Example 3: Ongoing Monitoring
```python
# Schedule daily
@scheduler.scheduled_job('cron', hour=9)
def daily_reddit_analysis():
    catalyst = CatalystRedditOS()
    results = catalyst.run_full_pipeline(
        subreddits=["Nigeria", "Lagos"],
        output_spreadsheet_id="your_sheet_id"
    )
    # New data appends to sheet automatically
```

---

## Roadmap

- [ ] Add sentiment trend tracking (time-series)
- [ ] Implement post-to-hook conversion confidence scoring
- [ ] Add competitive brand mention tracking
- [ ] Build audience demographic inference
- [ ] Add automated content calendar generation
- [ ] Integrate with social scheduling APIs

---

## Support

### Documentation
- `REDDIT_INTELLIGENCE_SETUP.md` - Detailed setup
- `INTEGRATION_GUIDE.md` - CatalystOS integration
- Inline code comments - Self-documenting functions

### Issues
Check troubleshooting section above. Most issues are credential-related.

### Customization
Each module is modular. Customize:
- `catalyst_reddit_module.py` - Change subreddits, filters
- `catalyst_claude_analysis.py` - Change analysis prompts
- `catalyst_sheets_handler.py` - Change sheet layout

---

## License

CatalystOS Proprietary - Built for Catalyst's ventures.

---

## Credits

Built by Catalyst (Oluwatobiloba) for CatalystOS.

Uses:
- PRAW (Reddit API wrapper)
- Anthropic Claude API (AI analysis)
- Google Sheets API (Data storage)
- FastAPI (Orchestration)

---

**Ready to extract audience psychology and build a content strategy backed by data.**

Run it. Learn from it. Execute with confidence.

```bash
python reddit_cli.py
```

That's it.
