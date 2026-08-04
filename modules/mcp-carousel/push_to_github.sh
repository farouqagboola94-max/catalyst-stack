#!/bin/bash

# ============================================================
# CATALYST OS — MCP CAROUSEL GITHUB PUSH
# ============================================================
# Run this script locally after setting your GitHub token:
#   export GITHUB_TOKEN=your_personal_access_token
#   export GITHUB_USER=your_username
#   bash push_to_github.sh
# ============================================================

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
ORANGE='\033[0;33m'
NC='\033[0m'

REPO_NAME="catalyst-mcp-carousel"

echo -e "${ORANGE}============================================================${NC}"
echo -e "${ORANGE}  CATALYST OS — MCP CAROUSEL GITHUB PUSH${NC}"
echo -e "${ORANGE}============================================================${NC}"

# Check for token
if [ -z "$GITHUB_TOKEN" ]; then
    echo -e "${RED}ERROR: GITHUB_TOKEN not set${NC}"
    echo "Run: export GITHUB_TOKEN=your_personal_access_token"
    exit 1
fi

if [ -z "$GITHUB_USER" ]; then
    echo "Enter your GitHub username:"
    read GITHUB_USER
fi

echo -e "${ORANGE}Creating repo: ${GITHUB_USER}/${REPO_NAME}${NC}"

# Create the repo via GitHub API
curl -s -H "Authorization: token $GITHUB_TOKEN" \
     -H "Accept: application/vnd.github.v3+json" \
     https://api.github.com/user/repos \
     -d "{\"name\":\"${REPO_NAME}\",\"description\":\"MCP Intelligence Carousel — CatalystOS Module. Lagos Noir aesthetic.\",\"private\":false}" \
     > /dev/null 2>&1

echo -e "${GREEN}✅ Repository created${NC}"

# Initialize and push
cd "$(dirname "$0")"
git init
git add .
git commit -m "feat: MCP Intelligence Carousel v1.0 — Lagos Noir aesthetic

- 6-slide interactive carousel (cover + 5 MCPs)
- Shopify, Higgsfield, AdAdvisor, Google Drive, Google Analytics
- Touch/swipe + keyboard navigation
- Lagos Noir design system (#0a0a0a base, #f97316 accent)
- CatalystOS module integration ready
- Zero external dependencies beyond React"

git branch -M main
git remote add origin "https://${GITHUB_TOKEN}@github.com/${GITHUB_USER}/${REPO_NAME}.git"
git push -u origin main

echo ""
echo -e "${GREEN}============================================================${NC}"
echo -e "${GREEN}  DEPLOYED: github.com/${GITHUB_USER}/${REPO_NAME}${NC}"
echo -e "${GREEN}============================================================${NC}"
echo ""
echo -e "${ORANGE}Module registered: MCP Intelligence Module v1.0${NC}"
echo -e "Integration path: CatalystOS > Skill Vault > AI Consulting OS"
