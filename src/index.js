import Vue from 'vue'
import App from './app.vue'
import 'common/stylus/reset.styl'
import 'common/stylus/index.styl'
// import router from './router'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App)
})