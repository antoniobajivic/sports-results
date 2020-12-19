export const state = () => ({
  loggedIn: false,
  user: null,
  // token: null,
  // auth: null,
})

export const getters = {
  isAuthenticated(state) {
    return state.loggedIn
  },

  loggedInUser(state) {
    return state.user
  },
}

export const mutations = {
  SET_LOGGEDIN(state, boolUser) {
    state.loggedIn = boolUser
  },
  SET_USER(state, user) {
    state.user = user
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
}
