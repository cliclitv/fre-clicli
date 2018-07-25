const ejs = require('ejs')

module.exports = async (ctx, renderer, template) => {
  ctx.headers['Content-Type'] = 'text/html'

  const context = {url: ctx.path}

  try {
    const appString = await renderer.renderToString(context)

    const {title} = context.meta.inject()

    let html = ejs.render(template, {
      appString,
      title: title.text(),
      style: context.renderStyles(),
      scripts: context.renderScripts(),
      initalState: context.renderState()
    })

    ctx.body = html

  } catch (e) {
    console.log(e)
    throw e
  }
}