import {h, useState, useEffect, useRef} from 'fre'
import Eplayer from '../../widget/eplayer'
import {getVideoList} from '../../api/get'
import {getAvatar} from '../../public/js/util'
import './index.styl'

export default function VideoList(props) {
  const [video, setVideo] = useState(null)
  const [content, setContent] = useState(null)
  useEffect(() => {
    getVideoList(props.gv).then(res => {
      setVideo(res.videos)
    })
  }, [props.gv])

  function hide() {
    setContent(null)
    document.body.style.overflow = 'auto'
  }

  function show(url) {
    setContent(url)
    document.body.style.overflow = 'hidden'
  }
  return (<div className='video-list'>
    {video&&video.map(item => {
      return <li className='item' onClick={() => show(item.content)}>
        <img src={getAvatar(item.uqq)} alt={item.uqq}></img>
        <span>P {item.oid}</span>
        <span>{item.title}</span>
      </li>
    })}
    {content && <Eplayer url={content} hide={hide}/>}
  </div>)
}