import { useState, useRef, useEffect } from "react";

const INITIAL_SKILLS = [
  {
    id: 1,
    number: "01",
    name: "DEBUGGING SKILL",
    repo: "/AlmogBaku/debug-skill",
    tag: "debugging",
    description: "Use when you're stuck on a bug. Gives real breakpoints, lets you step through execution line by line, and inspect live variable state.",
    activators: ["debug this", "set a breakpoint", "step through this"],
    color: "#FFD600",
    systemPrompt: `You are an expert debugging assistant. When given code or a bug description:
1. Identify the root cause systematically
2. Set up conceptual breakpoints and walk through execution line by line
3. Inspect variable states at each step
4. Propose a minimal, surgical fix
5. Explain WHY the bug occurred so it never happens again
Be direct, technical, and precise. No fluff.`,
  },
  {
    id: 2,
    number: "02",
    name: "SECURE CODE GUARDIAN",
    repo: "/skills/security/secure-code-guardian/",
    tag: "security",
    description: "Building anything with auth, passwords, or user input? This writes secure code from the jump. No vulnerabilities you'll regret later.",
    activators: ["secure this", "authentication", "JWT", "OWASP"],
    color: "#FF4444",
    systemPrompt: `You are a security-first code guardian. Apply OWASP principles to everything:
1. Audit code for injection attacks, XSS, CSRF, broken auth, insecure data exposure
2. Enforce proper JWT implementation, bcrypt hashing, input sanitization
3. Write secure-by-default code — no shortcuts
4. Flag every vulnerability with severity level: CRITICAL / HIGH / MEDIUM / LOW
5. Provide hardened rewrites, not just advice
Zero tolerance for security debt.`,
  },
  {
    id: 3,
    number: "03",
    name: "FEATURE FORGE",
    repo: "/skills/workflow/feature-forge/",
    tag: "planning",
    description: "Use before you write a single line of code. Asks the right questions, thinks like both a PM and a dev, hands you a full spec with requirements and acceptance criteria.",
    activators: ["define feature", "write spec for...", "requirements"],
    color: "#00C2FF",
    systemPrompt: `You are a hybrid PM/dev thinking in systems. Before any code gets written:
1. Ask clarifying questions about user needs, edge cases, constraints
2. Define functional requirements (what it does)
3. Define non-functional requirements (performance, security, scale)
4. Write clear acceptance criteria (Given/When/Then format)
5. Identify dependencies and risks upfront
6. Hand off a complete spec document
Think in first principles. Challenge assumptions. Ship clarity.`,
  },
  {
    id: 4,
    number: "04",
    name: "CODE REVIEWER",
    repo: "/skills/quality/code-reviewer/",
    tag: "quality",
    description: "Use before you open a PR. Gives a full structured review: what's broken, what's risky, what's messy, and what you actually got right.",
    activators: ["review this code", "check this PR", "code quality"],
    color: "#9B59B6",
    systemPrompt: `You are a senior code reviewer with zero tolerance for mediocrity. Structure every review as:
🔴 BROKEN: Things that will fail in production
🟠 RISKY: Things that could fail under pressure
🟡 MESSY: Code smell, readability, maintainability issues
🟢 SOLID: What was done right (be honest, not generous)
Then provide: refactored snippets for critical issues, architecture suggestions, and a SHIP / REVISE / REJECT verdict.
Be honest. Junior devs need truth, not validation.`,
  },
  {
    id: 5,
    number: "05",
    name: "PLAYWRIGHT SKILL",
    repo: "/testdino-hq/playwright-skill",
    tag: "testing",
    description: "Use before you write any implementation code. Walks you through the full TDD cycle: write the failing test, watch it fail, then write just enough to pass it.",
    activators: ["test this feature", "write playwright tests", "TDD cycle"],
    color: "#00D68F",
    systemPrompt: `You are a TDD enforcer using Playwright. The cycle is sacred:
1. Write the failing test FIRST (describe the behavior, not implementation)
2. Run it — confirm it fails for the right reason
3. Write the MINIMUM code to make it pass
4. Refactor without breaking the test
5. Repeat
For every feature: write page object models, handle async properly, test happy paths AND edge cases. No implementation code without a test first. Ever.`,
  },
  {
    id: 6,
    number: "06",
    name: "RAG ARCHITECT",
    repo: "/skills/data-ml/rag-architect/",
    tag: "AI/infra",
    description: "Building anything with vector search or a knowledge base? Designs the whole pipeline for you. Chunking, embeddings, retrieval, reranking, done.",
    activators: ["design a RAG system", "vector search", "embeddings"],
    color: "#FF8C00",
    systemPrompt: `You are an AI infrastructure architect specializing in RAG systems. Design every pipeline with:
1. Chunking strategy (size, overlap, semantic vs fixed)
2. Embedding model selection (cost vs quality tradeoffs)
3. Vector store choice (Pinecone, Weaviate, pgvector, Chroma — with reasoning)
4. Retrieval strategy (dense, sparse, hybrid)
5. Reranking layer (cross-encoder models)
6. Context window optimization
7. Evaluation metrics (MRR, NDCG, faithfulness, relevance)
Build systems that don't hallucinate. Build systems that scale.`,
  },
  {
    id: 7,
    number: "07",
    name: "THE FOOL",
    repo: "/skills/workflow/the-fool/",
    tag: "critical thinking",
    description: "Use before you commit to any big decision or architecture choice. Challenges your thinking from 5 different angles: devil's advocate, red team, pre-mortem and more.",
    activators: ["challenge this", "poke holes in my plan", "stress test", "red team"],
    color: "#E74C3C",
    systemPrompt: `You are The Fool — a ruthless critical thinker who stress-tests decisions before they're made. Attack from 5 angles:
1. 😈 DEVIL'S ADVOCATE: Argue the opposite position with full conviction
2. 🔴 RED TEAM: Find how this fails, gets hacked, or gets exploited
3. 💀 PRE-MORTEM: It's 12 months from now and this failed. What happened?
4. 🪞 BLIND SPOT DETECTOR: What assumptions is this built on that might be wrong?
5. ⚖️ STEEL MAN: The strongest version of the counterargument
Finish with: PROCEED / MODIFY / ABANDON and why. The goal is clarity, not paralysis.`,
  },
  {
    id: 8,
    number: "08",
    name: "SPEC MINER",
    repo: "/skills/workflow/spec-miner/",
    tag: "legacy",
    description: "When you've inherited code with zero documentation. Reads everything, traces the data flows, and writes the spec that should've been there from day one.",
    activators: ["reverse engineer this", "document this codebase", "understand existing system"],
    color: "#1ABC9C",
    systemPrompt: `You are a codebase archaeologist. When given undocumented code:
1. Map the entry points and main execution paths
2. Trace data flows from input to output
3. Identify all side effects and external dependencies
4. Reverse engineer the business logic (what was the original intent?)
5. Document: Architecture Overview, Module Breakdown, Data Flow Diagram (text-based), API contracts, Known Risks
Output a spec so clear that a new developer could maintain it confidently on day 1. Leave no mystery.`,
  },
  {
    id: 9,
    number: "09",
    name: "GIT WORKTREES",
    repo: "/skills/using-git-worktrees/",
    tag: "workflow",
    description: "Use when you need to work on multiple branches at once. Creates isolated workspaces so you never lose your current context switching between them.",
    activators: ["set up a worktree", "isolate this feature"],
    color: "#3498DB",
    systemPrompt: `You are a Git workflow expert specializing in worktrees. Help developers:
1. Set up worktrees for parallel feature development
2. Structure the worktree directory layout cleanly
3. Manage shared vs isolated configs across worktrees
4. Handle dependency installation per worktree
5. Clean up worktrees safely when done
6. Integrate with CI/CD pipelines
Provide exact git commands, directory structures, and shell scripts. No hand-waving. Show the actual workflow.`,
  },
];

const TAG_COLORS = {
  debugging: "#FFD600",
  security: "#FF4444",
  planning: "#00C2FF",
  quality: "#9B59B6",
  testing: "#00D68F",
  "AI/infra": "#FF8C00",
  "critical thinking": "#E74C3C",
  legacy: "#1ABC9C",
  workflow: "#3498DB",
  custom: "#FF69B4",
};

export default function CatalystSkillVault() {
  const [skills, setSkills] = useState(INITIAL_SKILLS);
  const [activeSkill, setActiveSkill] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("vault"); // vault | chat | add
  const [newSkill, setNewSkill] = useState({
    name: "", tag: "", description: "", activators: "", systemPrompt: ""
  });
  const [filter, setFilter] = useState("all");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const activateSkill = (skill) => {
    setActiveSkill(skill);
    setMessages([
      {
        role: "assistant",
        content: `**${skill.name}** activated.\n\nI'm running with the ${skill.tag} skill loaded. ${skill.description}\n\nActivate with: ${skill.activators.map(a => `\`${a}\``).join(" · ")}\n\nWhat do you need?`,
      },
    ]);
    setView("chat");
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const apiMessages = updatedMessages
        .filter((m) => m.role !== "system")
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: activeSkill?.systemPrompt || "You are a helpful assistant.",
          messages: apiMessages,
        }),
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "No response.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (e) {
      setMessages((prev) => [...prev, { role: "assistant", content: "Error connecting. Try again." }]);
    }
    setLoading(false);
  };

  const addCustomSkill = () => {
    if (!newSkill.name || !newSkill.description) return;
    const skill = {
      id: Date.now(),
      number: String(skills.length + 1).padStart(2, "0"),
      name: newSkill.name.toUpperCase(),
      repo: "/custom/user-defined",
      tag: newSkill.tag || "custom",
      description: newSkill.description,
      activators: newSkill.activators.split(",").map(a => a.trim()).filter(Boolean),
      color: TAG_COLORS[newSkill.tag] || "#FF69B4",
      systemPrompt: newSkill.systemPrompt || `You are an expert assistant for: ${newSkill.name}. ${newSkill.description}`,
    };
    setSkills((prev) => [...prev, skill]);
    setNewSkill({ name: "", tag: "", description: "", activators: "", systemPrompt: "" });
    setView("vault");
  };

  const allTags = ["all", ...Array.from(new Set(skills.map(s => s.tag)))];
  const filteredSkills = filter === "all" ? skills : skills.filter(s => s.tag === filter);

  const formatMessage = (content) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/`(.*?)`/g, '<code style="background:#1a1a0a;padding:2px 6px;border-radius:3px;font-family:monospace;color:#FFD600;font-size:0.85em">$1</code>')
      .replace(/\n/g, '<br/>');
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0d0d05",
      backgroundImage: "repeating-linear-gradient(90deg, rgba(255,214,0,0.03) 0px, rgba(255,214,0,0.03) 1px, transparent 1px, transparent 40px)",
      fontFamily: "'Courier New', monospace",
      color: "#e8e8d0",
    }}>
      {/* Header */}
      <div style={{
        borderBottom: "1px solid rgba(255,214,0,0.2)",
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "rgba(0,0,0,0.4)",
        backdropFilter: "blur(10px)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: 32, height: 32,
            background: "#FFD600",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 900, color: "#000", fontSize: 14,
          }}>⚡</div>
          <div>
            <div style={{ fontWeight: 900, fontSize: 16, color: "#FFD600", letterSpacing: 2 }}>CATALYST SKILL VAULT</div>
            <div style={{ fontSize: 10, color: "#666", letterSpacing: 1 }}>{skills.length} SKILLS LOADED · PERSONAL BUILD</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {["vault", "add"].map(v => (
            <button key={v} onClick={() => setView(v)} style={{
              padding: "6px 14px",
              background: view === v ? "#FFD600" : "transparent",
              border: "1px solid rgba(255,214,0,0.4)",
              color: view === v ? "#000" : "#FFD600",
              cursor: "pointer",
              fontFamily: "inherit",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 1,
            }}>
              {v === "vault" ? "⚡ VAULT" : "+ ADD SKILL"}
            </button>
          ))}
          {activeSkill && (
            <button onClick={() => setView("chat")} style={{
              padding: "6px 14px",
              background: view === "chat" ? activeSkill.color : "transparent",
              border: `1px solid ${activeSkill.color}`,
              color: view === "chat" ? "#000" : activeSkill.color,
              cursor: "pointer",
              fontFamily: "inherit",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 1,
            }}>
              ● {activeSkill.name.split(" ")[0]}
            </button>
          )}
        </div>
      </div>

      {/* VAULT VIEW */}
      {view === "vault" && (
        <div style={{ padding: "24px", maxWidth: 1200, margin: "0 auto" }}>
          {/* Filter tags */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
            {allTags.map(tag => (
              <button key={tag} onClick={() => setFilter(tag)} style={{
                padding: "4px 12px",
                background: filter === tag ? (TAG_COLORS[tag] || "#FFD600") : "transparent",
                border: `1px solid ${TAG_COLORS[tag] || "rgba(255,214,0,0.3)"}`,
                color: filter === tag ? "#000" : (TAG_COLORS[tag] || "#FFD600"),
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: 1,
              }}>
                {tag.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Skill grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 16,
          }}>
            {filteredSkills.map(skill => (
              <div key={skill.id} style={{
                background: "rgba(255,255,255,0.02)",
                border: `1px solid rgba(255,255,255,0.07)`,
                position: "relative",
                overflow: "hidden",
                transition: "all 0.2s",
                cursor: "pointer",
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.border = `1px solid ${skill.color}`;
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.border = "1px solid rgba(255,255,255,0.07)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                }}
                onClick={() => activateSkill(skill)}
              >
                {/* Color accent bar */}
                <div style={{ height: 3, background: skill.color, width: "100%" }} />

                <div style={{ padding: "20px" }}>
                  {/* Number + name */}
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 12 }}>
                    <div style={{
                      width: 36, height: 36,
                      background: "#fff",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: 900, color: "#000", fontSize: 13,
                      flexShrink: 0,
                    }}>{skill.number}</div>
                    <div style={{ fontWeight: 900, fontSize: 15, color: skill.color, letterSpacing: 1, lineHeight: 1.2 }}>
                      {skill.name}
                    </div>
                  </div>

                  {/* Repo */}
                  <div style={{
                    fontSize: 10, color: "#555", fontFamily: "monospace",
                    marginBottom: 12, display: "flex", alignItems: "center", gap: 6
                  }}>
                    <span>⬡</span> {skill.repo}
                  </div>

                  {/* Description */}
                  <div style={{ fontSize: 12, color: "#aaa", lineHeight: 1.6, marginBottom: 16 }}>
                    {skill.description}
                  </div>

                  {/* Tag + activate button */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{
                      fontSize: 9, fontWeight: 700, letterSpacing: 1,
                      color: skill.color, border: `1px solid ${skill.color}`,
                      padding: "2px 8px",
                    }}>
                      #{skill.tag.toUpperCase()}
                    </span>
                    <div style={{
                      fontSize: 11, color: skill.color, fontWeight: 700,
                      display: "flex", alignItems: "center", gap: 4,
                    }}>
                      ACTIVATE ▶
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Add skill CTA card */}
            <div onClick={() => setView("add")} style={{
              background: "transparent",
              border: "1px dashed rgba(255,214,0,0.2)",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              padding: 40, cursor: "pointer", gap: 12,
              minHeight: 200,
              transition: "all 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.border = "1px dashed #FFD600"}
              onMouseLeave={e => e.currentTarget.style.border = "1px dashed rgba(255,214,0,0.2)"}
            >
              <div style={{ fontSize: 32, color: "rgba(255,214,0,0.4)" }}>+</div>
              <div style={{ fontSize: 11, color: "rgba(255,214,0,0.5)", fontWeight: 700, letterSpacing: 2 }}>BUILD NEW SKILL</div>
            </div>
          </div>
        </div>
      )}

      {/* CHAT VIEW */}
      {view === "chat" && activeSkill && (
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "24px", display: "flex", flexDirection: "column", height: "calc(100vh - 70px)" }}>
          {/* Skill header */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "12px 16px",
            background: "rgba(0,0,0,0.3)",
            border: `1px solid ${activeSkill.color}`,
            marginBottom: 16,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 8, height: 8, background: activeSkill.color, borderRadius: "50%", animation: "pulse 2s infinite" }} />
              <span style={{ color: activeSkill.color, fontWeight: 900, fontSize: 13, letterSpacing: 1 }}>{activeSkill.name}</span>
              <span style={{ color: "#444", fontSize: 11 }}>#{activeSkill.tag}</span>
            </div>
            <button onClick={() => setView("vault")} style={{
              background: "transparent", border: "none", color: "#555", cursor: "pointer", fontSize: 12, fontFamily: "inherit",
            }}>← BACK TO VAULT</button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12, paddingBottom: 16 }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                display: "flex",
                justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              }}>
                <div style={{
                  maxWidth: "80%",
                  padding: "12px 16px",
                  background: msg.role === "user"
                    ? `rgba(${parseInt(activeSkill.color.slice(1, 3), 16)}, ${parseInt(activeSkill.color.slice(3, 5), 16)}, ${parseInt(activeSkill.color.slice(5, 7), 16)}, 0.15)`
                    : "rgba(255,255,255,0.04)",
                  border: msg.role === "user"
                    ? `1px solid ${activeSkill.color}40`
                    : "1px solid rgba(255,255,255,0.08)",
                  fontSize: 13,
                  lineHeight: 1.7,
                  color: msg.role === "user" ? "#e8e8d0" : "#c8c8b0",
                }}>
                  {msg.role === "assistant" && (
                    <div style={{ fontSize: 9, color: activeSkill.color, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>
                      ● {activeSkill.name}
                    </div>
                  )}
                  <div dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }} />
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", gap: 4, padding: "12px 16px" }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{
                    width: 6, height: 6, background: activeSkill.color, borderRadius: "50%",
                    animation: `bounce 1s ${i * 0.2}s infinite`,
                  }} />
                ))}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Activator chips */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
            {activeSkill.activators.map((a, i) => (
              <button key={i} onClick={() => setInput(a)} style={{
                padding: "3px 10px",
                background: "transparent",
                border: `1px solid ${activeSkill.color}40`,
                color: activeSkill.color,
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: 10,
                fontWeight: 700,
              }}>
                {a}
              </button>
            ))}
          </div>

          {/* Input */}
          <div style={{ display: "flex", gap: 8 }}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
              }}
              placeholder={`Activate: "${activeSkill.activators[0]}" ...`}
              rows={3}
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${activeSkill.color}40`,
                color: "#e8e8d0",
                padding: "10px 14px",
                fontFamily: "inherit",
                fontSize: 13,
                resize: "none",
                outline: "none",
              }}
            />
            <button onClick={sendMessage} disabled={loading || !input.trim()} style={{
              padding: "0 20px",
              background: loading || !input.trim() ? "rgba(255,214,0,0.2)" : activeSkill.color,
              border: "none",
              color: "#000",
              cursor: loading || !input.trim() ? "not-allowed" : "pointer",
              fontFamily: "inherit",
              fontSize: 16,
              fontWeight: 900,
            }}>▶</button>
          </div>
        </div>
      )}

      {/* ADD SKILL VIEW */}
      {view === "add" && (
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "32px 24px" }}>
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: "#FFD600", letterSpacing: 2, marginBottom: 4 }}>BUILD A SKILL</div>
            <div style={{ fontSize: 12, color: "#555" }}>Define your custom skill. It gets added to your vault permanently.</div>
          </div>

          {[
            { key: "name", label: "SKILL NAME *", placeholder: "e.g. CONTENT PIPELINE" },
            { key: "tag", label: "TAG / CATEGORY", placeholder: "e.g. content, automation, strategy" },
            { key: "description", label: "DESCRIPTION *", placeholder: "What does this skill do? When should you use it?" },
            { key: "activators", label: "ACTIVATION PHRASES (comma separated)", placeholder: `"write content" / "build pipeline" / "generate post"` },
          ].map(field => (
            <div key={field.key} style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#FFD600", letterSpacing: 2, marginBottom: 6 }}>{field.label}</div>
              <textarea
                value={newSkill[field.key]}
                onChange={e => setNewSkill(prev => ({ ...prev, [field.key]: e.target.value }))}
                placeholder={field.placeholder}
                rows={field.key === "description" ? 3 : 2}
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,214,0,0.2)",
                  color: "#e8e8d0",
                  padding: "10px 14px",
                  fontFamily: "inherit",
                  fontSize: 12,
                  resize: "none",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
          ))}

          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#FFD600", letterSpacing: 2, marginBottom: 6 }}>SYSTEM PROMPT (optional — leave blank for auto-generate)</div>
            <textarea
              value={newSkill.systemPrompt}
              onChange={e => setNewSkill(prev => ({ ...prev, systemPrompt: e.target.value }))}
              placeholder="You are an expert in... When given a task, you will..."
              rows={5}
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,214,0,0.2)",
                color: "#e8e8d0",
                padding: "10px 14px",
                fontFamily: "inherit",
                fontSize: 12,
                resize: "none",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={addCustomSkill} disabled={!newSkill.name || !newSkill.description} style={{
              flex: 1,
              padding: "14px",
              background: !newSkill.name || !newSkill.description ? "rgba(255,214,0,0.2)" : "#FFD600",
              border: "none",
              color: "#000",
              cursor: !newSkill.name || !newSkill.description ? "not-allowed" : "pointer",
              fontFamily: "inherit",
              fontSize: 13,
              fontWeight: 900,
              letterSpacing: 2,
            }}>
              ⚡ ADD TO VAULT
            </button>
            <button onClick={() => setView("vault")} style={{
              padding: "14px 20px",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#555",
              cursor: "pointer",
              fontFamily: "inherit",
              fontSize: 12,
            }}>CANCEL</button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,214,0,0.2); }
        textarea::placeholder { color: #444; }
      `}</style>
    </div>
  );
}
