import { h, useEffect, useRef } from 'fre'
import { getPlayUrl } from '../../api/get'
import './index.styl'

export default function Eplayer(props) {
  const t = useRef(null)
  const s = useRef(null)
  const isMobile = document.body.clientWidth < 480
  const steam = (type, url) => {
    switch (type) {
      case 'm3u8':
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
        steam(res.result.mtype, res.result.url)
        s.current.load()
      } else {
        const type = res.result.mtype === "m3u8" ? "hls" : res.result.mtype
        t.current.setAttribute('type', type)
        t.current.setAttribute('src', res.result.url)
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
