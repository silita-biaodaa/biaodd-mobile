<!-- 模型： DOM 结构 -->
<template>
    <div class="zbContent newNotice">
        <div class="top">
            <p class="icon">
                <img src="../assets/icon-zhao.png"/>
            </p>
            <p class="tit">{{obj.title}}</p>
        </div>
        <div class="center">{{obj.certificate ? obj.certificate : '详见原文'}}</div>
        <div class="bottom">
            <p>{{obj.pbMode ? obj.pbMode : '详见原文'}}</p>
            <p>{{obj.date ? obj.date : '详见原文'}}</p>
        </div>
    </div>
</template>
<script>
let moment = require("moment");
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
        this.conver()
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
        // 时间转换
        conver() {
            var date = new Date(this.obj.opendate.replace(/-/g, '/'));
             this.obj.date = moment(date).format('YYYY年MM月DD日')
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style scoped lang="less">

</style>
