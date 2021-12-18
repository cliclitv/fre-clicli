import { h } from 'fre'
import { clink, alink } from 'public/js/const'
import './index.styl'
import Search from 'widget/search'

export default function Header({ push }) {
  const obj = {
    投稿教程: 905,
    使用说明: 31,
    补档: 99
  }
  return (
    <header>
      <div className='header'>
        <div className='wrap'>
          <nav className='nav'>
            <a href={clink}>
              <li className='active'>主站</li>
            </a>
            <a href='https://app.clicli.me'>
              <li>APP 下载</li>
            </a>
            {Object.keys(obj).map(key => (
              <li onClick={() => push(`/play/gv${obj[key]}`)}>{key}</li>
            ))}
          </nav>
          <div className='biu'>
            <a className='login' href={`${alink}/login`}>
              登录
            </a>
            <a className='login' href={`${alink}/register`}>
              注册
            </a>
            <a className='user-center' href={alink}>
              投稿
            </a>
          </div>
        </div>
        <div className='wrap'>
          <div className='logo'></div>
          <Search push={push}/>
        </div>
      </div>
    </header>
  )
}
