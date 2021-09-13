const { format } = require('date-fns');
var axios = require('axios');
let token = 'NJ06A666-741F-484E-AEC9-8B91D2CP';
const regexMTNNumber = /234((7025\d{6})|(7026\d{6})|(703\d{7})|(704\d{7})|(706\d{7})|(803\d{7})|(806\d{7})|(810\d{7})|(813\d{7})|(814\d{7})|(816\d{7})|(903\d{7})|(906\d{7}))/;

async function subscribe(msisdn, serviceid, channel) {
  if (msisdn.match(regexMTNNumber)) {
    try {
      const info = { msisdn, serviceid, channel };
      // Details to track msisdn coming from Ayoba
      const date = format(new Date(), 'yyyyMMdd');
      const trackChannel = "AyobaM";
      const trackServiceTen = "LN10";
      const trackServiceFifty = "LN50";
      const tracktrxid = `${date}-ayoba-${Math.floor(Math.random() * 10000)}`;
      const trackInfo = { msisdn, channel: trackChannel, service: info.serviceid == 526 ? trackServiceTen : trackServiceFifty, trxid: tracktrxid };
      const trackOptions = {
        headers: { 'Content-Type': 'application/json' }
      };

      const options = {
        headers: { 'X-TOKEN': token, 'CPID': '11' }
      };
      const response = await axios.post('http://89.107.63.145:8088/subscribe', info, options);

      if (response.data.status === true) {
        await axios.post('https://promo.ydafrica.com/sync/tracking/microayoba_req', trackInfo, trackOptions);
        return { status: 200, data: response.data };
      }

      else {
        return { status: 400, msg: response.data.message };
      }

    } catch (error) {
      throw Error(error);
    }
  }
  else {
    return { status: 403, msg: 'Sorry, This service is restricted to MTN Nigeria Phone Numbers only' };
  }
}

module.exports = subscribe;