# CATALYST STACK — 300 Repo Fork Script

Automated fork script for 300 curated repositories across AI, ML, LLMs, agents, and development tools.

## 📋 Categories (23)

1. **ComfyUI Core Ecosystem** (15 repos)
2. **Image Generation Engines & UIs** (15 repos)
3. **Video Generation Models** (15 repos)
4. **Character Consistency & LoRA Training** (10 repos)
5. **Face, Enhancement & Visual Tools** (10 repos)
6. **Anime, Comic & Creative AI** (8 repos)
7. **Audio Generation & Speech** (12 repos)
8. **Local LLM & Inference** (12 repos)
9. **AI Agent Frameworks** (15 repos)
10. **RAG & Vector Databases** (10 repos)
11. **FastAPI & Backend Infrastructure** (12 repos)
12. **MCP Servers & Tools** (12 repos)
13. **Web Scraping & Data Collection** (10 repos)
14. **Media Download & Video Tools** (10 repos)
15. **Social Media Automation** (10 repos)
16. **Football & Sports Data (WC2026)** (8 repos)
17. **Monitoring & Observability** (10 repos)
18. **AI SDK & Dev Tools** (12 repos)
19. **Deployment & Self-Hosting** (10 repos)
20. **Data Viz, Dashboards & Workflow** (10 repos)
21. **Computer Vision & ML Libraries** (10 repos)
22. **Creative Content Pipelines** (10 repos)
23. **Agentic AI Research & Tools** (8 repos)

## 🚀 Usage

### Option 1: Manual Execution
```bash
# Clone this repo
git clone https://github.com/YOUR_USERNAME/catalyst-stack.git
cd catalyst-stack

# Authenticate with GitHub
gh auth login

# Run the script
bash fork_300.sh
```

### Option 2: GitHub Actions (Automated)
The workflow will:
- Run automatically on the **first day of every month** at midnight UTC
- Can also be triggered manually via the **Actions** tab
- Automatically generates execution logs and reports

**To trigger manually:**
1. Go to the **Actions** tab in this repository
2. Select **Fork 300 Repositories**
3. Click **Run workflow**

## 📊 Features

✅ **300 repositories** across 23 AI/ML categories  
✅ **Automatic forking** with gentle rate limiting (0.5s between forks)  
✅ **Error handling** — skips already-forked repos  
✅ **GitHub Actions automation** — scheduled monthly or manual triggers  
✅ **Execution logs** — captured and stored as artifacts  
✅ **Status reports** — visible in the workflow summary  

## ⚙️ Requirements

- GitHub CLI (`gh`) installed and authenticated
- GitHub account with fork permissions
- (For Actions) Repository with GitHub Actions enabled

## 📝 Notes

- All forks will be created in your personal account
- You'll have **admin access** to every fork
- The script uses `--clone=false` to avoid cloning locally
- Rate limiting prevents GitHub API throttling

## 🔧 Customization

Edit `fork_300.sh` to:
- Add/remove repositories
- Adjust rate limiting (change `sleep 0.5`)
- Modify fork parameters

Then commit and push changes:
```bash
git add fork_300.sh
git commit -m "Update fork list"
git push
```

## 📜 License

MIT

## 🤝 Contributing

Have a repo that should be included? Submit a PR or open an issue!

---

**Status:** Ready to fork! 🚀
