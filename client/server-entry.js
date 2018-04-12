import createApp from './create-app'


export default context => {
  return new Promise((resolve, reject) => {
    const {app, router, store} = createApp()

    router.push(context.url)
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents) {
        return reject(new Error('no component matched'))
      }
      Promise.all(matchedComponents.map(Component => {
        if (Component.asyncData) {
          return Component.asyncData({
            store,
            route: router.currentRoute
          })
        }
      })).then(() => {
        context.meta = app.$meta()
        context.state = store.state
        resolve(app)
      }).catch(reject)
    })
  })
}