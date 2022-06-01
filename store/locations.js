export const state = () => ({
  locations: [],
  location: null
})

export const mutations = {
  addLocations (state, location) {
    state.locations.push(location)
  },
  addLocation (state, location) {
    state.location = location
  }
}

export const actions = {
  getLocations (state, params) {
    state.commit('addLocations', params.location)
  },
  getLocation (state, params) {
    state.commit('addLocation', params.location)
  }
}

export const getters = {
  getLocations (state) {
    return state.locations
  },
  getLocation (state) {
    return state.location
  }
}
