// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import ErrorContainer from '@/components/partials/ErrorContainer'
import VueMediaQueryMixin from 'vue-media-query-mixin'
import VueLineClamp from 'vue-line-clamp'
import App from './components/App'
import i18n from './translations'
import router from './router'
import store from './store'
import Vue from 'vue'

Vue.config.productionTip = false

Vue.component('error-container', ErrorContainer)
Vue.use(VueMediaQueryMixin, {framework: 'vuetify'})
Vue.use(VueLineClamp)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
