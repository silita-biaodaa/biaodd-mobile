<!-- 模型： DOM 结构 -->
<template>
    <div class="index">
        <div class="banner">
            <div class="tabBox">
                <span v-for="(o,i) of tabList" :key="i">{{o}}</span>
            </div>
            <div class="search">
                <input type="text" placeholder="请输入关键字进行搜索" v-model="search" >
                <img src="../assets/icon-chaz.png.png" alt="">
            </div>
        </div>
        <div class="nav">
            <ul>
                <li v-for="(x,y) of navList" :key="y">
                    <img :src="x.img"/>
                    <p>{{x.txt}}</p>
                </li>
            </ul>
        </div>
        <!-- 招标 -->
        <div class="zhaob">
            <div class="title">
                <h5>最新招标</h5>
                <span>查看更多</span>
            </div>
            <ul class="box">
                <v-zb v-for="(o,i) of zbList" :key="i" :obj="o"></v-zb>
            </ul>
        </div>
        <!-- 中标 -->
        <div class="zhongb">
            <div class="title">
                <h5>最新中标</h5>
                <span>查看更多</span>
            </div>
            <ul class="box">
                <v-zhongb v-for="(o,i) of zhongbList" :key="i" :obj="o"></v-zhongb>
            </ul>
        </div>
        <!-- 企业 -->
        <div class="qy">
            <div class="title">
                <h5>热门企业</h5>
                <span>查看更多</span>
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
export default {
    name: 'index', // 结构名称
    data() {
        return {
            // 数据模型
            search:'',
            navList:[
                {
                    img:require('../assets/icon-zhaob.png'),
                    txt:'招标公告'
                },{
                    img:require('../assets/icon-zhongb.png'),
                    txt:'中标公告'
                },{
                    img:require('../assets/icon-qiy.png'),
                    txt:'企业信息'
                },{
                    img:require('../assets/icon-chengx.png'),
                    txt:'诚信信息'
                }
            ],
            zbList:[],
            zhongbList:[],
            qyList:[],
            tabList:['查招标','查中标','查企业'],
            tabNum:0
        }
    },
    watch: {
        // 监控集合
    },
    components:{
        'v-zb':zbCon,
        'v-zhongb':zhongbCon,
        'v-qy':qy
    },
    props: {
        // 集成父级参数
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
        //招标
        let that=this;
        this.$http({
            method:'post',
            url: '/notice/queryList',
            data:{
                pageNo:1,
                pageSize:3,
                regions: "湖南",
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
                regions: "湖南",
                type: "2"
            }
        }).then(function(res){
            console.log(res.data.data)
            that.zhongbList=res.data.data;
        })
        //企业
        this.$http({
            method:'post',
            url: '/company/host',
            data:{
                regisAddress: "湖南",
                limit: 3
            }
        }).then(function(res){
            that.qyList=res.data.data.slice(0,3);
        })
    },
    beforeMount() {
        // console.group('挂载前状态  ===============》beforeMount');
    },
    mounted() {
        // console.group('挂载结束状态===============》mounted');
        this.$nextTick(function() {
            // console.log('执行完后，执行===============》mounted');
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
    },
    methods: {
        // 方法 集合
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style scoped lang="less">
.index{
    background: #f5f5f5;
    div{
        background: #fff
    }
    .banner{
        box-sizing: border-box;
        padding: 174px 32px 0;
        width: 100%;
        height:450px;
        background: url(../assets/banner.png) no-repeat;
        background-size: cover;
        .search{
            width: 100%;
            height: 96px;
            padding: 25px 24px;
            box-sizing: border-box;
            padding-right: 65px;
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
            padding: 0 25px;
            background: none;
            span{
                color: #fff;
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
</style>
