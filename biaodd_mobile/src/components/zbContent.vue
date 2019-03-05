<!-- 模型： DOM 结构 -->
<template>
    <div class="zbContent">
        <div class="top">
            <p class="icon">
                <img src="../assets/icon-zhao.png"/>
            </p>
            <p class="tit">湖南省长沙市岳麓区金凤小学基础建设帮扶建设建设速度还是开发</p>
        </div>
        <div class="center">资质要求：店里承包三级以上呜啦啦的成分打的角度骄傲i的角度讲啊送i多久啊死哦</div>
        <div class="bottom">
            <p>评标办法：123万</p>
            <p>发布时间：2019年1月20日</p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'zbContent', // 结构名称
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
        obj:{}
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
.zbContent{
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
</style>
