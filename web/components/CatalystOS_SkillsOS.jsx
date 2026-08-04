import { useState, useMemo, useEffect } from "react";

const PREVIEW_DATA = [["algorithmic-art","anthropics","design","Creating algorithmic art using p5.js with seeded randomness and interactive parameter exploration. U","https://github.com/anthropics/skills"],["brand-guidelines","anthropics","design","Applies Anthropics official brand colors and typography to any sort of artifact that may benefit fr","https://github.com/anthropics/skills"],["canvas-design","anthropics","design","Create beautiful visual art in .png and .pdf documents using design philosophy. You should use this ","https://github.com/anthropics/skills"],["claude-api","anthropics","api","Build, debug, and optimize Claude API / Anthropic SDK apps. Apps built with this skill should includ","https://github.com/anthropics/skills"],["doc-coauthoring","anthropics","productivity","Guide users through a structured workflow for co-authoring documentation. Use when user wants to wri","https://github.com/anthropics/skills"],["docx","anthropics","documents","Use this skill whenever the user wants to create, read, edit, or manipulate Word documents (.docx fi","https://github.com/anthropics/skills"],["frontend-design","anthropics","design","Create distinctive, production-grade frontend interfaces with high design quality. Use this skill wh","https://github.com/anthropics/skills"],["internal-comms","anthropics","productivity","A set of resources to help me write all kinds of internal communications, using the formats that my ","https://github.com/anthropics/skills"],["mcp-builder","anthropics","ai-ml","Guide for creating high-quality MCP (Model Context Protocol) servers that enable LLMs to interact wi","https://github.com/anthropics/skills"],["pdf","anthropics","documents","Use this skill whenever the user wants to do anything with PDF files. This includes reading or extra","https://github.com/anthropics/skills"],["pptx","anthropics","documents","Use this skill any time a .pptx file is involved in any way — as input, output, or both. This includ","https://github.com/anthropics/skills"],["skill-creator","anthropics","meta","Create new skills, modify and improve existing skills, and measure skill performance. Use when users","https://github.com/anthropics/skills"],["slack-gif-creator","anthropics","automation","Knowledge and utilities for creating animated GIFs optimized for Slack. Provides constraints, valida","https://github.com/anthropics/skills"],["theme-factory","anthropics","design","Toolkit for styling artifacts with a theme. These artifacts can be slides, docs, reportings, HTML la","https://github.com/anthropics/skills"],["web-artifacts-builder","anthropics","development","Suite of tools for creating elaborate, multi-component claude.ai HTML artifacts using modern fronten","https://github.com/anthropics/skills"],["webapp-testing","anthropics","testing","Toolkit for interacting with and testing local web applications using Playwright. Supports verifying","https://github.com/anthropics/skills"],["xlsx","anthropics","documents","Use this skill any time a spreadsheet file is the primary input or output. This means any task where","https://github.com/anthropics/skills"],["business-growth","alirezarezvani","business","4 skills: customer success, churn, sales engineer, revenue ops, contract writer","https://github.com/alirezarezvani/claude-skills"],["c-level-advisor","alirezarezvani","executive","10 C-level advisors: CEO, CTO, COO, CPO, CMO, CFO, CRO, CISO, CHRO, Executive Mentor","https://github.com/alirezarezvani/claude-skills"],["engineering","alirezarezvani","engineering","23 engineering skills: architecture, frontend, backend, QA, DevOps, security, AI/ML","https://github.com/alirezarezvani/claude-skills"],["engineering-team","alirezarezvani","engineering","25 advanced engineering skills: agent design, RAG, MCP servers, CI/CD, observability","https://github.com/alirezarezvani/claude-skills"],["finance","alirezarezvani","finance","Financial analyst: ratio analysis, DCF valuation, budget variance, rolling forecasts","https://github.com/alirezarezvani/claude-skills"],["marketing-skill","alirezarezvani","marketing","42 marketing skills: content, SEO, CRO, channels, growth, intelligence, sales","https://github.com/alirezarezvani/claude-skills"],["orchestration","alirezarezvani","orchestration","Multi-agent orchestration and workflow coordination patterns","https://github.com/alirezarezvani/claude-skills"],["product-team","alirezarezvani","product","10 product skills: PM toolkit, agile PO, UX researcher, UI design, competitive teardown","https://github.com/alirezarezvani/claude-skills"],["project-management","alirezarezvani","project-management","6 PM skills: senior PM, scrum master, Jira expert, Confluence, Atlassian admin","https://github.com/alirezarezvani/claude-skills"],["ra-qm-team","alirezarezvani","compliance","12 regulatory/QM skills: ISO 13485, MDR, FDA 510(k), ISO 27001, GDPR, risk management","https://github.com/alirezarezvani/claude-skills"],["agent-evaluation","antigravity","ai-agents","Testing and benchmarking LLM agents including behavioral testing, capability assessment, reliability","https://github.com/sickn33/antigravity-awesome-skills"],["ai-agents-architect","antigravity","ai-agents","Expert in designing and building autonomous AI agents. Masters tool use, memory systems, planning st","https://github.com/sickn33/antigravity-awesome-skills"],["advanced-evaluation","antigravity","ai-ml","This skill should be used when user asks to implement LLM-as-judge, compare model outputs","https://github.com/sickn33/antigravity-awesome-skills"],["agent-framework-azure-ai-py","antigravity","ai-ml","Build persistent agents on Azure AI Foundry using the Microsoft Agent Framework Python SDK.","https://github.com/sickn33/antigravity-awesome-skills"],["agent-memory-mcp","antigravity","ai-ml","A hybrid memory system that provides persistent, searchable knowledge management for AI agents","https://github.com/sickn33/antigravity-awesome-skills"],["agent-orchestration-improve-agent","antigravity","ai-ml","Systematic improvement of existing agents through performance analysis, prompt engineering","https://github.com/sickn33/antigravity-awesome-skills"],["agent-orchestration-multi-agent-optimize","antigravity","ai-ml","Optimize multi-agent systems with coordinated profiling, workload distribution, and cost-aware orchestration","https://github.com/sickn33/antigravity-awesome-skills"],["agent-orchestrator","antigravity","ai-ml","Meta-skill that orchestrates all ecosystem agents. Automatic scan of skills, match by capability","https://github.com/sickn33/antigravity-awesome-skills"],["agent-tool-builder","antigravity","ai-ml","Tools are how AI agents interact with the world. A well-designed tool is the difference between an agent that works","https://github.com/sickn33/antigravity-awesome-skills"],["avoid-ai-writing","antigravity","content","Audit and rewrite content to remove 21 categories of AI writing patterns with a 43-entry replacement list","https://github.com/sickn33/antigravity-awesome-skills"],["beautiful-prose","antigravity","content","A hard-edged writing style contract for timeless, forceful English prose without modern AI tics","https://github.com/sickn33/antigravity-awesome-skills"],["content-marketer","antigravity","content","Elite content marketing strategist specializing in AI-powered content creation, omnichannel distribution","https://github.com/sickn33/antigravity-awesome-skills"],["daily-news-report","antigravity","content","Scrapes content based on preset URL list, filters high-quality technical information, generates reports","https://github.com/sickn33/antigravity-awesome-skills"],["defuddle","antigravity","content","Extract clean markdown content from web pages using Defuddle CLI, removing clutter and navigation","https://github.com/sickn33/antigravity-awesome-skills"],["blog-writing-guide","antigravity","content","Enforces Sentry blog writing standards across every post","https://github.com/sickn33/antigravity-awesome-skills"],["copywriting-psychologist","antigravity","content","Psychology-driven copywriting for conversion-focused content","https://github.com/sickn33/antigravity-awesome-skills"],["business-analyst","antigravity","business","Master modern business analysis with AI-powered analytics, real-time dashboards, and data-driven insights","https://github.com/sickn33/antigravity-awesome-skills"],["competitive-landscape","antigravity","business","Comprehensive frameworks for analyzing competition, identifying differentiation opportunities","https://github.com/sickn33/antigravity-awesome-skills"],["competitor-alternatives","antigravity","business","Expert in creating competitor comparison and alternative pages","https://github.com/sickn33/antigravity-awesome-skills"],["customer-support","antigravity","business","Elite AI-powered customer support specialist mastering conversational AI, automated ticketing, sentiment analysis","https://github.com/sickn33/antigravity-awesome-skills"],["kotler-macro-analyzer","antigravity","business","Professional PESTEL/SWOT analysis agent based on Kotlers methodology for strategic market audits","https://github.com/sickn33/antigravity-awesome-skills"],["osterwalder-canvas-architect","antigravity","business","Iterative consultant agent for building and validating logically consistent 9-block Business Model Canvas","https://github.com/sickn33/antigravity-awesome-skills"],["backtesting-frameworks","antigravity","business","Build robust, production-grade backtesting systems that avoid common pitfalls","https://github.com/sickn33/antigravity-awesome-skills"],["carrier-relationship-management","antigravity","business","Codified expertise for managing carrier portfolios, negotiating freight rates","https://github.com/sickn33/antigravity-awesome-skills"],["airtable-automation","antigravity","automation","Automate Airtable tasks via Rube MCP: records, bases, tables, fields, views","https://github.com/sickn33/antigravity-awesome-skills"],["activecampaign-automation","antigravity","automation","Automate ActiveCampaign tasks via Rube MCP: manage contacts, tags, list subscriptions","https://github.com/sickn33/antigravity-awesome-skills"],["apify-actor-development","antigravity","automation","Convert existing software into reusable serverless Apify applications","https://github.com/sickn33/antigravity-awesome-skills"],["apify-audience-analysis","antigravity","automation","Understand audience demographics, preferences, behavior patterns across Facebook, Instagram, YouTube, TikTok","https://github.com/sickn33/antigravity-awesome-skills"],["apify-competitor-intelligence","antigravity","automation","Analyze competitor strategies, content, pricing, ads across Google Maps, Booking, and more","https://github.com/sickn33/antigravity-awesome-skills"],["apify-content-analytics","antigravity","automation","Track engagement metrics, measure campaign ROI, analyze content performance","https://github.com/sickn33/antigravity-awesome-skills"],["canva-automation","antigravity","automation","Automate Canva tasks via Rube MCP: designs, exports, folders, brand templates, autofill","https://github.com/sickn33/antigravity-awesome-skills"],["figma-automation","antigravity","design","Automate Figma tasks via Rube MCP: files, components, design tokens, comments, exports","https://github.com/sickn33/antigravity-awesome-skills"],["antigravity-design-expert","antigravity","design","Core UI/UX engineering skill for building highly interactive, spatial, weightless, and glassmorphism interfaces","https://github.com/sickn33/antigravity-awesome-skills"],["design-spells","antigravity","design","Curated micro-interactions and design details that add magic and personality to websites and apps","https://github.com/sickn33/antigravity-awesome-skills"],["3d-web-experience","antigravity","design","Expert in building 3D experiences for the web - Three.js, React Three Fiber, Spline, WebGL","https://github.com/sickn33/antigravity-awesome-skills"],["high-end-visual-design","antigravity","design","Use when designing expensive agency-grade interfaces with premium fonts, spatial rhythm, soft depth","https://github.com/sickn33/antigravity-awesome-skills"],["app-store-optimization","antigravity","marketing","Complete App Store Optimization (ASO) toolkit for researching, optimizing, and tracking mobile app performance","https://github.com/sickn33/antigravity-awesome-skills"],["brand-guidelines","antigravity","marketing","Write copy following Sentry brand guidelines for UI text, error messages, empty states","https://github.com/sickn33/antigravity-awesome-skills"],["brevo-automation","antigravity","marketing","Automate Brevo email marketing operations through Composios Brevo toolkit","https://github.com/sickn33/antigravity-awesome-skills"],["content-creator","antigravity","marketing","Professional-grade brand voice analysis, SEO optimization, and platform-specific content frameworks","https://github.com/sickn33/antigravity-awesome-skills"],["ab-test-setup","antigravity","marketing","Structured guide for setting up A/B tests with mandatory gates for hypothesis, metrics, and execution","https://github.com/sickn33/antigravity-awesome-skills"],["social-post-writer-seo","antigravity","marketing","Creates engaging social media posts for Instagram, LinkedIn, X, and more","https://github.com/sickn33/antigravity-awesome-skills"],["seo-plan","antigravity","marketing","Strategic SEO planning for new or existing websites with industry-specific templates","https://github.com/sickn33/antigravity-awesome-skills"],["aws-serverless","antigravity","cloud","Specialized skill for building production-ready serverless applications on AWS","https://github.com/sickn33/antigravity-awesome-skills"],["aws-cost-optimizer","antigravity","cloud","Comprehensive AWS cost analysis and optimization recommendations","https://github.com/sickn33/antigravity-awesome-skills"],["azure-web-pubsub-ts","antigravity","cloud","Real-time messaging with WebSocket connections and pub/sub patterns","https://github.com/sickn33/antigravity-awesome-skills"],["cloudflare-workers-expert","antigravity","cloud","Expert in Cloudflare Workers and the Edge Computing ecosystem","https://github.com/sickn33/antigravity-awesome-skills"],["azd-deployment","antigravity","cloud","Deploy containerized frontend + backend applications to Azure Container Apps","https://github.com/sickn33/antigravity-awesome-skills"],["aws-iam-best-practices","antigravity","security","IAM policy review, hardening, and least privilege implementation","https://github.com/sickn33/antigravity-awesome-skills"],["007","antigravity","security","Security audit, hardening, threat modeling (STRIDE/PASTA), Red/Blue Team, OWASP checks, code review","https://github.com/sickn33/antigravity-awesome-skills"],["anti-reversing-techniques","antigravity","security","AUTHORIZED USE ONLY: anti-reversing and bypass techniques for authorized security research","https://github.com/sickn33/antigravity-awesome-skills"],["auth-implementation-patterns","antigravity","security","Build secure, scalable authentication and authorization systems","https://github.com/sickn33/antigravity-awesome-skills"],["audit-skills","antigravity","security","Expert security auditor for AI Skills and Bundles. Performs non-intrusive static analysis","https://github.com/sickn33/antigravity-awesome-skills"],["acceptance-orchestrator","antigravity","workflow","Use when a coding task should be driven end-to-end from issue intake through implementation, review, and ship","https://github.com/sickn33/antigravity-awesome-skills"],["airflow-dag-patterns","antigravity","workflow","Build production Apache Airflow DAGs with best practices for operators, sensors, testing","https://github.com/sickn33/antigravity-awesome-skills"],["changelog-automation","antigravity","workflow","Automate changelog generation from commits, PRs, and releases following Keep a Changelog format","https://github.com/sickn33/antigravity-awesome-skills"],["address-github-comments","antigravity","workflow","Address review or issue comments on an open GitHub Pull Request using the gh CLI","https://github.com/sickn33/antigravity-awesome-skills"],["build","antigravity","workflow","Build workflow orchestrator for complex project build tasks","https://github.com/sickn33/antigravity-awesome-skills"],["ask-questions-if-underspecified","antigravity","workflow","Clarify requirements before implementing. Use when serious doubts arise","https://github.com/sickn33/antigravity-awesome-skills"],["api-endpoint-builder","antigravity","development","Builds production-ready REST API endpoints with validation, error handling, authentication","https://github.com/sickn33/antigravity-awesome-skills"],["async-python-patterns","antigravity","development","Comprehensive guidance for implementing asynchronous Python applications using asyncio","https://github.com/sickn33/antigravity-awesome-skills"],["bash-linux","antigravity","development","Bash/Linux terminal patterns. Critical commands, piping, error handling, scripting","https://github.com/sickn33/antigravity-awesome-skills"],["bash-defensive-patterns","antigravity","development","Master defensive Bash programming techniques for production-grade scripts","https://github.com/sickn33/antigravity-awesome-skills"],["arm-cortex-expert","antigravity","development","Senior embedded software engineer specializing in firmware and driver development for ARM Cortex-M","https://github.com/sickn33/antigravity-awesome-skills"],["production-code-audit","antigravity","development","Autonomously deep-scan entire codebase line-by-line, understand architecture and transform to production-grade code","https://github.com/sickn33/antigravity-awesome-skills"],["performance-engineer","antigravity","development","Expert performance engineer specializing in modern observability and optimization","https://github.com/sickn33/antigravity-awesome-skills"],["rag-engineer","antigravity","data-ai","Expert in building Retrieval-Augmented Generation systems. Masters embedding models, vector databases","https://github.com/sickn33/antigravity-awesome-skills"],["ai-engineering-toolkit","antigravity","data-ai","6 production-ready AI engineering workflows: prompt evaluation, context budgeting","https://github.com/sickn33/antigravity-awesome-skills"],["local-llm-expert","antigravity","data-ai","Master local LLM inference, model selection, VRAM optimization, and local deployment using Ollama","https://github.com/sickn33/antigravity-awesome-skills"],["llm-app-patterns","antigravity","data-ai","Production-ready patterns for building LLM applications","https://github.com/sickn33/antigravity-awesome-skills"],["embedding-strategies","antigravity","data-ai","Guide to selecting and optimizing embedding models for vector search applications","https://github.com/sickn33/antigravity-awesome-skills"],["exa-search","antigravity","data-ai","Semantic search, similar content discovery, and structured research using Exa API","https://github.com/sickn33/antigravity-awesome-skills"],["jira-automation","antigravity","project-management","Automate Jira tasks via Rube MCP: issues, projects, sprints, boards, comments","https://github.com/sickn33/antigravity-awesome-skills"],["asana-automation","antigravity","project-management","Automate Asana tasks via Rube MCP: tasks, projects, sections, teams, workspaces","https://github.com/sickn33/antigravity-awesome-skills"],["linear-automation","antigravity","project-management","Automate Linear tasks via Rube MCP: issues, projects, cycles, teams, labels","https://github.com/sickn33/antigravity-awesome-skills"],["confluence-automation","antigravity","project-management","Automate Confluence page creation, content search, space management","https://github.com/sickn33/antigravity-awesome-skills"],["github-issue-creator","antigravity","project-management","Turn error logs, screenshots, voice notes into crisp, developer-ready GitHub issues","https://github.com/sickn33/antigravity-awesome-skills"],["idea-os","antigravity","product-management","Five-phase pipeline that turns a raw idea into four linked Notion pages","https://github.com/sickn33/antigravity-awesome-skills"],["voice-ai-development","antigravity","voice-agents","Expert in building voice AI applications from real-time voice agents to voice-enabled apps","https://github.com/sickn33/antigravity-awesome-skills"],["fal-audio","antigravity","voice-agents","Text-to-speech and speech-to-text using fal.ai audio models","https://github.com/sickn33/antigravity-awesome-skills"],["pipecat-friday-agent","antigravity","voice-agents","Build a low-latency, Iron Man-inspired tactical voice assistant using Pipecat, Gemini","https://github.com/sickn33/antigravity-awesome-skills"],["blueprint","antigravity","planning","Turn a one-line objective into a step-by-step construction plan any coding agent can execute cold","https://github.com/sickn33/antigravity-awesome-skills"],["plan-writing","antigravity","planning","Structured task planning with clear breakdowns, dependencies, and verification criteria","https://github.com/sickn33/antigravity-awesome-skills"],["concise-planning","antigravity","planning","Generate clear, actionable, and atomic checklists for coding tasks","https://github.com/sickn33/antigravity-awesome-skills"],["legal-advisor","antigravity","legal","Draft privacy policies, terms of service, disclaimers, and legal notices","https://github.com/sickn33/antigravity-awesome-skills"],["lex","antigravity","legal","Centralized Truth Engine for cross-jurisdictional legal context (US, EU, CA) and contract scaffolding","https://github.com/sickn33/antigravity-awesome-skills"],["employment-contract-templates","antigravity","legal","Templates and patterns for creating legally sound employment documentation","https://github.com/sickn33/antigravity-awesome-skills"],["payment-integration","antigravity","api-integration","Integrate Stripe, PayPal, and payment processors. Handles checkout flows, subscriptions, webhooks","https://github.com/sickn33/antigravity-awesome-skills"],["hubspot-integration","antigravity","api-integration","Expert patterns for HubSpot CRM integration including OAuth authentication, CRM objects","https://github.com/sickn33/antigravity-awesome-skills"],["discord-automation","antigravity","api-integration","Automate Discord tasks via Rube MCP: messages, channels, roles, webhooks, reactions","https://github.com/sickn33/antigravity-awesome-skills"],["openapi-spec-generation","antigravity","api-integration","Generate and maintain OpenAPI 3.1 specifications from code, design-first specs","https://github.com/sickn33/antigravity-awesome-skills"],["typefully/typefully","voltagent","typefully","Create, schedule, and publish social media content across X, LinkedIn, Threads, Bluesky, and Mastodon","https://github.com/VoltAgent/awesome-agent-skills"],["BrianRWagner/ai-marketing-skills","voltagent","community","17 marketing frameworks for cold outreach, homepage audit, social cards, and more","https://github.com/VoltAgent/awesome-agent-skills"],["AgriciDaniel/claude-seo","voltagent","community","Universal SEO skill for comprehensive website analysis and optimization","https://github.com/VoltAgent/awesome-agent-skills"],["CosmoBlk/email-marketing-bible","voltagent","community","55K-word email marketing guide as an AI skill","https://github.com/VoltAgent/awesome-agent-skills"],["smixs/creative-director-skill","voltagent","community","AI creative director with recursive self-assessment: 20+ methodologies","https://github.com/VoltAgent/awesome-agent-skills"],["SHADOWPR0/beautiful_prose","voltagent","community","Hard-edged writing style contract for timeless, forceful English prose without AI tics","https://github.com/VoltAgent/awesome-agent-skills"],["Xquik-dev/tweetclaw","voltagent","community","40+ X/Twitter actions: post, extract, monitor, compose","https://github.com/VoltAgent/awesome-agent-skills"],["qdrant/skills","voltagent","community","Agent skills for Qdrant vector search, covering scaling, performance optimization, search quality","https://github.com/VoltAgent/awesome-agent-skills"],["google-gemini/gemini-api-dev","voltagent","google-gemini","Best practices for developing Gemini-powered apps using the Gemini API","https://github.com/VoltAgent/awesome-agent-skills"],["google-gemini/vertex-ai-api-dev","voltagent","google-gemini","Developing Gemini-powered apps on Google Cloud Vertex AI using the Gen AI SDK","https://github.com/VoltAgent/awesome-agent-skills"],["stripe/stripe-best-practices","voltagent","stripe-team","Best practices for building Stripe integrations","https://github.com/VoltAgent/awesome-agent-skills"],["stripe/upgrade-stripe","voltagent","stripe-team","Upgrade Stripe SDK and API versions","https://github.com/VoltAgent/awesome-agent-skills"],["neondatabase/neon-postgres","voltagent","neon","Best practices for Neon Serverless Postgres","https://github.com/VoltAgent/awesome-agent-skills"],["neondatabase/claimable-postgres","voltagent","neon","Claimable Postgres database provisioning with Neon","https://github.com/VoltAgent/awesome-agent-skills"],["firecrawl/firecrawl-build","voltagent","firecrawl-team","Integrate Firecrawl into application code for web search, scraping, extraction","https://github.com/VoltAgent/awesome-agent-skills"],["firecrawl/firecrawl-build-interact","voltagent","firecrawl-team","Multi-step Firecrawl browser flows: clicks, form fills, pagination","https://github.com/VoltAgent/awesome-agent-skills"],["microsoft/cloud-solution-architect","voltagent","core","Design well-architected Azure cloud systems","https://github.com/VoltAgent/awesome-agent-skills"],["microsoft/frontend-design-review","voltagent","core","Review and create distinctive frontend interfaces","https://github.com/VoltAgent/awesome-agent-skills"],["microsoft/mcp-builder","voltagent","core","MCP server creation guide for LLM tool integration","https://github.com/VoltAgent/awesome-agent-skills"],["microsoft/github-issue-creator","voltagent","core","Structured GitHub issue reports from notes","https://github.com/VoltAgent/awesome-agent-skills"],["callstackincubator/react-native-best-practices","voltagent","callstack","Performance optimization for React Native apps from Callstack","https://github.com/VoltAgent/awesome-agent-skills"],["better-auth/best-practices","voltagent","better-auth-team","Best practices for Better Auth integration","https://github.com/VoltAgent/awesome-agent-skills"],["hashicorp/azure-verified-modules","voltagent","hashicorp","Azure Verified Modules certification standards for Terraform modules","https://github.com/VoltAgent/awesome-agent-skills"],["hashicorp/new-terraform-provider","voltagent","hashicorp","Scaffold a new Terraform provider project using the Plugin Framework","https://github.com/VoltAgent/awesome-agent-skills"],["sanity-io/sanity-best-practices","voltagent","sanity-team","Best practices for Sanity Studio, GROQ queries, and content workflows","https://github.com/VoltAgent/awesome-agent-skills"],["sanity-io/seo-aeo-best-practices","voltagent","sanity-team","SEO and answer engine optimization patterns for content sites","https://github.com/VoltAgent/awesome-agent-skills"],["microsoft/azure-ai-projects-ts","voltagent","typescript","AI Foundry project client and agents","https://github.com/VoltAgent/awesome-agent-skills"],["microsoft/azure-ai-contentsafety-ts","voltagent","typescript","Content safety for text and images","https://github.com/VoltAgent/awesome-agent-skills"],["microsoft/azure-eventhub-ts","voltagent","typescript","High-throughput event streaming","https://github.com/VoltAgent/awesome-agent-skills"],["microsoft/azure-cosmos-ts","voltagent","typescript","Cosmos DB NoSQL CRUD and queries","https://github.com/VoltAgent/awesome-agent-skills"],["microsoft/azure-ai-translation-ts","voltagent","typescript","Text and document translation","https://github.com/VoltAgent/awesome-agent-skills"],["microsoft/azure-ai-voicelive-ts","voltagent","typescript","Real-time bidirectional voice AI","https://github.com/VoltAgent/awesome-agent-skills"],["clickhouse/clickhouse-best-practices","voltagent","clickhouse","Best practices for working with ClickHouse","https://github.com/VoltAgent/awesome-agent-skills"],["clickhouse/clickhouse-architecture-advisor","voltagent","clickhouse","Design ClickHouse architectures and translate best practices into workload-specific decisions","https://github.com/VoltAgent/awesome-agent-skills"],["remotion-dev/remotion","voltagent","remotion","Programmatic video creation with React","https://github.com/VoltAgent/awesome-agent-skills"],["replicate/replicate","voltagent","replicate","Discover, compare, and run AI models using Replicates API","https://github.com/VoltAgent/awesome-agent-skills"]];

const SOURCES = {
  anthropics: { label: "Anthropics Official", color: "#FF6B35", count: 17, stars: "Official", repo: "https://github.com/anthropics/skills" },
  alirezarezvani: { label: "Claude Skills", color: "#00D4FF", count: 10, stars: 192, repo: "https://github.com/alirezarezvani/claude-skills" },
  antigravity: { label: "Antigravity", color: "#C084FC", count: 1436, stars: "24K+", repo: "https://github.com/sickn33/antigravity-awesome-skills" },
  voltagent: { label: "VoltAgent", color: "#34D399", count: 930, stars: "200+", repo: "https://github.com/VoltAgent/awesome-agent-skills" },
};

const TOTAL = 2393;

const CATALYST_CATS = [
  { id: "all", label: "All Skills", icon: "⚡" },
  { id: "content", label: "Content", icon: "✍️" },
  { id: "marketing", label: "Marketing", icon: "📈" },
  { id: "automation", label: "Automation", icon: "🤖" },
  { id: "ai-ml", label: "AI/ML", icon: "🧠" },
  { id: "business", label: "Business", icon: "💼" },
  { id: "design", label: "Design", icon: "🎨" },
  { id: "development", label: "Dev", icon: "💻" },
  { id: "security", label: "Security", icon: "🔐" },
  { id: "cloud", label: "Cloud", icon: "☁️" },
  { id: "workflow", label: "Workflow", icon: "⚙️" },
  { id: "project-management", label: "PM", icon: "📋" },
  { id: "legal", label: "Legal", icon: "⚖️" },
  { id: "api-integration", label: "APIs", icon: "🔗" },
  { id: "voice-agents", label: "Voice", icon: "🎙️" },
  { id: "data-ai", label: "Data", icon: "📊" },
  { id: "community", label: "Community", icon: "🌍" },
];

const SKILL_COUNT_BY_CAT = {
  all: 2393, content: 52, marketing: 46, automation: 45, "ai-ml": 104,
  business: 64, design: 33, development: 137, security: 73, cloud: 135,
  workflow: 53, "project-management": 19, legal: 12, "api-integration": 23,
  "voice-agents": 8, "data-ai": 13, community: 162,
};

const skills = PREVIEW_DATA.map(([name, src, cat, desc, url]) => ({ name, src, cat, desc, url }));

export default function CatalystOSSkills() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [activeSrc, setActiveSrc] = useState("all");
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState(null);
  const PER_PAGE = 24;

  const filtered = useMemo(() => {
    return skills.filter(s => {
      const matchesTab = activeTab === "all" || s.cat === activeTab;
      const matchesSrc = activeSrc === "all" || s.src === activeSrc;
      const q = search.toLowerCase();
      const matchesSearch = !q || s.name.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q) || s.cat.toLowerCase().includes(q);
      return matchesTab && matchesSrc && matchesSearch;
    });
  }, [search, activeTab, activeSrc]);

  const pages = Math.ceil(filtered.length / PER_PAGE);
  const visible = filtered.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  useEffect(() => { setPage(0); }, [search, activeTab, activeSrc]);

  const srcColor = (src) => SOURCES[src]?.color || "#888";

  return (
    <div style={{
      minHeight: "100vh",
      background: "#050508",
      color: "#E2E8F0",
      fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background glow */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        background: "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(192,132,252,0.08) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1400, margin: "0 auto", padding: "0 16px 40px" }}>

        {/* HEADER */}
        <div style={{ padding: "32px 0 24px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 8,
                  background: "linear-gradient(135deg, #C084FC, #FF6B35)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18, fontWeight: 900,
                }}>⚡</div>
                <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.5px" }}>Catalyst OS</span>
                <span style={{
                  fontSize: 11, fontWeight: 600, letterSpacing: "0.1em",
                  background: "rgba(192,132,252,0.15)", color: "#C084FC",
                  padding: "2px 8px", borderRadius: 4, border: "1px solid rgba(192,132,252,0.3)",
                  textTransform: "uppercase"
                }}>Skills Registry</span>
              </div>
              <p style={{ fontSize: 13, color: "#64748B", margin: 0 }}>
                All {TOTAL.toLocaleString()} skills integrated · 4 sources · Live as of April 2026
              </p>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {Object.entries(SOURCES).map(([key, s]) => (
                <a key={key} href={s.repo} target="_blank" rel="noreferrer" style={{
                  display: "flex", flexDirection: "column", alignItems: "center",
                  padding: "8px 12px", borderRadius: 8, textDecoration: "none",
                  background: "rgba(255,255,255,0.03)", border: `1px solid ${s.color}30`,
                  transition: "all 0.2s",
                }}>
                  <span style={{ fontSize: 16, fontWeight: 800, color: s.color }}>{s.count.toLocaleString()}</span>
                  <span style={{ fontSize: 10, color: "#64748B", marginTop: 1 }}>{s.label.split(" ")[0]}</span>
                </a>
              ))}
              <div style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                padding: "8px 12px", borderRadius: 8,
                background: "rgba(192,132,252,0.1)", border: "1px solid rgba(192,132,252,0.3)",
              }}>
                <span style={{ fontSize: 16, fontWeight: 800, color: "#C084FC" }}>{TOTAL.toLocaleString()}</span>
                <span style={{ fontSize: 10, color: "#C084FC", marginTop: 1 }}>TOTAL</span>
              </div>
            </div>
          </div>
        </div>

        {/* SEARCH + FILTER */}
        <div style={{ padding: "20px 0 16px", display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ position: "relative", flex: "1 1 280px", maxWidth: 400 }}>
            <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#475569", fontSize: 15 }}>🔍</span>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search 2,393 skills..."
              style={{
                width: "100%", padding: "10px 12px 10px 36px",
                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 8, color: "#E2E8F0", fontSize: 14, outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {[{ id: "all", label: "All Sources" }, ...Object.entries(SOURCES).map(([id, s]) => ({ id, label: s.label.split(" ")[0], color: s.color }))].map(({ id, label, color }) => (
              <button key={id} onClick={() => setActiveSrc(id)} style={{
                padding: "8px 12px", borderRadius: 6, cursor: "pointer", fontSize: 12, fontWeight: 600,
                border: `1px solid ${activeSrc === id ? (color || "#C084FC") : "rgba(255,255,255,0.08)"}`,
                background: activeSrc === id ? `${color || "#C084FC"}15` : "transparent",
                color: activeSrc === id ? (color || "#C084FC") : "#64748B",
                transition: "all 0.15s",
              }}>{label}</button>
            ))}
          </div>
        </div>

        {/* CATEGORY TABS */}
        <div style={{
          display: "flex", gap: 6, overflowX: "auto", paddingBottom: 8,
          scrollbarWidth: "none", msOverflowStyle: "none",
          marginBottom: 20,
        }}>
          {CATALYST_CATS.map(cat => (
            <button key={cat.id} onClick={() => setActiveTab(cat.id)} style={{
              whiteSpace: "nowrap", padding: "7px 14px", borderRadius: 20, cursor: "pointer",
              fontSize: 12, fontWeight: 600, transition: "all 0.15s",
              border: `1px solid ${activeTab === cat.id ? "#C084FC" : "rgba(255,255,255,0.08)"}`,
              background: activeTab === cat.id ? "rgba(192,132,252,0.15)" : "rgba(255,255,255,0.02)",
              color: activeTab === cat.id ? "#C084FC" : "#94A3B8",
            }}>
              {cat.icon} {cat.label}
              {cat.id !== "all" && SKILL_COUNT_BY_CAT[cat.id] && (
                <span style={{ marginLeft: 5, fontSize: 10, opacity: 0.6 }}>{SKILL_COUNT_BY_CAT[cat.id]}</span>
              )}
            </button>
          ))}
        </div>

        {/* STATS ROW */}
        <div style={{ marginBottom: 16, fontSize: 12, color: "#475569", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>Showing <strong style={{ color: "#94A3B8" }}>{filtered.length}</strong> preview skills · <strong style={{ color: "#C084FC" }}>{TOTAL.toLocaleString()} total</strong> in registry</span>
          {pages > 1 && (
            <span>{page + 1} / {pages}</span>
          )}
        </div>

        {/* SKILL GRID */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 12,
          marginBottom: 24,
        }}>
          {visible.map((s, i) => {
            const src = SOURCES[s.src] || {};
            return (
              <div key={i} onClick={() => setSelected(selected?.name === s.name ? null : s)}
                style={{
                  padding: "14px 16px", borderRadius: 10, cursor: "pointer",
                  background: selected?.name === s.name
                    ? `linear-gradient(135deg, ${src.color}15, rgba(255,255,255,0.02))`
                    : "rgba(255,255,255,0.025)",
                  border: `1px solid ${selected?.name === s.name ? src.color + "50" : "rgba(255,255,255,0.07)"}`,
                  transition: "all 0.2s",
                  position: "relative", overflow: "hidden",
                }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                  <span style={{
                    fontSize: 11, fontWeight: 700, letterSpacing: "0.05em",
                    color: src.color, textTransform: "uppercase",
                  }}>{s.src}</span>
                  <span style={{
                    fontSize: 10, padding: "2px 7px", borderRadius: 10,
                    background: "rgba(255,255,255,0.05)", color: "#64748B",
                    border: "1px solid rgba(255,255,255,0.06)"
                  }}>{s.cat}</span>
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#E2E8F0", marginBottom: 6, lineHeight: 1.3 }}>
                  {s.name.length > 40 ? s.name.slice(0, 40) + "…" : s.name}
                </div>
                <div style={{ fontSize: 12, color: "#64748B", lineHeight: 1.5 }}>
                  {s.desc.length > 80 ? s.desc.slice(0, 80) + "…" : s.desc}
                </div>
              </div>
            );
          })}
        </div>

        {/* SELECTED SKILL DETAIL */}
        {selected && (
          <div style={{
            position: "fixed", bottom: 20, right: 20, left: 20,
            maxWidth: 500, marginLeft: "auto",
            background: "#0D0D14", border: `1px solid ${SOURCES[selected.src]?.color || "#C084FC"}40`,
            borderRadius: 14, padding: 20, boxShadow: `0 0 40px ${SOURCES[selected.src]?.color || "#C084FC"}20`,
            zIndex: 100,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: SOURCES[selected.src]?.color, textTransform: "uppercase" }}>
                {SOURCES[selected.src]?.label}
              </span>
              <button onClick={() => setSelected(null)} style={{
                background: "none", border: "none", color: "#475569", cursor: "pointer", fontSize: 16
              }}>✕</button>
            </div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#F1F5F9", marginBottom: 8 }}>{selected.name}</div>
            <div style={{ fontSize: 13, color: "#94A3B8", lineHeight: 1.6, marginBottom: 14 }}>{selected.desc}</div>
            <div style={{ display: "flex", gap: 8 }}>
              <span style={{
                fontSize: 11, padding: "3px 10px", borderRadius: 20,
                background: "rgba(255,255,255,0.05)", color: "#64748B",
                border: "1px solid rgba(255,255,255,0.08)"
              }}>📂 {selected.cat}</span>
              <a href={selected.url} target="_blank" rel="noreferrer" style={{
                fontSize: 11, padding: "3px 10px", borderRadius: 20, textDecoration: "none",
                background: `${SOURCES[selected.src]?.color || "#C084FC"}15`,
                color: SOURCES[selected.src]?.color || "#C084FC",
                border: `1px solid ${SOURCES[selected.src]?.color || "#C084FC"}30`,
              }}>↗ View Repo</span>
            </div>
          </div>
        )}

        {/* PAGINATION */}
        {pages > 1 && (
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 8 }}>
            <button onClick={() => setPage(Math.max(0, page - 1))} disabled={page === 0} style={{
              padding: "8px 16px", borderRadius: 6, cursor: page > 0 ? "pointer" : "not-allowed",
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
              color: page > 0 ? "#94A3B8" : "#2D3748", fontSize: 13,
            }}>← Prev</button>
            {Array.from({ length: Math.min(5, pages) }, (_, i) => {
              const pg = page < 3 ? i : page > pages - 3 ? pages - 5 + i : page - 2 + i;
              if (pg < 0 || pg >= pages) return null;
              return (
                <button key={pg} onClick={() => setPage(pg)} style={{
                  padding: "8px 12px", borderRadius: 6, cursor: "pointer", minWidth: 36,
                  background: pg === page ? "rgba(192,132,252,0.2)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${pg === page ? "#C084FC50" : "rgba(255,255,255,0.08)"}`,
                  color: pg === page ? "#C084FC" : "#64748B", fontSize: 13, fontWeight: pg === page ? 700 : 400,
                }}>{pg + 1}</button>
              );
            })}
            <button onClick={() => setPage(Math.min(pages - 1, page + 1))} disabled={page >= pages - 1} style={{
              padding: "8px 16px", borderRadius: 6, cursor: page < pages - 1 ? "pointer" : "not-allowed",
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
              color: page < pages - 1 ? "#94A3B8" : "#2D3748", fontSize: 13,
            }}>Next →</button>
          </div>
        )}

        {/* BOTTOM STATS */}
        <div style={{
          marginTop: 40, padding: "20px 0", borderTop: "1px solid rgba(255,255,255,0.05)",
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16
        }}>
          {[
            { label: "Total Skills Indexed", value: TOTAL.toLocaleString(), icon: "⚡", color: "#C084FC" },
            { label: "Official Anthropic", value: "17", icon: "🏆", color: "#FF6B35" },
            { label: "Production-Tested", value: "192+", icon: "✅", color: "#00D4FF" },
            { label: "Antigravity Arsenal", value: "1,436", icon: "🚀", color: "#C084FC" },
            { label: "VoltAgent Curated", value: "930", icon: "⚡", color: "#34D399" },
            { label: "Skill Categories", value: "60+", icon: "📁", color: "#F59E0B" },
          ].map(({ label, value, icon, color }) => (
            <div key={label} style={{
              padding: "16px", borderRadius: 10,
              background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)",
            }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{icon}</div>
              <div style={{ fontSize: 24, fontWeight: 800, color, marginBottom: 2 }}>{value}</div>
              <div style={{ fontSize: 12, color: "#475569" }}>{label}</div>
            </div>
          ))}
        </div>

        {/* REPO LINKS */}
        <div style={{ marginTop: 24, display: "flex", gap: 10, flexWrap: "wrap" }}>
          {Object.entries(SOURCES).map(([key, s]) => (
            <a key={key} href={s.repo} target="_blank" rel="noreferrer" style={{
              display: "flex", alignItems: "center", gap: 8, padding: "10px 16px",
              borderRadius: 8, textDecoration: "none",
              background: `${s.color}10`, border: `1px solid ${s.color}30`,
              color: s.color, fontSize: 13, fontWeight: 600,
              transition: "all 0.2s",
            }}>
              <span>↗</span>
              <div>
                <div>{s.label}</div>
                <div style={{ fontSize: 10, opacity: 0.6 }}>⭐ {s.stars} · {s.count.toLocaleString()} skills</div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </div>
  );
}
