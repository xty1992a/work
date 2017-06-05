<template>
  <div class="date-picker" @click.stop>
    <transition name="toggle">
      <div class="date-panel" :style="coordinates">
        <div class="panel-header">
          <div class="year-month-box">
            <div class="year-box">
              <button class="arrow-left" @click="prevYearPreview()">&lt;</button>
              <span>{{tmpYear}}</span>
              <button class="arrow-right" @click="nextYearPreview()">&gt;</button>
            </div>
            <div class="month-box">
              <button class="arrow-left" @click="prevMonthPreview()">&lt;</button>
              <span>{{tmpMonth + 1}}月</span>
              <button class="arrow-right" @click="nextMonthPreview()">&gt;</button>
            </div>
          </div>
        </div>
        <div class="type-date">
          <ul class="weeks">
            <li v-for="item in weekList">{{item | week}}</li>
          </ul>
          <ul class="date-list" >
            <li v-for="(item, index) in dateList"
                :class="{preMonth: item.previousMonth, before: (item.value<tmpEndDate&&item.currentMonth&&tmpMonth<=tmpStartMonth)||tmpMonth<tmpStartMonth,
                          nextMonth: item.nextMonth, invalid: validateDate(item), nextM: item.nextMonth&&index>34,
                          selected: isSelected('date', item),
                          weekend: ((index+1) % 7) === 0 || (index % 7) === 0}"
                @click="selectDate(item, $event)">{{item.value}}</li>
          </ul>
          <div class="btn_wrap">
            <button class="ok" @click="ok">确定</button>
            <button class="cancel" @click="cancel">取消</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/javascript">

  export default {
    data () {
      let now = new Date()
      return {
        coordinates: {},
        year: now.getFullYear(),
        month: now.getMonth(),
        date: now.getDate(),
        tmpYear: now.getFullYear(),
        tmpMonth: now.getMonth(),
        tmpStartYear: now.getFullYear(),
        tmpStartMonth: now.getMonth(),
        tmpStartDate: now.getDate(),
        tmpEndYear: now.getFullYear(),
        tmpEndMonth: now.getMonth(),
        tmpEndDate: now.getDate(),
        weekList: [0, 1, 2, 3, 4, 5, 6],
        rangeStart: false
      }
    },
    props: {
      min: {default: '1970-01-01'},
      max: {default: '3016-01-01'},
      value: {
        type: [String, Array],
        default: ''
      },
      range: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      isSelected (type, item) {
        switch (type) {
          case 'year':
            if (!this.range) return item === this.tmpYear
            return (new Date(item, 0).getTime() >= new Date(this.tmpStartYear, 0).getTime()
            && new Date(item, 0).getTime() <= new Date(this.tmpEndYear, 0).getTime())
          case 'month':
            if (!this.range) return item === this.tmpMonth && this.year === this.tmpYear
            return (new Date(this.tmpYear, item).getTime() >= new Date(this.tmpStartYear, this.tmpStartMonth).getTime()
            && new Date(this.tmpYear, item).getTime() <= new Date(this.tmpEndYear, this.tmpEndMonth).getTime())
          case 'date':
            if (!this.range) return this.date === item.value && this.month === this.tmpMonth && item.currentMonth
            let month = this.tmpMonth
            item.previousMonth && month--
            item.nextMonth && month++
            return (new Date(this.tmpYear, month, item.value).getTime() >= new Date(this.tmpStartYear, this.tmpStartMonth, this.tmpStartDate).getTime()
            && new Date(this.tmpYear, month, item.value).getTime() <= new Date(this.tmpEndYear, this.tmpEndMonth, this.tmpEndDate).getTime())
        }
      },
      prevMonthPreview () {
        this.tmpMonth = this.tmpMonth === 0 ? 0 : this.tmpMonth - 1
      },
      nextMonthPreview () {
        this.tmpMonth = this.tmpMonth === 11 ? 11 : this.tmpMonth + 1
      },
      prevYearPreview () {
        new Date().getFullYear() === this.tmpYear ? '' : this.tmpYear -= 1
      },
      nextYearPreview () {
        this.tmpYear += 1
      },
      selectDate (date, ev) {
        var classStr = ev.target.classList.value
        console.log(/before/.test(classStr))
        if (/before/.test(classStr)||/weekend/.test(classStr)) {
          return
        }
        setTimeout(() => {
            if (this.validateDate(date)) return
            if (date.previousMonth) {
              if (this.tmpMonth === 0) {
                this.year -= 1
                this.tmpYear -= 1
                this.month = this.tmpMonth = 11
              } else {
                this.month = this.tmpMonth - 1
                this.tmpMonth -= 1
              }
            } else if (date.nextMonth) {
              if (this.tmpMonth === 11) {
                this.year += 1
                this.tmpYear += 1
                this.month = this.tmpMonth = 0
              } else {
                this.month = this.tmpMonth + 1
                this.tmpMonth += 1
              }
            }
            if (!this.range) {
              this.year = this.tmpYear
              this.month = this.tmpMonth
              this.date = date.value
              let value = `${this.tmpYear}-${('0' + (this.month + 1)).slice(-2)}-${('0' + this.date).slice(-2)}`
              this.$emit('input', value)
              this.panelState = false
            } else if (this.range && !this.rangeStart) {
              this.tmpEndYear = this.tmpStartYear = this.tmpYear
              this.tmpEndMonth = this.tmpStartMonth = this.tmpMonth
              this.tmpEndDate = this.tmpStartDate = date.value
              this.rangeStart = true
            } else if (this.range && this.rangeStart) {
              this.tmpEndYear = this.tmpYear
              this.tmpEndMonth = this.tmpMonth
              this.tmpEndDate = date.value
              let d1 = new Date(this.tmpStartYear, this.tmpStartMonth, this.tmpStartDate).getTime()
              let d2 = new Date(this.tmpEndYear, this.tmpEndMonth, this.tmpEndDate).getTime()
              if (d1 > d2) {
                let tmpY, tmpM, tmpD
                tmpY = this.tmpEndYear
                tmpM = this.tmpEndMonth
                tmpD = this.tmpEndDate

                this.tmpEndYear = this.tmpStartYear
                this.tmpEndMonth = this.tmpStartMonth
                this.tmpEndDate = this.tmpStartDate

                this.tmpStartYear = tmpY
                this.tmpStartMonth = tmpM
                this.tmpStartDate = tmpD
              }
              let RangeStart = `${this.tmpStartYear}-${('0' + (this.tmpStartMonth + 1)).slice(-2)}-${('0' + this.tmpStartDate).slice(-2)}`
              let RangeEnd = `${this.tmpEndYear}-${('0' + (this.tmpEndMonth + 1)).slice(-2)}-${('0' + this.tmpEndDate).slice(-2)}`

              let value = [RangeStart, RangeEnd]
              console.log(value)
              this.value = value
              this.$emit('input', value)
              this.rangeStart = false
              this.panelState = false
            }
          }, 0)
      },
      validateDate (date) {
        let mon = this.tmpMonth
        if (date.previousMonth) {
          mon -= 1
        } else if (date.nextMonth) {
          mon += 1
        }
        if (new Date(this.tmpYear, mon, date.value).getTime() >= new Date(this.minYear, this.minMonth - 1, this.minDate).getTime() && new Date(this.tmpYear, mon, date.value).getTime() <= new Date(this.maxYear, this.maxMonth - 1, this.maxDate).getTime()) {
          return false
        }
        return true
      },
      ok () {
        var dateTime = '' + this.tmpYear + '-' + ((this.month + 1) < 10 ? '0' + (this.month + 1) : (this.month + 1)) + '-' + this.date
        console.log('emit ok!!', dateTime)
        this.$emit('ok', dateTime)
      },
      cancel () {
        console.log('cancel in date', this.value)
        this.$emit('ok', this.value)
      }
    },
    computed: {
      dateList () {
        let currentMonthLength = new Date(this.tmpYear, this.tmpMonth + 1, 0).getDate()
        let dateList = Array.from({length: currentMonthLength}, (val, index) => {
          return {
            currentMonth: true,
            value: index + 1,
            today: this.tmpStartDate,
            thisMonth: this.tmpStartMonth
          }
        })
        let startDay = new Date(this.tmpYear, this.tmpMonth, 1).getDay()
        let previousMongthLength = new Date(this.tmpYear, this.tmpMonth, 0).getDate()

        for (let i = 0, len = startDay; i < len; i++) {
          dateList = [{previousMonth: true, value: previousMongthLength - i}].concat(dateList)
        }
        for (let i = dateList.length, item = 1; i < 42; i++, item++) {
          dateList[dateList.length] = {nextMonth: true, value: item}
        }
        return dateList
      }
    },
    filters: {
      week: (item) => {
        return {0: '日', 1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六'}[item]
      }
    },
    mounted () {
      this.$nextTick(() => {
        if (this.$el.parentNode.offsetWidth + this.$el.parentNode.offsetLeft - this.$el.offsetLeft <= 300) {
          this.coordinates = {right: '0', top: `${window.getComputedStyle(this.$el.children[0]).offsetHeight + 4}px`}
        } else {
          this.coordinates = {left: '0', top: `${window.getComputedStyle(this.$el.children[0]).offsetHeight + 4}px`}
        }
        let minArr = this.min.split('-')
        this.minYear = Number(minArr[0])
        this.minMonth = Number(minArr[1])
        this.minDate = Number(minArr[2])

        let maxArr = this.max.split('-')
        this.maxYear = Number(maxArr[0])
        this.maxMonth = Number(maxArr[1])
        this.maxDate = Number(maxArr[2])

        if (this.range) {
          if (Object.prototype.toString.call(this.value).slice(8, -1) !== 'Array') {
            throw new Error('Binding value must be an array in range mode.')
          }
          if (this.value.length) {
            let rangeStart = this.value[0].split('-')
            let rangeEnd = this.value[1].split('-')
            this.tmpStartYear = Number(rangeStart[0])
            this.tmpStartMonth = Number(rangeStart[1]) - 1
            this.tmpStartDate = Number(rangeStart[2])

            this.tmpEndYear = Number(rangeEnd[0])
            this.tmpEndMonth = Number(rangeEnd[1]) - 1
            this.tmpEndDate = Number(rangeEnd[2])
          } else {
            this.$emit('input', ['', ''])
          }
        }
        if (!this.value) {
          this.$emit('input', '')
        }
        window.addEventListener('click', this.close)
      })
    },
    beforeDestroy () {
      window.removeEventListener('click', this.close)
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @r: 58.6rem;
  @dateC: #0097A7;
  .date-picker {
    .date-panel {
      border: 1px solid #eee;
      padding: 5px 0 10px;
      box-sizing: border-box;
      background-color: #fff;
      .panel-header {
        .year-month-box {
          width: 100%;
          font-size: 0;
          > div {
            display: inline-flex;
            justify-content: space-between;
            font-size: 20px;
            width: 50%;
            box-sizing: border-box;
            > * {
              flex: 1;
              text-align: center;
            }
            .arrow-left, .arrow-right {
              outline: none;
              font-weight: 600;
              background-color: #fff;
              color: @dateC;
            }
          }
        }
      }
      .type-date {
        > ul {
          width: 100%;
          text-align: center;
          li {
            font-family: Roboto;
            width: 14.28%;
            height: 30px;
            text-align: center;
            line-height: 30px;
            &.preMonth, &.nextMonth, &.weekend, &.before {
              color: #ccc;
            }
            &.nextM {
              display: none;
            }
          }
          &.weeks {
            display: flex;
            flex-flow: row wrap;
            justify-content: space-between;
            &:first-child {
              border-bottom: 1px solid @dateC;
            }
            li {
              font-size: 14px;
              color: @dateC;
            }
          }
        }
        .date-list {
          display: flex;
          flex-flow: row wrap;
          .valid:hover {
            background-color: #eee;
          }
          li {
            transition: all ease .1s;
            cursor: pointer;
            box-sizing: border-box;
            border-bottom: 1px solid #fff;
            position: relative;
            &.invalid {
              cursor: not-allowed;
              color: #ccc;
            }
          }
          .selected {
            background-color: rgb(0, 151, 167);
            color: #fff;
          }
        }
        .btn_wrap {
          line-height: 40/@r;
          text-align: center;
          button {
            color: @dateC;
            outline: none;
            background-color: #fff;
            display: inline-block;
            padding-left: 20/@r;
            padding-right: 20/@r;
          }
        }
      }
    }
  }

  .toggle-enter, .toggle-leave-active {
    opacity: 0;
    transform: translateY(100%);
  }

  .toggle-enter-active, .toggle-leave-active {
    transition: all ease .2s;
  }

  .fade-enter, .fade-leave-active {
    opacity: 0;
    transform: scale3d(0, 0, 0);
  }

  .fade-enter-active, .fade-leave-active {
    transition: all ease .1s;
  }
</style>
