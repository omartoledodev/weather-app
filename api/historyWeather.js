const axios = require('axios')

export async function historyWeather (location, date, endDt) {
  const options = {
    method: 'GET',
    url: 'https://weatherapi-com.p.rapidapi.com/history.json',
    params: { q: location, dt: date, end_dt: endDt },
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
