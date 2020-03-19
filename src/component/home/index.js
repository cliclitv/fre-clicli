import { h } from 'fre'
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

export default function Home({ push }) {
  return (
    <div>
      <Header push={push}/>
      <div className='wrap' style={{ display: 'flex' }}>
        <Recommend push={push} />
        <Rank push={push} />
      </div>
      <WeekList push={push} />
      <UgcList title='个人投稿' push={push} />
      <PostList push={push} />
      <Footer />
    </div>
  )
}
