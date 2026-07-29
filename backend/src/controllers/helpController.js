const { buildHelpReply } = require('../utils/helpBotEngine');
const { answerWithAgent } = require('../utils/aiAssist');

async function chat(req, res) {
  const { message, history } = req.body;
  if (!message || !message.trim()) {
    return res.status(400).json({ message: 'message is required' });
  }

  const turns = Array.isArray(history) ? history : [];

  const result = await answerWithAgent({
    agentName: 'help',
    req,
    message,
    history: turns,
    // This endpoint is public, so the caller is never entitled to the vault
    // links. They still get names and free-tier terms, plus the upsell.
    toolContext: { vaultAccess: false },
    fallback: () => buildHelpReply(message, turns),
  });

  res.json({ reply: result.reply, source: result.source, model: result.model });
}

module.exports = { chat };
