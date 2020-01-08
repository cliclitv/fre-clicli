import { h } from 'fre'
import Tab from 'widget/tab'
import PostDetal from 'component/post-detail'
import Footer from '../../component/footer'
import {getAv} from '../../public/js/util'
import './index.styl'

export default function Page(props) {
  const gv = getAv(props.gv)
  return <div>
    <Tab/>
    <div className='wrap'>
      <PostDetal gv={gv}/>
    </div>
    <Footer/>
  </div>
}