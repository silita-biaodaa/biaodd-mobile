<!-- 模型： DOM 结构 -->
<template>
    <div class="aninfo">
       <div class="aninfo-line" style="border:none"  >
          <div style="width:48%" >
            <div class="info-title" >
              统一社会信用代码
            </div>
          </div>
          <div style="width:48%" >
            <div class="info-title" >
              企业名称
            </div>
          </div>
       </div>
        <div class="aninfo-line" >
          <div style="width:48%" >
            <div class="info-main" >
              {{obj.basic.uniscId}}
            </div>
          </div>
          <div style="width:48%" >
            <div class="info-main" >
              {{obj.comName}}
            </div>
          </div>
       </div>
        <div class="aninfo-line"  style="border:none" >
          <div style="width:48%" >
            <div class="info-title" >
              企业经营状况
            </div>
          </div>
          <div style="width:48%" >
            <div class="info-title" >
              企业控股情况
            </div>
          </div>
       </div>
       <div class="aninfo-line" >
          <div style="width:48%" >
            <div class="info-main" >
              {{obj.basic.busSt}}
            </div>
          </div>
          <div style="width:48%" >
            <div class="info-main" >
              {{obj.basic.holdingSmsg}}
            </div>
          </div>
       </div>

       <div class="aninfo-line" >
          <div style="width:48%" >
            <div class="info-title" >
              企业联系电话
            </div>
            <div class="info-main" >
              {{obj.basic.tel}}
            </div>
          </div>
          <div style="width:48%" >
            <div class="info-title" >
              企业电子邮箱
            </div>
            <div class="info-main" >
              {{obj.basic.email}}
            </div>
          </div>
       </div>

        <div class="aninfo-line" >
          <div style="width:48%" >
            <div class="info-title" >
              从业人数
            </div>
            <div class="info-main" >
              {{obj.basic.empNum}}
            </div>
          </div>
          <div style="width:48%" >
            <div class="info-title" >
              其中女性从业人数
            </div>
            <div class="info-main" >
              企业选择不公式
            </div>
          </div>
       </div>

       
        <div class="aninfo-line" >
          <div style="width:48%" >
            <div class="info-title" >
              企业通信地址
            </div>
            <div class="info-main" >
              {{obj.basic.addr}}
            </div>
          </div>
          <div style="width:48%" >
            <div class="info-title" >
              邮政编码
            </div>
            <div class="info-main" >
              {{obj.basic.postalCode}}
            </div>
          </div>
       </div>

        <div class="aninfo-line" style="border:none" >
          <div style="width:48%" >
            <div class="info-title" >
              是否有投资信息或购买其他公司股权
            </div>
          </div>
          <div style="width:48%" >
            <div class="info-title" >
              是否有网站或网店
            </div>
          </div>
       </div>
        <div class="aninfo-line" >
          <div style="width:48%" >
            <div class="info-main" >
              &nbsp
            </div>
          </div>
          <div style="width:48%" >
            <div class="info-main" >
              {{obj.website == null ? '有' : '无'}}
            </div>
          </div>
       </div>

        <div class="aninfo-line" style="border:none" >
          <div style="width:48%" >
            <div class="info-title" >
              是否有对外提供担保信息
            </div>
          </div>
          <div style="width:48%" >
            <div class="info-title" >
              有限责任公司本年度是否发生股东股权转让
            </div>
          </div>
       </div>
       <div class="aninfo-line"  >
          <div style="width:48%" >
            <div class="info-main" >
              否
            </div>
          </div>
          <div style="width:48%" >
            <div class="info-main" >
              &nbsp
            </div>
          </div>
       </div>

       <div>
         <div class="aninfo-line" style="border:none"  >
           <div >
             <div class="info-title" >
               企业主营业务活动
             </div>
           </div>
         </div>
         <div class="info-text" >
           {{obj.basic.mainBusiAct ? obj.basic.mainBusiAct : '&nbsp'}}
         </div>
       </div>
        

    </div>
</template>
<script>
export default {
    name: 'aninfo', // 结构名称
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
<style  lang='less' >
.aninfo {
  background-color: #fff;
    .info-text {
      font-size: 24px;
      color:#333;
    }
}
</style>
