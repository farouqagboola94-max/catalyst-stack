# CatalystOS Reddit Intelligence - Deployment Checklist

Use this checklist to integrate the Reddit Intelligence module into your existing CatalystOS v2 installation.

---

## Pre-Deployment (Do Once)

### A. Get Credentials

- [ ] **Reddit API**
  - Go to https://reddit.com/prefs/apps
  - Click "Create another app"
  - Name: `CatalystOS Reddit Intelligence`
  - Type: `Script`
  - Fill in redirect URI
  - Copy **Client ID** (shown below app name)
  - Copy **Client Secret**
  - Save both to password manager

- [ ] **Claude API Key**
  - Go to https://console.anthropic.com/
  - Create or view API key
  - Copy and save to password manager

- [ ] **Google Sheets (Optional)**
  - Go to https://console.cloud.google.com
  - Create project: `CatalystOS`
  - Enable "Google Sheets API"
  - Enable "Google Drive API"
  - Create Service Account → JSON key
  - Download and save as `google-credentials.json`
  - Save service account email for later

---

## Installation Steps

### Step 1: Extract Module Files
```bash
cd /path/to/CatalystOS
unzip CatalystOS_Reddit_Intelligence.zip -d modules/reddit_intelligence/
```

### Step 2: Install Dependencies
```bash
# Option A: Install only for Reddit module
pip install -r modules/reddit_intelligence/requirements.txt

# Option B: Merge with main requirements.txt (recommended)
cat modules/reddit_intelligence/requirements.txt >> requirements.txt
pip install -r requirements.txt
```

### Step 3: Configure Environment Variables
```bash
# Add to your .env file:
REDDIT_CLIENT_ID=your_client_id_here
REDDIT_CLIENT_SECRET=your_client_secret_here
REDDIT_USER_AGENT=CatalystOS/1.0
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_SHEETS_CREDENTIALS=./google-credentials.json
```

### Step 4: Copy Google Credentials (If Using Sheets)
```bash
# If you created a service account:
cp path/to/google-credentials.json ./google-credentials.json
```

### Step 5: Test Installation
```bash
# Validate environment
python modules/reddit_intelligence/reddit_cli.py --validate-env

# Should output: "✓ All required environment variables are set"
```

---

## Integration Steps

### Integration A: FastAPI Orchestration

1. **Copy orchestration agent:**
   ```bash
   cp orchestration_templates/reddit_integration_agent.py orchestration/reddit_integration_agent.py
   ```

2. **Update main FastAPI app** (your `app.py` or `main.py`):
   ```python
   # Add this import
   from orchestration.reddit_integration_agent import router as reddit_router
   
   # Add this line to include the router
   app.include_router(reddit_router)
   ```

3. **Test API endpoint:**
   ```bash
   # Start your app
   python app.py
   
   # In another terminal, test the endpoint
   curl -X POST http://localhost:8000/api/reddit/run-analysis
   ```

   **Expected response:**
   ```json
   {"status": "started", "message": "Analysis pipeline started in background"}
   ```

- [ ] API router added to main app
- [ ] Can call `/api/reddit/run-analysis` endpoint
- [ ] Can call `/api/reddit/status` endpoint
- [ ] Can call `/api/reddit/results` endpoint

---

### Integration B: React Dashboard

1. **Copy component:**
   ```bash
   cp dashboard_templates/RedditIntelligence.jsx dashboard/src/components/RedditIntelligence.jsx
   ```

2. **Add to dashboard** (your main dashboard file):
   ```jsx
   import RedditIntelligence from './components/RedditIntelligence';
   
   export function Dashboard() {
     return (
       <div className="dashboard">
         {/* existing components */}
         <RedditIntelligence />
       </div>
     );
   }
   ```

3. **Test in browser:**
   - Navigate to your dashboard
   - Look for "Reddit Intelligence" section
   - Click "Run Analysis" button
   - Should show status updates

- [ ] Component copied to dashboard
- [ ] Imported in main dashboard file
- [ ] Visible in browser
- [ ] Can trigger analysis from UI

---

### Integration C: CLI Commands

1. **Create command file:**
   ```bash
   cp cli_templates/reddit.py cli/commands/reddit.py
   ```

2. **Add to main CLI** (your `cli/main.py`):
   ```python
   from commands.reddit import reddit
   
   # Add this line (assuming you're using Click)
   @click.group()
   def cli():
       pass
   
   cli.add_command(reddit)
   ```

3. **Test CLI:**
   ```bash
   python -m cli.main reddit analyze --subreddits Nigeria Lagos
   python -m cli.main reddit status
   ```

- [ ] Reddit command group added to CLI
- [ ] Can run `cli.main reddit analyze`
- [ ] Can run `cli.main reddit status`

---

## Configuration

### Customize Default Subreddits

Edit `modules/reddit_intelligence/catalyst_reddit_module.py`:

```python
DEFAULT_SUBREDDITS = [
    "Nigeria",           # Add/remove subreddits as needed
    "Lagos",
    "Naija",
    "NaijaSnark",
    "FashionNigeria"
]
```

### Customize Analysis Prompts

Edit `modules/reddit_intelligence/catalyst_claude_analysis.py`:

Look for `analysis_prompt = f"""..."""` and modify the Claude prompt to extract different insights.

### Configure Google Sheets Sharing

If using Sheets, edit `catalyst_sheets_handler.py`:

```python
# In create_analysis_sheet():
email_for_sharing="your_team_email@example.com"
```

---

## Deployment Verification Checklist

### Manual Testing

- [ ] Run: `python modules/reddit_intelligence/reddit_cli.py --validate-env`
  - Output: "✓ All required environment variables are set"

- [ ] Run: `python modules/reddit_intelligence/reddit_cli.py --subreddits Nigeria Lagos --max-analyses 3`
  - Should collect posts and analyze them
  - Should output results JSON file

- [ ] Check API endpoint: `curl http://localhost:8000/api/reddit/status`
  - Should return module status

- [ ] Test API trigger: 
  ```bash
  curl -X POST "http://localhost:8000/api/reddit/run-analysis?max_analyses=5"
  ```
  - Should return "started" status

### Integration Testing

- [ ] Dashboard component visible and responsive
- [ ] Can click "Run Analysis" from dashboard
- [ ] Results appear in dashboard after analysis completes
- [ ] CLI command `reddit analyze` works from terminal
- [ ] Results save to JSON file
- [ ] (If configured) Results appear in Google Sheet

### Environment Variables

- [ ] `REDDIT_CLIENT_ID` set ✓
- [ ] `REDDIT_CLIENT_SECRET` set ✓
- [ ] `ANTHROPIC_API_KEY` set ✓
- [ ] `GOOGLE_SHEETS_CREDENTIALS` set (if using Sheets) ✓

---

## Production Deployment

### For Docker

1. **Update Dockerfile:**
   ```dockerfile
   # Install Reddit module dependencies
   RUN pip install -r modules/reddit_intelligence/requirements.txt
   ```

2. **Add credentials to environment:**
   ```dockerfile
   ENV REDDIT_CLIENT_ID=${REDDIT_CLIENT_ID}
   ENV REDDIT_CLIENT_SECRET=${REDDIT_CLIENT_SECRET}
   ENV ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
   ```

- [ ] Dockerfile updated
- [ ] Build test: `docker build .`
- [ ] Run test: `docker run -e REDDIT_CLIENT_ID=... -p 8000:8000 <image>`

### For Production Server

1. **Set environment variables:**
   ```bash
   export REDDIT_CLIENT_ID="..."
   export REDDIT_CLIENT_SECRET="..."
   export ANTHROPIC_API_KEY="..."
   ```

2. **Install systemd service** (optional):
   ```bash
   sudo cp systemd_templates/catalyst-reddit.service /etc/systemd/system/
   sudo systemctl daemon-reload
   sudo systemctl enable catalyst-reddit
   sudo systemctl start catalyst-reddit
   ```

3. **Test systemd service:**
   ```bash
   systemctl status catalyst-reddit
   ```

- [ ] Environment variables in production
- [ ] Systemd service running (if used)
- [ ] Logs accessible: `journalctl -u catalyst-reddit -f`

---

## Troubleshooting

### Issue: "Module not found"
```bash
# Solution: Ensure imports use correct path
from modules.reddit_intelligence.catalyst_reddit_orchestrator import CatalystRedditOS
```

### Issue: "Missing environment variable"
```bash
# Solution: Check .env is loaded
echo $REDDIT_CLIENT_ID  # Should print the value
```

### Issue: "Connection refused to Reddit API"
```bash
# Solution: Verify credentials at reddit.com/prefs/apps
# Check that you have a script type app (not web app)
```

### Issue: "Claude API returns 401"
```bash
# Solution: Verify API key at console.anthropic.com
# Ensure key starts with sk-ant-
```

### Issue: "Google Sheets not found"
```bash
# Solution: 
# 1. Verify google-credentials.json exists
# 2. Share the target sheet with service account email
# 3. Check that GOOGLE_SHEETS_CREDENTIALS path is correct
```

---

## Post-Deployment

### Schedule Daily Analysis

Add to your scheduler (APScheduler, Celery, etc.):

```python
from apscheduler.schedulers.background import BackgroundScheduler
from modules.reddit_intelligence.catalyst_reddit_orchestrator import CatalystRedditOS

def daily_reddit_analysis():
    catalyst = CatalystRedditOS()
    results = catalyst.run_full_pipeline(
        subreddits=["Nigeria", "Lagos", "Naija"],
        max_analyses=15
    )
    logger.info(f"Daily analysis: {results['posts_analyzed']} posts analyzed")

scheduler = BackgroundScheduler()
scheduler.add_job(daily_reddit_analysis, 'cron', hour=9, minute=0)  # 9 AM daily
scheduler.start()
```

### Monitor Performance

Track in logs:
```bash
tail -f logs/reddit_intelligence.log | grep "posts_analyzed"
```

Monitor costs:
```python
# Rough estimate: 10 posts analyzed = $0.03 in Claude costs
# 1 run per day = ~$0.90/month
```

### Collect Feedback

After first week:
- [ ] Check which subreddits provided best insights
- [ ] Verify Google Sheet formatting works for team
- [ ] Adjust max_analyses based on Claude API costs
- [ ] Update default subreddits based on results

---

## File Checklist (All Should Be Present)

Essential files:
- [ ] `catalyst_reddit_module.py`
- [ ] `catalyst_claude_analysis.py`
- [ ] `catalyst_sheets_handler.py`
- [ ] `catalyst_reddit_orchestrator.py`
- [ ] `reddit_cli.py`
- [ ] `requirements.txt`
- [ ] `.env.example` (renamed to `.env`)
- [ ] `reddit_config.json`

Documentation:
- [ ] `README.md`
- [ ] `REDDIT_INTELLIGENCE_SETUP.md`
- [ ] `INTEGRATION_GUIDE.md`

Optional templates (for integration):
- [ ] `orchestration_templates/reddit_integration_agent.py`
- [ ] `dashboard_templates/RedditIntelligence.jsx`
- [ ] `cli_templates/reddit.py`

---

## Final Validation

Run this once everything is deployed:

```bash
#!/bin/bash
echo "=== CatalystOS Reddit Intelligence Deployment Validation ==="

# Check environment
python -c "import os; print('REDDIT_CLIENT_ID:', 'SET' if os.getenv('REDDIT_CLIENT_ID') else 'MISSING')"
python -c "import os; print('ANTHROPIC_API_KEY:', 'SET' if os.getenv('ANTHROPIC_API_KEY') else 'MISSING')"

# Check modules
python -c "from modules.reddit_intelligence.catalyst_reddit_orchestrator import CatalystRedditOS; print('✓ CatalystRedditOS imports OK')"

# Check API
curl -s http://localhost:8000/api/reddit/status && echo "✓ API endpoint OK"

echo "=== Deployment complete! ==="
```

Expected output:
```
=== CatalystOS Reddit Intelligence Deployment Validation ===
REDDIT_CLIENT_ID: SET
ANTHROPIC_API_KEY: SET
✓ CatalystRedditOS imports OK
{"module":"Reddit Intelligence","running":false,...}✓ API endpoint OK
=== Deployment complete! ===
```

---

## Success Indicators

You know it's working when:

1. ✓ Can run `python reddit_cli.py` without errors
2. ✓ Dashboard shows "Run Analysis" button
3. ✓ Clicking button shows "Pipeline started"
4. ✓ Results appear after ~1 minute
5. ✓ Google Sheet (if configured) gets new rows
6. ✓ JSON results file is created automatically

---

## Next Steps After Deployment

1. **Run your first analysis:**
   ```bash
   python -m cli.main reddit analyze --subreddits Nigeria Lagos Naija
   ```

2. **Check the results:**
   - Look at JSON file
   - Review Google Sheet (if configured)
   - Check sentiment and hooks

3. **Use insights:**
   - Extract top hooks for Sneakers Fest marketing
   - Use tone recommendations for Vice Chairman social
   - Feed psychology insights into content strategy

4. **Schedule ongoing runs:**
   - Add to APScheduler or Celery
   - Run daily/weekly based on needs
   - Monitor results over time

5. **Share with team:**
   - Grant access to Google Sheet
   - Brief team on what insights mean
   - Use in content planning meetings

---

## Support

If anything breaks:

1. Check troubleshooting section above
2. Review logs: `tail -f logs/*.log`
3. Verify credentials are set correctly
4. Check that all files are in correct directories
5. Re-read INTEGRATION_GUIDE.md

Good to go. Execute.
