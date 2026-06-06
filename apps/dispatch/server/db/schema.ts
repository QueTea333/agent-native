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
