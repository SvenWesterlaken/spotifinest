import VuexPersistance from 'vuex-persist'

const authSessionStorage = new VuexPersistance({
  key: 'auth',
  storage: window.sessionStorage,
  filter: mutation => mutation.type === 'setToken' || mutation.type === 'resetAuth' || mutation.type === 'setAuth' ? !mutation.payload.keep : false,
  modules: ['auth']
})

const authLocalStorage = new VuexPersistance({
  key: 'auth',
  filter: mutation => mutation.type === 'setToken' || mutation.type === 'resetAuth' || mutation.type === 'setAuth' ? mutation.payload.keep : false,
  modules: ['auth']
})

const keepLoginStorage = new VuexPersistance({
  key: 'keep',
  filter: mutation => mutation.type === 'keepLoggedIn',
  reducer: state => ({keep: state.keep})
})

const artistsSessionStorage = new VuexPersistance({
  key: 'artists',
  storage: window.sessionStorage,
  filter: mutation => mutation.type === 'setArtists' || mutation.type === 'resetArtists' ? !mutation.payload.keep : false,
  modules: ['artists']
})

const artistsLocalStorage = new VuexPersistance({
  key: 'artists',
  filter: mutation => mutation.type === 'setArtists' || mutation.type === 'resetArtists' ? mutation.payload.keep : false,
  modules: ['artists']
})

const tracksSessionStorage = new VuexPersistance({
  key: 'tracks',
  storage: window.sessionStorage,
  filter: mutation => mutation.type === 'setTracks' || mutation.type === 'resetTracks' ? !mutation.payload.keep : false,
  modules: ['tracks']
})

const tracksLocalStorage = new VuexPersistance({
  key: 'tracks',
  filter: mutation => mutation.type === 'setTracks' || mutation.type === 'resetTracks' ? mutation.payload.keep : false,
  modules: ['tracks']
})

const localeStorage = new VuexPersistance({
  key: 'lang',
  filter: mutation => mutation.type === 'locale',
  reducer: state => ({locale: state.locale})
})

export default [
  authSessionStorage.plugin,
  authLocalStorage.plugin,
  keepLoginStorage.plugin,
  artistsSessionStorage.plugin,
  artistsLocalStorage.plugin,
  tracksSessionStorage.plugin,
  tracksLocalStorage.plugin,
  localeStorage.plugin
]
