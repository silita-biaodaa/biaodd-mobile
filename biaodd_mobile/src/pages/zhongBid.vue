<template>
<div class="zhongBid">
  <v-fix :nav="1"></v-fix>
  <!-- 搜索框 -->
  <div class="search">
    <van-search placeholder="请输入搜索关键词" v-model="data.title" @search="searchFn"></van-search>
  </div>
  <!-- 筛选 -->
  <div class="screen-box">
    <div class="condition" :class="{'active':o.active}" v-for="(o,i) of screenList" :key="i" @click="showMask(i)">{{o.txt}}</div>
    <v-addr @addObj="returnAddress" v-if="screenList[0].active" :add="data.regions"></v-addr>
    <v-type @sureFn='typeSure' @canleFn="typeCanle" v-if="screenList[1].active"></v-type>
    <div class="money" v-if="screenList[2].active">
        <div class="box">
            <div class="top-box">
                <p>
                    <input type="number" placeholder="最低价" v-model="data.projSumStart"/>
                </p>
                <p class="line"></p>
                <p>
                    <input type="number" placeholder="最高价" v-model="data.projSumEnd"/>
                </p>
            </div>
            <ul>
                <li v-for="(o,i) of moneyList" :key="i">
                    <span :class="moneyNum==i?'active':''" @click="moneyNum=i;">{{o}}</span>
                </li>
            </ul>
        </div>
        <div class="btn">
            <button class="canle" @click="typeCanle">取消</button>
            <button class="sure" @click="sureFn">确定</button>
        </div>
    </div>
  </div>
  <!-- 总条数 -->
  <div class="total">为您搜索到{{total}}条中标信息</div>
  <!-- 列表 -->
  <van-pull-refresh v-model="loading" @refresh="onRefresh">
    <van-list finished-text="没有更多了" @load="onLoad">
      <v-zb v-for="(o,i) of zbList" :key="i" :obj="o"></v-zb>
    </van-list>
  </van-pull-refresh>  
</div>
</template>
<script>
import zbCon from '@/components/zhongbCon'
import fixHead from '@/components/fixHead'
import search from '@/components/search'
import addr from '@/components/address'
import getType from '@/components/getType'
export default {
    data () {
      return {
        zbList:[],
        loading:false,//是否加载完，false为加载完
        data:{
          pageNo:1,
          pageSize:'10',
          regions:'湖南',
          type: "2",
          projectType:'',
          title: "",
          projSumStart:'',//中标开始金额
          projSumEnd:'',//中标结束金额
          sumType:"zhongbiao"
        },
        total:0,
        screenList:[
          {
            txt:'地区',
            active:false,
          },{
            txt:'类型',
            active:false
          },{
            txt:'中标金额',
            active:false
          },
        ],
        moneyList:['全部','500万以下','500-1000万','1000-2000万','2000万以上'],
        moneyNum:0
      }
    },
    methods: {
      onRefresh(){//下拉刷新
        setTimeout(() => {
          this.data.pageNo=1;
          this.ajax();
        }, 500);
      },
      ajax(){
        //中标
        let that=this;
        this.$http({
            method:'post',
            url: '/notice/queryList',
            data:that.data
        }).then(function(res){
            that.loading = false;
            that.data.projSumStart='';
            that.data.projSumEnd='';
            that.total=res.data.total;
            if(that.zbList==0||that.data.pageNo==1){
              that.zbList=res.data.data;
            }else{
              that.zbList=that.zbList.concat(res.data.data)
            }
            
        })
      },
      onLoad(){//下滚加载
        this.data.pageNo++;
        this.ajax();
      },
      searchFn(){//搜索
        this.data.pageNo=1;
        this.ajax();
      },
      returnAddress(option){//选择地址
        this.screenList[0].active=false;
        this.screenList[0].txt=option;
        this.data.regions=option;
        this.data.pageNo=1;
        this.ajax();
      },
      typeSure(option){//类型选择
        this.screenList[1].active=false;
        this.data.projectType=option;
        this.data.pageNo=1;
        this.ajax();
      },
      showMask(i){//
        this.screenList[i].active=!this.screenList[i].active;
      },
      typeCanle(){
        this.screenList[1].active=false;
        this.screenList[2].active=false;
      },
      sureFn(){
          if(this.moneyNum==1){
                this.data.projSumEnd='500'
          }else if(this.moneyNum==2){
              this.data.projSumStart='500';
              this.data.projSumEnd='1000';
          }else if(this.moneyNum==3){
              this.data.projSumStart='1000';
              this.data.projSumEnd='2000';
          }else if(this.moneyNum==4){
              this.data.projSumStart='2000';
          }
          this.screenList[2].active=false;
          this.data.pageNo=1;
          this.moneyNum=0;
          this.ajax();
      }
    },
    components:{
        'v-zb':zbCon,
        'v-fix':fixHead,
        'v-search':search,
        'v-addr':addr,
        'v-type':getType,
    },
    created(){
      this.data.title = this.$route.query.search ?  this.$route.query.search : ''
    }
}
</script>
<style lang="less" scoped>
.zhongBid {
  padding-top: 200px;
  /*筛选*/
  .screen-box{
    position: relative;
    height: 80px;
    display: flex;
    background: #fff;
    align-items: center;
    font-size: 28px;
    padding: 0 32px;
    justify-content: space-between;
    .condition{
      display: flex;
      align-items: center;
    }
    .condition.active{
      color: #FE6603
    }
    .condition.active::after{
      content:'';
      width: 0;
      height: 0;
      margin-left: 12px;
      margin-bottom: 7px;
      border-left: 7px solid transparent;
      border-right: 7px solid transparent;
      border-bottom: 7px solid #FE6603;
      border-top: 7px solid transparent;
    }
    .condition::after{
      content:'';
      width: 0;
      height: 0;
      margin-left: 12px;
      margin-top: 7px;
      border-left: 7px solid transparent;
      border-right: 7px solid transparent;
      border-top: 7px solid #333;
      border-bottom: 7px solid transparent;
    }
  }
  /*总条数*/
  .total{
    font-size: 24px;
    color: #999;
    padding: 24px 32px;
    background: #f5f5f5
  }

  .money{
    position: absolute;
    height: 566px;
    background: #f5f5f5;
    bottom: -566px;
    left: 0;
    z-index: 9;
    width: 100%;
    padding:50px 0;
    box-sizing: border-box;
    .btn{
        display: flex;
        button{
            height: 84px;
            flex-grow:1;
        }
        .sure{
            background: #FE6603;
            border: 1PX solid #FE6603;
            color: #fff;
        }
        .canle{
            border: 1PX solid #CCBEBE;
            color: #333;
            background: #fff;
        }
    }
    .box{
        .top-box{
            padding: 8px 32px 0;
            display: flex;
            align-items: center;
            margin-bottom: 32px;
            .line{
                width: 35px;
                height: 1PX;
                background: #CCBEBE;
                margin:0 21px;
            }
            p{
                width: 210px;
                height: 56px;
                border-radius: 56px;
                border: 1PX solid #CCBEBE;
                text-align: center;
                input{
                    background: none;
                    width: 44%;
                    height: 100%;
                    border: none
                }
            }
        }
        ul{
            display: flex;
            flex-wrap: wrap;
            padding: 0 32px;
            margin-bottom: 100px;
            li{
                text-align: center;
                margin-bottom: 32px;
                // width: 50%;
                span{
                    margin-right: 40px;
                    padding: 15px 40px;
                    display: inline-block;
                    border-radius:10px;
                    text-align: center;
                    color: #999;
                    border: 1PX solid #CCBEBE
                }
                .active{
                    border-color: #FE6603;
                    background: #FE6603;
                    color: #fff;
                }
            }
        }
    }
  }
}
</style>