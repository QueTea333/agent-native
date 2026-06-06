import {
  table,
  text,
  integer,
  now,
  ownableColumns,
  createSharesTable
} from "@agent-native/core/db/schema";

// 1. Workspaces (The root container for all agent-native activities)
export const workspaces = table("workspaces", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").unique().notNull(),
  createdAt: text("created_at").default(now()),
  updatedAt: text("updated_at").default(now()),
});

// 2. Users (Reference for Supabase Auth users)
export const users = table("users", {
  id: text("id").primaryKey(), // Matches Supabase auth.users.id
  email: text("email").unique().notNull(),
  fullName: text("full_name"),
  avatarUrl: text("avatar_url"),
  createdAt: text("created_at").default(now()),
});

// 3. App Entities (Registry of workspace-specific applications/modules)
export const appEntities = table("app_entities", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // 'mail', 'calendar', 'forms', etc.
  config: text("config"), // JSON blob for app-specific configuration
  createdAt: text("created_at").default(now()),
  updatedAt: text("updated_at").default(now()),
  ...ownableColumns(), // Adds workspace_id and owner scoping
});

// 4. Agent Logs (Permanent trace of agent activities across the workspace)
export const agentLogs = table("agent_logs", {
  id: text("id").primaryKey(),
  agentId: text("agent_id").notNull(),
  action: text("action").notNull(),
  input: text("input"), // JSON or text input to the agent
  output: text("output"), // JSON or text output from the agent
  status: text("status").default("success"), // success, error, pending
  createdAt: text("created_at").default(now()),
  ...ownableColumns(), // Scoped to workspace
});

// Sharing helpers for Row Level Security (RLS)
export const workspaceShares = createSharesTable("workspace_shares");
export const appEntityShares = createSharesTable("app_entity_shares");
export const agentLogShares = createSharesTable("agent_log_shares");

// 5. Workspace Secrets (Secure storage for third-party API keys)
export const workspaceSecrets = table("workspace_secrets", {
  id: text("id").primaryKey(),
  key: text("key").notNull(), // e.g., 'SLACK_API_TOKEN', 'GOOGLE_CLIENT_SECRET'
  value: text("value").notNull(), // Encrypted value
  description: text("description"),
  createdAt: text("created_at").default(now()),
  updatedAt: text("updated_at").default(now()),
  ...ownableColumns(),
});

export const workspaceSecretShares = createSharesTable("workspace_secret_shares");

// --- Phase 1 Additions ---

// Epic 1.1: Mail (Threads and Emails)
export const threads = table("threads", {
  id: text("id").primaryKey(),
  subject: text("subject"),
  lastMessageAt: text("last_message_at"),
  createdAt: text("created_at").default(now()),
  updatedAt: text("updated_at").default(now()),
  ...ownableColumns(),
});

export const emails = table("emails", {
  id: text("id").primaryKey(),
  threadId: text("thread_id").notNull(),
  from: text("from").notNull(),
  to: text("to").notNull(),
  subject: text("subject"),
  body: text("body"),
  sentAt: text("sent_at"),
  createdAt: text("created_at").default(now()),
  updatedAt: text("updated_at").default(now()),
  ...ownableColumns(),
});

export const threadShares = createSharesTable("thread_shares");
export const emailShares = createSharesTable("email_shares");

// Epic 1.2: Calendar (Calendars, Events, and Booking Links)
export const calendars = table("calendars", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // 'google', 'outlook', etc.
  createdAt: text("created_at").default(now()),
  updatedAt: text("updated_at").default(now()),
  ...ownableColumns(),
});

export const events = table("events", {
  id: text("id").primaryKey(),
  calendarId: text("calendar_id").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  location: text("location"),
  startTime: text("start_time").notNull(),
  endTime: text("end_time").notNull(),
  createdAt: text("created_at").default(now()),
  updatedAt: text("updated_at").default(now()),
  ...ownableColumns(),
});

export const bookingLinks = table("booking_links", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").unique().notNull(),
  config: text("config"), // JSON configuration for availability, duration, etc.
  createdAt: text("created_at").default(now()),
  updatedAt: text("updated_at").default(now()),
  ...ownableColumns(),
});

export const calendarShares = createSharesTable("calendar_shares");
export const eventShares = createSharesTable("event_shares");
export const bookingLinkShares = createSharesTable("booking_link_shares");
