import Router from 'vue-router'

const Home = () => import('component/home/home.vue')
const ArticleDetail = () => import('component/post-detail/post-detail.vue')
const Sort = () => import('component/sort/sort.vue')
const Search = () => import('component/search/search.vue')
const UserCenter = () => import('component/user-center/user-center.vue')


export default () => {
  return new Router({
    mode: 'history',
    fallback: false,
    routes: [
      {
        path: '/',
        component: Home,
        meta: {
          keepAlive: true
        }
      },
      {
        path: '/:type',
        component: Home,
        meta: {
          keepAlive: true
        }
      },
      {
        path: '/video/:id',
        component: ArticleDetail,
        meta: {
          keepAlive: false
        }
      },
      {
        path: '/sort/:sort',
        component: Sort,
        meta: {
          keepAlive: true
        }
      },
      {
        path: '/search/:key',
        component: Search,
        meta: {
          keepAlive: true
        }
      },
      {
        path: '/u/:id',
        component: UserCenter,
        meta: {
          keepAlive: true
        }
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
