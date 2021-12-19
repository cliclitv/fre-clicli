import { h, useEffect, useRef } from 'fre'
import { getPlayUrl } from '../../api/get'
import './index.styl'

export default function Eplayer(props) {
  const t = useRef(null)
  const s = useRef(null)
  const isMobile = document.body.clientWidth < 480
  const steam = (type, url) => {
    switch (type) {
      case 'hls':
        if (Hls.isSupported()) {
          let hls = new Hls()
          hls.loadSource(url)
          hls.attachMedia(s.current)
        }
        break
      default:
        s.current.src = url
    }
  }
  useEffect(() => {
    getPlayUrl(props.url).then(res => {
      if (isMobile) {
        steam(res.type, res.url)
        s.current.load()
      } else {
        t.current.setAttribute('type', res.mtype)
        t.current.setAttribute('src', res.url)
      }
    })
  }, [props.url])

  return (
    <div className='ep-wrap'>
      <div className='ep'>
        {isMobile ? <video ref={s} controls='controls' /> : <e-player ref={t} className='ep' />}
        <div className='close' onClick={props.hide}>
          <i className='icon-font icon-close'></i>
        </div>
      </div>
      <div className='mark'></div>
    </div>
  )
}
