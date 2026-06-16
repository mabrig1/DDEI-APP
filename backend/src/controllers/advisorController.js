const { buildReply } = require('../utils/advisorEngine');

async function chat(req, res) {
  const { message, history } = req.body;
  if (!message || !message.trim()) {
    return res.status(400).json({ message: 'message is required' });
  }

  const reply = buildReply(message, Array.isArray(history) ? history : []);
  res.json({ reply });
}

module.exports = { chat };
