import moment from 'moment'
import { historyWeather } from '../api/historyWeather'

export const state = () => ({
  history: [],
  location: null
})

export const mutations = {
  loadHistory (state, data) {
    state.history.push(data)
  },
  loadLocation (state, data) {
    state.location = data
  },
  loadForecast (state, data) {
    state.forecast.push(data)
  },
  removeHistory (state, location) {
    const index = state.history.findIndex(item => item.location.name === location)
    if (index !== -1) {
      state.history.splice(index, 1)
    }
  }
}

export const actions = {
  async getHistory (state, params) {
    const dt = moment().format('YYYY-MM-DD')
    const endDt = moment().add(1, 'days').format('YYYY-MM-DD')
    const response = await historyWeather(params.location, dt, endDt)
    state.commit('loadLocation', response.body.response.location)
    state.commit('loadHistory', response.body.response)
  },
  deleteHistory (state, params) {
    state.commit('removeHistory', params.location)
  }
}

export const getters = {
  history (state) {
    return state.history
  },
  getHistory (state) {
    // state.history[0].filter(item => item.time_epoch > state.location.localtime_epoch)
    return state.history
  }
}
