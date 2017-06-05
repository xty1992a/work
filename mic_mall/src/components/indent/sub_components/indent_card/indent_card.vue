<template>
  <div>
    <div class="indent_card">
      <div class="title">
        <div class="numeration">订单编号: G9527952795279527</div>
        <div class="indent_status">{{indentStatus}}</div>
      </div>
      <div class="goods">
        <img src="./goods.png" alt="">
        <div class="goods_detail">
          <p>蓝牙音箱</p>
          <p>颜色: 灰色</p>
        </div>
        <div class="goods_price">
          <p><span>￥</span>1000</p>
          <p>x1</p>
        </div>
      </div>
      <div class="total_price">
        <span>共1件商品</span>
        <span :class="{'cancel': isCancel}">实付款 <i><em>￥</em>1000</i></span>
      </div>
      <div class="btn_wrap" v-if="unpaid||showExpress">
        <div v-if="unpaid">
          <button class="cancel_btn">取消订单</button>
          <button class="pay_btn">立即付款</button>
        </div>
        <div v-if="showExpress">
          <button class="cancel_btn">查看物流</button>
        </div>
      </div>
    </div>
    <split></split>
  </div>
</template>

<script>
  import split from '../../../split/split.vue'
  export default {
    name: 'indent_card',
    props: ['unpaid', 'showExpress', 'isCancel', 'indentStatus'],
    created () {
      console.log(this.indentStatus)
    },
    data () {
      return {
      }
    },
    components: {
      split
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  @r: 37.5rem;
  @colorR: #ff6400;
  .indent_card{
    font-size: 28px;
    padding-left: 10/@r;
    .title{
      border-bottom: 1px solid #f5f5f5;
      padding: 12/@r 0 11/@r;
      overflow: hidden;
      >div{
        &.numeration{
          float: left;
        }
        &.indent_status{
          padding-right: 10/@r;
          color: #4080E8;
          float: right;
        }

      }
    }
    .goods{
      border-bottom: 1px solid #f5f5f5;
      padding: 10/@r 10/@r 10/@r 0;
      overflow: hidden;
      img{
        margin-right: 12/@r;
        height: 47/@r;
        width: 75/@r;
        float: left;
      }
      .goods_detail{
        float: left;
        p{
          font-family: 'HiraginoSans';
          font-size: 28px;
          font-weight: 600;
          color: #222;
          &:last-child{
            font-weight: normal;
            margin-top: 12/@r;
            font-size: 28px;
            color: #999;
          }
        }
      }
      .goods_price{
        float: right;
        p{
          &:first-child{
            font-size: 28px;
            span{
              font-size: 9/@r;
            }
          }
          &:last-child{
            font-size: 24px;
            color: #666;
            margin-top: 16/@r;
            text-align: right;
          }
        }
      }
    }
    .total_price{
      border-bottom: 1px solid #f5f5f5;
      padding: 10/@r 10/@r 10/@r 0;
      text-align: right;
      span{
        font-size: 24px;
        &.cancel{
          i{
            color: #666 !important;
          }
        }
        &:last-child{
          margin-left: 15/@r;
          i{
            font-weight: 600;
            color: @colorR;
            em{
              font-weight: normal;
            }
          }
        }
      }
    }
    .btn_wrap{
      padding: 9/@r 10/@r 9/@r 0;
      text-align: right;
      font-size: 0;
      button{
        border: 1px solid transparent;
        display: inline-block;
        line-height: 30/@r;
        border-radius: 6px;
        padding: 0 10/@r;
        font-size: 28px;
        outline: none;
        &.cancel_btn{
          background-color: #fff;
          border-color: #999;
          color: #999;
        }
        &.pay_btn{
          background-color: @colorR;
          border-color: @colorR;
          margin-left: 11/@r;
          color: #fff
        }
      }
    }
  }
</style>
