import Router from 'vue-router'

import Home from 'component/home/home.vue'
import Anime from 'component/anime/anime.vue'


export default () => {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        redirect: '/wp'
      },
      {
        path: '/wp',
        component: Home
      },
      {
        path: '/anime',
        component: Anime
      }
    ],

    scrollBehavior() {
      return {x: 0, y: 0}
    }
  })
}
