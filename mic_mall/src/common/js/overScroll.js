(function () {
  let satrtY = 0
  document.body.addEventListener('touchstart', function (ev) {
    satrtY = ev.changedTouches[0].clientY
  })
})()
