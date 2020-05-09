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
                    <!-- <span :class="[valIndex%2 !=0?'pl' :'pr']"  class="valItem" >{{valItem}}</span> -->
                    <span   class="valItem" >{{valItem}}</span>

                  </div>
                  
                </div>
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
export default {
  name: "home",
  data() {
    return {
      active: 0,
      data: goods,
      currentYear:'',
      currentWeek:"",
      title:'',
      list:goods
    };
  },
  components: {},

  mounted() {
    this.currentTime()
  
   
    
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
      let d1 = new Date();
      let d2 = new Date();
      d2.setMonth(0);
      d2.setDate(1);
      let rq = d1-d2;
      let s1 = Math.ceil(rq/(24*60*60*1000));
      let s2 = Math.ceil(s1/7);
      return s2;
    },
    changeHandler(label) {
      console.log("changed to:", label);
    },

    //GET_MENU_PERIOD
    getMenuPeriod() {
      this.$request.get(this.$apis.GET_MENU_PERIOD + `?access_token=c788d402-8a8a-4b77-af50-2b9337b26902`).then(res => {
        console.log('res',res)
        let data = res.data
			
			})
    },
    getWeekDetail() {
      this.$request.get(this.$apis.GET_WEEK_DETIAL + `?access_token=c788d402-8a8a-4b77-af50-2b9337b26902&year=${this.currentYear}&week=${this.currentWeek}&period=0&type=0`).then(res => {
        console.log('res1',res)
        let data = res.data
        this.title = res.data.title
        this.list = res.data.list
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
      
      this.currentWeek += 1
      this.getWeekDetail()

    },
    lastWeek() {
      let date = new Date();
      let currentYear = date .getFullYear(); 
      if( this.currentWeek && this.currentWeek > this.getWeek(new Date()) && currentYear== this.currentYear) {
         this.currentWeek -= 1
      }
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
          width 100%;
          height 59px
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
        left:-3px;
        min-height 61px;
        .food-list_odd{
          background:rgba(247,247,247,1);
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
