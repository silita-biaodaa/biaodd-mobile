<!-- 模型： DOM 结构 -->
<template>
    <div class="prise">
        <top-back :title="'获奖详情'"  ></top-back>
        <h5>
          杨店社区北片区施工6#楼 被评为 2018～2019年度第一批湖北省建筑结构优质工程
        </h5>

        <div  class="prise-name" > 
            <div class="prise-left" >
               奖项名称：
            </div>
            <div  class="prise-right" >
               2018～2019年度第一批湖北省建筑结构优质工程
            </div>
        </div>

        <div  class="prise-name" > 
            <div class="prise-left" >
               工程名称：
            </div>
            <div  class="prise-right" >
               2018～2019年度第一批湖北省建筑结构优质工程
            </div>
        </div>

        <div  class="prise-name" > 
            <div class="prise-left" >
               项目类型：
            </div>
            <div  class="prise-right" >
               2018～2019年度第一批湖北省建筑结构优质工程
            </div>
        </div>

        <div  class="prise-name" > 
            <div style="width:26%" >
               建筑面积(m2)： 
            </div>
            <div  style="width:73%" >
               2018～2019年度第一批湖北省建筑结构优质工程
            </div>
        </div>

         <div  class="prise-name" > 
            <div class="prise-left" >
               单位名称：
            </div>
            <div  class="prise-right" >
               2018～2019年度第一批湖北省建筑结构优质工程
            </div>
         </div>

        <div  class="prise-name" > 
            <div class="prise-left" >
               项目经理：
            </div>
            <div  class="prise-right" >
               李三
            </div>
         </div>

          <div  class="prise-name" > 
            技术负责人：李二
         </div>

          <div  class="prise-name" > 
            质量负责人：李四
         </div>

         <div  class="prise-name" > 
            技术质量负责人：李武
         </div>

        <div  class="prise-name" > 
            <div class="prise-left" >
               建设单位：
            </div>
            <div  class="prise-right" >
               2018～2019年度第一批湖北省建筑结构优质工程
            </div>
         </div>

          <div  class="prise-name" > 
            <div class="prise-left" >
               监理单位：
            </div>
            <div  class="prise-right" >
               2018～2019年度第一批湖北省建筑结构优质工程
            </div>
         </div>

         <div  class="prise-name" > 
            总监理工程师：李武
         </div>

          <div  class="prise-name" > 
            <div class="prise-left" >
               勘察单位：
            </div>
            <div  class="prise-right" >
               2018～2019年度第一批湖北省建筑结构优质工程
            </div>
         </div>

          <div  class="prise-name" > 
            <div class="prise-left" >
               设计单位：
            </div>
            <div  class="prise-right" >
               2018～2019年度第一批湖北省建筑结构优质工程
            </div>
         </div>

          <div  class="prise-name" > 
            <div class="prise-left" >
               监督单位：
            </div>
            <div  class="prise-right" >
               2018～2019年度第一批湖北省建筑结构优质工程
            </div>
         </div>

          <div  class="prise-name" > 
            <div class="prise-left" >
               参建单位：
            </div>
            <div  class="prise-right" >
               2018～2019年度第一批湖北省建筑结构优质工程
            </div>
         </div>

          <div  class="prise-name" > 
            备注：李武
         </div>

          <div  class="prise-name" > 
            <div class="prise-left" >
               发布单位：
            </div>
            <div  class="prise-right" >
               2018～2019年度第一批湖北省建筑结构优质工程
            </div>
         </div>

         <div  class="prise-name" > 
            发布日期：李武
         </div>


    </div>
</template>
<script>
import topBack from '@/components/topback'
export default {
    name: 'prise', // 结构名称
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
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
.prise {
  padding: 132px 47px 150px 32px;
  h5 {
    font-size:32px;
    line-height:42px;
    margin-bottom: 35px;
  }
   .prise-name {
      overflow: hidden;
      display: flex;
      font-size: 24px;
      line-height: 50px;
      .prise-left {
        width: 19%;
      }
      .prise-right {
        width: 79%;
      }
    }
}
</style>
