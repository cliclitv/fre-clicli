import { h, render } from 'fre'
import { useLocation } from './use-location'
import Page from 'component/page'
import Home from 'component/home'
import Search from 'component/search'

const App = () => {
  const [location, setLocation] = useLocation()
  const page = location.match(/gv(\S*)+/)
  const page = location.match(/search\/(\S*)+/)
  if (location === '/') {
    return <Home push={setLocation} />
  } else if (page) {
    return <Page gv={page[1]}/>
  }else if(search){
    <Search key={search[1]}/>
  }else{
    return 404
  }
  
}
render(<App />, document.getElementById('root'))
