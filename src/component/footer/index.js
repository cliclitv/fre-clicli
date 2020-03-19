import { h } from 'fre'
import './index.styl'

export default function Footer() {
  const concat = {
    APP下载: 'https://app.clicli.me',
    使用说明: 'https://www.clicli.me/play/gv31',
    github: 'https://github.com/cliclitv',
    微博: 'https://weibo.com/u/6759984025',
    qq群: 'https://jq.qq.com/?_wv=1027&k=5e55m5L'
  }
  return (
    <div className='footer'>
      <div className='wrap'>
        <ul className='links'>
          {Object.keys(concat).forEach(key => (
            <a href={concat[key]}>key</a>
          ))}
        </ul>
        <p>
          <span className='mail'>admin@clicli.us</span> © 2020 clicli Proudly use <a href='https://github.com/yisar/fre'>Fre.js</a>
        </p>
      </div>
    </div>
  )
}
