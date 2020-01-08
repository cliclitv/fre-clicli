import {h, useEffect, useRef} from 'fre'
import {getPlayUrl} from '../../api/get'
import './index.styl'

export default function Eplayer(props) {
  const t = useRef(null)
  useEffect(() => {
    getPlayUrl(props.url).then(res => {
      t.current.setAttribute('src', res.url)
      t.current.setAttribute('type', res.type)
    })
  }, [props.url])

  return (
    <div className="ep-wrap">
      <div className="ep">
        <e-player ref={t} className='ep'/>
        <div className="close"  onClick={props.hide}><i className="icon-font icon-close"></i></div>
      </div>
      <div className="mark"></div>
    </div>
  )
}