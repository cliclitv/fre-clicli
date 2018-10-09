import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import App from './app.vue'
import createRouter from './router'
import createStore from './store/index'

import 'common/stylus/reset.styl'
import 'common/stylus/index.styl'


Vue.use(VueRouter)
Vue.use(Vuex)

const router = createRouter()
const store = createStore()


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')