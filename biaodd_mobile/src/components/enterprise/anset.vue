<!-- 模型： DOM 结构 -->
<template>
    <div class="anset">
        <div class="aninfo-line" >
          <div class="an-width" >
            <div class="info-title" >
              资产总额
            </div>
            <div class="info-main" >
              企业选择不公示
            </div>
          </div>
          <div class="an-width" >
            <div class="info-title" >
              所有者权益合计
            </div>
            <div class="info-main" >
              企业选择不公示
            </div>
          </div>
       </div>

        <div class="aninfo-line" >
          <div class="an-width" >
            <div class="info-title" >
             营业总收入
            </div>
            <div class="info-main" >
              企业选择不公示
            </div>
          </div>
          <div class="an-width" >
            <div class="info-title" >
             企业选择不公示
            </div>
            <div class="info-main" >
              企业选择不公示
            </div>
          </div>
       </div>

        <div class="aninfo-line" >
          <div class="an-width" >
            <div class="info-title" >
              利润总额
            </div>
            <div class="info-main" >
              企业选择不公示
            </div>
          </div>
          <div class="an-width" >
            <div class="info-title" >
              净利润
            </div>
            <div class="info-main" >
             企业选择不公示
            </div>
          </div>
       </div>

        <div class="aninfo-line" style="border:none" >
          <div class="an-width">
            <div class="info-title" >
              纳税总额
            </div>
            <div class="info-main" >
              企业选择不公示
            </div>
          </div>
          <div class="an-width" >
            <div class="info-title" >
              负债总额
            </div>
            <div class="info-main" >
              企业选择不公示
            </div>
          </div>
       </div>
       
    </div>
</template>
<script>
export default {
    name: 'anset', // 结构名称
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
.anset {
   background-color: #fff;
}
</style>
