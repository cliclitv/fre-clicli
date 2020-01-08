import { h, useRef, useEffect, useState, useLayout } from 'fre'
import './index.styl'
import VideoList from 'component/video-list'
import { getPostDetail, getPv } from '../../api/get'
import { getAvatar } from '../../public/js/util'
import snarkdown from 'snarkdown'

export default function PostDetal(props) {
  const t = useRef(null)
  const [post, setPost] = useState({})
  const [pv, setPv] = useState(0)
  useEffect(() => {
    getPostDetail(props.gv).then(res => {
      getPv(props.gv).then(ret => {
        setPost(res.result)
        setPv(ret.pv)
      })
      t.current.innerHTML = snarkdown(res.result.content)
    })
  }, [props.gv])

  return (
    <div className='post-detail'>
      <div className='left'>
        <article ref={t}>少男祈祷中……</article>
      </div>
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
        </div>
        {post.status === 'public' ? <VideoList gv={props.gv} /> : <div class='copyright'>版权原因，该番剧未上架，请支持正版</div>}
      </div>
    </div>
  )
}
