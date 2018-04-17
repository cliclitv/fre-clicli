import Router from 'vue-router'

import Home from 'component/home/home.vue'
import ArticleDetail from 'component/article-detail/article-detail.vue'


export default () => {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        component: Home
      },
      {
        path: '/post/:id',
        component: ArticleDetail
      },
    ],

    scrollBehavior() {
      return {x: 0, y: 0}
    }
  })
}
