import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import App from './app.vue'
import createRouter from './router'
import createStore from './store/index'

import 'common/stylus/reset.styl'
import 'common/stylus/index.styl'
import {tongji} from 'common/js/tongji'


Vue.use(VueRouter)
Vue.use(Vuex)

const router = createRouter()
const store = createStore()

router.afterEach(() => {
  setTimeout(() => {
    console.log('+1')
    tongji()
  }, 0)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')