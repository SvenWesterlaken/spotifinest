import home from './modules/home'
import login from './modules/login'
import header from './modules/header'
import items from './modules/items'
import time from './modules/time'

export default {
  en: {
    login: login.en,
    home: home.en,
    header: header.en,
    items: items.en,
    time: time.en,
    openSpotify: 'Open in Spotify',
    artists: 'Artists',
    tracks: 'Tracks',
    error: 'Seems like the server is unavailable right now'
  },
  nl: {
    login: login.nl,
    home: home.nl,
    header: header.nl,
    items: items.nl,
    time: time.nl,
    openSpotify: 'Openen in Spotify',
    artists: 'Artiesten',
    tracks: 'Nummers',
    error: 'Het lijkt erop dat de server niet bereikbaar is op dit moment'
  }
}
