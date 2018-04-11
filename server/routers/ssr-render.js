const ejs = require('ejs')


module.exports = async (ctx, renderer, template) => {
  ctx.headers['Content-Type'] = 'text/html'

  const context = {url: ctx.path}

  try {
    const appString = await renderer.renderToString(context)

    let html = ejs.render(template, {
      appString,
      style: context.renderStyles(),
      scripts: context.renderScripts()
    })

    ctx.body = html

  } catch (e) {
    console.log(e)
    throw e
  }
}