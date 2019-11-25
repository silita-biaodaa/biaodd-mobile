<!-- 模型： DOM 结构 -->
<template>
    <div class="queryzz">
        <template v-if="isajax">
            <template v-if="isError">
              <v-not :isError="isError"></v-not>
            </template>
            <template v-else>
              <q-list :type="'4'" v-for="(el,i) in list" :key="i" :obj='el'  ></q-list>
             
            </template>  
         </template>
         <template v-else>
           <van-loading size="50px"></van-loading>
         </template>
    </div>
</template>
<script>
import querylist from '@/pages/query/querylist'
import not from '@/components/not'
export default {
    name: 'queryzz', // 结构名称
    data() {
        return {
            // 数据模型
            isajax:true,//是否加载完
            isError:false,//是否加载失败
            list:[],
            data:{
              comId:'',
              type:'credit',
              orderNo:''
            },
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
        this.data.orderNo = this.$route.query.orderNo
        this.data.comId = this.$route.query.id
        this.gainList()
    },
    components: {
       'q-list':querylist,
        'v-not':not
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
         gainList() {
            let that=this;
            this.$http({
                method:'post',
                url: '/gonglu/zhauncha/detail/company',
                data:that.data
            }).then(function(res){
                if(res.data.code==1){
                  that.list = res.data.data
                }
            })
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
.queryzz {
   padding: 20px 33px 120px 33px;
   background-color: #fff;
   min-height: calc(100vh - 650px);
}
</style>
