#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────
# CatalystOS Skills CLI
# Usage:
#   ./skills.sh hook-generator
#   ./skills.sh --list
#   ./skills.sh --stack write-reel
#   ./skills.sh --category design
#   ./skills.sh --copy hook-generator      # copies to clipboard
#   ./skills.sh --stack sneakers-fest      # loads all Sneakers Fest skills
# ─────────────────────────────────────────────────────────────

SKILLS_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOADER="$SKILLS_DIR/integration/skills_loader.py"

# Colors
FORGE='\033[38;5;208m'
STEEL='\033[38;5;248m'
WHITE='\033[1;37m'
VOID='\033[0;30m'
RESET='\033[0m'
BOLD='\033[1m'

banner() {
  echo -e "${FORGE}"
  echo "  ╔═══════════════════════════════════╗"
  echo "  ║  CatalystOS Skills CLI  v2.0      ║"
  echo "  ║  48 skills · 10 categories        ║"
  echo "  ╚═══════════════════════════════════╝"
  echo -e "${RESET}"
}

usage() {
  echo -e "${WHITE}Usage:${RESET}"
  echo -e "  ${FORGE}./skills.sh <skill-name>${RESET}           Load a skill"
  echo -e "  ${FORGE}./skills.sh --list${RESET}                 List all 48 skills"
  echo -e "  ${FORGE}./skills.sh --category <cat>${RESET}       Load entire category"
  echo -e "  ${FORGE}./skills.sh --stack <name>${RESET}         Load a smart stack"
  echo -e "  ${FORGE}./skills.sh --copy <skill>${RESET}         Copy skill to clipboard"
  echo ""
  echo -e "${WHITE}Smart stacks:${RESET}"
  echo -e "  ${STEEL}write-reel     write-post     build-ui${RESET}"
  echo -e "  ${STEEL}build-campaign ai-consulting  ugc-video${RESET}"
  echo -e "  ${STEEL}sneakers-fest  substack-essay client-social${RESET}"
  echo -e "  ${STEEL}build-dashboard${RESET}"
  echo ""
  echo -e "${WHITE}Categories:${RESET}"
  echo -e "  ${STEEL}design  content  social  marketing  research${RESET}"
  echo -e "  ${STEEL}video   engineering  seo  product  ai${RESET}"
}

if [[ $# -eq 0 ]]; then
  banner
  usage
  exit 0
fi

case "$1" in
  --list|-l)
    banner
    python3 "$LOADER" --list
    ;;
  --category|-c)
    if [[ -z "$2" ]]; then
      echo -e "${FORGE}Error: specify a category${RESET}"
      exit 1
    fi
    banner
    python3 "$LOADER" --category "$2"
    ;;
  --stack|-s)
    if [[ -z "$2" ]]; then
      echo -e "${FORGE}Error: specify a stack name${RESET}"
      exit 1
    fi
    banner
    echo -e "${STEEL}Loading stack: ${WHITE}$2${RESET}\n"
    python3 "$LOADER" --stack "$2"
    ;;
  --copy)
    if [[ -z "$2" ]]; then
      echo -e "${FORGE}Error: specify a skill name${RESET}"
      exit 1
    fi
    CONTENT=$(python3 "$LOADER" "$2")
    if command -v pbcopy &>/dev/null; then
      echo "$CONTENT" | pbcopy
      echo -e "${FORGE}✓${RESET} ${WHITE}$2${RESET} copied to clipboard (macOS)"
    elif command -v xclip &>/dev/null; then
      echo "$CONTENT" | xclip -selection clipboard
      echo -e "${FORGE}✓${RESET} ${WHITE}$2${RESET} copied to clipboard (Linux)"
    elif command -v clip &>/dev/null; then
      echo "$CONTENT" | clip
      echo -e "${FORGE}✓${RESET} ${WHITE}$2${RESET} copied to clipboard (Windows)"
    else
      echo "$CONTENT"
      echo -e "\n${STEEL}(clipboard not available — content printed above)${RESET}"
    fi
    ;;
  --help|-h)
    banner
    usage
    ;;
  *)
    # Load a specific skill
    echo -e "${STEEL}Loading skill: ${WHITE}$1${RESET}\n"
    python3 "$LOADER" "$1"
    ;;
esac
