<template>
<div class="bid">
  <v-fix :nav="4"></v-fix>
  <!-- 搜索框 -->
  <div class="search">
    <van-search placeholder="请输入关键字进行搜索" v-model="data.proName" @search="searchFn" @clear="clearFn"></van-search>
  </div>
  <!-- 筛选 -->
  <div class="screen-box">
    <div class="condition" :class="{'active':o.active}" v-for="(o,i) of screenList" :key="i" @click="showMask(i)">{{o.txt}}</div>
    <!--地区 -->
    <v-addr @addObj="returnAddress" v-if="screenList[0].active" :add="data.area" :type="1"></v-addr>
    <!-- 项目类别 -->
    <div class="tabType condition-box" v-if="screenList[1].active">
        <ul>
            <li v-for="(o,i) in tabTypeList" :key="i"><span :class="tabTypeNum==i?'active':''" @click="tabTypeNum=i">{{o}}</span></li>
        </ul>
        <div class="btn">
            <button class="sure" @click="tabTypeTapFn">确定</button>
        </div>
    </div>
    <!-- 第三个筛选条件 -->
    <div class="three condition-box" v-if="screenList[2].active">
        <ul>
            <li v-for="(o,i) in threeList" :key="i"><span :class="threeNum==i?'active':''" @click="threeNum=i">{{o}}</span></li>
        </ul>
        <div class="btn">
            <button class="sure" @click="threeTapFn">确定</button>
        </div>
    </div>
    <!-- 第四个筛选条件 -->
    <div class="four condition-box" v-if="screenList[3].active">
        <div class="box">
            <div class="top">
                <h6>合同金额</h6>
                <div class="money-box">
                    <input placeholder="最低价（万）" v-model="data.amountStart"/>
                    <span>—</span>
                    <input placeholder="最高价（万）" v-model="data.amountEnd"/>
                </div>
                <ul>
                    <li v-for="(o,i) of moneyList" :key="i">
                        <span :class="moneyNum==i?'active':''" @click="moneyNum=i;data.amountStart='';data.amountEnd='';">{{o}}</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="btn">
            <button class="sure" @click="fourTapFn">确定</button>
        </div>
    </div>
  </div>
  <!-- 总条数 -->
  <div class="total">为您搜索到{{total}}条业绩信息</div>
  <!-- 列表 -->
  <template v-if="isajax">
    <template v-if="zbList.length>0">
      <!-- <van-pull-refresh v-model="loading" @refresh="onRefresh"> -->
        <van-list finished-text="没有更多了"  @load="onLoad" :error.sync="error" error-text="请求失败，点击重新加载" :offset="200" :finished="finished" :immediate-check="false">
          <v-yj v-for="(o,i) of zbList" :key="i" :obj="o" :type="data.tabType"></v-yj>
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
import yjCon from '@/components/yjContent'
import fixHead from '@/components/fixHead'
import search from '@/components/search'
import addr from '@/components/address'
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
          area:'湖南',
          tabType:'project',//project住建
          proType:'',
          proName:'',
          amountStart:'',
          amountEnd:'',
          buildStart:'',
          buildEnd:'',
        },
        total:0,
        screenList:[
          {
            txt:'地区',
            active:false,
          },{
            txt:'住建部',
            active:false
          },{
            txt:'项目类别',
            active:false
          },{
            txt:'更多',
            active:false
          },
        ],
        tabTypeList:['住建部','水利部','交通部'],
        tabTypeNum:0,
        threeList:['全部','房屋建筑','市政工程','其他'],
        threeNum:0,
        moneyList:['全部','1000万以下','1000-5000万'],
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
            this.zbList=[];
            setTimeout(() => {
            this.data.pageNo=1;
            this.ajax();
            }, 500);
        },
        ajax(){
            //招标
            this.isScroll=false;
            let that=this;
            this.$http({
                method:'post',
                url: '/project/query',
                data:that.data
            }).then(function(res){
                that.loading = false;
                that.total=res.data.total;
                if(that.zbList.length==0||that.data.pageNo==1){
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
            this.data.area=option.str;
            this.data.pageNo=1;
            this.ajax();
        },
        showMask(i){// 
            if(this.vipStr.indexOf('tenderFilter')==-1&&i!=0){
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
        clearFn(){
            this.data.proName=''
        },
        tabTypeTapFn(){//项目类型切换
            this.threeNum=0;
            this.screenList[1].active=false;
            if(this.tabTypeNum==0){
                this.data.tabType='project';
                this.screenList[1].txt='住建部';
                this.screenList[2].txt='项目类别';
                this.threeList=['全部','房屋建筑','市政工程','其他'];
            }else if(this.tabTypeNum==1){
                this.data.tabType='shuili';
                this.screenList[1].txt='水利部';
                this.screenList[2].txt='业绩类型';
                this.threeList=['全部','施工','监理','设计','勘察','招标代理','检测','供货','咨询','机械制造','移民监督']
            }else{
                this.data.tabType='jiaotong';
                this.screenList[1].txt='交通部';
                this.screenList[2].txt='信息来源';
                this.threeList=['全部','省厅录入','省厅审核']
            }
            this.isajax=false;
            this.zbList=[];
            this.data.pageNo=1;
            this.ajax();
        },
        threeTapFn(){//第三个筛选条件
            this.screenList[2].active=false;
            if(this.threeNum!=0){
                this.data.proType=this.threeList[this.threeNum];
            }
            this.isajax=false;
            this.zbList=[];
            this.data.pageNo=1;
            this.ajax();
        },
        fourTapFn(){
            this.screenList[3].active=false;
            if(this.moneyNum!=0){//金额
                if(this.moneyNum==1){
                    this.data.amountStart='0';
                    this.data.amountEnd='1000'
                }else if(this.moneyNum==2){
                    this.data.amountStart='1000';
                    this.data.amountEnd='5000'
                }
            }
            this.isajax=false;
            this.zbList=[];
            this.data.pageNo=1;
            this.ajax();
        }
    },
    components:{
        'v-yj':yjCon,
        'v-fix':fixHead,
        'v-search':search,
        'v-addr':addr,
        'v-not':not
    },
    created(){
      this.data.proName = this.$route.query.search ?  this.$route.query.search : '';
      this.data.area = sessionStorage.getItem('address');
      this.screenList[0].txt=sessionStorage.getItem('address');
      if(sessionStorage.getItem('permissions')){
        this.vipStr=sessionStorage.getItem('permissions');
      }
      this.ajax();
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
        max-width: calc((100% - 92px)/4);
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
  
    .condition-box{
        position: absolute;
        background: #f5f5f5;
        bottom:0;
        transform: translateY(100%);
        left: 0;
        z-index: 9;
        width: 100%;
        padding:50px 0 0;
        box-sizing: border-box;
    }
    .condition-box{
        ul{
            display: flex;
            justify-content: space-between;
        }
        li{  
            text-align: center;
            margin-bottom: 128px;
            width: calc(100%/3);
            span{
                display: inline-block;
                border-radius:10px;
                text-align: center;
                width: 176px;
                height: 56px;
                line-height: 56px;
                color: #999;
                border: 1PX solid #CCBEBE;
                background: #fff;
            }
            .active{
                border-color: #FE6603;
                background: #FE6603;
                color: #fff;
            }
        }
        button{
            width: 100%;
            height: 84px;
            background: #FE6603;
            color: #fff;
            border: none;
        }
    }
    .three{
        ul{
            flex-wrap: wrap;
            li{
                margin-bottom: 32px;
            }
        }
    }
    .four{
        .box{
            
        }
        h6{
            padding-left: 35px;
            margin-bottom: 20px;
        }
        .money-box{
            display: flex;
            padding: 0 35px;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 32px;
            span{
                width: 30px;
            }
            input{
                width: calc((100% - 100px)/2);
                border-radius: 5px;
                padding: 10px;
                box-sizing: border-box;
                border: 1PX solid #e8e8e8
            }
        }
    }
}
</style>