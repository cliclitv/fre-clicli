const ejs = require('ejs')


module.export = async (ctx, renderer, template) => {
  ctx.headers['Content-Type'] = 'text/html'

  const context = {url: ctx.path}

  try {
    const appString = await renderer.renderToString(context)

    const html = ejs.render(template, {
      appString,
      style: context.renderStyles(),
      script: context.renderScripts()
    })
    ctx.body = html

  } catch (e) {
    console.log(e)
    throw e
  }
}