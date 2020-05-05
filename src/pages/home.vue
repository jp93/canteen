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
        <div class="right">
          <span>&lt;上周</span>
          <span>下周&gt;</span>
        </div>
      </div>
    </div>
    <div class="content">
      <cube-scroll-nav  @change="changeHandler">
        <template slot="bar" slot-scope="props">
          <cube-scroll-nav-bar :labels="props.labels" :txts="barTxts" :current="props.current">
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
          v-for="item in data"
          :key="item.name"
          :label="item.name"
       
          >
          <div class="title" style="margin-top:44px">
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
              <div class="food-list" v-for="(mealItem,mealIndex) in j.type" :key="mealIndex">
                <div class="left">
                  {{mealItem.key}}
                </div>
                <div class="right" >
                  <span  v-for="(valItem,valIndex) in mealItem.val" :key="valIndex" >{{valItem}}</span>
                </div>
              </div>
            </div>
            <!-- <li v-for="food in item.foods">
           
              <div>
                <img :src="food.icon" />
                <p>{{food.name}}</p>
              </div>
            </li> -->
          </ul>
        </cube-scroll-nav-panel>
      </cube-scroll-nav>
    </div>
  </div>
</template>

<script>
import bridge from "@/bridge/h5";
import goodsData from "./goods-list.json";
const goods = goodsData.goods;
export default {
  name: "home",
  data() {
    return {
      active: 1,
      data: goods,
      currentYear:'',
      currentWeek:"",
      title:"",
      list:[]
    };
  },
  components: {},

  mounted() {
    this.currentTime()
    this.getMenuPeriod()
   
    
  },
  computed: {
    barTxts() {
      let ret = []
      ret = this.list.map(e => {
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
        let d1 = new Date(dt);
        let d2 = new Date(dt);
        d2.setMonth(0);
        d2.setDate(1);
        let rq = d1-d2;
        let days = Math.ceil(rq/(24*60*60*1000));
        let num = Math.ceil(days/7);
        return num;
      },
    changeHandler(label) {
      console.log("changed to:", label);
    },

    //GET_MENU_PERIOD
    getMenuPeriod() {
      this.$request.get(this.$apis.GET_MENU_PERIOD + `?access_token=8d2b34cf-1780-49da-b832-7ba60c30b433`).then(res => {
        console.log('res',res)
        let data = res.data
			
			})
    },
    getWeekDetail() {
      this.$request.get(this.$apis.GET_WEEK_DETIAL + `?access_token=8d2b34cf-1780-49da-b832-7ba60c30b433&year=${this.currentYear}&week=${this.currentWeek}&period=0&type=0`).then(res => {
        console.log('res1',res)
        let data = res.data
        this.title = res.data.title
        this.list = res.data.list
			
			})
    },
    currentTime() {
      let date = new Date();
      this.currentYear = date .getFullYear(); 
      this.currentWeek = this.getWeek(date)
      this.getWeekDetail()
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

    .cube-scroll-nav-panel {
      width: 90%;
      margin: auto;
      .title{
        width 100%;
        position relative;
        margin-top 2 0px;

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
          top -11px
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
        width 341px;
        height 59px
        img{
          width 341px;
          height 59px
        }
      }
      .food-wrap{
        display flex;
        flex-direction column
        align-items center
        width 100%
        background:rgba(255,255,255,1);
        box-shadow:0px 0px 5px 0px rgba(17,53,57,0.08);
        border-radius:0px 0px 5px 5px;
        position relative;
        top:-8px;
        left:-3px;
        min-height 61px;
        .food-list{
          display flex
          flex-direction row
          padding:14px 19px;
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
            margin-left 40px;
            display flex;
            flex-direction row;
            flex-wrap wrap;
            font-size 15px;
            color #333;
            justify-content space-between
            span{
              margin-bottom 10px
            }
            
          }
          
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
      }

      li {
        float: left;
        width: 50%;
      }

      div {
        margin: 0 auto;
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
