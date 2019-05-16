<!-- 模型： DOM 结构 -->
<template>
    <div class="listCon" @click="jumpTo">
        <!-- 招投标 -->
        <template v-if="type==0">
            <h5>
                <span>编号：{{obj.zhongbiaoCode}}</span>
                <van-icon name="arrow" class="nav-i"/>
            </h5>
            <p>
               <span class="tit-txt">中标单位</span>
               <span>：{{obj.zhongbiaoCompany}}</span>
            </p>
            <p>
                <span class="tit-txt">中标金额</span>
                <span>：{{obj.zhongbiaoAmount}}万元</span>
            </p>
            <p>
                <span class="tit-txt">中标日期</span>
                <span>：{{obj.zhongbiaoDate}}</span>
            </p>
            <p>
                <span class="tit-txt">招标类型</span>
                <span>：{{obj.zhaobiaoType}}</span>
            </p>
        </template>
        <!-- 施工图审查 -->
        <template v-else-if="type==1">
            <h5>
                <span>编号：{{obj.checkNo}}</span>
                <van-icon name="arrow" class="nav-i"/>
            </h5>
            <p>
                <span class="tit-txt">图审机构</span>
                <span>：{{obj.checkOrg}}</span>
            </p>
            <p>
                <span class="tit-txt">完成日期</span>
                <span>：{{obj.checkFinishDate}}</span>
            </p>
        </template>
        <!-- 合同备案 -->
        <template v-else-if="type==2">
            <h5>
                <span>编号：{{obj.provRecordCode}}</span>
                <van-icon name="arrow" class="nav-i"/>
            </h5>
            <p>
                <span class="tit-txt">承包单位</span>
                <span>：{{obj.contractComName}}</span>
            </p>
            <p>
                <span class="tit-txt">发包单位</span>
                <span>：{{obj.letContractComName}}</span>
            </p>
            <p>
                <span class="tit-txt">合同类别</span>
                <span>：{{obj.type}}</span>
            </p>
            <p>
                <span class="tit-txt">合同金额</span>
                <span>：{{obj.amount}}万元</span>
            </p>
            <p>
                <span class="tit-txt">签订日期</span>
                <span>：{{obj.signDate}}</span>
            </p>
        </template>
        <!-- 施工许可 -->
        <template v-else-if="type==3">
            <h5>
                <span>编号：{{obj.blicence}}</span>
                <van-icon name="arrow" class="nav-i"/>
            </h5>
            <p>
                <span class="tit-txt">面&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp积</span>
                <span>：{{obj.area}}㎡</span>
            </p>
            <p>
                <span class="tit-txt">合同金额</span>
                <span>：{{obj.amount}}万元</span>
            </p>
            <p>
                <span class="tit-txt">发证日期</span>
                <span>：{{obj.licenceDate}}</span>
            </p>
        </template>
        <!-- 竣工备案 -->
        <template v-else-if="type==4">
            <h5>
                <span>编号：{{obj.provCode}}</span>
                <van-icon name="arrow" class="nav-i"/>
            </h5>
            <p>
                <span class="tit-txt">实际造价</span>
                <span>：{{obj.cost}}万元</span>
            </p>
            <p>
                <span class="tit-txt">实际面积</span>
                <span>：{{obj.area}}㎡</span>
            </p>
            <p>
                <span class="tit-txt">实际竣工验收时间</span>
                <span>：{{obj.buildEnd}}</span>
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
        //跳转
        jumpTo(){
            if(this.type==0){
                this.$router.push({
                    path:'/ztbDetail',
                    query:{
                        id:this.obj.pkid,
                        proid:this.obj.proId,
                        zbdw:this.obj.zhongbiaoCompany,
                        zbtype:this.obj.zhaobiaoType
                    }
                })
            }else if(this.type==1){
                this.$router.push({path:'/sgtscDetail',query:{id:this.obj.pkid,proid:this.obj.proId}})
            }else if(this.type==2){
                this.$router.push({
                    path:'/htbaDetail',
                    query:{
                        id:this.obj.pkid,
                        proid:this.obj.proId
                    }
                })
            }else if(this.type==3){
                this.$router.push({path:'/sgxkDetail',query:{id:this.obj.pkid,proid:this.obj.proId}})
            }else if(this.type==4){
                this.$router.push({path:'/jgbaDetail',query:{id:this.obj.pkid,proid:this.obj.proId}})
            }
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style scoped lang="less">
.listCon{
    background: #fff;
    margin-bottom: 16px;
    border-radius: 8px;
    padding-bottom: 28px;
    box-shadow:0px 3px 9px 1px rgba(4,0,0,0.1);
    h5{
        padding:0 20px;
        height: 80px;
        border-bottom: 1PX solid #F0F0F0;
        font-size: 28px;
        // font-weight: normal;
        color: #333;
        margin-bottom: 26px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span{
            overflow: hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
            display: inline-block;
        }
    }
    p{
        padding:0 20px;
        margin-bottom: 26px;
        overflow: hidden;
        .tit-txt{
            min-width: 112px;
            display: inline-block;
            text-align-last: justify;
        }
        span{
            font-size: 26px;
            color: #999;
        }
    }
}
</style>
