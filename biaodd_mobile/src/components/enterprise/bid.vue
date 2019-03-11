<!-- 模型： DOM 结构 -->
<template>
    <div class="affairs">
        <!-- 搜索 -->
        <v-ser :iszb="true" @searchFn="searchFn"></v-ser>
        <div class="box">
            <!-- list -->
            <van-pull-refresh v-model="loading" @refresh="onRefresh">
                <van-list finished-text="没有更多了">
                    <v-con :type="'zb'" v-for="(el,i) in bidList" :key="i" :obj='el' ></v-con>
                </van-list>
            </van-pull-refresh>
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
            loading:false,
            bidList:[],
            data:{
                pageNo:1,
                pageSize:5,  //每页条数
                type:2,
                regions:'湖南省',  //省份吧
                com_name:'湖南省第五工程有限公司',  //公司名
                title:'',
                sumType:'zhongbiao'
            }
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
        this.data.com_name = this.$route.query.name;
        this.data.regions=this.$route.query.source;
        this.ajax();
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
        searchFn(option){//搜索
            this.bidList=[];
            this.data.title=option;
            this.ajax();
        },
        onLoad(){
            this.data.pageNo++;
            this.ajax();
        },
        onRefresh(){
            this.bidList=[];
            setTimeout(() => {
                this.data.pageNo=1;
                this.ajax();
            }, 500);
        },
        ajax(){
            let that=this;
            this.$http({
                method:'post',
                url: '/notice/queryList',
                data:that.data
            }).then(function(res){
                if(that.bidList.length==0||that.data.pageNo==1){
                    that.bidList=res.data.data;
                }else{
                    that.bidList=that.bidList.concat(res.data.data)
                }
            })
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
