<!-- 模型： DOM 结构 -->
<template>
    <div class="new-tetx">
        <svg width="42" height="42" viewBox="25 25 50 50" class="circular" >
          <circle id="mycircle" cx="50" cy="50" r="20" fill='none' class="path" />
        </svg>
        <p>正在加载中，请稍等</p>
        <!-- <div class="line" >
          <van-icon name="replay"  class="circular" />
          <p>正在加载中，请稍等</p>
        </div> -->
    </div>
</template>
<script>
export default {
    name: 'new-tetx', // 结构名称
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
.new-tetx {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: #fff;
  opacity: 0.5;
  .circular {
    animation:loading-rotate 2s linear infinite;
    .path {
      stroke-width: 2;  // 厚度
      stroke-linecap:round;  // 两端的形状
      stroke-dasharray: 90,150;  // 虚线
      stroke-dashoffset: 0;  // 偏移大小
      stroke: #409eff;
      animation: loading-dash 1.5s ease-in-out infinite;
    }
  }
  .line {
    margin-top: 50px;
    text-align: center;
  }
  @keyframes loading-rotate {
   100% {
      transform: rotate(1turn);
    }
  }
   @keyframes loading-dash {
    0% {
      stroke-dasharray: 1,200;
      stroke-dashoffset: 0; 
    }
    50% {
        stroke-dasharray: 90,150;
        stroke-dashoffset: -40px;
    }
    100% {
        stroke-dasharray: 90,150;
        stroke-dashoffset: -120px;
    }
  }
  
}

</style>
