import { h, render } from 'fre'
import { useRoutes } from './use-routes'
import Page from 'component/page'
import Home from 'component/home'
import Search from 'component/search'

const routes = {
  '/': Home,
  '/play/:gv': Page,
  '/search/:word': Search
}

function App() {
  const res = useRoutes(routes)
  return res
}

render(<App />, document.getElementById('root'))
