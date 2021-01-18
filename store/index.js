export const state = () => ({
  loggedIn: false,
  user: null,
  // token: null,
  // auth: null,
  team: null,
})

export const getters = {
  isAuthenticated(state) {
    return state.loggedIn
  },

  loggedInUser(state) {
    return state.user
  },
  teamInfo(state) {
    return state.team
  },
}

export const mutations = {
  SET_LOGGEDIN(state, boolUser) {
    state.loggedIn = boolUser
  },
  SET_USER(state, user) {
    state.user = user
  },
  SET_TEAM(state, team) {
    state.team = team
  },
}

export const actions = {
  createTeam({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$post('teams/create', payload)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  createPlayer({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$post('players/create', payload)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}
