import { h, render } from 'fre'
import { useLocation } from './use-location'
import Page from 'component/page'
import Home from 'component/home'
import Search from 'component/search'

const App = () => {
  const [location, setLocation] = useLocation()
  const reg = location.match(/gv(\S*)+/)
  if (location === '/') {
    return <Home push={setLocation} />
  } else if (reg) {
    return <Page gv={reg[1]}/>
  }
  return 404
}
render(<App />, document.getElementById('root'))
