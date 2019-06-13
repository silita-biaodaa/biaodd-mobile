<!-- 模型： DOM 结构 -->
<template>
    <div class="nott">
      
      <div v-if="!isError"  class="noo-img" >
        <img src="../assets/nolist.png" alt="">
        <div class="not-f" >
          {{msg}}
        </div>
      </div>
        <div class="error" v-else>
            <img src="../assets/load-error.png" alt="">
            <div class="not-f" >加载失败</div>
            <div class="not-f" @click="clickTap" style="color:#FE6603">点击重新加载</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'not', // 结构名称
    data() {
        return {
            // 数据模型
            msg:'Sorry，没有找到符合条件的公告信息'
        }
    },
    inject:['reload'],
    watch: {
        // 监控集合
    },
    props: {
        // 集成父级参数
        isError:{
            default:false
        },
        hint:{
            default:''
        }
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
        // this.hint()
        this.msg = this.hint
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
        clickTap(){
            this.reload();
        },
        // hint() {
        //    if(this.$route.fullPath == '/bid' || this.$route.fullPath == '/tender'  ) {
        //         this.msg = 'Sorry，没有找到符合条件的公告信息'
        //    } else if(this.$route.fullPath == '/company') {
        //         this.msg = 'Sorry，没有找到符合条件的企业信息'
        //    } else if(this.$route.fullPath == '/yjList') {
        //         this.msg = 'Sorry，没有找到符合条件的业绩信息'
        //    } else if(this.$route.fullPath == '/ryList') {
        //         this.msg = 'Sorry，没有找到符合条件的人员信息'
        //    }
            
        // }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style scoped lang='less'>
.nott {
 display: flex;
 justify-content: center;
 .noo-img {
    display: flex;
    flex-direction: column;
    align-items: center;
 }
 img {
   margin-top: 138px;
   width: 250px;
 }
 .not-f {
   margin-top: 37px;
   font-size: 28px;
   color:#666;
   text-align: center;
 }
 .error{
     img{
         width: 239px;
         margin-top: 150px;
     }
 }
}
</style>
