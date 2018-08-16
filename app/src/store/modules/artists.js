import * as _ from 'lodash'
import api from '@/api'
import { checkCache } from '@/store/functions'

const getDefaulState = () => {
  return {
    short_term: {
      items: [],
      request_at: 0
    },
    medium_term: {
      items: [],
      request_at: 0
    },
    long_term: {
      items: [],
      request_at: 0
    }
  }
}

export default {
  state: getDefaulState(),
  getters: {
    artistsShort: (state) => checkCache(state.short_term.items, state.short_term.request_at),
    artistsMedium: (state) => checkCache(state.medium_term.items, state.medium_term.request_at),
    artistsLong: (state) => checkCache(state.long_term.items, state.long_term.request_at),
    topArtistShort: (state) => _.first(checkCache(state.short_term.items, state.short_term.request_at))
  },
  mutations: {
    setArtists (state, {timeRange, items, requestAt}) {
      _.set(state, timeRange, {items, request_at: requestAt})
    },
    resetArtists (state) {
      _.assign(state, getDefaulState())
    }
  },
  actions: {
    fetchArtists ({ commit, getters }, timeRange) {
      commit('serverAvailable')
      api.fetchArtists(timeRange, getters.getAuth).then((response) => {
        if (response) {
          commit('setAuth', {keep: getters.keepLoggedIn, auth: response.data.auth})
          commit('setArtists', {timeRange, items: response.data.spotify.items, requestAt: response.data.request_at, keep: getters.keepLoggedIn})
        }
      })
    }
  }

}
