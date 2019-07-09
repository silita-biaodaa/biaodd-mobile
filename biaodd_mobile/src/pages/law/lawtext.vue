<!-- 模型： DOM 结构 -->
<template>
  <div class="winning">
    <top-back :title='name' ></top-back>
    <div class="win-text">
      <div class="win-title">
        <p>
          {{detail.title}}
        </p>
        <div class="win-time">
          <div class="win-c" >
            发布时间：{{detail.dateStr}}
          </div>
          <div class="win-c">
            浏览量：<span class="color" >{{detail.clickCount}}</span>
          </div>
        </div>
        <div class="win-one">
            法院：{{detail.court}}
          </div>
          <div class="win-one" >
            案号：{{detail.caseNo }} 
          </div>
      </div>
      <div class="win-contant" v-html="detail.content"  >

      </div>
    </div>
  </div>
</template>
<script>
import topBack from '@/components/topback'
export default {
    name: 'winning', // 结构名称
    data() {
        return {
            // 数据模型
            name:'法务详情',
            detail:{},
            clickCount:0,
            id:'',
            commentLength:0,
        }
    },
    watch: {
        // 监控集合
    },
    components: {
      'top-back':topBack,
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
        // this.source = this.$route.query.source
        let that=this;
        this.$http({
            method:'post',
            url: '/law/detail',
            data:{
               id:that.id
            }
        }).then(function(res){
           that.detail = res.data.data
        })
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
<style scoped lang="less" > 
.winning {
padding-bottom: 101px;
background: #F8F8F8;
 .win-text {
   background: #fff;
   margin-top: 91px;
   min-height: calc(~"100vh - 101px");
   padding-bottom: 90px;
   overflow-x: auto;
   overflow-y: auto;
   .win-title {
     padding: 35px 35px 0;
     font-size: 32px;
     color:#333;
     border-bottom: 1PX solid #F5F5F5;
      p {
       text-align: center;
     }
     .win-time {
       display: flex;
       margin-bottom: 20px;
       font-size: 20px;
       margin-top: 20px;
       .win-c {
          color:#999;
          margin-right: 70px;
       }
     }
       .win-one {
        font-size: 24px;
        color:#666;
        margin-bottom: 10px;
      }
   }
   .win-to {
     height: 88px;
     display: flex;
     align-items: center;
     justify-content: space-between;
     font-size: 32px;
     color:#333;
     padding: 0 35px;
     border-bottom: 1PX solid #f5f5f5;
     cursor: pointer;
   }
   .win-contant {
     padding: 35px;
   }
 }
}
</style>
