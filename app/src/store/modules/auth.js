import * as _ from 'lodash'

const getDefaulState = () => {
  return {
    api_token: '',
    refresh_token: '',
    expires_at: 0
  }
}

export default {
  state: getDefaulState(),
  getters: {
    getToken: state => state.api_token,
    isLoggedIn: state => state.api_token.length > 0,
    getAuth: state => state
  },
  mutations: {
    setToken (state, payload) {
      state.api_token = payload.apiToken
      state.refresh_token = payload.refreshToken
      state.expires_at = payload.expiresAt
    },
    resetAuth (state) {
      _.assign(state, getDefaulState())
    },
    setAuth (state, payload) {
      _.assign(state, payload.auth)
    }
  }
}
