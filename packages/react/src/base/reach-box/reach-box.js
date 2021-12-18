import React from 'react'
import './reach-box.css'
import {withRouter} from "react-router-dom"

@withRouter

class ReachBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      v: ''
    }
  }

  selectInput() {
    this.props.history.push(`${this.props.prefix}${this.state.v}`)
  }

  handleChange(v) {
    this.setState({
      v
    })
  }

  render() {
    return (
      <div className='reach-box'>
        <input type="text" placeholder={this.props.text} onChange={e => this.handleChange(e.target.value)}/>
        <button onClick={this.selectInput.bind(this)}>跳转</button>
      </div>
    )
  }

}

export default ReachBox