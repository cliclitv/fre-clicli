import {h, useEffect, useState} from 'fre'
import {getPost} from "api/get"
import {getSuo} from "public/js/util"
import {clink} from "public/js/const"
import './index.styl'
import {push} from '../../use-routes'

export default function PostList(props) {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    getPost('bgm', '', 1, 30).then(res => {
      setPosts(res.posts)
    })
  }, [])
  return <div className="post-list wrap">
    <h1>最新更新</h1>
    <ul>
      {posts.length > 0 && posts.map(item => {
        return (
          <li key={item.id} onClick={()=>push(`/play/gv${item.id}`)}>
              <div className="cover">
                <img src={getSuo(item.content)}/>
              </div>
              <div className="title">{item.title}</div>

          </li>
        )
      })}
    </ul>
  </div>
}