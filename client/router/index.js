import Router from 'vue-router'

import App from '../app.vue'


export default () => {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        component: App
      },
    ],

    scrollBehavior() {
      return {x: 0, y: 0}
    }
  })
}
