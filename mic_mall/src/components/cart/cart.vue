<template>
  <div class="cart">
    <scroller
            :on-infinite="infinite"
            :on-refresh="refresh"
            ref="cart_scroller">
      <div class="pay_now">
        <router-link class="btn" to="/orders">结算(1)</router-link>
      </div>
      <ul>
        <li v-for="index in news">第{{index}}项</li>
      </ul>
    </scroller>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'cart',
    data () {
      return {
        count: 0,
        news: [],
        noData: false
      }
    },
    methods: {
      infinite (done) {
        this.getList()
        setTimeout(() => {
          if (this.noData) {
            console.log('no data stop', this.noData)
            this.$refs.cart_scroller.finishInfinite(true)
            setTimeout(() => {
              console.log('hide')
              document.querySelector('.loading-layer').classList.add('loading_hide')
            }, 1000)
          } else {
            console.log(this.noData, 'data infinite')
            done()
          }
        }, 1000)
      },
      refresh (done) {
        console.log('refresh')
        this.$refs.cart_scroller.finishPullToRefresh()
      },
      getList () {
        console.log(this.count)
        var url = 'http://localhost:10086/api?count=' + this.count
        axios.get(url)
            .then(res => {
              if (res.data) {
                res.data.forEach(num => {
                  this.news.push(num)
                })
                this.count++
              } else {
                this.noData = true
              }
            })
            .catch(err => {
              console.log('err', err)
              this.noData = true
            })
      }
    },
    mounted () {
      console.log('mounted')
      this.getList()
    },
    components: {
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @r: 58.6rem;
  .cart{
    .pay_now{
      a{

      }
    }
  }


  .loading_hide{
    height: 0 !important;
    overflow: hidden;
    transition: 1s;
  }
</style>
