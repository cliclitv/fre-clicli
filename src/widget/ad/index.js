import { h } from 'fre'
import { clink } from 'public/js/const'

export default function Ad(props) {
  return (
    <div class='wrap'>
      <a href={props.href} target='_blank'>
        <img src={props.src} style={{ width: '100%', borderRadius: '2px' }} />
      </a>
    </div>
  )
}
