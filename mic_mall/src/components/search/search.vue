<template>
  <div class="search_wrap">
    <div class="shadow" @touchstart.stop.prevent="toHide" ref="shadow">
      <i class="iconfont icon-search"></i>
      搜索
    </div>
    <div class="search" ref="search">
      <i class="iconfont icon-search"></i>
      <input type="text" class="search_inp" placeholder="搜索想要的商品">
      <button @touchstart.stop.prevent="toHide">取消</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'search',
    data () {
      return {
      }
    },
    methods: {
      toHide () {
        this.$refs.shadow.style.display = 'none'
        this.$refs.search.style.display = 'block'
        this.$refs.search.children[1].focus()
        this.$refs.search.children[1].onblur = () => {
          this.$refs.search.style.display = 'none'
          this.$refs.shadow.style.display = 'block'
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  @r: 58.6rem;
  .search_wrap{
    background-color: #f8f8f8;
    border-radius: 5/@r;
    position: relative;
    padding: 2/@r 2%;
    overflow: hidden;
    color: #5e5e5e;
    height: 30/@r;
    width: 96%;
    >div{
      line-height: 30/@r;
      position: relative;
      &.shadow{
        text-align: center;
        display: block;
      }
      &.search{
        display: none;
        i{
          position: absolute;
          left: 5/@r;
          top: 3/@r;
        }
        input{
          background-color: transparent;
          display: inline-block;
          padding: 0 0 0 25/@r;
          font-size: 12/@r;
          outline: none;
          height: 25/@r;
          width: 80%;
        }
        button{
          font-size: 14/@r;
          padding: 0 5/@r;
          background-color: transparent;
        }
      }
    }
  }
</style>
