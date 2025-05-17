const axios = require('axios');
const { generatePersonalizedText } = require('../utils/ai');

exports.handleNewLead = async (req, res) => {
  const { name, email, company, message } = req.body;

  if (!name || !email || !company || !message) {
    return res.status(400).json({ error: 'Missing required lead info.' });
  }

  try {
    const aiText = await generatePersonalizedText(message, name, company);
    const payload = { name, email, company, message, aiPersonalizedText: aiText };

    if (process.env.MAKE_WEBHOOK_URL) {
      await axios.post(process.env.MAKE_WEBHOOK_URL, payload);
    }

    res.status(200).json({ success: true, aiPersonalizedText: aiText });
  } catch (err) {
    console.error('Lead error:', err);
    res.status(500).json({ error: 'Failed to process lead.' });
  }
};
