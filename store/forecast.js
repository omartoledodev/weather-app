import { forecastWeather } from '../api/forecastWeather'

export const state = () => ({
  forecast: []
})

export const mutations = {
  loadForecast (state, data) {
    state.forecast.push(data)
  }
}

export const actions = {
  async getForecast (state, params) {
    console.log(params)
    const response = await forecastWeather(params.location)
    console.log(response)
    state.commit('loadForecast', response.body.response)
  }
}

export const getters = {
  getForecast (state) {
    // const data = state.forecast.forecast.forecastday
    return state.forecast
  }
}
