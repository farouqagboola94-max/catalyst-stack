#!/usr/bin/env python3
import base64, subprocess
from pathlib import Path

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
         "baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3Crect width='100%25' height='100%25' "
         "filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\");")
BASE = f"""<style>{FONTCSS}
*{{margin:0;padding:0;box-sizing:border-box}}
:root{{--void:#0A0A0A;--forge:#FF6A00;--off:#F0EDE6;--dim:#6a6a66;--line:#242424}}
html,body{{margin:0;background:#0A0A0A}}
.grain{{position:absolute;inset:0;{GRAIN}background-size:cover;pointer-events:none;z-index:9}}
.mono{{font-family:'Mono',monospace}} .mb{{font-family:'MonoB',monospace}}
.abs{{position:absolute}}
</style>"""

def render(name, w, h, body_html, body_style=""):
    html = (f"<!doctype html><html><head><meta charset='utf-8'>{BASE}</head>"
            f"<body style='width:{w}px;height:{h}px;overflow:hidden;position:relative;background:#0A0A0A;{body_style}'>"
            f"{body_html}<div class='grain'></div></body></html>")
    p = Path(f"/tmp/{name}.html"); p.write_text(html, encoding="utf-8")
    out = OUT/f"{name}.png"
    subprocess.run([CHROME,"--headless","--no-sandbox","--disable-gpu","--hide-scrollbars",
        f"--screenshot={out}",f"--window-size={w},{h}",f"file://{p}"],
        stderr=subprocess.DEVNULL, check=True)
    print(f"  {name}.png  ({w}x{h})")

# ══ 1) BRAND COVER 1600x900 (top-anchored) ═══════════════════
streams = ["01 EVENT MANAGEMENT","02 SOCIAL MEDIA","03 MARKETING &amp; PR","04 AI AUTOMATION","05 CONTENT &amp; IP"]
idx = "".join(
    f"<div style='display:flex;justify-content:space-between;padding:9px 0;border-top:1px solid var(--line)'>"
    f"<span class='mono' style='font-size:12px;letter-spacing:2px;color:var(--dim)'>{s}</span>"
    f"<span class='mono' style='font-size:12px;color:#3a3a38'>&#9679;</span></div>" for s in streams)
cover = f"""
<div class='abs' style='top:0;left:0;width:100%;height:4px;background:linear-gradient(90deg,var(--forge) 0%,var(--forge) 22%,transparent 60%)'></div>
<div class='abs' style='top:46px;left:70px;width:1460px;display:flex;justify-content:space-between'>
  <div class='mono' style='font-size:12px;letter-spacing:5px;color:var(--dim)'>CATALYST&nbsp;CONCEPTS&nbsp;&mdash;&nbsp;LAGOS,&nbsp;NIGERIA</div>
  <div class='mono' style='font-size:12px;letter-spacing:3px;color:var(--dim)'>BN&nbsp;9405192&nbsp;&middot;&nbsp;EST.&nbsp;2023</div>
</div>
<div class='abs' style='top:214px;left:66px'>
  <div class='mono' style='font-size:13px;letter-spacing:6px;color:var(--forge);margin-bottom:16px'>&#9670;&nbsp;&nbsp;OPERATING SYSTEM FOR A CREATIVE HOUSE</div>
  <div style="font-family:'Shoulders';font-size:188px;line-height:0.84;letter-spacing:1px;color:var(--off)">CATALYST</div>
  <div style="font-family:'Shoulders';font-size:188px;line-height:0.84;letter-spacing:1px;color:var(--forge)">CONCEPTS</div>
</div>
<div class='abs' style='top:214px;left:1196px;width:334px'>
  <div class='mb' style='font-size:11px;letter-spacing:3px;color:var(--forge);margin-bottom:8px'>FIVE LINES OF OPERATION</div>
  {idx}<div style='border-top:1px solid var(--line)'></div>
</div>
<div class='abs' style='top:770px;left:70px;max-width:900px;border-left:2px solid var(--forge);padding-left:22px'>
  <div style="font-family:'Serif';font-style:italic;font-size:25px;line-height:1.35;color:#cbc7bf">We don&rsquo;t trade hours for Naira. We trade&nbsp;disruption&nbsp;&mdash;&nbsp;and&nbsp;results.</div>
</div>
<div class='abs' style='top:792px;left:1196px;width:334px;text-align:right'>
  <div class='mono' style='font-size:11px;letter-spacing:4px;color:#39393a'>METAL DRAGON &frasl;&frasl; FREEDOM YEAR</div>
  <div class='mono' style='font-size:11px;letter-spacing:4px;color:#39393a;margin-top:5px'>&#9670;&nbsp;LAGOS NOIR</div>
</div>
"""
render("catalyst-brand-cover", 1600, 900, cover)

# ══ 2) SOCIAL HEADER 1500x500 (content in safe top zone) ═════
social = f"""
<div class='abs' style='top:0;left:0;height:100%;width:5px;background:linear-gradient(180deg,var(--forge),transparent 70%)'></div>
<div class='abs' style='top:38px;left:64px;width:1372px;display:flex;justify-content:space-between'>
  <div class='mono' style='font-size:11px;letter-spacing:5px;color:var(--dim)'>&#9670;&nbsp;CATALYST&nbsp;CONCEPTS</div>
  <div class='mono' style='font-size:11px;letter-spacing:4px;color:var(--dim)'>LAGOS, NIGERIA</div>
</div>
<div class='abs' style='top:132px;left:60px'>
  <div style="font-family:'Shoulders';font-size:112px;line-height:0.82;letter-spacing:1px;color:var(--off)">CATALYST <span style='color:var(--forge)'>CONCEPTS</span></div>
  <div style="font-family:'Serif';font-style:italic;font-size:22px;color:#b8b4ac;margin-top:18px">Five revenue streams. One operating system.</div>
</div>
<div class='abs' style='top:352px;left:60px;width:1380px;display:flex;justify-content:space-between;align-items:center'>
  <span class='mono' style='font-size:11px;letter-spacing:4px;color:#3a3a38'>METAL DRAGON &frasl;&frasl; FREEDOM YEAR</span>
  <span style='display:flex;gap:26px'>
    <span class='mb' style='font-size:13px;letter-spacing:2px;color:var(--off)'>X&nbsp;&nbsp;<span style="color:var(--forge)">@CATALYST188</span></span>
    <span class='mb' style='font-size:13px;letter-spacing:2px;color:var(--off)'>IG&nbsp;&nbsp;<span style="color:var(--forge)">@CATALYSTGGG</span></span>
  </span>
</div>
"""
render("catalyst-social-header", 1500, 500, social)

# ══ 3) BUSINESS CARD 1050x600 @300dpi (content in safe top zone) ══
card = f"""
<div class='abs' style='top:0;left:0;width:100%;height:5px;background:var(--forge)'></div>
<div class='abs' style="top:104px;right:46px;font-family:'Shoulders';font-size:140px;color:#151515;line-height:1;z-index:0">CC</div>
<div class='abs' style='top:50px;left:60px;display:flex;align-items:center;gap:11px'>
  <div style='width:9px;height:9px;background:var(--forge);border-radius:50%'></div>
  <div class='mono' style='font-size:11px;letter-spacing:5px;color:var(--dim)'>CATALYST CONCEPTS</div>
</div>
<div class='abs' style='top:132px;left:60px'>
  <div class='mono' style='font-size:11px;letter-spacing:5px;color:var(--forge);margin-bottom:10px'>CHIEF EXECUTIVE OFFICER</div>
  <div style="font-family:'Shoulders';font-size:92px;line-height:0.86;color:var(--off)">THE <span style='color:var(--forge)'>CATALYST</span></div>
  <div class='mono' style='font-size:12px;letter-spacing:3px;color:#9a968e;margin-top:12px'>CEO &middot; CATALYST CONCEPTS &middot; LAGOS</div>
</div>
<div class='abs' style='top:392px;left:60px;width:930px;display:flex;justify-content:space-between;align-items:flex-start'>
  <div style='display:grid;grid-template-columns:auto auto;gap:11px 44px'>
    <span class='mono' style='font-size:13px;color:var(--off)'><span style='color:var(--dim)'>T&nbsp;&nbsp;</span>07084 111 516</span>
    <span class='mono' style='font-size:13px;color:var(--off)'><span style='color:var(--dim)'>X&nbsp;&nbsp;</span><span style='color:var(--forge)'>@Catalyst188</span></span>
    <span class='mono' style='font-size:13px;color:var(--off)'><span style='color:var(--dim)'>E&nbsp;&nbsp;</span>Farouqagboola94@gmail.com</span>
    <span class='mono' style='font-size:13px;color:var(--off)'><span style='color:var(--dim)'>IG&nbsp;</span><span style='color:var(--forge)'>@Catalystggg</span></span>
  </div>
  <div style='text-align:right;padding-top:2px'>
    <div class='mono' style='font-size:10px;letter-spacing:3px;color:#3a3a38'>BN 9405192</div>
    <div class='mono' style='font-size:10px;letter-spacing:3px;color:#3a3a38;margin-top:4px'>&#9670; LAGOS NOIR</div>
  </div>
</div>
"""
render("catalyst-business-card", 1050, 600, card)
print("ALL DONE")
