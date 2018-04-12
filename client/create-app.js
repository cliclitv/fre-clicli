import Vue from 'vue'
import VueRouter from 'vue-router'
import Meta from 'vue-meta'
import Vuex from 'vuex'

import App from './app.vue'
import createRouter from './router'
import createStore from './store'

import 'common/stylus/reset.styl'
import 'common/stylus/index.styl'


Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Meta)

export default () => {
  const router = createRouter()
  const store = createStore()
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  return {app, router, store}
}