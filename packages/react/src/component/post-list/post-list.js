import React from 'react'
import {getPosts} from 'api/post'
import ListView from '../../base/list-view/list-view'
import {withRouter, Link} from 'react-router-dom'

import ReachBox from 'base/reach-box/reach-box'


@withRouter
class PostList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: []
    }
  }

  loadArticles() {
    let status = this.props.match.params.status
    getPosts(status, '', '', '', 1, 100).then((res) => {
      if (res.data.code === 200) {
        this.setState({
          posts: res.data.posts
        })
      }
    })
  }

  loadAuthorArticle() {
    getPosts('', '', '', this.props.match.params.author, 1, 100).then(res => {
      if (res.data.code === 200) {
        this.setState({
          posts: res.data.posts
        })
      }
    })
  }

  refresh() {
    let p = this.props.location.pathname
    if (p === '/posts/wait' || p === '/posts/public' || p === '/posts/under') {
      return this.loadArticles()
    }
    this.loadAuthorArticle()
  }

  render() {
    return (
      <div className="article-list">
        <ReachBox text='请输入文章id' prefix='/editor-article/'/>
        <Link to="/posts/wait">待审核</Link>
        <Link to="/posts/under" style={{padding: '20px'}}>已下架</Link>
        <Link to="/posts/public">已发布</Link>
        <ListView list={this.state.posts} refresh={this.refresh.bind(this)}/>
      </div>
    )
  }

  componentDidMount() {
    this.refresh()
  }
}

export default PostList