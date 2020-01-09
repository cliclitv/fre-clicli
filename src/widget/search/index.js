import { h, useState } from 'fre'
import { clink } from 'public/js/const'
import './index.styl'

export default function Search(props) {
  const [word, setWord] = useState('')
  const inputWord = e => {
    setWord(e.target.value)
    console.log(word)
  }
  return (
    <div className='search'>
      <input type='text' placeholder='搜索一下下菊花又不会坏(⊙o⊙)…' onInput={inputWord} />
      <a href={`${clink}/search/${word}`} target='_blank'>
        <i class='icon-font icon-search'></i>
      </a>
    </div>
  )
}
