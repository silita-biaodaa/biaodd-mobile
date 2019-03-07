<!-- 模型： DOM 结构 -->
<template>
    <div class="company">
       <div class="c-title">
         <img src="../assets/company.png" alt="">
         <p>
           {{obj.comName}}
         </p>
       </div>
       <p class="c-pl">
         法定代表： {{obj.legalPerson}}
       </p>
       <p class="c-pl">
         联系电话： {{obj.phone}}
       </p>
       <p class="c-pl c-b">
         企业地址： {{obj.comAddress}}
       </p>
    </div>
</template>
<script>
export default {
    name: 'company', // 结构名称
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
        obj:{}
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
<style scoped  lang="less">
.company {
  border-bottom: 1PX solid #F0F0F0;
  .c-title {
    margin: 41px 31px 30px;
    display: flex;
    align-items: center;
    color:#333;
    font-weight: 550;
    img {
      margin-right: 35px;
    }
  }
  .c-pl {
    padding-left: 102px;
    color:#999;
    font-size: 28px;
    margin-bottom: 23px;
    width: 100%;
    padding-right: 31px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    box-sizing: border-box;
  }
  .c-b {
    margin-bottom: 40px;
  }
}

</style>
