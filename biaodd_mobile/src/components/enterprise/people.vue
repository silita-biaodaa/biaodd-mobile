<!-- 模型： DOM 结构 -->
<template>
    <div class="affairs">
        <!-- 搜索 -->
        <v-ser :selecTxt="'注册类别'" @searchFn="searchFn"></v-ser>
        <div class="box">
            <!-- list -->
            <template v-if="isajax">
                <template v-if="peoList.length>0">
                    <van-pull-refresh v-model="loading" @refresh="onRefresh">
                        <van-list finished-text="没有更多了" @load="onLoad" :offset="100" :immediate-check="false">
                            <v-con :type="'ry'" v-for="(el,i) in peoList" :key="i" :obj='el' ></v-con>
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
        <van-popup v-model="mask"  position="bottom" :overlay="true">
            <van-picker :columns="personCategory" value-key="category" :loading="categoryLoad" show-toolbar @confirm="confirmFn" @cancel="mask=false" ref="picker"/>
        </van-popup>
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
            mask:false,
            loading:false,
            personCategory:[],//注册类别
            categoryLoad:true,
            data:{
                keyWord:'', //关键字
                comId:'5d86f82e66452e2db067e42ca327c629', // 企业ID
                category:'', //注册类别
                pageNo:1,
                pageSize: 3,
                province: '湖南' //省份
            },
            peoList:[],
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
        this.data.province = this.$route.query.source
        let that=this;
        this.ajax();
        this.$http({
            method:'post',
            url:'/company/personCategory/'+this.data.comId
        }).then(function(res){
            that.personCategory=res.data.data;
            that.categoryLoad=false
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
        searchFn(option){//搜索
            this.isajax=false;
            this.peoList=[];
            this.data.keyWord=option;
            this.ajax();
        },
        onRefresh(){
            this.peoList=[];
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
                url: '/company/person',
                data:that.data
            }).then(function(res){
                if(that.peoList.length==0||that.data.pageNo==1){
                    that.peoList=res.data.data;
                    that.isajax=true;
                }else{
                    that.peoList=that.peoList.concat(res.data.data)
                }
                that.isScroll=true;
            }).catch(function(res){
                that.isajax=true;
                that.isError=true;
            })
        },
        confirmFn(){
            this.mask=false;
            this.peoList=[];
            this.data.category=this.$refs.picker.getValues()[0].category;
            this.ajax();
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
