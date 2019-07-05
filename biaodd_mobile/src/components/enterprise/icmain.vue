<!-- 模型： DOM 结构 -->
<template>
    <div class="icmain">
      <div  class="main-people">
         <img src="../../assets/icon-reny.png.png" alt=""> {{obj.name}}
      </div>
      <div  class="main-people" style="border:none;" >
        <img src="../../assets/icon-zhiwu.png.png" alt=""> <span v-html="obj.position_CN" ></span>
      </div>
    </div>
</template>
<script>
export default {
    name: 'icmain', // 结构名称
    data() {
        return {
            // 数据模型a
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
.icmain {
  margin: 11px 30px 20px;
  height:120px;
  box-shadow:0px 6px 6px 0px rgba(0, 0, 0, 0.03);
  border-radius:8px;
  display: flex;
  align-items: center;
  .main-people {
    width: 49%;
    border-right: 1PX solid #F0F0F0;
    font-size: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 35px;
      margin-right: 20px;
    }
  }
}
</style>
