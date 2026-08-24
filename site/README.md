# Catalyst — Personal World Site

A static, no-build website: the personal hub for the Catalyst world. It introduces the
**Lagos Mafia Strategy** and links out to every project, repository and portfolio.

## Pages

| File | Purpose |
|------|---------|
| `index.html` | **The Cave** — home. Orientation, the four domains, teasers for doctrine and work. |
| `doctrine.html` | **The Lagos Mafia Strategy** — the centrepiece. Definition, five laws, operating loop, four stack layers, ten rules of engagement, five metrics. |
| `work.html` | **The Work** — every project and portfolio, ordered by stack layer, with honest `Authored` / `Mirrored` labelling. |
| `universe.html` | **The CatalystVerse** — gateway to the comic universe; links to the live site. |
| `contact.html` | **Enter** — collaboration, licensing, build work, press, and all channels. |
| `404.html` | Not-found page. |

## Structure

```
site/
├── index.html  doctrine.html  work.html  universe.html  contact.html  404.html
├── favicon.svg  robots.txt  sitemap.xml
└── assets/
    ├── css/catalyst.css   # complete design system, brand tokens at the top
    └── js/catalyst.js     # progressive enhancement only (scroll reveal, footer year)
```

There is **no build step and no dependency**. Every page is hand-authored HTML linking one
stylesheet and one script. The site is fully readable with JavaScript disabled.

## Design system

Brand tokens are inherited from [Catalyst: The Awakening](https://catalyst-awakening.netlify.app/)
so the two sites read as one world. They live in `:root` at the top of `assets/css/catalyst.css`:

- **Danfo gold** `#F4B800` · **Blood red** `#C41E3A` · **Orisha teal** `#00C9B1` · **Bone white** `#F0EDE5` on `#06060d`
- Type: Bebas Neue (display), Oswald (labels), Space Grotesk (body), Crimson Pro (editorial)

## Local preview

```bash
cd site
python3 -m http.server 8080
# open http://localhost:8080
```

Root-relative paths (`/assets/...`) are used throughout, so serve from `site/` — opening the
files directly with `file://` will not load the stylesheet.

## Deploy

`netlify.toml` at the repository root publishes the `site/` directory with caching and
security headers already configured. Point a Netlify site at this repo and it deploys as-is.

### Before going live

Replace the placeholder domain `https://catalyst-world.netlify.app` with the real one in:

- the `<link rel="canonical">` and `og:url` tags of each page
- `site/robots.txt`
- `site/sitemap.xml`

```bash
cd site && grep -rl 'catalyst-world.netlify.app' . \
  | xargs sed -i 's|catalyst-world\.netlify\.app|YOUR-DOMAIN.com|g'
```

## Editing

- **Change the palette or type:** edit the `:root` block in `assets/css/catalyst.css`. Everything follows.
- **Add a project:** copy an `<a class="card">` block in `work.html` into the right layer section.
- **Add a law or rule:** the `.law` and `.rules` blocks in `doctrine.html` are self-contained; numbering in `.rules` is automatic via CSS counters.
- **Nav and footer are inline on each page** (no templating layer). Change them in one page, then mirror across the six.
