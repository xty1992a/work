<template>
  <div class="address_selecter" @touchstart.stop>
    <div class="address_head">
      选择门店
      <i class="iconfont icon-quxiao" @click="cancel"></i>
    </div>
    <div class="address_search">
      <input type="text" placeholder="搜索门店">
    </div>
    <ul class="address_list">
      <li class="address_item" v-for="index in 5" @click="done(seller)">
        <p class="address_name">
          <span>{{seller}}:</span>
          <span>0755-82024922</span>
          <span>13.89km</span>
        </p>
        <p>
          <i class="iconfont icon-weizhi"></i>
          {{addressList}}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'address_selecter',
    data () {
      return {
        addressList: '广东省深圳市龙华新区龙华街道富联新村',
        seller: '华强旗舰店'
      }
    },
    methods: {
      cancel () {
        this.$emit('done', '')
      },
      done (seller) {
        this.$emit('done', seller)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  @r: 37.5rem;
  .address_selecter{
    background-color: #fff;
    .address_head{
      text-align: center;
      overflow: hidden;
      line-height: 2;
      i{
        float: right;
        padding: 0 10/@r;
      }
    }
    .address_search{
      background-color: #e5e5e5;
      padding: 5/@r;
      input{
        outline: none;
        display: block;
        width: 100%;
        padding-left: 10/@r;
        font-size: 28px;
        border-radius: 6px;
        line-height: 2;
      }
    }
    .address_list{
      .address_item{
        border-bottom: 1px solid #e5e5e5;
        padding: 10/@r;
        >p{
          line-height: 1.8;
          color: #999;
          font-size: 28px;
          span{
            &:first-child{
              color: #000;
              font-size: 32px;
            }
          }
          &.address_name{
            overflow: hidden;
            span{
              &:first-child{
                margin-right: 5/@r;
              }
              &:last-child{
                float: right;
              }
            }
          }
        }
      }
    }
  }
</style>
