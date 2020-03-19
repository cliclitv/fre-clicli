import { h, render } from 'fre'
import { useLocation } from './use-location'
import Page from 'component/page'
import Home from 'component/home'
import Search from 'component/search'

const routes = {
  '/': Home,
  '/play/:gv': Page,
  '/search/:word': Search
}

const App = () => {
  const [location, setLocation] = useLocation()

  switch (location) {
    case '/':
      return <Home/>
    case '/play/:gv':
      return <button onClick={() => setLocation('/play/gv123')}>go home</button>
  }
  return 404
}
render(<App />, document.getElementById('root'))
