<template>
<div class="bid">
  <v-fix :nav="1"></v-fix>
  <!-- 搜索框 -->
  <div class="search">
    <van-search placeholder="请输入公告名称或企业名称" v-model="this.title" @focus='jumpS'></van-search>
  </div>
  <!-- 筛选 -->
  <div class="screen-box">
    <div class="condition" :class="{'active':o.active}" v-for="(o,i) of screenList" :key="i" @click="showMask(i)">
      <span>{{o.txt}}</span>
      <i></i>
    </div>
    <v-addr @addObj="returnAddress" v-if="screenList[0].active" :add="add"></v-addr>
    <v-type @sureFn='typeSure' @canleFn="typeCanle" v-if="screenList[1].active" :num="data.projectType"></v-type>
    <v-assess :selectArr="screenNum.select" :souCode='souCode' @sureFn='assessSure' @canleFn="typeCanle" v-if="screenList[2].active"></v-assess>
    <v-apt v-if="screenList[3].active" @sureFn='aptSure' @recordFn="recordFn" :type="0" :arr="screenNum.arr"></v-apt>
  </div>
  <!-- 总条数 -->
  <div class="total">为您搜索到{{total}}条招标信息</div>
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
        <v-not :isError="isError" :hint="'Sorry，没有找到符合条件的公告信息'"  ></v-not>
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
import zbCon from '@/components/zbContent'
import fixHead from '@/components/fixHead'
import search from '@/components/search'
import addr from '@/components/address'
import getType from '@/components/getType'
import assess from '@/components/assess'
import aptitude from '@/components/aptitude'
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
          regions:'hunan',  // 地区
          type: "1",  // 类型
          projectType:'', // 类型
          title: "",  // 标题
          pbModes:'', // 评标办法
          zzType:'', // 资质
          comName:'' // 企业名称
        },
        total:0,
        title:'',
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
        screenNum:{
          typeNum:0,
          select:[],
          arr:[],
        },
        isajax:false,//是否加载完
        isError:false,//是否加载失败
        finished:false,//是否加载完
        error:false,
        vipStr:'',
        add:{},
        souCode:''
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
            url: '/newnocite/zhaobiao/list',
            data:that.data
        }).then(function(res){
            console.log(res);
            
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
      jumpS() {
          this.$router.push({ path:'/history', query:{path:'/bid',lo:'bidL'}});
      },
      returnAddress(option){//选择地址
        if( this.screenList[0] != option.txt) {
          this.data.pbModes = ''
          sessionStorage.setItem('assess','1')
        } 
        this.isajax=false;
        this.zbList=[];
        this.screenList[0].active=false;
        this.screenList[0].txt=option.txt;
        this.add = {}
        this.add.regions = option.str
        sessionStorage.setItem('bidArea',JSON.stringify(option))
        this.data.regions=option.str;
        let str = this.data.regions.split('||')
        this.souCode = str[0]
        this.data.pageNo=1;
        this.ajax();
      },
      typeSure(option){//类型选择
        this.isajax=false;
        this.zbList=[];
        this.screenList[1].active=false;
        this.data.projectType=option.str;
        // this.screenNum.typeNum=option.index;
        this.data.pageNo=1;
        this.ajax();
      },
      assessSure(option){
        this.isajax=false;
        this.zbList=[];
        this.screenList[2].active=false;
        this.data.pbModes=option.str;
        this.screenNum.select=option.select;
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
      typeCanle(){
        this.screenList[1].active=false;
        this.screenList[2].active=false;
        this.screenList[3].active=false;
      },
      aptSure(option){
        this.isajax=false;
        this.zbList=[];
        // console.log(option);
        this.screenList[3].active=false;
        this.data.zzType=option.str;
        this.screenNum.arr=option.list;
        this.data.pageNo=1;
        this.ajax();
      },
      recordFn(){
        this.screenList[3].active=false;
        this.data.zzType='';
        this.isajax=false;
        this.zbList=[];
        this.screenNum.arr=[];
        this.data.pageNo=1;
        this.ajax();
      },
      gaiaSea() {
        if(this.$route.query.key) {
           this.data.title = this.$route.query.key
        } else {
            this.data.comName = this.$route.query.scom
        }
        this.title = this.$route.query.key ? this.$route.query.key : this.$route.query.scom         
      }
    },
    components:{
        'v-zb':zbCon,
        'v-fix':fixHead,
        'v-search':search,
        'v-addr':addr,
        'v-type':getType,
        'v-assess':assess,
        'v-apt':aptitude,
        'v-not':not
    },
    created(){
      this.gaiaSea()
      this.data.regions = JSON.parse(sessionStorage.getItem('address')) ? JSON.parse(sessionStorage.getItem('address')).code : 'hunan';
      this.add = (sessionStorage.getItem('bidData')) ? JSON.parse(sessionStorage.getItem('bidData')) :  (JSON.parse(sessionStorage.getItem('address')) ? JSON.parse(sessionStorage.getItem('address')) : {name:'湖南省'})
       if(sessionStorage.getItem('bidArea')) {
         
         this.screenList[0].txt = JSON.parse(sessionStorage.getItem('bidArea')).txt
         this.add.name =  JSON.parse(sessionStorage.getItem('bidArea')).str
       } else {
          if( JSON.parse(sessionStorage.getItem('address'))) {
            if(JSON.parse(sessionStorage.getItem('address')).name ) {
                 this.screenList[0].txt=  JSON.parse(sessionStorage.getItem('address')).name 
            } else {
               this.screenList[0].txt=   '湖南省' ;
            }
          } else {
              this.screenList[0].txt=   '湖南省' ;
          }
       }
      
      if(sessionStorage.getItem('permissions')){
        this.vipStr=sessionStorage.getItem('permissions');
      }
      if(sessionStorage.getItem('bidData')){//刷新保存筛选
        let data=JSON.parse(sessionStorage.getItem('bidData'))
        data.pageNo=1
        this.data=data;
          if(this.$route.query.key) {
             this.data.title = this.$route.query.key
          } else {
              this.data.comName = this.$route.query.scom
          }
      }
      this.screenNum = sessionStorage.getItem('bidScreenNum') ? JSON.parse(sessionStorage.getItem('bidScreenNum')) : {typeNum:0,select:[],arr:[]}
      if(this.data.regions.indexOf('||')> -1) {
        let arr7 = this.data.regions.split('||')
        this.souCode = arr7[0]
      } else {
        this.souCode = this.data.regions
      }
      this.ajax();
    },
    watch:{
      data:{
        deep:true,
        handler(val,old){
          sessionStorage.setItem('bidData',JSON.stringify(val));
        }
      },
      screenNum:{
        deep:true,
        handler(val,old){
          sessionStorage.setItem('bidScreenNum',JSON.stringify(val));
        }
      },
    },
    beforeDestroy(){
      // sessionStorage.removeItem('bidData')
      // sessionStorage.removeItem('bidScreenNum')
    },
}
</script>
<style lang="less" scoped>

</style>