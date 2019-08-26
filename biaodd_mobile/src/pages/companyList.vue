<template>
<div class="companyList">
  <v-fix :nav="3"></v-fix>
  <!-- 搜索框 -->
  <div class="search">
    <van-search placeholder="请输入企业名称或法人名称" v-model="data.keyWord" @search="searchFn" @clear="clearFn"  @focus='jumpS' ></van-search>
  </div>
  <!-- 筛选 -->
  <div class="screen-box">
    <div class="condition" :class="{'active':screenShow[i].active}" v-for="(o,i) of screenList" :key="i" @click="showMask(i)">
      <span>{{o.txt}}</span>
      <i></i>
    </div>
    <v-addr @addObj="returnAddress" v-if="screenShow[0].active" :add="add" :allress='true'  :type="1"></v-addr>
    <v-apt v-if="screenShow[1].active" @sureFn='aptSure'  @recordFn="recordFn" :arr="screenNum.arr" :bizType="2" ></v-apt>
    <r-ecord v-if="screenShow[2].active"  @sureFn='recSure' @recordFn="recodeFn"  ></r-ecord>
    <g-lory v-if="screenShow[3].active" @sureFn='gloSure'  @recordFn="gloryFn" ></g-lory>
    <!-- <v-money @sureFn='moneySure' @canleFn="typeCanle" v-if="screenList[1].active" :data="screenNum.data"></v-money> -->
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
        <v-not :isError="isError"  :hint="'Sorry，没有找到符合条件的企业信息'" ></v-not>
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
import qy from '@/components/qy'
import fixHead from '@/components/fixHead'
import search from '@/components/search'
import addr from '@/components/address'
import aptitude from '@/components/aptitude'
import record from '@/components/record'
import glory from '@/components/glory'
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
          qualCode:'',
          isBei:'',
          honorCate:''
          // rangeType: "and"
        },
        total:0,
        screenList:[
          {
            txt:'地区',
            active:false,
          },{
            txt:'资质要求',
            active:false
          },
        ],
        screenShow:[
          {
           active:false,
        },{
           active:false,
        },{
           active:false,
        },{
           active:false,
        }],
        ecord:false,
        lory:false,
        screenNum:{
          arr:[],
          data:{
            num:0,
            projSumStart:'',
            projSumEnd:''
          },
          isBei:{
            code:''
          },
          honorCate:{
            code:''
          }
        },
        isajax:false,//是否加载完
        isError:false,//是否加载失败
        finished:false,//是否加载完
        error:false,
        vipStr:'',
        add:{}
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
        if(that.data.regisAddress == '全部') {
          that.data.regisAddress = ''
        }
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
      jumpS() {
        this.$router.push({ path:'/history', query:{path:'/company',lo:'comL'}});
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
        this.screenShow[0].active=false;
        this.screenList[0].txt=option.txt;
        if(this.screenList[0].txt == '湖南省' ) {
          if(this.screenList.length == 2) {
             this.screenList.push({txt:'备案地区'},{txt:'荣誉类别'})
          }
         
        } else {
           this.screenList.length = 2
           this.screenNum.honorCate.code= '';
           this.screenNum.isBei.code= '';
        }
        this.add = {}
        this.add.regions = option.str
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
 
          if(this.screenShow[i].active){
              this.screenShow[i].active=false
          }else{
            for(let x of this.screenShow){
              x.active=false
            }
            this.screenShow[i].active=true;
          }
        
      },
      // typeCanle(){
      //   this.screenList[1].active=false;
      //   this.screenList[2].active=false;
      // },
      aptSure(option){
        this.isajax=false;
        this.zbList=[];
        this.screenShow[1].active=false;
        let str=option.str;
        this.data.qualCode=str;
        this.screenNum.arr=option.list;
        this.data.pageNo=1;
        this.ajax();
      },
      recSure(option) {
        this.isajax=false;
        this.screenShow[2].active=false;
        let str=option.str;
        this.screenNum.isBei.code= str;
        this.data.isBei=str;
        this.data.pageNo=1;
        this.ajax();
      },
      gloSure(option) {
        this.isajax=false;
        this.screenShow[3].active=false;
        let str=option.str;
        this.screenNum.honorCate.code= str;
        this.data.honorCate=str;
        this.data.pageNo=1;
        this.ajax();
      },
      gloryFn() {
        this.isajax=false;
        this.screenShow[3].active=false;
        this.screenNum.honorCate.code= '';
        this.data.honorCate='';
        this.data.pageNo=1;
        this.ajax();
      },
      recodeFn() {
        this.isajax=false;
        this.screenShow[2].active=false;
        this.screenNum.isBei.code= '';
        this.data.isBei='';
        this.data.pageNo=1;
        this.ajax();
      },
      // moneySure(option){
      //   this.isajax=false;
      //   this.zbList=[];
      //   if(option.num==1){
      //       this.data.minCapital='500';
      //       this.data.maxCapital='1000';
      //   }else if(option.num==2){
      //       this.data.minCapital='1000';
      //       this.data.maxCapital='5000';
      //   }else if(option.num==3){
      //       this.data.minCapital='5000';
      //       this.data.maxCapital='10000';
      //   }else if(option.num==4){
      //       this.data.minCapital='10000';
      //   }else{
      //       this.data.minCapital=option.projSumStart;
      //       this.data.maxCapital=option.projSumEnd;
      //   }
      //   this.screenNum.data=option;
      //   this.screenList[1].active=false;
      //   this.data.pageNo=1;
      //   this.ajax();
      // },
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
        'r-ecord':record,
        'g-lory':glory,
        'v-not':not,
    },
    created(){
      if(this.$route.query.key || this.$route.query.scom ) {
         let data=JSON.parse(sessionStorage.getItem('companyData'))
         this.data=data;
         if(sessionStorage.getItem('companyScreenNum')) {
           let screenNum = JSON.parse(sessionStorage.getItem('companyScreenNum'))
           this.screenNum= screenNum;
         }
         this.add.name = data.regisAddress
         let arr = data.regisAddress.split('||')         
         this.screenList[0].txt = arr[0]
      } else {
           this.data.regisAddress = JSON.parse(sessionStorage.getItem('address')) ? JSON.parse(sessionStorage.getItem('address')).name : '湖南省';
           if( JSON.parse(sessionStorage.getItem('address'))) {
                if(JSON.parse(sessionStorage.getItem('address')).name ) {
                     this.screenList[0].txt=  JSON.parse(sessionStorage.getItem('address')).name 
                } else {
                   this.screenList[0].txt=  '湖南省' ;
                }
            } else {
                this.screenList[0].txt= '湖南省' ;
            }
          this.add.name = (sessionStorage.getItem('companyData')) ? JSON.parse(sessionStorage.getItem('companyData')).regisAddress :  (JSON.parse(sessionStorage.getItem('address')) ? JSON.parse(sessionStorage.getItem('address')).name : '湖南省')
          if(sessionStorage.getItem('companyData')&&sessionStorage.getItem('companyScreenNum')){//刷新保存筛选
            let data=JSON.parse(sessionStorage.getItem('companyData')),
                screenNum=JSON.parse(sessionStorage.getItem('companyScreenNum'));
            data.pageNo=1;
            this.data=data;
            this.screenNum=screenNum;
          }
      }
   

      if(sessionStorage.getItem('permissions')){
        this.vipStr=sessionStorage.getItem('permissions');
        this.data.isVip=1;
      }
      if(this.screenList[0].txt == '湖南省') {
         if(this.screenList.length == 2) {
             this.screenList.push({txt:'备案地区'},{txt:'荣誉类别'})
          }
      } else {
         this.screenList.length = 2
         this.screenNum.honorCate.code= '';
         this.screenNum.isBei.code= '';
      }
      this.data.keyWord = this.$route.query.key ?  this.$route.query.key :  this.$route.query.scom ? this.$route.query.scom : '';
      this.ajax();
    },
    watch:{
      data:{
        deep:true,
        handler(val,old){
          sessionStorage.setItem('companyData',JSON.stringify(val));
        }
      },
      screenNum:{
        deep:true,
        handler(val,old){
          sessionStorage.setItem('companyScreenNum',JSON.stringify(val));
        }
      }
    },
    beforeDestroy(){
      // sessionStorage.removeItem('companyData')
      // sessionStorage.removeItem('companyScreenNum')
    },
}
</script>
<style lang="less" scoped>
.companyList {
  padding-top: 200px;
  .screen-box .condition{
    max-width: calc((100% - 92px)/3);
  }
}
</style>