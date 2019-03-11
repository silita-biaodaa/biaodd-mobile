<!-- 模型： DOM 结构 -->
<template>
    <div class="affairs">
        <!-- 搜索 -->
        <!-- <v-ser @searchFn="searchFn"></v-ser> -->
        <div class="box">
            <!-- total-->
            <div class="title">{{companyLaw.lawBri+companyLaw.briCount}}条，{{companyLaw.lawJud+companyLaw.judCount}}条,{{companyLaw.lawTotal+companyLaw.total}}条</div>
            <!-- list -->
            <van-pull-refresh v-model="loading" @refresh="onRefresh">
                <van-list finished-text="没有更多了" @load="onLoad">
                    <v-con v-for="(el,i) in lawLsit" :key="i" :obj='el'></v-con>
                </van-list>
            </van-pull-refresh>
        </div>
        <van-popup v-model="mask"  position="bottom" :overlay="true">
            <van-datetime-picker
            type="year"
            :formatter="dateConfirm"
            v-model="date"
            @confirm="confirm"
            @cancel="mask=false"
            ></van-datetime-picker>
            <!-- :min-date="dateObj.minDate"
            :max-date="dateObj.maxDate" -->
        </van-popup>
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
            lawLsit:[],
            date:'',
            isSearch:true,
            ajaxData:{
                pageNo:1,
                pageSize:5,
                keyWord:'',
                start:null,
                end:null,  // 年份只有2016一年的话，开始和结束都穿2016
                comName:'' // 企业名称
            },
            mask:false,
            companyLaw:{
                briCount:0,
                judCount:0,
                lawBri: "疑似行贿信息",
                lawJud: "司法信息",
                lawTotal: "总计法务信息",
                total: 0
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
        this.ajaxData.comName=this.$route.query.name
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
            this.lawLsit=[];
            this.isSearch=true;
            this.ajaxData.keyWord=option;
            this.ajax();
        },
        onLoad(){
            this.ajaxData.pageNo++;
            this.ajax();
        },
        onRefresh(){
            this.lawLsit=[];
            setTimeout(() => {
                this.isSearch=true;
                this.ajaxData.pageNo=1;
                this.ajax();
            }, 500);
        },
        ajax(){
            let that=this;
            this.$http({
                method:'post',
                url: '/law/list',
                data:that.ajaxData
            }).then(function(res){
                if(that.lawLsit.length==0||that.ajaxData.pageNo==1){
                    that.lawLsit=res.data.data;
                }else{
                    that.lawLsit=that.lawLsit.concat(res.data.data)
                }
            })
            if(!that.isSearch){
                return false
            }
            this.$http({
                method:'post',
                url:'/law/companyLaw',
                data:{
                    comName:that.ajaxData.comName
                }
            }).then(function(res){
                that.companyLaw=res.data.data;
                that.isSearch=false;
            })
        },
        dateConfirm(type,value){
          if (type === 'year') {
            return `${value}年`;
          }
          return value;
        },
        confirm(){
            
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style scoped lang="less">
.box{
    background: #f5f5f5;
    padding: 0 32px 18px;
    .title{
        background: #f5f5f5;
        height: 80px;
        color: #bbb;
        font-size: 24px;
        line-height: 80px
    }
}
</style>
