<template>
<div class="zhongBid">
  <v-fix :nav="2"></v-fix>
  <!-- 搜索框 -->
  <div class="search">
    <van-search placeholder="请输入关键字进行搜索" v-model="data.title" @search="searchFn" @clear="clearFn"></van-search>
  </div>
  <!-- 筛选 -->
  <div class="screen-box">
    <div class="condition" :class="{'active':o.active}" v-for="(o,i) of screenList" :key="i" @click="showMask(i)">
      <span>{{o.txt}}</span>
      <i></i>
    </div>
    <v-addr @addObj="returnAddress" v-if="screenList[0].active" :add="data.regions"></v-addr>
    <!-- <v-type @sureFn='typeSure' @canleFn="typeCanle" v-if="screenList[1].active"></v-type> -->
    <v-money @sureFn='moneySure' @canleFn="typeCanle" v-if="screenList[1].active" :data="screenData"></v-money>
  </div>
  <!-- 总条数 -->
  <div class="total">为您搜索到{{total}}条中标信息</div>
  <!-- 列表 -->
  <template v-if="isajax">
    <template v-if="zbList.length>0">
      <!-- <van-pull-refresh v-model="loading" @refresh="onRefresh"> -->
        <van-list finished-text="没有更多了"  @load="onLoad" :error.sync="error" error-text="请求失败，点击重新加载" :offset="200" :finished="finished" :immediate-check="false">
          <v-zb v-for="(o,i) of zbList" :key="i" :obj="o"></v-zb>
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
  <v-vip :mask="isvip" :txt="'筛选功能请开通会员'"></v-vip>
</div>
</template>
<script>
import zbCon from '@/components/zhongbCon'
import fixHead from '@/components/fixHead'
import search from '@/components/search'
import addr from '@/components/address'
// import getType from '@/components/getType'
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
          }
          // {
          //   txt:'类型',
          //   active:false
          // }
          ,{
            txt:'中标金额',
            active:false
          },
        ],
        screenData:{
          num:0,
          projSumStart:'',
          projSumEnd:''
        },
        moneyNum:0,
        isajax:false,//是否加载完
        isError:false,//是否加载失败
        finished:false,//是否加载完
        error:false,
        vipStr:'',
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
        this.isScroll=false;
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
        this.data.regions=option.str;
        this.data.pageNo=1;
        this.ajax();
      },
      // typeSure(option){//类型选择
      //   this.isajax=false;
      //   this.zbList=[];
      //   this.screenList[1].active=false;
      //   this.data.projectType=option;
      //   this.data.pageNo=1;
      //   this.ajax();
      // },
      showMask(i){//
        if(this.vipStr.indexOf('bidFilter')==-1&&i!=0){
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
        // this.screenList[2].active=false;
      },
      moneySure(option){
          this.isajax=false;
          this.zbList=[];
          if(option.num==1){
              this.data.projSumStart='500';
              this.data.projSumEnd='1000';
          }else if(option.num==2){
              this.data.projSumStart='1000';
              this.data.projSumEnd='5000';
          }else if(option.num==3){
              this.data.projSumStart='5000';
              this.data.projSumEnd='10000';
          }else if(option.num==4){
              this.data.projSumStart='10000';
          }else{
              this.data.projSumStart=option.projSumStart;
              this.data.projSumEnd=option.projSumEnd;
          }
          this.screenList[1].active=false;
          this.screenData=option;
          this.data.pageNo=1;
          this.ajax();
      },
      clearFn(){
        this.data.title=''
      }
    },
    components:{
        'v-zb':zbCon,
        'v-fix':fixHead,
        'v-search':search,
        'v-addr':addr,
        // 'v-type':getType,
        'v-money':money,
        'v-not':not
    },
    created(){
      this.data.title = this.$route.query.search ?  this.$route.query.search : '';
      this.data.regions = sessionStorage.getItem('address');
      this.screenList[0].txt=sessionStorage.getItem('address');
      if(sessionStorage.getItem('city')){
          this.data.regions=sessionStorage.getItem('address')+'||'+sessionStorage.getItem('city');
          this.screenList[0].txt=sessionStorage.getItem('city');
      }
      if(sessionStorage.getItem('permissions')){
        this.vipStr=sessionStorage.getItem('permissions');
      }
      this.ajax();
    }
}
</script>
<style lang="less" scoped>
.zhongBid {
  padding-top: 200px;
  /*筛选*/
  .screen-box .condition{
    max-width: calc((100% - 92px)/2);
  }
}
</style>