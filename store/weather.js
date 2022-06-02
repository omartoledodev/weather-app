/* eslint-disable require-await */
import { getCurrentWeather } from '../api/realTimeWeather'

export const state = () => ({
  weathers: [],
  degrees: 'C',
  loading: false,
  codeBackgroud: 1000,
  isDay: 1
})

export const mutations = {
  loadWeathers (state, data) {
    state.weathers.push(data)
  },
  loadDegrees (state, format) {
    state.degrees = format
  },
  loadLoading (state, value) {
    state.loading = value
  },
  loadCodeBackground (state, location) {
    const data = state.weathers.filter(item => item.location.name === location)[0]
    const code = data.current.condition.code
    state.codeBackgroud = code
  },
  loadIsDay (state, location) {
    const data = state.weathers.filter(item => item.location.name === location)[0]
    const isday = data.current.is_day
    state.isDay = isday
  },
  removeWeather (state, location) {
    const index = state.weathers.findIndex(item => item.location.name === location)
    if (index !== -1) {
      state.weathers.splice(index, 1)
    }
  }
}

export const actions = {
  async getWeathers (state, params) {
    const { body } = await getCurrentWeather(params.location)
    state.commit('loadWeathers', body)
  },
  getCode (state, params) {
    state.commit('loadCodeBackground', params.location)
  },
  getIsDay (state, params) {
    state.commit('loadIsDay', params.location)
  },
  getDegrees (state, params) {
    state.commit('loadDegrees', params.format)
  },
  getLoading (state, params) {
    state.commit('loadLoading', params.value)
  },
  deleteWeather (state, params) {
    state.commit('removeWeather', params.location)
  }
}

export const getters = {
  getWeathers (state) {
    return state.weathers
  },
  getDegrees (state) {
    return state.degrees
  },
  getLoading (state) {
    return state.loading
  },
  getCodeBackgroud (state) {
    return state.codeBackgroud
  },
  getIsDay (state) {
    return state.isDay
  }
}
