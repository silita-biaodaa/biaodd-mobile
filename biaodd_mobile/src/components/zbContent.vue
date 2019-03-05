<!-- 模型： DOM 结构 -->
<template>
    <div class="zbContent">
        <div class="top">
            <p class="icon">
                <img src="../assets/icon-zhao.png"/>
            </p>
            <p class="tit">{{obj.title}}</p>
        </div>
        <div class="center">{{obj.certificate ? obj.certificate : '详见原文'}}</div>
        <div class="bottom">
            <p>{{obj.pbMode ? obj.pbMode : '详见原文'}}</p>
            <p>{{obj.opendate ? obj.opendate : '详见原文'}}</p>
        </div>
    </div>
</template>
<script>
// let moment = require("moment");
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
             this.obj.opendate =  this.obj.opendate.replace('-','年')
             this.obj.opendate =  this.obj.opendate.replace('-','月')
             this.obj.opendate = this.obj.opendate +  '日'             
        }
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
