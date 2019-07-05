<!-- 模型： DOM 结构 -->
<template>
    <div class="icpun">
      <div class="pun-title"  >
        {{obj.penDecNo}}
      </div>
      <div class="puns-text" >
        <div class="pun-name" >
          违法行为类型
        </div>
        <div  class="pun-2" >
          {{obj.illegActType}}
        </div>
      </div>
      <div class="puns-text" >
        <div class="pun-name" >
          行政处罚内容
        </div>
        <div class="pun-2">
          {{obj.penContent}}
        </div>
      </div>
      <div class="puns-text" >
        <div class="pun-name" >
          决定机关
        </div>
        <div class="pun-2">
          {{obj.penAuth_CN}}
        </div>
      </div>
      <div class="puns-text" >
        <div class="pun-name" >
          处罚日期
        </div>
        <div  class="pun-2" >
          {{formatDate(obj.penDecIssDate)}}
        </div>
      </div>
    </div>
</template>
<script>
export default {
    name: 'icpun', // 结构名称
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
.icpun {
  margin: 15px 30px;
  border-bottom: 1PX solid #F2F2F2;
  .pun-title {
    font-size: 32px;
    line-height: 60px;
  }
  .puns-text {
    font-size: 28px;
    line-height: 42px;
    box-sizing: border-box;
    margin-bottom: 10px;
    display: -webkit-box;
    .pun-name {
      color:#ccc;
      width: 200px;
    }
    .pun-2{
      width: calc(100% - 200px);
    }
  }

}
</style>
