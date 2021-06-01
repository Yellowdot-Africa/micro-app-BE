const express = require('express');
const subscribe = require('./controller');
const router = express.Router();

router.post('/subscribe', async(req, res) => {
  try {
      const { msisdn, ServiceID, ChannelID } = req.body;
      const response = await subscribe(msisdn, ServiceID, ChannelID);
      return res.status(200).json({ response });
  } catch (error) {
      return res.status(500).json({ error: error });
  }
});

module.exports = router;