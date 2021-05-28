var axios = require('axios');

async function subscribe(msisdn, ServiceID, ChannelID) {
  try {
      const info = { msisdn, ServiceID, ChannelID };
      const options = {
          headers: { 'X-TOKEN': 'NJ06A666-741F-484E-AEC9-8B91D2CP', 'CPID': '11' }
      };
      const response = await axios.post('http://89.107.63.145:8088/subscribe', info, options);
      console.log('ctrl', response.data);
      return response.data;
  } catch (error) {
    console.log(error);
      throw Error(error);
  }
}

module.exports = subscribe;