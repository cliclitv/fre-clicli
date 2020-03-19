import { h, useState, useEffect } from 'fre'
import { clink } from 'public/js/const'
import './index.styl'

export default function Search({ push }) {
  const [word, setWord] = useState('')
  useEffect(() => {
    document.onkeydown = e => {
      if (e.keyCode == 13 && word) {
        push(`/search/${word}`)
      }
    }
  })
  const inputWord = e => {
    setWord(e.target.value)
  }
  return (
    <div className='search'>
      <input type='text' placeholder='搜索一下下菊花又不会坏(⊙o⊙)…' onInput={inputWord} />
      <span onClick={() => push(`/search/${word}`)}>
        <i class='icon-font icon-search'></i>
      </span>
    </div>
  )
}
