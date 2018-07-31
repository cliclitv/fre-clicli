import Router from 'vue-router'

const Home = () => import('component/home/home.vue')
const ArticleDetail = () => import('component/post-detail/post-detail.vue')
const Sort = () => import('component/sort/sort.vue')
const UserCenter = () => import('component/user-center/user-center.vue')


export default () => {
  return new Router({
    mode: 'history',
    fallback: false,
    routes: [
      {
        path: '/',
        component: Home
      },
      {
        path: '/p/:id',
        component: ArticleDetail
      },
      {
        path: '/sort/:sort',
        component: Sort
      },
      {
        path: '/u/:id',
        component: UserCenter
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
