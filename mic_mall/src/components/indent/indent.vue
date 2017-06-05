<template>
  <div class="indent">
    <div class="nav_tab">
      <ul>
        <router-link to="unpaid" tag="li">待付款</router-link>
        <router-link to="paid" tag="li">已付款</router-link>
        <router-link to="finished" tag="li">已完成</router-link>
        <router-link to="cancel" tag="li">已取消</router-link>
      </ul>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  export default {
    name: 'indent',
    data () {
      return {
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  @r: 37.5rem;
  .indent{
    overflow: auto;
    height: calc(667/@r - 50/@r);
    >div{
      &.nav_tab{
        position: fixed;
        top: 0;
        left: 0;
        background-color: #fff;
        width: 100%;
        ul{
          overflow: hidden;
          height: 41/@r;
          border: 1px solid #eee;
          li{
            float: left;
            width: 25%;
            text-align: center;
            height: 100%;
            line-height: 41/@r;
            font-size: 28px;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            border-bottom: 6px solid transparent;
            &.active{
              border-bottom-color: #4080E8;
            }
          }
        }
      }
      &:last-child{
        margin-top: 41/@r;
      }
    }

  }
</style>
