const {format} = require('date-fns');
var axios = require('axios');
let token = 'NJ06A666-741F-484E-AEC9-8B91D2CP';
async function subscribe(msisdn, serviceid, channel) {
  try {
      const info = { msisdn, serviceid, channel };
      
      // Details to track msisdn coming from Ayoba
      const date = format(new Date(), 'yyyyMMdd');
      const trackChannel ="AyobaM";
      const trackServiceTen = "LN10";
      const trackServiceFifty = "LN50";
      const tracktrxid = `${date}-ayoba-${Math.floor(Math.random() * 10000)}`;
      const trackInfo = {msisdn, channel: trackChannel, service: info.serviceid == 526 ? trackServiceTen : trackServiceFifty, trxid: tracktrxid};
      const trackOptions = {
        headers: { 'Content-Type': 'application/json'}
      };
      //Stops here
      
      const options = {
        headers: { 'X-TOKEN': token, 'CPID': '11' }
      };
      const response = await axios.post('http://89.107.63.145:8088/subscribe', info, options);
      await axios.post('https://promo.ydafrica.com/sync/tracking/microayoba_req', trackInfo,  trackOptions);

      if(response.data.status === false){
        return { status: 400, msg: response.data.message };
      }
      return {status: 200, data: response.data};
  } catch (error) {
    throw Error(error);
  }
}

module.exports = subscribe;