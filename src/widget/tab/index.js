import {h} from 'fre'
import './index.styl'
import {push} from '../../use-routes'
import {clink} from 'public/js/const'

export default function Tab() {
  const obj = {
    投稿教程: 905,
    使用说明: 31,
    补档: 99
  }
  return (
    <nav className="tab">
      <ul className="wrap">
        <a href="/"><li>主站</li></a>
        {Object.keys(obj).map(key => (<a href={`${clink}/play/gv${obj[key]}`}>
            <li className='item'>{key}</li>
          </a>
        ))}
      </ul>
    </nav>
  )
}