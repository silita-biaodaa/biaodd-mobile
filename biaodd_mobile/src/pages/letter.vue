<!-- 模型： DOM 结构 -->
<template>
    <div class="letter">
      <top-back :title='name'></top-back>
      <div class="letter-de">
         <div class="letter-title">
            <div class="letter-name">
              <div style="display:flex">
                <p>{{detail.comName}}</p>
                <div class="letter-save">{{detail.subsist}}</div>
              </div>
              <v-follow :id="id" :type="'qy'" :collected="collected"></v-follow>
            </div>
            <div class="letter-lead">
              <span  style="color:#FE6603">
                {{detail.legalPerson}}
              </span>
              <span class="person">
                 法人代表
              </span>
            </div>
            <div class="letter-iphone">
              <van-icon name="phone-o" />
              <template v-if="isMore">
                <span class="iphone">
                  {{detail.phone}}
                </span>
                <span class="le-col" @click="more">
                  更多
                </span>
              </template>
              <template v-else>
                <span class="iphone">
                  {{phone}}
                </span>
              </template>
            </div>
            <div class="letter-url">
               <van-icon name="location-o" />
               <p style="color:#666666">
                  {{detail.comAddress}}
               </p>               
            </div>
         </div>

        <div class="letter-nav">
          <div>
              <span v-for="(o,i) of navList" :key="i" :class="navNum==i?'active':''" @click="jump(i)">{{o}}</span>
          </div>
        </div>
        <div class="letter-detail">
            <template v-if="navNum==0">
              <!-- 工商 -->
              <v-gs></v-gs>
            </template>
            <template v-else-if="navNum==1">
              <!-- 法务 -->
              <v-fw :more="fwIsVip"></v-fw>
            </template>
            <template v-else-if="navNum==2">
              <!-- 资质 -->
              <v-zz></v-zz>
            </template>
            <template v-else-if="navNum==3">
              <!-- 人员 -->
              <v-ry></v-ry>
            </template>
            <template v-else-if="navNum==4">
              <!-- 业绩 -->
              <v-yj></v-yj>
            </template>
            <template v-else-if="navNum==5">
              <!-- 中标 -->
              <v-zb></v-zb>
            </template>
             <template v-else-if="navNum==6">
              <!-- 诚信 -->
              <v-gl></v-gl>
            </template>
        </div>

      </div>
      <v-vip :mask="isvip" :txt="'查看企业更多电话号码，请开通会员'"></v-vip>
      
      <v-load v-if="isload"></v-load>
    </div>
</template>
<script>
import topBack from '@/components/topback'
import commerce from '@/components/enterprise/commerce'
import affairs from '@/components/enterprise/affairs'
import qual from '@/components/enterprise/qual'
import people from '@/components/enterprise/people'
import achievement from '@/components/enterprise/achievement'
import bid from '@/components/enterprise/bid'
import good from '@/components/enterprise/good'
import loading from '@/components/loading'
import follow from '@/components/followBtn'
export default {
    name: 'letter', // 结构名称
    data() {
        return {
            // 数据模型
             name:'企业详情',
             detail:{},
             phone:'',
             navList:['工商','法务','资质','人员','业绩','中标','诚信'],
             navNum:0,
             isload:true,
             mask:false,
             vipStr:'',
             isvip:false,
             fwIsVip:false,
             collected:false,
             id:'',
             isMore:true,
            //  path:'/commerc'
        }
    },
    watch: {
        // 监控集合
    },
    components: {
       'top-back':topBack,
       'v-fw':  affairs,
       'v-gs':commerce,
       'v-zz':qual,
       'v-ry':people,
       'v-yj':achievement,
       'v-zb':bid,
       'v-gl':good,
       'v-load':loading,
       'v-follow':follow
    },
    props: {
        // 集成父级参数
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
        if(sessionStorage.getItem('permissions')){
          this.vipStr=sessionStorage.getItem('permissions');
        }
        this.id = this.$route.query.id
         let that=this;
            this.$http({
                method:'post',
                url: '/company/' + this.id,
                data:{
                   
                }
            }).then(function(res){
                that.detail = res.data.data;
                var arr = []
                arr = that.detail.phone.split(';');
                that.phone=res.data.data.phone;
                if(that.vipStr.indexOf('comPhone')==-1){
                  that.detail.phone =that.resetPhone(arr[0]) 
                }else{
                  that.detail.phone=arr[0]
                } 
                that.collected=res.data.data.collected
                that.isload=false
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
        more(){
          if(this.vipStr.indexOf('comPhone')==-1){
            this.isvip=true;
            this.modalHelper.afterOpen();
          }else{
            this.isMore=false;
          }
        },
        // canelFn(){
        //   this.mask=false;
        //   this.modalHelper.beforeClose();
        // },
        // sureFn(){
        //   this.mask=false;
          
        //    window.location.href='https://a.app.qq.com/o/simple.jsp?pkgname=com.yaobang.biaodada';
        // },
        resetPhone(phone) {
          var str = String(phone)
          var len = str.length;
          if (len >= 7) {
            var reg = str.slice(-8, -4)
            return str.replace(reg, "****")
          }
        },
        jump(i){
          if(i==1&&this.vipStr.indexOf('comLaw')==-1){
            this.fwIsVip=true
          }
          this.navNum=i
        }

    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style scoped lang='less'>
.letter {    

 padding-top: 100px;
 min-height:100vh;
 background: #f5f5f5;
 box-sizing: border-box;
 .le-col{
   color:#FE6603;
 }
 .letter-de {
   background-color: #f5f5f5;
   .letter-title {
     padding: 49px 35px 31px;
     background-color: #fff;
     margin-bottom: 16px;
    .letter-name {
      font-size: 32px;
      color:#333;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 47px;
      p {
        max-width: 550px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
    }
     .letter-save {
       height: 39px;
       width: 70px;
       border: 1PX solid #FE6603;
       color:#FE6603;
       border-radius: 8px;
       text-align: center;
       line-height: 39px;
       box-sizing: border-box;
       margin-left: 29px;
       font-size:24px;
     }
   }
   .letter-lead {
     font-size: 28px;
     color:#FE6603;
     margin-bottom: 40px;
     .person {
       font-size: 24px;
       color:#999;
       margin-left: 15px;
     }
   }
   .letter-iphone {
     font-size: 28px;
     display: flex;
     align-items: center;
     margin-bottom: 40px;
     i {
       font-size: 36px;
       color:#FE6603;
     }
     .iphone {
       margin-left: 16px;
       margin-right: 36px;
       color:#FE6603;
     }
   }
   .letter-url {
     font-size: 28px;
     display: flex;
     align-items: center;
     box-sizing: border-box;
     color:#666;
     i {
       font-size: 36px;
       margin-right: 15px;
     }
     p {
       width: 100%;
       overflow: hidden;
       text-overflow:ellipsis;
       white-space: nowrap;
     }
   }
 }
 .letter-nav {
   height: 96px;
   background-color: #fff;
  //  padding: 0 32px;
   overflow-x:scroll;
   line-height: 96px;
   border-bottom: 1PX solid #F2F2F2;
    div{
      width: 126%;
      span{
        width: 14%;
        display: inline-block;
        text-align: center;
      }
      .active{
        color: #FE6603
      }
    }
   
 }
}
  
</style>
