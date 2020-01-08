import {h, useEffect, useState} from 'fre'
import {push} from '../../use-routes'
import {getPost} from 'api/get'
import {getSuo} from 'public/js/util'
import {clink} from 'public/js/const'
import './index.styl'

export default function Recommend(props) {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    getPost('', '推荐', 1, 10).then(res => {
      setPosts(res.posts)
    })
  }, [])
  return <div className="recommend">
    <h1>编辑推荐</h1>
    <ul>
      {posts.length > 0 && posts.map(item => {
        return <a href={`${clink}/play/gv${item.id}`} key={item.id} ><li>
          <div className="cover">
            <img src={getSuo(item.content)}/>
          </div>
          <div className="title">{item.title}</div>
        </li></a>
      })}
    </ul>
  </div>
}