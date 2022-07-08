require('dotenv').config();
const { format } = require('date-fns');
var axios = require('axios');
let token = 'NJ06A666-741F-484E-AEC9-8B91D2CP';
const regexMTNNumber = /234((7025\d{6})|(7026\d{6})|(703\d{7})|(704\d{7})|(706\d{7})|(803\d{7})|(806\d{7})|(810\d{7})|(813\d{7})|(814\d{7})|(816\d{7})|(903\d{7})|(906\d{7}))/;

async function subscribe(pisipid, msisdn, channel, trxid) {
  if (msisdn.match(regexMTNNumber)) {
    try {
      const info = { pisipid, msisdn, channel, trxid };
      console.log(info);
      // Details to track msisdn coming from Ayoba
      const date = format(new Date(), 'yyyyMMdd');
      const trackChannel = "AyobaM";
      const trackServiceTen = "LN10";
      const trackServiceFifty = "LN50";
      const tracktrxid = `${date}-ayoba-${Math.floor(Math.random() * 10000)}`;
      const trackInfo = { msisdn, channel: trackChannel, service: info.pisipid == 526 ? trackServiceTen : trackServiceFifty, trxid: tracktrxid };
      const trackOptions = {
        headers: { 'Content-Type': 'application/json' }
      };

      const options = {
        headers: {
          'Content-Type': 'application/json',
          'vaspid': process.env.PISIMOBILE_VASPID,
          'pisi-authorization-token': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InZhc3AiOiIxIn0sImlhdCI6MTY1NTg1MTczMSwiZXhwIjoxNjcxNDAzNzMxfQ.QgXtjAAt014JdRbtAN5Ow9KpLZjGmGO0NVvHxwDxN5U`
      }
      };
      const response = await axios.post(process.env.PISIMOBILE_SUBSCRIPTION_URL, info, options);
      console.log(response.data);
      if (response.data.success === true && response.data.message === 'Successful') {
        let trackResponse = await axios.post('https://promo.ydafrica.com/sync/tracking/microayoba_req', trackInfo, trackOptions);
        console.log(trackResponse.data, 'okay'); // This guy returns data: {status: 'success'}
        let message = response.data;
        return { message };
      }
      else if(response.data.success == false && response.data.message === 'You have Already Subscribed Requested Services'){
        return { status: 400, msg: 'User is already subscribed to the service' };
      }

      else {
        // ctx.throw(400, 'subscription request failed');
        return { status: 400, msg: response.data.message };
      }

    } catch (error) {
      return error.response.data;
      // throw Error(error);
    }
  }
  else {
    return { status: 403, msg: 'Sorry, This service is restricted to MTN Nigeria Phone Numbers only' };
  }
}

module.exports = subscribe;