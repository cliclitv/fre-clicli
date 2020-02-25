import { h, useRef, useEffect, useState, useLayout } from 'fre'
import './index.styl'
import VideoList from 'component/video-list'
import { getPostDetail, getPv } from '../../api/get'
import { getAvatar } from '../../public/js/util'
import snarkdown from './snarkdown'

export default function PostDetal(props) {
  const t = useRef(null)
  const u = useRef(null)
  const [post, setPost] = useState({})
  const [pv, setPv] = useState(0)
  useEffect(() => {
    getPostDetail(props.gv).then(res => {
      getPv(props.gv).then(ret => {
        setPost(res.result)
        setPv(ret.pv)
      })
      const w = document.body.clientWidth
      if (res.result.tag.indexOf('其它') > -1 || w < 480) {
        t.current.style.display = 'none'
        u.current.style.display = 'block'
        u.current.innerHTML = snarkdown(res.result.content)
      } else {
        t.current.innerHTML = snarkdown(res.result.content)
      }
    })
  }, [props.gv])

  return (
    <div className='post-detail'>
      <article className='left' ref={t}></article>
      <div className='right'>
        <div className='info'>
          <div className='user'>
            <span className='avatar'>
              <img src={getAvatar(post.uqq)} alt={post.uqq}></img>
            </span>
            <span className='uname'>{post.uname || ''}</span>
            <span className='uid'>uid：{post.uid || 0}</span>
          </div>
          <div class='title'>
            <h1>{post.title || '少男祈祷中……'}</h1>
            <span class='pv'>{pv} ℃ </span>
          </div>
          <div>
            <span>{post.tag || ''}</span>
            <span>{post.time || ''}</span>
          </div>
          <article ref={u} class='other'></article>
        </div>
        {post.status === 'public' ? <VideoList gv={props.gv} /> : <div className='copyright'>版权原因，该番剧未上架，请支持正版</div>}
      </div>
    </div>
  )
}
