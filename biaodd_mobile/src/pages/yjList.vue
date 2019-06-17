<template>
<div class="bid">
    <v-fix :nav="4"></v-fix>
    <!-- 搜索框 -->
    <div class="search">
        <van-search placeholder="请输入项目名称或企业名称" v-model="data.proName"  @focus='jumpS'></van-search>
    </div>
    <!-- 筛选 -->
    <div class="screen-box">
        <div class="condition" :class="{'active':o.active}" v-for="(o,i) of screenList" :key="i" @click="showMask(i)">
            <span>{{o.txt}}</span>
            <i></i>
        </div>
        <!--地区 -->
        <v-addr @addObj="returnAddress" v-if="screenList[0].active" :add="data.area"  :allress='true'  :type="2"></v-addr>
        <!-- 项目类别 -->
        <div class="tabType condition-box" v-if="screenList[1].active">
             <div class="yj-chce" >
                <ul>
                    <li v-for="(o,i) in tabTypeList" :key="i"><span :class="screenData.tabTypeNum==i?'active':''" @click="screenData.tabTypeNum=i">{{o}}</span></li>
                </ul>
             </div>               
            <div class="btn">
                <button class="sure" @click.stop="tabTypeTapFn">确定</button>
            </div>
        </div>
        <!-- 第三个筛选条件 -->
        <div class="three condition-box" v-if="screenList[2].active">
            <div class="yj-chce" >
                <ul>
                    <li v-for="(o,i) in threeList" :key="i"><span :class="screenData.threeNum==i?'active':''" @click="screenData.threeNum=i">{{o}}</span></li>
                </ul>
             </div>   
            <div class="btn">
                <button class="sure" @click.stop="threeTapFn">确定</button>
            </div>
        </div>
        <!-- 第四个筛选条件 -->
        <div class="four condition-box" v-if="screenList[3].active">
            <div class="box yj-chce">
                <div class="top">
                    <h6>合同金额</h6>
                    <div class="money-box">
                        <input placeholder="最低价（万）" v-model="data.amountStart" @click="datePickFn(0)"/>
                        <span>—</span>
                        <input placeholder="最高价（万）" v-model="data.amountEnd"  @click="datePickFn(1)"/>
                    </div>
                    <ul>
                        <li v-for="(o,i) of moneyList" :key="i">
                            <span :class="screenData.moneyNum==i?'active':''" @click="screenData.moneyNum=i;data.amountStart='';data.amountEnd='';">{{o}}</span>
                        </li>
                    </ul>
                </div>
                <div class="top">
                    <h6>竣工时间</h6>
                    <div class="money-box">
                        <span @click="dateTapFn(0)" class="date-select" :class="data.buildStart==''?'empty':''">{{data.buildStart==''?'起始时间':data.buildStart}}</span>
                        <span>—</span>
                        <span @click="dateTapFn(1)" class="date-select" :class="data.buildEnd==''?'empty':''">{{data.buildEnd==''?'结束时间':data.buildEnd}}</span>
                    </div>
                    <ul>
                        <li v-for="(o,i) of dateList" :key="i">
                            <span :class="screenData.dateNum==i?'active':''" @click="dateFn(i)">{{o}}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="btn">
                <button class="sure" @click.stop="fourTapFn">确定</button>
            </div>
        </div>
    </div>
    <!-- 总条数 -->
    <div class="total">为您搜索到{{total}}条业绩信息</div>
    <!-- 列表 -->
    <template v-if="isajax">
        <template v-if="zbList&&zbList.length>0">
        <!-- <van-pull-refresh v-model="loading" @refresh="onRefresh"> -->
            <van-list finished-text="没有更多了"  @load="onLoad" :error.sync="error" error-text="请求失败，点击重新加载" :offset="200" :finished="finished" :immediate-check="false">
            <v-yj v-for="(o,i) of zbList" :key="i" :obj="o" :type="data.tabType"></v-yj>
            </van-list>
        <!-- </van-pull-refresh>   -->
        </template>
        <template v-else>
            <v-not :isError="isError" :hint="'Sorry，没有找到符合条件的业绩信息'" ></v-not>
        </template>
    </template>
    <template v-else>
        <van-loading size="50px"></van-loading>
        <p style="text-align: center;margin-top:30px">拼命加载中</p>
    </template>
    <van-popup position="bottom" :overlay="true" v-model="dateMask">
        <van-datetime-picker
        type="date"
        :max-date="new Date()"
        @confirm="confirm"
        @cancel="dateMask=false"
        ></van-datetime-picker>
    </van-popup>
</div>
</template>
<script>
import yjCon from '@/components/yjContent'
import fixHead from '@/components/fixHead'
import search from '@/components/search'
import addr from '@/components/address'
import not from '@/components/not'
export default {
    name:'yjList',
    data () {
      return {
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
        screenData:{
            tabTypeNum:0,
            threeNum:0,
            moneyNum:0,
            dateNum:0,
        },
        tabTypeList:['住建部','水利部','交通部'],
        threeList:['全部','房屋建筑','市政工程','其他'],
        moneyList:['全部','1000万以下','1000-5000万'],
        dateList:['全部','近三年','近五年'],
        dateMask:false,//时间选择弹窗是否显示
        isDateStart:true,//是否是开启时间
        isajax:false,//是否加载完
        isError:false,//是否加载失败
        finished:false,//是否加载完
        error:false,
        vipStr:'',//会员权限
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
             if(that.data.area == '全部') {
              that.data.area = ''
            }
            this.$http({
                method:'post',
                url: '/project/query',
                data:that.data
            }).then(function(res){
                that.loading = false;
                if(res.data.data) {
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
                } else {
                    that.isajax=true;
                    that.isError=false;
                    // if(that.zbList&&that.zbList.length>0){
                    //  that.error = true;
                    // }
                }
              
            }).catch(function(res){
                that.isajax=true;
                that.isError=true;
                if(that.zbList&&that.zbList.length>0){
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
            if(this.screenList[i].active){
            this.screenList[i].active=false
            }else{
            for(let x of this.screenList){
                x.active=false
            }
            this.screenList[i].active=true;
            }
        },
        tabTypeTapFn(){//项目类型切换
            this.screenData.threeNum=0;
            this.screenList[1].active=false;
            if(this.screenData.tabTypeNum==0){
                this.data.tabType='project';
                this.screenList[1].txt='住建部';
                this.screenList[2].txt='项目类别';
                this.threeList=['全部','房屋建筑','市政工程','其他'];
            }else if(this.screenData.tabTypeNum==1){
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
            if(this.screenData.threeNum!=0){
                this.data.proType=this.threeList[this.screenData.threeNum];
            }
            this.isajax=false;
            this.zbList=[];
            this.data.pageNo=1;
            this.ajax();
        },
        fourTapFn(){
            // this.modalHelper.beforeClose();
            this.screenList[3].active=false;
            if(this.screenData.moneyNum!=0){//金额
                if(this.screenData.moneyNum==1){
                    this.data.amountStart='0';
                    this.data.amountEnd='1000'
                }else if(this.screenData.moneyNum==2){
                    this.data.amountStart='1000';
                    this.data.amountEnd='5000'
                }
            }
            let date=new Date();
            let y=date.getFullYear(),
                mon=date.getMonth()+1,
                day=date.getDate();
                mon=mon<10?'0'+mon:mon;
                day=day<10?'0'+day:day;
            if(this.screenData.dateNum==1){
                if(mon=='02'&&day==29){
                    day=28
                }
                this.data.buildEnd=y+'-'+mon+'-'+day;
                this.data.buildStart=(y-3)+'-'+mon+'-'+day;
            }else if(this.screenData.dateNum==2){
                if(mon=='02'&&day==29){
                    day=28
                }
                this.data.buildEnd=y+'-'+mon+'-'+day;
                this.data.buildStart=(y-5)+'-'+mon+'-'+day;
            }
            this.isajax=false;
            this.zbList=[];
            this.data.pageNo=1;
            // this.screenData.dateNum=0;
            this.ajax();
        },
        dateFn(i){
            this.screenData.dateNum=i;
            this.data.buildStart='';
            this.data.buildEnd='';
        },
        dateTapFn(type){
            if(type==1){
                this.isDateStart=false
            }else{
                this.isDateStart=true
            }
            // this.modalHelper.afterOpen();
            this.screenData.dateNum=0;
            this.dateMask=true
        },
        confirm(pick){
            let y=pick.getFullYear(),
                mon=pick.getMonth()+1,
                day=pick.getDate();
                mon=mon<10?'0'+mon:mon;
                day=day<10?'0'+day:day;
            if(this.isDateStart){
                this.data.buildStart=y+'-'+mon+'-'+day
            }else{
                this.data.buildEnd=y+'-'+mon+'-'+day
            }
            this.dateMask=false    
        },
        jumpS() {
          this.$router.push({ path:'/history', query:{path:'/yjList',lo:'yjL'}});  
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
      this.data.proName = this.$route.query.scom ? this.$route.query.scom  : this.$route.query.key ? this.$route.query.key : '' ;
      this.data.area = sessionStorage.getItem('address');
      this.screenList[0].txt=sessionStorage.getItem('address');
      if(sessionStorage.getItem('permissions')){
        this.vipStr=sessionStorage.getItem('permissions');
      }
      if(sessionStorage.getItem('yjData')&&sessionStorage.getItem('yjScreenData')){//刷新保存筛选
        let data=JSON.parse(sessionStorage.getItem('yjData')),
            screenData=JSON.parse(sessionStorage.getItem('yjScreenData'));
        data.pageNo=1;
        this.screenList[0].txt=data.area;//地址
        this.data=data;
        if(screenData.tabTypeNum==0){//重置数组内容
            this.data.tabType='project';
            this.screenList[1].txt='住建部';
            this.screenList[2].txt='项目类别';
            this.threeList=['全部','房屋建筑','市政工程','其他'];
        }else if(screenData.tabTypeNum==1){
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
        this.screenData=screenData;
      }
      this.ajax();
    },
    watch:{
      data:{
        deep:true,
        handler(val,old){
          sessionStorage.setItem('yjData',JSON.stringify(val));
        }
      },
      screenData:{
        deep:true,
        handler(val,old){
          sessionStorage.setItem('yjScreenData',JSON.stringify(val));
        }
      }
    },
    beforeDestroy(){
      sessionStorage.removeItem('yjData')
      sessionStorage.removeItem('yjScreenData')
    },
}
</script>
<style lang="less" scoped>
.bid {
    .condition-box{
        position: absolute;
        background: #f5f5f5;
        bottom:0;
        transform: translateY(100%);
        left: 0;
        z-index: 9;
        width: 100%;
        // height: 595px;
        padding:50px 0 0;
        box-sizing: border-box;
    }
    .yj-chce {
        height: 545px;
        box-sizing: border-box;
        overflow-y: auto;
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
       
    }
     button{
            width: 100%;
            height: 84px;
            background: #FE6603;
            color: #fff;
            border: none;
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
        .condition-box{
           
            li{
                margin-bottom: 64px;
            }
        }
        h6{
            padding-left: 35px;
            margin-bottom: 20px;
            font-size: 28px;
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
                border: 1PX solid #e8e8e8;
                background: #fff;
                outline: medium;
            }
            .date-select{
                width: calc((100% - 100px)/2);
                border-radius: 5px;
                padding: 10px;
                box-sizing: border-box;
                border: 1PX solid #e8e8e8;
                background: #fff;
            }
            .empty{
                color: #999;
            }
        }
    }
}
</style>