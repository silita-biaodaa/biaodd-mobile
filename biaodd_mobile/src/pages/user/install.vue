<!-- 模型： DOM 结构 -->
<template>
    <div class="install">
       <top-back :title='name'></top-back>
       <div class="in-nav"  @click="jump" >
         <div>
           修改密码
         </div>
         <van-icon name="arrow" class="in-i" />
       </div>
       <div class="in-b">
         <div class="in-btn" @click="quit" >
           退出登录
         </div>
       </div>
    </div>
</template>
<script>
import topBack from '@/components/topback'
export default {
    name: 'install', // 结构名称
    data() {
        return {
            // 数据模型
            name:'设置'
        }
    },
    watch: {
        // 监控集合
    },
    props: {
        // 集成父级参数
    },
    components: {
       'top-back':topBack,
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
        jump() {
            this.$router.push('/find')
        },
        quit() {
            localStorage.removeItem('xtoken')
            localStorage.removeItem('Bname')
            sessionStorage.removeItem('permissions')
            this.$router.push('/')
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
.install {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #F5F5F5;
  padding-top: 92px;
  .in-nav {
     font-size: 32px;
     height: 112px;
     color:#333;
     padding: 0 35px ;
     background-color: #fff;
     font-weight: 550;
     box-sizing: border-box;
     display: flex;
     align-items: center;
     justify-content: space-between;
     margin: 16px 0;
     .in-i {
       font-size: 50px;
     }
  }
  .in-b {
    height: 100%;
    background-color: #fff;
    padding-top: 450px;
    .in-btn {
      width: 80%;
      height: 88px;
      border-radius: 44px;
      background-color: #FE6603;
      margin: 0 auto;
      color:#fff;
      line-height: 88px;
      text-align: center;
    }
  }
}
</style>
