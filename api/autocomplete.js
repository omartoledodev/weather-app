const axios = require('axios')

export async function autocompleteLocations (query) {
  const options = {
    method: 'GET',
    url: 'https://weatherapi-com.p.rapidapi.com/search.json',
    params: { q: query },
    headers: {
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY
    }
  }

  const response = await axios.request(options)

  const body = {
    locations: response.data
  }

  return {
    status: 200,
    body
  }
}
