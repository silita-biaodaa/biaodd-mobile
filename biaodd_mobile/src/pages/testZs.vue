<!-- 招标 -->
<template>
    <div class="testZs">
        <input type="date"/>
        <ul>
            <li v-for="(x,o) of list" :key="o">
                <div class="top box">
                    <div class="title">{{x.title}}</div>
                    <div class="time">{{x.opendate}}</div>
                </div>
                <div class="bottom box">
                    <template>
                        <div class="name" v-if="x.oneName">第一候选人：{{x.oneName}}</div>
                        <div class="name" v-else>详见原文</div>
                    </template>
                    <template>
                        <div class="name" v-if="x.oneOffer">中标金额：{{x.oneOffer}}万</div>
                        <div class="name" v-else>详见原文</div>
                    </template>
                </div>
            </li>
        </ul>
        <van-pagination v-model="currentPage" @change="ajax" :total-items="total"  :items-per-page="10" :force-ellipses="true"/>
    </div>
</template>
<script>
export default {
    name: 'testZs', // 结构名称
    data() {
        return {
            // 数据模型
            list:[],
            currentPage:1,
            total:'',
        }
    },
    watch: {
        // 监控集合
    },
    props: {
        // 集成父级参数
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        let that=this;
        //中标
        this.$http({
            method:'post',
            url: '/notice/queryList',
            data:{
                pageNo:that.currentPage,
                pageSize:10,
                regions:'湖南',
                type: "2"
            }
        }).then(function(res){
            that.list=res.data.data;
            that.total=res.data.total
        })
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
        ajax(){
            let that=this;
            //中标
            this.$http({
                method:'post',
                url: '/notice/queryList',
                data:{
                    pageNo:that.currentPage,
                    pageSize:10,
                    regions:'湖南',
                    type: "2"
                }
            }).then(function(res){
                that.list=res.data.data;

            })
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style scoped lang="less" >
.testZs .van-pagination{
    font-size: 16PX;
    width: 70%;
    margin: 0 auto;
    height: 60PX;
    li.van-pagination__item--active{
        background: #ec7522
    }
    li.van-pagination__item{
        color: #ec7522
    }
}
.testZs{
    width: 1020PX;
    margin: 0 auto
}
input{
    font-size: 16PX
}
ul{
    margin-bottom: 40PX
}
li{
    list-style: decimal;
    border-bottom: 1PX solid #f2f2f2;
    font-size: 16PX;
    .box{
        display: flex;
        justify-content: space-between;
        margin-bottom: 5PX;
    }
    .title{
        width: 750PX;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    .name{
        color: #ec7522;
    }
}
</style>
