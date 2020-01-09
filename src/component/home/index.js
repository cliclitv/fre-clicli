import {h} from 'fre'
import Header from 'component/header'
import Recommend from 'component/recommend'
import Footer from 'component/footer'
import Rank from 'component/rank'
import WeekList from 'component/week-list'
import UgcList from 'component/ugc-list'
import PostList from 'component/post-list'
import Ad from 'widget/ad'
import './index.styl'
import './m.styl'

export default function Home() {
  return (
    <div>
      <Header/>
      <div className="wrap" style={{display: 'flex'}}>
        <Recommend/>
        <Rank/>
      </div>
      <Ad src={window.ads[0].src} href={window.ads[0].href}/>
      <WeekList/>
      <UgcList title='个人投稿'/>
      <PostList/>
      <Footer/>
    </div>
  )
}
