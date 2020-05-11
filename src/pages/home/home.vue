<template>
  <div class="container">
    <div class="top-wrapper">
      <div class="top">
        <span>首页</span>
        <img src="../../assets/search.png" width="17px" height="17px" alt />
      </div>
      <div class="date">
        <div class="left">
          <span class="fs15">本周：</span>
          <span class="fs12">{{title}}</span>
        </div>
        <div class="right" >
          <span class="up-week" @click="lastWeek">&lt;上周</span>
          <span class="next-week" @click="nextWeek">下周&gt;</span>
        </div>
      </div>
    </div>
    <div class="content">
      <cube-scroll-nav  ref="scrollNav" :current="active"  :data="list"  @change="changeHandler">
        <template slot="bar" slot-scope="props">
          <cube-scroll-nav-bar :labels="props.labels" :txts="barTxts || a" :current="props.current">
            <template slot-scope="props">
              <div class="week-wrap">
                <span class="week">星期</span>
                <span class="day">{{props.txt.weekday.substring(2,3)}}</span>
                <span class="date">{{props.txt.date}}</span>
              </div>
            </template>
          </cube-scroll-nav-bar>
        </template>
        <cube-scroll-nav-panel 
          v-for="item in list"
          :key="item.weekday"
          :label="item.weekday"
          title=""
          >
          <div class="title" >
            <img src="../../assets/week-title.png" alt="">
            <div class="title-content-wrap">
              <span class="title-content-week">{{item.weekday}}</span>
              <span class="title-content-date"> {{item.data}}</span>
            </div>
          </div>
          <ul  v-for="(j,k) in item.meal" :key="k">
            <div class="type">
              <img v-if="j.period ==1" src="../../assets/breakfast.png" alt="">
              <img v-if="j.period ==2" src="../../assets/lunch.png" alt="">
              <img v-if="j.period ==3" src="../../assets/dinner.png" alt="">
              <img v-if="j.period ==4" src="../../assets/xiaoye.png" alt="">
              <img v-if="j.period ==5" src="../../assets/daye.png" alt="">
              <img src="../../assets/breakfast.png" alt="">
            </div>
            <div class="food-wrap">
              <div :class="{'food-list_odd':mealIndex%2==0}" class="food-list" v-for="(mealItem,mealIndex) in j.type" :key="mealIndex">
                <div class="left">
                  {{mealItem.key}}
                </div>
                <div class="right" >
                  <div  :class="{'valItem_wrap_odd':(valIndex+1)%3 ===0}"    class="valItem_wrap" v-for="(valItem,valIndex) in mealItem.val" :key="valIndex" >
                    <span   class="valItem" >{{valItem}}</span>
                  </div>
                  
                </div>
              </div>
              <div class="no-data" v-if="j.type.length == 0">
                <img  class="icon-canel" src="../../assets/icon-cancel.png" alt="">
              </div>
                
            </div>
          </ul>
          <div class="no-data" v-if="item.meal.length == 0">
            <img  class="icon-canel" src="../../assets/icon-cancel.png" alt="">
          </div>
        </cube-scroll-nav-panel>
        <div class="s-cook" v-if="list.length == 0">
          <img src="../../assets/s-cook.png" alt="">
          <span class="tip">
            非常抱歉，这一周不开餐！
          </span>
        </div>
      </cube-scroll-nav>
    </div>
  </div>
</template>

<script>
import bridge from "@/bridge/h5";
import goodsData from "./list.json";
const goods = goodsData.data.list;
const PERIODS = [1,2,3,4,5]
const WEEK = ['星期一','星期二','星期三','星期四','星期五','星期六','星期日']
export default {
  name: "home",
  data() {
    return {
      active: 0,
      data: goods,
      currentYear:'',
      currentWeek:"",
      title:'',
      list:goods,
      constructList:[]
    };
  },
  components: {},

  mounted() {
    this.currentTime()
  },
  computed: {
    barTxts() {
      let ret = []
      let list = this.list.length ? this.list : this.constructList
      ret = list.map(e => {
        return{
          weekday:e.weekday,
          date:e.data
        }
      })
      return ret
    }
  },
  methods: {
    getWeek(dt){
      let d1 = new Date();
      let d2 = new Date();
      d2.setMonth(0);
      d2.setDate(1);
      let rq = d1-d2;
      let s1 = Math.ceil(rq/(24*60*60*1000));
      let s2 = Math.ceil(s1/7)+1;
      return s2;
    },
    changeHandler(label) {
      console.log("changed to:", label);
    },

    //GET_MENU_PERIOD
    getMenuPeriod() {
      this.$request.get(this.$apis.GET_MENU_PERIOD + `?access_token=cc794522-4214-48df-8013-da05fa9f4b9b`).then(res => {
        let data = res.data
			})
    },
    getWeekDetail() {
      this.$request.get(this.$apis.GET_WEEK_DETIAL + `?access_token=cc794522-4214-48df-8013-da05fa9f4b9b&year=${this.currentYear}&week=${this.currentWeek}&period=0&type=0`).then(res => {
        let data = res.data
        this.title = res.data.title
        let list = res.data.list
        this.isData(list)
        if(list.length === 0) {
          this.list = list
          return
        }
        list.forEach(e => {
          if(e.meal.length >= 5 || !e.meal.length) {
            return
          }
          PERIODS.forEach((j,index) => {
            if(!e.meal[index]){
              e.meal.push({
                'period':index +1,
                'type':[]
              })
            }
          })
        })
        this.list = list
        this.active = 0
        this.$refs.scrollNav && this.$refs.scrollNav.refresh()
      })
    },
    currentTime() {
      let date = new Date();
      this.currentYear = date .getFullYear(); 
      this.currentWeek = this.getWeek(date)
      this.getMenuPeriod()
      this.getWeekDetail()
    },
    nextWeek() {
      this.currentWeek < 51 ? this.currentWeek += 1 : this.currentWeek  = 1
      this.getWeekDetail()
    },

    lastWeek() {
      let date = new Date();
      let currentYear = date .getFullYear(); 
      if( this.currentWeek && this.currentWeek > this.getWeek(new Date()) && currentYear== this.currentYear) {
        this.currentWeek -= 1
      }
      this.getWeekDetail()
    },
    getWeekDay(dateString) {
      let dateStringReg = /^\d{4}[/-]\d{1,2}[/-]\d{1,2}$/;
      if (dateString.match(dateStringReg)) {
        let presentDate = new Date(dateString),
          today = presentDate.getDay() !== 0 ? presentDate.getDay() : 7;
        return Array.from(new Array(7), function(val, index) {
          return formatDate(new Date(presentDate.getTime() - (today - index - 1) * 24 * 60 * 60 * 1000));
        });

      } else {
        throw new Error('dateString should be like "yyyy-mm-dd" or "yyyy/mm/dd"');
      }
      function formatDate(date) {
        let month = (date.getMonth() + 1) < 10 ? '0'+(date.getMonth() + 1) : (date.getMonth() + 1)
        let _date = date.getDate() < 10 ? '0'+ date.getDate() : date.getDate()
        return month + '-' + _date;
      }
    },
    isData(list) {
      if(list.length) {
        return
      }
      let title =  this.title
      let _date = title.split(' ')[1].split('~')[0]
      let getDate = this.currentYear + `-${_date}`
      let weeks = this.getWeekDay(getDate)
      let constructList = weeks.map((e,index) => {
        return {
          'data':e,
          'weekday':WEEK[index],
        }
      })
      this.constructList = constructList
      this.$refs.scrollNav && this.$refs.scrollNav.refresh()
    }



  },
  watch: {}
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/mixin';
@import '~common/stylus/variable';

.container {
  background-color: rgb(238, 238, 238);
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .top-wrapper {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;

    .top {
      width: 100%;
      height: 42px;
      text-align: center;
      line-height: 42px;
      background-color: #4378BE;
      font-size: 17px;
      text-align: center;
      color: #fff;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      img {
        width: 17px;
        height: 17px;
        position: absolute;
        right: 13px;
        top: 13px;
      }
    }

    .date {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-top: 42px;
      height: 30px;
      padding: 5px 12px;
      justify-content space-between;

      .left {
        .fs15 {
          font-size: 15px;
          color: #333;
          font-weight: 400;
        }

        .fs12 {
          font-size: 12px;
          color: #999;
        }
      }

      .right {
        display: flex;
        align-items: center;
        font-size: 15px;
        color: #333;
        align-self: flex-end;
        .up-week{
          margin-right 17px;
        }
        .next-week{
          color #4378BE;
        }
      }
    }
  }

  .content {
    position: relative;
    top: 86px;
    width: 100%;
    left: 0;
    height: 85%;
    .week-wrap{
      display flex;
      flex-direction column;
      align-items center
      width:73px;
      height:75px;
      padding:12px  0 8px 0;
      box-sizing:border-box;
      .week{
        font-size:13px;
      }
      .day{
        font-size 17px;
        color #333;
      }
      .date{
        font-size 11px;
      }
    }
    >>>.cube-scroll-nav-bar-items{
      background-color: rgb(238, 238, 238);
      border-radius:5px;
    }
    >>>.cube-scroll-nav-bar-item_active{
      background:linear-gradient(90deg,rgba(236,162,21,1),rgba(251,199,23,1))!important;
      box-shadow:-6px 0px 20px 0px rgba(0, 0, 0, 0.26)!important;
      color:#333!important;
   

    }
    >>>.cube-scroll-nav-bar-item{
      padding: 0px 0px;
      margin: 0 8px;
      background:rgba(255,255,255,1);
      border-radius:5px;
      box-shadow:none;
      color #999

    }
    >>>.cube-scroll-nav-bar .cube-scroll-nav-bar_horizontal{
      border:none;
    }
    .s-cook{
      width 100%;
      display flex;
      flex-direction column;
      align-items center;
      margin-top 20px;
      
      img{
        width 45px;
        height 65px
      }
      .tip{
        font-size: 13px;
        color: rgb(153, 153, 153);
        line-height: 1.2;
        margin-top:20px;
      }
    }

    .cube-scroll-nav-panel {
      width: 90%;
      margin: auto;
      .title{
        width 100%;
        position relative;
        margin-top 2px 0px;
        padding-top 15px

        img{
          width 155px
          height 22px
        }
        .title-content-wrap{
          position absolute;
          display flex;
          flex-direction column;
          align-items center;
          left 49%
          top 7px
          .title-content-week{
            font-size 16px;
            color #333;
          }
          .title-content-date{
            font-size 10px
            color #999;
          }

        }
      }
      .type{
        width 100%
        margin-bottom 0px;
        height 59px
        img{
          width 97%;
          height 50px
        }
      }
      .food-wrap{
        display flex;
        flex-direction column
        align-items center
        justify-content center
        width 100%
        background:rgba(255,255,255,1);
        box-shadow:0px 0px 5px 0px rgba(17,53,57,0.08);
        border-radius:0px 0px 5px 5px;
        position relative;
        top:-8px;
        left:0px;
        min-height 61px;
        padding 10px;
        box-sizing border-box;
        .food-list_odd{
          background:rgba(247,247,247,1);
          border-radius 5px;
        }
        .food-list{
          display flex
          flex-direction row
          padding:14px 10px 14px 19px;
          box-sizing border-box;
          width 100%;
          align-items center;

          .left{
            width 18%;
            font-size:15px;
            color:#999;
          }
          .right{
            flex 1;
            margin-left 30px;
            display flex;
            flex-direction row;
            flex-wrap wrap;
            font-size 15px;
            color #333;
            justify-content flex-start;
            box-sizing border-box;
            .valItem_wrap_odd{
              margin-right 0!important;
            }
          
            .valItem_wrap{
              position relative;
              width 30%;
              box-sizing border-box;
              margin-right 10px
              .valItem{
                text-align justify;
                margin-bottom 10px;
                width 100%;
                position relative;
                font-size 15px;
                display inline-block;
                color #333;
                box-sizing border-box
                
              }
          
            }
            
            
            
          }
          
        }
        

      }
      .no-data{
        width 100%;
        height 135px;
        display flex;
        flex-direction column;
        align-items center;
        justify-content center;
        background-color #fff
        box-sizing border-box;
        .icon-canel{
          width:119px;
          height:72px;
        }

      }



      img {
        width: 114px;
        height: 114px;
      }

      ul {
        overflow: hidden;
        font-size: 14px;
        line-height: 1.4;
        color: #666;
        margin-top 15px!important
      }

      li {
        float: left;
        width: 50%;
      }


      p {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
