import {h} from 'fre'
import './index.styl'

export default function Footer() {
  return (
    <div className="footer">
      <div className="wrap">
        <div className="title">
          <img src="https://pic.superbed.cn/item/5cc52b543a213b04172979c8.png"/>
          <h1>CliCli 弹幕网</h1>
        </div>
        <ul className="links">
          <li><a href="">关于我们</a></li>
          <li><a href={window.concat[3]}>开源仓库</a></li>
          <li><a href={window.concat[3]}>up主招募</a></li>
          <li><a href="">友情链接</a></li>
        </ul>
        <ul className="icons">
          <a href={window.concat[0]}>
            <li><i className="icon-font icon-qq"></i>QQ群</li>
          </a>
          <a href={window.concat[1]}>
            <li><i className="icon-font icon-weibo"></i>微博</li>
          </a>
          <a href={window.concat[2]}>
            <li><i className="icon-font icon-xiazai"></i>下载客户端</li>
          </a>
        </ul>
      </div>
    </div>
  )
}