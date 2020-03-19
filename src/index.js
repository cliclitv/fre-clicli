import { h, render } from 'fre'
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
    return <Page gv={p[1]}/>
  }else if(s){
    <Search key={s[1]}/>
  }else{
    return 404
  }
  
}
render(<App />, document.getElementById('root'))
