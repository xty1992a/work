<template>
  <div class="coupons">
    <div class="coupons_head">
      <span :class="{active:coupons==='djq'}" @touchstart="coupons='djq'">代金券</span>
      <span :class="{active:coupons==='zkq'}" @touchstart="coupons='zkq'">折扣券</span>
    </div>
    <div class="coupons_content">
      <p class="coupons_title">
        代金券与折扣券不能同时使用哦
      </p>
      <ul class="coupons_wrap">
        <li>
          <div class="coupons">
            <div class="coupons_left">
            0.8折
            </div>
            <div class="coupons_center">
              <p>第一次消费就送</p>
              <p>每满100元可用</p>
              <p>2017-03-18-2017-04-18</p>
            </div>
            <div class="coupons_right"></div>
          </div>
          <span class="checkbox" :class="{checked: couponsType===1}">
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'coupons',
    data () {
      return {
        couponsType: 1,
        coupons: 'zkq'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  @r: 37.5rem;
  @priceC: #FC7946;
  .coupons{
    background-color: #fff;
    .coupons_head{
      font-size: 0;
      span{
        padding: 16/@r 0;
        display: inline-block;
        width: 50%;
        height: 100%;
        font-size: 28px;
        text-align: center;
        border-bottom: 6px solid transparent;
        &.active{
          border-color: #4080e8;
          color: #4080E8;
        }
      }
    }
    .coupons_content{
      background-color: #F7F7F7;
      padding: 0 10/@r;
      .coupons_title{
        padding: 10/@r 0;
        color: #999;
        font-size: 24px;
        text-align: center;
      }
      .coupons_wrap{
        padding-bottom: 10/@r;
        li{
          display: flex;
          align-items: center;
          margin-bottom: 20/@r;
          justify-content: space-between;
          .coupons{
            flex: 1;
            height: 81/@r;
            display: flex;
            .coupons_left{
              width: 90/@r;
              font: bold 40px 'Microsoft YaHei UI';
              border-right: 6px dotted #fff;
              background-color: #508CEE;
              text-align: center;
              line-height: 90/@r;
              position: relative;
              overflow: hidden;
              color: #fff;
              &:before{
                content: '';
                height: 10/@r;
                width: 10/@r;
                background-color: #fff;
                border-radius: 50%;
                display: inline-block;
                position: absolute;
                top: 50%;
                left: 0;
                transform: translateY(-50%) translateX(-50%);
              }
            }
            .coupons_center{
              padding: 0 10/@r;
              flex: 1;
              p{
                font-size: 24px;
                line-height: 2;
                height: 33%;
                color: @priceC;
                &:first-child{
                  color: #000;
                  font-size: 28px;
                }
                &:last-child{
                  color: #999;
                }
              }
            }
            .coupons_right{
              width: 43/@r;
              border-left: 6px dotted #fff;
              background-color: #efefef;
            }
          }
        }
      }
    }
    .checkbox{
      margin-left: 10/@r;
      font-size: 0;
      border-radius: 50%;
      display: inline-block;
      height: 40px;
      width: 40px;
      border: 1px solid #999;
      &.checked{
        background-color: #00B7FF;
        border-color: #00B7FF;
        position: relative;
        text-align: center;
        &:after{
          content: '';
          width: 5/@r;
          display: block;
          transform-origin: left bottom;
          transform: translateX(80%) translateY(-10%) rotate(45deg) ;
          border: 4px solid #fff;
          border-left: none;
          border-top: none;
          height: 10/@r;
        }
      }
    }
  }
</style>
