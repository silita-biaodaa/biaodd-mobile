<!-- 模型： DOM 结构 -->
<template>
  <div class="top-nav">
        <van-icon name="arrow-left" class="top-left" @click="$router.go(-1)" />
        {{title}}
        <p v-if="isOrder" @click="mask=true">开发票</p>
        <v-popup :mask="mask"></v-popup>
   </div>
</template>
<script>
// let moment = require("moment");
import popup from '@/components/popup'
export default {
    name: 'topBack', // 结构名称
    data() {
        return {
            // 数据模型
            mask:false,
        }
    },
    watch: {
        // 监控集合
    },
    props: {
        // 集成父级参数
        title:'',
        isOrder:{
            default:false
        }
    },
    components: {
       'v-popup':popup,
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
.top-nav {
    height: 90px;
    width: 100%;
    background-color: #FE6603;
    line-height: 90px;
    text-align: center;
    color:#fff;
    font-size: 36px;
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    .top-left {
        font-size: 50px;
        color:#fff;
        position: absolute;
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
    }
    p{
        color: #fff;
        position: absolute;
        right:35px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 24px
    }
}
</style>
