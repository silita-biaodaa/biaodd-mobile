<!-- 模型： DOM 结构 -->
<template>
    <div class="dwDetail">
        <top-back :title="'活动详情'"></top-back>
        <div class="img-box">
            <img src="../assets/hdxq.png"/>
            <button class="btn" @click="jumpApp">下载APP</button>
        </div>
        
    </div>
</template>
<script>
export default {
    name: 'dwDetail', // 结构名称
    data() {
        return {
            // 数据模型
        }
    },
    watch: {
        // 监控集合
    },
    props: {
        // 集成父级参数
    },
    components: {
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
        jumpApp(){
            window.location.href='https://a.app.qq.com/o/simple.jsp?pkgname=com.yaobang.biaodada';
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
.app-boby.dwDetail{
    padding-bottom: 0;
    padding-top: 90px;
}
.img-box{
    // min-height: calc(100vh - 90px);
    // background: url(../assets/hdxq.png) no-repeat;
    // background-size: 100% 100%;
    position: relative;
    margin-top: 90px;
    img{
        width: 100%;
        height:calc(100vh - 90px);
    }
    .btn{
         position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 8%;
        width: 540px;
        background: #F9BD1C;
        color: #fff;
        height: 102px;
        border-radius: 102px;
        line-height: 102px;
        border: 0;
        box-shadow: 3px 4px 0 #B17A13;
    }
}

</style>
