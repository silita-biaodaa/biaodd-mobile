<!-- 模型： DOM 结构 -->
<template>
    <div class="corrList">
          <div class="corr-text all-css" v-for="(el,i) in corrList" :key="i"  @click="jumpart(el)" >
            <div>
              {{el.title}}
            </div>
            <div>
                 <van-icon name="arrow" />
            </div>
          </div>
    </div>
</template>
<script>
export default {
    name: 'corrList', // 结构名称
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
        corrList:{
           default:[]
        }
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
        // closecorr() {
        //    this.$emit('recordFn');
        // },
        jumpart(el) {
           this.$emit('recordFn');
           if(el.type == 1) {
             this.$router.push({path:'/article',query:{id:el.id,source:el.source}})
           } else {
              this.$router.push({path:'/notice',query:{id:el.id,source:el.source}})
           }
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
.corrList {
     .all-css {
        font-size: 32px;
        color:#333;
        padding: 0 35px; 
        display: flex;
        justify-content: space-between;
        border-bottom: 1PX solid #F2F2F2;
     }
     .corr-text {
       min-height: 88px;
       line-height: 45px;
       align-items: center;
       padding: 10px 35px; 
     }
}
</style>
