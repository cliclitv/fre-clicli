import React from 'react'
import './confirm.css'

class Confirm extends React.Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     isShow: true
  //   }
  // }

  closeShow() {
    this.props.closeShow()
  }

  confirm() {
    this.props.confirm(this.props.id)
  }

  render() {
    return (
      <div className="confirm" >
        <div className="text">
          确认删除吗？
        </div>
        <ul className="option">
          <li onClick={this.closeShow.bind(this)}>取消</li>
          <li onClick={this.confirm.bind(this)}>确认</li>
        </ul>
      </div>
    )
  }
}

export default Confirm