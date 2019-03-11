<template>
<div class="companyList">
  <v-fix :nav="3"></v-fix>
  <!-- 搜索框 -->
  <div class="search">
    <van-search placeholder="请输入搜索关键词" v-model="data.keyWord" @search="searchFn"></van-search>
  </div>
  <!-- 筛选 -->
  <div class="screen-box">
    <div class="condition" :class="{'active':o.active}" v-for="(o,i) of screenList" :key="i" @click="showMask(i)">{{o.txt}}</div>
    <v-addr @addObj="returnAddress" v-if="screenList[0].active" :add="data.regions"></v-addr>
    <v-apt v-if="screenList[2].active" @sureFn='aptSure' @canleFn="typeCanle"></v-apt>
    <v-money @sureFn='moneySure' @canleFn="typeCanle" v-if="screenList[1].active"></v-money>
  </div>
  <!-- 总条数 -->
  <div class="total">为您搜索到{{total}}条企业信息</div>
  <!-- 列表 -->
  <van-pull-refresh v-model="loading" @refresh="onRefresh">
    <van-list finished-text="没有更多了" @load="onLoad" :offset="100" :immediate-check="false">
      <v-qy v-for="(o,i) of zbList" :key="i" :obj="o"></v-qy>
    </van-list>
  </van-pull-refresh>  
</div>
</template>
<script>
import qy from '@/components/qy'
import fixHead from '@/components/fixHead'
import search from '@/components/search'
import addr from '@/components/address'
import aptitude from '@/components/aptitude'
import money from '@/components/money'
export default {
    data () {
      return {
        isScroll:true,
        zbList:[],
        loading:false,//是否加载完，false为加载完
        data:{
          pageNo:1,
          pageSize:10,
          regisAddress:'湖南',
          minCapital: "0",
          maxCapital:'',
          keyWord: "",
          // levelRank: "",
          // qualCode:'',
          // rangeType: "and"
        },
        total:0,
        screenList:[
          {
            txt:'地区',
            active:false,
          },{
            txt:'注册资金',
            active:false
          },{
            txt:'资质要求',
            active:false
          },
        ],
      }
    },
    methods: {
      onRefresh(){//下拉刷新
        this.zbList=[];
        setTimeout(() => {
          this.data.pageNo=1;
          this.ajax();
        }, 500);
      },
      ajax(){
        if(!this.isScroll){
            return false
        }
        this.isScroll=false;
        let that=this;
        //企业
        this.$http({
            method:'post',
            url: '/company/query/filter',
            data:that.data
        }).then(function(res){
            that.loading = false;
            that.total=res.data.total;
            if(that.zbList==0||that.data.pageNo==1){
              that.zbList=res.data.data;
            }else{
              that.zbList=that.zbList.concat(res.data.data)
            }
            that.isScroll=true;
        })
      },
      onLoad(){//下滚加载
        this.data.pageNo++;
        this.ajax();
      },
      searchFn(){//搜索
        this.zbList=[];
        this.data.pageNo=1;
        this.ajax();
      },
      returnAddress(option){//选择地址
        this.zbList=[];
        this.screenList[0].active=false;
        this.screenList[0].txt=option;
        this.data.regisAddress=option;
        this.data.pageNo=1;
        this.ajax();
      },
      showMask(i){//
        if(this.screenList[i].active){
          this.screenList[i].active=false
        }else{
          for(let x of this.screenList){
            x.active=false
          }
          this.screenList[i].active=true;
        }
      },
      typeCanle(){
        this.screenList[1].active=false;
        this.screenList[2].active=false;
      },
      aptSure(option){
        // console.log(option);
        this.zbList=[];
        this.screenList[2].active=false;
        this.data.qualCode=option;
        this.data.pageNo=1;
        this.ajax();
      },
      moneySure(option){
        this.zbList=[];
        if(option==1){
              this.data.maxCapital='500'
        }else if(option==2){
            this.data.minCapital='500';
            this.data.maxCapital='1000';
        }else if(option==3){
            this.data.minCapital='1000';
            this.data.maxCapital='5000';
        }else if(option==4){
            this.data.minCapital='5000';
        }
        this.screenList[1].active=false;
        this.data.pageNo=1;
        this.ajax();
      }
    },
    components:{
        'v-qy':qy,
        'v-fix':fixHead,
        'v-search':search,
        'v-addr':addr,
        'v-apt':aptitude,
        'v-money':money,
    },
    created(){
      this.data.title = this.$route.query.search ?  this.$route.query.search : '';
      this.ajax();
    }
}
</script>
<style lang="less" scoped>
.companyList {
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
}
</style>