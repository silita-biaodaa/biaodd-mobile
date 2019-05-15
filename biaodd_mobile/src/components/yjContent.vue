<!-- 模型： DOM 结构 -->
<template>
    <div class="zhongbCon newNotice">
        <div @click="topush(obj)" >
            <div class="top">
                <p class="icon">
                    <img src="../assets/icon-yj.png"/>
                </p>
                <p class="tit">{{obj.proName}}</p>
            </div>
            <template v-if="type=='project'">
                <div><span class="zj label">{{obj.proType}}</span></div>
                <p>建设单位：<span>{{obj.proOrg}}</span></p>
                <p>合同金额：<span>{{obj.amount}}</span></p>
                <p>竣工日期：<span>{{obj.buildEnd}}</span></p>
            </template>
            <template v-else-if="type=='shuili'">
                <div><span class="sl label">{{obj.proType}}</span></div>
                <p>施工单位：<span>{{obj.proOrg}}</span></p>
                <p>合同金额：<span>{{obj.amount}}</span></p>
                <p>完工日期：<span>{{obj.build}}</span></p>
            </template>
            <template v-else-if="type=='jiaotong'">
                <div><span class="jt label">{{obj.source}}</span></div>
                <p>施工单位：<span>{{obj.comName}}</span></p>
                <p>标段名称：<span>{{obj.section}}</span></p>
                <p>合同金额：<span>{{obj.amount}}万元</span></p>
                <p>交工日期：<span>{{obj.buildEnd}}</span></p>
            </template>
        </div>
        <v-dia v-if="isload"></v-dia>

    </div>
</template>
<script>

import dialog from '@/components/dialog'
export default {
    name: 'yjCon', // 结构名称
    data() {
        return {
            // 数据模型
            isload:false
        }
    },
    watch: {
        // 监控集合
    },
    props: {
        // 集成父级参数
        obj:{},
        type:{
            default:'yj1'
        }
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
        // this.conver()
        if( sessionStorage.getItem('permissions') == null || sessionStorage.getItem('permissions') == '' || sessionStorage.getItem('permissions').indexOf('bidFilter') == -1  ) {
            if(this.obj.oneName){
                this.obj.oneName=this.getPassOnename(this.obj.oneName)
            }
            if( this.obj.oneOffer) {
                this.obj.oneOffer=this.getPassOneoffer(this.obj.oneOffer)
            } 
        }
    },
    components: {
        'v-dia':dialog
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
        conver() {
             this.obj.opendate =  this.obj.opendate.replace('-','年')
             this.obj.opendate =  this.obj.opendate.replace('-','月')
             this.obj.opendate = this.obj.opendate +  '日'             
        },
        topush(o) {
            if(sessionStorage.getItem('xtoken')) {
                if(this.type=='project'){
                    this.$router.push({path:'/zjDetail',query:{id:o.proId}})
                }else if(this.type=='shuili'){
                    this.$router.push({path:'/slDetail',query:{id:o.pkid}})
                }else if(this.type=='jiaotong'){
                    this.$router.push({path:'/jtDetail',query:{id:o.pkid}})
                }
                
            } else {
                this.isload = true 
            }
            
        },
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style scoped lang="less">
.tit{
    font-size: 32px;
    font-weight: bold;
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
.newNotice .top{
    margin-bottom: 0;
}
</style>
