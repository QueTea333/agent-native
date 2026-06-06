import { defineEventHandler, sendRedirect } from "h3";

export default defineEventHandler(async (event) => {
  const clientId = process.env.SLACK_CLIENT_ID;
  const redirectUri = `${process.env.APP_URL}/api/auth/slack/callback`;

  const authUrl = `https://slack.com/oauth/v2/authorize?client_id=${clientId}&scope=chat:write,commands,incoming-webhook&user_scope=identity.basic&redirect_uri=${redirectUri}`;

  return sendRedirect(event, authUrl);
});
