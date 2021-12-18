import React from 'react'
import {add, getPost, update} from 'api/post'
import {getVideos} from "api/video"
import {adminAuth} from "hoc/auth/auth"
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import Markdown from 'base/markdown/markdown'
import TopTip from 'base/top-tip/top-tip'

import './write-article.css'

@adminAuth
class WriteArticle extends React.Component {
  constructor(props) {

    super(props)
    this.state = {
      title: '',
      content: '',
      sort: '完结',
      status: 'wait',
      msg: '',
      uid: parseInt(Cookies.get('uid')),
      id: this.props.match.params.editor,
      text: '撰写',
      bg: '',
      tag: '',
      time: '',
      videos: []
    }
  }

  componentDidMount() {
    this.loadArticle()
    this.loadVideo()
    this.props.location.pathname === '/write-article' ? this.setState({text: '添加'}) : this.setState({text: '更新'})
  }

  handleChange(key, val) {
    this.setState({
      [key]: val
    })
  }

  changeMde(content) {
    this.setState({
      content
    })
  }

  loadArticle() {
    if (this.state.id) {
      getPost(this.state.id).then((res) => {
        const {title, content, sort, tag, status, time} = res.data.result
        this.setState({
          title,
          content,
          sort,
          tag,
          status,
          time: time.slice(0, -3),
          defaultValue: content
        })
      })
    }
  }

  loadVideo() {
    if (this.state.id) {
      getVideos(this.state.id, 1, 100).then(res => {
        this.setState({
          videos: res.data.videos
        })
      })
    }
  }

  handleClick() {
    if (!this.state.title || !this.state.content || !this.state.status || !this.state.sort || !this.state.tag) {
      this.setState({
        msg: '都要填写都要填(〃＞皿＜)！',
        bg: '#ef736e'
      })
      setTimeout(() => {
        this.setState({
          msg: ''
        })
      }, 5000)
      return
    }

    if (this.props.location.pathname !== '/write-article') {
      update(this.state).then((res) => {
        if (res.data.code === 200) {
          this.setState({
            msg: '更新成功啦！',
            text: '更新',
            bg: '#b4d896'
          })
        }
        setTimeout(() => {
          this.props.history.push(`/article/${this.state.uid}`)
          this.setState({
            msg: ''
          })
        }, 5000)
      })
    } else {
      add(this.state).then((res) => {
        if (res.data.code === 200) {
          this.setState({
            msg: '添加成功啦',
            bg: '#b4d896'
          })
        }
        setTimeout(() => {
          this.props.history.push(`/article/${this.state.uid}`)
          this.setState({
            msg: ''
          })
        }, 5000)
      })
    }
  }

  selectTag(item) {
    if (this.state.tag.indexOf(item) > -1) {
      this.setState({
        tag: this.state.tag.replace(` ${item}`, '')
      })
    } else {
      this.setState({
        tag: this.state.tag + ' ' + item
      })
    }
  }

  render() {
    const tags = ['推荐', '转载', '漫画改', '小说改', '耽美', '乙女', '百合', '后宫', '热血', '战斗', '运动', '奇幻', '神魔',
      '搞笑', '冒险','校园', '恐怖' ,'穿越' ,'推理' ,'科幻',  '日常', '古风', '恋爱', 'r15', '泡面番', '治愈',
      '鬼畜', 'AMV/MAD', '音乐·PV', '游戏·GMV', 'VOCALOID', '影视',
      '特摄', '真人剧', '其它']
    return (
      <div>{this.state.msg ? <TopTip text={this.state.msg} bg={this.state.bg}/> : null}
        <div className="write-article">
          <h1>{this.state.text}稿件</h1>
          <li><input type="text" placeholder="请输入标题"
                     value={this.state.title}
                     onChange={e => this.handleChange('title', e.target.value)}/></li>
          <Markdown handleMde={content => this.changeMde(content)}
                    value={this.state.content} defaultValue={this.state.defaultValue}/>
          <span>
            <select onChange={e => this.handleChange('sort', e.target.value)}
                    value={this.state.sort}>
          <option value="原创">原创</option>
          <option value="新番">新番</option>
          <option value="完结">完结</option>
          <option value="剧场版">剧场版</option>
          <option value="影视">影视</option>
        </select></span>
          <span><select onChange={e => this.handleChange('status', e.target.value)}
                        value={this.state.status}>
          <option value="wait">待审核</option>
          <option value="remove">待删除</option>
          <option value="under">已下架</option>
            {this.props.state.level > 2 ?
              <option value="public">发布</option> : null}
        </select></span>
          <span>{this.props.location.pathname === '/write-article' ? null : <input type="text" value={this.state.time}
                                                                                   onChange={e => this.handleChange('time', e.target.value)}/>}</span>
          <div className="tags">
            <ul>
              {tags.map((item, index) => <li onClick={() => this.selectTag(item)} key={index}
                                             className={this.state.tag.indexOf(item) > -1 ? 'active' : ''}>{item}</li>)}
            </ul>
          </div>
          <div className="video-list">
            {this.state.videos ? this.state.videos.map(item => {
              return (
                <Link to={`/editor-video/` + item.id} key={item.id}>
                  <li>
                    <div className="title">{item.oid}</div>
                  </li>
                </Link>
              )
            }) : null}
            {this.props.location.pathname === '/write-article' ? null : <Link to={`/add-video/${this.state.id}`}>
              <li className="add">
                <div>＋</div>
              </li>
            </Link>}

          </div>
          <div>
            <button onClick={this.handleClick.bind(this)}>{this.state.text}稿件</button>
          </div>
        </div>
      </div>
    )
  }
}


export default WriteArticle