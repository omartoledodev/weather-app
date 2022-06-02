import { forecastWeather } from '../api/forecastWeather'

export const state = () => ({
  forecast: []
})

export const mutations = {
  loadForecast (state, data) {
    state.forecast.push(data)
  },
  removeForecast (state, location) {
    const index = state.forecast.findIndex(item => item.location.name === location)
    if (index !== -1) {
      state.forecast.splice(index, 1)
    }
  }
}

export const actions = {
  async getForecast (state, params) {
    const response = await forecastWeather(params.location)
    state.commit('loadForecast', response.body.response)
  },
  deleteForecast (state, params) {
    state.commit('removeForecast', params.location)
  }
}

export const getters = {
  getForecast (state) {
    // const data = state.forecast.forecast.forecastday
    return state.forecast
  }
}
