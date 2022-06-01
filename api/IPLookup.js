const axios = require('axios')

export async function getLocationByIp (ip) {
  const options = {
    method: 'GET',
    url: 'https://weatherapi-com.p.rapidapi.com/ip.json',
    params: { q: ip },
    headers: {
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY
    }
  }

  const response = await axios.request(options)

  const body = {
    response: response.data
  }

  return {
    status: 200,
    body
  }
}
