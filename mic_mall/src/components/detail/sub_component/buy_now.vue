<template>
  <div class="buy_now" @touchstart.stop>
    <div class="buy_head">
      <img src="/static/2.png" alt="">
      <div class="buy_title">
        <p class="title">韩都衣舍连衣裙2017韩版大码女装春夏长袖宽松显瘦假两件中长款套装裙</p>
        <p class="price">
          <span class="">会员价:</span>
          <span class="price_count">30</span>
        </p>
      </div>
      <i class="iconfont icon-Untitled-"></i>
    </div>
    <div class="buy_content">
      <div class="sku_content">
        <p class="sku_name">
          颜色
        </p>
        <div class="sku_wrap">
          <div class="sku_item">
            红色长袖B009
          </div>
          <div class="sku_item">
            灰色长袖C009
          </div>
          <div class="sku_item">
            绿色长袖V009
          </div>
        </div>
      </div>
      <div class="sku_content">
        <p class="sku_name">
          尺码
        </p>
        <div class="sku_wrap">
          <div class="sku_item">
            X
          </div>
          <div class="sku_item">
            XL
          </div>
        </div>
      </div>
    </div>
    <div class="buy_foot">
      <div class="buy_count">
        <p class="title">购买数量</p>
        <p>(每人限兑1次)</p>
        <p>剩余：586件</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'buy-now',
    data () {
      return {}
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @r: 50rem;
  @priceC: #FF6400;
  .buy_now{
    .buy_head{
      overflow: hidden;
      border-bottom: 1px solid #f0f0f0;
      padding: 10/@r;
      img{
        float: left;
        margin-right: 10/@r;
        width: 110/@r;
      }
      .buy_title{
        width: 50%;
        float: left;
        .title{
          font-size: 30px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          line-height: 1.2;
        }
        .price{
          margin-top: 10/@r;
          .price_count{
            font-size: 42px;
          }
        }
      }
      i{
        float: right;
      }
    }
    .buy_content{
      border-bottom: 1px solid #f0f0f0;
      .sku_content{
        padding: 10/@r;
        .sku_name{

        }
        .sku_wrap{
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          .sku_item{
            margin-right: 5/@r;
            border: 1px solid #f0f0f0;
            border-radius: 3px;
            text-align: center;
            font-size: 28px;
            line-height: 2;
            min-width: 110/@r;
          }
        }
      }
    }
    .buy_foot{
      padding: 10/@r;
      .buy_count{
        p{
          font-size: 24px;
          line-height: 1.5;
          &:nth-child(2){
            color: #666;
          }
          &.title{
            font-size: 30px;
          }
        }
      }
    }
  }
</style>
