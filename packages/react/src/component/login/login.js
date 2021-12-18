import React from 'react'

import {Link, withRouter} from 'react-router-dom'

import {map} from 'smox'
import {handleForm} from "hoc/handle-form/handle-form"
import TopTip from 'base/top-tip/top-tip'

import './login.css'

@map({
  state: ['isAuth', 'msg', 'bg'],
  actions: ['onLogin']
})
@handleForm
@withRouter
class Login extends React.Component {

  onKeyUp(e) {
    if (e.keyCode === 13) {
      this.onLogin()
    }
  }

  onLogin() {
    this.props.onLogin(this.props.state)
  }

  render() {
    return (
      <div>
        {this.props.isAuth ? setTimeout(() => {
          this.props.history.push('/')
        }, 2000) : null}
        {this.props.msg ? <TopTip text={this.props.msg} bg={this.props.bg}/> : null}

        <div className="login">
          <h1>登录</h1>
          <ul>
            <li><input type="text" placeholder="用户名" onChange={e => this.props.handleChange('name', e.target.value)}
                       onKeyUp={e => this.onKeyUp(e)}/></li>
            <li><input type="password" placeholder="密码" onChange={e => this.props.handleChange('pwd', e.target.value)}
                       onKeyUp={e => this.onKeyUp(e)}/></li>
            <li>
              <button onClick={this.onLogin.bind(this)}>登录</button>
            </li>
            <li><Link to="/register">注册</Link></li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Login