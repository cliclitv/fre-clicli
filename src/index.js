import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './app.vue'
import router from './router'
import 'common/stylus/reset.styl'
import 'common/stylus/index.styl'


Vue.use(VueRouter)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')