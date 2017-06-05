import Vue from 'vue'
import Router from 'vue-router'
// import main from '../components/main/main.vue'
// import indent from '../components/indent/indent.vue'
import unpaid from '../components/indent/unpaid/unpaid.vue'
import paid from '../components/indent/paid/paid.vue'
import finished from '../components/indent/finished/finished.vue'
import cancel from '../components/indent/cancel/cancel.vue'
import ball from '../components/ball.vue'
import redirect from '../components/redirect.vue'

Vue.use(Router)
let router = new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/shop/goodslist'
    },
    {
      path: '/shop/goodslist',
      name: 'main',
      component: resolve => require(['../components/main/main3.0.vue'], resolve)
    },
    {
      path: '/shop/goodsdetail',
      name: 'detail',
      component: resolve => require(['../components/detail/detail.vue'], resolve)
    },
    {
      path: '/orders',
      name: 'orders',
      // component: main // 实现按需加载
      component: resolve => require(['../components/orders/orders.vue'], resolve)
    },
    {
      path: '/shop/cart',
      name: 'cart',
      // component: main // 实现按需加载
      component: resolve => require(['../components/cart/cart.vue'], resolve)
    },
    {
      path: '/shop/category',
      name: 'category',
      // component: main // 实现按需加载
      component: resolve => require(['../components/category/category.vue'], resolve)
    },
    {
      path: '/shop/indent',
      name: 'indent',
      redirect: 'shop/indent/unpaid',
      component: resolve => require(['../components/indent/indent.vue'], resolve),
      children: [
        {
          path: 'unpaid',
          name: 'unpaid',
          component: unpaid
        },
        {
          path: 'paid',
          name: 'paid',
          component: paid
        },
        {
          path: 'finished',
          name: 'finished',
          component: finished
        },
        {
          path: 'cancel',
          name: 'cancel',
          component: cancel
        }
      ]
    },
    {
      path: '/redirect',
      name: 'redirect',
      component: redirect
    },
    {
      path: '/shop/test',
      name: 'test',
      component: ball
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    console.log(savedPosition, 'savedPosition')
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 200 }
    }
  }
})

var target = location
var reg = /7879\/(.*)$/
reg.test(target)

console.log(RegExp.$1, RegExp.$1.indexOf('pay'))
if (!RegExp.$1.indexOf('pay')) {
  var url = 'http://localhost:7879/' + RegExp.$1 + 'pay'
  console.log(url)
  // location.href = url
}
// router.push('/main')
export default router
