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
  },
  removeLocation (state, location) {
    const index = state.locations.findIndex(item => item === location)
    if (index !== -1) {
      state.locations.splice(index, 1)
    }
  }
}

export const actions = {
  getLocations (state, params) {
    state.commit('addLocations', params.location)
  },
  getLocation (state, params) {
    state.commit('addLocation', params.location)
  },
  deleteLocation (state, params) {
    state.commit('removeLocation', params.location)
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
