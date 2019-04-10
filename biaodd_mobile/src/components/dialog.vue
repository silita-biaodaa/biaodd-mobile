<!-- 模型： DOM 结构 -->
<template>
    <div class="dia"  >
       <div class="d-hint">
         <h3>提示</h3>
         <p class="d-hi">
           暂无权限,请先登录
         </p>
         <div class="btn">
            <!-- <div class="d-btn left" @click="cancel" >
              取消
            </div> -->
            <div class="d-btn left"  @click="jump" >
              确定
            </div>
         </div>
       </div>
      <v-load  ></v-load>
    </div>
</template>
<script>
import loading from '@/components/loading'
export default {
    name: 'dia', // 结构名称
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
    components: {
       'v-load':loading
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
        cancel() {
          this.isall = false
        },
        jump() {
          this.$router.push('/logo')
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
.dia {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .d-hint {
    width: 80%;
    position: fixed;
    top: 35%;
    left: 50%;
    transform: translateX(-50%);
    height: 300px;
    background-color: #fff;    
    z-index: 9999999;
    display: flex;
    flex-direction:column;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 8px;
    .d-hi {
      margin-top: 50px;
      color: #999;
    }
    .btn {
      position: absolute;
      left: 0;
      bottom: 0;
      height: 80px;
      width: 100%;
      border-top: 1px solid #f5f5f5;
      .d-btn {
        line-height: 80px;
        text-align: center;
        font-size: 32px;
        width: 100%;
        color: #FE6603;
        border-left: 1px solid #f5f5f5;
      }
    }
  }
}
</style>
