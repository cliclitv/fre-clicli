import Router from 'vue-router'

import Home from 'component/home/home.vue'


export default () => {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/wp',
        component: Home
      },
    ],

    scrollBehavior() {
      return {x: 0, y: 0}
    }
  })
}
