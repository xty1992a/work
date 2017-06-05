// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import VueScroller from 'vue-scroller'
import VueX from 'vuex'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'

fastclick.attach(document.body)

import './common/js/rem2.js'
import './common/css/reset.css'
import './common/js/setTransform.js'
// import './js/Vconsole.js'
// import './js/overScroll.js'
import './common/css/fonts/iconfont.css'
import './common/css/common.css'

Vue.config.productionTip = false
Vue.use(VueScroller)
Vue.use(VueX)
Vue.use(VueLazyload, {
  loading: require('./common/img/loading.png')
})

// 为所有vm实例添加一个通信器
Vue.prototype.pub = new Vue()

const store = new VueX.Store({
  state: {
    bid: ''
  },
  mutations: {
    setBid (state, bid) {
      console.log(bid, 'main')
      state.bid = bid
    }
  }
})

Vue.filter('goodsUrl', function (value, bid, guid) {
  return '/shop/' + value + '?bid=' + bid + '&guid=' + guid
})

Vue.filter('bidUrl', function (value, bid) {
  return '/shop/' + value + '?bid=' + bid
})

Vue.filter('currency', function (value) {
  return value.toFixed(2)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
