const axios = require('axios')

export async function getIp () {
  const response = await axios.get('https://api.ipify.org?format=json')

  const body = {
    ip: response.data.ip
  }

  return {
    status: 200,
    body
  }
}
