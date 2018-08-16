import axios from 'axios'
import store from '@/store'

axios.defaults.baseURL = process.env.API_BASE_URL

export default {
  login () {
    return axios.get('/login').then((response) => {
      window.location = response.data.url
    }).catch(() => store.commit('serverUnavailable'))
  },
  fetchTracks (timeRange, auth) {
    return axios.get(`/tracks/${timeRange}`, {params: auth}).catch(() => store.commit('serverUnavailable'))
  },
  fetchArtists (timeRange, auth) {
    return axios.get(`/artists/${timeRange}`, {params: auth}).catch(() => store.commit('serverUnavailable'))
  }
}
