import React from 'react'

// 表单提交公共方法
export function handleForm(Component) {
  return class WrapperComp extends React.Component {
    constructor(props) {
      super(props)
      this.state = {}
      this.handleChange = this.handleChange.bind(this)
    }

    handleChange(key, val) {
      this.setState({
        [key]: val
      })
    }

    render() {
      return <Component handleChange={this.handleChange} state={this.state} {...this.props}></Component>
    }
  }
}