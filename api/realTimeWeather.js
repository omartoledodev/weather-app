const axios = require('axios')

export async function getCurrentWeather (location) {
  const options = {
    method: 'GET',
    url: 'https://weatherapi-com.p.rapidapi.com/current.json',
    params: { q: location },
    headers: {
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY
    }
  }

  const response = await axios.request(options)

  const body = {
    current: response.data.current,
    location: response.data.location
  }

  return {
    status: 200,
    body
  }
}
