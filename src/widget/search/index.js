import { h } from 'fre'
import './index.styl'

export default function Search(props) {
  return (
    <div className='search'>
      <input type='text' placeholder='搜索一下下菊花又不会坏(⊙o⊙)…' />
      <a>
        <i class='icon-font icon-search'></i>
      </a>
    </div>
  )
}
