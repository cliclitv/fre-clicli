export default function (width, len, interval) {
  const container = document.querySelector('.slider')
  const slider = document.querySelector('.list')
  let dots = [].slice.call(document.querySelectorAll('.dots span'))
  let currentIndex = 0
  let isAnimate = false
  let timer

  // 无缝滚动
  function animate(offset) {
    if (offset === 0) {
      return
    }
    isAnimate = true
    const time = 500
    const interval = 10
    const speed = offset / (time / interval)

    let newOffset = parseInt(slider.style.left) + offset

    const go = () => {
      if (
        (speed < 0 && parseInt(slider.style.left) > newOffset) ||
        (speed > 0 && parseInt(slider.style.left) < newOffset)
      ) {
        slider.style.left = parseInt(slider.style.left) + speed + 'px'
        if (slider.style.left > -width) {
          slider.style.left = -width * (len + 1) + 'px'
        }
        if (slider.style.left < width * (len + 1)) {
          slider.style.left = -width + 'px'
        }
        setTimeout(go, interval)
      } else {
        slider.style.left = newOffset + 'px'
        if (newOffset > -width) {
          slider.style.left = -width * len + 'px'
        }
        if (newOffset < -width * len) {
          slider.style.left = '-440px'
        }
        isAnimate = false
      }
    }

    go()
  }

  // 自动播放
  function play() {
    timer = setInterval(() => {
      animate(-width)
      currentIndex++
      if (currentIndex === len) {
        currentIndex = 0
      }
      showDot()
    }, interval)
  }

  // 停止播放
  function stop() {
    clearInterval(timer)
  }

  // 圆点高亮
  function showDot() {
    dots.forEach(item => {
      if (item.className === 'active') {
        item.className = ''
      }
    })
    dots[currentIndex].className = 'active'
  }

  // 圆点点击事件
  function dotClick() {
    dots.forEach((item, index) => {
      item.onclick = () => {
        let offset = -width * (index - currentIndex)
        currentIndex = index
        animate(offset)
        showDot()
      }
    })
  }

  dotClick()

  container.onmouseover = stop
  container.onmouseout = play
  window.onblur = () => {
    stop()
  }
  window.onfocus = () => {
    stop()
    play()
  }
  stop()
  play()
}
