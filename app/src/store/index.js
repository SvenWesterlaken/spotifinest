import Vue from 'vue'
import Vuex from 'vuex'

import plugins from './persist'
import auth from './modules/auth'
import artists from './modules/artists'
import tracks from './modules/tracks'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    keep: false,
    serverAvailable: true,
    locale: ''
  },
  getters: {
    keepLoggedIn: state => state.keep,
    serverAvailable: state => state.serverAvailable,
    locale: state => state.locale
  },
  mutations: {
    keepLoggedIn (state, payload) {
      state.keep = payload
    },
    serverUnavailable (state) {
      state.serverAvailable = false
    },
    serverAvailable (state) {
      state.serverAvailable = true
    },
    locale (state, payload) {
      state.locale = payload
    }
  },
  actions: {
    reset ({commit, state, getters}) {
      commit('locale', '')
      commit('serverAvailable')
      commit('resetTracks', {keep: getters.keepLoggedIn})
      commit('resetAuth', {keep: getters.keepLoggedIn})
      commit('resetArtists', {keep: getters.keepLoggedIn})
      commit('keepLoggedIn', false)

      window.localStorage.clear()
      window.sessionStorage.clear()
    }
  },
  modules: {
    auth,
    artists,
    tracks
  },
  plugins
})
