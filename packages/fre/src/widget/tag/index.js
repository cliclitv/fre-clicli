import { h } from 'fre'
import './index.styl'


export default function Tag () {
  const arr = [
    '耽美',
    '乙女',
    '百合',
    '后宫',
    '热血',
    '运动',
    '冒险',
    '战斗',
    'r15',
    '治愈',
    '推理',
    '特摄'
  ]
  return (
    <div class='tags'>
      <div class='wrap'>
        {arr.map(item => (
          <a>{item}</a>
        ))}
        <a href="">更多></a>
      </div>
    </div>
  )
}
