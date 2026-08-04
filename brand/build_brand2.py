#!/usr/bin/env python3
import base64, subprocess, math
from pathlib import Path
from pngcrop import crop_top

FONTS = Path("/root/.claude/skills/canvas-design/canvas-fonts")
OUT = Path("/home/user/catalyst-stack/brand"); OUT.mkdir(parents=True, exist_ok=True)
CHROME = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome"

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
    rh = max(h + 320, math.ceil(h / 0.80))         # render taller, crop back
    html = (f"<!doctype html><html><head><meta charset='utf-8'>{BASE}</head>"
            f"<body style='width:{w}px;height:{rh}px;overflow:hidden;position:relative;background:#0A0A0A;{body_style}'>"
            f"{body_html}<div class='grain' style='height:{h}px'></div></body></html>")
    p = Path(f"/tmp/{name}.html"); p.write_text(html, encoding="utf-8")
    tmp = f"/tmp/{name}_full.png"
    subprocess.run([CHROME,"--headless","--no-sandbox","--disable-gpu","--hide-scrollbars",
        f"--screenshot={tmp}",f"--window-size={w},{rh}",f"file://{p}"], stderr=subprocess.DEVNULL, check=True)
    crop_top(tmp, OUT/f"{name}.png", h)
    print(f"  {name}.png ({w}x{h})")

# ══ SNEAKERS FEST 2026 poster — 1080x1350 ════════════════════
sf = """
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
<div class='abs' style='top:936px;left:70px;display:grid;grid-template-columns:auto auto auto;gap:36px'>
  <div><div class='mono' style='font-size:12px;letter-spacing:3px;color:var(--dim);margin-bottom:6px'>DATE</div><div class='mb' style='font-size:22px;color:var(--off)'>DEC 12</div></div>
  <div><div class='mono' style='font-size:12px;letter-spacing:3px;color:var(--dim);margin-bottom:6px'>VENUE</div><div class='mb' style='font-size:22px;color:var(--off)'>EKO CONVENTION CENTRE</div></div>
  <div><div class='mono' style='font-size:12px;letter-spacing:3px;color:var(--dim);margin-bottom:6px'>CITY</div><div class='mb' style='font-size:22px;color:var(--off)'>LAGOS</div></div>
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
  <span class='mono' style='font-size:11px;letter-spacing:4px;color:#39393a'>&#9670; SNEAKERS FEST &rsquo;26</span>
</div>
"""
render("catalyst-sneakersfest-poster", 1080, 1350, sf)

# ══ SUBSTACK cover — 1200x600 ════════════════════════════════
sub = """
<div class='abs' style='top:0;left:0;height:100%;width:6px;background:linear-gradient(180deg,var(--forge),transparent 65%)'></div>
<div class='abs' style="top:70px;right:60px;font-family:'Shoulders';font-size:240px;color:#141414;line-height:1;z-index:0">CC</div>
<div class='abs' style='top:56px;left:66px'>
  <div class='mono' style='font-size:12px;letter-spacing:5px;color:var(--forge)'>&#9670;&nbsp;A CATALYST CONCEPTS PUBLICATION</div>
</div>
<div class='abs' style='top:150px;left:64px'>
  <div style="font-family:'Shoulders';font-size:120px;line-height:0.84;color:var(--off)">THE GREAT</div>
  <div style="font-family:'Shoulders';font-size:120px;line-height:0.84;color:var(--forge)">SABOTAGE</div>
</div>
<div class='abs' style='top:428px;left:66px;max-width:760px'>
  <div style="font-family:'Serif';font-style:italic;font-size:23px;line-height:1.4;color:#cbc7bf">Essays on power, psychology, and building in the dark &mdash; from Lagos.</div>
</div>
<div class='abs' style='top:500px;left:66px'>
  <span class='mono' style='font-size:13px;letter-spacing:3px;color:var(--dim)'>BY THE CATALYST&nbsp;&nbsp;&middot;&nbsp;&nbsp;<span style="color:var(--forge)">@Catalyst188</span></span>
</div>
"""
render("catalyst-substack-cover", 1200, 600, sub)

# ══ LOGO LOCKUP sheet — 1600x1000 ════════════════════════════
sw = "".join(f"<div style='width:52px;height:52px;background:{c};border:1px solid #2a2a2a'></div>" for c in ["#0A0A0A","#FF6A00","#F0EDE6","#6a6a66"])
logo = f"""
<div class='abs' style='top:0;left:0;width:100%;height:4px;background:linear-gradient(90deg,var(--forge) 0%,transparent 55%)'></div>
<div class='abs' style='top:56px;left:70px;width:1460px;display:flex;justify-content:space-between'>
  <div class='mono' style='font-size:12px;letter-spacing:5px;color:var(--dim)'>CATALYST CONCEPTS &mdash; IDENTITY SYSTEM</div>
  <div class='mono' style='font-size:12px;letter-spacing:4px;color:var(--dim)'>V1 &middot; LAGOS NOIR</div>
</div>
<!-- primary monogram -->
<div class='abs' style='top:200px;left:70px;width:300px;height:300px;border:2px solid var(--forge);display:flex;align-items:center;justify-content:center'>
  <span style="font-family:'Shoulders';font-size:200px;color:var(--off);line-height:1">CC</span>
</div>
<div class='abs' style='top:520px;left:70px'><div class='mono' style='font-size:11px;letter-spacing:3px;color:var(--dim)'>PRIMARY MARK</div></div>
<!-- stacked wordmark -->
<div class='abs' style='top:210px;left:440px'>
  <div class='mono' style='font-size:13px;letter-spacing:6px;color:var(--forge);margin-bottom:14px'>&#9670;&nbsp;THE WORDMARK</div>
  <div style="font-family:'Shoulders';font-size:150px;line-height:0.84;color:var(--off)">CATALYST</div>
  <div style="font-family:'Shoulders';font-size:150px;line-height:0.84;color:var(--forge)">CONCEPTS</div>
  <div style="font-family:'Serif';font-style:italic;font-size:22px;color:#b8b4ac;margin-top:22px">We don&rsquo;t trade hours for Naira. We trade disruption &mdash; and results.</div>
</div>
<!-- palette + type footer -->
<div class='abs' style='top:660px;left:70px;right:70px;height:1px;background:var(--line)'></div>
<div class='abs' style='top:700px;left:70px'>
  <div class='mono' style='font-size:11px;letter-spacing:3px;color:var(--dim);margin-bottom:14px'>PALETTE</div>
  <div style='display:flex;gap:14px'>{sw}</div>
  <div class='mono' style='font-size:11px;letter-spacing:1px;color:#55554f;margin-top:14px'>VOID #0A0A0A&nbsp;&nbsp;FORGE #FF6A00&nbsp;&nbsp;OFF-WHITE #F0EDE6&nbsp;&nbsp;DIM #6A6A66</div>
</div>
<div class='abs' style='top:700px;left:760px'>
  <div class='mono' style='font-size:11px;letter-spacing:3px;color:var(--dim);margin-bottom:14px'>TYPE</div>
  <div style="font-family:'Shoulders';font-size:42px;color:var(--off);line-height:1.1">BIG SHOULDERS &mdash; DISPLAY</div>
  <div class='mb' style='font-size:18px;color:#b8b4ac;margin-top:10px'>JETBRAINS MONO &mdash; LABELS</div>
  <div style="font-family:'Serif';font-style:italic;font-size:22px;color:#b8b4ac;margin-top:8px">Crimson Pro Italic &mdash; the one accent</div>
</div>
<div class='abs' style='top:918px;left:70px'><span class='mono' style='font-size:11px;letter-spacing:4px;color:#39393a'>&#9670; METAL DRAGON &frasl;&frasl; FREEDOM YEAR &middot; LAGOS, NIGERIA</span></div>
"""
render("catalyst-logo-lockup", 1600, 1000, logo)

# ══ IG CAROUSEL template — 3 slides 1080x1350 ════════════════
def slide_frame(tag):
    return (f"<div class='abs' style='top:0;left:0;width:100%;height:6px;background:var(--forge)'></div>"
            f"<div class='abs' style='top:58px;left:64px'><span class='mono' style='font-size:12px;letter-spacing:5px;color:var(--dim)'>&#9670;&nbsp;CATALYST CONCEPTS</span></div>"
            f"<div class='abs' style='top:58px;right:64px'><span class='mono' style='font-size:12px;letter-spacing:3px;color:var(--dim)'>{tag}</span></div>")

c1 = slide_frame("01 / 03") + """
<div class='abs' style='top:360px;left:64px'>
  <div class='mono' style='font-size:14px;letter-spacing:6px;color:var(--forge);margin-bottom:24px'>THE THREAD</div>
  <div style="font-family:'Shoulders';font-size:150px;line-height:0.86;color:var(--off)">YOUR<br>HOOK<br><span style='color:var(--forge)'>GOES HERE.</span></div>
</div>
<div class='abs' style='top:1210px;left:64px;right:64px;display:flex;justify-content:space-between;align-items:center'>
  <span class='mono' style='font-size:13px;letter-spacing:4px;color:var(--dim)'>SWIPE &rarr;</span>
  <span class='mono' style='font-size:12px;letter-spacing:3px;color:#39393a'>@CATALYSTGGG</span>
</div>
"""
render("catalyst-ig-carousel-1-cover", 1080, 1350, c1)

c2 = slide_frame("02 / 03") + """
<div class='abs' style="top:300px;left:56px;font-family:'Shoulders';font-size:300px;color:var(--forge);line-height:0.8">01</div>
<div class='abs' style='top:640px;left:64px'>
  <div class='mono' style='font-size:14px;letter-spacing:5px;color:var(--forge);margin-bottom:16px'>THE POINT</div>
  <div style="font-family:'Shoulders';font-size:76px;line-height:0.92;color:var(--off);max-width:900px">A SHORT, SHARP<br>SUBHEAD LINE.</div>
</div>
<div class='abs' style='top:850px;left:64px;max-width:900px'>
  <div style="font-family:'Serif';font-style:italic;font-size:30px;line-height:1.55;color:#cbc7bf">Body copy goes here. Two or three tight sentences. No fluff, no filler &mdash; one idea per slide, delivered with weight and moved on from.</div>
</div>
<div class='abs' style='top:1210px;left:64px;right:64px;display:flex;justify-content:space-between'>
  <span class='mono' style='font-size:13px;letter-spacing:4px;color:var(--dim)'>KEEP SWIPING &rarr;</span>
  <span class='mono' style='font-size:12px;letter-spacing:3px;color:#39393a'>@CATALYSTGGG</span>
</div>
"""
render("catalyst-ig-carousel-2-body", 1080, 1350, c2)

c3 = slide_frame("03 / 03") + """
<div class='abs' style='top:380px;left:64px'>
  <div class='mono' style='font-size:14px;letter-spacing:6px;color:var(--forge);margin-bottom:24px'>YOUR MOVE</div>
  <div style="font-family:'Shoulders';font-size:140px;line-height:0.86;color:var(--off)">IF THIS<br>HIT YOU,<br><span style='color:var(--forge)'>FOLLOW.</span></div>
</div>
<div class='abs' style='top:1000px;left:64px;right:64px;height:1px;background:var(--line)'></div>
<div class='abs' style='top:1040px;left:64px;display:flex;gap:40px'>
  <span class='mb' style='font-size:20px;letter-spacing:2px;color:var(--off)'>IG&nbsp;&nbsp;<span style='color:var(--forge)'>@CATALYSTGGG</span></span>
  <span class='mb' style='font-size:20px;letter-spacing:2px;color:var(--off)'>X&nbsp;&nbsp;<span style='color:var(--forge)'>@CATALYST188</span></span>
</div>
<div class='abs' style='top:1210px;left:64px;right:64px;display:flex;justify-content:space-between'>
  <span class='mono' style='font-size:13px;letter-spacing:3px;color:var(--dim)'>SAVE &middot; SHARE &middot; FOLLOW</span>
  <span class='mono' style='font-size:11px;letter-spacing:4px;color:#39393a'>&#9670; LAGOS NOIR</span>
</div>
"""
render("catalyst-ig-carousel-3-cta", 1080, 1350, c3)
print("ALL DONE")
