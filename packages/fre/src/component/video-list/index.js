import { h, useState, useEffect, useRef } from 'fre'
import { addListener, lanuch } from 'devtools-detector'
import Eplayer from '../../widget/eplayer'
import { getVideoList } from '../../api/get'
import { getAvatar } from '../../public/js/util'
import './index.styl'

export default function VideoList(props) {
  const [content, setContent] = useState(null)

  function hide() {
    setContent(null)
    document.body.style.overflow = 'auto'
  }

  function show(url) {
    setContent(url)
    document.body.style.overflow = 'hidden'
  }
  return (
    <div className='video-list'>
      {props.videos.length < 27
        ? props.videos.map((item,index) => {
            return (
              <li className='item' onClick={() => show(item[1])}>
                <span>P {index}</span>
                <span>{item[0]}</span>
              </li>
            )
          })
        : props.videos.map((item,index)=>{
          return <li className='item2' onClick={() => show(item[1])}><span>P {index}</span></li>
        })}
      {content && <Eplayer url={content} hide={hide} />}
    </div>
  )
}
