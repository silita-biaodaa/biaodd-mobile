<!-- 模型： DOM 结构 -->
<template>
    <div class="zhongbCon newNotice">
        <div class="top">
            <p class="icon">
                <img src="../assets/icon-zhong.png"/>
            </p>
            <p class="tit">湖南省长沙市岳麓区金凤小学基础建设帮扶建设建设速度还是开发</p>
        </div>
        <div class="center">第一候选人：湖南省耀邦建设有限公司</div>
        <div class="bottom">
            <p>中标金额：123万</p>
            <p>公示时间：2019年1月20日</p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'zhongbCon', // 结构名称
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
</style>
