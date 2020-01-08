import {h, useEffect, useState} from 'fre'
import {getRank} from 'api/get'
import {getSuo} from 'public/js/util'
import './index.styl'
import {clink} from 'public/js/const'
import {push} from '../../use-routes'

export default function Rank(props) {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    getRank().then(res => {
      setPosts(res.posts)
    })
  }, [])
  return <div className="rank">
    <h1>排行榜</h1>
    <ul>
      {posts.length > 0 && posts.map((item, index) => {
        return index === 0 ? <a href={`${clink}/play/gv${item.id}`} key={item.id}>
          <li className='current'>
            <div className="cover">
              <img src={getSuo(item.content)}/>
            </div>
            <div className="info">
              <div className="title">{item.title}</div>
              <div className="bom">
                <div className="tag">{item.tag}</div>
                <div className="idx">{index + 1}</div>
              </div>
            </div>
          </li>
        </a> : <a href={`${clink}/play/gv${item.id}`} key={item.id}>
          <li>
            <span className={index < 3 ? 'active' : ''}>{index + 1}</span>
            <a target="_blank" href={`${clink}/play/gv${item.id}`}>
              <div className='title'>{item.title}</div>
            </a>
          </li>
        </a>
      })}
    </ul>
  </div>
}