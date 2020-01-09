import {h} from 'fre'
import {clink, alink} from 'public/js/const'
import './index.styl'
import Search from 'widget/search'

export default function Header(props) {
  const obj = {
    投稿教程: 905,
    使用说明: 31,
    补档: 99
  }
  return (
    <header style={{background: `url(${window.bg}) center top`}}>
      <div className="header">
        <div className='wrap'>
          <nav className="nav">
            <a href={clink}>
              <li className="active">主站</li>
            </a>
            <a href="https://app.clicli.me">
              <li>APP 下载</li>
            </a>
            {Object.keys(obj).map(key => (<a href={`/play/gv${obj[key]}`}>
                <li>{key}</li>
              </a>
            ))}
          </nav>
          <div className="biu">
            <a href={`${alink}/login`}>登陆</a>
            <a href={`${alink}/register`}>注册</a>
            <a className="user-center" href={alink}>投稿</a>
          </div>
        </div>
        <div className="wrap">
          <div className='logo'></div>
          <Search/>
        </div>
      </div>
    </header>
  )
}
