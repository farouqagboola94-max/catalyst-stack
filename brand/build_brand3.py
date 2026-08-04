#!/usr/bin/env python3
import base64, subprocess, math
from pathlib import Path
from pngcrop import crop_top

FONTS = Path("/root/.claude/skills/canvas-design/canvas-fonts")
OUT = Path("/home/user/catalyst-stack/brand"); OUT.mkdir(parents=True, exist_ok=True)
CHROME = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome"

# ── corrected venue ──
VENUE = "MURI OKUN PLACE PARK"
CITY = "VICTORIA ISLAND, LAGOS"
DATE = "DEC 12"

def face(name, file, weight="normal", style="normal"):
    b = base64.b64encode((FONTS/file).read_bytes()).decode()
    return (f"@font-face{{font-family:'{name}';font-weight:{weight};font-style:{style};"
            f"src:url(data:font/ttf;base64,{b}) format('truetype');}}")

FONTCSS = "".join([
    face("Shoulders", "BigShoulders-Bold.ttf", "700"),
    face("Mono", "JetBrainsMono-Regular.ttf", "400"),
    face("MonoB", "JetBrainsMono-Bold.ttf", "700"),
    face("Serif", "CrimsonPro-Italic.ttf", "400", "italic"),
])
GRAIN = ("background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' "
         "viewBox='0 0 200 200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' "
         "baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' "
         "height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\");")
BASE = f"""<style>{FONTCSS}
*{{margin:0;padding:0;box-sizing:border-box}}
:root{{--void:#0A0A0A;--forge:#FF6A00;--off:#F0EDE6;--dim:#6a6a66;--line:#242424}}
html,body{{margin:0;background:#0A0A0A}}
.grain{{position:absolute;inset:0;{GRAIN}background-size:cover;pointer-events:none;z-index:9}}
.mono{{font-family:'Mono',monospace}} .mb{{font-family:'MonoB',monospace}} .abs{{position:absolute}}
</style>"""

def render(name, w, h, body_html, body_style=""):
    rh = max(h + 320, math.ceil(h / 0.80))
    html = (f"<!doctype html><html><head><meta charset='utf-8'>{BASE}</head>"
            f"<body style='width:{w}px;height:{rh}px;overflow:hidden;position:relative;background:#0A0A0A;{body_style}'>"
            f"{body_html}<div class='grain' style='height:{h}px'></div></body></html>")
    p = Path(f"/tmp/{name}.html"); p.write_text(html, encoding="utf-8")
    tmp = f"/tmp/{name}_full.png"
    subprocess.run([CHROME,"--headless","--no-sandbox","--disable-gpu","--hide-scrollbars",
        f"--screenshot={tmp}",f"--window-size={w},{rh}",f"file://{p}"], stderr=subprocess.DEVNULL, check=True)
    crop_top(tmp, OUT/f"{name}.png", h)
    print(f"  {name}.png ({w}x{h})")

# ══ CORRECTED Sneakers Fest poster 1080x1350 ═════════════════
sf = f"""
<div class='abs' style='top:0;left:0;width:100%;height:6px;background:var(--forge)'></div>
<div class='abs' style='top:60px;left:70px;width:940px;display:flex;justify-content:space-between'>
  <div class='mono' style='font-size:13px;letter-spacing:5px;color:var(--dim)'>PRESENTED BY CATALYST CONCEPTS</div>
  <div class='mono' style='font-size:13px;letter-spacing:4px;color:var(--dim)'>LAGOS, NG</div>
</div>
<div class='abs' style='top:210px;left:64px'>
  <div class='mono' style='font-size:15px;letter-spacing:8px;color:var(--forge);margin-bottom:20px'>&#9670;&nbsp;&nbsp;LAGOS NOIR &frasl;&frasl; ONE NIGHT</div>
  <div style="font-family:'Shoulders';font-size:250px;line-height:0.80;color:var(--off)">SNEAKERS</div>
  <div style="font-family:'Shoulders';font-size:250px;line-height:0.82;color:var(--forge)">FEST</div>
  <div style="font-family:'Shoulders';font-size:150px;line-height:0.9;color:var(--off);letter-spacing:6px;margin-top:6px">2026</div>
</div>
<div class='abs' style='top:900px;left:70px;right:70px;height:1px;background:var(--line)'></div>
<div class='abs' style='top:936px;left:70px;display:grid;grid-template-columns:auto auto auto;gap:34px'>
  <div><div class='mono' style='font-size:12px;letter-spacing:3px;color:var(--dim);margin-bottom:6px'>DATE</div><div class='mb' style='font-size:22px;color:var(--off)'>{DATE}</div></div>
  <div><div class='mono' style='font-size:12px;letter-spacing:3px;color:var(--dim);margin-bottom:6px'>VENUE</div><div class='mb' style='font-size:22px;color:var(--off)'>{VENUE}</div></div>
  <div><div class='mono' style='font-size:12px;letter-spacing:3px;color:var(--dim);margin-bottom:6px'>CITY</div><div class='mb' style='font-size:22px;color:var(--off)'>VI &middot; LAGOS</div></div>
</div>
<div class='abs' style='top:1044px;left:70px;border-left:2px solid var(--forge);padding-left:18px'>
  <div style="font-family:'Serif';font-style:italic;font-size:24px;color:#cbc7bf">The city&rsquo;s sneaker culture &mdash; forged in one night.</div>
</div>
<div class='abs' style='top:1150px;left:70px;right:70px;display:flex;justify-content:space-between;align-items:center'>
  <span class='mono' style='font-size:12px;letter-spacing:3px;color:var(--dim)'>SPONSORSHIPS OPEN &middot; PARTNER WITH US</span>
  <span class='mb' style='font-size:14px;letter-spacing:2px;color:var(--forge)'>@CATALYSTGGG</span>
</div>
<div class='abs' style='top:1250px;left:70px;right:70px;display:flex;justify-content:space-between'>
  <span class='mono' style='font-size:11px;letter-spacing:4px;color:#39393a'>METAL DRAGON &frasl;&frasl; FREEDOM YEAR</span>
  <span class='mono' style='font-size:11px;letter-spacing:4px;color:#39393a'>&#9670; MURI OKUN PLACE PARK</span>
</div>
"""
render("catalyst-sneakersfest-poster", 1080, 1350, sf)

# ══ IG STORY 1080x1920 ═══════════════════════════════════════
story = f"""
<div class='abs' style='top:0;left:0;width:100%;height:6px;background:var(--forge)'></div>
<div class='abs' style='top:90px;left:64px'><span class='mono' style='font-size:13px;letter-spacing:6px;color:var(--dim)'>&#9670;&nbsp;PRESENTED BY CATALYST CONCEPTS</span></div>
<div class='abs' style='top:560px;left:60px'>
  <div class='mono' style='font-size:15px;letter-spacing:8px;color:var(--forge);margin-bottom:22px'>SAVE THE DATE</div>
  <div style="font-family:'Shoulders';font-size:220px;line-height:0.80;color:var(--off)">SNEAKERS</div>
  <div style="font-family:'Shoulders';font-size:220px;line-height:0.82;color:var(--forge)">FEST 26</div>
</div>
<div class='abs' style='top:1150px;left:64px;right:64px;height:1px;background:var(--line)'></div>
<div class='abs' style='top:1195px;left:64px'>
  <div class='mono' style='font-size:13px;letter-spacing:3px;color:var(--dim);margin-bottom:8px'>WHEN &middot; WHERE</div>
  <div class='mb' style='font-size:34px;color:var(--off);line-height:1.35'>{DATE} &middot; 2026<br>{VENUE}<br>{CITY}</div>
</div>
<div class='abs' style='top:1560px;left:64px;border-left:2px solid var(--forge);padding-left:18px'>
  <div style="font-family:'Serif';font-style:italic;font-size:26px;color:#cbc7bf">Tap the link. Lock your spot.</div>
</div>
<div class='abs' style='top:1760px;left:64px;right:64px;display:flex;justify-content:space-between;align-items:center'>
  <span class='mb' style='font-size:18px;letter-spacing:2px;color:var(--forge)'>@CATALYSTGGG</span>
  <span class='mono' style='font-size:12px;letter-spacing:3px;color:#39393a'>&#9670; LAGOS NOIR</span>
</div>
"""
render("catalyst-sneakersfest-story", 1080, 1920, story)

# ══ TICKET 1400x520 ══════════════════════════════════════════
ticket = f"""
<div class='abs' style='top:0;left:0;width:100%;height:5px;background:var(--forge)'></div>
<!-- perforation -->
<div class='abs' style='top:0;left:1000px;height:100%;border-left:2px dashed #333'></div>
<!-- main stub -->
<div class='abs' style='top:52px;left:56px'>
  <div class='mono' style='font-size:12px;letter-spacing:5px;color:var(--forge);margin-bottom:14px'>&#9670;&nbsp;CATALYST CONCEPTS PRESENTS</div>
  <div style="font-family:'Shoulders';font-size:96px;line-height:0.84;color:var(--off)">SNEAKERS <span style='color:var(--forge)'>FEST</span></div>
  <div style="font-family:'Shoulders';font-size:60px;line-height:0.9;color:var(--off);letter-spacing:4px;margin-top:4px">2026</div>
</div>
<div class='abs' style='top:392px;left:56px;display:grid;grid-template-columns:auto auto auto;gap:28px'>
  <div><div class='mono' style='font-size:11px;letter-spacing:2px;color:var(--dim);margin-bottom:5px'>DATE</div><div class='mb' style='font-size:18px;color:var(--off)'>{DATE} &middot; 2026</div></div>
  <div><div class='mono' style='font-size:11px;letter-spacing:2px;color:var(--dim);margin-bottom:5px'>VENUE</div><div class='mb' style='font-size:18px;color:var(--off)'>{VENUE}</div></div>
  <div><div class='mono' style='font-size:11px;letter-spacing:2px;color:var(--dim);margin-bottom:5px'>ADMIT</div><div class='mb' style='font-size:18px;color:var(--forge)'>ONE</div></div>
</div>
<!-- right stub -->
<div class='abs' style='top:52px;left:1044px'>
  <div class='mono' style='font-size:11px;letter-spacing:3px;color:var(--dim);margin-bottom:10px'>GENERAL ADMISSION</div>
  <div style='width:150px;height:150px;border:1px solid #2a2a2a;background:repeating-linear-gradient(45deg,#151515 0 8px,#0e0e0e 8px 16px);display:flex;align-items:center;justify-content:center'>
    <span class='mono' style='font-size:10px;color:#555'>QR</span></div>
  <div class='mono' style='font-size:11px;letter-spacing:2px;color:#9a968e;margin-top:14px'>NO.&nbsp;SF26-0001</div>
  <div class='mono' style='font-size:10px;letter-spacing:2px;color:#39393a;margin-top:20px'>SCAN AT DOOR<br>&#9670; VI, LAGOS</div>
</div>
"""
render("catalyst-sneakersfest-ticket", 1400, 520, ticket)

# ══ SPONSOR DECK COVER 1600x900 ══════════════════════════════
tiers = "".join(
    f"<div style='display:flex;justify-content:space-between;padding:11px 0;border-top:1px solid var(--line)'>"
    f"<span class='mono' style='font-size:13px;letter-spacing:2px;color:#cbc7bf'>{t}</span>"
    f"<span class='mono' style='font-size:12px;color:var(--forge)'>&#9679;</span></div>"
    for t in ["TITLE PARTNER","GOLD","SILVER","BRONZE","BRAND ACTIVATION"])
sponsor = f"""
<div class='abs' style='top:0;left:0;width:100%;height:4px;background:linear-gradient(90deg,var(--forge) 0%,transparent 55%)'></div>
<div class='abs' style='top:52px;left:70px;width:1460px;display:flex;justify-content:space-between'>
  <div class='mono' style='font-size:12px;letter-spacing:5px;color:var(--dim)'>CATALYST CONCEPTS &mdash; PARTNERSHIPS</div>
  <div class='mono' style='font-size:12px;letter-spacing:4px;color:var(--dim)'>CONFIDENTIAL &middot; 2026</div>
</div>
<div class='abs' style='top:250px;left:66px'>
  <div class='mono' style='font-size:13px;letter-spacing:6px;color:var(--forge);margin-bottom:18px'>&#9670;&nbsp;SPONSORSHIP PROSPECTUS</div>
  <div style="font-family:'Shoulders';font-size:150px;line-height:0.84;color:var(--off)">SNEAKERS FEST</div>
  <div style="font-family:'Shoulders';font-size:150px;line-height:0.84;color:var(--forge)">2026</div>
  <div style="font-family:'Serif';font-style:italic;font-size:23px;color:#cbc7bf;margin-top:26px;max-width:760px">Put your brand at the centre of Lagos sneaker culture &mdash; one night, {DATE}, {VENUE}, VI.</div>
</div>
<div class='abs' style='top:250px;left:1210px;width:320px'>
  <div class='mb' style='font-size:11px;letter-spacing:3px;color:var(--forge);margin-bottom:8px'>PARTNERSHIP TIERS</div>
  {tiers}<div style='border-top:1px solid var(--line)'></div>
</div>
<div class='abs' style='top:788px;left:66px'>
  <span class='mono' style='font-size:13px;letter-spacing:2px;color:#9a968e'>PARTNER WITH US&nbsp;&nbsp;&middot;&nbsp;&nbsp;<span style='color:var(--forge)'>@Catalyst188</span>&nbsp;&nbsp;&middot;&nbsp;&nbsp;Farouqagboola94@gmail.com</span>
</div>
<div class='abs' style='top:788px;left:1210px;width:320px;text-align:right'>
  <span class='mono' style='font-size:11px;letter-spacing:4px;color:#39393a'>&#9670; METAL DRAGON &frasl;&frasl; FREEDOM YEAR</span>
</div>
"""
render("catalyst-sneakersfest-sponsor-cover", 1600, 900, sponsor)

# ══ FILLED CAROUSEL — Sneakers Fest reveal, 3x 1080x1350 ═════
def frame(tag):
    return (f"<div class='abs' style='top:0;left:0;width:100%;height:6px;background:var(--forge)'></div>"
            f"<div class='abs' style='top:58px;left:64px'><span class='mono' style='font-size:12px;letter-spacing:5px;color:var(--dim)'>&#9670;&nbsp;CATALYST CONCEPTS</span></div>"
            f"<div class='abs' style='top:58px;right:64px'><span class='mono' style='font-size:12px;letter-spacing:3px;color:var(--dim)'>{tag}</span></div>")

s1 = frame("01 / 03") + f"""
<div class='abs' style='top:330px;left:64px'>
  <div class='mono' style='font-size:14px;letter-spacing:6px;color:var(--forge);margin-bottom:24px'>THE REVEAL &middot; {DATE}</div>
  <div style="font-family:'Shoulders';font-size:158px;line-height:0.84;color:var(--off)">SNEAKERS<br><span style='color:var(--forge)'>FEST</span> 2026<br>IS HERE.</div>
</div>
<div class='abs' style='top:1120px;left:64px;border-left:2px solid var(--forge);padding-left:18px'>
  <div style="font-family:'Serif';font-style:italic;font-size:26px;color:#cbc7bf">Lagos, your sneaker moment has a date.</div>
</div>
<div class='abs' style='top:1250px;left:64px;right:64px;display:flex;justify-content:space-between'>
  <span class='mono' style='font-size:13px;letter-spacing:4px;color:var(--dim)'>SWIPE &rarr;</span>
  <span class='mono' style='font-size:12px;letter-spacing:3px;color:#39393a'>@CATALYSTGGG</span>
</div>
"""
render("catalyst-sf-carousel-1", 1080, 1350, s1)

s2 = frame("02 / 03") + f"""
<div class='abs' style="top:250px;left:56px;font-family:'Shoulders';font-size:250px;color:var(--forge);line-height:0.8">01</div>
<div class='abs' style='top:560px;left:64px'>
  <div class='mono' style='font-size:14px;letter-spacing:5px;color:var(--forge);margin-bottom:16px'>ONE NIGHT &middot; ONE ROOF</div>
  <div style="font-family:'Shoulders';font-size:88px;line-height:0.9;color:var(--off);max-width:920px">THE WHOLE<br>CULTURE, LIVE.</div>
</div>
<div class='abs' style='top:800px;left:64px;max-width:920px'>
  <div style="font-family:'Serif';font-style:italic;font-size:30px;line-height:1.55;color:#cbc7bf">Collectors, resellers, the brands, the heat &mdash; together for one night. Exclusive drops, live trades, and Lagos street culture at full volume.</div>
</div>
<div class='abs' style='top:1090px;left:64px;display:grid;grid-template-columns:auto auto;gap:12px 40px'>
  <span class='mb' style='font-size:18px;color:var(--off)'><span style='color:var(--dim)'>WHEN&nbsp;&nbsp;</span>{DATE} &middot; 2026</span>
  <span class='mb' style='font-size:18px;color:var(--off)'><span style='color:var(--dim)'>CITY&nbsp;&nbsp;</span>VI &middot; LAGOS</span>
  <span class='mb' style='font-size:18px;color:var(--off)' >&nbsp;</span>
  <span class='mb' style='font-size:18px;color:var(--forge)'>{VENUE}</span>
</div>
<div class='abs' style='top:1250px;left:64px;right:64px;display:flex;justify-content:space-between'>
  <span class='mono' style='font-size:13px;letter-spacing:4px;color:var(--dim)'>KEEP SWIPING &rarr;</span>
  <span class='mono' style='font-size:12px;letter-spacing:3px;color:#39393a'>@CATALYSTGGG</span>
</div>
"""
render("catalyst-sf-carousel-2", 1080, 1350, s2)

s3 = frame("03 / 03") + """
<div class='abs' style='top:340px;left:64px'>
  <div class='mono' style='font-size:14px;letter-spacing:6px;color:var(--forge);margin-bottom:24px'>YOUR MOVE</div>
  <div style="font-family:'Shoulders';font-size:150px;line-height:0.86;color:var(--off)">SECURE<br>YOUR<br><span style='color:var(--forge)'>SPOT.</span></div>
</div>
<div class='abs' style='top:1000px;left:64px;right:64px;height:1px;background:var(--line)'></div>
<div class='abs' style='top:1040px;left:64px'>
  <div class='mono' style='font-size:13px;letter-spacing:3px;color:var(--dim);margin-bottom:12px'>TICKETS &middot; SPONSORSHIPS &middot; VENDOR SLOTS</div>
  <div style='display:flex;gap:40px'>
    <span class='mb' style='font-size:20px;letter-spacing:2px;color:var(--off)'>IG&nbsp;&nbsp;<span style='color:var(--forge)'>@CATALYSTGGG</span></span>
    <span class='mb' style='font-size:20px;letter-spacing:2px;color:var(--off)'>X&nbsp;&nbsp;<span style='color:var(--forge)'>@CATALYST188</span></span>
  </div>
</div>
<div class='abs' style='top:1250px;left:64px;right:64px;display:flex;justify-content:space-between'>
  <span class='mono' style='font-size:13px;letter-spacing:3px;color:var(--dim)'>DM &middot; SAVE &middot; SHARE</span>
  <span class='mono' style='font-size:11px;letter-spacing:4px;color:#39393a'>&#9670; MURI OKUN PLACE PARK</span>
</div>
"""
render("catalyst-sf-carousel-3", 1080, 1350, s3)
print("ALL DONE")
