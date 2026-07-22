---
skill: repomix
category: Engineering | Codebase Management
catalyst_use: Compressing CatalystOS repos for AI analysis, client codebase reviews
---

# REPOMIX SKILL — Repository Compression for AI

Compresses entire repositories into AI-friendly formats for large-scale code analysis.

## What Repomix Does
Converts a codebase into a single, structured text file that:
- Maintains file hierarchy context
- Strips unnecessary binary/generated files
- Preserves imports and dependencies visible
- Formats consistently for LLM consumption

## Repomix CLI Usage
```bash
npx repomix                              # Current directory
npx repomix --output output.txt          # Custom output file
npx repomix --include "src/**/*.ts"      # Include filter
npx repomix --ignore "node_modules/**"   # Ignore filter
npx repomix --style xml                  # XML format (best for Claude)
npx repomix --compress                   # Remove comments and whitespace
```

## Configuration File (.repomixrc)
```json
{
  "output": {
    "filePath": "repomix-output.txt",
    "style": "xml",
    "compress": true
  },
  "ignore": {
    "customPatterns": ["*.test.ts", "dist/**", ".env*"]
  }
}
```

## CatalystOS Application
Use Repomix when:
- Asking Claude to audit an entire codebase
- Reviewing client code deliverables
- Debugging complex multi-file issues
- Onboarding Claude to a new project context

## Output Size Management
- Full repo output: often 50K-200K tokens (use carefully)
- Targeted output: filter to relevant directories only
- Compressed mode: reduces token count by 30-50%

## Output
Repomix config for CatalystOS projects, analysis workflow, compression guidelines.
