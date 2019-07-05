<!-- 模型： DOM 结构 -->
<template>
    <div class="icalter">
      <div class="alter-title" >
         <div class="a-block" >
           联络员备案
         </div>
         <div class="a-size" >
           {{formatDate(obj.altDate)}}
         </div>
      </div>
      <div class="alter-list" >
        <div class="alter-text" >
          <p class="a-size" >
            变更前
          </p>
          <p>
            {{obj.altBe}}
          </p>
        </div>
        <div class="alter-text" style="border:none;paddingLeft:10px;" >
          <p class="a-size" >
            变更后
          </p>
          <p>
            {{obj.altAf}}
          </p>
        </div>
      </div>
    </div>
</template>
<script>
export default {
    name: 'icalter', // 结构名称
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
.icalter {
 margin: 20px 30px 0;
 border-bottom: 1PX solid #F2F2F2;
 padding-bottom: 20px;
 .alter-title {
   display: flex;
   justify-content: space-between;
 }
 .a-block {
   font-size: 32px;
 }
 .a-size {
   font-size: 24px;
   color: #999999;
 }
 .alter-list {
   display: flex;
   margin-top: 30px;
   .alter-text {
     width: 49%;
     border-right: 1PX solid #f2f2f2;
     font-size: 24px;
     p {
       line-height:42px;
     }
   }
 }
}
</style>
