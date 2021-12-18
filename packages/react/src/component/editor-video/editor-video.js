import React from 'react'
import TopTip from 'base/top-tip/top-tip'
import {getVideo, updateVideo, deleteVideoById, addVideo, getUploadToken} from "api/video"
import {adminAuth} from "hoc/auth/auth"
import {withRouter} from 'react-router-dom'

import '../editor-user/editor-user.css'
import Cookies from "js-cookie"

@adminAuth
@withRouter
class EditorVideo extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      id: this.props.match.params.id,
      oid: '',
      title: '',
      content: '',
      pid: this.props.match.params.pid,
      text: '修改',
      uid: parseInt(Cookies.get('uid')),
      zhilian: true,
      per: 0
    }
  }

  componentDidMount() {
    if (this.props.location.pathname.indexOf('add-video') > -1) {
      this.setState({text: '添加'})
    } else {
      this.loadVideo()
      this.setState({text: '修改'})
    }
  }

  loadVideo() {
    getVideo(this.state.id).then(res => {
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

  deleteVideo() {
    deleteVideoById(this.state.id).then(res => {
      if (res.data.code === 200) {
        this.setState({
          msg: '删除成功啦'
        })
        setTimeout(() => {
          this.props.history.goBack()
          this.setState({
            msg: ''
          })
        }, 2000)
      }
    })
  }

  handleClick() {
    if (this.props.location.pathname.indexOf('editor-video') > -1) {
      updateVideo(this.state).then(res => {
        if (res.data.code === 200) {
          this.setState({
            msg: '更新成功啦'
          })
        }
        setTimeout(() => {
          this.props.history.goBack()
          this.setState({
            msg: ''
          })
        }, 2000)
      })
    } else {
      this.addVideos()
    }
  }

  addVideos() {
    addVideo(this.state).then(res => {
      if (res.data.code === 200) {
        this.setState({
          msg: '添加成功啦'
        })
      }
      setTimeout(() => {
        this.props.history.goBack()
        this.setState({
          msg: ''
        })
      }, 2000)
    })
  }

  async onUpload() {
    let self = this
    let file = this.refs.uploader.files[0]
    let rname = this.state.pid + ' | ' + this.state.oid
    const token = await getUploadToken(file.name, rname).then(res => {
      return res.data.uploadToken
    })
    console.log(token)
    const uploader = new DogeUploader({
      file,
      token,
      next(progress) {
        self.setState({
          per: `${Math.floor(progress.percent)}`
        })
      },
      error(err) {
        alert('上传出错( ' + err.code + ' )：' + err.message + '')
      },
      complete(res) {
        console.log('上传完成，视频 vid：' + res.vid)
        self.setState({
          content: `${res.vid}@dogecloud`,
          per: 0
        })
      }
    })

    uploader.upload()
  }

  zhilian() {
    this.setState({
      zhilian: !this.state.zhilian
    })
  }

  render() {
    return (
      <div>
        {this.state.msg ? <TopTip text={this.state.msg} bg="#b4d896"/> : null}
        {this.state.per ? <div className='per'>{this.state.per + '%'}</div> : null}

        <div className="editor-user">
          <h1>{this.state.text}视频</h1>
          <ul>
            <li>序号：<input type="text" value={this.state.oid} placeholder="数字"
                          onChange={e => this.handleChange('oid', e.target.value)}/></li>
            <li>备注：<input type="text" value={this.state.title} placeholder="可不填"
                          onChange={e => this.handleChange('title', e.target.value)}/>
            </li>
            <li><span onClick={this.zhilian.bind(this)}>{this.state.zhilian ? '直链' : '上传'}</span>：{this.state.zhilian ?
              <input type="text" value={this.state.content}
                     placeholder="支持mp4、m3u8等直链"
                     onChange={e => this.handleChange('content', e.target.value)}/>
              : <div>
                <div id="uploader"><span>上传</span><input type="file" ref='uploader' accept="video/*"
                                                         onChange={this.onUpload.bind(this)}/></div>
                <div style={{height: '55px'}}></div>
              </div>
            } </li>
            <li className="center">
              <button onClick={this.handleClick.bind(this)}>提交</button>
              <button onClick={this.deleteVideo.bind(this)}>删除</button>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default EditorVideo