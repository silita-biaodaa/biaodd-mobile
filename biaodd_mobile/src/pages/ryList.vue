<template>
<div class="bid">
    <v-fix :nav="5"></v-fix>
    <!-- 搜索框 -->
    <div class="search">
        <van-search placeholder="请输入注册人员姓名或企业名称" v-model="data.keyWord"  @focus='jumpS' ></van-search>
    </div>
    <!-- 筛选 -->
    <div class="screen-box">
        <div class="condition" :class="{'active':o.active}" v-for="(o,i) of screenList" :key="i" @click="showMask(i)">
            <span>{{o.txt}}</span>
            <i></i>
        </div>
        <!--地区 -->
        <v-addr @addObj="returnAddress" v-if="screenList[0].active" :add="add" :type="2"></v-addr>
        <!-- 注册类别 -->
        <div class="tabType condition-box" v-if="screenList[1].active">
            <ul>
                <li v-for="(o,i) in categoryList" :key="i"><span :class="categoryNum==i?'active':''" @click="categoryNum=i">{{o.category}}</span></li>
            </ul>
            <div class="btn">
                <button class="sure" @click.stop="categoryFn">确定</button>
            </div>
        </div>
    </div>
    <!-- 总条数 -->
    <div class="total">为您搜索到{{total}}条人员信息</div>
    <!-- 列表 -->
    <template v-if="isajax">
        <template v-if="zbList.length>0">
        <!-- <van-pull-refresh v-model="loading" @refresh="onRefresh"> -->
            <van-list finished-text="没有更多了"  @load="onLoad" :error.sync="error" error-text="请求失败，点击重新加载" :offset="200" :finished="finished" :immediate-check="false">
            <v-ry v-for="(o,i) of zbList" :key="i" :obj="o"></v-ry>
            </van-list>
        <!-- </van-pull-refresh>   -->
        </template>
        <template v-else>
            <v-not :isError="isError"  :hint="'Sorry，没有找到符合条件的人员信息'"  ></v-not>
        </template>
    </template>
    <template v-else>
        <van-loading size="50px"></van-loading>
        <p style="text-align: center;margin-top:30px">拼命加载中</p>
    </template>
</div>
</template>
<script>
import ryCon from '@/components/ryContent'
import fixHead from '@/components/fixHead'
import search from '@/components/search'
import addr from '@/components/address'
import not from '@/components/not'
export default {
    name:'ryList',
    data () {
      return {
        isScroll:true,
        zbList:[],
        loading:false,//是否加载完，false为加载完
        data:{
          pageNo:1,
          pageSize:10,
          province:'湖南省',
          category:'',
          keyWord:''
        },
        total:0,
        screenList:[
          {
            txt:'地区',
            active:false,
          },{
            txt:'注册类别',
            active:false
          }
        ],
        categoryNum:0,
        categoryList:[],
        isajax:false,//是否加载完
        isError:false,//是否加载失败
        finished:false,//是否加载完
        error:false,
        vipStr:'',//会员权限
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
            //招标
            this.isScroll=false;
            let that=this;
            this.$http({
                method:'post',
                url: '/company/person',
                data:that.data
            }).then(function(res){
                that.loading = false;
                that.total=res.data.total;
                if(res.data.msg=='该区域无法查询到数据'){
                    that.isajax=true;
                    // that.isScroll=true;
                    return false
                }
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
        returnAddress(option){//选择地址
            this.isajax=false;
            this.zbList=[];
            this.screenList[0].active=false;
            this.screenList[0].txt=option.txt;
            this.add = {}
            this.add.regions = option.str
            this.data.province=option.str;
            this.data.pageNo=1;
            this.ajax();
        },
        categoryFn(){
            this.isajax=false;
            this.zbList=[];
            this.screenList[1].active=false;
            this.data.pageNo=1;
            this.data.category=this.categoryList[this.categoryNum].category;
            if(this.categoryNum==0){
                this.data.category=''
            }
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
        jumpS() {
          this.$router.push({ path:'/history', query:{path:'/ryList',lo:'ryL'}});  
        }
    },
    components:{
        'v-ry':ryCon,
        'v-fix':fixHead,
        'v-search':search,
        'v-addr':addr,
        'v-not':not
    },
    created(){
        let that=this;
        this.data.keyWord =  this.$route.query.scom ? this.$route.query.scom  : this.$route.query.key ? this.$route.query.key : '';
        this.data.province = JSON.parse(sessionStorage.getItem('address')) ? JSON.parse(sessionStorage.getItem('address')).name : '湖南省';
        // this.screenList[0].txt=JSON.parse(sessionStorage.getItem('address')).name;
        if( JSON.parse(sessionStorage.getItem('address'))) {
            if(JSON.parse(sessionStorage.getItem('address')).name ) {
                 this.screenList[0].txt=  JSON.parse(sessionStorage.getItem('address')).name 
            } else {
               this.screenList[0].txt=  '湖南省' ;
            }
        } else {
            this.screenList[0].txt= '湖南省' ;
        }
        if(sessionStorage.getItem('isVip')){
            this.vipStr=sessionStorage.getItem('isVip');
        }
        // this.add = (sessionStorage.getItem('bidData')) ? JSON.parse(sessionStorage.getItem('bidData')) :  JSON.parse(sessionStorage.getItem('address'))
        this.add = (sessionStorage.getItem('ryData')) ? JSON.parse(sessionStorage.getItem('ryData')) :  (JSON.parse(sessionStorage.getItem('address')) ? JSON.parse(sessionStorage.getItem('address')) : {name:'湖南省'})

        //获取注册类别列表
        this.$http({
            method:'post',
            url:'/company/personCategory/0'
        }).then(function(res){
            that.categoryList=res.data.data;
            that.categoryList.unshift({category:'全部'});
        })
        if(sessionStorage.getItem('ryData')&&sessionStorage.getItem('ryCategoryNum')){//刷新保存筛选
            let data=JSON.parse(sessionStorage.getItem('ryData')),
                categoryNum=sessionStorage.getItem('ryCategoryNum');
            data.pageNo=1;
            this.data=data;
            this.screenList[0].txt=data.province;
            this.categoryNum=categoryNum;
        }
        this.ajax();
    },
    watch:{
      data:{
        deep:true,
        handler(val,old){
          sessionStorage.setItem('ryData',JSON.stringify(val));
        }
      },
      categoryNum(val,old){
          sessionStorage.setItem('ryCategoryNum',val);
      }
    },
    beforeDestroy(){
      sessionStorage.removeItem('ryData')
      sessionStorage.removeItem('ryCategoryNum')
    },
}
</script>
<style lang="less" scoped>
.bid {
    .screen-box .condition{
        max-width: calc((100% - 92px)/2);
    }
    .condition-box{
        position: absolute;
        background: #f5f5f5;
        bottom:0;
        transform: translateY(100%);
        left: 0;
        z-index: 9;
        width: 100%;
        box-sizing: border-box;
    }
    .condition-box{
        ul{
            height: 600px;
            overflow-y: scroll;
            box-sizing: border-box;
            display: flex;
            padding: 32px;
            flex-wrap: wrap;
        }
        li{  
            text-align: center;
            margin-right: 30px;
            margin-bottom: 16px;
            span{
                display: inline-block;
                border-radius:10px;
                text-align: center;
                min-width: 176px;
                padding: 0 20px;
                box-sizing: border-box;
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
}
</style>