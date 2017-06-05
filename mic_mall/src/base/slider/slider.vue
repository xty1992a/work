<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item, index) in dots"
            :class="{active: index===currentIndex}"></span>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
import {addClass} from '../../common/js/dom.js'
  export default {
    name: 'slider',
    props: {
      loop: {
        type: Boolean,
        default: true
      },
      autoplay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 3000
      }
    },
    data () {
      return {
        dots: [],
        currentIndex: 0
      }
    },
    mounted () {
      setTimeout(() => {
        this._setSliderWidth()
        this._setDots()
        this._initSlider()
        if (this.autoplay) {
          this._play()
        }
      }, 20)
      window.addEventListener('resize', () => {
        if (!this.slider) {
          return
        }
        this._setSliderWidth(true)
        this.slider.refresh()
      })
    },
    methods: {
      _setSliderWidth (isResize) {
        this.children = this.$refs.sliderGroup.children
        let width = 0
        let sliderWidth = this.$refs.slider.clientWidth
        for (var i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          addClass(child, 'slider-item')
          child.style.width = sliderWidth + 'px'
          width += sliderWidth
        }
        if (this.loop && !isResize) {
          width += 2 * sliderWidth
        }
        this.$refs.sliderGroup.style.width = width + 'px'
      },
      _initSlider () {
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: true,
          snapLoop: this.loop,
          snapThreshold: 0.3,
          snapSpeed: 400,
          click: true
        })
        this.slider.on('scrollEnd', () => {
          let pageIndex = this.slider.getCurrentPage().pageX
          if (this.loop) {
            pageIndex -= 1
          }
          this.currentIndex = pageIndex

          if (this.autoplay) {
            clearTimeout(this.timer)
            this._play()
          }
        })
      },
      _play () {
        let pageIndex = this.currentIndex + 1
        if (this.loop) {
          pageIndex += 1
        }
        this.timer = setTimeout(() => {
          this.slider.goToPage(pageIndex, 0, 400)
        }, this.interval)
      },
      _setDots () {
        this.dots = new Array(this.children.length)
      }
    },
    destroyed () {
      clearTimeout(this.timer)
    }
  }
</script>

<style rel="stylesheet/less" lang="less">
  .slider{
    min-height: 1px;
    .slider-group{
      overflow: hidden;
      position: relative;
      white-space: nowrap;
      .slider-item{
        float: left;
        overflow: hidden;
        text-align: center;
        box-sizing: border-box;
        a{
          width: 100%;
          display: block;
          overflow: hidden;
          text-decoration: none;
          img{
            width: 100%;
            display: block;
          }
        }
      }
    }
    .dots{
      position: absolute;
      text-align: center;
      bottom: 12px;
      font-size: 0;
      right: 0;
      left: 0;
      .dot{
        width: 16px;
        height: 16px;
        margin: 0 8px;
        border-radius: 50%;
        display: inline-block;
        background-color: rgba(255,255,255,.5);
        &.active{
          background-color: rgba(255,255,255,.5);
          border-radius: 10px;
          width: 40px;
        }
      }
    }
  }
</style>
