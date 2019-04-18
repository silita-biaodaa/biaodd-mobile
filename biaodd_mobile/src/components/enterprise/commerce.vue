<!-- 模型： DOM 结构 -->
<template>
    <div class="commerce">
      <template v-if="isajax">
        <template v-if="isError">
          <v-not :isError="isError"></v-not>
        </template>
        <template v-else>
          <div class="com-basic">
          <div class="ba-title">
             基本信息
          </div>
          <div class="bas-test">
             <div class="bas-line">
                 <div class="left bas-first">
                     法定代表
                 </div>
                 <div class="left color">
                    {{detail.legalPerson}}
                 </div>
             </div>
              <div class="bas-line">
                 <div class="left bas-first">
                     注册号
                 </div>
                 <div class="left">
                     {{detail.businessNum}}
                 </div>
             </div>
              <div class="bas-line">
                 <div class="left bas-first">
                    注册资本
                 </div>
                 <div class="left ">
                     {{detail.regisCapital}}
                 </div>
             </div>
              <div class="bas-line">
                 <div class="left bas-first">
                     安许证号
                 </div>
                 <div class="left ">
                     {{detail.certNo}}
                 </div>
             </div>
              <div class="bas-line">
                 <div class="left bas-first">
                     安许期限 
                 </div>
                 <div class="left">
                     {{detail.validDate}}
                 </div>
             </div>
              <div class="bas-line">
                 <div class="left bas-first">
                     企业类型 
                 </div>
                 <div class="left bas-two">
                    {{detail.economicType}}
                 </div>
             </div>
               <div class="bas-line">
                 <div class="left bas-first">
                     经营范围 
                 </div>
                 <div class="left bas-two">
                     {{detail.comRange}}
                 </div>
             </div>
          </div>
        </div>

        <div class="branch">

          <div class="ba-title">
             分支机构({{total}})
          </div>

           <div class="letter-title" v-for="(el,i) in lists" :key="i" >
            <div class="letter-name">
              <p>
               {{el.comName}}
              </p>
            </div>
            <div class="letter-lead">
              <span class="person color">
                 负责人 &nbsp : &nbsp
              </span>
              <span class="color" >
                  {{el.legalPerson}}
              </span>
              
            </div>
            <div class="letter-iphone">
              <van-icon name="phone-o" />
              <span class="iphone">
                <template v-if="isVip">
                  {{el.phone ? el.phone : '--' }}
                </template>
                <template v-else>
                  {{el.phone ? resetPhone(el.phone) : '--' }}
                </template>
                
              </span>
            </div>
            <div class="letter-url">
               <van-icon name="location-o" />
               <p>
                   {{el.comAddress}}
               </p>               
            </div>
           </div>

        </div>
        </template>
        
      </template>
      <template v-else>
        <van-loading size="50px"></van-loading>
      </template>
        
    </div>
</template>
<script>
import not from '@/components/not'
export default {
    name: 'commerce', // 结构名称
    data() {
        return {
            // 数据模型
            detail:{},
            id:'',
            lists:[],
            total:0,
            isajax:false,//是否加载完
            isError:false,//是否加载失败
            isVip:false,
        }
    },
    watch: {
        // 监控集合 
    },
    props: {
        // 集成父级参数
    },
    components:{
      'v-not':not
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
        if(sessionStorage.getItem('permissions')){
          let vipstr=sessionStorage.getItem('permissions');
          if(vipstr.indexOf('comPhone')!=-1){
            this.isVip=true;
          }
        }
         this.id = this.$route.query.id
         let that=this;
            this.$http({
                method:'post',
                url: '/company/' + that.id,
                data:{
                   
                }
            }).then(function(res){
                that.detail = res.data.data
                var arr = []
                arr = that.detail.phone.split(';')
                that.detail.phone = arr[0];
                that.isajax=true;
             }).catch(function(res){
                that.isajax=true;
                that.isError=true;
            })
           this.$http({
                method:'post',
                url: '/company/branchCompany',
                data:{
                   comId:that.id
                }
            }).then(function(res){
                // console.log(res.data.data);
                that.lists = res.data.data  
                 that.total = that.lists.length
                var arr = []
                that.lists.forEach(el => {
                    if(el.phone) {
                       arr = el.phone.split(';')
                       el.phone = arr[0]
                       arr.length =0
                    }
                })
               
             }).catch(function(res){
                that.isajax=true;
                that.isError=true;
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
      resetPhone(phone) {
        var str = String(phone)
        var len = str.length;
        if (len >= 7) {
            var reg = str.slice(-8, -4)
            return str.replace(reg, "****")
        }
      },
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style scoped lang='less'>
.commerce {
  background-color: #F5F5F5;
  .com-basic {
    background-color: #fff;
    margin-bottom: 26px;
    .bas-test {
      padding: 35px 35px 10px;
      font-size: 28px; 
      
      .bas-line {
        overflow: hidden;
        margin-bottom: 25px;
       .bas-first {
           width: 25%;
           color:#999;
       }
       .bas-two {
           width: 74%;
       }
      }
    }
  }
  .branch {
    background-color: #F5F5F5;
  }
  .ba-title {
      height: 88px;
      line-height: 88px;
      font-size: 28px;
      color:#333;
      padding-left: 35px;
      border-bottom: 1PX solid #f2f2f2;
      background-color: #fff;
    }
    .letter-title {
     padding: 30px 35px 20px;
     background-color: #fff;
     margin-bottom: 16px;
    .letter-name {
      font-size: 32px;
      color:#333;
      display: flex;
      align-items: center;
      margin-bottom: 27px;
      p {
        // max-width: 550px;
        overflow: hidden;
        text-overflow:ellipsis;
        // white-space: nowrap;
        display: -webkit-box;
        -webkit-line-clamp: 2;
      }
    }
     .letter-save {
       height: 39px;
       width: 70px;
       border: 1px solid #CF6D2B;
       color:#CF6D2B;
       border-radius: 8px;
       text-align: center;
       line-height: 39px;
       box-sizing: border-box;
       margin-left: 29px;
     }
   } 
    .letter-lead {
     font-size: 28px;
     color:#FE6603;
     margin-bottom: 20px;
     .person {
       font-size: 28px;
     }
   }
   .letter-iphone {
     font-size: 28px;
     display: flex;
     align-items: center;
     margin-bottom: 20px;
     i {
       font-size: 36px;
       color:#FE6603;
     }
     .iphone {
       margin: 0 15px;
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
</style>
