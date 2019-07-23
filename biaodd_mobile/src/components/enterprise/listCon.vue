<!-- 模型： DOM 结构 -->
<template>
    <div class="listCon" @click="jumpDetail(obj)">
        <!-- 法务 -->
        <template v-if="type=='fw'">
            <h5>{{obj.title}}</h5>
            <p>法院：<span>{{obj.court}}</span></p>
            <p>案号：<span>{{obj.caseNo}}</span></p>
            <p>时间：<span>{{obj.dateStr}}</span></p>
        </template>
        <!-- 资质 -->
        <template v-else-if="type=='zz'">
            <h5>{{obj.qualName}}</h5>
            <p>发证机关：<span>{{obj.certOrg}}</span></p>
            <p>资质证书号：<span>{{obj.certNo}}</span></p>
            <p>有效日期：<span>{{obj.certDate}}</span></p>
        </template>
        <!-- 人员 -->
        <template v-else-if="type=='ry'">
            <h5>{{obj.name}}</h5>
            <div class="yzBtn" v-if="obj.isUnder" @click.stop="jumpgo">押证</div>
            <p>注册类别：<span>{{obj.category}}</span></p>
            <p>专&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp业：<span>{{obj.major}}</span></p>
            <p>有效日期：<span>{{obj.validDate}}</span></p>
        </template>
        <!-- 中标 -->
        <template v-else-if="type=='zb'">
            <h5>{{obj.title}}</h5>
            <p>第一候选人：<span>{{obj.oneName}}</span></p>
            <p>中标金额：<span>{{obj.oneOffer}}万元</span></p>
            <p>发布日期：<span>{{obj.openDate}}</span></p>
        </template>
        <!-- 获奖 -->
        <template v-else-if="type=='gb'">
            <h5>{{obj.mateName}}</h5>
            <p>项目名称：<span>{{obj.projName}}</span></p>
            <p>获奖日期：<span>{{obj.years}}</span></p>
        </template>
        <!-- 不良记录 -->
          <template v-else-if="type=='bl'">
            <h5>{{obj.nature}}</h5>
            <p>项目名称：<span>{{obj.projName}}</span></p>
            <p>发布部门：<span>{{obj.pubSite}}</span></p>
            <p>发布日期：<span>{{obj.pubDate}}</span></p>
            <p>不良行为内容：<span>{{obj.content}}</span></p>
        </template>
        <!-- 业绩 -->
        <template v-else>
            <h5>{{obj.proName}}</h5>
            <template v-if="type=='yj1'">
                <div><span class="zj label">{{obj.proType}}</span></div>
                <p>建设单位：<span>{{obj.proOrg}}</span></p>
                <p>合同金额：<span>{{obj.amount}}万元</span></p>
                <p>竣工日期：<span>{{obj.buildEnd}}</span></p>
            </template>
            <template v-else-if="type=='yj2'">
                <div><span class="sl label">{{obj.proType}}</span></div>
                <p>施工单位：<span>{{obj.proOrg}}</span></p>
                <p>合同金额：<span>{{obj.amount}}万元</span></p>
                <p>完工日期：<span>{{obj.build}}</span></p>
            </template>
            <template v-else-if="type=='yj3'">
                <div><span class="jt label">{{obj.source}}</span></div>
                <p>施工单位：<span>{{obj.comName}}</span></p>
                <p>标段名称：<span>{{obj.section}}</span></p>
                <p>合同金额：<span>{{obj.amount}}万元</span></p>
                <p>交工日期：<span>{{obj.buildEnd}}</span></p>
            </template>
        </template>
        <v-vip :mask="isvip" :txt="'开通会员才可查看详情'"></v-vip>
    </div>
    
</template>
<script>
// let moment = require("moment");
export default {
    name: 'listCon', // 结构名称
    data() {
        return {
            // 数据模型
            isvip:false,
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
        jumpDetail(){
            if(this.type=='yj1'){
                if(sessionStorage.getItem('permissions') == null || sessionStorage.getItem('permissions') == ''){
                    this.isvip=true;
                    this.modalHelper.afterOpen();
                    return false
                }
                sessionStorage.removeItem('peoploDetail');
                sessionStorage.setItem('letterStr','zj');
                this.$router.push({path:'/zjDetail',query:{id:this.obj.proId}})
            }else if(this.type=='yj2'){
                if(sessionStorage.getItem('permissions') == null || sessionStorage.getItem('permissions') == ''){
                    this.isvip=true;
                    this.modalHelper.afterOpen();
                    return false
                }
                sessionStorage.removeItem('peoploDetail');
                sessionStorage.setItem('letterStr','sl');
                this.$router.push({path:'/slDetail',query:{id:this.obj.pkid}})
            }else if(this.type=='yj3'){
                if(sessionStorage.getItem('permissions') == null || sessionStorage.getItem('permissions') == ''){
                    this.isvip=true;
                    this.modalHelper.afterOpen();
                    return false
                }
                sessionStorage.removeItem('peoploDetail');
                sessionStorage.setItem('letterStr','jt');
                this.$router.push({path:'/jtDetail',query:{id:this.obj.pkid}})
            }else if(this.type=='ry'){
                sessionStorage.removeItem('letterStr');
                sessionStorage.setItem('peoploDetail',JSON.stringify(this.obj))
                this.$router.push({path:'/peopleDetail'})
            } else if(this.type=='fw') {
                this.$router.push({path:'/lawtext',query:{id:this.obj.id}})
            }
        },
        jumpgo(){
            if(sessionStorage.getItem('permissions') == null || sessionStorage.getItem('permissions') == ''){
                this.isvip=true;
                this.modalHelper.afterOpen();
                return false
            }
            sessionStorage.setItem('peoploDetail',JSON.stringify(this.obj))
            this.$router.push({path:'/peopleDetail',query:{type:'yz'}})
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style scoped lang="less">
.listCon{
    position: relative;
    background: #fff;
    padding: 38px 20px;
    margin-bottom: 18px;
    border-radius: 8px;
    box-shadow:0px 3px 9px 1px rgba(4,0,0,0.1);
    .yzBtn{
        position: absolute;
        right: 20px;
        top: 38px;
        font-size: 28px;
        color: #FE6603;
        border: 1PX solid #FE6603;
        padding:3px 10px;
        border-radius: 10px;
    }
    h5{
        font-size: 32px;
        // font-weight: normal;
        color: #000;
        margin-bottom: 26px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space:nowrap
    }
    .label{
        padding: 11px 15px;
        font-size: 20px;
        margin-bottom: 24px;
        display: inline-block;
    }
    .zj{
        color: #EF873A;
        background: #FDEFE3;
    }
    .sl{
        background: #FFE5F0;
        color: #D65588;
    }
    .jt{
        background: #E3E6FD;
        color: #3A76F0;
    }
    p{
        font-size: 28px;
        color: #999;
        margin-bottom: 26px;
        overflow: hidden;
        span{
            color: #333;
        }
    }
    p:last-child{
        margin-bottom: 0
    }
}
</style>
