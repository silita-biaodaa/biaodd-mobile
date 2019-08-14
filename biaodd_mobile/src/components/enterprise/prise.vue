<!-- 模型： DOM 结构 -->
<template>
    <div class="prise">
        <top-back :title="'获奖详情'"  ></top-back>
        <h5>
          {{detail.projName}}
        </h5>

        <div  class="prise-name" > 
            <div class="prise-left" >
               奖项名称：
            </div>
            <div  class="prise-right" >
               {{detail.awardName}}
            </div>
        </div>

        <div  class="prise-name" > 
            <div class="prise-left" >
               工程名称：
            </div>
            <div  class="prise-right" >
               {{detail.projName}}
            </div>
        </div>

        <div  class="prise-name"  v-show="detail.projType" > 
            <div class="prise-left" >
               项目类型：
            </div>
            <div  class="prise-right" >
                {{detail.projType}}
            </div>
        </div>

        <div  class="prise-name" v-show="detail.acreage" > 
            <div style="width:26%" >
               建筑面积(m2)： 
            </div>
            <div  style="width:73%" >
               {{detail.acreage}}
            </div>
        </div>

         <div  class="prise-name"  > 
            <div class="prise-left" >
               单位名称：
            </div>
            <div  class="prise-right" >
               <span v-for="(el,i) in detail.unitOrg"  :key="i" class="color" >{{el.comName}}&nbsp<i v-show="i !=  detail.unitOrg.length -1" class="color" >,</i>&nbsp</span>
            </div>
         </div>

        <div  class="prise-name" v-show="detail.projManager" > 
            <div class="prise-left" >
               项目经理：
            </div>
            <div  class="prise-right" >
               {{detail.projManager}}
            </div>
         </div>

          <div  class="prise-name" v-show="detail.skillManager" > 
            技术负责人：{{detail.skillManager}}
         </div>

          <div  class="prise-name" v-show="detail.qualityManager" > 
            质量负责人：{{detail.qualityManager}}
         </div>

         <div  class="prise-name" v-show="detail.techQualManage" > 
            技术质量负责人：{{detail.techQualManage}}
         </div>

        <div  class="prise-name"  v-show="detail.buildOrg"  > 
            <div class="prise-left" >
               建设单位：
            </div>
            <div  class="prise-right" >
               <span v-for="(el,i) in detail.buildOrg"  :key="i"  @click.stop="letter(el)" class="color" >{{el.comName}}&nbsp<i v-show="i !=  detail.buildOrg.length -1"  class="color" >,</i>&nbsp</span>
            </div>
         </div>

          <div  class="prise-name"  v-show="detail.superOrg" > 
            <div class="prise-left" >
               监理单位：
            </div>
            <div  class="prise-right" >
                <span v-for="(el,i) in detail.superOrg"  :key="i"  @click.stop="letter(el)" class="color" >{{el.comName}}&nbsp<i v-show="i !=  detail.superOrg.length -1"  class="color"  >,</i>&nbsp</span>
            </div>
         </div>

         <div  class="prise-name"  v-show="detail.superPerson" > 
            总监理工程师：{{detail.superPerson}}
         </div>

          <div  class="prise-name"  v-show="detail.exploreOrg" > 
            <div class="prise-left" >
               勘察单位：
            </div>
            <div  class="prise-right" >
              <span v-for="(el,i) in detail.exploreOrg"  :key="i"  @click.stop="letter(el)" class="color" >{{el.comName}}&nbsp<i v-show="i !=  detail.exploreOrg.length -1"  class="color" >,</i>&nbsp</span>
            </div>
         </div>

          <div  class="prise-name"   v-show="detail.designOrg"> 
            <div class="prise-left" >
               设计单位：
            </div>
            <div  class="prise-right" >
               <span v-for="(el,i) in detail.designOrg"  :key="i"   @click.stop="letter(el)" class="color" >{{el.comName}}&nbsp<i v-show="i !=  detail.designOrg.length -1"  class="color" >,</i>&nbsp</span>
            </div>
         </div>

          <div  class="prise-name"  v-show="detail.checkOrg"> 
            <div class="prise-left" >
               监督单位：
            </div>
            <div  class="prise-right" >
               <span v-for="(el,i) in detail.checkOrg"  :key="i"  @click.stop="letter(el)"  class="color" >{{el.comName}}&nbsp<i v-show="i !=  detail.checkOrg.length -1"  class="color" >,</i>&nbsp</span>
            </div>
         </div>

          <div  class="prise-name"  v-show="detail.joinOrg"> 
            <div class="prise-left" >
               参建单位：
            </div>
            <div  class="prise-right" >
               <span v-for="(el,i) in detail.joinOrg"  :key="i"  @click.stop="letter(el)"  class="color" >{{el.comName}}&nbsp<i v-show="i !=  detail.joinOrg.length -1"  class="color" >,</i>&nbsp</span>
            </div>
         </div>

          <div  class="prise-name" v-show="detail.remark" > 
            备注：{{detail.remark}}
         </div>

          <div  class="prise-name" v-show="detail.pubOrg"> 
            <div class="prise-left" >
               发布单位：
            </div>
            <div  class="prise-right"  >
              {{detail.pubOrg}}
            </div>
         </div>

         <div  class="prise-name" > 
            发布日期：{{detail.issued}}
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
            detail:{}
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
        this.id = this.$route.query.id
        this.gainDel()
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
          gainDel() {
           let that=this;
            this.$http({
                method:'post',
                url: 'reputation/detail' ,
                data:{
                  pkid:that.id
                }
            }).then(function(res){
              if(res.data.code == 1) {
                 that.detail = res.data.data
              }
            })
        },
        letter(o) {
           if(!o.comId) {
              return false
           }
           this.$router.push({path:'/letter',query:{id:o.comId,name:o.comName}})
        }
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
