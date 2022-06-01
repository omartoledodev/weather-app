const axios = require('axios')

export async function forecastWeather (location) {
  const options = {
    method: 'GET',
    url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
    params: { q: location, days: '3' },
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
