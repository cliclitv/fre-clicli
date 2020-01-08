import {h} from 'fre'
import Header from 'component/header'
import Recommend from 'component/recommend'
import Footer from 'component/footer'
import Rank from 'component/rank'
import WeekList from 'component/week-list'
import UgcList from 'component/ugc-list'
import PostList from 'component/post-list'
import './index.styl'

export default function Home() {
  return (
    <div>
      <Header/>
      <div className="wrap" style={{display: 'flex'}}>
        <Recommend/>
        <Rank/>
      </div>
      <WeekList/>
      <UgcList/>
      <PostList/>
      <Footer/>
    </div>
  )
}
