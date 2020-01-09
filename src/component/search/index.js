import { h } from 'fre'
import Tab from 'widget/tab'
import Footer from 'component/footer'
import UgcList from 'component/ugc-list'

export default function List(props) {
  return (
    <div>
      <Tab />
      <UgcList title='搜索结果' word={props.word} />
      <Footer />
    </div>
  )
}
