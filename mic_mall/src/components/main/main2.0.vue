<template>
  <div class="container" @touchmove="move">
    <div class="main_head" ref="main_head">
      <search></search>
    </div>
    <div class="main">
      <!--<drag-load :on-refresh="onRefresh" :on-infinite="onInfinite" :scrollTop="scrollTop"></drag-load>-->
      <scroller :on-refresh="refresh" :on-infinite="infinite" ref="main_scroller">
        <div class="banner_img_wrap">
          <!--<img-viewer :url-list="urlList"></img-viewer>-->
        </div>
        <router-link :to="headData.notice.url" v-if="headData">
          <div class="bulletin">
            <div class="icon">
              <i class="iconfont icon-tongzhi"></i>
            </div>
            <div class="title">
              {{headData.notice.title}}
            </div>
            <div class="text" ref="rollText">
              <p>{{headData.notice.content}}</p>
            </div>
          </div>
        </router-link>

        <div class="hot_group" v-if="headData">
          <div class="hot_item" v-for="(tag,index) in headData.tags">
            <img :src="tag.imagePath?tag.imagePath:'/static/'+(index+1)+'.png'" alt="">
            <p class="name">{{tag.title}}</p>
          </div>
        </div>

        <ul class="goods_wrap" v-if="listdata || downdata">
          <li v-for="(item,index) in listdata">
            <div class="category_title">
              <p class="category_name">
                {{item.name}}
              </p>
              <span class="more" v-if="item.isMore">
                更多>
              </span>
            </div>
            <div class="goods_item" v-for="(goods, index) in item.goodsItem" :key="index">
              <goods-card  :url="'goodsdetail' | goodsUrl(bid, goods.guid)"
                           :goods="goods"></goods-card>
            </div>
          </li>

          <li v-for="(item,index) in downdata">
            <div class="category_title">
              <p class="category_name">
                {{item.Name}}
              </p>
              <span class="more" v-if="item.isMore">
                更多>
              </span>
            </div>
            <div class="goods_item" v-for="(goods, index) in item.goodsItem" :key="index">
              <goods-card :url="'goodsdetail' | goodsUrl(bid, goods.guid)"
                          :goods="goods"></goods-card>
            </div>
          </li>
        </ul>
      </scroller>

      <div class="top" @click="backTop">

      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import datepicker from 'vue-date'
  import search from '../search/search.vue'
  import dragLoad from '../drag_load/drag_loading.vue'
  import goodsCard from '../goods_card/goods_card.vue'
  import imgViewer from '../img_viewer/img_viewer2.0.vue'

  export default {
    name: 'main',
    data () {
      return {
        scrollTop: 0,
        counter: 1, // 默认已经显示出15条数据 count等于一是让从16条开始加载
        num: 15,  // 一次显示多少条
        pageStart: 0, // 开始页数
        pageEnd: 0, // 结束页数
        listdata: [], // 下拉更新数据存放数组
        downdata: [],  // 上拉更多的数据存放数组
        date: '2017-05-22',
        rollTimer: 0,
        headData: '',
        url: '/detail',
        baseUrl: 'http://cwapi.yfsb.wankade.com/',
        headUrl: 'webapi/Shop/GetIndexAdvResponse',
        dataUrl: 'webapi/Shop/GetCategoryAndGoodsItem',
        isRedirect: false,
        code: '',
        token: '',
        isDone: false
      }
    },
    created () {
      console.log('created', this.bid)
      console.log(window.localStorage['token' + this.bid])
      if (window.localStorage.token === 'undefined') {
        console.log('token 无效')
        window.localStorage.removeItem('token' + this.bid)
      } else {
        this.token = window.localStorage['token' + this.bid]
      }
      console.log(this.token, 'token in created')
      console.log(window.localStorage)
      this.gethead()
      this.getList()
//      this.getData(this.headUrl, this.headData)
//      this.getData(this.dataUrl, this.listdata)
    },
    methods: {
      gethead () {
        console.log('get head', this.$route.query.code, this.bid)
        axios({
          method: 'POST',
          url: this.headUrl,
          baseURL: this.baseUrl,
          headers: {
            Accept: 'application/json',
            bid: this.bid,
            code: this.$route.query.code ? this.$route.query.code : '',
            token: this.token ? this.token : ''
          }
        })
            .then(res => {
              this.code = this.$route.query.code
              if (res.headers.token) {
                console.log('token update')
                window.localStorage['token' + this.bid] = res.headers.token
                this.token = res.headers.token
              }
              switch (res.data.resultCode) {
                case 200:
                  this.headData = res.data.data
                  // 依赖返回数据的dom操作
                  this.$nextTick(() => {
                    this.roll()
                  })
                  break
                case 302:
                  let url = res.data.url
                  if (!this.isRedirect) {
                    console.log('302 redirect')
                    this.isRedirect = true
                    window.location.href = url
                  }
                  break
              }
            })
            .catch(err => {
              console.log('err')
            })
      },
      getList () {
        axios({
          method: 'POST',
          url: this.dataUrl,
          baseURL: this.baseUrl,
          headers: {
            Accept: 'application/json',
            bid: this.bid,
            code: this.$route.query.code ? this.$route.query.code : '',
            token: this.token ? this.token : ''
          }
        })
            .then((res) => {
              if (res.headers.token) {
                console.log('token update')
                window.localStorage.token = res.headers.token
                this.token = res.headers.token
              }
              switch (res.data.resultCode) {
                case 200:
                  this.listdata = res.data.data
                  break
                case 302:
                  let url = res.data.url
                  if (!this.isRedirect) {
                    this.isRedirect = true
                    console.log('302 redirect')
                    window.location.href = url
                  }
                  break
              }
            })
            .catch((err) => {
              console.log('error', err)
            })
      },
      getData (url, target) {
        axios({
          method: 'POST',
          url: url,
          baseURL: this.baseUrl,
          headers: {
            Accept: 'application/json',
            bid: this.bid,
            code: this.$route.query.code ? this.$route.query.code : '',
            token: this.token ? this.token : ''
          }
        })
            .then((res) => {
              if (res.headers.token) {
                console.log('token update')
                window.localStorage['token' + this.bid] = res.headers.token
                this.token = res.headers.token
              }
              switch (res.data.resultCode) {
                case 200:
                  target = res.data.data
                  break
                case 302:
                  let url = res.data.url
                  if (!this.isRedirect) {
                    this.isRedirect = true
                    console.log('302 redirect')
                    window.location.href = url
                  }
                  break
              }
            })
            .catch((err) => {
              console.log('get ' + url +' error', err)
            })
      },
      refresh (done) {
//        this.getList()
        done() // call done
      },
      infinite (done) {
        console.log('infinite')
        if (this.isDone) {
          this.$refs.main_scroller.finishInfinite(true)
          return
        }
        axios({
          method: 'POST',
          url: this.dataUrl + '?pageIndex=' + this.counter,
          baseURL: this.baseUrl,
          headers: {
            Accept: 'application/json',
            bid: this.bid,
            code: this.$route.query.code ? this.$route.query.code : '',
            token: this.token ? this.token : ''
          }
        })
            .then((res) => {
              this.counter++
              this.pageEnd = this.num * this.counter
              this.pageStart = this.pageEnd - this.num
              console.log('axios resolve', res.data.data.length)

              if (res.data.data.length) {
                console.log('空')
                this.isDone = true
                this.$refs.main_scroller.finishInfinite(true)
              } else {
                res.data.data.forEach(obj => {
                  this.downdata.push(obj)
                })
  //              let arr = res.data.Data
                /*let i = this.pageStart
                let end = this.pageEnd
                for (; i < end; i++) {
                  let obj = {}
                  obj['name'] = arr[i].name
                  this.downdata.push(obj)
                  if ((i + 1) >= res.data.length) {
                    this.$el.querySelector('.load-more').style.display = 'none'
                    return
                  }
                }*/
                done() // call done
              }
            })
            .catch((err) => {
              this.$refs.main_scroller.finishInfinite(true)
              /*setTimeout(() => {
                document.querySelector('.loading-layer').classList.add('loading_hide')
                document.querySelector('.loading-layer').addEventListener('transitionend', () => {
//                  document.querySelector('.loading-layer').classList.remove('loading_hide')
                })
              }, 1000)*/
              console.log('error')
            })
      },
      roll () {
        let rollText = this.$refs.rollText
        let text = rollText.children[0]
        text.innerHTML += text.innerHTML
        let _width = text.clientWidth
        let num = 0
        this.rollTimer = setInterval(() => {
          num += 1
          if (num >= _width / 2) {
            num = 0
          }
          move(num)
        }, 10)

        function move(x) {
          text.style.transform = 'translate3d(' + -x + 'px,0,0) rotateZ(0.001deg)'
        }
      },
      move () {
        let scroller = this.$refs.main_scroller
        let main_head = this.$refs.main_head
        let input = main_head.getElementsByClassName('search_inp')[0]
        let top = scroller.getPosition().top
        if (top > 450) {
          main_head.style.background = '#f0f0f0'
          input.style.background = ''
        } else {
          main_head.style.background = ''
        }
      },
      backTop () {
        console.log('top', this.$refs.main_scroller.getPosition())
        this.$nextTick(() => {
          setTimeout(() => {
            this.$refs.main_scroller.scrollTo(0, 0, true)
          }, 0)
        })
      }
    },
    computed: {
      urlList () {
        if (this.headData) {
          let list = []
          for (var i = 0; i < this.headData.advertises.length; i++) {
            let imgUrl = this.headData.advertises[i].imagePath
            console.log(imgUrl)
            list.push(imgUrl)
          }
          return list
        } else {
          return ['/static/1.png', '/static/1.png', '/static/1.png']
        }
      },
      bid () {
        return this.$store.state.bid
      }
    },
    beforeDestroy () {
      clearInterval(this.rollTimer)
    },
    components: {
      search,
      dragLoad,
      goodsCard,
      datepicker,
      imgViewer,
      Swiper
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  @r: 58.6rem;
  @priceC: #ff6400;
  body {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    height: 100%;
    .container {
      height: 100%;
      padding-bottom: 50/@r;
      box-sizing: border-box;
      .main_head {
        padding: 10px 10/@r;
        position: fixed;
        z-index: 10;
        right: 0;
        left: 0;
        top: 0;
      }
      .main {
        position: relative;
        height: 100%;
        overflow: auto;
        .banner_img_wrap {
          height: 250/@r;
        }
        .bulletin {
          color: #999;
          display: flex;
          background-color: #fff;
          padding: 10px 30px 10px 10px;
          line-height: 40px;
          overflow: hidden;
          .icon {
            color: @priceC;
            vertical-align: middle;
            padding: 0 15/@r;
            font-size: 30px;
            border-right: 1px solid #999;
          }
          .title {
            color: @priceC;
            font-weight: bold;
            padding: 0 15/@r 0 10/@r;
            font-size: 30px;
          }
          .text {
            flex: 1;
            width: 60%;
            font-size: 0;
            font-size: 28px;
            overflow: hidden;
            line-height: 45px;
            margin-bottom: -5px;
            white-space: nowrap;
            p {
              display: inline-block;
              white-space: nowrap;
              font-size: 28px;
            }
          }
        }
        .hot_group {
          display: flex;
          background-color: #fff;
          padding: 10/@r;
          justify-content: space-between;
          .hot_item {
            flex-basis: 220px;
            font-size: 0;
            img {
              width: 100%;
            }
            p {
              text-align: center;
              line-height: 2;
              font-size: 28px;
            }
          }
        }
        .goods_wrap {
          overflow: hidden;
          background-color: #f7f7f7;
          li {
            overflow: hidden;
            padding: 0 3/@r;
            .category_title {
              width: 100%;
              position: relative;
              .category_name {
                font-weight: 600;
                line-height: 2;
                font-size: 28px;
                padding: 10/@r 0;
                text-align: center;
                &:before, &:after {
                  content: '';
                  margin: 0 10/@r;
                  display: inline-block;
                  width: 100/@r;
                  position: relative;
                  top: -6/@r;
                  border-bottom: 1px solid #dadada;
                }
              }
              span {
                position: absolute;
                font-size: 24px;
                right: 10/@r;
                color: #999;
                top: 18/@r;
              }
            }
            .goods_item {
              width: 50%;
              float: left;
              padding: 3/@r;
              box-sizing: border-box;
            }
          }
        }
        .top {
          position: fixed;
          height: 50px;
          width: 50px;
          background-color: orangered;
          bottom: 100px;
          right: 50px;
        }
      }
    }
    .loading_hide {
      overflow: hidden;
      height: 0 !important;
      transition: 1s;
    }
  }
</style>
