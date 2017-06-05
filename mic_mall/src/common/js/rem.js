(function (doc, win) {
  let docEl = doc.documentElement
  let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  let resize = function () {
    var clientWidth = docEl.clientWidth
    if (!clientWidth) return
    if (clientWidth >= 640) {
      docEl.style.fontSize = '100px' // 1rem  = 100px
    } else {
      docEl.style.fontSize = 100 * (clientWidth / 640) + 'px'
    }
  }
  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, resize, false)
  doc.addEventListener('DOMContentLoaded', resize, false)
})(document, window)
