import React from 'react'
import {register} from "api/user"
import {handleForm} from "hoc/handle-form/handle-form"

import TopTip from '../../base/top-tip/top-tip'
import '../login/login.css'

@handleForm
class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      msg: '',
      bg: ''
    }

    this.onRegister = this.onRegister.bind(this)

  }

  onRegister() {
    if (!this.props.state.name || !this.props.state.pwd || !this.props.state.repeatPwd || !this.props.state.qq) {
      this.setState({
        msg: '都要填写都要填(〃＞皿＜)！',
        bg: '#ef736e'
      })
      setTimeout(() => {
        this.setState({
          msg: ''
        })
      }, 4500)
      return
    }
    register(this.props.state).then(res => {
      if (res.status === 200 && res.data.code === 201) {
        this.setState({
          msg: res.data.msg,
          bg: '#b4d896'
        })
        setTimeout(() => {
          this.props.history.push('/login')
        }, 2000)
      } else {
        this.setState({
          msg: res.data.msg,
          bg: '#ef736e'
        })
      }
    })

  }

  onKeyUp(e) {
    if (e.keyCode === 13) {
      this.onRegister()
    }
  }

  render() {
    return (
      <div>
        {this.state.msg ? <TopTip text={this.state.msg} bg={this.state.bg}/> : null}

        <div className="login">
          <h1>注册</h1>
          <ul>
            <li><input type="text" placeholder="QQ号" onChange={e => this.props.handleChange('qq', e.target.value)}
                       onKeyUp={e => this.onKeyUp(e)}/></li>
            <li><input type="text" placeholder="用户名" onChange={e => this.props.handleChange('name', e.target.value)}
                       onKeyUp={e => this.onKeyUp(e)}/></li>
            <li><input type="password" placeholder="密码" onChange={e => this.props.handleChange('pwd', e.target.value)}
                       onKeyUp={e => this.onKeyUp(e)}/>
            </li>
            <li><input type="password" placeholder="确认密码"
                       onChange={e => this.props.handleChange('repeatPwd', e.target.value)}
                       onKeyUp={e => this.onKeyUp(e)}/>
            </li>
            <li>
              <button onClick={this.onRegister}>注册</button>
            </li>
            <li><a href="/">返回首页</a></li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Home