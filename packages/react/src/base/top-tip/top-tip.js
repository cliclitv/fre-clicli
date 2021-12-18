import React from 'react'
import './top-tip.css'


class TopTip extends React.Component {

  render() {
    let text = this.props.text
    return (
      <div className="toptip" style={{background: this.props.bg}}>
        {text}
      </div>
    )
  }
}

export default TopTip