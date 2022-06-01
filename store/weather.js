/* eslint-disable require-await */
import { getCurrentWeather } from '../api/realTimeWeather'

export const state = () => ({
  weathers: [],
  degrees: 'C',
  loading: false,
  codeBackgroud: 1000
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
    console.log(data)
    const code = data.current.condition.code
    state.codeBackgroud = code
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
  getDegrees (state, params) {
    state.commit('loadDegrees', params.format)
  },
  getLoading (state, params) {
    state.commit('loadLoading', params.value)
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
  }
}
