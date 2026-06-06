import express from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

app.post('/v1/route', async (req, res) => {
  const { action, payload, workspaceId } = req.body;

  try {
    // 1. Log the agent activity (This would typically happen via a core utility)
    console.log(`Agent Action: ${action} in Workspace: ${workspaceId}`);

    // 2. Mock LLM Routing / Processing
    const result = { status: 'processed', data: payload };

    // 3. Broadcast mutation to Supabase Realtime
    const { error } = await supabase
      .from('agent_logs')
      .insert([
        {
          agent_id: 'orchestrator-1',
          action: action,
          input: JSON.stringify(payload),
          output: JSON.stringify(result),
          workspace_id: workspaceId,
          owner_id: 'system' // Placeholder for system-level actions
        }
      ]);

    if (error) throw error;

    res.json(result);
  } catch (err) {
    console.error('Orchestration error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Agent Orchestrator listening at http://localhost:${port}`);
});
import './cron.js';
