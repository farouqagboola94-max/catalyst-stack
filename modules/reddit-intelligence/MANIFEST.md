# CatalystOS Reddit Intelligence Module - File Manifest

## Core Modules (Python)

### catalyst_reddit_module.py
The Reddit API layer. Handles:
- PRAW Reddit API initialization
- Post fetching from multiple subreddits
- Engagement filtering (score + comments)
- Post deduplication
- Configuration management

**Key classes:**
- `RedditIntelligenceCollector` - Main scraper engine
- `RedditConfig` - Configuration container

### catalyst_claude_analysis.py
The AI analysis layer. Handles:
- Claude API calls for post analysis
- Sentiment extraction
- Psychological insights
- Content hook identification
- Alternative angle generation
- Batch analysis and strategy summarization

**Key classes:**
- `ClaudeAnalysisEngine` - Analysis orchestrator
- `PostAnalysis` - Analysis result dataclass

### catalyst_sheets_handler.py
Google Sheets integration. Handles:
- Google Sheets API connection
- Spreadsheet creation
- Analysis data appending
- Summary sheet generation
- Sharing and access management

**Key classes:**
- `CatalystSheetsHandler` - Sheets API wrapper
- `SheetsConfig` - Setup configuration

### catalyst_reddit_orchestrator.py
Main orchestration engine. Handles:
- Coordinating reddit collection + analysis + storage
- Pipeline state management
- Error handling and logging
- Full pipeline execution
- Results formatting and export

**Key classes:**
- `CatalystRedditOS` - Main orchestrator
- `quickstart()` - Quick start function for CLI

### reddit_cli.py
Command-line interface. Handles:
- CLI argument parsing
- Environment validation
- Pipeline execution from terminal
- Result formatting and display
- Setup instructions

**Key functions:**
- `main()` - Main CLI entry point
- `parse_arguments()` - CLI argument parser
- `validate_environment()` - Environment check

---

## Configuration Files

### .env.example
Environment variable template. Copy to `.env` and fill in:
- REDDIT_CLIENT_ID
- REDDIT_CLIENT_SECRET
- ANTHROPIC_API_KEY
- GOOGLE_SHEETS_CREDENTIALS

### reddit_config.json
Module configuration in JSON format:
- Default subreddits
- API timeouts and rate limits
- Analysis output fields
- Deployment paths
- Cost estimates
- Metadata

### requirements.txt
Python package dependencies:
- praw (Reddit API)
- anthropic (Claude API)
- google-auth (Google OAuth)
- gspread (Google Sheets)
- python-dotenv (Environment management)

### __init__.py
Python package initialization file. Makes module importable:
```python
from modules.reddit_intelligence import CatalystRedditOS
```

---

## Documentation

### README.md
Quick overview and reference. Contains:
- What it does (overview)
- Quick start (5 minutes)
- File structure
- Core features
- Configuration reference
- Results format
- Integration examples
- Cost analysis
- Troubleshooting
- Use cases

**Read this first.**

### REDDIT_INTELLIGENCE_SETUP.md
Detailed setup guide. Contains:
- Architecture diagram
- Step-by-step setup (credential collection)
- Installation instructions
- CLI usage examples
- Python API usage
- Google Sheets setup
- Integration with CatalystOS
- Troubleshooting deep-dive
- Performance tips
- API reference

**Read this for detailed setup.**

### INTEGRATION_GUIDE.md
Integration with existing CatalystOS v2. Contains:
- File placement structure
- FastAPI orchestration integration
- React dashboard component integration
- CLI command integration
- Testing procedures
- Deployment instructions
- Code examples for each integration point

**Read this to add to your CatalystOS.**

### DEPLOYMENT_CHECKLIST.md
Step-by-step deployment checklist. Contains:
- Pre-deployment credential gathering
- Installation steps
- Integration steps (FastAPI, React, CLI)
- Configuration customization
- Verification checklist
- Production deployment
- Troubleshooting guide
- File checklist
- Post-deployment setup (scheduling, monitoring)

**Use this during deployment.**

---

## Integration Templates (In Documentation)

These code snippets are included in INTEGRATION_GUIDE.md:

### reddit_integration_agent.py (FastAPI)
Complete FastAPI router for Redis module:
- POST /api/reddit/run-analysis
- GET /api/reddit/status
- GET /api/reddit/results
- GET /api/reddit/default-config

### RedditIntelligence.jsx (React)
Complete React dashboard component:
- Run analysis button
- Status display
- Results visualization
- Google Sheets link

### reddit.py (CLI)
Complete CLI command group:
- reddit analyze - Run analysis
- reddit status - Check status

---

## File Tree

```
CatalystOS_Reddit_Intelligence/
├── Core Modules
│   ├── catalyst_reddit_module.py           (Reddit API layer)
│   ├── catalyst_claude_analysis.py         (AI analysis layer)
│   ├── catalyst_sheets_handler.py          (Google Sheets layer)
│   └── catalyst_reddit_orchestrator.py     (Main orchestrator)
│
├── CLI & Configuration
│   ├── reddit_cli.py                       (Command-line interface)
│   ├── __init__.py                         (Package initializer)
│   ├── requirements.txt                    (Dependencies)
│   ├── .env.example                        (Environment template)
│   └── reddit_config.json                  (Configuration)
│
└── Documentation
    ├── README.md                           (Start here)
    ├── REDDIT_INTELLIGENCE_SETUP.md        (Detailed setup)
    ├── INTEGRATION_GUIDE.md                (CatalystOS integration)
    └── DEPLOYMENT_CHECKLIST.md             (Deployment steps)
```

---

## Installation & Usage

### 1. Extract
```bash
unzip CatalystOS_Reddit_Intelligence.zip
cd CatalystOS_Reddit_Intelligence
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Configure
```bash
cp .env.example .env
# Edit .env with your credentials
```

### 4. Test
```bash
python reddit_cli.py --validate-env
python reddit_cli.py --help
```

### 5. Integrate (Optional)
See INTEGRATION_GUIDE.md for FastAPI/React/CLI integration

---

## Key Entry Points

For different use cases:

**From Command Line:**
```bash
python reddit_cli.py --subreddits Nigeria Lagos
```

**From Python:**
```python
from catalyst_reddit_orchestrator import CatalystRedditOS
catalyst = CatalystRedditOS()
results = catalyst.run_full_pipeline()
```

**From FastAPI:**
```python
from orchestration.reddit_integration_agent import router
app.include_router(router)  # Adds /api/reddit/* endpoints
```

**From React:**
```jsx
import RedditIntelligence from './components/RedditIntelligence'
<RedditIntelligence />
```

---

## Module Dependencies

Internal (within this package):
- catalyst_reddit_module imports: PRAW, logging, dataclasses
- catalyst_claude_analysis imports: anthropic, json, logging
- catalyst_sheets_handler imports: gspread, google-auth
- catalyst_reddit_orchestrator imports: all three above + logging

External (pip install):
- praw==7.7.0 (Reddit API wrapper)
- anthropic==0.28.0 (Claude API)
- google-auth==2.27.0 (Google OAuth)
- gspread==5.12.0 (Google Sheets API)
- python-dotenv==1.0.0 (Environment variables)

---

## Support & Customization

### Change Default Subreddits
Edit catalyst_reddit_module.py → RedditConfig.DEFAULT_SUBREDDITS

### Change Analysis Prompts
Edit catalyst_claude_analysis.py → ClaudeAnalysisEngine.analyze_post()

### Change Google Sheets Format
Edit catalyst_sheets_handler.py → CatalystSheetsHandler class methods

### Add New Data Sources
Create new module following catalyst_reddit_module.py pattern

---

## Version & Status

- Version: 1.0.0
- Status: Production Ready
- Created: May 11, 2026
- Framework: CatalystOS v2
- Author: Catalyst (Oluwatobiloba)

---

## License

CatalystOS Proprietary - Built for Catalyst's ventures

---

That's everything. Go build.
