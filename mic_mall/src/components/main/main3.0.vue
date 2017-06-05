<template>
  <div class="main_3" @click="test">
    <div class="main_head" v-if="seller">
      <div class="content_wrap">
        <div class="img_logo">
          <img :src="seller.avatar" alt="">
        </div>
        <div class="seller_title">
          <p class="name">深圳集食号(清湖店)</p>
          <div class="bulletin">
            <div class="icon">
              <i class="iconfont icon-tongzhi"></i>
            </div>
            <div class="title">
              公告
            </div>
            <div class="text" ref="rollText">
              <p>集食号，为您集结天下美食特色集食号，为您集结天下美食特色</p>
            </div>
          </div>
        </div>
      </div>
      <div class="background">
        <img :src="seller.avatar" alt="">
      </div>
    </div>
    <!-- @touchmove="scroll"-->
    <div class="conten_wrap" ref="wrap" @touchsmove="scroll"></div>
    <div class="main_content" ref="content" v-if="goods">
      <scroll class="content_left" ref="left">
        <div class="menu_list">
          <ul>
            <li class="menu" :class="{current:index===currentIndex}"
                @touchstart="checkMenu(index, $event)"
                v-for="(item, index) in goods" :key="index">{{item.name}}</li>
          </ul>

        </div>
      </scroll>
      <scroll class="content_right" ref="right" :probeType="3">
        <ul ref="goods_wrap">
          <li class="li_hook" v-for="(item, index) in goods" :key="index">
            <p class="item_title">{{item.name}}</p>
            <ul class="food_list">
              <li class="food clearfix" v-for="food in item.foods">
                <div class="img_wrap">
                  <img v-lazy="food.icon" alt="">
                </div>
                <div class="food_detail">
                  <p class="name">{{food.name}}</p>
                  <p class="count">已售{{food.sellCount}}</p>
                  <p class="price price_count">{{food.price}}</p>
                </div>
                <div class="cart_add">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </scroll>
    </div>
    <div class="main_foot" v-if="goods">
      <div class="foot_left">
        <span class="cart_wrap">
          <i class="iconfont icon-shop_selected"></i>
          <i class="cart_count radius" v-show="totalCount">
            {{totalCount}}
          </i>
        </span>
        <span class="total_price">
          {{totalPrice | currency}}
        </span>
      </div>
      <div class="foot_right">
        <button>结账</button>
      </div>
      <div class="ball_wrap">
        <ball ref="ball"></ball>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import axios from 'axios'
  import cartcontrol from '../cartcontrol/cartcontrol.vue'
  import ball from '../ball/ball.vue'
  import Scroll from '../../base/scroll/scroll.vue'
  export default {
    name: 'main',
    data () {
      return {
        goods: null,
        seller: null,
        menuList: ['集米饭','集美食','集水果','集饮料','集小食'],
        screenH: 0,
        tops: [],
        scrollY: 0
      }
    },
    created () {
      this._getData()
      this.$nextTick(() => {
//        this._initScroll()
        this.screenH = document.documentElement.clientHeight
      })
    },

    methods: {
      test () {
        console.log(this.$refs.right, 'right')
      },
      _initScroll () {
        if (!this.wrapScroll) {
          console.log(this.$refs.wrap)
          this.wrapScroll = new BScroll(this.$refs.wrap, {
            click: true,
            probeType: 3,
            bounce: false,
            scrollY: true
          })
        } else {
          this.wrapScroll.refresh()
        }
      },
      _initRightScroll () {
        console.log('init')
        if (!this.rightScroll) {
          this.rightScroll = new BScroll(this.$refs.right, {
            click: true,
            probeType: 3,
            bounce: false,
            scrollY: true
          })
        } else {
          this.rightScroll.refresh()
        }
      },
      _listenScroll () {
        if (!this.$refs.right) {
          return
        }
        setTimeout(() => {
          this.$refs.right.scroll.on('scroll', pos => {
            this.scrollY = Math.abs(pos.y)
          })
        }, 20)
      },
      _initTops () {
        let lis = this.$refs.goods_wrap.querySelectorAll('.li_hook')
        let top = 0
        this.tops.push(top)
        for (var i = 0, len = lis.length; i < len; i++) {
          top += lis[i].clientHeight
          this.tops.push(top)
        }
        console.log(this.tops)
      },
      _getData () {
        //      axios.get('http://tingzhiserver.ngrok.cc/foods')
        axios.get('http://192.168.1.101:10086/foods')
            .then(res => {
              this.goods = res.data.goods
              this.seller = res.data.seller
              this.$nextTick(() => {
//                this._initRightScroll()
                this._listenScroll()
                this._initTops()
              })
            })
            .catch(err => {
              console.log(err)
//            return axios.get('http://localhost:10086/foods')
              return axios.get('http://tingzhiserver.ngrok.cc/foods')
            })
            .then(res => {
              this.goods = res.data.goods
              this.$nextTick(() => {
//                this._initRightScroll()
//              this._initTops()
              })
            })
            .catch(err => {
              console.log(err)
            })
      },
      checkMenu (index, ev) {
        // 取消系统click事件,两端都使用better-scroll的click事件
        let lis = this.$refs.goods_wrap.querySelectorAll('.li_hook')
        this.$refs.right.scroll.scrollToElement(lis[index], 1)
      },
      scroll (ev) {
        if (ev._constructed) {
          return
        }
        let screenH = this.screenH
        let contentRect = this.$refs.content.getBoundingClientRect()
        if (contentRect.bottom > screenH) {
          this.$refs.right.disable()
        } else {
          this.$refs.right.enable()
        }
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
    components: {
      cartcontrol,
      ball,
      Scroll
    },
    computed: {
      currentIndex () {
        return this.tops.findIndex((top, index) => {
          return this.tops[index + 1] > this.scrollY
        })
      },
      totalCount () { //计算有缓存, 反复读取只执行一次
        return this.foods.reduce((preVal, food) => {
          return preVal + food.count
        }, 0)
      },
      foods () {
        const foods = []
        this.goods.forEach(good => {
          good.foods.forEach(food => {
            if(food.count) {
              foods.push(food)
            }
          })
        })
        return foods
      },
      totalPrice () { //计算有缓存, 反复读取只执行一次
        return this.foods.reduce((preVal, food) => {
          return preVal + food.price * food.count
        }, 0)
      },
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @r: 37.5rem;
  @priceC: #FF6400;
  .main_3{
    height: 100%;
    width: 100%;
    overflow: hidden;
    background-color: #fff;
    position: relative;
    .main_head{
      color: #fff;
      height: 80/@r;
      position: relative;
      background-color: rgba(7,17,27,0.5);
      .content_wrap{
        padding: 8/@r 0;
        position: absolute;
        z-index: 1;
        overflow: hidden;
        .img_logo{
          height: 65/@r;
          width: 65/@r;
          float: left;
          position: relative;
          /*background-color: #661323;*/
          margin: 0 17/@r 0 10/@r;
          img{
            width: 100%;
          }
        }
        .seller_title{
          float: left;
          height: 100%;
          max-width: 70%;
          font-size: 28px;
          position: relative;
          p{
            &.name{
              padding-top: 3/@r;
            }
          }
        }
      }
      .background{
        position: absolute;
        filter: blur(10px);
        z-index: 0;
        bottom: 0;
        right: 0;
        left: 0;
        top:0;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
    /*.conten_wrap{*/
      /*position: absolute;*/
      /*top: 0;*/
      /*left: 0;*/
      /*right: 0;*/
      /*//bottom: 50/@r;*/
      /*overflow: hidden;*/
    /*}*/
    .main_content{
      /*height: 88%;*/
      display: flex;
      color: #3a3a3a;
      font-size: 28px;
      overflow: hidden;
      //padding-bottom: 50/@r;
      /*box-sizing: border-box;*/

      position: absolute;
      bottom: 50/@r;
      top: 80/@r;
      right: 0;
      left: 0;
      .content_left{
        flex: 0 0 95/@r;
        background-color: #F3F3F3;
        .menu_list{
          max-width: 95/@r;
          ul{
            .menu{
              line-height: 50/@r;
              text-align: center;
              font-size: 28px;
              width: 100%;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              border-left: 6px solid transparent;
              border-bottom: 1px solid #e5e5e5;
              &.current{
                border-left-color: #4080E8;
                border-bottom-color: transparent;
                background-color: #fff;
              }
            }
          }
        }
      }
      .content_right{
        background-color: #fff;
        position: relative;
        overflow: hidden;
        height: 100%;
        flex: 1;
        ul{
          padding-bottom: 10/@r;
          position: static;
          li{
            .item_title{
              top: 0;
              left: 0;
              right: 0;
              height: 30/@r;
              text-indent: 28px;
              line-height: 30/@r;
              /*position: absolute;*/
              background-color: #f7f7f7;
            }
            .food_list{
              padding: 0 10/@r;
              .food{
                padding: 10/@r 0;
                position: relative;
                border-bottom: 1px solid #f0f0f0;
                &:last-child{
                  border-color: transparent;
                }
                .img_wrap{
                  height: 63/@r;
                  width: 63/@r;
                  margin-right: 12/@r;
                  float: left;
                  img{
                    width: 100%;
                  }
                }
                .food_detail{
                  float: left;
                  p{
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    max-width: 150/@r;
                    overflow: hidden;
                    &.name{
                      font-weight: 600;
                    }
                    &.count{
                      font-size: 24px;
                      margin: 9/@r 0;
                      color: #999;
                    }
                    &.price{
                      font-size: 36px;
                    }
                  }
                }
                .cart_add{
                  position: absolute;
                  right: 0;
                  bottom: 10/@r;
                }
              }
            }
          }
        }
      }
    }
    .price_count{
      color: @priceC;
      &:before{
        font-size: 26px;
        content: '￥';
      }
      &:after{
        font-size: 24px;
        content: '.00';
      }
    }
    .main_foot{
      background-color: #4A4A4A;
      position: absolute;
      height: 50/@r;
      font-size: 0;
      z-index: 2;
      bottom: 0;
      right: 0;
      left: 0;
      >div{
        display: inline-block;
        &.foot_left{
          line-height: 50/@r;
          height: 50/@r;
          max-width: 67%;
          .cart_wrap{
            position: relative;
            margin: 0 10/@r;
            line-height: 40/@r;
            text-align: center;
            width: 40/@r;
            height: 40/@r;
            display: inline-block;
            border: 1px solid #e5e5e5;
            border-radius: 50%;
            .iconfont{
              font-size: 50px;
              color: #fff;
              position: relative;
              top: 4/@r;
            }
            .cart_count{
              position: absolute;
              right: 0;
              top: 3/@r;
              width: 16/@r;
              line-height: 12/@r;
              font-size: 16px;
              color: #fff;
              text-align: center;
              background-color: #FF2B34;
              border: 1px solid #e5e5e5;
            }
          }
          .total_price{
            font-size: 42px;
            font-weight: bold;
            color: #fff;
            &:before{
              font-size: 30px;
              font-weight: normal;
              margin-right: -8/@r;
              content: '￥';
            }
          }
        }
        &.foot_right{
          width: 120/@r;
          float: right;
          button{
            font-size: 34px;
            display: block;
            height: 100%;
            width: 100%;
            text-align: center;
            line-height: 50/@r;
            background-color: @priceC;
            color: #fff;
          }
        }
        &.ball_wrap{
          position: absolute;
          height: 10/@r;
          width: 10/@r;
          left: 28/@r;
          top: 18/@r;
        }
      }
    }
    .bulletin {
      color: #fff;
      display: flex;
      padding: 20/@r 30px 10px 0px;
      line-height: 40px;
      overflow: hidden;
      font-size: 24px;
      .icon {
        vertical-align: middle;
        font-size: 30px;
      }
      .title {
        padding: 0 10/@r 0 10/@r;
      }
      .text {
        width: 70%;
        font-size: 0;
        overflow: hidden;
        margin-bottom: -5px;
        white-space: nowrap;
        p {
          display: inline-block;
          white-space: nowrap;
          font-size: 24px;
          animation: roll 5s infinite linear;
        }
      }
    }
    @keyframes roll {
      to{
        transform: translate3d(-50%, 0, 0);
      }
    }
  }
</style>
