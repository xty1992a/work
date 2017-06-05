<template>
  <div class="detail">
    <div class="detail_head">
      <img src="/static/2.png" alt="">
    </div>
    <div class="detail_title">
      <p class="title">
        韩都衣舍连衣裙2017韩版大码女装春夏长袖宽松显瘦假两件中长款套装裙
      </p>
      <div class="goods_price">
        <span class="price">
          会员价:
          <i class="price_count">50</i>
          <i class="unit">件</i>
        </span>
        <span class="old_price">
          原价:
          <i class="price_count">60</i>
        </span>
        <span class="sell_count">
          已售
          <i>30</i>
        </span>
      </div>
    </div>
    <split></split>

    <transition name="modal">
      <modal v-show="buynow" @cancel="hideModal">
        <buy-now slot="buynow"></buy-now>
      </modal>
    </transition>
    <div class="detail_foot">
      <div class="links">
        <router-link :to="'goodslist' | bidUrl(bid)">
          <div class="link_icon">
            <i class="iconfont icon-lianxikefu"></i>
            <p>客服</p>
          </div>
        </router-link>
        <router-link to="/">
          <div class="link_icon">
            <i class="iconfont icon-index_moren"></i>
            <p>首页</p>
          </div>
        </router-link>
        <router-link to="/">
          <div class="link_icon">
            <i class="iconfont icon-shop_buy"></i>
            <p>购物车</p>
          </div>
        </router-link>
        </div>
      <div class="btn_wrap">
        <button class="add">加入购物车</button>
        <button class="buy" @touchstart="buynow=true">立即购买</button>
      </div>
    </div>
  </div>
</template>

<script>
  import split from '../split/split.vue'
  import modal from '../modal/modal.vue'
  import buyNow from './sub_component/buy_now.vue'

  export default {
    name: 'detail',
    props: {},
    data () {
      return {
        buynow: false
      }
    },
    methods: {
      hideModal () {
        this.buynow = false
      }
    },
    components: {
      split,
      modal,
      buyNow
    },
    computed: {
      bid () {
        return this.$store.state.bid
      }
    },
    // 隐藏默认脚部
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
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  @r: 50rem;
  @priceC: #ff6400;
  .detail{
    background-color: #f7f7f7;
    .detail_head{
      img{
        width: 100%;
      }
    }

    .detail_title{
      padding: 10/@r;
      .title{
        color: #333;
        font-size: 30px;
        line-height: 1.2;
        font-weight: 600;
      }
      .goods_price{
        font-size: 24px;
        padding: 15/@r 0;
        color: #999;
        span{
          margin-right: 5/@r;
          &.price{
            color: #333;
            font-size: 28px;
            i{
              &:first-child{
                font-size: 42px;
                color: @priceC;
              }
            }
          }
          &.old_price{
            i{
              text-decoration: line-through;
            }
          }
          &.sell_count{

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
    .i_price{
      &:before{

      }
      &:after{

      }
    }
    .modal-enter, .modal-leave-active {
      &.mask {
        opacity: 0;
        .bottom {
          transform: translateY(100%);
        }
      }
    }
    .bottom-enter, .bottom-leave-active {
      transform: translateY(100%);
    }
    .modal-enter-active, .modal-leave-active,
    .bottom-enter-active, .bottom-leave-active {
      transition: .5s;
      &.mask {
        .bottom {
          transition: .5s;
        }
      }
    }
    .detail_foot{
      background-color: #fff;
      position: fixed;
      bottom: 0;
      right: 0;
      left: 0;
      display: flex;
      .links{
        flex: 1;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: space-around;
        .link_icon{
          i{
            font-size: 34px;

          }
          p{
            font-size: 20px;
          }
        }
      }
      .btn_wrap{
        font-size: 0;
        button{
          line-height: 50/@r;
          height: 50/@r;
          text-align: center;
          font-size: 34px;
          width: 110/@r;
          color: #fff;
          &.add{
            background-color: @priceC;
          }
          &.buy{
            background-color: #F44;
          }
        }
      }
    }
  }
</style>
