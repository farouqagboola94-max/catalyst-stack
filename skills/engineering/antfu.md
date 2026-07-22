---
skill: antfu
category: Engineering | Developer Toolkit
catalyst_use: Frontend development standards, open-source tooling, CatalystOS JS stack
---

# ANTFU SKILLS — Production-Grade Engineering Toolkit

Curated production-grade engineering skills inspired by Anthony Fu's open-source standards.

## The Antfu Philosophy
- Tools should remove friction, not add it
- Configuration should be minimal but opinionated
- Code quality is non-negotiable, not a nice-to-have
- Open source is how you build reputation that compounds

## ESLint Config (Antfu Standard)
```bash
npm i -D eslint @antfu/eslint-config
```
```js
// eslint.config.js
import antfu from '@antfu/eslint-config'
export default antfu({
  typescript: true,
  vue: true,  // or react: true
  stylistic: {
    indent: 2,
    quotes: 'single',
  }
})
```

## Vite Project Setup
```bash
npm create vite@latest my-app -- --template react-ts
```
Key Vite plugins: @vitejs/plugin-react, vite-plugin-pages, unplugin-auto-import

## TypeScript Strictness
```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true
  }
}
```

## Package Management (ni — Use Correct Package Manager)
```bash
npm i -g @antfu/ni
ni          # installs (detects npm/pnpm/yarn/bun)
nr dev      # runs dev
nun         # uninstalls
```

## Monorepo Setup (pnpm workspaces)
```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/*'
  - 'apps/*'
```

## CatalystOS JavaScript Standards
- pnpm for package management
- Vite for bundling
- TypeScript strict mode always
- Antfu ESLint config
- Vitest for testing

## Output
Tooling setup scripts, config files, project scaffolding templates.
