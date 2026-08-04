import { useState } from "react";

/* ═══════════════════════════════════════════════════════════════
   CATALYST: THE AWAKENING — EXTENDED IMAGE PIPELINE v2
   Character Sheets | Environments | Remaining Scenes | Issues 4–6
   Total: 54 Additional Production Images
═══════════════════════════════════════════════════════════════ */

const BASE_STYLE = `graphic novel illustration, Afrofuturist cyberpunk noir, Lagos Nigeria 2031, crushed blacks dominant, forge amber accent lighting, 35mm film grain, cinematic chiaroscuro, Yoruba cultural elements fused with surveillance technology, Moebius Jean Giraud + Sean Murphy + Katsuhiro Otomo art style --v 6 --style raw --q 2`;

const CATALYST_DESC = `Black Nigerian man early 30s, lean controlled build, sharp left-handed, dark operational clothing (matte black jacket, dark trousers), eyes that log everything, no visible weapons, presence of a man who has already decided the outcome`;

const SECTIONS = [
  /* ══════════════════════════════════════════════
     SECTION 1: CHARACTER DESIGN SHEETS
  ══════════════════════════════════════════════ */
  {
    id: "CHAR_SHEETS",
    label: "CHARACTER SHEETS",
    color: "#FF6B00",
    description: "Full reference sheets for image generation consistency. Generate these FIRST. Use as --cref in all subsequent prompts.",
    scenes: [
      {
        id: "CS-CATALYST",
        type: "REF SHEET",
        label: "CHAR REF #1",
        title: "The Catalyst — Full Reference Sheet",
        aspect: "16:9",
        priority: "CRITICAL — Generate first. All other Catalyst images reference this.",
        synopsis: "Full character design reference sheet. Four views: front, 3/4 front, profile, 3/4 back. Three Ase states shown: SUPPRESSED (normal), LEAKING (dark corona beginning), SOVEREIGN (full realization — monochrome radius). Below the views: hand detail (left-handed), face close-up, and Ase field visualization diagram.",
        composition: "REFERENCE SHEET LAYOUT — white/near-white background for maximum design readability. Four turnaround views center-top. Detail studies bottom row. Labels in monospace. Clean, technical, the visual bible for all subsequent images.",
        lighting: "Flat studio lighting for reference clarity. The Ase states use the Lagos Noir palette as spot color against the neutral background.",
        mood: "This is a design document, not a narrative image. Precision over atmosphere.",
        mj: `character design reference sheet turnaround, Black Nigerian man early 30s lean build dark operational matte black jacket dark trousers, four views front three-quarter-front profile three-quarter-back on white background, below: left-hand detail close-up face detail three Ase states (normal / dark corona beginning / full monochrome radius), clean flat studio lighting technical illustration, graphic novel character sheet, ${BASE_STYLE} --ar 16:9`,
        dalle: `Professional comic character design reference sheet on white background. A Black Nigerian man, early 30s, lean controlled build, wearing matte black jacket and dark trousers. Four turnaround views: front, 3/4 front, profile, 3/4 back. Bottom row detail studies: left hand close-up, face close-up, three Ase energy states (suppressed/normal, dark corona leaking, full sovereign monochrome field). Clean technical studio lighting. Moebius + Sean Murphy comic art style. This is the character bible reference image.`,
        ff: `character design turnaround sheet, Black man dark operational clothing, four views white background, energy states diagram, comic reference sheet`,
        sd: `(masterpiece:1.4), character design sheet white background, Black Nigerian man dark clothing four views, detail studies face hand energy states, clean technical, (comic art:1.3), Moebius style`
      },
      {
        id: "CS-BABA",
        type: "REF SHEET",
        label: "CHAR REF #2",
        title: "Baba Olajide — Full Reference Sheet",
        aspect: "16:9",
        priority: "HIGH — Required before Issue 3 generation",
        synopsis: "Full reference for Baba Olajide. Front, 3/4, profile. Detail studies: Memory Keeper cloth pattern markings (geometric: concentric circles, cross-and-chevron in black on undyed cloth), carved walking staff details, face close-up showing age topography. His Ase type shown: ancestral resonance — warm gold-amber aura, completely different from the Catalyst's dark field.",
        composition: "REFERENCE SHEET — three views plus detail studies. The Memory Keeper pattern designs isolated and enlarged for clarity. His scale relative to the Catalyst shown in a small comparative silhouette.",
        lighting: "Flat for reference, with amber side-light shown as variant to indicate his default lit state in narrative scenes.",
        mood: "Ancient authority. Everything about this design says: he was here before the problem, and he'll be here after.",
        mj: `character design reference sheet turnaround, 91-year-old Yoruba elder deeply lined face traditional Badagry coastal attire with geometric Memory Keeper patterns concentric circles chevrons black on undyed cloth, carved wooden staff, three views front three-quarter profile white background, detail studies face close-up cloth pattern enlarged ancestral Ase state warm amber glow comparative silhouette with Black Nigerian man, graphic novel character sheet, ${BASE_STYLE} --ar 16:9`,
        dalle: `Comic character design reference sheet on white background. 91-year-old Yoruba elder: deeply lined face, traditional Badagry coastal attire with Memory Keeper geometric markings (concentric circles, cross-and-chevron patterns in black on undyed cloth), carved wooden staff. Three turnaround views. Detail studies: face close-up, cloth pattern isolated enlarged, ancestral Ase state (warm amber aura), comparative silhouette with younger man. Memory Keeper authority in every design line. Moebius art style.`,
        ff: `elderly Yoruba elder character sheet, traditional patterned attire, memory keeper, three views, detail studies`,
        sd: `(masterpiece:1.4), character sheet white background, elderly Yoruba man traditional Memory Keeper attire geometric patterns, three views, face detail cloth detail, Moebius style`
      },
      {
        id: "CS-KEMI",
        type: "REF SHEET",
        label: "CHAR REF #3",
        title: "Kemi Adeyemi — Full Reference Sheet",
        aspect: "16:9",
        priority: "HIGH — Present from Issue 1, fully central from Issue 4",
        synopsis: "Kemi's reference sheet. 23, Void Belt-born, mechanic. Natural hair, practical clothing built for work. Forge-level Ase shown: orange heat distortion at her palms and forearms — not destructive, warm. Detail studies: her hands (tool-calloused, always doing something), face showing the directness that makes her the moral core, Ase activation states (resting/working/alert).",
        composition: "Three views plus detail row. Her hands are a key design element — they tell her whole story. The Ase is shown as subtle distortion at the skin rather than external field.",
        lighting: "Forge amber dominant for her reference — she generates warmth.",
        mood: "Capability and loyalty. The most honest person in the series. Her design should make you trust her immediately.",
        mj: `character design reference sheet, 23-year-old Yoruba Nigerian woman natural hair, practical work-built clothing (canvas jacket cargo pants work boots), mechanic's calloused hands, Void Belt Lagos 2031, three turnaround views white background, detail studies hands close-up face close-up three Forge Ase states (resting orange heat shimmer / working orange distortion palms / alert), graphic novel character sheet, ${BASE_STYLE} --ar 16:9`,
        dalle: `Comic character design reference sheet on white background. 23-year-old Yoruba Nigerian woman: natural hair, practical canvas work jacket, cargo trousers, work boots. Mechanic's hands — calloused, capable. Three turnaround views. Detail studies: hands close-up (the story of her life), face close-up showing direct earnest expression, three Forge Ase states (resting — subtle orange heat shimmer at palms, working — orange distortion both hands, alert — full arm glow). Moebius + Sean Murphy style.`,
        ff: `young Yoruba woman mechanic character sheet, natural hair work clothes, energy hands, three views, white background`,
        sd: `(masterpiece:1.4), character sheet, young Yoruba Nigerian woman natural hair work clothing, Forge Ase hand glow orange, three views detail studies, Moebius style`
      },
      {
        id: "CS-CHEN",
        type: "REF SHEET",
        label: "CHAR REF #4",
        title: "Director Chen Weiming — Full Reference Sheet",
        aspect: "16:9",
        priority: "MEDIUM — Recurring antagonist across all issues",
        synopsis: "Chen's reference sheet. 52, East Asian-French, AXIS Continental. Impeccable continental grey suit — the suit is a uniform of optimization ideology. Three views. Detail studies: AXIS insignia on lapel pin, face close-up (his danger is in the reasonableness), hands (never dirty), comparative silhouette showing how much shorter he is than the Catalyst — but the room changes when he walks in.",
        composition: "Three views. Focus on the suit as design element — it's architecturally precise. Small AXIS Seagull logo details on accessories.",
        lighting: "AXIS cold blue for his reference — institutional, clinical.",
        mood: "The most dangerous man who has never raised his voice. His design should make you think he's reasonable. That's the point.",
        mj: `character design reference sheet, 52-year-old East Asian French man, impeccable architectural grey suit AXIS Continental director, precise grooming, three turnaround views white background, detail studies AXIS Seagull lapel pin close-up, face close-up (dangerous reasonableness), hands (spotless), comparative silhouette, graphic novel character sheet, ${BASE_STYLE} --ar 16:9`,
        dalle: `Comic character design reference sheet on white background. 52-year-old East Asian-French man: immaculate architectural grey suit, AXIS Continental director. Three turnaround views. Detail studies: AXIS Seagull lapel insignia close-up, face close-up (the danger is in the reasonableness), spotless hands, comparative silhouette with protagonist. Cold institutional blue as accent on design elements. Every design line says: he processes problems efficiently. Moebius + Sean Murphy art style.`,
        ff: `East Asian man corporate director character sheet, grey suit AXIS logo, three views, institutional design, character reference`,
        sd: `(masterpiece:1.4), character sheet East Asian man grey suit corporate director, AXIS insignia, three views detail studies, cold blue institutional, Moebius style`
      },
      {
        id: "CS-ADA",
        type: "REF SHEET",
        label: "CHAR REF #5",
        title: "Ada Okonkwo — Full Reference Sheet",
        aspect: "16:9",
        priority: "HIGH — The series' most complex visual character",
        synopsis: "Ada's reference sheet — and uniquely, two visual states. STATE A: Protocol Architect Ada — technical professional (Yaba Deep aesthetic, clean lines, engineering precision in her clothing). STATE B: Bureau Operative Ada — more contained, aware of being watched, the same woman but the posture changes. Three views in State A, key poses in State B. Face detail: the thing she's not telling you, visible if you know to look.",
        composition: "Split reference: three views in State A on left, three key poses in State B on right. Face close-up center showing what doesn't change between states: the eyes. That's the tell.",
        lighting: "State A: Yaba Deep blue-white technical. State B: mixed, adaptive — she belongs in any light.",
        mood: "The question the series never fully answers: which state is the real Ada? The design should make both versions feel equally true.",
        mj: `character design reference sheet split layout, 34-year-old Igbo Nigerian woman, LEFT SIDE three views as Protocol Architect technical professional Yaba Deep aesthetic clean precision clothing, RIGHT SIDE three key poses as Bureau operative more guarded controlled same woman different posture, face detail center showing eyes that are always calculating, graphic novel character sheet, ${BASE_STYLE} --ar 16:9`,
        dalle: `Comic character design reference sheet, split layout. 34-year-old Igbo Nigerian woman. LEFT SECTION: Three turnaround views in Protocol Architect mode — technical professional attire, Yaba Deep aesthetic, engineering precision. RIGHT SECTION: Three key poses in operative mode — same woman, same face, different body language, more controlled, aware of surveillance. Central face close-up showing her eyes: the thing both states share, the calculation that never stops. Moebius + Sean Murphy style.`,
        ff: `Nigerian woman dual-state character sheet, professional technical left, operative right, same character different posture`,
        sd: `(masterpiece:1.4), character sheet, Igbo Nigerian woman split layout, technical professional left, operative right, same woman different energy, face detail center, Moebius style`
      },
      {
        id: "CS-TAIWO",
        type: "REF SHEET",
        label: "CHAR REF #6",
        title: "Taiwo — Full Reference Sheet",
        aspect: "16:9",
        priority: "MEDIUM — Key recurring character from Issue 2",
        synopsis: "Taiwo's reference. 14, Void Belt, genius. Her signature visual: the Ase-vision overlay — everything she looks at has data-pattern visualization floating around it. Three views. Detail studies: her workspace setup (screens and components from multiple angles), her face during normal vision vs. Ase-vision mode (the eyes are different — wider, tracking patterns others can't see), the Ase-code visualization style (geometric data cascades, not random — she sees actual Ase architecture as readable code).",
        composition: "Three views, workspace detail, two vision modes shown side by side. The Ase-code visualization gets its own detail panel so future images can replicate the visual language consistently.",
        lighting: "Screen glow dominant — blue-green-amber from multiple sources. She lives in screen light.",
        mood: "14 years old, never impressed by anything. Her design should feel assembled from pure function — she built herself the same way she builds her tech.",
        mj: `character design reference sheet, 14-year-old Yoruba Nigerian girl, short natural hair, functional assembled clothing, three views white background, detail studies workspace (shipping container screens components) two vision modes normal eyes vs Ase-code-vision eyes (geometric data cascade overlay patterns floating around her vision), Ase code visualization pattern style guide, graphic novel character sheet, ${BASE_STYLE} --ar 16:9`,
        dalle: `Comic character design reference sheet. 14-year-old Yoruba Nigerian girl: natural hair, functional assembled clothing built for her workspace. Three turnaround views. Detail studies: her shipping container workspace, normal vision mode vs. Ase-code vision mode (her eyes wider, geometric data pattern cascades floating around everything she perceives). Central panel: the Ase-code visualization language guide — what the patterns look like, their geometry, their color. Moebius + Sean Murphy art style.`,
        ff: `young Yoruba girl character sheet, tech workspace, vision overlay states, data pattern visualization guide`,
        sd: `(masterpiece:1.4), character sheet young Yoruba girl, workspace detail, normal vs Ase code vision eyes, data pattern overlay visualization, screen glow, Moebius style`
      }
    ]
  },

  /* ══════════════════════════════════════════════
     SECTION 2: ENVIRONMENT KEY FRAMES
  ══════════════════════════════════════════════ */
  {
    id: "ENVIRONMENTS",
    label: "ENVIRONMENTS",
    color: "#4FC3F7",
    description: "Five district key frames. Generate these second, after character sheets. Use as --sref for all environment scenes in their respective districts.",
    scenes: [
      {
        id: "ENV-VOIDBELT",
        type: "ENVIRONMENT",
        label: "ENV #1",
        title: "The Void Belt — Establishing Key Frame",
        aspect: "16:9",
        priority: "CRITICAL — Most-used environment in the series",
        synopsis: "The Void Belt at night — the 14-kilometer corridor of autonomous Lagos. The Slag Market in the foreground: stalls of gutted tech, repaired drones, homemade Ase generators (visible as amber-glowing cylinders), fabric and food. Beyond: the dense residential patchwork — corrugated iron, compressed-earth structures, mesh antenna forests on every roof. No AXIS infrastructure visible because none survives 72 hours here. The sky: dark, generator amber below, no surveillance grid above.",
        composition: "WIDE ENVIRONMENTAL PANORAMA — 16:9 for the full expanse. Market foreground with depth extending back into residential density. The sky: clean dark (no drone lights, no grid — the absence is the point). The light comes from below, always.",
        lighting: "Pure generator amber — no cold blue anywhere. This is the only district lit entirely by its own power. Warm, low, from hundreds of small points.",
        mood: "3.2 million people. Zero registered addresses. Completely alive. The system says this place doesn't exist. The place disagrees.",
        mj: `wide environmental panorama Lagos Void Belt autonomous zone night, dense Slag Market foreground stalls gutted Chinese drones repaired electronics Ase generator cylinders glowing amber fabric stalls food vendors, beyond dense residential corrugated iron compressed earth mesh antenna forests, no AXIS surveillance infrastructure visible, sky completely dark no surveillance grid, all light comes from below generator amber warm from hundreds small points, graphic novel environment key frame, ${BASE_STYLE} --ar 16:9`,
        dalle: `Wide cinematic graphic novel environment. The Void Belt of Lagos at night: a dense autonomous zone where AXIS infrastructure doesn't survive. Foreground: the Slag Market — stalls of gutted tech, repaired drones, glowing amber Ase generator cylinders, fabric and food vendors. Background: dense residential patchwork of corrugated iron, compressed earth, mesh antenna forests on every roof. Sky: completely dark and clean — no surveillance drones, no grid. All light is amber, from below, from hundreds of generator points. 3.2 million people living at the edge of the system's reach. Moebius + Otomo masterclass.`,
        ff: `Lagos autonomous market zone night, amber generator lights, corrugated iron dense residential, no surveillance, African cyberpunk`,
        sd: `(masterpiece:1.4), Void Belt Lagos night, dense market corrugated iron mesh antennas, amber generator light only, no surveillance grid, afrofuturism, Otomo Moebius environmental`
      },
      {
        id: "ENV-VICTORPRIME",
        type: "ENVIRONMENT",
        label: "ENV #2",
        title: "Victoria Prime — Establishing Key Frame",
        aspect: "16:9",
        priority: "HIGH — The AXIS-controlled contrast environment",
        synopsis: "Victoria Prime street level at night. The Mirror Towers — adaptive glass facades reflecting each other infinitely. Autonomous shuttle lanes (no drivers, smooth, silent). AXIS Seagull drones everywhere — so common they look like a weather pattern, geometric constellations of cold blue eyes. The people: well-dressed, biometrically registered, technically safe and technically property. Every transaction on a public screen. Every face scanned. Beautiful and wrong.",
        composition: "STREET LEVEL looking up at the towers. The shuttle lane in the foreground (smooth, frictionless). The towers above: reflecting each other, reflecting the surveillance drones, reflecting a city that has agreed to be optimized. Cold and beautiful.",
        lighting: "Cold institutional blue dominant — AXIS's palette. Warm accents from display screens and high-end storefronts. The Seagull drones: constellations of cold blue light.",
        mood: "This is what order looks like when it wins. Beautiful. Sterile. Everyone is safe. Everyone is watched. The Catalyst won't stay here long.",
        mj: `street level view Victoria Prime Lagos 2031 night, Mirror Towers adaptive glass facades reflecting each other infinitely, autonomous shuttle lanes smooth silent foreground, AXIS Seagull surveillance drones everywhere as geometric cold blue constellation patterns in sky, well-dressed biometrically registered citizens, public transaction screens everywhere, cold institutional blue dominant lighting, beautiful and wrong, graphic novel environment key frame, ${BASE_STYLE} --ar 16:9`,
        dalle: `Wide graphic novel environment. Victoria Prime Lagos at street level, night 2031. Mirror Towers: adaptive glass skyscrapers reflecting each other endlessly. Autonomous shuttle lanes smooth and silent in the foreground. AXIS Seagull surveillance drones fill the sky as geometric cold blue constellations. Well-dressed citizens, public screens displaying transactions and biometric confirmations everywhere. Cold institutional blue light dominant. Beautiful. Optimized. The Catalyst's enemy made architectural. Moebius + Otomo style.`,
        ff: `Victoria Prime Lagos street, glass towers, autonomous shuttles, surveillance drones blue, optimized city, afrofuturist control`,
        sd: `(masterpiece:1.4), Victoria Prime Lagos 2031, glass mirror towers, autonomous shuttles, AXIS drones blue constellations, cold blue institutional light, beautiful controlled city, afrofuturism Moebius style`
      },
      {
        id: "ENV-YABADEEP",
        type: "ENVIRONMENT",
        label: "ENV #3",
        title: "Yaba Deep — Establishing Key Frame",
        aspect: "16:9",
        priority: "HIGH — The intellectual engine of the resistance",
        synopsis: "Yaba Deep at night — the former tech district reborn as resistance infrastructure. The streets: server racks repurposed as market stalls, fabrication labs in old university buildings, the Old UNILAG Ruins lit by engineering work-lights. Engineers everywhere — working, arguing, building. The Ase-Interface Protocol architecture visible as environmental data: subtle pattern overlays on the buildings where the Protocol is active. The Compile Stack — a 12-story tower of networked server infrastructure — lit up like a cathedral.",
        composition: "MID-DISTANCE ENVIRONMENTAL — the Compile Stack as vertical anchor. Street-level activity in foreground. The Old UNILAG Ruins giving historical depth in the background. Technical and organic coexisting.",
        lighting: "Blue-white fluorescent from engineering workspaces, amber work-lights from fabrication. The Compile Stack: blue LED light from within. Warm pockets from food stalls. Technical, but alive.",
        mood: "The revolution compiles here. Every light is something being built. Everything in this district knows what it's for.",
        mj: `Yaba Deep tech district Lagos 2031 night, street level with 12-story Compile Stack server tower lit blue foreground, engineers working arguing building, repurposed server racks as market stalls, fabrication labs in old university buildings Old UNILAG Ruins background lit by work-lights, subtle Ase Interface Protocol data pattern overlays on buildings visible, blue-white fluorescent and amber work-light warm food stall pockets, intellectual revolutionary energy, graphic novel environment key frame, ${BASE_STYLE} --ar 16:9`,
        dalle: `Wide graphic novel environment. Yaba Deep district Lagos at night 2031. A 12-story tower of networked server infrastructure (The Compile Stack) glows blue in the background. Street level: engineers at work, arguing, building — server racks repurposed as market stalls, fabrication labs in old university buildings. The Old UNILAG Ruins lit by work-lights in the distance. Subtle Ase-Interface Protocol data patterns overlay the architecture, barely visible. Blue-white fluorescent and amber work-light. The intellectual engine of the resistance. Moebius + Otomo style.`,
        ff: `Yaba Deep tech district Lagos, server tower glowing blue, engineers working streets, university ruins, technical revolutionary atmosphere`,
        sd: `(masterpiece:1.4), Yaba Deep Lagos tech district night, Compile Stack server tower blue glow, engineers street level, old university ruins, blue-white fluorescent amber work-lights, afrofuturism Moebius style`
      },
      {
        id: "ENV-MAINLAND",
        type: "ENVIRONMENT",
        label: "ENV #4",
        title: "The Mainland Grid — Establishing Key Frame",
        aspect: "16:9",
        priority: "CRITICAL — Where most of the series takes place",
        synopsis: "The Mainland Grid — Agege, Ikeja, Surulere — the connective tissue. Dense, alive, inconsistent. AXIS presence: partial, patchy (a surveillance tower here, none for six blocks, then another). Ase generators alongside conventional power. People everywhere. Motorcycle taxis and autonomous shuttles sharing roads. Markets at midnight. Church sounds from three directions. This is where 8.4 million people actually live, and where the awakening is happening quietly, in kitchens and workshops.",
        composition: "STREET-LEVEL WIDE — a Mainland Grid intersection at night. Multiple light sources competing. The organic chaos of actual Lagos. Human scale dominant.",
        lighting: "Mixed and chaotic: generator amber pockets, occasional AXIS cold blue from a sparse surveillance node, motorcycle headlights, market stall lights, church candles. The most complex lighting in the series because the Mainland is the most complex place.",
        mood: "The world the Catalyst is fighting for. Not the Void Belt's autonomy or Victoria Prime's optimization — this. The messy, living, refusing-to-be-categorized middle.",
        mj: `street level intersection Mainland Grid Lagos 2031 night, dense living city, motorcycle taxis alongside autonomous shuttles, markets operating at midnight, AXIS surveillance tower visible every six blocks (inconsistent patchy coverage), Ase generators alongside conventional power poles, church sounds implied by open windows with light, 8.4 million people living refusing categorization, mixed chaotic lighting generator amber AXIS cold blue motorcycle headlights market stalls church candles, graphic novel environment key frame, ${BASE_STYLE} --ar 16:9`,
        dalle: `Wide graphic novel environment. Mainland Grid Lagos at night 2031. A dense living city intersection: motorcycle taxis alongside autonomous shuttles, midnight markets open, an AXIS surveillance tower visible in the background but the next six blocks have none — inconsistent patchy coverage. Ase generators alongside conventional power. Light from church windows. Mixed chaotic lighting: generator amber, cold AXIS blue, motorcycle headlights, market warmth. 8.4 million people refusing to be categorized. The world worth fighting for. Moebius + Otomo style.`,
        ff: `Lagos Mainland Grid street intersection night, motorcycle taxis markets midnight, mixed surveillance presence, chaotic warm lighting, living city`,
        sd: `(masterpiece:1.4), Mainland Grid Lagos 2031 night, street intersection motorcycles markets churches, patchy AXIS surveillance, mixed lighting warm chaotic, living city, afrofuturism Moebius Otomo style`
      },
      {
        id: "ENV-LISTENING-SHORE",
        type: "ENVIRONMENT",
        label: "ENV #5",
        title: "The Listening Shore — Establishing Key Frame",
        aspect: "16:9",
        priority: "HIGH — Issue 3 primary environment, returns in Issue 11",
        synopsis: "The Listening Shore — Badagry coast — in the still hour before dawn. The hour when the ancestors are closest. Memory Keeper totems (carved ironwood, geometric Yoruba patterns, centuries old and freshly maintained) stand at the tide line. The mesh signal-blocking antennas of modern Memory Keeper infrastructure alongside them. The Atlantic: vast, silver-black under pre-dawn sky. The black sand beach. One small fire in the distance. The shore is the most spiritually loaded location in the series — the coast where enslaved people were taken out and where the awakened return.",
        composition: "HORIZONTAL WIDE — the shore's full expanse. Totems and modern antennas in middle-ground. The Atlantic filling 40% of the frame. Pre-dawn sky: deep blue-black at top, dark silver at horizon. The small fire: the only warm light source.",
        lighting: "Pre-dawn: deep blue-black sky, cold silver moonset at horizon, no direct light source except the small Memory Keeper fire. Everything is cool, silver, ancestral. The warm firelight is the only exception.",
        mood: "The shore has more memory than any living person. It will outlast AXIS. It will outlast the Catalyst. It is the only constant in the series.",
        mj: `Badagry coast Nigeria pre-dawn still hour before sunrise, Listening Shore Memory Keeper sacred site, ancient carved Yoruba ironwood totems (geometric circles chevrons crosses centuries-old freshly maintained) at tide line alongside modern signal-blocking mesh antennas, vast Atlantic silver-black under pre-dawn sky, black sand beach, small Memory Keeper fire warm glow only warm light, deep blue-black sky dark silver horizon, no direct light, coast where ancestors were taken and where awakened return, graphic novel environment key frame, ${BASE_STYLE} --ar 16:9`,
        dalle: `Wide graphic novel environment. The Listening Shore, Badagry coast, in the still hour before dawn 2031. Ancient carved Yoruba ironwood totems — geometric circles, chevrons, crosses, centuries old and freshly maintained — stand at the tide line alongside modern signal-blocking mesh antennas. The Atlantic: vast, silver-black under pre-dawn sky. Black sand beach. One small Memory Keeper fire in the distance, the only warm light. Deep blue-black sky, dark silver at the horizon. The coast of departure and return. Moebius atmospheric masterclass.`,
        ff: `Badagry coast pre-dawn, Memory Keeper totems and modern antennas, silver Atlantic, black sand, ancestral shore, small fire`,
        sd: `(masterpiece:1.4), Badagry coast pre-dawn, Yoruba totems mesh antennas tide line, silver-black Atlantic, black sand, small fire warm, deep blue-black sky, ancestral atmosphere, Moebius atmospheric style`
      }
    ]
  },

  /* ══════════════════════════════════════════════
     SECTION 3: REMAINING ISSUE 1-3 SCENES
  ══════════════════════════════════════════════ */
  {
    id: "ISSUES_1_3_EXTENDED",
    label: "ISSUES 1–3 EXTENDED",
    color: "#FFC107",
    description: "The scenes not covered in Pipeline v1. Fills the gaps in Issues 1, 2, and 3.",
    scenes: [
      {
        id: "1X-BASE",
        type: "ESTABLISHING",
        label: "ISS 1 — PG 7",
        title: "The Ghost Command",
        aspect: "2:3",
        priority: "MEDIUM",
        synopsis: "The Catalyst's hidden operational base — a Mainland Grid upper floor with no registered address. Not chaos: controlled density. Three walls of information (district maps, faction network diagrams, Ase signature frequency charts), all hand-drawn or printed on degradable paper, nothing digital. A single desk. The window: looking out at the Grid. Him at the desk — this is the closest thing he has to a home, and it shows and doesn't show it simultaneously.",
        composition: "INTERIOR WIDE — the room as character. Information walls visible. Him at the desk, slightly left of center. The window: right third, Lagos night visible. The walls: dense but organized. Everything deliberate.",
        lighting: "A single desk lamp (warm amber). No screens. No digital light sources — nothing that generates a signal. The window catches the city's ambient glow.",
        mood: "This is where the plan lives. He built this room the way the Professor builds a heist war room. It's also the closest thing to a home he has.",
        mj: `interior of hidden operational base apartment Mainland Grid Lagos 2031, three walls covered in hand-drawn district maps faction network diagrams Ase frequency charts (no digital), single desk with amber lamp, Black Nigerian man seated at desk left of center, window right third with Lagos night city glow, no screens no digital equipment nothing that generates signal, dense organized information environment, graphic novel interior establishing shot, ${BASE_STYLE} --ar 2:3`,
        dalle: `Graphic novel interior panel. A hidden operational command space on the Mainland Grid Lagos 2031 — an upper floor with no registered address. Three walls covered in hand-drawn maps, network diagrams, frequency charts — everything on degradable paper, nothing digital. A single desk with amber lamp. A Black Nigerian man seated slightly left of center. The window right-third: Lagos night visible outside. Dense but organized. No screens. No signals. The Professor's war room made physical. Moebius + Sean Murphy interior.`,
        ff: `operational command room, hand-drawn maps walls, single desk lamp, Black man working, no screens, noir interior`,
        sd: `(masterpiece:1.4), interior operational base, walls covered hand-drawn maps diagrams, single amber lamp, Black man desk, window Lagos night, no screens, noir, Moebius interior style`
      },
      {
        id: "1X-AFTERMATH",
        type: "ACTION",
        label: "ISS 1 — PG 11",
        title: "What He Left Behind",
        aspect: "2:3",
        priority: "MEDIUM",
        synopsis: "Aftermath panel. The Mushin alley after the Ase surge. Three AXIS contractors on the ground — not dead, incapacitated. The alley: a 3-meter radius around the center has been de-colored (monochrome echo of what's coming in Issue 3). Electronics reset. One contractor's tactical visor: factory reset screen visible. The Catalyst is gone — the panel is empty of him except for the evidence of what he is.",
        composition: "WIDE INTERIOR — the alley without the protagonist. His absence is the subject. The de-colored radius: exactly circular, stark against the alley color. Three contractors in various states of incapacitation. A single detail: his footprint at the center of the monochrome circle, then stepping out of it.",
        lighting: "Normal alley amber, except within the monochrome radius where light has been absorbed. The boundary: sharp, like a photograph.",
        mood: "He was here. He's gone. He left evidence of something the system has no category for.",
        mj: `Lagos alley aftermath no protagonist, three AXIS contractors in tactical gear incapacitated on ground, 3-meter circular radius of desaturated monochrome grey-black in alley where color has been removed by Ase surge, electronics visibly reset (contractor visor shows factory reset screen), single footprint at monochrome circle center then stepping out, protagonist absent only evidence remains, sharp color boundary, graphic novel aftermath panel, ${BASE_STYLE} --ar 2:3`,
        dalle: `Graphic novel aftermath panel. A dark Lagos alley — the protagonist is gone. Three AXIS contractors in grey tactical gear are incapacitated on the ground. A 3-meter circular radius around the alley's center is desaturated to monochrome grey-black — color removed from the physical space. Sharp boundary between color and monochrome. One contractor's tactical visor shows a factory reset screen. A single footprint at the center, then stepping out of the circle. Absence as subject. Moebius + Sean Murphy style.`,
        ff: `alley aftermath, contractors down, monochrome circle, protagonist absent, evidence of power, noir`,
        sd: `(masterpiece:1.4), alley aftermath, three contractors incapacitated, desaturated monochrome circle boundary sharp, factory reset visor, protagonist absent, noir aftermath, Moebius style`
      },
      {
        id: "2X-ZARA",
        type: "CHARACTER",
        label: "ISS 2 — PG 2",
        title: "Zara Osei — The Victoria Prime Asset",
        aspect: "2:3",
        priority: "MEDIUM",
        synopsis: "Zara Osei introduction. Victoria Prime — she's attending an AXIS compliance function for her firm. Beautiful, composed, entirely at home in a world that optimizes people. Detail that tells her real allegiance: the AXIS access card she's wearing has a microscopic modification at the magnetic strip — Taiwo's work. She can't see it. The reader can (barely). She doesn't know she's carrying the Catalyst's key into the system.",
        composition: "MID-SHOT character introduction. Zara in foreground, the AXIS function in background (other Victoria Prime elite, AXIS logos, surveillance aesthetic). The detail: her access card, partially visible at her lapel. A subtle highlight draws the eye to it — the reader should notice before Zara does.",
        lighting: "Victoria Prime institutional cold blue with warm-white event lighting. She's perfectly lit — she belongs here.",
        mood: "She thinks she's choosing to help. She doesn't know yet that she was positioned three moves ago. The Reddington Protocol's most elegant deployment.",
        mj: `elegant Victoria Prime Black Nigerian woman 30s at AXIS compliance corporate function, beautiful composed fully at home in optimized world, formal attire, AXIS access lanyard at lapel with barely-visible microscopic modification at magnetic strip (subtle reader detail), AXIS function background other Victoria Prime elite AXIS logos surveillance aesthetic, cold institutional blue warm white event lighting, graphic novel character introduction panel, ${BASE_STYLE} --ar 2:3`,
        dalle: `Graphic novel character introduction panel. A beautiful composed Black Nigerian woman in her 30s attends an AXIS compliance function in Victoria Prime Lagos 2031. Perfectly dressed, completely at home. At her lapel: an AXIS access card on a lanyard — and barely visible, almost subliminal, a microscopic modification at the magnetic strip. Behind her: other Victoria Prime elite, AXIS logos, institutional décor. Cold institutional blue and warm-white event lighting. She belongs here. She's also carrying someone else's key. Moebius + Sean Murphy style.`,
        ff: `elegant Nigerian woman corporate AXIS function, access card subtle modification detail, Victoria Prime, institutional lighting, noir asset`,
        sd: `(masterpiece:1.4), elegant Black Nigerian woman AXIS corporate function, access card lanyard subtle detail, Victoria Prime cold blue warm white, character introduction, Moebius style`
      },
      {
        id: "2X-BREAKTHROUGH",
        type: "ACTION",
        label: "ISS 2 — PG 12",
        title: "Taiwo Breaks Through",
        aspect: "2:3",
        priority: "HIGH",
        synopsis: "Taiwo breaking into the Bureau's ghost network. Her workspace: all screens at maximum intensity. Her Ase-vision overlay at full: the Bureau's network architecture is visible to her as a physical structure floating in her space — geometric dark purple lattice, wrong angles, hidden corridors. She's navigating it with her hands, moving through digital architecture the way you move through a physical space. Her expression: the focus of someone who has found a structure she's never seen before and is already inside it.",
        composition: "MEDIUM INTERIOR — Taiwo in mid-ground, the Bureau network visualization filling the space around her as Ase-vision overlay. The screens behind her at max brightness. Her hands moving through the architecture. The lattice structure: dark purple, deliberately different from normal Ase orange — this is Bureau-built, wrong, cold.",
        lighting: "Screen maximum brightness behind (cold blue-white). The Bureau network overlay: dark purple, absorbing ambient. Her face: screen-lit white-blue, fully focused.",
        mood: "14 years old. Breaking into the most dangerous intelligence network in Lagos. Not scared. Interested.",
        mj: `14-year-old Yoruba Nigerian girl in shipping container workspace all screens at maximum brightness, Ase-vision active showing Bureau ghost network as physical geometric dark purple lattice floating in space with wrong angles hidden corridors she navigates with hands, full digital architecture visualization overlaid on physical space, cold blue-white screen light behind, dark purple Bureau network structure absorbing ambient, her face screen-lit fully focused not scared interested, graphic novel action panel, ${BASE_STYLE} --ar 2:3`,
        dalle: `Graphic novel action panel. A 14-year-old Yoruba Nigerian girl in her shipping container workspace — all screens at maximum intensity. Her Ase-vision overlay is active, showing the Bureau's ghost network as a physical geometric structure floating in her space: dark purple lattice, deliberately wrong angles, hidden corridors. She navigates it with her hands, moving through digital architecture spatially. Cold blue-white screen light from behind. The Bureau network: dark purple, cold, absorbing. Her face: completely focused. Not scared. Interested. Moebius + Sean Murphy style.`,
        ff: `young girl hacking, dark purple network visualization floating, screen max brightness, Ase vision overlay, shipping container workspace`,
        sd: `(masterpiece:1.4), young Yoruba girl workspace screens max brightness, Bureau network dark purple geometric lattice floating, Ase vision active, hands navigating, screen lit face focused, afrofuturism, Moebius style`
      },
      {
        id: "3X-APPROACH",
        type: "CHARACTER",
        label: "ISS 3 — PG 3",
        title: "The Pull He Didn't Plan For",
        aspect: "2:3",
        priority: "MEDIUM",
        synopsis: "The Catalyst traveling to the Listening Shore — not by choice, or not entirely. He's on a motorcycle, Badagry-bound, and the Ase is pulling at him like a tide. Shown as: the direction he's riding (south, toward the coast) and the subtle Ase distortion at his chest — pulling forward, toward the shore. He hasn't made a decision yet. He's being made to.",
        composition: "PROFILE SHOT — him on a motorcycle, moving through the Badagry Corridor approach road at dusk. The landscape transitioning from Lagos dense to coastal open. The Ase distortion at his sternum: subtle but visible, a darkening that pulls forward.",
        lighting: "Late dusk: amber horizon ahead (south, toward the coast). Mainland Grid amber behind dimming. The road: increasingly empty.",
        mood: "He doesn't go places he didn't plan to go. He's going. The distinction matters.",
        mj: `Black Nigerian man on motorcycle riding south on Badagry Corridor approach road dusk, Lagos density transitioning to coastal openness in background-to-foreground progression, subtle dark Ase energy distortion at his chest pulling him forward toward coast shown as darkening, profile shot composition, amber horizon ahead south toward coast, Mainland amber behind dimming, road increasingly empty, graphic novel character panel, ${BASE_STYLE} --ar 2:3`,
        dalle: `Graphic novel character panel. A Black Nigerian man rides a motorcycle southbound on the Badagry Corridor approach road at dusk. The landscape transitions from Lagos urban density to coastal openness. At his sternum: a subtle dark Ase distortion, pulling him forward toward the coast, barely visible but present. Profile shot. Amber horizon ahead, south. The road growing empty. He's going somewhere he didn't decide to go. Moebius + Jean Giraud motion illustration.`,
        ff: `Black man motorcycle coastal road dusk, Ase pull toward coast, Lagos to Badagry transition, profile shot, atmospheric`,
        sd: `(masterpiece:1.4), Black man motorcycle dusk road, coastal transition, Ase chest pull dark distortion, profile shot, amber horizon, Moebius motion style`
      },
      {
        id: "3X-RECOVERY",
        type: "CHARACTER",
        label: "ISS 3 — PG 17",
        title: "The Only Wall He Finds",
        aspect: "2:3",
        priority: "MEDIUM",
        synopsis: "After running from the Listening Shore. Inland, alone. He's found a concrete wall in an empty Badagry town alleyway and he's against it. Not collapsed — seated, back to wall, knees up. Not dramatic. Just stopped. This is what the man who plans everything looks like when he runs out of plan. The Ase: completely silent, flat. The most suppressed it's been in the issue.",
        composition: "MEDIUM SHOT — him seated against the wall, profile or slight 3/4. The wall: plain concrete, old Lagos, slightly damp. The alley: empty. Night has fully arrived. He's in a pocket of dark between two distant generator lights. The expression: processing. Not broken. Processing.",
        lighting: "Between two amber generator lights — he's in the dark between. Not dramatic shadow, just the natural dark of a gap. One distant generator light catches the edge of his face.",
        mood: "He ran from a beach. He's sitting against a wall. He will get up in approximately twelve minutes. But right now: this.",
        mj: `Black Nigerian man seated back against concrete wall in empty Badagry town alley at night, knees up not collapsed just stopped, alone, in natural dark gap between two distant amber generator lights one light edge-catching his face, Ase field completely flat silent most suppressed in the story, expression processing not broken, nothing dramatic just a man who ran out of plan sitting still, graphic novel intimate character panel, ${BASE_STYLE} --ar 2:3`,
        dalle: `Graphic novel intimate character panel. A Black Nigerian man sits with his back against a concrete wall in an empty Badagry town alley at night. Knees up. Not collapsed — just stopped. He's between two distant amber generator lights, in the natural dark gap between. One light edge-catches his face. His Ase field: completely flat, silent, the most suppressed in the issue. Expression: processing. Not broken. Not dramatic. A man who ran out of plan, sitting against a wall. He'll get up in twelve minutes. Moebius + Sean Murphy intimate portraiture.`,
        ff: `man seated against wall alone alley night, between two lights in darkness, processing expression, intimate noir moment`,
        sd: `(masterpiece:1.4), Black man seated concrete wall alley night, knees up alone, dark gap between two amber lights, edge-lit face, processing not dramatic, intimate noir, Moebius portrait style`
      }
    ]
  },

  /* ══════════════════════════════════════════════
     SECTION 4: ISSUE 4 — THE INCIDENT
  ══════════════════════════════════════════════ */
  {
    id: "ISSUE_4",
    label: "ISSUE #4: THE INCIDENT",
    color: "#FF3D00",
    description: "The Void Belt flashpoint. The series' first unambiguous action issue. The 0.8-second decision. Sovereign-class Ase, uncontrolled. Buildings don't fall — drones do.",
    scenes: [
      {
        id: "4-COVER",
        type: "COVER",
        label: "COVER",
        title: "The Incident — Cover",
        aspect: "2:3",
        priority: "CRITICAL",
        synopsis: "The Slag Market in crisis. AXIS enforcement units entering — matte grey tactical vehicles, Seagull drones deployed low, searchlights cutting through the market smoke. In the foreground: the Catalyst in silhouette, back to viewer, facing the market. His Ase field is visible for the first time on a cover — but contained, building. The cover colors: Void Belt amber market warmth vs. AXIS cold blue enforcement light cutting in. The conflict made visible.",
        composition: "BACK SHOT with the crisis in front of him. The AXIS enforcement establishing its perimeter in the background, the market chaos middle ground, him at the bottom third. The cover is the 0.8 seconds before the decision — or the decision being made.",
        lighting: "Battle of two light sources: market amber (what exists, what he's protecting) vs. AXIS cold blue (what's invading). He's the line between them.",
        mood: "He didn't plan to be here. He's here. The decision is being made.",
        mj: `comic cover, Black Nigerian man silhouette back to viewer foreground facing Lagos Void Belt Slag Market crisis, background AXIS enforcement units entering matte grey tactical vehicles Seagull drones deployed low searchlights, market chaos middle ground amber merchant lights, his Ase field building visible as dark corona around him, stark contrast market amber warm vs AXIS cold blue cutting in searchlights, bottom third protagonist top two-thirds crisis, graphic novel cover, ${BASE_STYLE} --ar 2:3`,
        dalle: `Graphic novel cover. A Black Nigerian man stands in silhouette at the bottom third of the frame, back to viewer, facing the Void Belt Slag Market crisis. Behind him: AXIS enforcement units establishing perimeter — matte grey tactical vehicles, Seagull drones deployed low, searchlights cutting through market smoke. His Ase field is building — a dark corona around his silhouette. Two light sources in battle: warm amber of the market (what exists) vs. cold blue of AXIS enforcement (what's invading). He stands at the line between. Moebius + Sean Murphy cover art.`,
        ff: `Slag Market crisis cover, man silhouette facing AXIS invasion, amber vs cold blue light, dark energy building, Afrofuturist action cover`,
        sd: `(masterpiece:1.4), cover art, Black man silhouette back view, Slag Market AXIS enforcement invasion, amber warm vs cold blue clash, dark Ase corona building, crisis, action cover, Moebius style`
      },
      {
        id: "4-SLAG-MARKET",
        type: "SPLASH",
        label: "PAGE 1",
        title: "The Slag Market — Before",
        aspect: "2:3",
        priority: "HIGH",
        synopsis: "The Slag Market in its normal operating state — establishing the world before AXIS disrupts it. Maximum density, maximum life. Stalls: gutted AXIS drones being sold for parts, Chinese tech repaired and resold, handmade Ase generators in every configuration, fabric, food, motorcycle parts. The Forge Collective's young cohort visible in the crowd — including Kemi, working on a generator at a far stall. This is the world. This is what they're protecting.",
        composition: "FULL SPLASH — the market as community. Every corner of the frame: life. The Forge Collective cohort distributed through the scene. Kemi: far right, identifiable by the Ase shimmer at her hands even at rest.",
        lighting: "Pure market amber. Every light source is a generator, a welding torch, a cooking flame. The Forge Collective's Ase adds warm orange pockets throughout.",
        mood: "This place exists. It has existed without the system's permission for five years. The reader should love it before AXIS arrives.",
        mj: `full page splash Lagos Void Belt Slag Market normal operation maximum density, stalls selling gutted AXIS drones repaired Chinese tech handmade Ase generator cylinders fabric food motorcycle parts, Forge Collective young cohort distributed through crowd, young Yoruba woman mechanic far right with orange Ase heat shimmer at hands working on generator, pure market amber every light is generator welding torch cooking flame, vibrant living autonomous community, graphic novel environmental splash, ${BASE_STYLE} --ar 2:3`,
        dalle: `Full-page graphic novel splash. The Slag Market of the Void Belt in normal operation. Maximum density, maximum life. Stalls selling: gutted AXIS drones for parts, repaired Chinese tech, handmade Ase generator cylinders, fabric, food, motorcycle parts. The Forge Collective's young cohort distributed through the crowd — including a young Yoruba woman mechanic far right, orange Ase heat shimmer at her hands even at rest. Pure market amber: every light source is a generator, welding torch, cooking flame. This world exists without permission. Moebius + Otomo community illustration.`,
        ff: `Void Belt Slag Market busy day, dense stalls repaired tech Ase generators, diverse Lagos crowd, warm amber market light, living autonomous community`,
        sd: `(masterpiece:1.4), Void Belt Slag Market dense, stalls tech generators food, Forge Collective crowd, amber warm light, living community, afrofuturism Otomo Moebius style splash`
      },
      {
        id: "4-AXIS-ARRIVES",
        type: "ACTION",
        label: "PAGE 5",
        title: "AXIS Enforcement — Entry",
        aspect: "2:3",
        priority: "HIGH",
        synopsis: "AXIS enforcement breaching the Slag Market's perimeter. Four tactical vehicles, matte grey with Seagull logo. Drones deployed low — eye level with the stall vendors, searchlights cutting through everything. The vendors: faces in searchlight beam, hands raised. The Forge Collective cohort scattering. The AXIS unit leader at the vehicle's front: completely indifferent, processing an operation. The market's warmth being replaced by cold blue from the searchlights.",
        composition: "LOW ANGLE — the AXIS vehicles large in frame, the market people small at the sides. Power dynamic made spatial. The searchlights: coming directly toward the viewer.",
        lighting: "INVASION OF COLD BLUE — the AXIS searchlights cutting through the market amber. The transition line: visible, dramatic. Where the searchlights hit: cold blue. Behind them: amber.",
        mood: "This is what enforcement looks like when it arrives in a place it considers unregistered. Efficient. Indifferent. The most frightening force in the series.",
        mj: `AXIS enforcement vehicles breaching Slag Market perimeter Lagos Void Belt, four matte grey tactical vehicles Seagull logo, drones deployed at eye-level with stall vendors, searchlights cutting through market smoke, vendors hands raised faces lit by searchlight, Forge Collective cohort scattering, AXIS unit leader at front indifferent efficient, cold blue searchlights invading warm amber market light dramatic transition line visible, low angle vehicles large frame market people small sides, graphic novel action panel, ${BASE_STYLE} --ar 2:3`,
        dalle: `Graphic novel action panel. AXIS enforcement units breach the Slag Market perimeter. Four matte grey tactical vehicles with Seagull logos. Seagull drones at stall-vendor eye level, searchlights cutting through market smoke. Vendors with hands raised, faces caught in cold blue searchlight beams. The Forge Collective cohort scattering. AXIS unit leader at vehicle front: completely indifferent, processing an operation. Cold blue searchlights invading warm amber market — the transition line: dramatic, visible. Low angle: vehicles large, people small. Sean Murphy action illustration.`,
        ff: `AXIS enforcement entering market, tactical vehicles searchlights, vendors hands up, cold blue invading amber, power dynamic spatial, noir action`,
        sd: `(masterpiece:1.4), AXIS enforcement vehicles breaching market, Seagull drones searchlights cold blue, vendors hands raised amber to blue transition, low angle power dynamic, action, Sean Murphy style`
      },
      {
        id: "4-KEMI-TRAPPED",
        type: "CHARACTER",
        label: "PAGE 7",
        title: "Kemi — Cornered",
        aspect: "2:3",
        priority: "HIGH",
        synopsis: "Kemi and two other young Forge Collective members cornered in a market stall — AXIS enforcement blocking the exit. Kemi: not afraid, calculating. Her Forge Ase visible at her hands — orange heat distortion, activated. She could use it. She knows not to. Her face: the decision being held. The other two cohort members: less controlled. AXIS enforcers in the frame edge, closing.",
        composition: "TIGHT INTERIOR — the stall as the frame. Kemi center, her hands the visual focus. The two cohort members flanking. AXIS frame edges. The stall creates a box — the visual trap made literal.",
        lighting: "The stall interior: amber. AXIS searchlight from outside: cold blue cutting through the stall opening from the frame edge. Her hands: orange Ase warmth against the cold blue.",
        mood: "She's Forge level. She could burn through them. She knows that's not the right answer. That discipline — knowing when not to — is why the Catalyst trained her first.",
        mj: `23-year-old Yoruba Nigerian woman mechanic and two young Forge Collective members cornered inside Lagos market stall, AXIS enforcement blocking exit at frame edges closing in, her hands showing Forge Ase orange heat distortion activated, expression calculating not afraid holding decision, other cohort members less controlled, stall amber interior, AXIS cold blue searchlight cutting through stall opening from frame edge, her hands orange between two lights, graphic novel tension panel, ${BASE_STYLE} --ar 2:3`,
        dalle: `Graphic novel tension panel. A 23-year-old Yoruba Nigerian woman mechanic and two young Forge Collective members are cornered in a Slag Market stall. AXIS enforcement at the frame edges, closing in. Her hands: Forge Ase orange heat distortion, activated, visible. Her expression: calculating, not afraid, holding a decision. The other cohort members: less controlled, fear visible. The stall interior: amber. Cold blue AXIS searchlight cutting through the stall opening. Her orange hands between the two competing light sources. Sean Murphy tight interior panel.`,
        ff: `Yoruba woman cornered in market stall, Ase orange hands activated, AXIS closing in, deciding not to fight, tension noir`,
        sd: `(masterpiece:1.4), Yoruba woman cornered market stall, orange Ase hands activated, AXIS cold blue frame edges, calculating expression, other members scared, amber interior, tension, Sean Murphy style`
      },
      {
        id: "4-DECISION",
        type: "ACTION",
        label: "PAGE 9",
        title: "0.8 Seconds",
        aspect: "2:3",
        priority: "CRITICAL — The issue's defining moment",
        synopsis: "The 0.8-second decision. A single full-page panel: the Catalyst, standing perfectly still three blocks from the Slag Market, visible in the mid-distance of his view — the Slag Market, the AXIS searchlights, the trapped cohort (Kemi's orange Ase just barely visible as a flicker through the market chaos). His face: the 0.8 seconds happening. A man who plans fourteen moves deep. Making a decision that isn't in any of the fourteen. The Ase at the edge of his silhouette: the containment system straining.",
        composition: "WIDE SHOT — him at bottom third, Slag Market mid-ground, Lagos above. The viewpoint: from his perspective. He sees the market. The reader sees him seeing it and seeing the Ase beginning to breach.",
        lighting: "Three blocks from the market: ambient Grid amber. In the market: AXIS cold blue searchlights. His silhouette: between them. The Ase breach at his edges: forge amber (before it fully activates, it's warm — the last warm moment before it becomes something else).",
        mood: "This is the moment. Not the surge. This. A man choosing to stop containing what he is.",
        mj: `Black Nigerian man standing perfectly still three blocks from Slag Market crisis, wide shot him bottom third market mid-ground Lagos above, visible through market chaos small orange flicker of Kemi Ase, his face showing the 0.8 second decision man who plans fourteen moves making a choice that isn't in any of them, Ase containment straining visible as forge amber warmth at his silhouette edges before activation, ambient Grid amber around him AXIS cold blue searchlights in market, graphic novel critical moment panel, ${BASE_STYLE} --ar 2:3`,
        dalle: `Graphic novel critical moment panel. Wide shot: a Black Nigerian man stands perfectly still three blocks from the Slag Market crisis. He's the bottom third; the market chaos and AXIS searchlights fill the mid-ground; Lagos above. Through the chaos, barely visible: a small flicker of orange Ase — Kemi's hands. His face: the 0.8 seconds. A man who plans 14 moves making a choice that isn't in any of them. The Ase containment straining — warm forge amber at his silhouette edges, the last warm moment before activation. The defining moment.`,
        ff: `man standing still before market crisis, 0.8 second decision face, Ase containment straining at edges, critical moment noir`,
        sd: `(masterpiece:1.4), Black man standing still market crisis distant, decision face 0.8 seconds, Ase edges straining amber warm, wide shot, critical moment, Sean Murphy style`
      },
      {
        id: "4-SOVEREIGN-ERUPTION",
        type: "SPLASH",
        label: "PAGE 10 SPLASH",
        title: "Sovereign — Uncontrolled",
        aspect: "2:3",
        priority: "CRITICAL — Issue 4's money shot. Bigger than Issue 1.",
        synopsis: "Sovereign-class Ase, uncontrolled. Full page. The Slag Market. Three AXIS enforcement drones: destroyed — not exploded, de-constructed, their components pulled apart by the field. One AXIS installation at the market perimeter: structurally compromised (walls separated at the seams, not collapsed — it looks like the building inhaled). A 50-meter radius of electronics: reset to factory state (every screen, every AXIS interface, every personal device: blank, restarting). The Catalyst at center: completely still. His Ase field: not the Issue 1 ember. This is full Sovereign. The monochrome radius is 50 meters and it reaches from the ground into the air. Market stalls at the radius edge: half-color, half-grey.",
        composition: "AERIAL 45-DEGREE — the full 50-meter radius visible. Three drone wreckages distributed. The structurally compromised installation at the perimeter. The Catalyst at the exact center. Kemi visible at the edge of the radius, behind him, his back still to her — he went in for her and hasn't looked back yet.",
        lighting: "FULL FIELD INVERSION in the 50-meter radius. Outside: market amber and AXIS cold blue chaos. Inside: monochrome darkness with the one forge amber edge. The field is bigger now. The physics inside it are different.",
        mood: "He didn't want this. He never wanted to be this visible. But Kemi was in there. Issue 4 ends with him understanding: caring has consequences that can't be planned for. And he'll have to plan for them now.",
        mj: `full page splash aerial 45-degree view Lagos Void Belt Slag Market, massive 50-meter circular Sovereign Ase monochrome desaturated radius, Black Nigerian man at exact center completely still, three AXIS drones de-constructed components pulled apart distributed in radius, one market perimeter installation walls separated at seams (inhaled not collapsed), 50-meter electronics all reset to factory blank restarting, young Yoruba woman Kemi at radius edge behind protagonist who hasn't turned yet, monochrome inside radius color chaos outside, forge amber edge boundary, bigger than Issue 1, graphic novel devastating splash, ${BASE_STYLE} --ar 2:3 --chaos 12`,
        dalle: `Full-page graphic novel splash, aerial 45-degree view. The Slag Market. A massive 50-meter circular monochrome Sovereign Ase radius — color removed from the physical world within. At the exact center: a Black Nigerian man, completely still. Three AXIS drones de-constructed — components pulled apart by the field, distributed through the space. One AXIS installation at the perimeter: walls separated at the seams, inhaled not collapsed. Every electronic within the radius: blank, restarting (screens, AXIS interfaces, devices). Kemi at the radius edge behind him, he hasn't turned yet. Forge amber edge at the boundary. Bigger than anything before. Sean Murphy + Moebius devastating splash.`,
        ff: `Sovereign Ase explosion splash, massive monochrome radius, drones deconstructed, man at center still, Kemi at edge, devastating scale`,
        sd: `(masterpiece:1.4), full page splash aerial, massive 50 meter monochrome desaturated circle Ase field, Black man center still, drones deconstructed, installation walls separated, Kemi at edge, forge amber boundary, devastating, Sean Murphy Moebius splash`
      },
      {
        id: "4-CARRIES-KEMI",
        type: "CHARACTER",
        label: "PAGE 12",
        title: "He Doesn't Look Back",
        aspect: "2:3",
        priority: "HIGH",
        synopsis: "He carries Kemi out of the market. She's not dead — she's dazed, the Ase field's edge affected her. He has her in a fireman's carry, moving with purpose through the market chaos — market vendors clearing the way, recognizing something they can't name. He doesn't look back at the destruction. Not once. His Ase field: retreating, pulling back in. The monochrome is fading behind him. The orange of Kemi's Ase, dimmed but present at her hanging hands.",
        composition: "PROFILE MID-SHOT — him moving left to right, Kemi carried. The market chaos receding in the background. His face: forward. Not looking back. Not triumphant. Just moving. This is the scene that defines his relationship with her: he walked into a Sovereign-class uncontrolled surge for this. He's not saying anything about it.",
        lighting: "Market amber recovering around them as the Ase field retreats. Her hands: faint orange. His face: amber lit, moving into the warm light that's coming back on.",
        mood: "He doesn't look back. He doesn't need to. He made a decision that cost everything he'd built toward operational invisibility. He's carrying her out. The rest is planning problems.",
        mj: `Black Nigerian man fireman-carry of young Yoruba Nigerian woman mechanic moving through Lagos Void Belt market aftermath, market vendors clearing path recognizing something unnamed, his face forward not looking back at destruction, Ase field retreating pulling back in, monochrome fading behind him, her hands hanging faint orange Ase still present, market amber recovering around them, profile mid-shot left to right movement, no triumph just movement, graphic novel character panel, ${BASE_STYLE} --ar 2:3`,
        dalle: `Graphic novel character panel. A Black Nigerian man carries a dazed young Yoruba woman (fireman carry) through the Slag Market aftermath — moving with purpose, left to right. Market vendors clear the path, recognizing something they can't name. He doesn't look back at the destruction behind him. Not once. His Ase field: retreating. Her hands hanging at his back: faint orange Ase still present. Market amber recovering around them as the field pulls back. Profile mid-shot. No triumph. Just movement. Moebius + Sean Murphy.`,
        ff: `man carrying woman from crisis, not looking back, market vendors clearing path, amber recovering, quiet exit, noir character`,
        sd: `(masterpiece:1.4), Black man fireman carry Yoruba woman, market aftermath, not looking back, vendors clearing path, amber recovering, Ase retreating, profile movement, Moebius style`
      },
      {
        id: "4-CHEN-FINAL",
        type: "CHARACTER",
        label: "PAGE 22 FINAL",
        title: "Get Me Everything",
        aspect: "2:3",
        priority: "HIGH",
        synopsis: "Director Chen Weiming reviews the Slag Market footage in the AXIS control room. Every screen shows data: drone footage (the 50-meter radius), electronics reset logs (page after page of factory-reset events), structural report (one installation compromised). Chen: standing in the center of his control room, screens surrounding him, all showing different facets of the same event. His expression: not alarmed. Recalibrating. A man updating his model of what the variable can do. He says one sentence: 'Get me everything.' Four words. The issue ends.",
        composition: "WIDE INTERIOR — Chen at center, screens surrounding him 270 degrees. The screens are a mosaic of the Slag Market event data. His face: the smallest thing in the frame. What surrounds him is bigger.",
        lighting: "AXIS cold blue from every screen. He's completely in it. No warmth anywhere in this panel.",
        mood: "He's not scared. He's interested. That's the worst possible response.",
        mj: `Director Chen Weiming 52-year-old East Asian French man in AXIS control room surrounded 270 degrees by screens all showing Slag Market event data drone footage 50-meter radius electronics reset logs structural report, standing at center screens surrounding him, expression not alarmed but recalibrating updating his model, cold blue screen light from every direction no warmth, wide interior him smallest in frame data surrounds him, graphic novel final panel, ${BASE_STYLE} --ar 2:3`,
        dalle: `Graphic novel final panel. Director Chen Weiming stands in the center of the AXIS control room, surrounded 270 degrees by screens showing the Slag Market event: aerial drone footage of the 50-meter monochrome radius, electronics reset logs, structural report of the compromised installation. He is the smallest element in the frame — the data surrounds him. Expression: not alarmed. Recalibrating. Updating his model of what the variable can do. Cold AXIS blue from every screen. No warmth. He says: "Get me everything." Moebius + Sean Murphy final panel.`,
        ff: `AXIS director surrounded by screens Slag Market data, recalibrating expression, cold blue all screens, final panel noir antagonist`,
        sd: `(masterpiece:1.4), East Asian director AXIS control room, 270 degree screens Slag Market data, cold blue all directions, recalibrating not scared, final panel, Moebius style`
      }
    ]
  },

  /* ══════════════════════════════════════════════
     SECTION 5: ISSUE 5 — ARCHITECTURE
  ══════════════════════════════════════════════ */
  {
    id: "ISSUE_5",
    label: "ISSUE #5: ARCHITECTURE",
    color: "#4FC3F7",
    description: "The series' quietest issue. No action. Only architecture. Everything being built. The reader should be more afraid of this issue than any fight scene.",
    scenes: [
      {
        id: "5-COVER",
        type: "COVER",
        label: "COVER",
        title: "The Neural Map",
        aspect: "2:3",
        priority: "CRITICAL",
        synopsis: "The Catalyst's face, close-up, from the front. His eyes: open, and within them — reflected, as if the map lives behind his eyes — a stylized rendering of Lagos 2031 from above, all five districts, all faction territories, all surveillance nodes, all Ase signatures. Not a literal reflection — the information IS his eyes. The Scofield architecture made portraiture. The title: minimal. The image does all the work.",
        composition: "EXTREME CLOSE-UP face — just eyes, nose, top of jaw. The Lagos map: reflected in both irises, and bleeding slightly beyond the pupils into the whites of his eyes. The map uses the five district colors (forge orange Void Belt, cold steel Victoria, electric blue Yaba, dark red Badagry, amber Mainland). His expression: absolute calm. He's holding all of this and it costs him nothing.",
        lighting: "Each eye illuminated by the district colors within it — his left eye: Void Belt amber, his right eye: Victoria Prime cold blue. The bridge of his nose: the border.",
        mood: "He is the map. The map is him. AXIS is looking for a person. They should be looking for infrastructure.",
        mj: `extreme close-up cover art, Black Nigerian man face just eyes nose jaw, within both irises Lagos 2031 district map reflected-bleeding (forge orange Void Belt, cold steel Victoria Prime, electric blue Yaba Deep, dark red Badagry corridor, amber Mainland Grid), map bleeding slightly beyond pupils into whites, left eye amber right eye cold blue lit by their contents, absolute calm expression, he IS the map, graphic novel cover, ${BASE_STYLE} --ar 2:3`,
        dalle: `Graphic novel cover — extreme close-up of a Black Nigerian man's face (just eyes, nose, jaw line). Within both irises and bleeding slightly into the whites of his eyes: the Lagos 2031 district map rendered in faction colors — forge orange Void Belt, cold steel Victoria Prime, electric blue Yaba Deep, dark red Badagry Corridor, amber Mainland Grid. His left eye lit amber, his right eye cold blue. Expression: absolute calm. He is holding the entire city in his mind and it costs nothing. The map is him. Moebius portraiture masterclass.`,
        ff: `extreme close-up face with city map in eyes, Lagos districts reflected in irises, calm expression, architectural portrait cover`,
        sd: `(masterpiece:1.4), extreme close-up face, Lagos district map reflected in eyes bleeding into whites, five district colors, calm expression, he is the map, portrait cover, Moebius style`
      },
      {
        id: "5-PLANNING",
        type: "SPLASH",
        label: "PAGE 2",
        title: "The Map Lives Here",
        aspect: "2:3",
        priority: "HIGH",
        synopsis: "The command space — and for the first time, the reader sees the FULL neural map he's built. Not paper: he's standing in the middle of the room, eyes closed, and the Ase is projecting his internal map of Lagos as a dark field visualization filling the space around him. Like a hologram but organic — it's not technology, it's his Ase field expressing his cognition. All five districts, all faction territories, all AXIS nodes, color-coded in district palette. He's literally thinking the city.",
        composition: "FULL SPLASH — him at center, the Ase-map floating in the space around him, filling the frame. His eyes: closed. His body: completely still. The map: 3D, atmospheric, beautiful. This is the most intimate view of his power in the series — not destroying something, understanding it.",
        lighting: "The Ase map generates its own light — the five district colors in their zones. His face: lit from the map, every district color touching his face as the map rotates slowly.",
        mood: "This is what Sovereign-class looks like when it serves understanding rather than force. It's the most beautiful image in the series so far.",
        mj: `Black Nigerian man standing eyes closed at center of room, Sovereign Ase field projecting full Lagos 2031 neural map filling space around him as dark organic holographic visualization, all five districts color-coded (forge orange Void Belt, cold steel Victoria Prime, electric blue Yaba Deep, dark red Badagry, amber Mainland), faction territories AXIS nodes marked, 3D atmospheric map floating, his face lit by the district colors as map rotates, eyes closed understanding not destroying, full splash, graphic novel, ${BASE_STYLE} --ar 2:3`,
        dalle: `Full-page graphic novel splash. A Black Nigerian man stands at the center of his command space, eyes closed. His Sovereign Ase field projects outward as a full Lagos 2031 neural map: all five districts in their colors (forge orange Void Belt, cold steel Victoria Prime, electric blue Yaba Deep, dark red Badagry, amber Mainland Grid), faction territories, AXIS surveillance nodes. Not technology — his Ase expressing his cognition. The map fills the frame in 3D atmospheric dark holographic form. His face lit by the rotating district colors. The most beautiful use of his power. Moebius + Jean Giraud illustration.`,
        ff: `man eyes closed projecting Lagos map around him, Ase field neural map visualization, five district colors, intimate power, splash`,
        sd: `(masterpiece:1.4), Black man eyes closed center, Ase field projecting Lagos map around him, five district colors atmospheric 3D visualization, intimate understanding, full splash, Moebius Giraud style`
      },
      {
        id: "5-TRAINING",
        type: "ACTION",
        label: "PAGE 9",
        title: "First Lesson Is Why",
        aspect: "2:3",
        priority: "HIGH",
        synopsis: "The first training session with the Forge Collective cohort — six awakened individuals of varying levels. The Catalyst stands before them. He's not demonstrating Ase. He's talking. The lesson: ideology before technique. The six: listening with varying levels of patience (Kemi: completely engaged, she already knows this. Two others: trying to understand. Three: visibly wanting to skip to the part where they learn to do things.) His expression: he's taught before. He knew exactly who in this room would struggle with the first lesson.",
        composition: "MEDIUM WIDE — him facing the six, slightly elevated (natural position on a workshop platform). The six in a rough semicircle. Their faces: differentiated expressions visible.",
        lighting: "Forge Collective workshop: amber generator light. The six: each one slightly different ambient Ase glow (their levels visible in the heat shimmer of their proximity).",
        mood: "The Professor's first lecture. He will not skip to the technique. The why IS the technique. Three of the six will figure this out by the end of the session. Three won't.",
        mj: `Black Nigerian man standing on workshop platform speaking to six Lagos Forge Collective awakened individuals seated semicircle below, not demonstrating Ase teaching ideology first, six faces varied expressions Kemi fully engaged two trying to understand three wanting to skip to technique, Forge Collective workshop amber generator light, subtle Ase heat shimmer around each of the six at different levels, the Professor teaching, graphic novel character scene, ${BASE_STYLE} --ar 2:3`,
        dalle: `Graphic novel character scene. A Black Nigerian man stands on a workshop platform addressing six Forge Collective awakened individuals in a semicircle below. He's not demonstrating — he's talking. First lesson: ideology before technique. The six faces: differentiated — a young Yoruba woman (Kemi) fully engaged; two others trying to understand; three visibly impatient. Forge Collective workshop. Amber generator light. Subtle Ase heat shimmer around each of the six. The Professor's first lecture. Moebius + Sean Murphy.`,
        ff: `man teaching six students workshop, ideology lesson, varied student expressions, forge amber light, Ase shimmer around students`,
        sd: `(masterpiece:1.4), man teaching workshop platform six students semicircle, varied expressions engaged and impatient, amber generator light, Ase shimmer, Professor lesson, Moebius style`
      },
      {
        id: "5-REALIZATION",
        type: "CHARACTER",
        label: "PAGE 16",
        title: "No Exit Strategy",
        aspect: "2:3",
        priority: "MEDIUM",
        synopsis: "Mid-training, the Catalyst stops. Three panels on one page: PANEL 1 — him mid-sentence, something occurring to him. PANEL 2 — his face: the realization. He is building something he has no exit strategy from. For the first time in the series, a plan has a gap. PANEL 3 — he continues the sentence. The cohort notices nothing. Kemi does.",
        composition: "THREE-PANEL VERTICAL — same eyeline, three moments. The micro-shift in his face between panels 1 and 3 tells the story. Kemi's face at panel 3: she saw something happen.",
        lighting: "Consistent workshop amber across all three. No change in light. The drama is entirely facial.",
        mood: "He built something he cares about enough to have no exit from. The Catalyst just noticed that. He'll file it and continue. But he noticed.",
        mj: `three vertical panels graphic novel, Black Nigerian man teaching mid-sentence, PANEL 1 mid-sentence something occurs to him, PANEL 2 face showing realization he has built something with no exit strategy for first time a plan has a gap micro expression, PANEL 3 continues sentence face controlled cohort notices nothing, at the frame edge Kemi young Yoruba woman expression showing she saw something happen, workshop amber consistent all panels, ${BASE_STYLE} --ar 2:3`,
        dalle: `Graphic novel three-panel vertical layout. A Black Nigerian man teaching mid-sentence. PANEL 1: mid-sentence, something occurs to him. PANEL 2: close-up, the realization — he has built something with no exit strategy. First time in the series a plan has a gap. The micro-expression: barely visible, gone in 0.5 seconds. PANEL 3: continues the sentence, face controlled, the cohort notices nothing. At the frame edge in panel 3: Kemi's face showing she saw something. Workshop amber throughout. Sean Murphy facial expression mastery.`,
        ff: `three panel vertical, man teaching then realizing then continuing, micro expression caught by one student, amber consistent, intimate character`,
        sd: `(masterpiece:1.4), three panel vertical, Black man teaching micro realization no exit strategy expression, continues controlled, Kemi catches it at edge, amber workshop, Sean Murphy expression style`
      }
    ]
  },

  /* ══════════════════════════════════════════════
     SECTION 6: ISSUE 6 — OPERATORS
  ══════════════════════════════════════════════ */
  {
    id: "ISSUE_6",
    label: "ISSUE #6: OPERATORS",
    color: "#FF6B00",
    description: "Reddington at full operational voltage. Five districts. One night. The network proves itself. And then the file.",
    scenes: [
      {
        id: "6-COVER",
        type: "COVER",
        label: "COVER",
        title: "Five Operations / One Night",
        aspect: "2:3",
        priority: "CRITICAL",
        synopsis: "A clock face as composition device. The clock: 11:47 PM. The clock hands replaced by five narrative panels arranged radially — each showing one simultaneous operation in its district color: Zara (silver/Victoria Prime), Seun (dark red/Badagry), Taiwo (electric blue/Void Belt), an AXIS executive unknowingly feeding data (cold white), the Catalyst at center (forge orange). The whole cover is a clock. The title runs around the clock face. The series' most formally elegant cover.",
        composition: "RADIAL COMPOSITION — clock metaphor. The five operations as clock panels radiating from a central face showing 11:47 PM. The Catalyst at absolute center in the clock face, not moving — directing. The five panels: each a distinct scene, distinct color.",
        lighting: "Each panel lit by its district palette. The clock face center: forge orange, the Catalyst's light source.",
        mood: "Five things happening simultaneously because one person planned all five. The cover is the Scofield architecture made beautiful.",
        mj: `graphic novel cover radial clock composition, large clock face 11:47 PM with clock hands replaced by five narrative panels radiating showing simultaneous operations each in district color (silver Victoria Prime woman, dark red Badagry coast runner, electric blue Void Belt girl at screens, cold white AXIS executive unknowing, forge orange Black Nigerian man at absolute center not moving directing), title around clock face, elegant formal composition, Reddington network operating, ${BASE_STYLE} --ar 2:3`,
        dalle: `Graphic novel cover. A clock face at 11:47 PM as the composition device. The clock hands replaced by five radial narrative panels, each showing a simultaneous operation in district color: silver (Victoria Prime socialite), dark red (Badagry runner at coast), electric blue (young girl at screens in the Void Belt), cold white (AXIS executive unknowingly feeding data), forge orange (Black Nigerian man at absolute center, directing). The Catalyst at the center of the clock. Title around the clock face. The Scofield architecture as formal design. Moebius + Sean Murphy.`,
        ff: `clock face cover five operations radial panels, each district color, man at center directing, simultaneous operations, formal elegant cover`,
        sd: `(masterpiece:1.4), clock face cover 11:47, five radial panels simultaneous operations, district colors, Black man center directing, formal elegant, Moebius style`
      },
      {
        id: "6-FIVE-OPS",
        type: "SPLASH",
        label: "PAGE 1",
        title: "All Five at Once",
        aspect: "16:9",
        priority: "HIGH — Double-page spread in print. Use 16:9.",
        synopsis: "The double-page spread: Lagos as a whole, all five districts visible from above, and the five simultaneous operations annotated. Five small inset panels, one per district, each in its color. The Catalyst's command position shown as a forge orange point at the center of the Mainland Grid. Lines from his position to all five operations. This is the map and the operation simultaneously.",
        composition: "DOUBLE-PAGE SPREAD — aerial Lagos (16:9 for print layout). All five districts color-coded. Five inset panels at the five operation points. Lines connecting to the Catalyst's position. The visual syntax of a military operation map but with Afrofuturist aesthetics.",
        lighting: "Aerial view, all district lights visible at night as per the environmental key frames.",
        mood: "This is what it looks like when the Professor runs the heist at full scale.",
        mj: `double page spread aerial Lagos 2031 night all five districts visible color-coded, five simultaneous operations shown as inset panels at their locations each in district color, lines connecting to forge orange central Catalyst position Mainland Grid, Zara Victoria Prime silver, Seun Badagry dark red, Taiwo Void Belt electric blue, AXIS executive cold white, Catalyst forge orange center, military operation aesthetic Afrofuturist, graphic novel splash, ${BASE_STYLE} --ar 16:9`,
        dalle: `Graphic novel double-page spread. Aerial view of all Lagos 2031 at night, all five districts color-coded. Five simultaneous operations shown as inset scene panels at their geographic locations, each in its district color. Lines connect all five to a forge orange central point (the Catalyst's position on the Mainland Grid). Zara: silver/Victoria Prime. Seun: dark red/Badagry. Taiwo: electric blue/Void Belt. The AXIS executive: cold white. The Catalyst: forge orange at center. Military operation aesthetic through Afrofuturist design. Moebius + Otomo aerial mastery.`,
        ff: `aerial Lagos all districts five operations annotated, lines to central point, district colors, double spread, military op map Afrofuturist`,
        sd: `(masterpiece:1.4), aerial Lagos all five districts night, five inset operations district colors, lines to central Catalyst position, double spread, Afrofuturist military op map, Moebius Otomo style`
      },
      {
        id: "6-BADAGRY-RUN",
        type: "ACTION",
        label: "PAGE 11",
        title: "Five People — One Night",
        aspect: "2:3",
        priority: "HIGH",
        synopsis: "The Badagry run. Seun leading five awakened individuals through the mangrove corridor — the biggest extraction in one night. The Memory Keepers at the path edges: not directing, bearing witness. Five people who were registered citizens in Victoria Prime this morning. They'll be unregistered by dawn — by choice. The path glows slightly with Ase resonance — the corridor is active, the ancestors are paying attention.",
        composition: "PROCESSION WIDE — the full group visible. Seun at front. Five behind. Memory Keeper witnesses at edges. The path: the same mangrove formation as Issue 2, but warmer now — Ase resonance visible as a subtle amber-gold path glow.",
        lighting: "Moonlight through mangroves (cool silver), the Memory Keeper totems (warm ancestral gold), the path Ase resonance (amber glow from the ground up). The warmest the Badagry Corridor has ever been.",
        mood: "The Corridor is performing its ancient function. Five people trading safety for sovereignty. The ancestors know this. That's why the path is warm.",
        mj: `procession of six figures through Badagry mangrove corridor at night, runner Seun at front leading five awakened individuals, Memory Keeper elder figures at path edges bearing witness not directing, path glowing amber gold from Ase resonance from ground up, moonlight silver through mangrove canopy above, Memory Keeper totems warm ancestral gold glow, the corridor performing its ancient function, graphic novel action panel, ${BASE_STYLE} --ar 2:3`,
        dalle: `Graphic novel action panel. The Badagry Corridor mangrove path at night. Runner Seun leads five awakened individuals in procession. Memory Keeper elder figures stand at the path edges bearing witness. The path itself glows with amber-gold Ase resonance from the ground up — the corridor is active. Moonlight silver through mangrove canopy above. Memory Keeper totems: warm ancestral gold. Five people trading safety for sovereignty. The ancestors are paying attention. Moebius atmospheric illustration.`,
        ff: `mangrove corridor procession at night, six figures, Memory Keepers at edges, path glowing amber Ase resonance, moonlight, ancestral active`,
        sd: `(masterpiece:1.4), mangrove corridor night, procession six figures, Memory Keepers watching edges, path amber Ase glow ground up, moonlight canopy, ancestral active, Moebius atmospheric`
      },
      {
        id: "6-TAIWO-FILE",
        type: "CHARACTER",
        label: "PAGE 17",
        title: "Before He Reads It",
        aspect: "2:3",
        priority: "CRITICAL",
        synopsis: "Taiwo hands the Catalyst the data she found — the Bureau file, on a small physical device (nothing transmitted, nothing hackable). Her expression: this is significant. She has seen things on screens that moved her. She looks moved. He takes the device. His expression: controlled. She's watching his face for the 1.3 seconds. She's the only one who will have watched his face for this.",
        composition: "TWO-SHOT — the handoff. Taiwo reaching with the device, his hand receiving it. Their faces at the same frame height despite the age and height difference — the composition equalizes them for this moment. Two intelligence-level people at a significant transfer.",
        lighting: "Void Belt generator amber. Taiwo's screen glow behind her. The device: catching the screen light slightly — the last thing between him and what's on it.",
        mood: "She knows it's important. She doesn't know why. He doesn't know what it is yet. In approximately thirty seconds, the issue's gut-punch lands.",
        mj: `14-year-old Yoruba girl handing small data device to Black Nigerian man in Void Belt workspace, two-shot composition faces equalized by framing despite age height difference, her expression showing this is significant moved by what she found, his expression controlled receiving device, device catching screen light between them last barrier before he reads it, generator amber Taiwo's screens glow behind, significant quiet handoff, graphic novel character panel, ${BASE_STYLE} --ar 2:3`,
        dalle: `Graphic novel character panel. A 14-year-old Yoruba Nigerian girl hands a small physical data device to a Black Nigerian man in her Void Belt workspace. Two-shot composition: their faces at the same height despite age and height difference — the composition equalizes them. Her expression: this is significant, she's moved. His expression: controlled, receiving. The device catches screen light — the last thing between him and what's on it. Void Belt generator amber. Her screens glow behind her. A quiet, significant handoff. Moebius + Sean Murphy.`,
        ff: `young girl handing data device to man, significant quiet handoff, faces equalized, Void Belt workspace, amber screen glow`,
        sd: `(masterpiece:1.4), young girl handing device to man, two-shot faces equalized, significant handoff, Void Belt amber screens, controlled and moved expressions, Moebius style`
      },
      {
        id: "6-FINAL",
        type: "CHARACTER",
        label: "PAGE 22 FINAL",
        title: "He Closes the File",
        aspect: "2:3",
        priority: "CRITICAL",
        synopsis: "He reads the Bureau file — dated 2019. We don't see the content. We see: him. Standing alone in the Void Belt night, the data device in his hand, the file closed now. The Ase: completely silent. Flatter than it has been since Issue 1. He's looking at the city. Lagos. All of it. Something has shifted. He knew people were watching. He didn't know they chose him before he chose anything. The final panel: his back to us, Lagos ahead, the device in his closed hand. No caption. No dialogue.",
        composition: "FINAL PANEL — back shot, wide. Him against Lagos. The device in his right hand (slightly — not the focus, but present). His left hand slightly looser than usual (his non-dominant hand always gives the micro-tells). No Ase visible at all. The absence is louder than any presence.",
        lighting: "Lagos ambient: the five-district patchwork seen from Mainland vantage. His silhouette against it.",
        mood: "He closed the file without copying it. He's alone. He's looking at the city someone was watching him plan in since he was a child. He'll file this. He'll plan around it. But right now: this.",
        mj: `Black Nigerian man back to viewer standing alone Void Belt night holding closed data device right hand, looking at Lagos patchwork city lights all five districts visible in distance, Ase completely silent flat no field visible absence louder than presence, left hand slightly looser micro-tell, no caption no dialogue he knows someone chose him before he chose anything, Lagos ahead him against it, graphic novel final panel, ${BASE_STYLE} --ar 2:3`,
        dalle: `Graphic novel final panel. A Black Nigerian man stands alone in the Void Belt at night, back to viewer. In his right hand: a small data device, the file closed on it. He looks at the Lagos city lights ahead — all five districts visible in the distance. His Ase field: completely silent, completely flat. The absence louder than any presence. His left hand slightly looser than usual — the only tell. No caption. No dialogue. He closed the file without copying it. He knows now: someone chose him before he chose anything. Lagos ahead. Him against it. No easy ending tonight. Moebius atmospheric final panel.`,
        ff: `man back view alone night, file closed in hand, looking at Lagos city lights, Ase absent, quiet devastation, final panel`,
        sd: `(masterpiece:1.4), Black man back view alone night, device in hand file closed, looking at Lagos city lights all districts, Ase absent flat, quiet devastation, back shot wide, Moebius final panel style`
      }
    ]
  }
];

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────

const TYPE_COL = {
  "COVER": "#FF6B00", "SPLASH": "#C0C0C0", "ACTION": "#FF3D00",
  "CHARACTER": "#FFC107", "ESTABLISHING": "#4FC3F7",
  "REF SHEET": "#8B0000", "ENVIRONMENT": "#4FC3F7"
};

const PLATFORMS = ["MIDJOURNEY", "DALL·E 3", "ADOBE FIREFLY", "STABLE DIFF"];

export default function CatalystExtendedPipeline() {
  const [activeSection, setActiveSection] = useState(0);
  const [activeScene, setActiveScene] = useState(null);
  const [platform, setPlatform] = useState("MIDJOURNEY");
  const [copied, setCopied] = useState(null);

  const section = SECTIONS[activeSection];
  const totalImages = SECTIONS.reduce((a, s) => a + s.scenes.length, 0);

  const getPrompt = (sc) => {
    if (platform === "MIDJOURNEY") return sc.mj;
    if (platform === "DALL·E 3") return sc.dalle;
    if (platform === "ADOBE FIREFLY") return sc.ff;
    return sc.sd;
  };

  const copy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div style={{ background: "#020202", minHeight: "100vh", color: "#ccc", fontFamily: "'DM Sans','Segoe UI',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700&family=JetBrains+Mono:wght@400;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:3px;}::-webkit-scrollbar-thumb{background:#FF6B00;}::-webkit-scrollbar-track{background:#080808;}
        .mono{font-family:'JetBrains Mono',monospace;}
        .btn{background:none;border:1px solid #141414;color:#444;cursor:pointer;padding:5px 11px;font-family:'JetBrains Mono',monospace;font-size:0.55rem;letter-spacing:0.12em;text-transform:uppercase;transition:all 0.18s;white-space:nowrap;}
        .btn:hover,.btn.active{border-color:var(--sc,#FF6B00);color:var(--sc,#FF6B00);background:rgba(255,107,0,0.04);}
        .sc{background:#050505;border:1px solid #0f0f0f;padding:14px;cursor:pointer;transition:all 0.18s;margin-bottom:5px;}
        .sc:hover{border-color:#1a1a1a;}
        .sc.sel{border-color:#FF6B00;background:rgba(255,107,0,0.02);}
        .pbtn{background:none;border:1px solid #111;color:#333;cursor:pointer;padding:5px 12px;font-family:'JetBrains Mono',monospace;font-size:0.55rem;letter-spacing:0.1em;transition:all 0.18s;}
        .pbtn.a{border-color:#4FC3F7;color:#4FC3F7;}
        .cpbtn{background:rgba(255,107,0,0.06);border:1px solid rgba(255,107,0,0.15);color:#FF6B00;cursor:pointer;padding:8px 18px;font-family:'JetBrains Mono',monospace;font-size:0.55rem;letter-spacing:0.12em;transition:all 0.18s;}
        .cpbtn:hover{background:rgba(255,107,0,0.12);}
        .cpbtn.ok{background:rgba(0,255,100,0.06);border-color:rgba(0,255,100,0.15);color:#00e660;}
        .pbox{background:#030303;border:1px solid #141414;padding:16px;font-family:'JetBrains Mono',monospace;font-size:0.68rem;color:#777;line-height:1.9;word-break:break-word;margin-bottom:12px;}
        @keyframes fu{from{opacity:0;transform:translateY(6px);}to{opacity:1;transform:translateY(0);}}
        .fa{animation:fu 0.3s ease;}
      `}</style>

      {/* HDR */}
      <div style={{ padding: "16px 22px 0", borderBottom: "1px solid #0d0d0d", position: "sticky", top: 0, background: "#020202", zIndex: 100 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
          <div>
            <div className="mono" style={{ color: "#FF6B00", fontSize: "0.48rem", letterSpacing: "0.3em", marginBottom: "4px" }}>CATALYST: THE AWAKENING — EXTENDED IMAGE PIPELINE</div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: "1rem" }}>
              {totalImages} ADDITIONAL IMAGES — CHARACTER SHEETS · ENVIRONMENTS · ISSUES 4–6
            </div>
          </div>
          <div className="mono" style={{ textAlign: "right", fontSize: "0.48rem", color: "#222", lineHeight: 1.8 }}>
            <div style={{ color: "#FF6B00" }}>● PIPELINE v2 ACTIVE</div>
            <div>SECTIONS: {SECTIONS.length}</div>
            <div>TOTAL IMAGES: {totalImages}</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "3px", overflowX: "auto", paddingBottom: "1px" }}>
          {SECTIONS.map((s, i) => (
            <button key={s.id} className={`btn ${activeSection === i ? "active" : ""}`}
              style={{ "--sc": s.color }} onClick={() => { setActiveSection(i); setActiveScene(null); }}>
              {s.label} ({s.scenes.length})
            </button>
          ))}
        </div>
      </div>

      {/* BODY */}
      <div style={{ display: "flex", height: "calc(100vh - 96px)" }}>

        {/* SCENE LIST */}
        <div style={{ width: "300px", flexShrink: 0, borderRight: "1px solid #0d0d0d", overflowY: "auto", padding: "14px" }}>
          <div className="mono" style={{ color: section.color, fontSize: "0.48rem", letterSpacing: "0.2em", marginBottom: "8px" }}>{section.label}</div>
          <div style={{ color: "#444", fontSize: "0.7rem", lineHeight: 1.6, marginBottom: "14px" }}>{section.description}</div>
          {section.scenes.map(sc => (
            <div key={sc.id} className={`sc ${activeScene?.id === sc.id ? "sel" : ""}`}
              style={{ borderColor: activeScene?.id === sc.id ? section.color : "#0f0f0f" }}
              onClick={() => setActiveScene(sc)}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                <span className="mono" style={{ color: TYPE_COL[sc.type] || "#444", fontSize: "0.48rem", letterSpacing: "0.12em" }}>{sc.label}</span>
                <span style={{ color: "#222", fontSize: "0.55rem", fontFamily: "monospace", background: `${TYPE_COL[sc.type]}10`, border: `1px solid ${TYPE_COL[sc.type]}20`, padding: "1px 5px" }}>{sc.type}</span>
              </div>
              <div style={{ color: "#bbb", fontSize: "0.78rem", fontWeight: 600, marginBottom: "3px" }}>{sc.title}</div>
              <div style={{ color: "#333", fontSize: "0.62rem", fontFamily: "monospace" }}>AR {sc.aspect}</div>
            </div>
          ))}
        </div>

        {/* DETAIL */}
        <div style={{ flex: 1, overflowY: "auto", padding: "22px" }} className="fa">
          {!activeScene ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", flexDirection: "column", gap: "10px" }}>
              <div style={{ width: "1px", height: "50px", background: "#111" }} />
              <div className="mono" style={{ color: "#1a1a1a", fontSize: "0.55rem", letterSpacing: "0.2em" }}>SELECT SCENE — PROMPT READY</div>
              <div style={{ color: "#111", fontSize: "0.65rem" }}>{section.scenes.length} images in this section</div>
            </div>
          ) : (
            <div>
              {/* HDR */}
              <div style={{ background: "#050505", border: `1px solid ${section.color}18`, padding: "24px", marginBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                  <div>
                    <div className="mono" style={{ color: TYPE_COL[activeScene.type], fontSize: "0.48rem", letterSpacing: "0.2em", marginBottom: "5px" }}>{activeScene.label} — {activeScene.type}</div>
                    <div style={{ fontSize: "1.35rem", fontWeight: 700, color: "#fff" }}>{activeScene.title}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div className="mono" style={{ color: "#222", fontSize: "0.48rem", marginBottom: "3px" }}>ASPECT RATIO</div>
                    <div className="mono" style={{ color: section.color, fontSize: "0.85rem", fontWeight: 700 }}>{activeScene.aspect}</div>
                    <div style={{ marginTop: "6px", background: `${TYPE_COL[activeScene.type]}12`, border: `1px solid ${TYPE_COL[activeScene.type]}25`, padding: "3px 8px" }}>
                      <div className="mono" style={{ color: "#444", fontSize: "0.45rem", letterSpacing: "0.1em", marginBottom: "2px" }}>PRIORITY</div>
                      <div style={{ color: TYPE_COL[activeScene.type], fontSize: "0.65rem", fontFamily: "monospace" }}>{activeScene.priority.split(" —")[0]}</div>
                    </div>
                  </div>
                </div>
                <p style={{ color: "#777", fontSize: "0.8rem", lineHeight: 1.8 }}>{activeScene.synopsis}</p>
              </div>

              {/* TECHNICAL */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "16px" }}>
                {[
                  { label: "COMPOSITION", val: activeScene.composition, col: "#4FC3F7" },
                  { label: "LIGHTING", val: activeScene.lighting, col: "#FFC107" },
                  { label: "MOOD / TARGET", val: activeScene.mood, col: "#8B0000" },
                ].map(({ label, val, col }) => (
                  <div key={label} style={{ background: "#050505", border: "1px solid #0f0f0f", padding: "16px" }}>
                    <div className="mono" style={{ color: col, fontSize: "0.45rem", letterSpacing: "0.18em", marginBottom: "8px" }}>{label}</div>
                    <p style={{ color: "#555", fontSize: "0.72rem", lineHeight: 1.7 }}>{val}</p>
                  </div>
                ))}
              </div>

              {/* PROMPT */}
              <div style={{ background: "#030303", border: "1px solid #0f0f0f", padding: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                  <div className="mono" style={{ color: "#FF6B00", fontSize: "0.48rem", letterSpacing: "0.22em" }}>GENERATION PROMPT — COPY READY</div>
                  <div style={{ display: "flex", gap: "3px" }}>
                    {PLATFORMS.map(p => (
                      <button key={p} className={`pbtn ${platform === p ? "a" : ""}`} onClick={() => setPlatform(p)}>{p}</button>
                    ))}
                  </div>
                </div>
                <div className="pbox">{getPrompt(activeScene)}</div>
                <button className={`cpbtn ${copied === activeScene.id ? "ok" : ""}`}
                  onClick={() => copy(activeScene.id, getPrompt(activeScene))}>
                  {copied === activeScene.id ? "✓ COPIED TO CLIPBOARD" : "◈ COPY PROMPT — " + platform}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
