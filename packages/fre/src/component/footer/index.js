import { h } from 'fre'
import './index.styl'

export default function Footer() {
  const concat = {
    风车动漫: 'https://www.92wuc.com',
    APP下载: 'https://app.clicli.cc',
    使用说明: 'https://www.clicli.cc/play/gv31',
    github: 'https://github.com/cliclitv',
    微博: 'https://weibo.com/u/6759984025',
    qq群: 'https://jq.qq.com/?_wv=1027&k=5e55m5L',
  }
  return (
    <div className='footer'>
      <div className='wrap'>
        <ul className='links'>
          {Object.keys(concat).map((key) => (
            <a href={concat[key]}>{key}</a>
          ))}
        </ul>
        <p>
          <span className='mail'>admin@clicli.us</span> © 2020 clicli Proudly use <a href='https://github.com/yisar/fre'>Fre.js</a>, UGC Sponsored by{' '}
          <a target='_blank' href='https://www.dogecloud.com/?from=clicli' title='UGC 视频赞助商'>
            <img
              src='https://player.dogecloud.com/img/logo_colored.png'
              style={{
                height: '16px',
                verticalAlign: 'middle',
              }}
            />
          </a>
          .
        </p>
      </div>
    </div>
  )
}
