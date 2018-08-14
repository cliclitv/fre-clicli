import createApp from './create-app'

const {app, router, store} = createApp()


if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}
router.beforeEach((to, from, next) => {
  if (to.path) {
    _hmt.push(['_trackPageview', '/#' + to.fullPath])
  }
  next()
})

router.onReady(() => {
  app.$mount('#app')
})