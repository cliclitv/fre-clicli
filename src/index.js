import { h, render, useEffect } from 'fre'
import { useLocation } from './use-location'
import Page from 'component/page'
import Home from 'component/home'
import Search from 'component/search'

const App = () => {
  const [location, setLocation] = useLocation()
  const p = location.match(/gv(\S*)+/)
  const s = location.match(/search\/(\S*)+/)
  if (location === '/') {
    return <Home push={setLocation} />
  } else if (p) {
    return <Page gv={p[1]} />
  } else if (s) {
    return <Search word={s[1]} push={setLocation} />
  } else {
    return 404
  }
}
// @ts-ignore
const root = document.getElementById('root')
render(<App />, root)

// if (new Date().getTime() < new Date('2020-04-04').setHours(23, 59, 59, 999)) root.style = 'filter:grayscale(100%)'
