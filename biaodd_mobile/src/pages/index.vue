<!-- 模型： DOM 结构 -->
<template>
    <div class="index" :class="{'scroll':isScroll}">
        <v-fix ref="fixObj" :isshow="true" :is-show="isScroll" @address="getAddress"></v-fix>
        <div class="banner">
            <div class="tabBox">
                <span v-for="(o,i) of tabList" :key="i" :class="tabNum==i?'active':''" @click="tabChange(o)">{{o.name}}</span>
            </div>
            <!-- <van-search placeholder="请输入关键字进行搜索" v-model="search"   @click='jumpS' ></van-search> -->
            <div class="tab-sea"  @click='jumpS' >
                {{msg}}
            </div>
        </div>
        <div class="nav" v-if="!isScroll">
            <ul>
                <li v-for="(x,y) of navList" :key="y" @click="tapFn(x,y)">
                    <img :src="x.img"/>
                    <p>{{x.txt}}</p>
                </li>
            </ul>
        </div>
        <!-- <div class="dw" @click="$router.push('/dwDetail')">
            <img src="../assets/pic-duanwu.png"/>
        </div> -->
        <!-- 招标 -->
        <div class="zhaob">
            <div class="title">
                <!-- <div class="title-auto" > -->
                   <h5 class="left" >最新招标</h5>
                   <span class="right" @click="$router.push('/bid')">查看更多</span>
                <!-- </div>    -->
            </div>
            <ul class="box">
                <v-zb v-for="(o,i) of zbList" :key="i" :obj="o"></v-zb>
            </ul>
        </div>
        <!-- 中标 -->
        <div class="zhongb">
            <div class="title">
                <h5>最新中标</h5>
                <span @click="$router.push('/tender')">查看更多</span>
            </div>
            <ul class="box">
                <v-zhongb v-for="(o,i) of zhongbList" :key="i" :obj="o"></v-zhongb>
            </ul>
        </div>
        <!-- 企业 -->
        <div class="qy">
            <div class="title">
                <h5>热门企业</h5>
                <span @click="$router.push('/company')">查看更多</span>
            </div>
            <ul class="box">
                <v-qy v-for="(o,i) of qyList" :key="i" :obj="o"></v-qy>
            </ul>
        </div>
        <!-- 邀请游礼浮层 -->
        <div class="fix-hb" v-if="mask">
            <div class="fix-center" >
                <img src="../assets/pic-tanch.png.png" class="img-fix" />
                <img src="../assets/icon-ann.png.png" class="fix-img" @click.stop="dwJump"  alt="">
                 <div class="fix-cannal" @click.stop="dwCross" >
                 </div>
            </div>

            <!-- <p >
                <van-icon name="cross"/>
            </p> -->
        </div>
    </div>
</template>
<script>
import zbCon from '@/components/zbContent'
import zhongbCon from '@/components/zhongbCon'
import qy from '@/components/qy'
import fixHead from '@/components/fixHead'
export default {
    // name: 'index', // 结构名称
    data() {
        return {
            // 数据模型
            search:'',
            navList:[
                {
                    img:require('../assets/icon-zhaob.png'),
                    txt:'招标',
                    path:'/bid',
                    
                },{
                    img:require('../assets/icon-zhongb.png'),
                    txt:'中标',
                    path:'/tender',
                    
                },{
                    img:require('../assets/icon-qiy.png'),
                    txt:'企业',
                    path:'/company',
                   
                },{
                    img:require('../assets/icon-yej.png'),
                    txt:'业绩',
                    path:'/yjList',
                   
                },{
                    img:require('../assets/icon-reny.png'),
                    txt:'人员',
                    path:'/ryList',
                    
                },{
                    img:require('../assets/icon-fawu.png.png'),
                    txt:'法务',
                    path:'/law',
                    
                }                
            ],
            
            zbList:[],
            zhongbList:[],
            qyList:[],
            tabList:[{name:'查招标',to:'/bid',i:0,local:'bidL',hint:'请输入公告名称或企业名称'},
            {name:'查中标',to:'/tender',i:1,local:'tenL',hint:'请输入公告名称或企业名称'},
            {name:'查企业',to:'/company',i:2,local:'comL',hint:'请输入企业名称或法人名称'},
            {name:'查业绩',to:'/yjList',i:3,local:'yjL',hint:'请输入项目名称或企业名称'},
            {name:'查人员',to:'/ryList',i:4,local:'ryL',hint:'请输入注册人员姓名或企业名称'}],
            msg:'请输入公告名称或企业名称',
            tabNum:0,
            isScroll:false,
            topath:'/bid',
            mask:false,
            local:'bidL'
        }
    },
    watch: {
        // 监控集合
        $route: {
          handler: function(val, oldVal){
             
          },
          // 深度观察监听
          deep: true
        }
    },
    components:{
        'v-zb':zbCon,
        'v-zhongb':zhongbCon,
        'v-qy':qy,
        'v-fix':fixHead,
    },
    props: {
        // 集成父级参数
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
        window.addEventListener('scroll',this.scrollgun,true);
        if(!localStorage.getItem('filter')){
            //资质
            this.$http({
                method:'get',
                url: '/company/filter',
                // data:{
                //     type:that.type
                // }
            }).then(function(res){
                let obj='';
                obj=res.data.data.companyQual;
                localStorage.setItem('filter',JSON.stringify(obj));
            })
        }
        setTimeout(() => {
             let that = this 
            this.$http({
                   method:'POST',
                   url: '/activity/entrance',
                   data:{
                       version:''
                   } 
               }).then(function(res){
                   if(res.data.data ) {
                       that.modalHelper.afterOpen();
                    //    let isCollected = sessionStorage.getItem('isCollected')
                    //    if(!(!isCollected)) {
                            that.mask=true;
                    //    }
                      
                   }
               })
        }, 600);
       

        
    },
    beforeMount() {
        // console.group('挂载前状态  ===============》beforeMount');
    },
    mounted() {
        // console.group('挂载结束状态===============》mounted');
        this.$nextTick(function() {
            // console.log('执行完后，执行===============》mounted');
            this.ready();
        });
    },
    beforeUpdate() {
        // console.group('更新前状态  ===============》beforeUpdate');
    },
    updated() {
        // console.group('更新完成状态===============》updated');
    },
    beforeDestroy() {
        // console.group('销毁前状态  ===============》beforeDestroy');
    },
    destroyed() {
        // console.group('销毁完成状态===============》destroyed');
        window.removeEventListener('scroll',this.scrollgun,true);
    },
    methods: {
        // 方法 集合
        //端午活动
        dwCross(){
            this.modalHelper.beforeClose();
            this.mask=false;
        },
        dwJump(){
            this.modalHelper.beforeClose();
            this.$router.push('/dwDetail');
        },
        tabChange(i){
            this.tabNum=i.i
            this.topath = i.to
            this.local = i.local
            this.msg = i.hint
        },
        getAddress(option){
            this.ready(option);
        },
        ready(str){
            let address = ''
             let qyAddress = ''
            if(str != null) {  
                address = str.str
                qyAddress = str.txt
            } else {
                address =this.$refs.fixObj.addressStr.code;
                qyAddress=this.$refs.fixObj.addressStr.name;
            }
          
            //招标
            let that=this;
            this.$http({
                method:'post',
                url: '/newnocite/zhaobiao/list',
                data:{
                    pageNo:1,
                    pageSize:3,
                    regions:address,
                    type: "1",
                    title:'',
                    projectType:'',
                    pbModes:'',
                    rangeType:'',
                    zzType:''
                }
            }).then(function(res){
                that.zbList=res.data.data;
            })
            //中标
            this.$http({
                method:'post',
                url: '/newnocite/zhongbiao/list',
                data:{
                    pageNo:1,
                    pageSize:3,
                    regions:address,
                    type: "2",
                    title:'',
                    projectType:'',
                    pbModes:'',
                    rangeType:'',
                    zzType:''
                }
            }).then(function(res){
                that.zhongbList=res.data.data;
            })
            //企业
            console.log(this.$refs.fixObj.addressStr);
            
            // let arr=this.$refs.fixObj.addressStr.name;
           
            // if(arr.length>1){
            //     qyAddress=arr[0]
            // }
           let vip = sessionStorage.getItem('isVip') == 'true' ? 1 : 0
            this.$http({
                method:'post',
                url: '/company/host',
                data:{
                    regisAddress:qyAddress,
                    limit: 3,
                    isVip:vip
                }
            }).then(function(res){
                that.qyList=res.data.data.slice(0,3);
            })
        },
        scrollgun(){
            let getSt=document.documentElement.scrollTop || document.body.scrollTop;
            if(getSt>=300){
                this.isScroll=true;
            }else{
                this.isScroll=false;
            }
        },
        searchFn(){//搜索
            if(this.tabNum == 0) {
                this.$router.push({ path: '/bid',query:{search:this.search}})
            }else if(this.tabNum == 1){
                this.$router.push({ path: '/tender',query:{search:this.search}})
            }else if(this.tabNum == 2){
                this.$router.push({ path: '/company',query:{search:this.search}})
            }else if(this.tabNum==3){
                this.$router.push({ path: '/yjList',query:{search:this.search}})
            }else if(this.tabNum==4){
                this.$router.push({ path: '/ryList',query:{search:this.search}})
            }
        },
        clearFn(){
            this.search=''
        },
        tapFn(x,y){
            // if(y==3){
            //     window.location.href='http://old.biaodaa.com/';
            //     return false
            // }
            this.$router.push(x.path);
        },
        jumpS() {
           this.$router.push({ path:'/history', query:{path:this.topath,lo:this.local}});
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style scoped lang="less">
.scroll.index{
    padding-top: 200px
}
.index{
    padding-top: 112px;
    background: #f5f5f5;
    /*端午活动——邀请有礼*/
    .fix-hb{
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(0,0,0,.5);
        width: 100%;
        height: 100vh;
        z-index: 9999;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        .fix-center {
           background:rgba(255,255,255,0);
           position: relative;
        }
        .fix-cannal {
            position: absolute;
            width: 61px;
            height: 61px;
            background: url(../assets/icon-cuo.png@2x.png) no-repeat ;
            background-size: 100%; 
            bottom: -15%;
            left: 50%;
            transform: translateX(-60%);
        }
        .fix-img {
          width: 362px;
          position: absolute;
          bottom: 10%;
          left: 50%;
          transform: translateX(-50%);
        }
        .img-fix {
            width: 660px;
        }
    }
    div{
        background: #fff
    }
    .dw{
        img{
            width: 100%;
        }
    }
    .banner{
        box-sizing: border-box;
        padding: 174px 32px 0;
        width: 100%;
        height:450px;
        background: url('../assets/banner.png') no-repeat;
        background-size:100% 100%;
        .van-search{
            width: 100%;
            height: 96px;
            padding: 0 24px;
            box-sizing: border-box;
            border-radius: 5px;
            position: relative;
            img{
                position: absolute;
                right: 24px;
                width: 40px;
                transform: translateY(-50%);
                top: 50%
            }
            input{
                border: none;
                width: 100%;
            }
        }
        .tabBox{
            // padding: 0 25px;
            background: none;
            span{
                display: inline-block;
                color: #fff;
                width: 120px;
                height: 68px;
                border-radius: 5px;
                line-height:68px;
                text-align: center;
                font-size: 28px;
                margin-bottom: 36px;
                margin-right: 10px;
            }
            .active{
                background: #fff;
                color: #666;
                position: relative;
            }
            .active::before{
                content:'';
                width: 0;
                height: 0;
                border-left: 15px solid transparent;
                border-right: 15px solid transparent;
                border-top: 16px solid #fff;
                position: absolute;
                bottom: -15px;
                transform: translateX(-50%);
                left: 50%;
            }
        }
        .tab-sea {
          width: 100%;
          height: 80px;
          border-radius: 8px;
          line-height: 80px;
          color:#999999;
          padding: 0 15px;
          box-sizing: border-box;
        }
    }
}
.nav{
    padding: 30px 15px 18px;
    margin-bottom: 20px;
    box-sizing: border-box;
    ul{
        // display: flex;
        // flex-wrap: wrap;
        width: 100%;
        height: 100%;
        font-size: 28px;
        overflow: hidden;
        li{
            float: left;
            text-align: center;
            margin-bottom: 30px;
            width: 25%;
            img{
                max-width: 100%;
                width: 90px;
            }
        }
    }
}

.zhaob,.zhongb{
    margin-bottom: 20px
}
.title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 32px;
    border-bottom: 1PX solid #f2f2f2;
    height: 80px;
    position: relative;
    // .title-auto {
    //     margin: auto ;
    //     overflow: hidden;
    // }
    h5 {
        font-size: 32px;
        padding-left: 20px;
        border-left: 6px solid #FE6603;
    }
    span {
        font-size: 28px;
        color: #FE6603;
    }
}

.box{
    li:last-child{
        border-bottom: none
    }
}
@media screen and (max-width:374px){
    .index {
        .banner{
             .tabBox{
                span{
                    transform: scale(0.8,0.8);
                    width: auto;
                }
            }
        }
    }
    
}
</style>
