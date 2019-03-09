<!-- 模型： DOM 结构 -->
<template>
    <div class="listCon">
        <!-- 法务 -->
        <template v-if="type=='fw'">
            <h5>湖南省沙坪建设有限公司一审民事裁定书</h5>
            <p>法院：湖南省长沙市中级人民法院</p>
            <p>案号：（2018）湘01民初585号</p>
            <p>时间：2019-02-01</p>
        </template>
        <!-- 资质 -->
        <template v-else-if="type=='zz'">
            <h5>建筑工程施工总承包三级</h5>
            <p>发证机关：长沙市住房和城乡建设委员会</p>
            <p>资质证书号：D343018876</p>
            <p>有效日期：2039-02-01</p>
        </template>
        <!-- 人员 -->
        <template v-else-if="type=='ry'">
            <h5>xxx</h5>
            <p>注册类别：二级注册建造师</p>
            <p>专  业：建筑工程</p>
            <p>有效日期：2039-02-01</p>
        </template>
        <!-- 业绩 -->
        <template v-else-if="type=='yj'">
            <h5>xxx</h5>
            <p>建设单位：洪江市龙标发展有限责任公司</p>
            <p>项目地区：湖南省</p>
            <p>项目类别：房屋建设工程</p>
        </template>
        <!-- 中标 -->
        <template v-else-if="type=='zb'">
            <h5>xxx</h5>
            <p>第一候选人：湖南耀邦建设有限公司</p>
            <p>中标金额：449.9446万元</p>
            <p>发布日期：2019-01-02</p>
        </template>
    </div>
</template>
<script>
// let moment = require("moment");
export default {
    name: 'listCon', // 结构名称
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
        obj:{},
        type:{
            default:'fw'
        }
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
        // 时间转换
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style scoped lang="less">
.listCon{
    background: #fff;
    padding: 38px 20px;
    margin-bottom: 18px;
    border-radius: 8px;
    h5{
        font-size: 28px;
        font-weight: normal;
        margin-bottom: 26px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space:nowrap
    }
    p{
        font-size: 24px;
        color: #999;
        margin-bottom: 26px;
        overflow: hidden;
    }
    p:last-child{
        margin-bottom: 0
    }
}
</style>
