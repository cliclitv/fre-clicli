import React from 'react'

import {Link} from 'react-router-dom'
import {adminAuth} from "hoc/auth/auth"
import {getUser} from 'api/user'
import {getAvatar} from "common/js/util"

import './user-info.css'
import Cookies from "js-cookie"

@adminAuth
class UserInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {}
    }
  }

  componentDidMount() {
    Cookies.get('uid') ? getUser('', Cookies.get('uid')).then(res => {
      this.setState({
        user: res.data.user
      })
    }) : null

  }

  render() {
    const qq = getAvatar(this.state.user.qq)
    const router = `/article/` + this.state.user.id
    const info = `/editor-user/` + this.state.user.qq
    return (
      <div className="user-info">
        <div className="avatar">
          <img src={qq} alt="作者头像"/>
        </div>
        <div className="name">欢迎！{this.state.user.name} sama~</div>
        <div className="uid"><span>uid : {this.state.user.id}</span></div>
        <div className="quick-start">
          快速开始：
          {this.props.state.role !== 'user' ? <span>
            <Link to="/write-article">投稿</Link>
          </span> : null}
          {this.props.state.role !== 'user' ? <span><Link to={router}>查看稿件</Link></span> : null}
          <span><Link to={info}>设置</Link></span>
        </div>
      </div>
    )
  }
}

export default UserInfo