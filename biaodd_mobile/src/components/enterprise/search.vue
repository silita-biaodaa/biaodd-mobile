<!-- 模型： DOM 结构 -->
<template>
    <!-- 搜索 -->
    <div class="search-box">
        <template  v-if="!iszb">
            <div class="left" @click="leftTap">
                {{selecTxt}}
                <van-icon name="arrow-down"></van-icon>
            </div>
            <div class="right">
                <van-search placeholder="请输入搜索关键词" v-model="search" @search="searchFn"></van-search>
            </div>
        </template>
        <template v-else>
            <van-search placeholder="请输入搜索关键词" v-model="search" @search="searchFn"></van-search>
        </template>
    </div>
</template>
<script>
export default {
    name: 'affairs', // 结构名称
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
        selecTxt:{
            default:'年份'
        },
        iszb:{
            default:false
        }
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
        searchFn(){//搜索
            this.$emit('searchFn',this.search);
        },
        leftTap(){
            this.$parent.mask=true;
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style scoped lang="less">
.search-box{
    height: 138px;
    background: #fff;
    display: flex;
    padding: 20px 30px;
    justify-content: space-between;
    box-sizing: border-box;
    align-items: center;
    .right{
        width: 72%;
        height: 100%;
    }
    .van-search{
            background: #f5f5f5 !important;
            border-radius: 5px
        }
    .van-search__content{
        background: #f5f5f5;
    }
}
</style>
