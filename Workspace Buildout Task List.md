# **Multi-App Workspace Buildout Plan**

**Version:** V1.0

**Assignee:** Jules AI

**Architecture:** Agent-Native (Cloudflare, Supabase, Neon, Render)

## **Objective**

Execute the full buildout of the Agent-Native multi-app workspace based on the agent-native reference architecture. The workspace consists of 12 distinct modules integrated under a single control plane.

## **Phase 0: The Core Architecture**

### **Epic 0.1: Starter (The Minimal Scaffold)**

*Objective: Establish the base monorepo, auth, and agent chat framework.*

* \[ \] **Task 1: Repository Setup.** Initialize Next.js monorepo. Configure Cloudflare Pages deployment pipeline.  
* \[ \] **Task 2: Database & Auth Setup.** Provision Neon Postgres and Supabase Auth. Run 07-SCHEMA.sql to create users, workspaces, app\_entities, and agent\_logs.  
* \[ \] **Task 3: Dual Interface UI.** Build the base layout featuring the persistent Cmd/Ctrl+K Agent prompt overlay and workspace navigation sidebar.  
* \[ \] **Task 4: Agent Orchestrator (Render).** Scaffold the Node/Express backend. Implement basic LLM routing and Supabase Realtime WebSocket broadcasting.

### **Epic 0.2: Dispatch (Workspace Control Plane)**

*Objective: Build the central hub for secrets, integrations, and automation.*

* \[ \] **Task 1: Secrets Manager.** Create workspace\_secrets table with encrypted values (e.g., API keys for Slack, Google, etc.). UI to manage keys.  
* \[ \] **Task 2: Integration Hub.** Build Oauth flows for core 3rd party apps.  
* \[ \] **Task 3: Scheduled Jobs.** Implement an agent-driven CRON system on Render to execute scheduled tasks (e.g., "Send a summary report every Friday at 5 PM").

## **Phase 1: Communication & Scheduling**

### **Epic 1.1: Mail (Agent-Native Superhuman)**

*Objective: Build an AI-first inbox.*

* \[ \] **Task 1: Data Layer.** Schema for emails, threads, labels.  
* \[ \] **Task 2: Interface.** Build a keyboard-first UI (j/k navigation, e to archive, c to compose).  
* \[ \] **Task 3: Agent Tools.** Implement tools: draftEmail(), triageInbox(), summarizeThread().  
* \[ \] **Task 4: Real-time Sync.** Connect Gmail/Outlook webhooks to update the Neon DB, reflecting instantly in the UI.

### **Epic 1.2: Calendar (Agent-Native GCal)**

*Objective: Autonomous scheduling and event management.*

* \[ \] **Task 1: Data Layer.** Schema for events, calendars, booking\_links.  
* \[ \] **Task 2: Interface.** Build a React-based weekly/monthly calendar grid.  
* \[ \] **Task 3: Agent Tools.** Implement tools: findAvailableSlot(), createEvent(), rescheduleEvent().  
* \[ \] **Task 4: Public Links.** Generate public scheduling pages that interface with the agent to negotiate times with external guests.

### **Epic 1.3: Brain (Institutional Memory)**

*Objective: Clean company chat with cited knowledge.*

* \[ \] **Task 1: Vector DB Setup.** Enable pgvector in Neon. Schema for knowledge\_base and chat\_messages.  
* \[ \] **Task 2: RAG Pipeline.** Create background workers to ingest Docs/Slack/Mail into vector embeddings.  
* \[ \] **Task 3: Interface.** Build a chat UI with inline citations and "review gates" (user must approve an agent's drafted message before it sends).

## **Phase 2: Content & Creative**

### **Epic 2.1: Content (Agent-Native Notion/Docs)**

*Objective: Collaborative Markdown \+ Tiptap editor.*

* \[ \] **Task 1: Data Layer.** Schema for documents, blocks, revisions.  
* \[ \] **Task 2: Tiptap Integration.** Implement a block-based rich text editor in Next.js.  
* \[ \] **Task 3: Multi-user Collab.** Wire Tiptap's collaborative extension to Supabase Realtime (Yjs).  
* \[ \] **Task 4: Agent Co-writer.** Implement tools allowing the agent to highlight, rewrite, or generate new blocks inside the document concurrently with the user.

### **Epic 2.2: Assets (Digital Asset Manager)**

*Objective: Manage and generate on-brand assets.*

* \[ \] **Task 1: Storage Layer.** Connect Cloudflare R2 or Supabase Storage. Schema for assets, tags, brand\_guidelines.  
* \[ \] **Task 2: Interface.** Build a masonry grid gallery with drag-and-drop upload.  
* \[ \] **Task 3: Image Generation.** Integrate DALL-E 3 / Midjourney / Flux APIs. Agent tools to generate images strictly adhering to stored brand guidelines.

### **Epic 2.3: Slides (Agent-Native Google Slides)**

*Objective: React-based decks generated and edited directly.*

* \[ \] **Task 1: Data Layer.** Schema for decks, slide\_pages, slide\_elements (JSON representation of layout).  
* \[ \] **Task 2: Rendering Engine.** Build a React component that translates JSON into stylized 16:9 slide cards.  
* \[ \] **Task 3: Agent Tools.** Implement generateDeckOutline(), addSlide(), reformatSlide().

### **Epic 2.4: Design (Prototyping Studio)**

*Objective: HTML prototyping studio for interactive designs.*

* \[ \] **Task 1: Live Preview.** Build an isolated iframe sandbox to render raw HTML/Tailwind/Alpine.js.  
* \[ \] **Task 2: Agent Tools.** Implement tools allowing the agent to write and incrementally update HTML/CSS in the Neon DB, which streams instantly to the iframe sandbox.

## **Phase 3: Media & Analytics**

### **Epic 3.1: Video (Agent-Native Remotion Editor)**

*Objective: Prompt-driven video assembly.*

* \[ \] **Task 1: Remotion Setup.** Integrate Remotion into the Next.js frontend to render video sequences natively via React.  
* \[ \] **Task 2: Data Layer.** Schema for video\_projects, timeline\_clips, audio\_tracks.  
* \[ \] **Task 3: Agent Tools.** Implement tools: generateVideoTimeline(), trimClip(), addCaptions().

### **Epic 3.2: Clips (Async Screen & Camera Recording)**

*Objective: Agent-native Loom replacement.*

* \[ \] **Task 1: WebRTC Interface.** Build browser-based screen/camera recording using MediaRecorder API.  
* \[ \] **Task 2: Transcription.** Route recorded audio to Whisper API for transcription.  
* \[ \] **Task 3: AI Processing.** Agent automatically generates a title, chapter markers, and a bulleted summary based on the transcript, saving to the Neon DB.

### **Epic 3.3: Analytics (Agent-Native Amplitude)**

*Objective: Natural language to dashboards.*

* \[ \] **Task 1: Data Ingestion.** Create webhook endpoints to receive events and store them in a time-series optimized Neon table.  
* \[ \] **Task 2: Interface.** Integrate Recharts or Chart.js.  
* \[ \] **Task 3: Text-to-SQL Agent.** Build a specialized agent with strictly read-only DB access to convert natural language queries into SQL, returning JSON data mapped to chart components.

### **Epic 3.4: Forms (Agent-Native Typeform)**

*Objective: Build, share, and intelligently route submissions.*

* \[ \] **Task 1: Data Layer.** Schema for forms (JSON schema definitions) and submissions.  
* \[ \] **Task 2: Form Builder UI.** Drag-and-drop interface to construct form JSON schemas.  
* \[ \] **Task 3: Agent Routing.** Upon submission, an agent processes the data and uses *Dispatch* tools to route it (e.g., categorize urgency, send to Slack, update CRM).

## **Jules AI Execution Directives**

1. **Start with Phase 0:** Do not proceed to any other phase until Epic 0.1 and 0.2 are merged and deployed.  
2. **Database First:** For every epic, always generate the Drizzle/SQL schema changes first and request review.  
3. **No Siloed Data:** Every module must tie back to the workspace\_id.  
4. **Use Shared UI Components:** Leverage shadcn/ui or Radix UI primitives across all modules for consistency.