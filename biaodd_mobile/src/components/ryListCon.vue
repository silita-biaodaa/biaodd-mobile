<!-- 模型： DOM 结构 -->
<template>
    <div class="listCon">
        <!-- 注册证书 -->
        <template v-if="type==0">
            <h5>{{obj.category}}</h5>
            <p>
                <span class="tit-txt">专&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp业</span>
                <span>{{obj.major}}</span>
            </p>
            <p>
                <span class="tit-txt">执业印章号</span>
                <span>{{obj.sealNo}}</span>
            </p>
            <p>
                <span class="tit-txt">单位名称</span>
                <span>{{obj.comName}}</span>
            </p>
            <p>
                <span class="tit-txt">有效日期</span>
                <span>{{obj.validDate}}</span>
            </p>
        </template>
        <!-- 个人业绩 -->
        <template v-else-if="type==1">
            <h5>{{obj.role}}</h5>
            <p>
                <span class="tit-txt">项目类型</span>
                <span>{{obj.proType}}</span>
            </p>
            <p>
                <span class="tit-txt">项目名称</span>
                <span>{{obj.proName}}</span>
            </p>
            <p>
                <span class="tit-txt">项目属地</span>
                <span>{{obj.proWhere}}</span>
            </p>
            <p>
                <span class="tit-txt">所在企业</span>
                <span>{{obj.company}}</span>
            </p>
        </template>
        <!-- 不良记录 -->
        <template v-else-if="type==2">
            <h5>{{obj.projectname}}</h5>
            <p>
                <span class="tit-txt">发布日期</span>
                <span>{{obj.publishdate}}</span>
            </p>
            <p>
                <span class="tit-txt">性&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp质</span>
                <span>{{obj.nature}}</span>
            </p>
            <p>
                <span class="tit-txt">发布单位</span>
                <span>{{obj.publishsite}}</span>
            </p>
            <p>
                <span class="tit-txt">不良行为</span>
                <span>{{obj.badbehaviorcontent}}</span>
            </p>
        </template>
        <!-- 变更记录 -->
        <template v-else-if="type==3">
            <h5>{{obj.major}}</h5>
            <p>
                <span class="tit-txt">变更信息</span>
                <span>{{obj.remark}}</span>
            </p>
            <p>
                <span class="tit-txt">变更时间</span>
                <span>{{obj.changeDate}}</span>
            </p>
        </template>
        <!-- 押证详情 -->
        <template v-else-if="type==4">
            <h5>{{obj.type}}</h5>
            <p>
                <span class="tit-txt">工程名称</span>
                <span>{{obj.proName}}</span>
            </p>
            <p>
                <span class="tit-txt">单位名称</span>
                <span>{{obj.unitOrg}}</span>
            </p>
            <p>
                <span class="tit-txt">建设单位</span>
                <span>{{obj.proOrg}}</span>
            </p>
            <p>
                <span class="tit-txt">所在省市</span>
                <span>{{obj.city}}</span>
            </p>
            <p>
                <span class="tit-txt">押证时间</span>
                <span>{{obj.date}}</span>
            </p>
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
            default:0
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
    // box-shadow: 4px 4px 4px;
    box-shadow:0px 3px 9px 1px rgba(4,0,0,0.1);
    padding: 32px 20px;
    margin-bottom: 18px;
    border-radius: 8px;
    h5{
        font-size: 32px;
        // font-weight: normal;
        color: #333;
        margin-bottom: 24px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space:nowrap
    }
    p{
        font-size: 28px;
        color: #999;
        margin-bottom: 24px;
        overflow: hidden;
    }
    p:last-child{
        margin-bottom: 0
    }
}
p{
    font-size: 28px;
    display: flex;
    margin-bottom: 23px;
    .tit-txt{
      color: #999;
      margin-right: 32px;
      min-width: 112px;
      display: inline-block;
      text-align-last: justify;
    }
    i{
        color: #999;
        font-size: 28px;
        font-style: normal;
    }
    .val-txt{  
      color: #333;
      max-width: calc(100% - 144px);
    }
}
</style>
