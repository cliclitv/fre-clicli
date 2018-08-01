export function tongji() {
  let _hmt = _hmt || [];
  (function() {
    //每次执行前，先移除上次插入的代码
    document.getElementById('baidu_tj') && document.getElementById('baidu_tj').remove()
    let hm = document.createElement("script")
    hm.src = "https://hm.baidu.com/hm.js?80665efc9eab8ed228161f2a6918b4b9"
    hm.id = "baidu_tj"
    let s = document.getElementsByTagName("script")[0]
    s.parentNode.insertBefore(hm, s)
  })()
}