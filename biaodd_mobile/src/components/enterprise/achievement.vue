<!-- 模型： DOM 结构 -->
<template>
    <div class="affairs">
        <!-- 搜索 -->
        <!-- <v-ser :selecTxt="'项目类别'"></v-ser> -->
        <div class="box">
            <!-- list -->
            <template v-if="isajax">
                <template v-if="list.length>0">
                    <van-pull-refresh v-model="loading" @refresh="onRefresh">
                        <van-list finished-text="没有更多了" @load="onLoad" :offset="100" :immediate-check="false">
                            <v-con :type="'yj'" v-for="(el,i) in list" :key="i" :obj='el'></v-con>
                        </van-list>
                    </van-pull-refresh>
                </template>
                <template v-else>
                    <v-not :isError="isError"></v-not>
                </template>
            </template>
            <template v-else>
                <van-loading size="50px"></van-loading>
            </template>
        </div>
    </div>
</template>
<script>
import listCon from '@/components/enterprise/listCon'
import search from '@/components/enterprise/search'
import not from '@/components/not'
export default {
    name: 'affairs', // 结构名称
    data() {
        return {
            // 数据模型
            loading:false,
            // search:'',
            data:{
                comId:'', // 企业ID
                type:'page',
                pageNo:1,
                pageSize:5
            },
            list:[],
            isScroll:true,
            isajax:false,//是否加载完
            isError:false,//是否加载失败
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
        'v-ser':search,
        'v-not':not
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
          this.data.comId = this.$route.query.id
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
        // searchFn(){//搜索

        // },
        onRefresh(){
            this.list=[];
            setTimeout(() => {
                this.data.pageNo=1;
                this.ajax();
            }, 500);
        },
        onLoad(){
            if(!this.isScroll){
                return false
            }
            this.data.pageNo++;
            this.ajax();
        },
        ajax(){
            this.isScroll=false;
            let that=this;
            this.$http({
                method:'post',
                url: '/project/company/list',
                data:that.data
            }).then(function(res){
                that.showLoad=false;
                if(that.list.length==0||that.data.pageNo==1){
                    that.list=res.data.data;
                    that.isajax=true;
                }else{
                    that.list=that.list.concat(res.data.data)
                }
                that.isScroll=true;
            }).catch(function(res){
                that.isajax=true;
                that.isError=true;
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
