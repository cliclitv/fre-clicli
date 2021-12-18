import React from 'react'
import './listview.css'
import {Link} from 'react-router-dom'
import Confirm from '../confirm/confirm'
import {withRouter} from 'react-router-dom'
import {deletePost} from 'api/post'
import {deleteCommentByPid} from "api/comment"
import {deleteVideoByPid} from "api/video"

@withRouter

class ListView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isShow: false,
      id: ''
    }
  }

  handleDelete(id) {
    Promise.all([deletePost(id), deleteCommentByPid(id), deleteVideoByPid(id)]).then(() => {
      this.props.refresh()
    })

    this.setState({
      isShow: false,
      id: '',
    })
  }

  handleShow(id) {
    this.setState({
      isShow: true,
      id: id
    })
  }

  closeShow() {
    this.setState({
      isShow: false
    })
  }

  render() {
    return (

      <div className="listview">
        {this.state.isShow === true ? <Confirm id={this.state.id} confirm={this.handleDelete.bind(this)}
                                               closeShow={this.closeShow.bind(this)}/> : null}

        <li style={{border: '0', padding: '10px 20px', fontWeight: 'bold'}}>
          <div className="title" style={{color: '#444'}}>标题</div>
          <div className="sort">分类</div>
          <div className="status">状态</div>
          <div className="action">操作</div>
        </li>
        <ul style={{background: '#fff', padding: '0 10px'}}>

          {this.props.list ? this.props.list.map((item) => {
            return (
              <li key={item.id}>
                <div className="title"><Link to={`/editor-article/` + item.id}>{item.title}</Link></div>
                <div className="sort">{item.sort}</div>
                <div className="status">{item.status}</div>
                <div className="action"><i className="icon-font icon-del" onClick={() => {
                  this.handleShow(item.id)
                }}/><Link to={`/editor-article/` + item.id}><i className="icon-font icon-editor"/></Link></div>
              </li>
            )
          }) : <h1>没有文章(′⌒`)</h1>}
        </ul>
      </div>
    )
  }
}

export default ListView