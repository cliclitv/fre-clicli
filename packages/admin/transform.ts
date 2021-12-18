import esbuild from 'esbuild'
const isDev = process.env.NODE_ENV === 'dev'

export async function transform({ source }) {
  const { code } = await esbuild.transform(source, {
    loader: 'jsx',
    target: ['esnext'],
    minify: !isDev,
  })
  return code
}
