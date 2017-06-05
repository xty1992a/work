<template>
  <div id="app">
    <!--<keep-alive>-->
    <!--</keep-alive>-->
    <keep-alive>
      <router-view @hideFooter="hide"></router-view>
    </keep-alive>
    <m-footer v-if="footerShow" :data="data"></m-footer>
  </div>
</template>
<script>
  import mFooter from './components/footer/footer.vue'

  export default {
    name: 'app',
    created () {
      let obj = {}
      let query = window.location.href.split('?')[1]
      let queryArr = query ? query.split('&') : []
      queryArr.forEach(query => {
        let arr = query.split('=')
        obj[arr[0]] = arr[1]
      })
      console.log(obj)
      this.$store.commit('setBid', obj.bid)
    },
    data () {
      return {
        footerShow: true,
        data: {url: '/xxx'}
      }
    },
    components: {
      mFooter
    },
    methods: {
      hide (isShow) {
        this.footerShow = isShow
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @r: 58.6rem;
  html{
    height: 100%;
  }
  body{
    font-family: "Microsoft YaHei",Arial,Helvetica,sans-serif !important;
    font-family: -apple-system-font, "Helvetica Neue", sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    -khtml-webkit-touch-callout: none;
    -moz-webkit-touch-callout: none;
    -ms-webkit-touch-callout: none;
    -o-webkit-touch-callout: none;
    -webkit-touch-callout: none;
    webkit-touch-callout: none;
    font-weight: normal !important;
    font-size: 32px !important;
    overflow: hidden;
    height: 100%;
    color: #333;
    #app{
      background-color: #f7f7f7;
      overflow: auto;
      position: absolute;
      bottom: 0;
      right: 0;
      left: 0;
      top: 0;
    }
    a{
      color: #333;
    }
  }
</style>
