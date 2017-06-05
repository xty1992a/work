<template>
  <div class="ball">
    <ul class="goods-list">
      <li class="goods-item" v-for="index in 50">
        <i class="add" @click="drop">+</i>
      </li>
    </ul>

    <div class="foot">
      <div class="jiakuan" ref="jiakuan" @animationend="animationend"></div>
      <div class="kuan" ref="kuan">
        <transition-group name="drop"
                          @beforeEnter="beforeDrop"
                         
        >
          <div class="ball_wrap" :key="index" v-for="(ball, index) in balls" v-show="ball.show">
            <div class="ball"></div>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ball',
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
        screenH: ''
      }
    },
    beforeRouteEnter (to, from, next) {
      console.log('enter')
      next(vm => {
        console.log('in')
        vm.$emit('hideFooter', false)
      })
    },
    beforeRouteLeave (to, from, next) {
      this.$emit('hideFooter', true)
      next()
    },
    created () {
      this.screenH = document.documentElement.clientHeight
    },
    methods: {
      drop (ev) {
        console.log('click')
        let el = ev.target
        for (var i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i]
          console.log('before in')
          if (!ball.show) {
            console.log('i m in')
            ball.ev = ev
            ball.show = true
            this.dropBalls.push(ball)
            return
          }
        }
      },

      beforeDrop (el) {
        let len = this.balls.length
        let screenH = this.screenH
        this.$refs.jiakuan.classList.remove('shake')
        this.$refs.jiakuan.style.transform = 'scale(1)'
        while (len--) {
          let ball = this.balls[len]
          let ballRect = this.$refs.kuan.getBoundingClientRect()
          if (ball.show) {
            let clickRect = {
              top: ball.ev.clientX,
              left: ball.ev.clientY,
            }
            let inner = el.children[0]

            el.style.display = ''
            el.scale = 1 - 1 - top / screenH
            console.log(el.scale)

            let top = clickRect.top - ballRect.top
            let left = clickRect.left - ballRect.left
            console.log(top, left)

            el.style.transform = `translateY(${top}px)`
            inner.style.transform = `translateX(${left}px)`
            el.style.webkitTransform = `translateY(${top}px)`
            inner.style.webkitTransform = `translateX(${left}px)`
            break
          }
        }
      },
      droping (el) {
        console.log(el.offsetHeight)
        this.$nextTick(() => {
          let inner = el.children[0]
//            inner.style.transition = `all ${el.scale}s linear`
//            el.style.transition = `all ${el.scale}s cubic-bezier(0.49, -0.29, 0.75, 0.41)`
            el.style.transform = `translateyY(0)`
            inner.style.transform = `translateX(0)`
            el.style.webkitTransform = `translateY(0)`
            inner.style.webkitTransform = `translateX(0)`
        })
      },
      afterDrop (el) {
        let ball = this.dropBalls.shift()
//        let inner = el.children[0]
//        inner.style.transition = ``
//        el.style.transition = ``
        this.$refs.jiakuan.classList.add('shake')
        console.log(ball)
        if (ball) {
          ball.show = false
          el.style.display = 'none'
        }
      },
      animationend (ev) {
        ev.target.classList.remove('shake')
        console.log(ev.target)
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less">
  @r: 32.5rem;
  .ball{
    background-color: #999;
    .goods-list{
      .goods-item{
        height: 50/@r;
        line-height: 50/@r;
        text-align: right;
        padding-right: 50/@r;
        background-color: yellowgreen;
        border-bottom: 1px solid darkblue;
        .add{
          color: #fff;
          width: 15/@r;
          height: 15/@r;
          font-size: 36px;
          line-height: 15/@r;
          border-radius: 50%;
          font-style: normal;
          font-weight: bold;
          text-align: center;
          display: inline-block;
          vertical-align: middle;
          background-color: orangered;
        }
      }
    }

    .foot{
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      height: 30/@r;
      background-color: #f4f4f4;
      .kuan, .jiakuan{
        width: 30/@r;
        height: 100%;
        background-color: darkcyan;
        line-height: 50px;
        text-align: center;
        position: relative;
        .ball_wrap{
          position: absolute;
          display: inline-block;
          vertical-align: middle;
          .ball{
            position: absolute;
            width: 10/@r;
            height: 10/@r;
            border-radius: 50%;
            background-color: orangered;
          }

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
      transition: all .5s cubic-bezier(0.49, -0.29, 0.75, 0.41);
      .ball{
        transition: all .5s linear;
      }
    }
  }
</style>
