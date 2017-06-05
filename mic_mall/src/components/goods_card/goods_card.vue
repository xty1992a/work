<template>
  <div class="goods_card">
    <router-link :to="url">
      <div class="img_wrap">
        <img :src="goods.imagePath" alt="">
      </div>
      <div class="goods_info">
        <p class="goods_title">{{goods.name}}</p>
        <p class="goods_price">
          <span class="price">
            {{goods.mallPrice}}
          </span>
            <span class="old_price">
            {{goods.groupSplicePrice}}
          </span>
          <i class="iconfont icon-shop_buy right" @touchstart.prevent="drop" @click.prevent>
            <i class="iconfont icon-tianjia-tianchong"></i>
          </i>
        </p>
      </div>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'goods_card',
    props: ['url', 'goods'],
    data () {
      return {}
    },
    methods: {
      drop (ev) {
        this.pub.$emit('drop', ev)
      },
      linkTo () {
        this.$router.push(this.url)
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @r: 50rem;
  @priceC: #ff6400;
  .goods_card{
    background-color: #fff;
    line-height: 1.4;
    font-size: 28px;
    box-sizing: border-box;
    .img_wrap{
      text-align: center;
      img{
        height: 2rem;
        vertical-align: middle;
        /*width: 100%;*/
      }
    }
    .goods_info{
      position: relative;
      padding: 0 5/@r;
      .goods_title{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        min-height: 50/@r;
      }
      .goods_price{
        width: 100%;
        background-color: #fff;
        bottom: 0;
        z-index: 999;
        padding: 10/@r 0;
        color: #999;
        >span{
          color: @priceC;
          font-weight: bold;
          font-size: 28px;
          &:before{
            font-size: 20px;
            content: '￥';
            font-weight: normal;
          }
          &:after{
            font-size: 20px;
            content: '.00';
          }
          &.old_price{
            color: #999;
            font-size: 20px;
            font-weight: normal;
            text-decoration: line-through;
          }
        }
        .icon-shop_buy{
          position: relative;
        }
        .icon-tianjia-tianchong{
          background-color: #fff;
          position: absolute;
          font-size: 20px;
          color: @priceC;
          right: -5px;
          top: -1px;
        }
      }
    }
    .right{
      float: right;
    }
  }
</style>
