const express = require('express');
const { format } = require('date-fns');
const subscribe = require('./controller');
const router = express.Router();

router.post('/subscribe', async(req, res) => {
  try {
      let { pisipid, msisdn, channel } = req.body;
      const trxDate = format(new Date(), 'yyyyMMdd');
      trxid = `ln${trxDate}${Math.floor(Math.random() * 10000)}`;
      const response = await subscribe(pisipid, msisdn, channel, trxid);
      return res.status(response.status).json(response);
  } catch (error) {
      return res.status(500).json({ error: error.data });
  }
});

module.exports = router;