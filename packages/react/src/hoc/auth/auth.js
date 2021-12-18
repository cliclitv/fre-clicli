import React from "react"
import {API_LINK} from "common/js/util"
import {auth} from 'api/user'
import Cookies from 'js-cookie'

export function adminAuth(Component) {
  return class WrapperComp extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        level: 1
      }
    }

    componentDidMount() {
      auth().then(res => {
        if (res.data.code === 401) {
          this.props.history.push('/login')
        } else {
          this.setState({
            level: Cookies.get('level')
          })
        }
      })
    }

    render() {
      return <Component state={this.state} {...this.props}></Component>
    }
  }
}