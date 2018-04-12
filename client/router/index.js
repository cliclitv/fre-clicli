import Router from 'vue-router'

import App from '../app.vue'
import CHeader from '../component/c-header/c-header.vue'


export default () => {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        component: CHeader
      },
    ],

    scrollBehavior() {
      return {x: 0, y: 0}
    }
  })
}
