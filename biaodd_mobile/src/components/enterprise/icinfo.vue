<!-- 模型： DOM 结构 -->
<template>
    <div class="icinfo">
         <div class="bas-test">
             <div class="bas-line">
                 <div class="left bas-first">
                     法定代表
                 </div>
                 <div class="left ">
                    {{detail.legalPerson}}
                 </div>
             </div>
              <div class="bas-line">
                 <div class="left bas-first" style="width:40%" >
                     统一社会信用代码
                 </div>
                 <div class="left">
                     {{detail.creditCode}}
                 </div>
             </div>
              <div class="bas-line">
                 <div class="left bas-first">
                    注册资本
                 </div>
                 <div class="left ">
                     {{detail.regisCapital}}
                 </div>
             </div>
              <div class="bas-line" v-if="detail.regisDate" >
                 <div class="left bas-first">
                    成立时间
                 </div>
                 <div class="left ">
                     {{detail.regisDate}}
                 </div>
             </div>
              <div class="bas-line" v-if="detail.businessStart" >
                 <div class="left bas-first">
                    经营期限
                 </div>
                 <div class="left ">
                     {{detail.businessStart}}至{{detail.businessEnd}}
                 </div>
             </div>
              <div class="bas-line"  v-if="detail.regisAuthority" >
                 <div class="left bas-first">
                    登记机关
                 </div>
                 <div class="left ">
                     {{detail.regisAuthority}}
                 </div>
             </div>
              <div class="bas-line"  v-if="detail.comAddress" >
                 <div class="left bas-first">
                    企业地址
                 </div>
                 <div class="left ">
                     {{detail.comAddress}}
                 </div>
             </div>
              <div class="bas-line">
                 <div class="left bas-first">
                     安许证号
                 </div>
                 <div class="left ">
                     {{detail.certNo}}
                 </div>
             </div>
              <div class="bas-line">
                 <div class="left bas-first">
                     安许期限 
                 </div>
                 <div class="left">
                     {{detail.validDate}}
                 </div>
             </div>
              <div class="bas-line" v-if="detail.comType" >
                 <div class="left bas-first">
                     企业类型 
                 </div>
                 <div class="left bas-two">
                    {{detail.comType}}
                 </div>
             </div>
               <div class="bas-line">
                 <div class="left bas-first">
                     经营范围 
                 </div>
                 <div class="left bas-two">
                     {{detail.comRange}}
                 </div>
             </div>
          </div>
    </div>
</template>
<script>
export default {
    name: 'icinfo', // 结构名称
    data() {
        return {
            // 数据模型
            detail:{}
        }
    },
    watch: {
        // 监控集合
    },
    props: {
        // 集成父级参数
        obj:{
         default:{}
        },
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
        this.detail = this.obj
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
<style  lang='less' >
</style>
