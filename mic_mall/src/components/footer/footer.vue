<template>
  <div class="footer">
    <ul>
      <router-link tag="li" :to="'goodslist' | bidUrl(bid)">
        <i class="iconfont icon-index_moren"></i>
        <p>首页</p>
      </router-link>
      <router-link tag="li" :to="'/shop/category'+data.url">
        <i class="iconfont icon-category_moren"></i>
        <p>类别</p>
      </router-link>
      <router-link tag="li" to="/shop/cart" ref="cart">
        <i class="iconfont icon-shop"></i>
        <p>购物车</p>
      </router-link>
      <router-link tag="li" to="indent">
        <i class="iconfont icon-order_moren"></i>
        <p>订单</p>
      </router-link>
    </ul>
    <div class="ball_container" ref="footBall">
      <!--<transition-group name="drop" tag="ul"-->
                        <!--@beforeEnter="beforeDrop"-->
                        <!--@enter="droping"-->
                        <!--@afterEnter="afterDrop">-->
        <!--<div class="ball_wrap" :key="index" v-for="(ball, index) in balls" v-show="ball.show">-->
          <!--<div class="ball"></div>-->
        <!--</div>-->
      <!--</transition-group>-->
      <ball></ball>
    </div>
  </div>
</template>

<script>
  import ball from '../ball/ball.vue'

  export default {
    name: 'footer',
    props: ['data'],
    data () {
      return {
        balls: [
          {show: false},
          {show: false},
          {show: false},
          {show: false},
          {show: false}
        ],
        dropBalls: [],
        screenH: '',
      }
    },
    methods: {
      drop (clickEv) {
        for (var i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i]
          if (!ball.show) {
            ball.clickEv = clickEv
            console.log(clickEv, 'clickEv')
            ball.show = true
            this.dropBalls.push(ball)
            return
          }
        }
      },
      beforeDrop (el) {
        let len = this.balls.length
        let ballRect = this.$refs.footBall.getBoundingClientRect()
        this.$refs.cart.classList.remove('shake')
        this.$refs.cart.transform = 'scale(1)'
        while (len--) {
          let ball = this.balls[len]
          if (ball.show) {
            let clickRect = {
              left: +ball.clickEv.changedTouches[0].clientX,
              top: +ball.clickEv.changedTouches[0].clientY
            }
            console.log(this.$refs.footBall.getBoundingClientRect())
            let inner = el.children[0]
            let top = this.screenH - clickRect.top
            let left = clickRect.left - ballRect.left

            el.style.display = ''

        /*    setTimeout(() => {
              el.style.transition = 'all .5s cubic-bezier(0.49, -0.29, 0.75, 0.41)'
              inner.style.transform = 'all .5s linear'
            }, 0)*/
            
            el.style.transform = `translate3d(0,${-top}px,0)`
            inner.style.transform = `translate3d(${left}px,0,0)`
            el.style.webkitTransform = `translate3d(0,${-top}px,0)`
            inner.style.webkitTransform = `translate3d(${left}px,0,0)`
            break
          }
        }
      },
      droping (el) {
        this.$nextTick(() => {
          console.log(el.offsetWidth)
          let inner = el.children[0]
          el.style.transform = `translate3d(0,0,0)`
          inner.style.transform = `translate3d(0,0,0)`
          el.style.webkitTransform = `translate3d(0,0,0)`
          inner.style.webkitTransform = `translate3d(0,0,0)`
        })
      },
      afterDrop (el) {
        let ball = this.dropBalls.shift()
        let inner = el.children[0]
        this.$refs.cart.classList.add('shake')
//        inner.style.transition = ''
//        el.style.transition = ''
        if (ball) {
          ball.show = false
          el.style.display = 'none'
        }
      }
    },
    created () {
      this.$nextTick(() => {
        this.screenH = document.documentElement.clientHeight
      })
//      this.pub.$on('drop', (el) => {
//        this.drop(el)
//      })
    },
    computed: {
      bid () {
        return this.$store.state.bid
      }
    },
    components: {
      ball
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  @r: 37.5rem;
  @priceC: #ff6400;
  .footer{
    font: normal 28px 'Microsoft YaHei UI';
    /*border-top: 1px solid #e5e5e5;*/
    box-shadow: 0 -5px 10px #e5e5e5;
    background-color: #fff;
    position: fixed;
    height: 50/@r;
    width: 100%;
    bottom: 0;
    left: 0;
    >ul{
      height: 100%;
      padding: 8/@r 0 2/@r;
      overflow: hidden;
      li{
        &.active{
          *{
            color: #4080E8;
          }
        }
        text-align: center;
        float: left;
        width: 25%;
        font-size: 0;
        p{
          outline: none;
          margin-top: 4/@r;
          font-size: 20px;
          color: #999;
        }
        i{
          color: #999;
        }
      }
    }
    .ball_container{
      position: absolute;
      z-index: 0;
      bottom: 10/@r;
      height: 20/@r;
      width: 20/@r;
      right: 150/@r;
      .ball_wrap{
        position: absolute;
        .ball{
          height: 14/@r;
          width: 14/@r;
          border-radius: 50%;
          background-color: @priceC;
        }
      }
    }
    .shake{
      animation: shake .6s;
    }
    @keyframes shake {
      20%{
        transform: scale(.8);
      }
      40%{
        transform: scale(1.5);
      }
      60%{
        transform: scale(0.8);
      }
      80%{
        transform: scale(1.2);
      }
      100%{
        transform: scale(1);
      }
    }
    .drop-enter-active{
      transition: all .3s cubic-bezier(0.49, -0.29, 0.75, 0.41);
      .ball{
        transition: all .3s linear;
      }
    }
  }
</style>
