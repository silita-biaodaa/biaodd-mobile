<!-- 模型： DOM 结构 -->
<template>
    <div class="ansite">
       <div class="aninfo-line" >
          <div class="an-width" >
            <div class="info-title" >
              名称
            </div>
            <div class="info-main" >
              {{obj.website[0].webSitName}}
            </div>
          </div>
          <div class="an-width" >
            <div class="info-title" >
              类型
            </div>
            <div class="info-main" >
             {{obj.website[0].webType == 1  ? '网站': obj.website[0].webType}}
            </div>
          </div>
       </div>

       <div class="aninfo-line" style="border:none" >
          <div >
            <div class="info-title" >
              网址
            </div>
            <div class="info-main" >
              {{obj.website[0].domain}}
            </div>
          </div>
       </div>

    </div>
</template>
<script>
export default {
    name: 'ansite', // 结构名称
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
         obj:{
         default:{}
        },
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
.ansite {
  background-color: #fff;
}
</style>
