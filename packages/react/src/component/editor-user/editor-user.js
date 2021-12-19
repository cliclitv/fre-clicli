import React from 'react'

import TopTip from 'base/top-tip/top-tip'

import {getUser, update} from 'api/user'
import {adminAuth} from "hoc/auth/auth"

import './editor-user.css'

@adminAuth
class EditorUser extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      qq: this.props.match.params.qq,
      msg: '',
      name: '',
      desc: '',
      level: ''
    }
  }

  componentDidMount() {
    this.loadUser()
  }

  loadUser() {
    getUser('', 0, this.state.qq).then(res => {
      if (res.data.code === 200) {
        this.setState(res.data.result)
      }
    })
  }

  handleChange(key, val) {
    this.setState({
      [key]: val
    })
  }

  handleClick() {
    update(this.state).then(res => {
      this.setState({
        msg: res.data.msg
      })
      setTimeout(() => {
        this.setState({
          msg: ''
        })
      }, 5000)
    })
  }

  render() {
    return (
      <div>
        {this.state.msg ? <TopTip text={this.state.msg} bg="#b4d896"/> : null}

        <div className="editor-user">
          <h1>编辑用户</h1>
          <ul>
            <li>用户名：<input type="text" value={this.state.name}
                           onChange={e => this.handleChange('name', e.target.value)}/></li>
            <li>密码：<input type="text" placeholder="留空则不修改" onChange={e => this.handleChange('pwd', e.target.value)}/>
            </li>
            <li>QQ：<input type="text" value={this.state.qq} onChange={e => this.handleChange('qq', e.target.value)}/>
            </li>
            {this.props.state.level > 3 ? (
              <li>权限：
                <select value={this.state.level} onChange={e => this.handleChange('level', e.target.value)}>
                  <option value="1">用户</option>
                  <option value="2">作者</option>
                  <option value="3">审核</option>
                  <option value="4">管理</option>
                </select></li>
            ) : null}

            <li>签名：
              <textarea value={this.state.desc} onChange={e => this.handleChange('desc', e.target.value)}>
            </textarea>
            </li>
            <li className="center">
              <button onClick={this.handleClick.bind(this)}>保存</button>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default EditorUser