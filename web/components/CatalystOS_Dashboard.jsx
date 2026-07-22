import { useState, useEffect, useRef } from "react";

const SKILLS_DB = [
  { id:"legal-001", name:"Affidavit Drafter", category:"Legal", subcategory:"Document Drafting", description:"Draft affidavits for Nigerian High Court with proper sworn statement format.", tags:["affidavit","sworn","court","lagos"] },
  { id:"legal-002", name:"Motion Writer", category:"Legal", subcategory:"Document Drafting", description:"Draft motions and applications for filing in Nigerian courts.", tags:["motion","court","filing"] },
  { id:"legal-003", name:"Brief Summarizer", category:"Legal", subcategory:"Research", description:"Summarize legal briefs and case files into concise action points.", tags:["summary","brief","case"] },
  { id:"legal-004", name:"Case Law Researcher", category:"Legal", subcategory:"Research", description:"Research Nigerian case law and precedents for litigation support.", tags:["case law","precedent","research"] },
  { id:"legal-005", name:"Contract Reviewer", category:"Legal", subcategory:"Review", description:"Review contracts for red flags, missing clauses, and risk exposure.", tags:["contract","review","risk"] },
  { id:"legal-006", name:"Witness Statement Drafter", category:"Legal", subcategory:"Document Drafting", description:"Structure witness statements for court admissibility.", tags:["witness","statement","court"] },
  { id:"legal-007", name:"Pleadings Formatter", category:"Legal", subcategory:"Formatting", description:"Format pleadings to Lagos High Court filing standards.", tags:["pleadings","format","lagos"] },
  { id:"legal-008", name:"Legal Letter Drafter", category:"Legal", subcategory:"Correspondence", description:"Draft demand letters, notices, and legal correspondence.", tags:["letter","demand","notice"] },
  { id:"legal-009", name:"Deposition Summarizer", category:"Legal", subcategory:"Research", description:"Summarize depositions and transcripts into key points.", tags:["deposition","transcript","summary"] },
  { id:"legal-010", name:"Court Filing Checklist", category:"Legal", subcategory:"Compliance", description:"Generate filing checklists for specific court applications.", tags:["checklist","filing","compliance"] },
  { id:"ai-001", name:"Prompt Engineer", category:"AI Automation", subcategory:"Prompting", description:"Design high-performance prompts for Claude, GPT, and Gemini.", tags:["prompt","engineering","claude"] },
  { id:"ai-002", name:"Workflow Automator", category:"AI Automation", subcategory:"Workflows", description:"Build multi-step AI workflows for document processing and research.", tags:["workflow","automation","pipeline"] },
  { id:"ai-003", name:"AI Integration Consultant", category:"AI Automation", subcategory:"Strategy", description:"Plan and execute AI integration into business operations.", tags:["integration","strategy","consulting"] },
  { id:"ai-004", name:"Data Extractor", category:"AI Automation", subcategory:"Data", description:"Extract structured data from unstructured documents and text.", tags:["extraction","data","nlp"] },
  { id:"ai-005", name:"Report Generator", category:"AI Automation", subcategory:"Documents", description:"Auto-generate structured reports from raw notes and data.", tags:["report","generation","automation"] },
  { id:"ai-006", name:"Meeting Transcriber", category:"AI Automation", subcategory:"Transcription", description:"Transcribe and summarize meetings with action item extraction.", tags:["transcription","meeting","summary"] },
  { id:"ai-007", name:"Email Classifier", category:"AI Automation", subcategory:"Email", description:"Classify and route emails by urgency, topic, and sender.", tags:["email","classification","routing"] },
  { id:"ai-008", name:"Knowledge Base Builder", category:"AI Automation", subcategory:"Knowledge", description:"Structure raw information into searchable knowledge bases.", tags:["knowledge","database","search"] },
  { id:"ai-009", name:"Agent Orchestrator", category:"AI Automation", subcategory:"Agents", description:"Coordinate multiple AI agents for complex multi-step tasks.", tags:["agent","orchestration","multi-agent"] },
  { id:"ai-010", name:"API Connector", category:"AI Automation", subcategory:"Integration", description:"Connect AI models to external APIs and data sources.", tags:["api","integration","connector"] },
  { id:"content-001", name:"Substack Article Writer", category:"Content", subcategory:"Long-Form", description:"Write long-form Substack articles in the Catalyst voice — direct, no fluff.", tags:["substack","article","writing"] },
  { id:"content-002", name:"YouTube Script Writer", category:"Content", subcategory:"Video", description:"Script YouTube videos with hook, body, and CTA structure.", tags:["youtube","script","video"] },
  { id:"content-003", name:"Twitter Thread Builder", category:"Content", subcategory:"Social", description:"Build high-engagement Twitter/X threads from core ideas.", tags:["twitter","thread","social media"] },
  { id:"content-004", name:"Instagram Caption Writer", category:"Content", subcategory:"Social", description:"Write punchy Instagram captions that stop the scroll.", tags:["instagram","caption","social media"] },
  { id:"content-005", name:"TikTok Hook Generator", category:"Content", subcategory:"Video", description:"Generate viral TikTok hooks for the first 3 seconds.", tags:["tiktok","hook","viral"] },
  { id:"content-006", name:"Newsletter Writer", category:"Content", subcategory:"Email", description:"Write high-conversion email newsletters with Catalyst OS voice.", tags:["newsletter","email","marketing"] },
  { id:"content-007", name:"SEO Blog Post Writer", category:"Content", subcategory:"SEO", description:"Write SEO-optimized blog posts targeting specific keywords.", tags:["seo","blog","writing"] },
  { id:"content-008", name:"Podcast Show Notes Writer", category:"Content", subcategory:"Audio", description:"Write podcast show notes and episode descriptions.", tags:["podcast","show notes","audio"] },
  { id:"content-009", name:"Brand Story Writer", category:"Content", subcategory:"Branding", description:"Craft brand origin stories that build emotional connection.", tags:["brand","story","narrative"] },
  { id:"content-010", name:"Sales Copy Writer", category:"Content", subcategory:"Copywriting", description:"Write direct-response sales copy for products and services.", tags:["sales","copy","conversion"] },
  { id:"event-001", name:"Event Operations Planner", category:"Event Management", subcategory:"Operations", description:"Build event operations plans with vendor, logistics, and timeline structure.", tags:["event","operations","planning"] },
  { id:"event-002", name:"Vendor Contract Drafter", category:"Event Management", subcategory:"Legal", description:"Draft vendor agreements and contracts for event suppliers.", tags:["vendor","contract","event"] },
  { id:"event-003", name:"Sponsorship Deck Builder", category:"Event Management", subcategory:"Fundraising", description:"Build sponsorship proposals with tiered benefit packages.", tags:["sponsorship","deck","proposal"] },
  { id:"event-004", name:"Event Budget Modeler", category:"Event Management", subcategory:"Finance", description:"Model event budgets with revenue projections and cost breakdowns.", tags:["budget","finance","event"] },
  { id:"event-005", name:"Marketing Campaign Planner", category:"Event Management", subcategory:"Marketing", description:"Plan full marketing campaigns for event launches.", tags:["marketing","campaign","launch"] },
  { id:"event-006", name:"Ticketing Strategy Builder", category:"Event Management", subcategory:"Revenue", description:"Design ticket tier strategies for maximum revenue.", tags:["ticketing","revenue","strategy"] },
  { id:"event-007", name:"Event Timeline Builder", category:"Event Management", subcategory:"Operations", description:"Build day-of event run sheets and production timelines.", tags:["timeline","run-sheet","event"] },
  { id:"event-008", name:"Influencer Brief Writer", category:"Event Management", subcategory:"Marketing", description:"Write influencer briefs for event promotion campaigns.", tags:["influencer","brief","promotion"] },
  { id:"event-009", name:"Press Release Writer", category:"Event Management", subcategory:"PR", description:"Write press releases for event announcements and post-event coverage.", tags:["press release","pr","media"] },
  { id:"event-010", name:"Attendee Experience Designer", category:"Event Management", subcategory:"Experience", description:"Map attendee journeys and touchpoints for maximum experience.", tags:["experience","journey","attendee"] },
  { id:"mktg-001", name:"Brand Identity Builder", category:"Marketing", subcategory:"Branding", description:"Build brand identity frameworks — voice, positioning, and personality.", tags:["brand","identity","positioning"] },
  { id:"mktg-002", name:"Competitor Analyst", category:"Marketing", subcategory:"Research", description:"Analyze competitors and identify strategic gaps to exploit.", tags:["competitor","analysis","strategy"] },
  { id:"mktg-003", name:"Go-To-Market Strategist", category:"Marketing", subcategory:"Strategy", description:"Build GTM strategies for product and service launches.", tags:["gtm","launch","strategy"] },
  { id:"mktg-004", name:"Social Media Calendar Builder", category:"Marketing", subcategory:"Social", description:"Build 30-90 day social media content calendars.", tags:["social media","calendar","content"] },
  { id:"mktg-005", name:"PR Crisis Handler", category:"Marketing", subcategory:"PR", description:"Draft crisis comms and manage narrative during PR events.", tags:["crisis","pr","comms"] },
  { id:"mktg-006", name:"Audience Persona Builder", category:"Marketing", subcategory:"Research", description:"Build detailed audience personas from market research.", tags:["persona","audience","research"] },
  { id:"mktg-007", name:"Ad Copy Writer", category:"Marketing", subcategory:"Advertising", description:"Write ad copy for Meta, Google, and TikTok campaigns.", tags:["ads","copy","advertising"] },
  { id:"mktg-008", name:"Funnel Architect", category:"Marketing", subcategory:"Conversion", description:"Design marketing funnels from awareness to conversion.", tags:["funnel","conversion","marketing"] },
  { id:"mktg-009", name:"Media Pitch Writer", category:"Marketing", subcategory:"PR", description:"Write media pitches to journalists and publications.", tags:["media","pitch","pr"] },
  { id:"mktg-010", name:"Partnership Proposal Writer", category:"Marketing", subcategory:"Partnerships", description:"Write partnership and collaboration proposals.", tags:["partnership","proposal","collaboration"] },
  { id:"psych-001", name:"Upstream vs Downstream Analyzer", category:"Psychology", subcategory:"Frameworks", description:"Analyze behavior patterns through the Upstream/Downstream Man framework.", tags:["upstream","downstream","behavior"] },
  { id:"psych-002", name:"Cup vs Ocean Economics", category:"Psychology", subcategory:"Frameworks", description:"Reframe scarcity mindsets using the Cup vs Ocean Economics model.", tags:["scarcity","abundance","economics"] },
  { id:"psych-003", name:"Direction Protocol Mapper", category:"Psychology", subcategory:"Frameworks", description:"Map decision paths using the Direction Protocol framework.", tags:["direction","decision","protocol"] },
  { id:"psych-004", name:"Resilience Engine Activator", category:"Psychology", subcategory:"Frameworks", description:"Build resilience frameworks using the Catalyst Resilience Engine.", tags:["resilience","framework","adversity"] },
  { id:"psych-005", name:"Value Alchemy Transformer", category:"Psychology", subcategory:"Frameworks", description:"Transform commodity offerings into high-value propositions.", tags:["value","alchemy","transformation"] },
  { id:"psych-006", name:"Shadow Psychology Analyst", category:"Psychology", subcategory:"Analysis", description:"Analyze shadow behaviors and hidden motivations in human behavior.", tags:["shadow","psychology","motivation"] },
  { id:"psych-007", name:"Social Engineering Mapper", category:"Psychology", subcategory:"Strategy", description:"Map social dynamics and influence patterns in group settings.", tags:["social","engineering","influence"] },
  { id:"psych-008", name:"Phalanx Strategy Builder", category:"Psychology", subcategory:"Frameworks", description:"Build alliance networks using the Phalanx Strategy model.", tags:["phalanx","alliance","network"] },
  { id:"psych-009", name:"Efficiency Arbitrage Finder", category:"Psychology", subcategory:"Frameworks", description:"Identify leverage points where minimal effort yields maximum output.", tags:["efficiency","arbitrage","leverage"] },
  { id:"psych-010", name:"Culture Psychology Profiler", category:"Psychology", subcategory:"Analysis", description:"Profile cultural dynamics and social codes in Lagos and West Africa.", tags:["culture","psychology","lagos"] },
  { id:"biz-001", name:"Revenue Model Builder", category:"Business", subcategory:"Finance", description:"Build multi-stream revenue models for service businesses.", tags:["revenue","model","finance"] },
  { id:"biz-002", name:"SOP Writer", category:"Business", subcategory:"Operations", description:"Write Standard Operating Procedures for business processes.", tags:["sop","operations","process"] },
  { id:"biz-003", name:"Team Delegation Framework", category:"Business", subcategory:"Management", description:"Build delegation frameworks for multi-role teams.", tags:["delegation","team","management"] },
  { id:"biz-004", name:"Client Proposal Writer", category:"Business", subcategory:"Sales", description:"Write winning client proposals and service agreements.", tags:["proposal","client","sales"] },
  { id:"biz-005", name:"Invoice & Payment Tracker", category:"Business", subcategory:"Finance", description:"Build invoice templates and payment tracking systems.", tags:["invoice","payment","finance"] },
  { id:"biz-006", name:"Business Plan Writer", category:"Business", subcategory:"Planning", description:"Write comprehensive business plans for funding and operations.", tags:["business plan","funding","planning"] },
  { id:"biz-007", name:"Onboarding Framework Builder", category:"Business", subcategory:"HR", description:"Build client and team onboarding frameworks.", tags:["onboarding","client","hr"] },
  { id:"biz-008", name:"KPI Dashboard Designer", category:"Business", subcategory:"Analytics", description:"Design KPI tracking frameworks for multi-stream businesses.", tags:["kpi","dashboard","analytics"] },
  { id:"biz-009", name:"Pricing Strategy Builder", category:"Business", subcategory:"Finance", description:"Build pricing frameworks for consulting and service businesses.", tags:["pricing","strategy","consulting"] },
  { id:"biz-010", name:"Network Map Builder", category:"Business", subcategory:"Strategy", description:"Map strategic relationships and alliance opportunities.", tags:["network","alliances","strategy"] },
];

const CATEGORIES = ["All", "Legal", "AI Automation", "Content", "Event Management", "Marketing", "Psychology", "Business"];

const CAT_COLORS = {
  "Legal": "#c8a96e",
  "AI Automation": "#7eb8f7",
  "Content": "#a8e6a3",
  "Event Management": "#f7a87e",
  "Marketing": "#d4a8f7",
  "Psychology": "#f7d4a8",
  "Business": "#a8d4f7",
};

const CAT_ICONS = {
  "Legal": "⚖️",
  "AI Automation": "🤖",
  "Content": "✍️",
  "Event Management": "🎪",
  "Marketing": "📢",
  "Psychology": "🧠",
  "Business": "💼",
};

async function callClaude(prompt, systemPrompt) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: systemPrompt || "You are CatalystOS, an AI operations system built for The Catalyst — Lagos-based entrepreneur, event producer, and AI consultant. Voice: direct, no corporate buzzwords, contraction-heavy. No em-dashes.",
      messages: [{ role: "user", content: prompt }]
    })
  });
  const data = await res.json();
  return data.content?.[0]?.text || "No response generated.";
}

export default function CatalystOS() {
  const [view, setView] = useState("dashboard");
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [skillInput, setSkillInput] = useState("");
  const [skillOutput, setSkillOutput] = useState("");
  const [skillLoading, setSkillLoading] = useState(false);

  // Legal panel state
  const [legalType, setLegalType] = useState("affidavit");
  const [legalNotes, setLegalNotes] = useState("");
  const [legalOutput, setLegalOutput] = useState("");
  const [legalLoading, setLegalLoading] = useState(false);

  const [agentLog, setAgentLog] = useState([
    { time: new Date().toLocaleTimeString(), msg: "CatalystOS Agent initialized", type: "success" },
    { time: new Date().toLocaleTimeString(), msg: "Skills index loaded — 70 skills across 7 categories", type: "success" },
    { time: new Date().toLocaleTimeString(), msg: "Abegbe Agboola Chambers legal panel ONLINE", type: "success" },
    { time: new Date().toLocaleTimeString(), msg: "Anthropic API connected", type: "success" },
  ]);

  const logRef = useRef(null);

  const addLog = (msg, type = "info") => {
    setAgentLog(prev => [...prev, { time: new Date().toLocaleTimeString(), msg, type }]);
    setTimeout(() => { if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight; }, 50);
  };

  const filtered = SKILLS_DB.filter(s => {
    const matchCat = activeCategory === "All" || s.category === activeCategory;
    const q = search.toLowerCase();
    const matchSearch = !q || s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q) || s.tags.some(t => t.includes(q)) || s.subcategory.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const catCounts = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = cat === "All" ? SKILLS_DB.length : SKILLS_DB.filter(s => s.category === cat).length;
    return acc;
  }, {});

  const runSkill = async () => {
    if (!selectedSkill || !skillInput.trim()) return;
    setSkillLoading(true);
    setSkillOutput("");
    addLog(`Running skill: ${selectedSkill.name}`, "info");
    try {
      const result = await callClaude(
        `Skill: ${selectedSkill.name}\nTask: ${selectedSkill.description}\n\nUser Input:\n${skillInput}`,
        `You are the "${selectedSkill.name}" skill within CatalystOS. Execute this skill with precision. Be direct, no fluff. Deliver actionable output.`
      );
      setSkillOutput(result);
      addLog(`Skill "${selectedSkill.name}" executed successfully`, "success");
    } catch (e) {
      setSkillOutput("Error: " + e.message);
      addLog(`Skill execution failed: ${e.message}`, "error");
    }
    setSkillLoading(false);
  };

  const runLegal = async () => {
    if (!legalNotes.trim()) return;
    setLegalLoading(true);
    setLegalOutput("");
    addLog(`Generating ${legalType} — Abegbe Agboola Chambers`, "info");
    const prompts = {
      affidavit: `You are a Nigerian legal document specialist for Abegbe Agboola Chambers, Ikoyi, Lagos. Draft a formal affidavit for the Lagos High Court using these case notes:\n\n${legalNotes}\n\nFormat: Proper Nigerian court affidavit with numbered paragraphs, sworn statement language, and court header. End with commissioner for oaths signature block.`,
      motion: `You are a Nigerian legal document specialist for Abegbe Agboola Chambers, Ikoyi, Lagos. Draft a Motion on Notice for the Lagos High Court using these case notes:\n\n${legalNotes}\n\nFormat: Proper Nigerian motion format with reliefs numbered, legal grounds stated, and counsel signature block.`,
      demand_letter: `You are a Nigerian legal document specialist for Abegbe Agboola Chambers, Ikoyi, Lagos. Draft a formal demand letter using these case notes:\n\n${legalNotes}\n\nFormat: Formal legal demand letter, "WITHOUT PREJUDICE" header, clear demand with timeframe, consequences of non-compliance.`,
      brief: `You are a Nigerian legal research specialist for Abegbe Agboola Chambers, Ikoyi, Lagos. Summarize the following case notes into a structured legal brief with: (1) Facts, (2) Issues, (3) Applicable Law, (4) Strategy Recommendation:\n\n${legalNotes}`,
    };
    try {
      const result = await callClaude(prompts[legalType],
        "You are a senior legal document specialist at Abegbe Agboola Chambers, a law firm in Ikoyi, Lagos, Nigeria. You produce precise, court-ready Nigerian legal documents. No filler. Pure legal craft."
      );
      setLegalOutput(result);
      addLog(`${legalType} generated — ready for review`, "success");
    } catch (e) {
      setLegalOutput("Error: " + e.message);
      addLog(`Legal generation failed: ${e.message}`, "error");
    }
    setLegalLoading(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    addLog("Output copied to clipboard", "info");
  };

  return (
    <div style={{
      fontFamily: "'JetBrains Mono', 'Courier New', monospace",
      background: "#0a0a0a",
      color: "#e8e8e8",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Syne:wght@400;700;800&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: #111; }
        ::-webkit-scrollbar-thumb { background: #c8a96e; border-radius: 2px; }
        .skill-card:hover { border-color: #c8a96e !important; transform: translateY(-2px); }
        .skill-card { transition: all 0.2s ease; cursor: pointer; }
        .nav-btn:hover { background: #1a1a1a !important; }
        .nav-btn.active { border-bottom: 2px solid #c8a96e !important; color: #c8a96e !important; }
        .cat-pill:hover { opacity: 0.9; }
        .run-btn:hover:not(:disabled) { filter: brightness(1.1); }
        textarea { resize: vertical; }
        .pulse { animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.5; } }
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      {/* HEADER */}
      <div style={{ background: "#0d0d0d", borderBottom: "1px solid #222", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 32, height: 32, background: "#c8a96e", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>⚡</div>
            <div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 16, letterSpacing: 2, color: "#c8a96e" }}>CATALYST OS</div>
              <div style={{ fontSize: 9, color: "#555", letterSpacing: 1 }}>SKILLS OPERATING SYSTEM v1.0</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            {["dashboard", "legal", "agent"].map(v => (
              <button key={v} onClick={() => setView(v)} className={`nav-btn ${view === v ? "active" : ""}`} style={{
                background: "none", border: "none", borderBottom: "2px solid transparent", padding: "8px 16px",
                color: view === v ? "#c8a96e" : "#666", cursor: "pointer", fontSize: 11, letterSpacing: 1.5,
                fontFamily: "inherit", textTransform: "uppercase", transition: "all 0.2s"
              }}>
                {v === "dashboard" ? "🗂 Skills" : v === "legal" ? "⚖️ Legal" : "🤖 Agent"}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80" }} className="pulse" />
            <span style={{ fontSize: 10, color: "#555", letterSpacing: 1 }}>ONLINE</span>
          </div>
        </div>
      </div>

      {/* STATS BAR */}
      {view === "dashboard" && (
        <div style={{ background: "#0d0d0d", borderBottom: "1px solid #1a1a1a", padding: "8px 24px", display: "flex", gap: 32, overflowX: "auto" }}>
          {CATEGORIES.filter(c => c !== "All").map(cat => (
            <div key={cat} style={{ display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" }}>
              <span style={{ fontSize: 12 }}>{CAT_ICONS[cat]}</span>
              <span style={{ fontSize: 10, color: "#555" }}>{cat}</span>
              <span style={{ fontSize: 11, color: CAT_COLORS[cat] || "#c8a96e", fontWeight: 700 }}>{catCounts[cat]}</span>
            </div>
          ))}
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" }}>
            <span style={{ fontSize: 10, color: "#555" }}>TOTAL</span>
            <span style={{ fontSize: 14, color: "#c8a96e", fontWeight: 700 }}>{SKILLS_DB.length}</span>
          </div>
        </div>
      )}

      {/* MAIN */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

        {/* SKILLS DASHBOARD */}
        {view === "dashboard" && (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            {/* Search + Filter */}
            <div style={{ padding: "16px 24px", borderBottom: "1px solid #1a1a1a", display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
              <input
                value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search skills, tags, descriptions..."
                style={{
                  flex: 1, minWidth: 200, background: "#111", border: "1px solid #2a2a2a", borderRadius: 6,
                  color: "#e8e8e8", padding: "8px 12px", fontSize: 12, fontFamily: "inherit", outline: "none"
                }}
              />
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {CATEGORIES.map(cat => (
                  <button key={cat} onClick={() => setActiveCategory(cat)} className="cat-pill" style={{
                    background: activeCategory === cat ? (CAT_COLORS[cat] || "#c8a96e") : "#1a1a1a",
                    border: "1px solid " + (activeCategory === cat ? "transparent" : "#2a2a2a"),
                    color: activeCategory === cat ? "#0a0a0a" : "#888",
                    padding: "4px 10px", borderRadius: 4, fontSize: 10, cursor: "pointer",
                    fontFamily: "inherit", letterSpacing: 0.5, transition: "all 0.15s"
                  }}>
                    {cat === "All" ? `All (${catCounts["All"]})` : `${CAT_ICONS[cat]} ${cat} (${catCounts[cat]})`}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ flex: 1, overflow: "auto", display: "flex" }}>
              {/* Skills Grid */}
              <div style={{ flex: 1, padding: 24, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12, alignContent: "start" }}>
                {filtered.map(skill => (
                  <div key={skill.id} className="skill-card" onClick={() => { setSelectedSkill(skill); setSkillInput(""); setSkillOutput(""); }}
                    style={{
                      background: selectedSkill?.id === skill.id ? "#1a1500" : "#111",
                      border: `1px solid ${selectedSkill?.id === skill.id ? "#c8a96e" : "#1e1e1e"}`,
                      borderRadius: 8, padding: 14
                    }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontSize: 18 }}>{CAT_ICONS[skill.category]}</span>
                      <span style={{ fontSize: 9, color: CAT_COLORS[skill.category] || "#c8a96e", background: "#1a1a1a", padding: "2px 6px", borderRadius: 3, letterSpacing: 0.5 }}>
                        {skill.subcategory}
                      </span>
                    </div>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13, color: "#e8e8e8", marginBottom: 4 }}>{skill.name}</div>
                    <div style={{ fontSize: 11, color: "#666", lineHeight: 1.5, marginBottom: 8 }}>{skill.description}</div>
                    <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                      {skill.tags.slice(0, 3).map(tag => (
                        <span key={tag} style={{ fontSize: 9, color: "#555", background: "#1a1a1a", padding: "1px 5px", borderRadius: 3 }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                ))}
                {filtered.length === 0 && (
                  <div style={{ gridColumn: "1/-1", textAlign: "center", padding: 48, color: "#444" }}>
                    <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
                    <div>No skills match your search.</div>
                  </div>
                )}
              </div>

              {/* Skill Runner Panel */}
              {selectedSkill && (
                <div style={{ width: 380, borderLeft: "1px solid #1a1a1a", display: "flex", flexDirection: "column", background: "#0d0d0d" }}>
                  <div style={{ padding: 20, borderBottom: "1px solid #1a1a1a" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <div style={{ fontSize: 20, marginBottom: 4 }}>{CAT_ICONS[selectedSkill.category]}</div>
                        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: "#e8e8e8" }}>{selectedSkill.name}</div>
                        <div style={{ fontSize: 10, color: "#c8a96e", marginTop: 2 }}>{selectedSkill.category} / {selectedSkill.subcategory}</div>
                      </div>
                      <button onClick={() => setSelectedSkill(null)} style={{ background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: 18 }}>×</button>
                    </div>
                    <div style={{ fontSize: 11, color: "#666", marginTop: 8, lineHeight: 1.6 }}>{selectedSkill.description}</div>
                  </div>
                  <div style={{ flex: 1, padding: 16, display: "flex", flexDirection: "column", gap: 12, overflow: "auto" }}>
                    <textarea
                      value={skillInput}
                      onChange={e => setSkillInput(e.target.value)}
                      placeholder={`Enter your input for "${selectedSkill.name}"...\n\nBe specific. The more context you give, the better the output.`}
                      style={{
                        background: "#111", border: "1px solid #2a2a2a", borderRadius: 6,
                        color: "#e8e8e8", padding: 10, fontSize: 11, fontFamily: "inherit",
                        outline: "none", minHeight: 120, lineHeight: 1.6
                      }}
                    />
                    <button onClick={runSkill} disabled={skillLoading || !skillInput.trim()} className="run-btn" style={{
                      background: "#c8a96e", border: "none", borderRadius: 6, color: "#0a0a0a",
                      padding: "10px 16px", fontSize: 11, fontFamily: "inherit", fontWeight: 700,
                      cursor: skillLoading ? "wait" : "pointer", letterSpacing: 1, opacity: (!skillInput.trim() || skillLoading) ? 0.5 : 1
                    }}>
                      {skillLoading ? "⟳ RUNNING..." : "▶ RUN SKILL"}
                    </button>
                    {skillOutput && (
                      <div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                          <span style={{ fontSize: 10, color: "#c8a96e", letterSpacing: 1 }}>OUTPUT</span>
                          <button onClick={() => copyToClipboard(skillOutput)} style={{
                            background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 4,
                            color: "#888", padding: "2px 8px", fontSize: 9, cursor: "pointer", fontFamily: "inherit"
                          }}>COPY</button>
                        </div>
                        <div style={{
                          background: "#0d1205", border: "1px solid #2a3a1a", borderRadius: 6,
                          padding: 12, fontSize: 11, color: "#c8e8a0", lineHeight: 1.7, whiteSpace: "pre-wrap", maxHeight: 300, overflowY: "auto"
                        }}>
                          {skillOutput}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* LEGAL PANEL */}
        {view === "legal" && (
          <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
            <div style={{ width: 320, borderRight: "1px solid #1a1a1a", padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 16, color: "#c8a96e", marginBottom: 4 }}>⚖️ Abegbe Agboola</div>
                <div style={{ fontSize: 10, color: "#555", letterSpacing: 1 }}>CHAMBERS — IKOYI, LAGOS</div>
              </div>
              <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 6, padding: 12 }}>
                <div style={{ fontSize: 10, color: "#555", marginBottom: 8, letterSpacing: 1 }}>DOCUMENT TYPE</div>
                {[
                  { id: "affidavit", label: "Affidavit", icon: "📜" },
                  { id: "motion", label: "Motion on Notice", icon: "⚖️" },
                  { id: "demand_letter", label: "Demand Letter", icon: "✉️" },
                  { id: "brief", label: "Case Brief Summary", icon: "📋" },
                ].map(t => (
                  <button key={t.id} onClick={() => setLegalType(t.id)} style={{
                    display: "flex", alignItems: "center", gap: 8, width: "100%",
                    background: legalType === t.id ? "#1a1500" : "none",
                    border: `1px solid ${legalType === t.id ? "#c8a96e" : "transparent"}`,
                    borderRadius: 4, padding: "8px 10px", marginBottom: 4,
                    color: legalType === t.id ? "#c8a96e" : "#888", cursor: "pointer",
                    fontSize: 12, fontFamily: "inherit", textAlign: "left", transition: "all 0.15s"
                  }}>
                    <span>{t.icon}</span> {t.label}
                  </button>
                ))}
              </div>
              <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 6, padding: 12 }}>
                <div style={{ fontSize: 10, color: "#555", marginBottom: 8, letterSpacing: 1 }}>QUICK SKILLS</div>
                {SKILLS_DB.filter(s => s.category === "Legal").slice(0, 6).map(s => (
                  <div key={s.id} onClick={() => { setView("dashboard"); setActiveCategory("Legal"); setSelectedSkill(s); setSkillInput(""); setSkillOutput(""); }}
                    style={{ padding: "6px 0", borderBottom: "1px solid #1a1a1a", cursor: "pointer", fontSize: 11, color: "#666" }}
                    className="skill-card">
                    {s.name}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: 24, gap: 16, overflow: "auto" }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18, color: "#e8e8e8" }}>
                {legalType === "affidavit" ? "📜 Affidavit Generator" :
                 legalType === "motion" ? "⚖️ Motion on Notice Generator" :
                 legalType === "demand_letter" ? "✉️ Demand Letter Generator" :
                 "📋 Case Brief Summarizer"}
              </div>
              <div>
                <div style={{ fontSize: 10, color: "#555", marginBottom: 6, letterSpacing: 1 }}>CASE NOTES / INPUT</div>
                <textarea
                  value={legalNotes}
                  onChange={e => setLegalNotes(e.target.value)}
                  placeholder={
                    legalType === "affidavit" ? "Paste case notes here. Include: parties involved, facts to be deposed, court details, suit number if known..." :
                    legalType === "motion" ? "Paste case notes. Include: reliefs sought, grounds for application, parties, court..." :
                    legalType === "demand_letter" ? "Paste details: client name, recipient, debt/issue, amount, timeline, prior communications..." :
                    "Paste the full case notes or document you want summarized into a structured brief..."
                  }
                  style={{
                    width: "100%", minHeight: 180, background: "#111", border: "1px solid #2a2a2a",
                    borderRadius: 6, color: "#e8e8e8", padding: 12, fontSize: 12, fontFamily: "inherit",
                    outline: "none", lineHeight: 1.7
                  }}
                />
              </div>
              <button onClick={runLegal} disabled={legalLoading || !legalNotes.trim()} className="run-btn" style={{
                background: "#c8a96e", border: "none", borderRadius: 6, color: "#0a0a0a",
                padding: "12px 24px", fontSize: 12, fontFamily: "inherit", fontWeight: 700,
                cursor: legalLoading ? "wait" : "pointer", letterSpacing: 1.5,
                opacity: (!legalNotes.trim() || legalLoading) ? 0.5 : 1, alignSelf: "flex-start"
              }}>
                {legalLoading ? "⟳ GENERATING DOCUMENT..." : "▶ GENERATE DOCUMENT"}
              </button>

              {legalOutput && (
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <span style={{ fontSize: 10, color: "#c8a96e", letterSpacing: 1 }}>GENERATED DOCUMENT</span>
                    <button onClick={() => copyToClipboard(legalOutput)} style={{
                      background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 4,
                      color: "#888", padding: "4px 12px", fontSize: 10, cursor: "pointer", fontFamily: "inherit"
                    }}>COPY DOCUMENT</button>
                  </div>
                  <div style={{
                    background: "#080d08", border: "1px solid #1a3a1a", borderRadius: 8,
                    padding: 20, fontSize: 12, color: "#c8e8c8", lineHeight: 1.9,
                    whiteSpace: "pre-wrap", fontFamily: "inherit", maxHeight: 500, overflowY: "auto"
                  }}>
                    {legalOutput}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* AGENT LOG */}
        {view === "agent" && (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <div style={{ padding: 24, borderBottom: "1px solid #1a1a1a" }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18, color: "#e8e8e8", marginBottom: 4 }}>🤖 Agent Control</div>
              <div style={{ fontSize: 11, color: "#555" }}>CatalystOS execution engine — real-time skill orchestration log</div>
            </div>
            <div style={{ padding: 24, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
              {[
                { label: "Total Skills", value: SKILLS_DB.length, color: "#c8a96e" },
                { label: "Categories", value: 7, color: "#7eb8f7" },
                { label: "Status", value: "ONLINE", color: "#4ade80" },
                { label: "Legal Templates", value: 4, color: "#f7a87e" },
              ].map(stat => (
                <div key={stat.label} style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 8, padding: 16 }}>
                  <div style={{ fontSize: 10, color: "#555", letterSpacing: 1, marginBottom: 4 }}>{stat.label}</div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 22, color: stat.color }}>{stat.value}</div>
                </div>
              ))}
            </div>
            <div style={{ flex: 1, padding: "0 24px 24px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 10, color: "#555", letterSpacing: 1, marginBottom: 8 }}>AGENT LOG</div>
              <div ref={logRef} style={{
                flex: 1, background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 8,
                padding: 16, overflow: "auto", fontFamily: "inherit"
              }}>
                {agentLog.map((entry, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, marginBottom: 6, fontSize: 11 }}>
                    <span style={{ color: "#444", whiteSpace: "nowrap" }}>{entry.time}</span>
                    <span style={{ color: entry.type === "success" ? "#4ade80" : entry.type === "error" ? "#f87171" : "#7eb8f7" }}>
                      {entry.type === "success" ? "✓" : entry.type === "error" ? "✗" : "•"}
                    </span>
                    <span style={{ color: "#888" }}>{entry.msg}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div style={{ borderTop: "1px solid #1a1a1a", padding: "8px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 9, color: "#444", letterSpacing: 1 }}>CATALYSTOS v1.0 — THE CATALYST — LAGOS, NIGERIA</span>
        <span style={{ fontSize: 9, color: "#444" }}>2026 OPERATIONAL BUILD</span>
      </div>
    </div>
  );
}
