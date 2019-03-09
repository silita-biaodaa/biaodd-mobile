<!-- 模型： DOM 结构 -->
<template>
    <div class="letter">
      <top-back :title='name'></top-back>
      <div class="letter-de">
         <div class="letter-title">
            <div class="letter-name">
              <p>
                湖南耀邦建设有限公司
              </p>
              <div class="letter-save">
                  存续
              </div>
            </div>
            <div class="letter-lead">
              <span  >
                陈波
              </span>
              <span class="person">
                 法人代表
              </span>
            </div>
            <div class="letter-iphone">
              <van-icon name="phone-o" />
              <span class="iphone">
                0731-88251133
              </span>
              <span class="le-col">
                更多号码请查看APP
              </span>
            </div>
            <div class="letter-url">
               <van-icon name="location-o" />
               <p>
                  湖南省长沙市岳麓区杜鹃路768号金峰壹号院
               </p>               
            </div>
         </div>

        <div class="letter-nav">
        </div>

        <div class="letter-detail">

        </div>

      </div>
    </div>
</template>
<script>
import topBack from '@/components/topback'
export default {
    name: 'letter', // 结构名称
    data() {
        return {
            // 数据模型
             name:'企业详情'
        }
    },
    watch: {
        // 监控集合
    },
    components: {
       'top-back':topBack  
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
         let that=this;
            this.$http({
                method:'post',
                url: '/company/' + this.id,
                data:{
                   
                }
            }).then(function(res){
                console.log(res);
                
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
<style scoped lang='less'>
.letter {
 position: absolute;
 top: 0;
 left: 0;
 right: 0;
 bottom: 0;
 
 .le-col{
   color:#FE6603;
 }
 .letter-de {
   margin-top: 100px;
   height: calc(~"100% - 101px");
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
 .letter-nav {
   height: 96px;
   background-color: #fff;
   margin-bottom: 15px;
   
 }
}
</style>
