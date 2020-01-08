class Slider {
  constructor (options) {
    this.options = options
    this.order = 0
    this.items = [...document.querySelectorAll('.imgs li')]
    this.imgs = document.querySelector('.imgs')
    this.timer
    this.setDot(1)
    this.autoPlay()
  }

  setDot (index) {
    this.order = index
    this.items.forEach(item => (item.style.opacity = 0.5))
    this.items[this.order].style.opacity = 1
    this.imgs.style.transform = `translate3d(${this.order * -this.options.width}px,0,0)`
  }
  autoPlay () {
    if (!this.options.loop) return
    this.timer = setInterval(() => {
      if (this.order > 3) this.order = 0
      this.setDot(this.order + 1)
    }, 5000)
  }
}

export function createSlider (options) {
  return new Slider(options)
}
