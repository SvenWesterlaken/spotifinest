import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import Home from '@/components/pages/Home'
import Login from '@/components/pages/Login'
import Artists from '@/components/pages/Artists'
import Tracks from '@/components/pages/Tracks'

Vue.use(Router)

const checkLogin = (to, from, next) => store.getters.isLoggedIn ? next() : next('/login')

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: checkLogin,
      meta: {
        title: 'Spotifinest'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        title: 'Spotifinest | Login'
      },
      beforeEnter: (to, from, next) => store.getters.isLoggedIn ? next('/') : next()
    },
    {
      path: '/tracks/:time',
      name: 'tracks',
      component: Tracks,
      beforeEnter: checkLogin,
      meta: {
        title: 'Spotifinest | Tracks'
      }
    },
    {
      path: '/artists/:time',
      name: 'artists',
      component: Artists,
      beforeEnter: checkLogin,
      meta: {
        title: 'Spotifinest | Artists'
      }
    },
    {
      path: '/callback',
      beforeEnter: ({query}, from, next) => {
        if (query.access_token && query.refresh_token && query.expires_at) {
          store.commit('setToken', {apiToken: query.access_token, refreshToken: query.refresh_token, expiresAt: query.expires_at, keep: store.getters.keepLoggedIn})
          next('/')
        } else {
          next(from)
        }
      },
      name: 'callback'
    }
  ]
})

router.beforeEach((to, from, next) => {
  // Change Title of page
  if (to.meta.title) {
    document.title = to.meta.title
  }

  // Change locale to the one from user-agent if not set manually
  if (store.getters.locale === '') {
    store.commit('locale', (navigator.language || navigator.userLanguage === 'nl-NL' ? 'nl' : 'en'))
  }

  next()
})

export default router
