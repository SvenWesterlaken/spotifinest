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
    tracksShort: (state) => checkCache(state.short_term.items, state.short_term.request_at),
    tracksMedium: (state) => checkCache(state.medium_term.items, state.medium_term.request_at),
    tracksLong: (state) => checkCache(state.long_term.items, state.long_term.request_at),
    topTrackShort: (state) => _.first(checkCache(state.short_term.items, state.short_term.request_at))
  },
  mutations: {
    setTracks (state, {timeRange, items, requestAt}) {
      _.set(state, timeRange, {items, request_at: requestAt})
    },
    resetTracks (state) {
      _.assign(state, getDefaulState())
    }
  },
  actions: {
    fetchTracks ({ commit, getters }, timeRange) {
      commit('serverAvailable')
      return api.fetchTracks(timeRange, getters.getAuth).then((response) => {
        if (response) {
          commit('setAuth', {keep: getters.keepLoggedIn, auth: response.data.auth})
          commit('setTracks', {timeRange, items: response.data.spotify.items, requestAt: response.data.request_at, keep: getters.keepLoggedIn})
        }
      })
    }
  }

}
