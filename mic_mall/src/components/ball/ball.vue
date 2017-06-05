<template>
  <div class="balls" ref="balls">
    <transition-group name="drop"
                      @beforeEnter="beforeDrop"
                      @afterEnter="afterDrop"
                      @enter="droping"
    >
      <div class="ball" :key="index" v-for="(ball, index) in balls" v-show="ball.show">
        <div class="inner"></div>
      </div>
    </transition-group>
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
        usedBalls: [],
        screenH: 0,
        screenW: 0,
        diagonal: 0,
        ballRect: null
      }
    },
    created () {
      this.$nextTick(() => {
        this.screenH = document.documentElement.clientHeight
        this.screenW = document.documentElement.clientWidth
        this.diagonal = Math.sqrt(this.screenH * this.screenH + this.screenW * this.screenW)
        this.ballRect = this.$refs.balls.getBoundingClientRect()
        console.log(this.ballRect)
      })
      this.pub.$on('drop', ev => {
        this.drop(ev)
      })
    },
    methods: {
      drop (ev) {
        for (var i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i]
          if (!ball.show) {
            ball.ev = ev
            ball.show = true
            this.dropBalls.push(ball)
            return
          }
        }
      },

      beforeDrop (el) {
        let screenH = this.screenH
//        while (len--) {
//          let ball = this.balls[len]
//          if (ball.show) {
//            let ballRect = this.ballRect
//            let clickRect = {
//              top: ball.ev.clientY,
//              left: ball.ev.clientX,
//            }
//            console.log(clickRect)
//            let inner = el.children[0]
//
//            el.style.display = ''
//            el.scale = 1 - 1 - top / screenH
//
//            let top = clickRect.top - ballRect.top
//            let left = clickRect.left - ballRect.left
//            console.log(top, left)
//
//            el.style.transform = `translateY(${top}px)`
//            inner.style.transform = `translateX(${left}px)`
//            el.style.webkitTransform = `translateY(${top}px)`
//            inner.style.webkitTransform = `translateX(${left}px)`
//            break
//          }
        let ball = this.dropBalls.shift()
        let ballRect = this.ballRect
        let clickRect = {
          top: ball.ev.clientY - 10,
          left: ball.ev.clientX - 10,
        }
        console.log(clickRect)
        let inner = el.children[0]

        el.style.display = ''
        el.scale = 1 - 1 - top / screenH

        let top = clickRect.top - ballRect.top
        let left = clickRect.left - ballRect.left
        console.log(top, left)

        el.style.transform = `translateY(${top}px)`
        inner.style.transform = `translateX(${left}px)`
        el.style.webkitTransform = `translateY(${top}px)`
        inner.style.webkitTransform = `translateX(${left}px)`
        this.usedBalls.push(ball)
        console.log(this.usedBalls)
      },
      droping (el) {
        console.log(el.offsetHeight)
        this.$nextTick(() => {
          let inner = el.children[0]
          el.style.transform = `translateyY(0)`
          inner.style.transform = `translateX(0)`
          el.style.webkitTransform = `translateY(0)`
          inner.style.webkitTransform = `translateX(0)`
        })
      },
      afterDrop (el) {
        let ball = this.usedBalls.shift()
        if (ball) {
          ball.show = false
          ball.ev = null
          el.style.display = 'none'
        }
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less">
  @r: 32.5rem;
  .balls {
    /*background-color: #999;*/
    height: 100%;
    width: 100%;
    text-align: center;
    position: relative;
    .ball {
      position: absolute;
      display: inline-block;
      vertical-align: middle;
      .inner {
        position: absolute;
        width: 10/@r;
        height: 10/@r;
        border-radius: 50%;
        background-color: #FF2B34;
      }
    }
  }

  .shake {
    animation: shake .6s;
  }

  @keyframes shake {
    20% {
      transform: scale(.8);
    }
    40% {
      transform: scale(1.5);
    }
    60% {
      transform: scale(0.8);
    }
    80% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }

  .drop-enter-active {
    transition: all .5s cubic-bezier(0.49, -0.29, 0.75, 0.41);
    .inner {
      transition: all .5s linear;
    }
  }
</style>
