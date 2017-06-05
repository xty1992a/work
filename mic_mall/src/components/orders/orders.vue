<template>
  <div class="orders">
    <div class="order_container">
      <div class="orders_head">
        <ul>
          <li :class="{active: !pickup}" @click.stop="pickup=false">快递配送</li>
          <li :class="{active: pickup}" @click.stop="pickup=true">到店自提</li>
        </ul>
      </div>
      <div class="express" v-show="!pickup" @touchstart="expressAdd=true">
        <div class="address_wrap">
          <p>
            <i class="iconfont icon-weizhi"></i>
            <span>张小明</span>
            <span>1345678901</span>
          </p>
          <p class="adress">广东省深圳市龙华新区嘉熙业商业广场1155室</p>
        </div>
        <i class="iconfont icon-youjiantou"></i>
      </div>
      <div class="pickupSelf" v-show="pickup">
        <split></split>
        <ul class="pickup_wrap">
          <li @click="selectAddress">
            <div>提货门店</div>
            <div class="pickup_cell arrow-right">
              <span>{{address}}</span>
            </div>
          </li>
          <li @click="selectDate">
            <div>提货时间</div>
            <div class="pickup_cell arrow-right">
              <span>{{date}}</span>
            </div>
          </li>
          <li>
            <div>提货时段</div>
            <div class="pickup_cell arrow-right">
              <select>
                <option value="05:30-06:00">05:30-06:00</option>
                <option value="06:00-06:30">06:00-06:30</option>
                <option value="06:30-07:00">06:30-07:00</option>
                <option value="07:00-07:30">07:00-07:30</option>
                <option value="07:30-08:00">07:30-08:00</option>
                <option value="08:00-08:30">08:00-08:30</option>
                <option value="08:30-09:00">08:30-09:00</option>
                <option value="09:00-09:30">09:00-09:30</option>
                <option value="09:30-10:00">09:30-10:00</option>
                <option value="10:00-10:30">10:00-10:30</option>
                <option value="10:30-11:00">10:30-11:00</option>
                <option value="11:00-11:30">11:00-11:30</option>
                <option value="11:30-12:00">11:30-12:00</option>
                <option value="12:00-12:30">12:00-12:30</option>
                <option value="12:30-13:00">12:30-13:00</option>
                <option value="13:00-13:30">13:00-13:30</option>
                <option value="13:30-14:00">13:30-14:00</option>
                <option value="14:00-14:30">14:00-14:30</option>
                <option value="14:30-15:00">14:30-15:00</option>
                <option value="15:00-15:30">15:00-15:30</option>
                <option value="15:30-16:00">15:30-16:00</option>
                <option value="16:00-16:30">16:00-16:30</option>
                <option value="16:30-17:00">16:30-17:00</option>
                <option value="17:00-17:30">17:00-17:30</option>
                <option value="17:30-18:00">17:30-18:00</option>
                <option value="18:00-18:30">18:00-18:30</option>
                <option value="18:30-19:00">18:30-19:00</option>
                <option value="19:00-19:30">19:00-19:30</option>
                <option value="19:30-20:00">19:30-20:00</option>
                <option value="20:00-20:30">20:00-20:30</option>
                <option value="20:30-21:00">20:30-21:00</option>
                <option value="21:00-21:30">21:00-21:30</option>
              </select>
            </div>
          </li>
        </ul>
      </div>
      <split></split>
      <ul class="order_list">
        <li class="order_item" v-for="index in 2">
          <div class="goods_describe">
            <img src="./goods.png" alt="">
            <div class="goods_detail">
              <p class="name">
                <span>商品名称</span>
                <span>￥50</span>
              </p>
              <p class="text">
                <span>描述</span>
                <span>x2</span>
              </p>
            </div>
          </div>
        </li>
      </ul>
      <div class="order_closing">
        <div>
          数量:
          <span>1</span>
        </div>
        <div class="total_price">
          总计:
          <span>
                ￥ 50.00
              </span>
        </div>
        <div class="carriage">
          运费:
          <span>
                ￥ 1.00
              </span>
        </div>
      </div>
      <div class="tips">
        <i class="iconfont icon-liuyan"></i>
        <input type="text" placeholder="给卖家留言">
      </div>
      <div class="gender_select">
        <span>性别</span>
        <span class="radio">
          <input type="radio" id="male" name="gender">
          <label for="male">
            <span class="radio">
              <i class="iconfont icon-wancheng"></i>
            </span>
            男
          </label>
        </span>
        <span class="radio">
          <input type="radio" id="female" name="gender">
          <label for="female">
            <span class="radio">
              <i class="iconfont icon-wancheng"></i>
            </span>
            女
          </label>
        </span>
      </div>
      <split></split>
      <div class="pay_group">
        <ul class="discount">
          <li class="discount_item" @click="couponsShow=true">
            <span>使用优惠券</span>
            <span class="arrow-right">
              <i>1</i>
              张可用
            </span>
          </li>
          <li class="discount_item">
            <span>使用积分(100分抵1.00元)</span>
            <span class="switch_btn"></span>
            <!--<span class="checkbox" :class="{checked: derate}" @click="derate=!derate"></span>-->
          </li>
          <li class="discount_item">
            <span>
              使用储值
              <i class="iconfont icon-tishi"></i>
            </span>
            <span></span>
          </li>
          <li class="discount_item">
            <span>已抵消 <i>¥1.00</i>，还需支付 <i>¥40.00</i></span>
            <span></span>
          </li>
        </ul>
        <split></split>
        <ul class="pay_type">
          <li>
            <i class="iconfont icon-weixin"></i>
            <span>微信支付</span>
            <span class="checkbox" :class="{checked: payType==='wx'}" @click="payType=payType==='wx'?'':'wx'"></span>
          </li>
          <li>
            <i class="iconfont icon-cashondelivery"></i>
            <span>货到付款</span>
            <span class="checkbox" :class="{checked: payType==='df'}" @click="payType=payType==='df'?'':'df'"></span>
          </li>
        </ul>
      </div>
      <split :split-h="30"></split>

      <transition name="modal">
        <modal v-show="dateShow||addressShow ||couponsShow || expressAdd" @cancel="hideModal">
          <coupons v-if="couponsShow" slot="coupons"></coupons>
          <express-address v-if="expressAdd" slot="express"></express-address>
          <!--<dateTime @ok="selected" slot="timer" :value="date" v-if="addressShow"></dateTime>-->
          <date-picker :init-date="date" @done="chooseDate" slot="timer" v-if="dateShow"></date-picker>
          <address-selecter @done="chooseAddress" slot="address" v-if="addressShow" ></address-selecter>
        </modal>
      </transition>
    </div>

    <div class="order_foot">
      <div class="order_price">
        订单总额
        <span class="price">
          ￥<i>40</i>.00
        </span>
      </div>
      <button>立即支付</button>
    </div>
  </div>
</template>

<script>
  import split from '../split/split.vue'
  import dateTime from '../date_time/date_time1.0.vue'
  import datePicker from '../date_time/date_picker.vue'
  import modal from '../modal/modal.vue'
  import addressSelecter from './address_selecter/address_selecter.vue'
  import expressAddress from './express_address/express_address.vue'
  import coupons from './coupons/coupons.vue'

  export default {
    name: 'orders',
    data () {
      return {
        address: '',
        pickup: true,
        derate: false,
        dateShow: false,
        expressAdd: false,
        couponsShow: false,
        addressShow: false,
        date: '2017-05-22',
        payType: 'wx'
      }
    },
    methods: {
      chooseDate (date) {
        this.dateShow = false
        this.date = date
        console.log('get msg ', date)
      },
      chooseAddress (seller) {
        this.addressShow = false
        seller ? this.address = seller : ''
      },
      selectAddress () {
        this.addressShow = true
      },
      selectDate () {
        this.dateShow = true
      },
      hideModal () {
        this.dateShow = false
        this.expressAdd = false
        this.addressShow = false
        this.couponsShow = false
      }
    },
    beforeRouteEnter (to, from, next) {
      console.log('enter')
      next(vm => {
        console.log('in')
        vm.$emit('hideFooter', false)
      })
    },
    beforeRouteLeave (to, from, next) {
      this.$emit('hideFooter', true)
      next()
    },
    components: {
      dateTime,
      modal,
      split,
      coupons,
      datePicker,
      addressSelecter,
      expressAddress
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @r: 37.5rem;
  @priceC: #ff6400;
  .orders {
    font-size: 28px;
    padding-bottom: 50/@r;
    >*{
      background-color: #fff;
    }
    .order_container{

      .orders_head {
      padding: 11/@r 24/@r;
      ul {
        overflow: hidden;
        border: 1px solid #4080E8;
        border-radius: 6px;
        li {
          line-height: 2;
          font-size: 28px;
          text-align: center;
          color: #4080E8;
          float: left;
          width: 50%;
          &.active {
            background-color: #4080E8;
            color: #fff;
          }
        }
      }
    }
      .express {
        padding: 10/@r;
        overflow: hidden;
        border-top: 1px solid #f0f0f0;
        .address_wrap {
          float: left;
          width: 85%;
          span {
            &:first-of-type {
              padding-right: 10/@r;
            }
          }
          p {
            line-height: 1.5;
            color: #222;
          }
          .adress {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 24px;
            text-indent: 20/@r;
            color: #999;
          }
        }
        > i {
          float: right;
          margin-top: 18/@r;
        }
      }
      .pickupSelf {
        .pickup_wrap {
          border-bottom: 1px solid #f0f0f0;
          padding-left: 20px;
          li {
            border-top: 1px solid #f0f0f0;
            padding-right: 10/@r;
            overflow: hidden;
            font-size: 28px;
            line-height: 50/@r;
            display: flex;
            &:first-child {
              border-top: none;
            }
            div {
              &:first-child {
                margin-right: 20/@r;
              }
              &.pickup_cell {
                flex: 1;
                overflow: hidden;
                position: relative;
                select {
                  background-color: transparent;
                  -webkit-appearance: none;
                  height: 100%;
                  outline: none;
                  width: 100%;
                }
              }
            }
          }
        }
      }
      .order_list{
        .order_item{
          .goods_describe{
            display: flex;
            padding: 10/@r;
            padding-left: 0;
            margin-left: 10/@r;
            border-bottom: 1px solid #f0f0f0;
            >img{
              width: 184px;
              height: 116px;
              margin-right: 10/@r;
            }
            .goods_detail{
              flex: 1;
              p{
                display: flex;
                line-height: 1.6;
                justify-content: space-between;
                span{
                  &:last-child{
                  }
                }
                &.name{

                }
                &.text{
                  color: #999;
                  line-height: 1.3;
                  font-size: 28px;
                }
              }
            }
          }
        }
      }
      .order_closing{
        justify-content: flex-end;
        display: flex;
        padding: 10/@r;
        padding-left: 0;
        margin-left: 10/@r;
        border-bottom: 1px solid #f0f0f0;
        >div{
          margin-left: 10/@r;
          color: #999;
          &.total_price{
            span{
              color: @priceC;
              font-weight: bold;
            }
          }
          &.carriage{
            span{
              font-size: 28px;
              font-weight: 600;
            }
          }
        }
      }
      .tips{
        position: relative;
        padding: 10/@r;
        border-bottom: 1px solid #f0f0f0;
        i{
          position: absolute;
          left: 20/@r;
          top: 24/@r;
        }
        input{
          background-color: #F4F4F4;
          font-size: 28px;
          display: block;
          width: 100%;
          border-radius: 6px;
          line-height: 2;
          padding: 5/@r;
          padding-left: 30/@r;
          box-sizing: border-box;
          outline: none;
        }
      }
      .gender_select{
        padding: 10/@r;
        >span{
          &:first-child{
            margin-right: 10/@r;
          }
          margin-right: 40px;
        }
      }
      .pay_group{
        .discount_item{
          overflow: hidden;
          padding: 20px;
          height: 25/@r;
          border-bottom: 1px solid #f0f0f0;
          span{
            &:last-child{
              float: right;
              &.arrow-right{
                padding-right: 60px;
                position: relative;
              }
            }
            .icon-tishi{
              color: #EE8E6E;
            }
          }
          &:last-child{
            span{
              i{
                color: #FF6400;
                font-weight: 600;
              }
            }
          }
        }
        .pay_type{
          li{
            padding: 10/@r;
            overflow: hidden;
            >*{
              vertical-align: middle;
              &.checkbox{
                float: right;
              }
              &.icon-weixin{
                color: #01C10A;
              }
              &.icon-cashondelivery{
                color: #FF9C00;
              }
            }
          }
        }
      }
    }
    .order_foot{
      position: fixed;
      bottom: 0;
      height: 50/@r;
      width: 100%;
      line-height: 50/@r;
      display: flex;
      justify-content: space-between;
      .order_price{
        font-weight: 600;
        padding-left: 10/@r;
        .price{
          color: @priceC;
          font-size: 24px;
          i{
            font-size: 52px;
            font-weight: bold;
          }
        }
      }
      button{
        color: #fff;
        font-size: 34px;
        padding: 0 45/@r;
        display: inline-block;
        background-color: @priceC;
      }
    }

    /*公用类,定义一些css图标*/
    .radio{
      [type=radio]{
        display: none;
        &+label{
          span{
            border: 1px solid #ddd;
            vertical-align: middle;
            display: inline-block;
            border-radius: 50%;
            margin-right: 20px;
            overflow: hidden;
            outline: none;
            i{
              color: #4080E8;
              font-size: 40px;
              visibility: hidden;
            }
          }
        }
        &:checked{
          &+label{
            span{
              display: inline-block;
              height: 40px;
              width: 40px;
              border: 1px solid transparent;
              border-radius: 50%;
              i{
                visibility: visible;
              }
            }
          }
        }
      }
    }
    ._checkbox{
      display: inline-block;
      width: 20/@r;
      height: 20/@r;
      border-radius: 50%;
      border: 1px solid #999;
      line-height: 20/@r;
      text-align: center;
      position: relative;
      &.checked{
        border-color: #00B7FF;
        background-color: #00b7ff;
        border-color: transparent;
        &:after{
        }
      }
      &:after{
        content: '';
        position: absolute;
        top: 40%;
        display: block;
        height: 10/@r;
        width: 5/@r;
        border: 4px solid #fff;
        /*border-top-color: transparent;*/
        /*border-left-color: transparent;*/
        border-top: none;
        border-left: none;
        transform: rotate(45deg)  translateY(-80%);
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
    .arrow-right{
      &:after {
        content: " ";
        transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
        border-width: 4px 4px 0 0;
        border-color: #c8c8cd;
        display: inline-block;
        border-style: solid;
        position: absolute;
        margin-top: -6px;
        height: 12px;
        right: 5px;
        width: 12px;
        top: -4px;
        top: 50%;
      }
    }
    .modal-enter, .modal-leave-active {
      &.mask {
        opacity: 0;
        .bottom {
          transform: translateY(100%);
        }
      }
    }
    .switch_btn{
      display: inline-block;
      width: 40/@r;
      height: 20/@r;
      border: 1px solid #e5e5e5;
      border-radius: 25% 25% 25% 25% / 50% 50% 50% 50%;
    }
    .bottom-enter, .bottom-leave-active {
      transform: translateY(100%);
    }
    .modal-enter-active, .modal-leave-active,
    .bottom-enter-active, .bottom-leave-active {
      transition: .5s;
      &.mask {
        .bottom {
          transition: .5s;
        }
      }
    }
  }
</style>
