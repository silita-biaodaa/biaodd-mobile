<!-- 模型： DOM 结构 -->
<template>
    <div class="list">
        <div class="box">
            <!-- list -->
            <template v-if="isajax">
                <template v-if="list.length>0">
                    <!-- <van-pull-refresh v-model="loading" @refresh="onRefresh"> -->
                        <van-list finished-text="没有更多了" @load="onLoad"  :error.sync="error" error-text="请求失败，点击重新加载" :offset="200" :finished="finished" :immediate-check="false">
                            <v-con :type="type" v-for="(el,i) in list" :key="i" :obj='el'></v-con>
                        </van-list>
                    <!-- </van-pull-refresh> -->
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
import listCon from '@/components/yj/listCon'
import not from '@/components/not'
export default {
    name: 'list', // 结构名称
    data() {
        return {
            // 数据模型
            data:{
                proId:'',
                tabType:'zhaotoubiao',
                pageNo:1,
                pageSize:5
            },
            list:[],
            isScroll:true,
            isajax:false,//是否在加载过程中
            isError:false,//是否加载失败
            finished:false,//是否加载完
            error:false,

        }
    },
    components:{
        'v-con':listCon,
        'v-not':not
    },
    watch: {
        // 监控集合
        type(val,oldVal){
            if(val==0){
                this.data.tabType='zhaotoubiao'
            }else if(val==1){
                this.data.tabType='design'
            }else if(val==2){
                this.data.tabType='contract'
            }else if(val==3){
                this.data.tabType='build'
            }else if(val==4){
                this.data.tabType='completion'
            }
            this.ajax();
        }
    },
    props: {
        // 集成父级参数
        type:{
            default:0
        }
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
        this.data.proId = this.$route.query.id;
        
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
                url: '/project/company/detail',
                data:that.data
            }).then(function(res){
                that.showLoad=false;
                if(that.list.length==0||that.data.pageNo==1){
                    that.list=res.data.data;
                    that.isajax=true;
                }else{
                    that.list=that.list.concat(res.data.data)
                }
                if(res.data.total==that.list.length||that.list.length<that.data.pageSize){
                    that.finished=true;//如果返回总条数等于当前list长度
                }
                that.isScroll=true;
            }).catch(function(res){
                that.isajax=true;
                that.isError=true;
                if(that.list.length>0){
                    that.error = true;
                }
            })
        },
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
.list{
    padding: 16px 32px;
}
</style>
