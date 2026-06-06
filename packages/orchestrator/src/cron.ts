import cron from 'node-cron';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

// Schedule: Daily at 9:00 AM
cron.schedule('0 9 * * *', async () => {
  console.log('Running Scheduled Task: Daily Workspace Summary');

  try {
    // In a real scenario, this would call the /v1/route endpoint
    // or trigger an agent action directly.
    const { error } = await supabase
      .from('agent_logs')
      .insert([
        {
          agent_id: 'cron-worker',
          action: 'DAILY_SUMMARY',
          input: 'Scheduled trigger',
          output: 'Workspace summary generated and sent to stakeholders.',
          workspace_id: 'global', // Summary for all workspaces
          owner_id: 'system'
        }
      ]);

    if (error) throw error;
    console.log('Daily Summary Task Completed.');
  } catch (err) {
    console.error('Scheduled Task Error:', err);
  }
});

console.log('CRON Worker Initialized.');
