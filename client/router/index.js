import Router from 'vue-router'

const Home = () => import('component/home/home.vue')
const ArticleDetail = () => import('component/article-detail/article-detail.vue')


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
