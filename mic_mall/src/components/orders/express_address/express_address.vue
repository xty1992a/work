<template>
  <div class="express_address" @touchstart.stop>
    <div class="express_address_head">
      收货地址
      <i class="iconfont icon-quxiao"></i>
    </div>
    <ul class="exp_add_list" v-show="!setAdd">
      <li>
        <span class="check_box"></span>
        <div class="add_detail">
          <p class="name">张小明</p>
          <p class="address">广东省深圳市龙华新区龙华街道三咀头3巷三栋304</p>
        </div>
        <i class="iconfont icon-icon07"></i>
      </li>
      <li>
        <span class="check_box"></span>
        <div class="add_detail">
          <p>姓名</p>
          <p>地址</p>
        </div>
        <i class="iconfont icon-icon07"></i>
      </li>
      <li class="add_address" @touchstart="setAdd=true">
        <span>
          <i class="iconfont icon-add"></i>
        </span>
        <div class="add_detail">
          <p>添加收货地址</p>
        </div>
      </li>
    </ul>
    <div class="set_add" v-show="setAdd">
      <form action="#" name="add-form">
        <ul class="exp_add_list">
          <li>
            <label for="add_item1">
              <span class="add_title">收货人</span>
              <input type="text" id="add_item1" required v-model="user.name">
            </label>
          </li>
          <li>
            <label for="add_item2">
              <span class="add_title">联系电话</span>
              <input type="tel" id="add_item2"
                     maxlength="11" v-model="user.phone" >
            </label>
            <div class="errors">
              <p>必填</p>
              <p>号码不正确</p>
            </div>
          </li>
          <li>
            <label >
              <span class="add_title">选择地区</span>
              <select name="province" @change="getCities">
                <option value="0">省</option>
                <option v-for="(pro, index) in provinces" v-if="provinces.length"
                        :key="index" :value="pro.code">{{pro.name}}</option>
              </select>
              <select name="cities" ref="city" @change="getCounties">
                <option value="0">市</option>
                <option v-for="(city, index) in cities" v-if="cities.length"
                        :key="index" :value="city.code">{{city.name}}</option>
              </select>
              <select name="counties" ref="country" v-model="user.country">
                <option value="0">区</option>
                <option v-for="(country, index) in counties" v-if="counties.length"
                        :key="index" :value="country.code">{{country.name}}</option>
              </select>
            </label>
          </li>
          <li>
            <label for="add_item4">
              <span class="add_title">详细地址</span>
              <input type="text" id="add_item4" v-model="user.address">
            </label>
          </li>
          <li>{{user}}</li>
        </ul>
      </form>
      <div class="btn_wrap">
        <button class="del" @touchstart="delAdd">删除</button>
        <button class="save">保存</button>
      </div>
    </div>

  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'express_address',
    data () {
      return {
        user: {
          country: 0
        },
        setAdd: false,
        provinces: null,
        cities: null,
        counties: null
      }
    },
    created () {
      axios.get('http://localhost:10086/china')
          .then(res => {
            console.log(res.data)
            this.provinces = res.data
          })
          .catch(err => {
            console.log(err)
          })
    },
    methods: {
      getCities (ev) {
        this.$refs.city.value = 0
        this.$refs.country.value = 0
        this.user.country = 0
        let code = ev.target.value
        if (code === 0) {return}
        axios.get('http://localhost:10086/provinces?code='+code.substr(0,2))
            .then(res => {
              console.log(res.data)
              this.cities = res.data
            })
            .catch(err => {
              console.log(err)
            })
      },
      getCounties (ev) {
        this.$refs.country.value = 0
        this.user.country = 0
        let code = ev.target.value
        if (code === 0) {return}
        axios.get('http://localhost:10086/cities?code='+code.substr(0,4))
            .then(res => {
              console.log(res.data)
              this.counties = res.data
            })
            .catch(err => {
              console.log(err)
            })
      },
      delAdd () {
        this.user = {
          country: 0
        }
        this.setAdd = false
      },
      cancel () {
        this.$emit('done', '')
      },
      done () {
        this.$emit('done')
      }
    },
    watch: {
      user: {
        handler (value, oldvalue) {
          console.log(value)
        },
        deep: true
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>
  @r: 37.5rem;
  .express_address{
    .express_address_head{
      padding: 14/@r 10/@r;
      text-align: center;
      font-size: 28px;
      .iconfont{
        float: right;
      }
      border-bottom: 1px solid #ddd;
    }
    .exp_add_list{
      li{
        height: 25/@r;
        display: flex;
        padding: 10/@r;
        position: relative;
        align-items: center;
        border-bottom: 1px solid #ddd;
        justify-content: space-between;
        span{
          font-size: 40px;
          margin-right: 10/@r;
          &.add_title{
            font-size: 28px;
            text-align-last:justify;
            text-align: justify;
            min-width: 60/@r;
            display: inline-block;
          }
        }
        label{
          select{
            max-width: 100/@r;
          }
          input{
            display: inline-block;
            width: 260/@r;
            outline: none;
            &#add_item2{
              width: 120/@r;
            }
          }
        }
        .errors{
          position: absolute;
          width: 100/@r;
          left: 180/@r;
          top: 0;
        }
        .add_detail{
          flex: 1;
          p{
            text-align: left;
            max-width: 270/@r;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            &.name{
              font-size: 28px;
            }
            &.address{
              font-size: 24px;
              color: #999;
            }
          }
        }
        &.add_address{
          line-height: 1.2;
          .iconfont{
            color: #ddd;
            font-size: 45px;
            font-weight: 100;
          }
        }
      }
    }
    .btn_wrap{
      font-size: 0;
      button{
        line-height: 50/@r;
        height: 50/@r;
        text-align: center;
        font-size: 34px;
        width: 50%;
        color: #fff;
        &.del{
          background-color: #C7C7C7;
        }
        &.save{
          background-color: #4080E8;
        }
      }
    }
    .check_box{
      display: inline-block;
      vertical-align: middle;
      height: 20/@r;
      width: 20/@r;
      border-radius: 50%;
      border: 1px solid #ddd;
    }
  }

</style>
