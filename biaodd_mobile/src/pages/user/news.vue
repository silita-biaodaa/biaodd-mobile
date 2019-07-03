<!-- 模型： DOM 结构 -->
<template>
    <div class="use-news">
       <div class="top-nav">
        <van-icon name="arrow-left" class="top-left" @click="$router.go(-1)" />
         <p style="width:70%" >
           消息
          </p>
         <p  @click="state" >
           {{status}}
         </p>
       </div>
       <template v-if="isajax"  >
          <template v-if="zbList.length>0">
      <!-- <van-pull-refresh v-model="loading" @refresh="onRefresh"> -->
              <van-list finished-text="没有更多了"  @load="onLoad" :error.sync="error" error-text="请求失败，点击重新加载" :offset="200" :finished="finished" :immediate-check="false">
                  <new-list v-for="(el,i) in zbList" :key="i" :obj='el' :condition='condition'  ></new-list>
              </van-list>
            <!-- </van-pull-refresh>   -->
          </template>
          <template v-else>
              <v-not :isError="isError" :hint="'暂未收到消息通知'"  ></v-not>
          </template>
       </template> 
       <template v-else>
          <van-loading size="50px"></van-loading>
          <p style="text-align: center;margin-top:30px">拼命加载中</p>
        </template>
       <div class="operation" >
         1111
       </div>
    </div>
</template>
<script>
import not from '@/components/not'
export default {
    name: 'templateName', // 结构名称
    data() {
        return {
            // 数据模型
            status:'编辑',
            condition:true,
            data:{
              pageNum:1,
              pageSize:5
            },
            isajax:true,//是否加载完
            isError:false,//是否加载失败
            finished:false,//是否加载完
            error:false,
            zbList:[],
            isScroll:true,
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
    components: {
      'v-not':not
    },
    created() {
        // console.group('创建完毕状态===============》created');
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
        state() {
          this.condition = !this.condition
          if( this.condition) {
            this.status = '编辑'
          } else {
             this.status = '取消'
          }
        },
        gainList() {
           this.isScroll=false;
           let that=this;
            this.$http({
                method:'post',
                url: 'message/list',
                data:that.data
            }).then(function(res){
              if(res.data.code == 1) {
                 that.isScroll=true;
                if(that.zbList.length==0||that.data.pageNo==1){
                  that.zbList=res.data.data;
                  that.isajax=true;
                } else {
                  that.zbList=that.zbList.concat(res.data.data)
                }
                
                if(res.data.total==that.zbList.length||that.zbList.length<that.data.pageSize){
                   that.finished=true;//如果返回总条数等于当前list长度
                }
        
              } else {
                  that.isajax=true;
                  that.isError=true;
                  if(that.zbList.length>0){
                      that.error = true;
                  }
              }
               
             }).catch(function(req) {
                 that.isajax=true;
                  that.isError=true;
                  if(that.zbList.length>0){
                      that.error = true;
                  }
             })
        },
        onLoad(){//下滚加载
         if(!this.isScroll){
             return false
         }
         this.data.pageNum++;
         this.gainList();
      },
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
.use-news {
  padding: 110px 34px 100px;
  background-color: #F8F8F8;
  min-height: calc(100vh - 235px);
  .top-nav {
    height: 90px;
    width: 100%;
    background-color: #FE6603;
    color:#fff;
    font-size: 36px;
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .top-left {
        font-size: 40px;
        color:#fff;
    }
    p{
        color: #fff;
        font-size: 36px;
        text-align: center;
    }
 }
 .operation {
   display: flex;
   justify-content: space-between;
   padding: 0 34px;
   background-color: #fff;
   position: fixed;
   bottom: 102px;
   left: 0;
   height: 96px;
   align-items: center;
   width: 100%;
   border-top: 1px solid #CCC;
 }
}
</style>
