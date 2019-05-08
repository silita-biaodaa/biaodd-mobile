<!-- 模型： DOM 结构 -->
<template>
    <div class="listCon">
        <!-- 法务 -->
        <template v-if="type=='fw'">
            <h5>{{obj.title}}</h5>
            <p>法院：{{obj.court}}</p>
            <p>案号：{{obj.caseNo}}</p>
            <p>时间：{{obj.dateStr}}</p>
        </template>
        <!-- 资质 -->
        <template v-else-if="type=='zz'">
            <h5>{{obj.qualName}}</h5>
            <p>发证机关：{{obj.certOrg}}</p>
            <p>资质证书号：{{obj.certNo}}</p>
            <p>有效日期：{{obj.certDate}}</p>
        </template>
        <!-- 人员 -->
        <template v-else-if="type=='ry'">
            <h5>{{obj.name}}</h5>
            <p>注册类别：{{obj.category}}</p>
            <p>专  业：{{obj.major}}</p>
            <p>有效日期：{{obj.validDate}}</p>
        </template>
        <!-- 中标 -->
        <template v-else-if="type=='zb'">
            <h5>{{obj.title}}</h5>
            <p>第一候选人：{{obj.oneName}}</p>
            <p>中标金额：{{obj.oneOffer}}万元</p>
            <p>发布日期：{{obj.opendate}}</p>
        </template>
        <!-- 获奖 -->
        <template v-else-if="type=='gb'">
            <h5>{{obj.mateName}}</h5>
            <p>项目名称：{{obj.projName}}</p>
            <p>获奖日期：{{obj.years}}</p>
        </template>
        <!-- 不良记录 -->
          <template v-else-if="type=='bl'">
            <h5>{{obj.nature}}</h5>
            <p>项目名称：{{obj.projectName}}</p>
            <p>发布部门：{{obj.publishSite}}</p>
            <p>发布日期：{{obj.publishDate}}</p>
            <p>发布内容：{{obj.badBehaviorContent}}</p>
        </template>
        <!-- 业绩 -->
        <template v-else>
            <h5>{{obj.proName}}</h5>
            <template v-if="type=='yj1'">
                <p>建设单位：{{obj.proOrg}}</p>
                <p>合同金额：{{obj.amount}}</p>
                <p>竣工日期：{{obj.buildEnd}}</p>
            </template>
            <template v-else-if="type=='yj2'">
                <p>施工单位：{{obj.proOrg}}</p>
                <p>合同金额：{{obj.amount}}</p>
                <p>竣工日期：{{obj.build}}</p>
            </template>
            <template v-else-if="type=='yj3'">
                <p>施工单位：{{obj.comName}}</p>
                <p>标段名称：{{obj.section}}</p>
                <p>合同金额：{{obj.amount}}</p>
                <p>竣工日期：{{obj.buildEnd}}</p>
            </template>
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
