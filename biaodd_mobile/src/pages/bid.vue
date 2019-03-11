<template>
<div class="bid">
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
    <v-assess @sureFn='assessSure' @canleFn="typeCanle" v-if="screenList[2].active"></v-assess>
    <v-apt v-if="screenList[3].active" @sureFn='aptSure' @canleFn="typeCanle"></v-apt>
  </div>
  <!-- 总条数 -->
  <div class="total">为您搜索到{{total}}条招标信息</div>
  <!-- 列表 -->
  <van-pull-refresh v-model="loading" @refresh="onRefresh">
    <van-list finished-text="没有更多了" @load="onLoad">
      <v-zb v-for="(o,i) of zbList" :key="i" :obj="o"></v-zb>
    </van-list>
  </van-pull-refresh>  
</div>
</template>
<script>
import zbCon from '@/components/zbContent'
import fixHead from '@/components/fixHead'
import search from '@/components/search'
import addr from '@/components/address'
import getType from '@/components/getType'
import assess from '@/components/assess'
import aptitude from '@/components/aptitude'
export default {
    data () {
      return {
        zbList:[],
        loading:false,//是否加载完，false为加载完
        data:{
          pageNo:1,
          pageSize:'10',
          regions:'湖南',
          type: "0",
          projectType:'',
          title: "",
          pbModes:'',
          zzType:''
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
            txt:'评标办法',
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
        //招标
        let that=this;
        this.$http({
            method:'post',
            url: '/notice/queryList',
            data:that.data
        }).then(function(res){
            that.loading = false;
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
        this.zbList=[];
        this.data.pageNo=1;
        this.ajax();
      },
      returnAddress(option){//选择地址
        this.zbList=[];
        this.screenList[0].active=false;
        this.screenList[0].txt=option;
        this.data.regions=option;
        this.data.pageNo=1;
        this.ajax();
      },
      typeSure(option){//类型选择
        this.zbList=[];
        this.screenList[1].active=false;
        this.data.projectType=option;
        this.data.pageNo=1;
        this.ajax();
      },
      assessSure(option){
        this.zbList=[];
        this.screenList[2].active=false;
        this.data.pbModes=option;
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
        this.screenList[3].active=false;
      },
      aptSure(option){
        this.zbList=[];
        // console.log(option);
        this.screenList[3].active=false;
        this.data.zzType=option;
        this.data.pageNo=1;
        this.ajax();
      }
    },
    components:{
        'v-zb':zbCon,
        'v-fix':fixHead,
        'v-search':search,
        'v-addr':addr,
        'v-type':getType,
        'v-assess':assess,
        'v-apt':aptitude
    },
    created(){
      this.data.title = this.$route.query.search ?  this.$route.query.search : ''
    }
}
</script>
<style lang="less" scoped>
.bid {
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