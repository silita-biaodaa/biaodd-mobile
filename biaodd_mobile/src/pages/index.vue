<!-- 模型： DOM 结构 -->
<template>
    <div class="index" :class="{'scroll':isScroll}">
        <v-fix ref="fixObj" :isshow="true" :is-show="isScroll" @address="getAddress"></v-fix>
        <div class="banner">
            <div class="tabBox">
                <span v-for="(o,i) of tabList" :key="i" :class="tabNum==i?'active':''" @click="tabChange(o)">{{o.name}}</span>
            </div>
            <van-search placeholder="请输入关键字进行搜索" v-model="search" @search="searchFn" @clear="clearFn"></van-search>
        </div>
        <div class="nav" v-if="!isScroll">
            <ul>
                <li v-for="(x,y) of navList" :key="y" @click="tapFn(x,y)">
                    <img :src="x.img"/>
                    <p>{{x.txt}}</p>
                </li>
            </ul>
        </div>
        <!-- 广告区 -->
        <!-- <div class="advert"> -->
            <!-- <p>标大大福利大放送，工作之余轻松赚外快</p>
            <p class="test">每天限量前100位</p>
            <p>即日起至2019年6月30日</p>
            <h6>查看详情</h6> -->
        <!-- </div> -->
        <!-- <div class="dw">
            <img src="../assets/pic-duanwu.png"/>
        </div> -->
        <!-- 招标 -->
        <div class="zhaob">
            <div class="title">
                <h5>最新招标</h5>
                <span @click="$router.push('/bid')">查看更多</span>
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
    </div>
</template>
<script>
import zbCon from '@/components/zbContent'
import zhongbCon from '@/components/zhongbCon'
import qy from '@/components/qy'
import fixHead from '@/components/fixHead'
export default {
    name: 'index', // 结构名称
    data() {
        return {
            // 数据模型
            search:'',
            navList:[
                {
                    img:require('../assets/icon-zhaob.png'),
                    txt:'招标',
                    path:'/bid'
                },{
                    img:require('../assets/icon-zhongb.png'),
                    txt:'中标',
                    path:'/tender'
                },{
                    img:require('../assets/icon-qiy.png'),
                    txt:'企业',
                    path:'/company'
                },{
                    img:require('../assets/icon-yej.png'),
                    txt:'业绩',
                    path:'/yjList'
                },{
                    img:require('../assets/icon-reny.png'),
                    txt:'人员',
                    path:'/ryList'
                }
                
            ],
            
            zbList:[],
            zhongbList:[],
            qyList:[],
            tabList:[{name:'查招标',to:'/bid',i:0},{name:'查中标',to:'/tender',i:1},{name:'查企业',to:'/company',i:2},{name:'查业绩',to:'/company',i:3},{name:'查人员',to:'/company',i:4}],
            tabNum:0,
            isScroll:false,
            topath:'/bid'
        }
    },
    watch: {
        // 监控集合
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
        tabChange(i){
            this.tabNum=i.i
            this.topath = i.to
        },
        getAddress(option){
            this.ad
            this.ready(option.str);
        },
        ready(str=null){
            let address=this.$refs.fixObj.addressStr;
            //招标
            let that=this;
            this.$http({
                method:'post',
                url: '/notice/queryList',
                data:{
                    pageNo:1,
                    pageSize:3,
                    regions:address,
                    type: "0"
                }
            }).then(function(res){
                that.zbList=res.data.data;
            })
            //中标
            this.$http({
                method:'post',
                url: '/notice/queryList',
                data:{
                    pageNo:1,
                    pageSize:3,
                    regions:address,
                    type: "2"
                }
            }).then(function(res){
                that.zhongbList=res.data.data;
            })
            //企业
            let arr=address.split('||');
            let qyAddress=address;
            if(arr.length>1){
                qyAddress=arr[0]
            }
            this.$http({
                method:'post',
                url: '/company/host',
                data:{
                    regisAddress:qyAddress,
                    limit: 3
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
    div{
        background: #fff
    }
    // .dw{
    //     img{
    //         width: 100%;
    //     }
    // }
    // .advert{
    //     padding:40px;
    //     margin-bottom: 20px;
    //     // background: -webkit-linear-gradient(left top,rgba(254,102,3,1) ,rgba(254,102,3,.1)); /* Safari 5.1 - 6.0 */
    //     // background: -o-linear-gradient(bottom right, rgba(254,102,3,1) ,rgba(254,102,3,.1)); /* Opera 11.1 - 12.0 */
    //     // background: -moz-linear-gradient(bottom right, rgba(254,102,3,1) ,rgba(254,102,3,.1)); /* Firefox 3.6 - 15 */
    //     // background: linear-gradient(to bottom right, rgba(254,102,3,1) ,rgba(254,102,3,.1)); /* 标准的语法 */
    //     background: -webkit-linear-gradient(left top,#ffa805,#fe7105,#ffa805); /* Safari 5.1 - 6.0 */
    //     background: -o-linear-gradient(bottom right,#ffa805,#fe7105,#ffa805); /* Opera 11.1 - 12.0 */
    //     background: -moz-linear-gradient(bottom right,#ffa805,#fe7105,#ffa805); /* Firefox 3.6 - 15 */
    //     background: linear-gradient(to bottom right,#ffa805,#fe7105,#ffa805); /* 标准的语法 */
    //     p{
    //         -webkit-text-stroke:1px #fff;
    //         color: transparent;
    //         // color: #fff;
    //         font-size: 28px;
    //         // background-image: -webkit-gradient(linear, left 0, right 0, from(#fff), to(rgba(254,102,3,.1)));
    //         // -webkit-background-clip: text; /*必需加前缀 -webkit- 才支持这个text值 */
    //         // -webkit-text-fill-color: transparent; /*text-fill-color会覆盖color所定义的字体颜色： */
    //     }
    //     .test{
    //         font-size: 64px;
    //         text-shadow: -10px 10px 10px #333;
    //     }
    //     h6{
    //         text-align: center;
    //         width: 230px;
    //         height: 70px;
    //         border-radius: 50px;
    //         line-height: 70px;
    //         box-shadow: 0 -10px 10px #333;
    //         margin: 30px auto 0;
    //         background: transparent;
    //         background: -webkit-linear-gradient(rgba(255,255,255,.4),rgba(255,255,255,0)); /* Safari 5.1 - 6.0 */
    //         background: -o-linear-gradient(rgba(255,255,255,.4),rgba(255,255,255,0)); /* Opera 11.1 - 12.0 */
    //         background: -moz-linear-gradient(rgba(255,255,255,.4),rgba(255,255,255,0)); /* Firefox 3.6 - 15 */
    //         background: linear-gradient(rgba(255,255,255,.4),rgba(255,255,255,0)); /* 标准的语法 */ 
    //     }
    // }
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
    }
}
.nav{
    height: 220px;
    padding: 40px 42px 45px;
    margin-bottom: 20px;
    box-sizing: border-box;
    ul{
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        font-size: 28px;
        li{
            text-align: center;
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
.title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 32px;
    border-bottom: 1PX solid #f2f2f2;
    height: 80px;
    h5{
        font-size: 32px;
        padding-left: 20px;
        border-left: 6px solid #FE6603;
    }
    span{
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
            height:550px;
        }
    }
    
}
</style>
