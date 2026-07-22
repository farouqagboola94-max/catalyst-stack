import { useState } from "react";

const TEAM = [
  "Iniii", "Lakaka", "Adams Mills", "Adesuaa", "Amarachii", "Arafattt",
  "Beauty Jay", "Blessing", "Boko", "Caleb", "Fateemah", "Fuad",
  "Gbade", "Harbheebhart", "Kemi", "Latee Tvol", "M A", "Mamacita",
  "Moses", "Toland", "Official Miah", "Precious", "Sena", "Vybez Da Goat"
];

const DEPARTMENTS = [
  {
    id: "ops",
    name: "CENTRAL OPERATIONS",
    tag: "ALL PROJECTS",
    color: "#C8A96E",
    description: "The nerve center. Routes all information to Catalyst. Nothing reaches you that hasn't been filtered, prioritized, and packaged for a yes/no decision.",
    roles: [
      {
        title: "Chief of Staff / Operations Manager",
        count: 1,
        priority: "CRITICAL",
        duties: [
          "Manage Catalyst's calendar, meetings, and decision queue",
          "Coordinate across ALL departments and projects daily",
          "Filter and prioritize all incoming requests before they reach Catalyst",
          "Track deliverables and deadlines across every workstream",
          "Run weekly team syncs and produce status reports",
          "Handle all client communication routing (Aso Oke brand, consulting leads)",
          "Manage team accountability: who owes what, by when"
        ]
      },
      {
        title: "Finance & Admin Coordinator",
        count: 1,
        priority: "HIGH",
        duties: [
          "Track all revenue streams: Sneakers Fest tickets/sponsors, Aso Oke retainer, consulting fees",
          "Manage team payments, vendor invoices, and budget tracking",
          "Handle contracts, agreements, and documentation",
          "Maintain financial records and produce monthly P&L summaries",
          "Coordinate logistics: travel, procurement, subscriptions"
        ]
      }
    ]
  },
  {
    id: "sf-ops",
    name: "SNEAKERS FEST — OPERATIONS & LOGISTICS",
    tag: "SNEAKERS FEST 2026",
    color: "#E85D3A",
    description: "Everything that makes December 12 actually happen. Venue, vendors, floor plans, security, setup, teardown. If it's physical and tangible, it lives here.",
    roles: [
      {
        title: "Event Operations Lead",
        count: 1,
        priority: "CRITICAL",
        duties: [
          "Own the entire event production timeline and checklist",
          "Manage venue relationship (Eko Convention Centre liaison)",
          "Coordinate floor plan, booth allocation, and spatial design",
          "Manage all vendor contracts: sound, lighting, staging, catering",
          "Lead setup and teardown operations on event day",
          "Manage security, crowd control, and emergency protocols",
          "Run event day command center"
        ]
      },
      {
        title: "Logistics & Vendor Coordinator",
        count: 2,
        priority: "HIGH",
        duties: [
          "Source and negotiate with vendors (equipment, furniture, signage)",
          "Manage delivery schedules and equipment inventory",
          "Handle permits, insurance, and regulatory compliance",
          "Coordinate volunteer team on event day",
          "Manage transport and parking logistics"
        ]
      },
      {
        title: "Experience & Programming Coordinator",
        count: 1,
        priority: "HIGH",
        duties: [
          "Design the attendee journey from entry to exit",
          "Coordinate activations, panel discussions, DJ sets, and special moments",
          "Manage the Friday Night Protocol programming",
          "Liaise with exhibitors on booth experience standards",
          "Handle guest list, VIP experience, and talent management"
        ]
      }
    ]
  },
  {
    id: "sf-mktg",
    name: "SNEAKERS FEST — MARKETING & GROWTH",
    tag: "SNEAKERS FEST 2026",
    color: "#E85D3A",
    description: "Fills the venue. Builds the hype. Every post, flyer, influencer collab, and ticket push lives here. Turns Sneakers Fest from an event into a movement.",
    roles: [
      {
        title: "Marketing Lead",
        count: 1,
        priority: "CRITICAL",
        duties: [
          "Own the three tier marketing budget execution (Bootstrap/Growth/Scale)",
          "Develop and execute the pre event hype calendar (countdown campaigns)",
          "Manage ticket sales strategy and conversion tracking",
          "Coordinate influencer and media partnerships",
          "Run paid ads across Instagram, X, TikTok",
          "Produce post event content and community retention strategy"
        ]
      },
      {
        title: "Community & Hype Manager",
        count: 1,
        priority: "MEDIUM",
        duties: [
          "Build and manage Sneakers Fest social media accounts",
          "Engage sneaker community: forums, WhatsApp groups, X spaces",
          "Coordinate UGC campaigns and sneaker culture content",
          "Manage event hashtags and real time social coverage on event day",
          "Build email list and manage newsletter blasts"
        ]
      }
    ]
  },
  {
    id: "sf-partner",
    name: "SNEAKERS FEST — SPONSORSHIP & PARTNERSHIPS",
    tag: "SNEAKERS FEST 2026",
    color: "#E85D3A",
    description: "The money engine. Closes sponsors, manages brand partnerships, and ensures every Naira of sponsorship delivers measurable value to partners.",
    roles: [
      {
        title: "Partnerships & Sponsorship Lead",
        count: 1,
        priority: "CRITICAL",
        duties: [
          "Execute sponsor outreach using the pitch deck and sponsorship matrix",
          "Manage sponsor pipeline: cold outreach to signed deals",
          "Negotiate sponsorship packages across all tiers (Title/Gold/Silver/Bronze)",
          "Deliver EMV reports and sponsor fulfillment post event",
          "Coordinate brand activations and sponsor booth logistics",
          "Maintain sponsor relationships for 2027 retention"
        ]
      },
      {
        title: "Partnerships Associate",
        count: 1,
        priority: "MEDIUM",
        duties: [
          "Research and shortlist potential sponsors and brand partners",
          "Prepare customized pitch materials for each prospect",
          "Manage sponsor communication calendar and follow ups",
          "Coordinate exhibitor onboarding and requirements",
          "Track all partnership deliverables and deadlines"
        ]
      }
    ]
  },
  {
    id: "creative",
    name: "CREATIVE & DESIGN",
    tag: "ALL PROJECTS",
    color: "#9B59B6",
    description: "Every visual asset across every project. Lagos Noir aesthetic enforcement. If it has pixels, colors, or typography, it comes from this department.",
    roles: [
      {
        title: "Lead Designer / Creative Director",
        count: 1,
        priority: "CRITICAL",
        duties: [
          "Own the Lagos Noir visual identity across all brands",
          "Design all Sneakers Fest marketing materials (flyers, banners, social posts)",
          "Create Aso Oke brand social media visuals",
          "Design Substack header graphics and content visuals",
          "Produce pitch decks and presentation materials",
          "Maintain brand guidelines and asset libraries"
        ]
      },
      {
        title: "Motion / Video Content Creator",
        count: 1,
        priority: "HIGH",
        duties: [
          "Produce short form video content (Reels, TikToks, Shorts)",
          "Edit long form YouTube content from Catalyst's raw footage",
          "Create motion graphics for Sneakers Fest promos",
          "Handle event day videography or coordinate videography team",
          "Produce UGC style content for marketing campaigns"
        ]
      },
      {
        title: "Comic IP Production Assistant",
        count: 1,
        priority: "MEDIUM",
        duties: [
          "Assist with Catalyst: The Awakening panel production pipeline",
          "Manage the 79 image production queue and 57 panel storyboard assets",
          "Handle character asset rendering and consistency checks",
          "Coordinate with AI art tools for panel generation",
          "Organize and archive all comic IP visual assets"
        ]
      }
    ]
  },
  {
    id: "content",
    name: "CONTENT PRODUCTION & DISTRIBUTION",
    tag: "CATALYST BRAND",
    color: "#2ECC71",
    description: "Catalyst writes the Substack. This department turns that raw material into a multi format content machine across every platform.",
    roles: [
      {
        title: "Content Editor / Repurposer",
        count: 1,
        priority: "CRITICAL",
        duties: [
          "Edit and format Catalyst's raw Substack drafts",
          "Convert voice notes into clean transcripts",
          "Repurpose each Substack piece into: YouTube script, Shorts script, X threads, Instagram carousels",
          "Maintain the content calendar across all platforms",
          "Ensure voice consistency: human, direct, contraction heavy, no corporate buzzwords",
          "Format and schedule newsletter distribution"
        ]
      },
      {
        title: "Social Media Manager (Catalyst Brand)",
        count: 1,
        priority: "HIGH",
        duties: [
          "Manage Catalyst's personal X, Instagram, and LinkedIn accounts",
          "Schedule and publish all repurposed content",
          "Engage with audience: replies, DMs, community building",
          "Track analytics and produce weekly performance reports",
          "Manage the Aso Oke brand social accounts (content + scheduling + engagement)"
        ]
      }
    ]
  },
  {
    id: "tech",
    name: "TECH & AI AUTOMATION",
    tag: "CATALYST OS",
    color: "#3498DB",
    description: "Maintains the engine room. Catalyst OS, Claude Code integrations, automation pipelines, dashboards. You architect, they build and maintain.",
    roles: [
      {
        title: "Tech / AI Implementation Lead",
        count: 1,
        priority: "HIGH",
        duties: [
          "Maintain Catalyst OS infrastructure (Docker, CLI, dashboards)",
          "Execute Claude Code deployments and automation scripts",
          "Manage the Skill Vault and Switchboard module routing",
          "Handle all dashboard maintenance (Sneakers Fest Command Center, Leverage OS, etc.)",
          "Support AI consulting deliverables for any new clients",
          "Manage UGC video automation engine and content pipeline tools"
        ]
      },
      {
        title: "Tech Support / Junior Developer",
        count: 1,
        priority: "MEDIUM",
        duties: [
          "Assist with bug fixes and minor feature updates",
          "Manage hosting, domains, and deployment pipelines",
          "Handle data entry and dashboard updates",
          "Test automations and report issues",
          "Maintain documentation for all tech systems"
        ]
      }
    ]
  },
  {
    id: "bd",
    name: "BUSINESS DEVELOPMENT",
    tag: "REVENUE GROWTH",
    color: "#F39C12",
    description: "New money. Consulting clients, Za.allyErrands reactivation, content monetization, and any opportunity that converts attention into Naira.",
    roles: [
      {
        title: "Business Development Lead",
        count: 1,
        priority: "MEDIUM",
        duties: [
          "Identify and pursue new AI consulting prospects",
          "Manage the sales pipeline from lead to signed contract",
          "Package Catalyst OS consulting offerings (AI Integration Blueprint, Starter Pack, Social Content OS)",
          "Coordinate Za.allyErrands partnership development when reactivated",
          "Convert content audience into consulting pipeline",
          "Attend networking events and represent Catalyst Concepts"
        ]
      }
    ]
  }
];

function RoleBadge({ priority }) {
  const colors = {
    CRITICAL: { bg: "#E85D3A22", border: "#E85D3A", text: "#E85D3A" },
    HIGH: { bg: "#C8A96E22", border: "#C8A96E", text: "#C8A96E" },
    MEDIUM: { bg: "#888822", border: "#888", text: "#999" }
  };
  const c = colors[priority] || colors.MEDIUM;
  return (
    <span style={{
      fontSize: 10, fontWeight: 700, letterSpacing: 1.5,
      padding: "2px 8px", borderRadius: 3,
      border: `1px solid ${c.border}`,
      background: c.bg, color: c.text
    }}>{priority}</span>
  );
}

export default function CatalystOrgChart() {
  const [expandedDept, setExpandedDept] = useState(null);
  const [assignedRoles, setAssignedRoles] = useState({});

  const totalRoles = DEPARTMENTS.reduce((sum, d) => d.roles.reduce((s, r) => s + r.count, sum), 0);

  const toggleDept = (id) => {
    setExpandedDept(prev => prev === id ? null : id);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0A0A0C",
      color: "#E8E4DC",
      fontFamily: "'Courier New', Courier, monospace",
      padding: "20px 16px",
      maxWidth: 720,
      margin: "0 auto"
    }}>
      {/* Header */}
      <div style={{
        borderBottom: "1px solid #C8A96E33",
        paddingBottom: 20,
        marginBottom: 24
      }}>
        <div style={{
          fontSize: 10, letterSpacing: 4, color: "#C8A96E",
          marginBottom: 4, fontWeight: 700
        }}>CATALYST CONCEPTS</div>
        <h1 style={{
          fontSize: 22, fontWeight: 700, margin: "4px 0",
          color: "#E8E4DC", lineHeight: 1.2
        }}>ORGANIZATIONAL STRUCTURE</h1>
        <div style={{ fontSize: 11, color: "#888", marginTop: 6 }}>
          Full Departmental Blueprint — May 2026
        </div>
      </div>

      {/* Stats Bar */}
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
        gap: 10, marginBottom: 28
      }}>
        {[
          { label: "DEPARTMENTS", value: DEPARTMENTS.length },
          { label: "TOTAL ROLES", value: totalRoles },
          { label: "TEAM SIZE", value: TEAM.length }
        ].map(s => (
          <div key={s.label} style={{
            background: "#111114",
            border: "1px solid #1E1E24",
            borderRadius: 6, padding: "12px 10px",
            textAlign: "center"
          }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#C8A96E" }}>{s.value}</div>
            <div style={{ fontSize: 8, letterSpacing: 2, color: "#666", marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Catalyst Position */}
      <div style={{
        background: "linear-gradient(135deg, #C8A96E15, #C8A96E08)",
        border: "1px solid #C8A96E44",
        borderRadius: 8, padding: 16, marginBottom: 28,
        textAlign: "center"
      }}>
        <div style={{ fontSize: 8, letterSpacing: 3, color: "#C8A96E", marginBottom: 4 }}>APEX</div>
        <div style={{ fontSize: 16, fontWeight: 700 }}>CATALYST</div>
        <div style={{ fontSize: 11, color: "#999", marginTop: 6, lineHeight: 1.5 }}>
          Substack Production · Strategic Plans · Final Decisions
        </div>
        <div style={{
          fontSize: 10, color: "#C8A96E", marginTop: 8,
          fontStyle: "italic"
        }}>
          Everything below reports up. Nothing reaches you unfiltered.
        </div>
      </div>

      {/* Department Cards */}
      {DEPARTMENTS.map(dept => {
        const isOpen = expandedDept === dept.id;
        const roleCount = dept.roles.reduce((s, r) => s + r.count, 0);

        return (
          <div key={dept.id} style={{
            background: "#111114",
            border: `1px solid ${isOpen ? dept.color + "55" : "#1E1E24"}`,
            borderRadius: 8, marginBottom: 12,
            overflow: "hidden",
            transition: "border-color 0.3s"
          }}>
            {/* Department Header */}
            <div
              onClick={() => toggleDept(dept.id)}
              style={{
                padding: "14px 16px",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start"
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  <span style={{
                    width: 8, height: 8, borderRadius: "50%",
                    background: dept.color, flexShrink: 0
                  }} />
                  <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 0.5 }}>
                    {dept.name}
                  </span>
                </div>
                <div style={{
                  display: "flex", gap: 10, marginTop: 6, alignItems: "center"
                }}>
                  <span style={{
                    fontSize: 9, letterSpacing: 1.5, color: dept.color,
                    padding: "1px 6px", border: `1px solid ${dept.color}33`,
                    borderRadius: 3
                  }}>{dept.tag}</span>
                  <span style={{ fontSize: 10, color: "#666" }}>
                    {roleCount} {roleCount === 1 ? "role" : "roles"}
                  </span>
                </div>
              </div>
              <span style={{
                color: "#666", fontSize: 16,
                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s",
                flexShrink: 0, marginTop: 2
              }}>▾</span>
            </div>

            {/* Expanded Content */}
            {isOpen && (
              <div style={{
                padding: "0 16px 16px",
                borderTop: `1px solid ${dept.color}22`
              }}>
                <p style={{
                  fontSize: 11, color: "#888", lineHeight: 1.6,
                  margin: "12px 0 16px", fontStyle: "italic"
                }}>
                  {dept.description}
                </p>

                {dept.roles.map((role, ri) => (
                  <div key={ri} style={{
                    background: "#0A0A0C",
                    border: "1px solid #1E1E24",
                    borderRadius: 6, padding: 14,
                    marginBottom: ri < dept.roles.length - 1 ? 10 : 0
                  }}>
                    <div style={{
                      display: "flex", justifyContent: "space-between",
                      alignItems: "flex-start", marginBottom: 10,
                      flexWrap: "wrap", gap: 6
                    }}>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 700 }}>{role.title}</div>
                        <div style={{ fontSize: 10, color: "#666", marginTop: 2 }}>
                          {role.count} {role.count === 1 ? "person" : "people"} needed
                        </div>
                      </div>
                      <RoleBadge priority={role.priority} />
                    </div>

                    <div style={{ fontSize: 10, color: "#666", marginBottom: 8, letterSpacing: 1 }}>
                      RESPONSIBILITIES
                    </div>
                    {role.duties.map((duty, di) => (
                      <div key={di} style={{
                        fontSize: 11, color: "#AAA", lineHeight: 1.5,
                        padding: "4px 0 4px 12px",
                        borderLeft: `2px solid ${dept.color}33`,
                        marginBottom: 4
                      }}>
                        {duty}
                      </div>
                    ))}

                    {/* Assignment Slot */}
                    <div style={{
                      marginTop: 12,
                      padding: "8px 10px",
                      background: "#15151A",
                      borderRadius: 4,
                      border: "1px dashed #333"
                    }}>
                      <div style={{ fontSize: 9, color: "#555", letterSpacing: 1.5, marginBottom: 4 }}>
                        ASSIGN TEAM MEMBER{role.count > 1 ? "S" : ""}
                      </div>
                      <div style={{ fontSize: 11, color: "#C8A96E" }}>
                        ← Slot {role.count} {role.count === 1 ? "person" : "people"} here
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {/* Team Roster */}
      <div style={{
        marginTop: 28,
        borderTop: "1px solid #C8A96E33",
        paddingTop: 20
      }}>
        <div style={{
          fontSize: 10, letterSpacing: 3, color: "#C8A96E",
          marginBottom: 4
        }}>YOUR ROSTER</div>
        <h2 style={{ fontSize: 16, fontWeight: 700, margin: "4px 0 6px" }}>
          24 TEAM MEMBERS — UNASSIGNED
        </h2>
        <p style={{ fontSize: 11, color: "#666", marginBottom: 16, lineHeight: 1.5 }}>
          Map each person to a role above based on their skills, availability, and strengths. Some may hold multiple roles. Some roles may need external hires.
        </p>

        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: 6
        }}>
          {TEAM.map((name, i) => (
            <div key={i} style={{
              background: "#111114",
              border: "1px solid #1E1E24",
              borderRadius: 4,
              padding: "8px 10px",
              fontSize: 11,
              display: "flex",
              alignItems: "center",
              gap: 6
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: "50%",
                background: "#333", flexShrink: 0
              }} />
              {name}
            </div>
          ))}
        </div>
      </div>

      {/* Role Summary Table */}
      <div style={{
        marginTop: 28,
        borderTop: "1px solid #C8A96E33",
        paddingTop: 20
      }}>
        <div style={{
          fontSize: 10, letterSpacing: 3, color: "#C8A96E",
          marginBottom: 12
        }}>HIRING GAP ANALYSIS</div>

        <div style={{
          background: "#111114",
          border: "1px solid #1E1E24",
          borderRadius: 8, padding: 14
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr auto",
            gap: "8px 12px",
            fontSize: 11
          }}>
            <div style={{ color: "#555", fontSize: 9, letterSpacing: 1 }}>#</div>
            <div style={{ color: "#555", fontSize: 9, letterSpacing: 1 }}>ROLE</div>
            <div style={{ color: "#555", fontSize: 9, letterSpacing: 1 }}>NEED</div>

            {DEPARTMENTS.flatMap((d, di) => d.roles.map((r, ri) => (
              <React.Fragment key={`${di}-${ri}`}>
                <div style={{ color: d.color, fontWeight: 700 }}>
                  {DEPARTMENTS.slice(0, di).reduce((s, dd) => s + dd.roles.length, 0) + ri + 1}
                </div>
                <div style={{ color: "#AAA" }}>{r.title}</div>
                <div style={{ color: "#888", textAlign: "center" }}>{r.count}</div>
              </React.Fragment>
            )))}

            <div style={{ gridColumn: "1 / -1", borderTop: "1px solid #1E1E24", margin: "4px 0" }} />
            <div />
            <div style={{ color: "#C8A96E", fontWeight: 700 }}>TOTAL ROLES NEEDED</div>
            <div style={{ color: "#C8A96E", fontWeight: 700, textAlign: "center" }}>{totalRoles}</div>
          </div>
        </div>

        <div style={{
          marginTop: 14,
          background: "#111114",
          border: "1px solid #1E1E24",
          borderRadius: 8, padding: 14
        }}>
          <div style={{ fontSize: 11, color: "#888", lineHeight: 1.7 }}>
            <span style={{ color: "#C8A96E", fontWeight: 700 }}>You have 24 people.</span>
            {" "}The structure calls for <span style={{ color: "#E85D3A", fontWeight: 700 }}>{totalRoles} distinct roles</span>.
            {" "}That means {24 - totalRoles > 0
              ? <span style={{ color: "#2ECC71" }}>{24 - totalRoles} people can double up, serve as flex support, or rotate across departments as needed. You're overstaffed for the structure, which means you can be selective about who fits where.</span>
              : <span style={{ color: "#E85D3A" }}>{totalRoles - 24} roles need external hires or existing members must carry dual responsibilities.</span>
            }
          </div>
        </div>

        <div style={{
          marginTop: 14,
          background: "#0D0D10",
          border: "1px solid #C8A96E33",
          borderRadius: 8, padding: 14
        }}>
          <div style={{ fontSize: 9, letterSpacing: 2, color: "#C8A96E", marginBottom: 6 }}>NEXT STEP</div>
          <div style={{ fontSize: 11, color: "#AAA", lineHeight: 1.6 }}>
            Share each team member's skills or current responsibilities and I'll produce a final assignment sheet mapping every name to a role with backup coverage.
          </div>
        </div>
      </div>

      <div style={{
        marginTop: 28, paddingTop: 16,
        borderTop: "1px solid #1E1E24",
        fontSize: 9, color: "#333", textAlign: "center",
        letterSpacing: 2
      }}>
        CATALYST CONCEPTS © 2026 — LAGOS NOIR
      </div>
    </div>
  );
}
