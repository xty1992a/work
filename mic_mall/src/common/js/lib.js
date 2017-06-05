export default {
  swiper (wrap) {
    // var items = wrap.children
    // var itemW = items[0].clientWidth
    wrap.addEventListener('touchstart', function (ev) {
      var touch = ev.changedTouches[0]
      console.log(touch)
    })
    wrap.addEventListener('touchmove', function (ev) {
    })
  }

}
