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

## What the pages do beyond static text

- **The Doctrine Seal** — the signature element. Five law nodes on a pentagon
  with a rotating legend ring; hovering, tapping or tabbing a node reports that
  law in the panel beside it, and clicking jumps to the full text. The nodes are
  ordinary anchors, so without JavaScript it is a static emblem that still links.
- **Artwork plates** — hero and section backgrounds drawn from the Catalyst
  artwork, laid under a legibility scrim (`.art-bg`), with a light parallax that
  JavaScript opts into (never applied otherwise).
- **Motion system** — `.reveal` (fade up), `.stagger` (children arrive in
  sequence), `.mask` (display type wipes in), `.draw` (rules draw across), plus
  a count-up on the stat band. All of it collapses under `prefers-reduced-motion`.
- **Film grain** — a fixed SVG-noise plate over the page, inline as a data URI.
- **Reading progress + section index** (doctrine) — a progress bar and a sticky
  `§00–§06` rail that highlights the section you are in. Every law also has its
  own anchor link, so `#law-own-the-source` is shareable.
- **Filters** (work) — filter the index by Authored / Mirrored or by stack
  layer. The control is `hidden` in the markup and only revealed by JavaScript,
  so it never appears as a dead button.
- **Print stylesheet** — the doctrine prints (or saves to PDF) as a clean
  black-on-white document: navigation, plates and buttons drop out, laws avoid
  page breaks, and link targets are printed after each link.

## Structure

```
site/
├── index.html  doctrine.html  work.html  universe.html  contact.html  404.html
├── favicon.svg  robots.txt  sitemap.xml
└── assets/
    ├── css/catalyst.css   # complete design system, brand tokens at the top
    ├── js/catalyst.js     # progressive enhancement only
    ├── fonts/             # self-hosted woff2, latin subset (~180 KB)
    └── img/               # artwork plates, portraits, OG cards (~860 KB)
```

There is **no build step and no dependency**, and **no third-party requests** — the
fonts are self-hosted, so the site renders identically whether or not Google Fonts
is reachable. Every page is hand-authored HTML linking one stylesheet and one script.

**Everything works with JavaScript disabled**: all content is visible (the reveal
animation is opt-in behind a `.js` class set inline in `<head>`), every project stays
listed, and every section is reachable. JavaScript only adds the reveal, the progress
bar, the section highlighting and the filters.

## Design system

Brand tokens are inherited from [Catalyst: The Awakening](https://catalyst-awakening.netlify.app/)
so the two sites read as one world. They live in `:root` at the top of `assets/css/catalyst.css`:

- **Danfo gold** `#F4B800` · **Blood red** `#C41E3A` · **Orisha teal** `#00C9B1` · **Bone white** `#F0EDE5` on `#06060d`
- Type: Bebas Neue (display), Oswald (labels), Space Grotesk (body), Crimson Pro (editorial)

All four families are SIL Open Font License, which permits self-hosting. The weights
actually used are subset to latin and served from `assets/fonts/`; the three faces
needed for first paint are preloaded.

### Artwork

Plates and portraits come from the Catalyst: The Awakening asset library, resized and
re-encoded to WebP for the web. To swap one, drop a replacement in `assets/img/` at a
similar size and update the `<img>` `src`, `width` and `height`.

Social cards (`og.jpg`, `og-doctrine.jpg`) were composed as HTML and rendered at
1200×630. Regenerate them by rebuilding that card markup and screenshotting at that
viewport — they are plain images, nothing references them at runtime except the
`og:image` / `twitter:image` meta tags.

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
- **Add a filter category:** add a chip in `work.html` with `data-filter="x"`, then add `x` to the `data-kind` of every card it should match.
- **Nav and footer are inline on each page** (no templating layer). Change them in one page, then mirror across the six.

## Gotchas worth knowing

- `.has-art` sets `position: relative` on its children *except* `.art-bg`. A blanket
  `.has-art > *` rule would override the plate's `position: absolute` and shove the
  content sideways — do not simplify that selector.
- Notched buttons (`clip-path`) cannot carry a visible border: the angled edges get
  sliced off. `.btn--ghost` uses a tint instead.
- Above-the-fold plates use `decoding="sync"`, not `async`, so they paint with the
  first frame.
- **A `.mask` element cannot observe itself.** Its `clip-path` collapses its own
  intersection rectangle to zero, so IntersectionObserver never fires for it —
  masks are watched through their parent element instead. If you add a new
  self-hiding animation, watch a proxy, not the element.
- The reveal observer is backed by a **sweep** that runs on every throttled scroll
  frame, because anchor jumps and fast scrolling skip past elements entirely and
  a one-shot observer leaves them hidden forever.
- `.has-art > *` excludes both `.art-bg` and `.scroll-cue`: the rule sets
  `position: relative`, which silently breaks any absolutely-positioned child.
