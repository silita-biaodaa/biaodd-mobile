<!-- 模型： DOM 结构 -->
<template>
    <div class="zhongbCon newNotice">
        <div class="top">
            <p class="icon">
                <img src="../assets/icon-zhong.png"/>
            </p>
            <p class="tit">{{obj.title}}</p>
        </div>
        <div class="center">{{obj.oneName ? obj.oneName : '详见原文' }}</div>
        <div class="bottom">
            <p>{{obj.oneOffer ? obj.oneOffer + '万' : '详见原文' }}</p>
            <p>{{obj.opendate ? obj.opendate : '详见原文' }}</p>
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
        this.conver()
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
        conver() {
             this.obj.opendate =  this.obj.opendate.replace('-','年')
             this.obj.opendate =  this.obj.opendate.replace('-','月')
             this.obj.opendate = this.obj.opendate +  '日'             
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style scoped lang="less">
</style>
