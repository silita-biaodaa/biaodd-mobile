<!-- 模型： DOM 结构 -->
<template>
    <div class="affairs">
        <!-- 搜索 -->
        <v-ser :iszb="true"></v-ser>
        <div class="box">
            <!-- list -->
            <van-list>
                <v-con :type="'zb'" v-for="(el,i) in bidList" :key="i" :obj='el' ></v-con>
            </van-list>
        </div>
        
    </div>
</template>
<script>
import listCon from '@/components/enterprise/listCon'
import search from '@/components/enterprise/search'
export default {
    name: 'affairs', // 结构名称
    data() {
        return {
            // 数据模型
            search:'',
            source:'湖南省', //
            bidList:[],
            name:'湖南省第五工程有限公司',
        }
    },
    watch: {
        // 监控集合
    },
    props: {
        // 集成父级参数
    },
    components:{
        'v-con':listCon,
        'v-ser':search
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
        // this.source = this.$route.query.name
        let that=this;
            this.$http({
                method:'post',
                url: '/notice/queryList',
                data:{
                  pageNo:1,
                  pageSize:3,  //每页条数
                  type:2,
                  regions:that.source,  //省份吧
                  com_name:that.name,  //公司名
                  title:that.search,
                  sumType:'zhongbiao'
                 }
            }).then(function(res){
                console.log(res.data)
                that.bidList = res.data.data
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
        searchFn(){//搜索

        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style scoped lang="less">
.box{
    background: #f5f5f5;
    padding: 18px 32px;
    
}
</style>
