import polka from 'polka'
import path from 'path'
import fse from 'fs-extra'
import fs from 'fs'
import { transform } from './transform'

const { PORT = 1234 } = process.env
const basePath = path.resolve('../example')
polka()
  .get('/', (req, res) => {
    res.end('health')
  })
  .get('/:slug+.js', async (req, res) => {
    const tsx = path.join(basePath, req.path).replace('js', 'tsx')
    const jsx = path.join(basePath, req.path).replace('js', 'jsx')
    const file = fs.existsSync(tsx) ? tsx : fs.existsSync(jsx) ? jsx : false
    if (file) {
      const body = await fs.promises.readFile(file)
      const code = transform({ source: body.toString() })
      res.body = code
    } else {
      res.body = '404 Not Found'
    }
  })
  .listen(PORT, err => {
    if (err) throw err
    console.log(`serve on localhost:${PORT}`)
  })
