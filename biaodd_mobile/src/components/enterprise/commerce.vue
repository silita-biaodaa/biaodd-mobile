<!-- 模型： DOM 结构 -->
<template>
    <div class="commerce">
      <template v-if="isajax">
        <template v-if="isError">
          <v-not :isError="isError"></v-not>
        </template>
        <template v-else>
        <div class="com-basic" @click="isinfo = !isinfo"  :class="isinfo ? 'hide-in' : 'show-in'" >
          <div class="ba-title">
             <span>基本信息</span>
             <div   >
               <van-icon name="arrow-down"  v-if="isinfo" />
               <van-icon name="arrow-up" v-else />
             </div>
          </div>
          <ic-infor :obj='detail' ></ic-infor>
        </div>

        <div class="branch" @click="isbranch = !isbranch"  :class="isbranch ? 'hide-in' : 'show-in'" >
          <div class="ba-title"   >
             <span>分支机构({{total}})</span>
             <div   >
               <van-icon name="arrow-down"  v-if="isbranch" />
               <van-icon name="arrow-up" v-else />
             </div>
          </div>
          <ic-br v-for="(el,i) in lists" :key="i"  :obj='el' :isVip='isVip'  ></ic-br>
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
            isinfo:true, // 基本信息下拉
            isbranch:true
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
                 that.isajax=true;
                var arr = []
                if(that.detail.phone) {
                  arr = that.detail.phone.split(';')
                  that.detail.phone = arr[0];
                }                
               
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
<style  lang='less'>
.commerce {
  background-color: #F5F5F5;
  .com-basic {
    background-color: #fff;
    margin-bottom: 2px;
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
  .hide-in {
    height: 88px;
    overflow: hidden;
  }
  .show-in {
     height: auto;
  }
  .ba-title {
      height: 88px;
      // line-height: 88px;
      font-size: 28px;
      color:#333;
      padding: 0 35px;
      border-bottom: 1PX solid #f2f2f2;
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      i {
        font-size: 44px;
      }
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
