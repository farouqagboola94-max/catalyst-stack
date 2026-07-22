import { useState, useEffect, useRef } from "react";

const COLORS = {
  void: "#0a0a0a",
  forge: "#f97316",
  steel: "#dddddd",
  dim: "#555555",
  glow: "rgba(249,115,22,0.15)",
  green: "#22c55e",
  amber: "#f59e0b",
  red: "#ef4444",
  blue: "#3b82f6",
  purple: "#a855f7",
};

const PROVIDERS = [
  {
    id: "nvidia",
    name: "NVIDIA NIM",
    tag: "FREE",
    color: "#76b900",
    models: ["moonshotai/kimi-k2-thinking", "deepseek-ai/deepseek-v3.2", "z-ai/glm4.7", "minimaxai/minimax-m2.7"],
    keyUrl: "https://build.nvidia.com/explore/discover",
    keyPrefix: "nvapi-",
    limit: "Generous free tier",
    best: "Coding + Agent tasks",
  },
  {
    id: "openrouter",
    name: "OpenRouter",
    tag: "FREE TIER",
    color: "#8b5cf6",
    models: ["deepseek/deepseek-r1-0528:free", "google/gemini-2.5-flash:free", "qwen/qwen3-235b:free", "kimi-k2:free"],
    keyUrl: "https://openrouter.ai/keys",
    keyPrefix: "sk-or-v1-",
    limit: "$0 — free models available",
    best: "Variety + fallback routing",
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    tag: "LOW COST",
    color: "#3b82f6",
    models: ["deepseek-chat", "deepseek-reasoner"],
    keyUrl: "https://platform.deepseek.com/api_keys",
    keyPrefix: "sk-",
    limit: "$5 free credits on signup",
    best: "Code + reasoning tasks",
  },
  {
    id: "zai",
    name: "Z.AI (GLM)",
    tag: "FREE",
    color: "#06b6d4",
    models: ["glm-5-plus", "glm-5.1", "glm-4.7-flash"],
    keyUrl: "https://bigmodel.cn/usercenter/apikeys",
    keyPrefix: "sk-",
    limit: "Free tier + $3/mo plan",
    best: "General + fast inference",
  },
];

const ROUTE_TIERS = [
  { tier: "OPUS", desc: "Complex reasoning, architecture", rec: "NVIDIA NIM → kimi-k2-thinking", color: COLORS.forge },
  { tier: "SONNET", desc: "Standard coding & agent tasks", rec: "OpenRouter → deepseek-r1:free", color: COLORS.steel },
  { tier: "HAIKU", desc: "Fast completions, background tasks", rec: "Z.AI → glm-4.7-flash", color: COLORS.dim },
];

const SETUP_STEPS = [
  {
    num: "01",
    title: "Install Claude Code",
    cmd: "npm install -g @anthropic-ai/claude-code",
    note: "Requires Node.js 20+",
  },
  {
    num: "02",
    title: "Install The Proxy",
    cmd: "npm install -g @musistudio/claude-code-router",
    note: "Claude Code Router (CCR) — the switchboard",
  },
  {
    num: "03",
    title: "Get a Free API Key",
    cmd: "# NVIDIA NIM (recommended)\n# Go to build.nvidia.com → Register → API Keys\n# Copy your nvapi-... key",
    note: "NVIDIA NIM gives the most generous free models including Kimi K2",
  },
  {
    num: "04",
    title: "Configure The Router",
    cmd: `# Create config at ~/.claude-code-router/config.json
{
  "providers": [
    {
      "name": "nvidia_nim",
      "apiBase": "https://integrate.api.nvidia.com/v1",
      "apiKey": "nvapi-YOUR_KEY_HERE"
    },
    {
      "name": "open_router",
      "apiBase": "https://openrouter.ai/api/v1",
      "apiKey": "sk-or-v1-YOUR_KEY_HERE"
    }
  ],
  "router": {
    "default": "nvidia_nim/deepseek-ai/deepseek-v3.2",
    "background": "open_router/deepseek/deepseek-r1-0528:free",
    "think": "nvidia_nim/moonshotai/kimi-k2-thinking"
  }
}`,
    note: "Opus → Kimi K2 for heavy reasoning. Sonnet → DeepSeek for code. Haiku → GLM for speed.",
  },
  {
    num: "05",
    title: "Launch The Switchboard",
    cmd: "claude-code-router start",
    note: "Starts the local proxy. Claude Code now routes through it automatically.",
  },
  {
    num: "06",
    title: "Run Claude Code Free",
    cmd: "claude",
    note: "Terminal thinks it's talking to Anthropic. You're running free models.",
  },
];

const CATALYST_CONFIG = `{
  "CATALYST_OS_SWITCHBOARD": {
    "version": "1.0",
    "description": "Free Claude Code Router config for Catalyst OS",
    "providers": [
      {
        "name": "nvidia_nim",
        "apiBase": "https://integrate.api.nvidia.com/v1",
        "apiKey": "nvapi-YOUR_KEY_HERE",
        "comment": "Primary — Free Kimi K2, DeepSeek V3, GLM 4.7"
      },
      {
        "name": "open_router",
        "apiBase": "https://openrouter.ai/api/v1",
        "apiKey": "sk-or-v1-YOUR_KEY_HERE",
        "comment": "Fallback — 200+ models, free tier"
      },
      {
        "name": "zai",
        "apiBase": "https://open.bigmodel.cn/api/paas/v4",
        "apiKey": "YOUR_ZAI_KEY_HERE",
        "comment": "Emergency fallback — GLM-5 free"
      }
    ],
    "router": {
      "default": "nvidia_nim/deepseek-ai/deepseek-v3.2",
      "background": "open_router/deepseek/deepseek-r1-0528:free",
      "think": "nvidia_nim/moonshotai/kimi-k2-thinking",
      "fallback": "zai/glm-5-plus"
    },
    "catalyst_os_notes": {
      "sneakers_fest": "Use kimi-k2-thinking for event strategy + partner outreach drafts",
      "chambers_legal": "Use deepseek-reasoner for document analysis",
      "skill_vault": "Use glm-4.7-flash for fast completions",
      "substack": "Use deepseek-chat for The Great Sabotage drafts",
      "consulting": "Use kimi-k2 for AI Integration Blueprint generation"
    }
  }
}`;

function TerminalBlock({ lines, animate = false }) {
  const [shown, setShown] = useState(animate ? 0 : lines.length);
  useEffect(() => {
    if (!animate) return;
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setShown(i);
      if (i >= lines.length) clearInterval(timer);
    }, 180);
    return () => clearInterval(timer);
  }, [animate, lines.length]);

  return (
    <div style={{
      background: "#0d0d0d",
      border: "1px solid #222",
      borderRadius: "8px",
      padding: "16px",
      fontFamily: "'JetBrains Mono', 'Courier New', monospace",
      fontSize: "12px",
      lineHeight: "1.7",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{ display: "flex", gap: "6px", marginBottom: "12px" }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ef4444" }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#f59e0b" }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#22c55e" }} />
        <span style={{ color: "#444", fontSize: "11px", marginLeft: "8px" }}>claude-code — zsh</span>
      </div>
      {lines.slice(0, shown).map((line, i) => (
        <div key={i} style={{ color: line.startsWith("#") ? "#555" : line.startsWith("$") ? COLORS.forge : COLORS.steel }}>
          {line}
        </div>
      ))}
      {animate && shown < lines.length && (
        <span style={{ color: COLORS.forge, animation: "blink 1s infinite" }}>▊</span>
      )}
    </div>
  );
}

function ProviderCard({ provider, selected, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: selected ? `rgba(${parseInt(provider.color.slice(1, 3), 16)}, ${parseInt(provider.color.slice(3, 5), 16)}, ${parseInt(provider.color.slice(5, 7), 16)}, 0.08)` : "#111",
        border: `1px solid ${selected ? provider.color : "#222"}`,
        borderRadius: "10px",
        padding: "16px",
        cursor: "pointer",
        transition: "all 0.2s",
        boxShadow: selected ? `0 0 20px rgba(${parseInt(provider.color.slice(1, 3), 16)}, ${parseInt(provider.color.slice(3, 5), 16)}, ${parseInt(provider.color.slice(5, 7), 16)}, 0.2)` : "none",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
        <span style={{ color: COLORS.steel, fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", fontWeight: "700" }}>
          {provider.name}
        </span>
        <span style={{
          background: provider.color,
          color: "#000",
          fontSize: "9px",
          padding: "2px 6px",
          borderRadius: "4px",
          fontFamily: "'JetBrains Mono', monospace",
          fontWeight: "700",
          letterSpacing: "0.05em",
        }}>
          {provider.tag}
        </span>
      </div>
      <div style={{ color: "#444", fontSize: "11px", marginBottom: "8px", fontFamily: "'JetBrains Mono', monospace" }}>
        {provider.limit}
      </div>
      <div style={{ color: provider.color, fontSize: "11px", fontFamily: "'JetBrains Mono', monospace" }}>
        ✦ {provider.best}
      </div>
    </div>
  );
}

function SwitchboardDiagram({ activeProvider }) {
  const prov = PROVIDERS.find(p => p.id === activeProvider) || PROVIDERS[0];

  return (
    <div style={{
      background: "#0d0d0d",
      border: "1px solid #1a1a1a",
      borderRadius: "12px",
      padding: "24px",
      textAlign: "center",
      position: "relative",
    }}>
      <div style={{ fontSize: "10px", letterSpacing: "0.2em", color: "#444", marginBottom: "24px", fontFamily: "'JetBrains Mono', monospace" }}>
        THE SWITCHBOARD
      </div>

      {/* Claude Code node */}
      <div style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        background: "#1a1a1a",
        border: "1px solid #333",
        borderRadius: "10px",
        padding: "12px 20px",
        marginBottom: "20px",
      }}>
        <span style={{ fontSize: "18px" }}>✳</span>
        <span style={{ color: COLORS.steel, fontFamily: "'JetBrains Mono', monospace", fontWeight: "700", fontSize: "14px" }}>Claude Code</span>
      </div>

      {/* Arrow down */}
      <div style={{ color: "#333", fontSize: "20px", marginBottom: "8px" }}>↕</div>

      {/* Proxy node */}
      <div style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "48px",
        height: "48px",
        borderRadius: "50%",
        background: "#111",
        border: `2px solid ${COLORS.forge}`,
        boxShadow: `0 0 20px ${COLORS.forge}44`,
        marginBottom: "8px",
        color: COLORS.forge,
        fontSize: "16px",
      }}>⇄</div>

      <div style={{ color: "#333", fontSize: "20px", marginBottom: "20px" }}>↓</div>

      {/* Provider models */}
      <div style={{
        display: "inline-flex",
        flexDirection: "column",
        gap: "8px",
        alignItems: "flex-start",
        background: "#111",
        border: `1px solid ${prov.color}44`,
        borderRadius: "10px",
        padding: "14px 18px",
        minWidth: "200px",
      }}>
        <div style={{ color: prov.color, fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", fontWeight: "700", marginBottom: "4px" }}>
          {prov.name}
        </div>
        {prov.models.slice(0, 3).map((m, i) => (
          <div key={i} style={{ color: "#444", fontFamily: "'JetBrains Mono', monospace", fontSize: "10px" }}>
            → {m.split("/").pop()}
          </div>
        ))}
      </div>

      <div style={{
        position: "absolute",
        top: "50%",
        right: "16px",
        transform: "translateY(-50%)",
        background: "#111",
        border: "1px solid #2a2a2a",
        borderRadius: "8px",
        padding: "8px 12px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "4px",
      }}>
        <div style={{ fontSize: "9px", color: "#555", fontFamily: "'JetBrains Mono', monospace" }}>ANTHROPIC</div>
        <div style={{ fontSize: "9px", color: "#ef444488", fontFamily: "'JetBrains Mono', monospace", textDecoration: "line-through" }}>$$$ / call</div>
        <div style={{ fontSize: "9px", color: COLORS.green, fontFamily: "'JetBrains Mono', monospace" }}>BYPASSED</div>
      </div>
    </div>
  );
}

export default function CatalystSwitchboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedProvider, setSelectedProvider] = useState("nvidia");
  const [activeStep, setActiveStep] = useState(0);
  const [configCopied, setConfigCopied] = useState(false);
  const [stepCopied, setStepCopied] = useState(null);

  const tabs = [
    { id: "overview", label: "OVERVIEW" },
    { id: "setup", label: "SETUP" },
    { id: "providers", label: "PROVIDERS" },
    { id: "config", label: "OS CONFIG" },
  ];

  const copyCmd = (text, id) => {
    navigator.clipboard.writeText(text);
    if (id === "config") {
      setConfigCopied(true);
      setTimeout(() => setConfigCopied(false), 2000);
    } else {
      setStepCopied(id);
      setTimeout(() => setStepCopied(null), 2000);
    }
  };

  return (
    <div style={{
      background: COLORS.void,
      minHeight: "100vh",
      color: COLORS.steel,
      fontFamily: "'DM Sans', system-ui, sans-serif",
      padding: "0",
      position: "relative",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700&family=JetBrains+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: #222; border-radius: 2px; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes pulse-ring { 0% { transform: scale(1); opacity: 0.5; } 100% { transform: scale(1.8); opacity: 0; } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.4s ease forwards; }
      `}</style>

      {/* Header */}
      <div style={{
        borderBottom: "1px solid #111",
        padding: "20px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        background: COLORS.void,
        zIndex: 100,
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ color: COLORS.forge, fontSize: "18px" }}>⚡</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: "700", fontSize: "13px", letterSpacing: "0.1em", color: COLORS.steel }}>
              CATALYST OS
            </span>
            <span style={{ color: "#333", fontFamily: "'JetBrains Mono', monospace", fontSize: "13px" }}>/</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", color: COLORS.forge }}>THE SWITCHBOARD</span>
          </div>
          <div style={{ color: "#444", fontSize: "11px", marginTop: "4px", fontFamily: "'JetBrains Mono', monospace" }}>
            Free Claude Code Router — Module v1.0
          </div>
        </div>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          background: "#111",
          border: "1px solid #1a1a1a",
          borderRadius: "20px",
          padding: "6px 12px",
        }}>
          <div style={{
            width: 8, height: 8, borderRadius: "50%", background: COLORS.green,
            boxShadow: `0 0 8px ${COLORS.green}`,
            position: "relative",
          }}>
            <div style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              background: COLORS.green,
              animation: "pulse-ring 2s ease-out infinite",
            }} />
          </div>
          <span style={{ color: COLORS.green, fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.1em" }}>
            LIVE
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: "flex",
        borderBottom: "1px solid #111",
        padding: "0 24px",
        gap: "0",
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              background: "none",
              border: "none",
              borderBottom: `2px solid ${activeTab === tab.id ? COLORS.forge : "transparent"}`,
              color: activeTab === tab.id ? COLORS.forge : "#444",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "11px",
              letterSpacing: "0.1em",
              padding: "14px 16px",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: "24px", maxWidth: "800px", margin: "0 auto" }} className="fade-up">

        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Hero */}
            <div style={{
              background: "linear-gradient(135deg, #111 0%, #0d0d0d 100%)",
              border: `1px solid ${COLORS.forge}22`,
              borderRadius: "12px",
              padding: "28px",
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "20px", flexWrap: "wrap" }}>
                <div>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "9px",
                    letterSpacing: "0.3em",
                    color: COLORS.forge,
                    marginBottom: "8px",
                  }}>FREE · FOREVER</div>
                  <h1 style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "32px",
                    fontWeight: "700",
                    color: COLORS.steel,
                    lineHeight: "1.1",
                    marginBottom: "12px",
                  }}>
                    Run Claude Code<br />at zero cost.
                  </h1>
                  <p style={{ color: "#555", fontSize: "14px", lineHeight: "1.6", maxWidth: "400px" }}>
                    A proxy layer that intercepts Claude Code's API calls and silently reroutes them to free models. Your terminal still thinks it's talking to Anthropic.
                  </p>
                </div>
                <div style={{
                  background: "#0d0d0d",
                  border: "1px solid #1a1a1a",
                  borderRadius: "10px",
                  padding: "16px 20px",
                  minWidth: "160px",
                }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: "#444", marginBottom: "12px", letterSpacing: "0.15em" }}>TRACTION</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "36px", color: COLORS.steel, fontWeight: "700" }}>$0</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#444" }}>per month running cost</div>
                </div>
              </div>
            </div>

            {/* What it does */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              {[
                { icon: "⇄", title: "Silent Reroute", desc: "Claude Code's Anthropic calls intercepted at the proxy layer. No config changes needed in Claude Code itself." },
                { icon: "⚡", title: "Multi-Model", desc: "Route Opus calls to Kimi K2, Sonnet to DeepSeek, Haiku to GLM. Tier-based routing out of the box." },
                { icon: "🛡", title: "No Breaking Changes", desc: "Claude Code still behaves identically. All tool calls, streaming, and agent loops work normally." },
                { icon: "🌍", title: "Free Key Sources", desc: "NVIDIA NIM (build.nvidia.com) and OpenRouter both offer free tiers with strong models." },
              ].map((item, i) => (
                <div key={i} style={{
                  background: "#0d0d0d",
                  border: "1px solid #1a1a1a",
                  borderRadius: "10px",
                  padding: "18px",
                }}>
                  <div style={{ fontSize: "20px", marginBottom: "10px" }}>{item.icon}</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: COLORS.forge, fontWeight: "700", marginBottom: "8px" }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: "13px", color: "#555", lineHeight: "1.5" }}>{item.desc}</div>
                </div>
              ))}
            </div>

            {/* Route tiers */}
            <div style={{ background: "#0d0d0d", border: "1px solid #1a1a1a", borderRadius: "12px", padding: "20px" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#444", letterSpacing: "0.15em", marginBottom: "16px" }}>
                ROUTING LOGIC
              </div>
              {ROUTE_TIERS.map((t, i) => (
                <div key={i} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "12px 0",
                  borderBottom: i < ROUTE_TIERS.length - 1 ? "1px solid #151515" : "none",
                }}>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "11px",
                    color: t.color,
                    fontWeight: "700",
                    minWidth: "60px",
                  }}>{t.tier}</div>
                  <div style={{ flex: 1, color: "#555", fontSize: "12px" }}>{t.desc}</div>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "10px",
                    color: t.color,
                    background: `${t.color}11`,
                    border: `1px solid ${t.color}22`,
                    borderRadius: "4px",
                    padding: "4px 8px",
                  }}>{t.rec}</div>
                </div>
              ))}
            </div>

            {/* Diagram */}
            <SwitchboardDiagram activeProvider={selectedProvider} />
          </div>
        )}

        {/* SETUP TAB */}
        {activeTab === "setup" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px",
              color: "#444",
              letterSpacing: "0.2em",
              marginBottom: "4px",
            }}>
              INSTALL SEQUENCE — 6 STEPS
            </div>
            {SETUP_STEPS.map((step, i) => (
              <div
                key={i}
                onClick={() => setActiveStep(i === activeStep ? -1 : i)}
                style={{
                  background: activeStep === i ? "#0d0d0d" : "#080808",
                  border: `1px solid ${activeStep === i ? COLORS.forge + "44" : "#111"}`,
                  borderRadius: "10px",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                <div style={{
                  padding: "16px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                }}>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "12px",
                    color: activeStep === i ? COLORS.forge : "#333",
                    fontWeight: "700",
                    minWidth: "28px",
                  }}>{step.num}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "14px", color: activeStep === i ? COLORS.steel : "#555", fontWeight: "500" }}>
                      {step.title}
                    </div>
                    {activeStep !== i && (
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#333", marginTop: "4px" }}>
                        {step.cmd.split("\n")[0].substring(0, 50)}...
                      </div>
                    )}
                  </div>
                  <div style={{ color: activeStep === i ? COLORS.forge : "#333", fontSize: "12px" }}>
                    {activeStep === i ? "▲" : "▼"}
                  </div>
                </div>

                {activeStep === i && (
                  <div style={{ padding: "0 20px 20px" }}>
                    <div style={{ position: "relative" }}>
                      <pre style={{
                        background: "#050505",
                        border: "1px solid #1a1a1a",
                        borderRadius: "8px",
                        padding: "16px",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "11px",
                        color: COLORS.steel,
                        lineHeight: "1.6",
                        overflow: "auto",
                        whiteSpace: "pre-wrap",
                      }}>{step.cmd}</pre>
                      <button
                        onClick={(e) => { e.stopPropagation(); copyCmd(step.cmd, i); }}
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "8px",
                          background: stepCopied === i ? COLORS.green + "22" : "#111",
                          border: `1px solid ${stepCopied === i ? COLORS.green : "#222"}`,
                          borderRadius: "4px",
                          padding: "4px 8px",
                          color: stepCopied === i ? COLORS.green : "#444",
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "9px",
                          cursor: "pointer",
                          letterSpacing: "0.1em",
                        }}
                      >
                        {stepCopied === i ? "COPIED" : "COPY"}
                      </button>
                    </div>
                    <div style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "8px",
                      marginTop: "12px",
                      padding: "10px 14px",
                      background: COLORS.forge + "0a",
                      border: `1px solid ${COLORS.forge}22`,
                      borderRadius: "6px",
                    }}>
                      <span style={{ color: COLORS.forge, fontSize: "11px" }}>↳</span>
                      <span style={{ color: "#666", fontSize: "12px" }}>{step.note}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* PROVIDERS TAB */}
        {activeTab === "providers" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {PROVIDERS.map(p => (
                <ProviderCard
                  key={p.id}
                  provider={p}
                  selected={selectedProvider === p.id}
                  onClick={() => setSelectedProvider(p.id)}
                />
              ))}
            </div>

            {/* Selected provider detail */}
            {(() => {
              const prov = PROVIDERS.find(p => p.id === selectedProvider);
              return (
                <div style={{
                  background: "#0d0d0d",
                  border: `1px solid ${prov.color}33`,
                  borderRadius: "12px",
                  padding: "20px",
                }}>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "16px",
                  }}>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", color: prov.color, fontWeight: "700" }}>
                      {prov.name} — Available Models
                    </div>
                    <a
                      href={prov.keyUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        background: prov.color,
                        color: "#000",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "10px",
                        padding: "6px 12px",
                        borderRadius: "4px",
                        textDecoration: "none",
                        fontWeight: "700",
                        letterSpacing: "0.05em",
                      }}
                    >
                      GET KEY →
                    </a>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {prov.models.map((m, i) => (
                      <div key={i} style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "10px 14px",
                        background: "#0a0a0a",
                        border: "1px solid #151515",
                        borderRadius: "6px",
                      }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: prov.color, flexShrink: 0 }} />
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: COLORS.steel }}>
                          {m}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div style={{
                    marginTop: "16px",
                    padding: "12px 14px",
                    background: "#0a0a0a",
                    border: "1px solid #151515",
                    borderRadius: "6px",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "11px",
                    color: "#444",
                  }}>
                    <span style={{ color: prov.color }}>API_KEY=</span>
                    <span style={{ color: "#555" }}>{prov.keyPrefix}</span>
                    <span style={{ color: "#333" }}>••••••••••••••••••••</span>
                  </div>
                </div>
              );
            })()}

            {/* Recommendation */}
            <div style={{
              background: COLORS.forge + "0d",
              border: `1px solid ${COLORS.forge}22`,
              borderRadius: "10px",
              padding: "16px 20px",
            }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: COLORS.forge, marginBottom: "8px", letterSpacing: "0.1em" }}>
                CATALYST OS RECOMMENDATION
              </div>
              <div style={{ fontSize: "13px", color: "#666", lineHeight: "1.6" }}>
                Stack <strong style={{ color: COLORS.steel }}>NVIDIA NIM</strong> as primary (Kimi K2 for heavy tasks) + <strong style={{ color: COLORS.steel }}>OpenRouter</strong> as fallback (200+ free models). This gives you 85–95% of paid Claude performance at zero monthly cost. Both accept a single free API key with no credit card.
              </div>
            </div>
          </div>
        )}

        {/* OS CONFIG TAB */}
        {activeTab === "config" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{
              background: "#0d0d0d",
              border: `1px solid ${COLORS.forge}22`,
              borderRadius: "12px",
              overflow: "hidden",
            }}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px 20px",
                borderBottom: "1px solid #111",
              }}>
                <div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: COLORS.forge, fontWeight: "700" }}>
                    CatalystOS_Switchboard_config.json
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#444", marginTop: "2px" }}>
                    ~/.claude-code-router/config.json
                  </div>
                </div>
                <button
                  onClick={() => copyCmd(CATALYST_CONFIG, "config")}
                  style={{
                    background: configCopied ? COLORS.green + "22" : "#111",
                    border: `1px solid ${configCopied ? COLORS.green : "#222"}`,
                    borderRadius: "6px",
                    padding: "8px 14px",
                    color: configCopied ? COLORS.green : "#555",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "10px",
                    cursor: "pointer",
                    letterSpacing: "0.1em",
                    transition: "all 0.2s",
                  }}
                >
                  {configCopied ? "✓ COPIED" : "COPY CONFIG"}
                </button>
              </div>
              <pre style={{
                padding: "20px",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "11px",
                lineHeight: "1.8",
                color: COLORS.steel,
                overflow: "auto",
                whiteSpace: "pre-wrap",
              }}>
                {CATALYST_CONFIG.split("\n").map((line, i) => {
                  if (line.includes('"comment"')) return <span key={i} style={{ color: "#444" }}>{line}{"\n"}</span>;
                  if (line.includes('"CATALYST_OS') || line.includes('"version"') || line.includes('"description"')) return <span key={i} style={{ color: COLORS.forge }}>{line}{"\n"}</span>;
                  if (line.match(/"(providers|router|catalyst_os_notes)"/)) return <span key={i} style={{ color: "#a855f7" }}>{line}{"\n"}</span>;
                  if (line.match(/"(sneakers_fest|chambers_legal|skill_vault|substack|consulting)"/)) return <span key={i} style={{ color: COLORS.amber }}>{line}{"\n"}</span>;
                  return <span key={i}>{line}{"\n"}</span>;
                })}
              </pre>
            </div>

            {/* Catalyst OS specific use cases */}
            <div style={{ background: "#0d0d0d", border: "1px solid #111", borderRadius: "12px", padding: "20px" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#444", letterSpacing: "0.15em", marginBottom: "16px" }}>
                CATALYST OS — PROJECT ROUTING
              </div>
              {[
                { project: "SNEAKERS FEST 2026", model: "kimi-k2-thinking", via: "NVIDIA NIM", reason: "Event strategy, partner outreach, sponsorship docs need deep reasoning." },
                { project: "CHAMBERS LEGAL AI", model: "deepseek-reasoner", via: "DeepSeek", reason: "Document analysis, clause comparison, legal memo drafts." },
                { project: "SKILL VAULT", model: "glm-4.7-flash", via: "Z.AI", reason: "Fast completions for skill chaining and quick code generation." },
                { project: "GREAT SABOTAGE", model: "deepseek-chat", via: "DeepSeek", reason: "Long-form writing drafts, outline generation, essay expansion." },
                { project: "AI CONSULTING OS", model: "kimi-k2-thinking", via: "NVIDIA NIM", reason: "AI Integration Blueprint generation, client strategy docs." },
              ].map((item, i) => (
                <div key={i} style={{
                  padding: "14px 0",
                  borderBottom: i < 4 ? "1px solid #0f0f0f" : "none",
                  display: "grid",
                  gridTemplateColumns: "140px 1fr",
                  gap: "16px",
                }}>
                  <div>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: COLORS.forge, fontWeight: "700" }}>
                      {item.project}
                    </div>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: "#444", marginTop: "4px" }}>
                      {item.model}
                    </div>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: "#333", marginTop: "2px" }}>
                      via {item.via}
                    </div>
                  </div>
                  <div style={{ fontSize: "12px", color: "#555", lineHeight: "1.5" }}>
                    {item.reason}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick commands */}
            <div style={{ background: "#0d0d0d", border: "1px solid #111", borderRadius: "12px", padding: "20px" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#444", letterSpacing: "0.15em", marginBottom: "16px" }}>
                QUICK COMMANDS
              </div>
              {[
                { cmd: "claude-code-router start", desc: "Launch the switchboard" },
                { cmd: "claude-code-router status", desc: "Check active provider + routing" },
                { cmd: "claude-code-router stop", desc: "Stop the proxy" },
                { cmd: "claude", desc: "Run Claude Code (routes through proxy automatically)" },
              ].map((item, i) => (
                <div key={i} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "10px 0",
                  borderBottom: i < 3 ? "1px solid #0f0f0f" : "none",
                }}>
                  <code style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "11px",
                    color: COLORS.steel,
                    background: "#050505",
                    border: "1px solid #1a1a1a",
                    borderRadius: "4px",
                    padding: "4px 10px",
                    minWidth: "200px",
                  }}>{item.cmd}</code>
                  <span style={{ color: "#444", fontSize: "12px" }}>{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{
        borderTop: "1px solid #0d0d0d",
        padding: "16px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "24px",
      }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: "#222", letterSpacing: "0.1em" }}>
          CATALYST OS · THE SWITCHBOARD · FREE CLAUDE CODE MODULE
        </div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: "#222" }}>
          Source: Alishahryar1/free-claude-code · Devini Labs
        </div>
      </div>
    </div>
  );
}
