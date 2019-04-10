import Router from 'vue-router'

const Home = () => import('component/home/home.vue')
const ArticleDetail = () => import('component/post-detail/post-detail.vue')
const Search = () => import('component/search/search.vue')
const Ugc = () => import('component/ugc/ugc.vue')
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
        path: '/ugc',
        component: Ugc,
        meta: {
          keepAlive: true
        }
      },
      {
        path: '/all',
        component: Search,
        meta: {
          keepAlive: true
        }
      },
      {
        path: '/play/:id',
        component: ArticleDetail,
        meta: {
          keepAlive: false
        },
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
