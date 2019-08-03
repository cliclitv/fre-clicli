import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import App from './app.vue'
import createRouter from './router'
import createStore from './store/index'

import 'public/stylus/reset.styl'
import 'public/stylus/index.styl'
import 'public/stylus/responsive.styl'


Vue.use(VueRouter)
Vue.use(Vuex)
Vue.config.ignoredElements = [
  'e-player'
]

const router = createRouter()
const store = createStore()

router.beforeEach((to, from, next) => {
  if (to.path) {
    if (window._hmt) {
      window._hmt.push(['_trackPageview', '/#' + to.fullPath])
    }
  }
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')