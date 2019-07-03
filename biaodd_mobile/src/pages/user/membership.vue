<!-- 模型： DOM 结构 -->
<template>
    <div class="membership">
        <top-back :title='"会员特权"'></top-back>
        <ul class="box">
            <!-- <li>
                <h5>高级筛选-招标、中标、企业信息</h5>
                <div>
                    <p class="tit">招标公告高级筛选</p>
                    <p>会员可快速筛选招标公告的资质要求和评标办法。查找信息更加快速精准。</p>
                </div>
                <div>
                    <p class="tit">中标公告高级筛选</p>
                    <p>会员可快速筛选中标公告的中标金额。查找信息更加快速精准。</p>
                </div>
                <div>
                    <p class="tit">企业信息高级筛选</p>
                    <p>会员可快速筛选企业的资质、注册资金。查找信息更加快速精准。</p>
                </div>
            </li> -->
            <li v-for="(o,i) of list" :key="i">
                <h5>{{o.title}}<span v-if="o.name">（{{o.name}}）</span></h5>
                <p>{{o.content}}</p>
            </li>
        </ul>
    </div>
</template>
<script>
import topBack from '@/components/topback'
export default {
    name: 'membership', // 结构名称
    data() {
        return {
            // 数据模型
            list:[
                {
                    title:'招标公告',
                    content:'提供全国各省的招标公告，会员可根据地区、项目类型、项目资质和评标办法等筛选条件查询出自己想要的信息。'
                },
                 {
                    title:'中标公告',
                    content:'提供建筑行业即时的中标资讯，帮助会员用户即时获取实时的中标公示，掌握市场行情。'
                },
                {
                    title:'企业信息',
                    content:'提供300W+家企业的基本信息，包括企业工商信息、企业联系方式、分支机构、法务信息、资质信息、人员信息、业绩信息、中标信息、诚信信息。'
                },
                {
                    title:'工商信息',
                    content:'接入全国工商信息网站，提供企业的工商信息。包括企业基本信息、分支机构、股东信息、主要人员、变更记录、企业年报、行政处罚等信息。'
                },
                {
                    title:'人员信息',
                    content:'提供注册人员的押证项目、证书信息、个人业绩、变更记录、不良记录等信息，查找信息更加快速精准。'
                },
                {
                    title:'业绩信息',
                    content:'包含全国住建部、交通部、水利部业绩，可根据地区、合同金额、日期、关键词快速查找业绩信息。'
                },
                {
                    title:'法务信息',
                    content:'可查看自身风险信息和企业的关联风险信息。'
                },
                
                {
                    title:'综合查询',
                    name:'限APP和网页端使用',
                    content:'可通过设置地区、资质、业绩关键字等条件，查询出符合条件的建筑企业业绩信息，快捷方便，为用户提供个性化的信息查询服务。'
                },
                {
                    title:'在建信息',
                    content:'可根据姓名和身份证号，精准查询湖南省内人员的在建情况。'
                },
                {
                    title:'人工服务',
                    content:'提供一对一的客服经理服务模式。在服务期间内为会员单位提供全方位立体式的服务，及时解决会员单位使用过程中遇到的问题和困难。'
                },
            ]
        }
    },
    watch: {
        // 监控集合
    },
    props: {
        // 集成父级参数
    },
    components: {
       'top-back':topBack,
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
<style  lang='less' scoped>
.membership{
    background: #f5f5f5;
    padding-top: 90px;
    // min-height: calc(100vh - 191px);
    padding-bottom: 101px;
}
.box{
    li{
        background: #fff;
        margin-bottom: 16px;
        padding: 30px;
        h5{
            font-size: 32px;
            padding-left: 20px;
            border-left: 6px solid #FE6603;
            box-sizing: border-box;
            margin-bottom: 30px;
        }
        div:last-child{
            margin-bottom: 0;
        }
        div{
            margin-bottom: 29px;
            .tit{
                font-size: 28px;
                color: #333;
                margin-bottom: 23px;
            }
        }
        p{
            font-size: 28px;
            color: #999;
        }
    }
    
}
</style>
