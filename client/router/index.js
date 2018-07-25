import Router from 'vue-router'

// const Home = () => import('component/home/home.vue')
const App =()=>import('../app.vue')
const ArticleDetail = () => import('component/article-detail/article-detail.vue')
const Sort = () => import('component/sort/sort.vue')


export default () => {
  return new Router({
    mode: 'history',
    fallback: false,
    routes: [
      {
        path: '/',
        component: App
      },
      {
        path: '/post/:id',
        component: ArticleDetail
      },
      {
        path: '/sort/:sort',
        component: Sort
      },
    ],

    scrollBehavior(to) {
      return {
        x: 0,
        y: 0
      }
    }
  })
}
