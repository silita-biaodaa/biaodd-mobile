<!-- 模型： DOM 结构 -->
<template>
    <div class="relevant">
      <div class="rele-list" >
         <div class="rele-title rele-b" >
           <van-icon name="cross" class="rele-icon" @click="closeRele" />
            相关公告
         </div>

         <div class="rele-up"  >
            <div class="rele-text rele-b"  v-for="(el,i) in obj" :key="i"  @click.stop="jump(el)" >
               <div class="rele-left" >
                 {{el.title}}
               </div>
               <van-icon name="arrow" class="rele-right"  />
            </div> 
         </div>
        
      </div>
    </div>
</template>
<script>
export default {
    name: 'relevant', // 结构名称
    data() {
        return {
            // 数据模型a
            id:'',
            source:'',
            obj:[]
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
        this.id = this.$route.query.id
        this.source = this.$route.query.source
        this.gainList()
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
          gainList() {
           let that=this;
           this.$http({
               method:'post',
               url: '/newnocite/correlation/list',
               data:{
                   source:that.source,
                   ntId: that.id
               }
           }).then(function(res){
             if(res.data.code == 1) {
               that.obj = res.data.data
             }
           })
        },
        jump(el) {
            if(el.type == 1) {
             this.$router.push({path:'/article',query:{id:el.id,source:el.source}})
           } else {
              this.$router.push({path:'/notice',query:{id:el.id,source:el.source}})
           }
        },
        closeRele() {
           this.$emit('closeLe');
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
.relevant {
   position: absolute;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   background-color: rgba(0, 0, 0, 0.5);
   z-index: 9999;
   .rele-list {
      width: 100%;
      position: fixed;
      bottom: 0;
      left: 0;
      background-color: #fff;
      .rele-title {
        line-height: 128px;
        font-size:36px;
        font-weight:400;
        text-align: center;
        position: relative;
        .rele-icon {
          position: absolute;
          left: 32px;
          top: 50%;
          transform: translateY(-50%);
          color: #ccc;
          font-size: 34px;
        }
      }
      .rele-up {
         overflow: auto;
         max-height: 550px;
      }
      .rele-text {
        padding: 0 30px;
        height: 128px;
        position: relative;
        .rele-left {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          font-size:28px;
          font-weight:400;
          color:rgba(51,51,51,1);
          line-height:42px;
          width: 80%;
        }
        .rele-right {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 32px;
          color: #ccc;
          font-size: 40px;
        }
      }
   }
   .rele-b {
     border-bottom: 1PX solid #F2F2F2;
   }
} 
</style>
