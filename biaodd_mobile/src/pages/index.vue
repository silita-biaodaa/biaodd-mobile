<!-- 模型： DOM 结构 -->
<template>
    <div class="index">
        <div class="banner"></div>
        <div class="nav">
            <ul>
                <li v-for="(x,y) of navList" :key="y">
                    <img src="../assets/icon-zhaob.png"/>
                    <p>{{x.txt}}</p>
                </li>
            </ul>
        </div>
        <!-- 招标 -->
        <div class="zb">
            <div class="title">
                <h5>最新招标</h5>
                <span>查看更多</span>
            </div>
            <ul class="box">
                <!--  v-for="(o,i) of zbList" :key="i" -->
                <v-zb></v-zb>
            </ul>
        </div>
    </div>
</template>
<script>
import zbCon from '@/components/zbContent'
export default {
    name: 'index', // 结构名称
    data() {
        return {
            // 数据模型
            navList:[
                {
                    txt:'招标公告'
                },{
                    txt:'招标公告'
                },{
                    txt:'招标公告'
                },{
                    txt:'招标公告'
                }
            ],
            zbList:[]
        }
    },
    watch: {
        // 监控集合
    },
    components:{
        'v-zb':zbCon
    },
    props: {
        // 集成父级参数
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
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
        width: 100%;
        height:450px;
        background: url(../assets/banner.png) no-repeat;
        background-size: cover
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
        border-left: 6px solid #E17226;
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
    li{
        border-bottom: 1PX solid #f2f2f2;
        padding: 28px 30px 28px 50px;
        .top{
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 60px;
            .icon{
                margin-right: 20px;
            }
            .tit{
                color: #666;
            }
        }
        .center{
            color: #999;
            font-size: 26px;
            margin-bottom: 20px;
            max-width: 550px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space:nowrap
        }
        .bottom{
            display: flex;
            justify-content:space-between;
            p{
                color: #999;
                font-size: 26px;
            }
        }
    }
    
}
</style>
