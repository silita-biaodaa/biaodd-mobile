<!-- 模型： DOM 结构 -->
<template>
    <div class="ancury">
       <div class="aninfo-line" >
          <div style="width:48%" >
            <div class="info-title" >
              城镇职工基本养老保险
            </div>
            <div class="info-main" >
              {{obj.socialSecurity[0].so110 ?obj.socialSecurity[0].so110 + '人' : '' }}
            </div>
          </div>
          <div style="width:48%" >
            <div class="info-title" >
              失业保险
            </div>
            <div class="info-main" >
              {{obj.socialSecurity[0].so210 ?obj.socialSecurity[0].so210 + '人' : '' }}
            </div>
          </div>
       </div>

       <div class="aninfo-line" >
          <div style="width:48%" >
            <div class="info-title" >
             营业总收入
            </div>
            <div class="info-main" >
              企业选择不公示
            </div>
          </div>
          <div style="width:48%" >
            <div class="info-title" >
             职工基本医疗保险
            </div>
            <div class="info-main" >
              {{obj.socialSecurity[0].so310 ?obj.socialSecurity[0].so310 + '人' : '' }}
            </div>
          </div>
       </div>

       <div class="aninfo-line" >
          <div style="width:48%" >
            <div class="info-title" >
             工伤保险
            </div>
            <div class="info-main" >
             {{obj.socialSecurity[0].so410 ?obj.socialSecurity[0].so410 + '人' : '' }}
            </div>
          </div>
          <div style="width:48%" >
            <div class="info-title" >
              生育保险
            </div>
            <div class="info-main" >
              {{obj.socialSecurity[0].so510 ?obj.socialSecurity[0].so510 + '人' : '' }}
            </div>
          </div>
       </div>

       <div class="cury-title" >
          <p>单位缴费基数</p>
       </div>

      <div class="aninfo-line" style="border:none;" >
          <div class="an-width" >
            <div class="info-title" >
             单位参加城镇职工基本养老保险缴费基数
            </div>
          </div>
          <div class="an-width" >
            <div class="info-title" >
              单位参加失业保险缴费基数
            </div>
          </div>
       </div>
        <div class="aninfo-line" >
          <div class="an-width" >
            <div class="info-main" >
              {{obj.socialSecurity[0].totalWagesSo110}}
            </div>
          </div>
          <div class="an-width" >
            <div class="info-main" >
             {{obj.socialSecurity[0].totalWagesSo210}}
            </div>
          </div>
       </div>

      <div class="aninfo-line" style="border:none;" >
          <div style="width:48%" >
            <div class="info-title" >
             单位参加职工基本医疗保险缴费基数
            </div>
          </div>
          <div class="an-width" >
            <div class="info-title" >
              单位参加生育保险缴费基数
            </div>
          </div>
       </div>
       <div class="aninfo-line" >
          <div style="width:48%" >
            <div class="info-main" >
              {{obj.socialSecurity[0].totalWagesSo310}}
            </div>
          </div>
          <div class="an-width" >

            <div class="info-main" >
              &nbsp
            </div>
          </div>
       </div>

       <div class="cury-title" >
          <p>本期实际缴费金额</p>
       </div>

       <div class="aninfo-line" >
          <div class="an-width" >
            <div class="info-title" >
             参加城镇职工基本养老保险本期实际缴费基数
            </div>
            <div class="info-main" >
              {{obj.socialSecurity[0].totalPaymentSo110}}
            </div>
          </div>
          <div class="an-width" >
            <div class="info-title" >
              参加失业保险本期实际缴费基数
            </div>
            <div class="info-main" >
              {{obj.socialSecurity[0].totalPaymentSo210}}
            </div>
          </div>
       </div>

        <div class="aninfo-line" >
          <div class="an-width" >
            <div class="info-title" >
             参加职工基本医疗保险本期实际缴费基数
            </div>
            <div class="info-main" >
              {{obj.socialSecurity[0].totalPaymentSo310}}
            </div>
          </div>
          <div class="an-width" >
            <div class="info-title" >
              参加工伤保险本期实际缴费基数
            </div>
            <div class="info-main" >
              {{obj.socialSecurity[0].totalPaymentSo410}}
            </div>
          </div>
       </div>

         <div class="aninfo-line" >
          <div>
            <div class="info-title" >
             参加生育保险本期实际缴费基数
            </div>
            <div class="info-main" >
              {{obj.socialSecurity[0].totalPaymentSo510}}
            </div>
          </div>  
        </div>

       <div class="cury-title" >
          <p>单位累计欠缴金额</p>
       </div>

       <div class="aninfo-line" >
          <div class="an-width" >
            <div class="info-title" >
            单位参加城镇职工基本养老保险累计欠缴金额
            </div>
            <div class="info-main" >
              {{obj.socialSecurity[0].unpaidSocialInsSo110}}
            </div>
          </div>
          <div class="an-width" >
            <div class="info-title" >
              单位参加失业保险累计欠缴金额
            </div>
            <div class="info-main" >
              {{obj.socialSecurity[0].unpaidSocialInsSo210}}
            </div>
          </div>
       </div>
       
        <div class="aninfo-line" >
          <div class="an-width" >
            <div class="info-title" >
             单位参加职工基本医疗保险累计欠缴金额
            </div>
            <div class="info-main" >
              {{obj.socialSecurity[0].unpaidSocialInsSo310}}
            </div>
          </div>
          <div class="an-width" >
            <div class="info-title" >
              单位参加工伤保险累计欠缴金额
            </div>
            <div class="info-main" >
              {{obj.socialSecurity[0].unpaidSocialInsSo410}}
            </div>
          </div>
       </div>

         <div class="aninfo-line" >
          <div>
            <div class="info-title" >
             单位参加生育保险累计欠缴金额
            </div>
            <div class="info-main" >
              {{obj.socialSecurity[0].unpaidSocialInsSo510}}
            </div>
          </div>  
        </div>
    </div>
</template>
<script>
export default {
    name: 'ancury', // 结构名称
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
.ancury {
  .cury-title {
    height: 98px;
    display: flex;
    align-items: center;
    font-size: 32px;
    color:#333;
    border-bottom: 1PX solid #F2F2F2;
    p {
      border-left: 3PX solid #FE6603;
      padding-left: 15px;
      
    }
  }
}
</style>
