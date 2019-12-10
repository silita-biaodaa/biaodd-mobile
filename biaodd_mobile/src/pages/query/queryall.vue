<!-- 模型： DOM 结构 -->
<template>
    <div class="queryall">
      <top-back :title="title"  ></top-back>
       <template v-if="isajax">
            <template v-if="isError">
              <v-not :isError="isError"></v-not>
            </template>
            <template v-else>
                <van-list finished-text="没有更多了"  @load="onLoad" :error.sync="error" error-text="请求失败，点击重新加载" :offset="200" :finished="finished" :immediate-check="false">
                      <v-qy v-for="(o,i) of list" :key="i" :obj="o" :title='title' :orderNo='$route.query.id' ></v-qy>
                </van-list>
            </template>  
         </template>
         <template v-else>
           <van-loading size="50px"></van-loading>
         </template>

    </div>
</template>
<script>
import qy from '@/components/qy'
import not from '@/components/not'
export default {
    name: 'queryall', // 结构名称
    data() {
        return {
            // 数据模型
            title:'公路综合查询专项',
            error:false,
            finished:false,
            isScroll:true,
            zbList:[],
            id:'',
            data:{
               pageNo:1,
               pageSize:10,
               orderNo:''
            },
            list:[],
            isajax:true,//是否加载完
            isError:false,//是否加载失败
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
    created() {
        // console.group('创建完毕状态===============》created');
        this.title = this.$route.query.name == '水利专查' ? '水利综合查询专项' : (this.$route.query.name == '公路专查' ?  '公路综合查询专项' : '住建综合查询专项')
        this.data.orderNo = this.$route.query.id 
        this.ajax()
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
     components:{
        'v-qy':qy,
         'v-not':not
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
      onLoad(){//下滚加载
          if(!this.isScroll){
              return false
          }
          this.data.pageNo++;
          this.ajax1();
      },
        ajax(){
            //招标
            let that=this;
            that.isScroll=false;
            that.isajax = false
            this.$http({
                method:'post',
                url: '/gonglu/list',
                data:that.data
            }).then(function(res){
                if(res.data.code==1){
                    that.isajax = true
                    if( that.list.length == 0|| that.data.pageNo == 1){
                        that.list=res.data.data;
                    }else{
                        that.list=that.list.concat(res.data.data)
                    }
                    if(res.data.total==that.list.length||that.list.length<that.data.pageSize){
                        that.finished=true;//如果返回总条数等于当前list长度
                        that.isScroll=false;
                    } else {
                        that.isScroll=true;
                    }
                  
                } else {
                    that.isajax = true
                    that.isError  = true
                }
            })
        },
          ajax1(){
            //招标
            let that=this;
            that.isScroll=false;
            this.$http({
                method:'post',
                url: '/gonglu/list',
                data:that.data
            }).then(function(res){
                
                if(res.data.code==1){
                    // that.isajax = true
                    if( that.list.length == 0|| that.data.pageNo == 1){
                        that.list=res.data.data;
                    }else{
                        that.list=that.list.concat(res.data.data)
                    }
                    if(res.data.total==that.list.length||that.list.length<that.data.pageSize){
                        that.finished=true;//如果返回总条数等于当前list长度
                        that.isScroll=false;
                    } else {
                        that.isScroll=true;
                    }
                  
                } else {
                    that.isajax = true
                    that.isError  = true
                }
            })
        },
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
.queryall {
  padding: 100px 0 130px;
  min-height: 100vh;
  box-sizing: border-box;
}
</style>
