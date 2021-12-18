import React from 'react'

import {Link, withRouter} from 'react-router-dom'
import {HOME_LINK} from "common/js/util"
import {adminAuth} from "hoc/auth/auth"
import {map} from "smox"
import {logout} from "api/user"

import './header.css'

@map({
  state: ['redirectTo'],
  mutations: ['logout']
})
@withRouter
@adminAuth
class Header extends React.Component {
  onLogout() {
    this.props.logout()
    logout().then(res => {
      if (res.data.code === 200) {
        this.props.history.push('/login')
      }
    })

  }

  render() {
    return (
      <header>
        <ul>
          <Link to='/'>
            <li>控制台</li>
          </Link>
          {this.props.state.level >= 2 ?
            <Link to='/write-article'>
              <li>撰写</li>
            </Link> : null}
          {this.props.state.level >= 3 ?
            <li>管理
              <ul>
                <Link to='/posts/wait'>
                  <li>审核稿件</li>
                </Link>
                <Link to='/posts/public'>
                  <li>管理稿件</li>
                </Link>
                <Link to='/users/user'>
                  <li>管理用户</li>
                </Link>
              </ul>
            </li>
            : null}
          <li onClick={this.onLogout.bind(this)} className="logout">
            退出
          </li>
          <a href={HOME_LINK} target="_blank">
            <li className="logout">
              网站首页
            </li>
          </a>
        </ul>
      </header>
    )
  }

}

export default Header