#!/usr/bin/env python3
import base64, subprocess, math
from pathlib import Path
from pngcrop import crop_top

FONTS = Path("/root/.claude/skills/canvas-design/canvas-fonts")
OUT = Path("/home/user/catalyst-stack/brand"); OUT.mkdir(parents=True, exist_ok=True)
CHROME = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome"
VENUE = "MURI OKUN PLACE PARK"; DATE = "DEC 12"

def face(name, file, weight="normal", style="normal"):
    b = base64.b64encode((FONTS/file).read_bytes()).decode()
    return (f"@font-face{{font-family:'{name}';font-weight:{weight};font-style:{style};"
            f"src:url(data:font/ttf;base64,{b}) format('truetype');}}")
FONTCSS = "".join([
    face("Shoulders","BigShoulders-Bold.ttf","700"), face("Mono","JetBrainsMono-Regular.ttf","400"),
    face("MonoB","JetBrainsMono-Bold.ttf","700"), face("Serif","CrimsonPro-Italic.ttf","400","italic")])
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
def render(name,w,h,body,style=""):
    rh=max(h+320,math.ceil(h/0.80))
    html=(f"<!doctype html><html><head><meta charset='utf-8'>{BASE}</head>"
          f"<body style='width:{w}px;height:{rh}px;overflow:hidden;position:relative;background:#0A0A0A;{style}'>"
          f"{body}<div class='grain' style='height:{h}px'></div></body></html>")
    p=Path(f"/tmp/{name}.html"); p.write_text(html,encoding="utf-8")
    tmp=f"/tmp/{name}_full.png"
    subprocess.run([CHROME,"--headless","--no-sandbox","--disable-gpu","--hide-scrollbars",
        f"--screenshot={tmp}",f"--window-size={w},{rh}",f"file://{p}"],stderr=subprocess.DEVNULL,check=True)
    crop_top(tmp,OUT/f"{name}.png",h); print(f"  {name}.png ({w}x{h})")

# ══ COUNTDOWN TILES 1080x1080 ════════════════════════════════
def countdown(name, big, label, big_size=430):
    body=f"""
<div class='abs' style='top:0;left:0;width:100%;height:6px;background:var(--forge)'></div>
<div class='abs' style='top:60px;left:64px;right:64px;display:flex;justify-content:space-between'>
  <span class='mono' style='font-size:12px;letter-spacing:5px;color:var(--dim)'>&#9670;&nbsp;SNEAKERS FEST 2026</span>
  <span class='mono' style='font-size:12px;letter-spacing:3px;color:var(--dim)'>@CATALYSTGGG</span>
</div>
<div class='abs' style='top:250px;left:0;width:1080px;text-align:center'>
  <div style="font-family:'Shoulders';font-size:{big_size}px;line-height:0.86;color:var(--forge)">{big}</div>
  <div class='mb' style='font-size:34px;letter-spacing:8px;color:var(--off);margin-top:10px'>{label}</div>
</div>
<div class='abs' style='top:940px;left:64px;right:64px;text-align:center'>
  <div class='mono' style='font-size:15px;letter-spacing:4px;color:#8a867e'>{DATE} &middot; {VENUE} &middot; VI, LAGOS</div>
</div>
"""
    render(name,1080,1080,body)

countdown("catalyst-sf-countdown-30","30","DAYS TO GO")
countdown("catalyst-sf-countdown-14","14","DAYS TO GO")
countdown("catalyst-sf-countdown-07","07","DAYS TO GO")
countdown("catalyst-sf-countdown-01","01","DAY TO GO")
countdown("catalyst-sf-countdown-tonight","TONIGHT","DOORS OPEN 6PM",big_size=250)

# ══ VENDOR-APPLICATION FLYER 1080x1350 ═══════════════════════
def bullet(t):
    return (f"<div style='display:flex;gap:12px;align-items:flex-start;padding:7px 0'>"
            f"<span style='color:var(--forge);font-size:14px;margin-top:2px'>&rarr;</span>"
            f"<span class='mono' style='font-size:15px;color:#b8b4ac;line-height:1.5'>{t}</span></div>")
tiers = "".join(
    f"<div style='display:flex;justify-content:space-between;padding:10px 0;border-top:1px solid var(--line)'>"
    f"<span class='mb' style='font-size:16px;color:var(--off);letter-spacing:1px'>{n}</span>"
    f"<span class='mono' style='font-size:13px;color:var(--forge)'>{d}</span></div>"
    for n,d in [("PREMIUM BOOTH","PRIME FLOOR"),("STANDARD BOOTH","MAIN FLOOR"),("STARTER TABLE","STARTER ZONE")])
vendor=f"""
<div class='abs' style='top:0;left:0;width:100%;height:6px;background:var(--forge)'></div>
<div class='abs' style='top:60px;left:70px;right:70px;display:flex;justify-content:space-between'>
  <span class='mono' style='font-size:13px;letter-spacing:5px;color:var(--dim)'>SNEAKERS FEST 2026 &middot; CATALYST CONCEPTS</span>
  <span class='mono' style='font-size:13px;letter-spacing:3px;color:var(--forge)'>APPLICATIONS OPEN</span>
</div>
<div class='abs' style='top:180px;left:64px'>
  <div class='mono' style='font-size:14px;letter-spacing:8px;color:var(--forge);margin-bottom:18px'>&#9670;&nbsp;&nbsp;SELL AT THE FEST</div>
  <div style="font-family:'Shoulders';font-size:190px;line-height:0.82;color:var(--off)">VENDORS</div>
  <div style="font-family:'Shoulders';font-size:190px;line-height:0.84;color:var(--forge)">WANTED</div>
</div>
<div class='abs' style='top:690px;left:70px;width:440px'>
  <div class='mb' style='font-size:12px;letter-spacing:3px;color:var(--forge);margin-bottom:8px'>BOOTH TIERS</div>
  {tiers}<div style='border-top:1px solid var(--line)'></div>
</div>
<div class='abs' style='top:690px;left:580px;width:440px'>
  <div class='mb' style='font-size:12px;letter-spacing:3px;color:var(--forge);margin-bottom:8px'>WHAT YOU GET</div>
  {bullet("A crowd that lives for sneaker culture")}
  {bullet("Prime floor exposure &amp; foot traffic")}
  {bullet("Brand activation &amp; live-selling space")}
  {bullet("Feature across our socials &amp; hype reels")}
</div>
<div class='abs' style='top:1010px;left:70px;right:70px;height:1px;background:var(--line)'></div>
<div class='abs' style='top:1046px;left:70px'>
  <div class='mono' style='font-size:12px;letter-spacing:3px;color:var(--dim);margin-bottom:8px'>HOW TO APPLY</div>
  <div class='mb' style='font-size:19px;color:var(--off);line-height:1.5'>DM <span style='color:var(--forge)'>@Catalystggg</span> &nbsp;&middot;&nbsp; Farouqagboola94@gmail.com</div>
</div>
<div class='abs' style='top:1150px;left:70px;right:70px;display:flex;justify-content:space-between;align-items:center'>
  <span class='mono' style='font-size:12px;letter-spacing:3px;color:#8a867e'>{DATE} &middot; {VENUE} &middot; VI, LAGOS</span>
  <span class='mono' style='font-size:12px;letter-spacing:3px;color:var(--forge)'>LIMITED SLOTS</span>
</div>
<div class='abs' style='top:1250px;left:70px;right:70px;display:flex;justify-content:space-between'>
  <span class='mono' style='font-size:11px;letter-spacing:4px;color:#39393a'>METAL DRAGON &frasl;&frasl; FREEDOM YEAR</span>
  <span class='mono' style='font-size:11px;letter-spacing:4px;color:#39393a'>&#9670; LAGOS NOIR</span>
</div>
"""
render("catalyst-sf-vendor-flyer",1080,1350,vendor)
print("ALL DONE")
