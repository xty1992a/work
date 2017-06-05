<template>
  <div class="pic_wrap" ref="wrap">
    <ul class="pic_list" ref="list">
      <li v-for="(url, index) in urlList" :key="index">
        <img :src="url" alt="">
      </li>
    </ul>
    <div class="pic_nav">
      <span class="pic_active" v-for="index in 3"></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    props: {
      urlList: {
        type: Array,
        required: true
      }
    },
    data () {
      return {}
    },
    methods: {
      banner () {
        const screenW = document.documentElement.clientWidth
        const setTransform = window.setTransform
        const wrap = this.$refs.wrap
        const spans = wrap.getElementsByTagName('span')
        let list = this.$refs.list
        const lis = list.children
        let isFirst = true
        let elementX = 0
        let counter = 0
        let startX = 0
        let startY = 0
        let isX = true
        let timer = 0
        list.innerHTML += list.innerHTML
        // 根据图片数量动态设置ul宽度.
        const css = document.createElement('style')
        let cssStr = '.pic_list{width:' + lis.length + '00%;}\n'
        cssStr += '.pic_list li{width:' + (1 / lis.length * 100) + '%;line-height:' + lis[0].offsetHeight + 'px;}\n'
//        cssStr += '.pic_wrap{height:' + lis[0].offsetHeight + 'px;}\n'
        css.innerHTML = cssStr
        document.head.appendChild(css)
        // 获取元素初始位置信息.
        wrap.addEventListener('touchstart', function (ev) {
          clearInterval(timer)
          let touch = ev.changedTouches[0]
          startX = touch.clientX
          startY = touch.clientY
          list.style.transition = 'none'
          counter = counter===0?spans.length:counter
          counter = counter===lis.length-1?spans.length-1:counter
//          counter = counter === 0 ? lis.length / 2 : counter
//          counter = counter === lis.length - 1 ? lis.length / 2 - 1 : counter
          setTransform(list, 'translateX', -counter * screenW)
          setTransform(list, 'translateZ', '.00001')
          elementX = setTransform(list, 'translateX')
          isFirst = true
          isX = true
        })
        // 设置元素拖拽行为.
        wrap.addEventListener('touchmove', function (ev) {
          if (!isX) {
            return
          }
          let touch = ev.changedTouches[0]
          let currentX = touch.clientX
          let currentY = touch.clientY
          let gapX = currentX - startX
          let gapY = currentY - startY
          if (isFirst) {
            isFirst = false
            if (Math.abs(gapY) > Math.abs(gapX)) {
              isX = false
              return
            }
          }
          setTransform(list, 'translateX', gapX + elementX)
        })
        // 根据图片容器的偏移量,获知当前图片下标,根据下标重新设置图片偏移量(取整,完整显示图片)
        document.addEventListener('touchend', function () {
          list.style.transition = '.5s'
          counter = Math.round(-setTransform(list, 'translateX') / screenW)
          counter = counter > lis.length - 1 ? lis.length - 1 : counter
          counter = counter < 0 ? 0 : counter
          setTransform(list, 'translateX', -counter * screenW)
          setTransform(list, 'translateZ', '.0001')
          for (let i = 0,len=spans.length; i < len; i++) {
            spans[i].className = ''
          }
          spans[counter % spans.length].className = 'pic_active'
          autoPlay();

          autoPlay()
        })
        // 自动轮播
        autoPlay()
        function autoPlay () {
          clearInterval(timer)
          timer = setInterval(function () {
//            console.log(counter)
            if (counter === lis.length - 1) {
              counter = lis.length / 2 - 1
              list.style.transition = 'none'
              setTransform(list, 'translateX', -counter * screenW)
              setTransform(list, 'translateZ', '.0001')
            }
            setTimeout(function () {
              counter++
              list.style.transition = '.5s'
              setTransform(list, 'translateX', -counter * screenW)
              setTransform(list, 'translateZ', '.0001')
              for (let i = 0,len=spans.length; i < len; i++) {
                spans[i].className = ''
              }
              spans[counter % spans.length].className = 'pic_active'
            }, 20)
          }, 2000)
        }
      }
    },
    created () {
      this.$nextTick(() => {
        setTimeout(() => {
          this.banner()
        }, 0)
      })
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
        background-color: antiquewhite;
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
