<template>
  <div class="pic_wrap" ref="wrap"
       @touchstart.prevent="drag($event)"
       @touchend="end"
       @touchmove="move($event)">
    <ul class="pic_list" ref="list">
      <li v-for="(url, index) in urlList" :key="index">
        <img :src="url" alt="">
      </li>
    </ul>
    <div class="pic_nav">
      <span :class="{pic_active: index===1}" v-for="index in urlList"></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'roll_img',
    props: {
      urlList: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
        setTransform: window.setTransform,
        isFirst: true,
        elementX: 0,
        counter: 0,
        screenW: 0,
        startX: 0,
        startY: 0,
        timer: 0,
        isX: true
      }
    },
    methods: {
      initImgs () {
        this.screenW = document.documentElement.clientWidth
        const css = document.createElement('style')
        let list = this.$refs.list
        let lis = list.children
        list.innerHTML += list.innerHTML

        let cssStr = '.pic_list{width:' + lis.length + '00%;}\n'
        cssStr += '.pic_list li{width:' + (1 / lis.length * 100) + '%;line-height:' + lis[0].offsetHeight + 'px;}\n'
//        cssStr += '.pic_wrap{height:' + lis[0].offsetHeight + 'px;}\n'
        css.innerHTML = cssStr
        document.head.appendChild(css)
      },
      drag (ev) {
        console.log('clear')
        clearInterval(this.timer)
        let setTransform = this.setTransform
        let list = this.$refs.list
        let lis = list.children
        let touch = ev.changedTouches[0]
        console.log('counter', this.counter)
        this.startX = touch.clientX
        this.startY = touch.clientY
        list.style.transition = 'none'
        this.counter = this.counter === 0 ? lis.length / 2 : this.counter
        this.counter = this.counter === lis.length - 1 ? lis.length / 2 - 1 : this.counter
        setTransform(list, 'translateX', -this.counter * this.screenW)
        setTransform(list, 'translateZ', '.00001')
//        setTransform(list, 'translate3d', -this.counter * this.screenW+',.00001,0')
        this.elementX = setTransform(list, 'translateX')
        this.isFirst = true
        this.isX = true
      },
      move (ev) {
        if (!this.isX) {
          return
        }
        // 横划禁止下拉
        ev.stopPropagation()

        let wrap = this.$refs.wrap
        let list = this.$refs.list
        let touch = ev.changedTouches[0]
        let currentX = touch.clientX
        let currentY = touch.clientY
        let gapX = currentX - this.startX
        let gapY = currentY - this.startY

        wrap.removeEventListener('touchend', this.end)
        wrap.addEventListener('touchend', this.end)
        if (this.isFirst) {
          this.isFirst = false
          if (Math.abs(gapY) > Math.abs(gapX)) {
            this.isX = false
            return
          }
        }
        this.setTransform(list, 'translateX', gapX + this.elementX)
        setTransform(list, 'translateZ', '.0001')
      },

      end () {
        let wrap = this.$refs.wrap
        if (!wrap) {
          return
        }
        let spans = wrap.getElementsByTagName('span')
        let setTransform = this.setTransform
        let list = this.$refs.list
        let lis = list.children
        console.log('end')
        list.style.transition = '.5s'
        this.counter = Math.round(-setTransform(list, 'translateX') / this.screenW)
        this.counter = this.counter > lis.length - 1 ? lis.length - 1 : this.counter
        this.counter = this.counter < 0 ? 0 : this.counter
        setTransform(list, 'translateX', -this.counter * this.screenW)
        setTransform(list, 'translateZ', '.0001')
        for (let i = 0,len = spans.length; i < len; i++) {
          spans[i].className = ''
        }
        spans[this.counter % spans.length].className = 'pic_active'
        this.timer = this.autoPlay()
      },
      banner () {
//        document.addEventListener('touchend', this.end)
        // 自动轮播
        this.timer = this.autoPlay()
      },
      autoPlay () {
        clearInterval(this.timer)
        let setTransform = this.setTransform
        let wrap = this.$refs.wrap
        if (!wrap) {
          console.log('no wrap')
          return
        }
        let spans = wrap.getElementsByTagName('span')
        let list = document.querySelector('.pic_list')
        let lis = document.querySelectorAll('.pic_list li')
        return setInterval(() => {
          if (this.counter === lis.length - 1) {
            this.counter = lis.length / 2 - 1
            list.style.transition = 'none'
            setTransform(list, 'translateX', -this.counter * this.screenW)
            setTransform(list, 'translateZ', '.0001')
          }
          setTimeout(() => {
            this.counter++
//            let list = document.querySelector('.pic_list')
            list.style.transition = '.5s'
            setTransform(list, 'translateX', -this.counter * this.screenW)
            setTransform(list, 'translateZ', '.0001')
            for (let i = 0,len = spans.length; i < len; i++) {
              spans[i].className = ''
            }
            spans[this.counter % spans.length].className = 'pic_active'
          }, 20)
        }, 3000)
      }
    },
    created () {
      this.$nextTick(() => {
        setTimeout(() => {
          this.initImgs()
          this.banner()
        }, 0)
      })
    },
    beforeDestroy () {
      console.log('destroy')
      clearInterval(this.timer)
    }
  }
</script>

<style rel="stylesheet/less" lang="less">
  .pic_wrap {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    .pic_list {
      height: 100%;
      overflow: hidden;
      list-style: none;
      li {
        float: left;
        height: 100%;
        text-align: center;
        vertical-align: middle;
        box-sizing: border-box;
        background-color: #00B7FF;
        img{
          width: 100%;
        }
      }
    }
    .pic_nav{
      left: 0;
      width: 100%;
      bottom: 20px;
      position: absolute;
      text-align: center;
      span{
        width: 20px;
        height: 20px;
        display: inline-block;
        margin: 0 5px;
        border-radius: 50%;
        background-color: #fff;
        &.pic_active{
          background-color: orangered;
        }
      }
    }
  }
</style>
