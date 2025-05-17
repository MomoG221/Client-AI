const axios = require('axios');

exports.handleJoinRequest = async (req, res) => {
  const { name, email, company, servicePlan, comments } = req.body;

  if (!name || !email || !company || !servicePlan) {
    return res.status(400).json({ error: 'Missing required join info.' });
  }

  try {
    const payload = { name, email, company, servicePlan, comments };

    if (process.env.MAKE_WEBHOOK_URL1) {
      await axios.post(process.env.MAKE_WEBHOOK_URL1, payload);
    }

    res.status(200).json({ success: true, message: 'Joined successfully' });
  } catch (err) {
    console.error('Join error:', err);
    res.status(500).json({ error: 'Failed to join.' });
  }
};
