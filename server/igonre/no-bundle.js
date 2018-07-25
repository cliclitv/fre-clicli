const ejs = require('ejs')

module.exports = async (ctx, renderer, template, bundle) => {
  ctx.headers['Content-Type'] = 'text/html'

  const context = { url: ctx.path}

  try {
    const app = await bundle(context)

    const appString = await renderer.renderToString(app, context)

    const {
      title
    } = context.meta.inject()

    const html = ejs.render(template, {
      appString,
      style: context.renderStyles(),
      scripts: context.renderScripts(),
      title: title.text(),
      initalState: context.renderState()
    })

    ctx.body = html
  } catch (err) {
    console.log('render error', err)
    throw err
  }
}