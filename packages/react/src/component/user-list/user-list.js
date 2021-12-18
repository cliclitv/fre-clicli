import React from 'react'

import {userList} from 'api/user'
import {Link, withRouter} from 'react-router-dom'
import ReachBox from 'base/reach-box/reach-box'

import './user-list.css'

@withRouter
class UserList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      uid: ''
    }
  }

  componentDidMount() {
    userList(this.props.match.params.level).then((res) => {
      if (res.data.code === 200) {
        this.setState({users: res.data.users})
      }
    })
  }

  render() {

    return (
      <div className="user-list">
        <div className="role">
          <Link to="/users/user" style={{padding: '20px'}}>用户</Link>
          <Link to="/users/author">作者</Link>
          <Link to="/users/editor" style={{padding: '20px'}}>审核</Link>
        </div>

        <ul>
          {this.props.location.pathname === '/users/user' ?
            <ReachBox text='请输入qq' prefix='/editor-user/'/>
              :
            this.state.users.map((item) => {
              const qq = `http://q2.qlogo.cn/headimg_dl?dst_uin=` + item.qq + `&spec=100`
              return (
                <li key={item.id}>
                  <Link to={`/editor-user/` + item.name}>
                    <div className="avatar"><img src={qq} alt=""/></div>
                    <div className="name">{item.name}</div>
                  </Link>
                </li>
              )
            })}
        </ul>
      </div>

    )
  }
}

export default UserList