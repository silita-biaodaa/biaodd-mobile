<template>
<div class="companyList">
  <v-fix :nav="3"></v-fix>
  <!-- 搜索框 -->
  <div class="search">
    <van-search placeholder="请输入关键字进行搜索" v-model="data.keyWord" @search="searchFn" @clear="clearFn"></van-search>
  </div>
  <!-- 筛选 -->
  <div class="screen-box">
    <div class="condition" :class="{'active':o.active}" v-for="(o,i) of screenList" :key="i" @click="showMask(i)">{{o.txt}}</div>
    <v-addr @addObj="returnAddress" v-if="screenList[0].active" :add="data.regisAddress" :type="1"></v-addr>
    <v-apt v-if="screenList[2].active" @sureFn='aptSure'  @recordFn="recordFn" :arr="screenNum.arr"></v-apt>
    <v-money @sureFn='moneySure' @canleFn="typeCanle" v-if="screenList[1].active" :data="screenNum.data"></v-money>
  </div>
  <!-- 总条数 -->
  <div class="total">为您搜索到{{total}}家企业信息</div>
  <!-- 列表 -->
  <template v-if="isajax">
    <template v-if="zbList.length>0">
      <!-- <van-pull-refresh v-model="loading" @refresh="onRefresh"> -->
        <van-list finished-text="没有更多了"  @load="onLoad" :error.sync="error" error-text="请求失败，点击重新加载" :offset="200" :finished="finished" :immediate-check="false">
          <v-qy v-for="(o,i) of zbList" :key="i" :obj="o"></v-qy>
        </van-list>
      <!-- </van-pull-refresh>   -->
    </template>
    <template v-else>
        <v-not :isError="isError"></v-not>
    </template>
  </template>
  <template v-else>
    <van-loading size="50px"></van-loading>
    <p style="text-align: center;margin-top:30px">拼命加载中</p>
  </template>
  <v-vip :mask="isvip" :txt="'筛选功能请开通会员哟~'"></v-vip>
</div>
</template>
<script>
import qy from '@/components/qy'
import fixHead from '@/components/fixHead'
import search from '@/components/search'
import addr from '@/components/address'
import aptitude from '@/components/aptitude'
import money from '@/components/money'
import not from '@/components/not'
export default {
    data () {
      return {
        isvip:false,
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
          isVip:0,
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
        screenNum:{
          arr:[],
          data:{
            num:0,
            projSumStart:'',
            projSumEnd:''
          }
        },
        isajax:false,//是否加载完
        isError:false,//是否加载失败
        finished:false,//是否加载完
        error:false,
        vipStr:'',
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
              that.isajax=true;
            }else{
              that.zbList=that.zbList.concat(res.data.data)
            }
            if(res.data.total==that.zbList.length||that.zbList.length<that.data.pageSize){
                that.finished=true;//如果返回总条数等于当前list长度
            }
            that.isScroll=true;
        }).catch(function(res){
            that.isajax=true;
            that.isError=true;
            if(that.zbList.length>0){
                that.error = true;
            }
        })
      },
      onLoad(){//下滚加载
        if(!this.isScroll){
            return false
        }
        this.data.pageNo++;
        this.ajax();
      },
      searchFn(){//搜索
        this.isajax=false;
        this.zbList=[];
        this.data.pageNo=1;
        this.ajax();
      },
      returnAddress(option){//选择地址
        this.isajax=false;
        this.zbList=[];
        this.screenList[0].active=false;
        this.screenList[0].txt=option.txt;
        this.data.regisAddress=option.str;
        this.data.pageNo=1;
        this.ajax();
      },
      showMask(i){//
        if(this.vipStr.indexOf('comFilter')==-1&&i!=0){
          this.isvip=true;
          this.modalHelper.afterOpen();
          return false
        } 
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
        this.isajax=false;
        // console.log(option);
        this.zbList=[];
        this.screenList[2].active=false;
        this.data.qualCode=option.str;
        this.screenNum.arr=option.list;
        this.data.pageNo=1;
        this.ajax();
      },
      moneySure(option){
        this.isajax=false;
        this.zbList=[];
        if(option.num==1){
            this.data.minCapital='500';
            this.data.maxCapital='1000';
        }else if(option.num==2){
            this.data.minCapital='1000';
            this.data.maxCapital='5000';
        }else if(option.num==3){
            this.data.minCapital='5000';
            this.data.maxCapital='10000';
        }else if(option.num==4){
            this.data.minCapital='10000';
        }else{
            this.data.minCapital=option.projSumStart;
            this.data.maxCapital=option.projSumEnd;
        }
        this.screenNum.data=option;
        this.screenList[1].active=false;
        this.data.pageNo=1;
        this.ajax();
      },
      clearFn(){
        this.data.keyWord=''
      },
      recordFn(){
        this.data.qualCode='';
        this.isajax=false;
        this.zbList=[];
        this.screenList[2].active=false;
        this.screenNum.arr=[];
        this.data.pageNo=1;
        this.ajax();
      },
    },
    components:{
        'v-qy':qy,
        'v-fix':fixHead,
        'v-search':search,
        'v-addr':addr,
        'v-apt':aptitude,
        'v-money':money,
        'v-not':not,
    },
    created(){
      this.data.keyWord = this.$route.query.search ?  this.$route.query.search : '';
      this.data.regisAddress = sessionStorage.getItem('address');
      this.screenList[0].txt=sessionStorage.getItem('address');
      if(sessionStorage.getItem('permissions')){
        this.vipStr=sessionStorage.getItem('permissions');
        this.data.isVip=1;
      }
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
      max-width: calc((100% - 85px)/3);
      align-items: center;
      text-overflow:ellipsis;
      white-space:nowrap;
      overflow: hidden;
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