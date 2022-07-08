const express = require('express');
const { format } = require('date-fns');
const subscribe = require('./controller');
const router = express.Router();

router.post('/subscribe', async(req, res) => {
  try {
      let { pisipid, msisdn, channel, trxid } = req.body;
      // console.log(pisipid, 'pisi');
      // let serviceid;
      // serviceid = pisipid == 526 ? '4' : pisipid == 322 ? '3' : '';
      // console.log(serviceid, 'here');
      //check that the service conforms with the svcId in the DB and PISIMOBILE side.
      //3 - N50, 4 - N10, 5 - N20, 6 - N200 (3,4,5,6 are the ServiceIDs or pisipids of LN services on PISIMOBILE )
      //N10 - 526, N20 - 525, N50 - 322, N200 - 527 (525, 322, 527 are the ServiceIDs or svcId in the DB)
      const trxDate = format(new Date(), 'yyyyMMdd');
      trxid = `ln${trxDate}${Math.floor(Math.random() * 10000)}`;

      const response = await subscribe(pisipid, msisdn, channel, trxid);
      return res.status(200).json(response);
  } catch (error) {
      return res.status(500).json({ error: error });
  }
});

module.exports = router;