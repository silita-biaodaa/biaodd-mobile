<!-- 模型： DOM 结构 -->
<template>
    <div class="search"  >
        <input type="search" placeholder="请输入关键字进行搜索" v-model="search" >
        <img src="../assets/icon-chaz.png.png" alt="">
    </div>
    
</template>
<script>
import addr from '@/components/address'
export default {
    name: 'search', // 结构名称
    data() {
        return {
            // 数据模型
            search:''
        }
    },
    watch: {
        // 监控集合
    },
    props: {
        // 集成父级参数
    },
    components:{

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
.search {
    height: 153px;
    width: 100%;
    padding: 28px 34px;
    background-color: #f5f5f5;
    box-sizing: border-box; 
    position: relative;
    input {
      outline:  none;
      height: 97px;
      line-height: 97px;
      width: 100%;
      border: 0;
      padding: 0 65px 0 25px;
      font-size: 28px;
      box-sizing: border-box;
      -webkit-appearance: none; 
    }
    input::-webkit-search-cancel-button { display: none; }
    img {
      position: absolute;
      right: 54px;
      top: 50%;
      transform: translateY(-50%);
    }
}
</style>
