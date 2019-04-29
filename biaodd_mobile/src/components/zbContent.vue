<!-- 模型： DOM 结构 -->
<template>
    <div class="zbContent newNotice" >
        <div @click="topush(obj)">
            <div class="top">
                <p class="icon">
                    <img src="../assets/icon-zhao.png"/>
                </p>
                <p class="tit">{{obj.title}}</p>
            </div>
            <div class="center">资质要求：{{obj.certificate ? obj.certificate : '详见原文'}}</div>
            <div class="bottom">
                <p>评标办法：{{obj.pbMode ? obj.pbMode : '详见原文'}}</p>
                <p>发布时间：{{obj.opendate||obj.openDate ? obj.opendate||obj.openDate : '详见原文'}}</p>
            </div>
        </div>
        
        <template v-if="follow">
            <div class="follow-box">
                <span @click="noFollow">取消关注</span>
            </div>
        </template>
         <v-dia v-if="isload"></v-dia>
    </div>
</template>
<script>
// let moment = require("moment");
import dialog from '@/components/dialog'
export default {
    name: 'zbContent', // 结构名称
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
        follow:{
            default:false
        }
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // this.conver()
        // console.group('创建完毕状态===============》created');
        if( sessionStorage.getItem('permissions') == null || sessionStorage.getItem('permissions') == '' || sessionStorage.getItem('permissions').indexOf('bidFilter') == -1  ) {
            if(this.obj.certificate){
                this.obj.certificate=this.getPassCertificate(this.obj.certificate)
            }
            if( this.obj.pbMode) {
                this.obj.pbMode=this.getPassPbMode(this.obj.pbMode)
            } 
        }
    },
    beforeMount() {
        // console.group('挂载前状态  ===============》beforeMount');
    },
    components: {
        'v-dia':dialog
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
        conver() {
             this.obj.opendate =  this.obj.opendate.replace('-','年')
             this.obj.opendate =  this.obj.opendate.replace('-','月')
             this.obj.opendate = this.obj.opendate +  '日'             
        },
        topush(o) {
             if(sessionStorage.getItem('xtoken')) {
                 this.$router.push({path:'/article',query:{id:o.id,source:o.source}})
            } else {
                this.isload = true 
            }
        },
        noFollow(){
            this.$emit('nofollow',{id:this.obj.id,source:this.obj.source})
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style scoped lang="less">

</style>
