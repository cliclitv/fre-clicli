import { h } from 'fre'
import './index.styl'
import { clink } from 'public/js/const'

export default function Tab() {
  const obj = {
    投稿教程: 905,
    使用说明: 31,
    补档: 99
  }
  return (
    <nav className='tab'>
      <ul className='wrap'>
        <a href='/'>
          <li class='active'>主站</li>
        </a>
        {Object.keys(obj).map(key => (
          <a href={`${clink}/play/gv${obj[key]}`}>
            <li className='item'>{key}</li>
          </a>
        ))}
        <div style={{float:'right'}}>
          <a href='https://app.clicli.me'>
            <li>APP下载</li>
          </a>
          <a href='https://admin.clicli.me'>
            <li>投稿中心</li>
          </a>
        </div>
      </ul>
    </nav>
  )
}
