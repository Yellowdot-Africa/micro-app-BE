var axios = require('axios');
let token = 'NJ06A666-741F-484E-AEC9-8B91D2CP'
async function subscribe(msisdn, serviceid, channel) {
  try {
      const info = { msisdn, serviceid, channel };
      const options = {
          headers: { 'X-TOKEN': token, 'CPID': '11' }
      };
      const response = await axios.post('http://89.107.63.145:8088/subscribe', info, options);
      if(response.data.status === false){
        return { status: 400, msg: response.data.message };
      }
      return {status: 200, data: response.data};
  } catch (error) {
    throw Error(error);
  }
}

module.exports = subscribe;