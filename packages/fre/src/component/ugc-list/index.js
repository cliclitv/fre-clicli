import { h, useEffect, useState } from 'fre'
import { getPost, getSearch } from 'api/get'
import { getAvatar, getSuo } from 'public/js/util'
import './index.styl'
import { clink } from 'public/js/const'

export default function UGCList(props) {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    if (props.word) {
      getSearch(props.word).then(res => setPosts(res.posts))
    } else {
      getPost('原创', '', 2, 4).then(res => setPosts(res.posts))
    }
  }, [])
  return (
    <div className='ugc-list'>
      <div className='wrap'>
        <h1>{props.title}</h1>
        <ul className='posts'>
          {posts &&
            posts.map(item => (
              <li onClick={() => props.push(`/play/gv${item.id}`)} key={item.id}>
                <div className='post'>
                  <div className='cover'>
                    <img src={getSuo(item.content)} />
                  </div>
                  <div className='info'>
                    <div className='uqq'>
                      <img src={getAvatar(item.uqq)} />
                    </div>
                    <div className='title'>{item.title}</div>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}
