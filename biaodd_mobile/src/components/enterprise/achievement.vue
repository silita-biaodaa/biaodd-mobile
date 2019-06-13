<!-- 模型： DOM 结构 -->
<template>
    <div class="affairs">
        <!-- 搜索 -->
        <v-ser :selecTxt="selecTxt" @searchFn="searFn"></v-ser>
        <div class="box" v-if="!more">
            <!-- list -->
            <template v-if="isajax">
                <template v-if="list.length>0">
                    <!-- <van-pull-refresh v-model="loading" @refresh="onRefresh"> -->
                        <van-list finished-text="没有更多了" @load="onLoad"  :error.sync="error" error-text="请求失败，点击重新加载" :offset="200" :finished="finished" :immediate-check="false">
                            <v-con :type="achType" v-for="(el,i) in list" :key="i" :obj='el'></v-con>
                        </van-list>
                    <!-- </van-pull-refresh> -->
                </template>
                <template v-else>
                    <v-not :isError="isError" :hint="'Sorry，暂未查询到该公司的' + selecTxt + '业绩信息'"  ></v-not>
                </template>
            </template>
            <template v-else>
                <van-loading size="50px"></van-loading>
            </template>
        </div>
        <template v-else>
            <div class="more">
                <img src="../../assets/pic-chakgd.png"/>
                <p>查看更多资讯，请<span @click="jumpApp">下载APP</span></p>
            </div>
        </template>
        <van-popup v-model="mask"  position="bottom" :overlay="true">
            <van-picker :columns="personCategory" value-key="name" show-toolbar @confirm="confirmFn" @cancel="mask=false" ref="picker"/>
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
            loading:false,
            // search:'',
            data:{
                comId:'', // 企业ID
                type:'page',
                comName:'',
                pageNo:1,
                pageSize:5,
                tabType:'project',
                proName:''
            },
            list:[],
            isScroll:true,
            isajax:false,//是否在加载过程中
            isError:false,//是否加载失败
            finished:false,//是否加载完
            error:false,
            mask:false,
            personCategory:[
                {
                    name:'住建部',
                    value:'project'
                },{
                    name:'水利部',
                    value:'shuili'
                },{
                    name:'交通部',
                    value:'jiaotong'
                },
            ],
            selecTxt:'住建部',
            achType:'yj1',
        }
    },
    watch: {
        // 监控集合
    },
    props: {
        // 集成父级参数
        more:{
            default:false
        }
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
          this.data.comName=this.$route.query.name
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
        searFn(option){
            this.isajax=false;
            this.list=[];
            this.data.proName=option;
            this.ajax();
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
        jumpApp(){
            window.location.href='https://a.app.qq.com/o/simple.jsp?pkgname=com.yaobang.biaodada';
        },
        confirmFn(){
            this.mask=false;
            this.list=[];
            this.isScroll=true;
            this.isajax=false,//是否在加载过程中
            this.isError=false,//是否加载失败
            this.finished=false,//是否加载完
            this.data.tabType=this.$refs.picker.getValues()[0].value;
            this.selecTxt=this.$refs.picker.getValues()[0].name;
            if(this.selecTxt=='住建部'){
                this.achType='yj1'
            }else if(this.selecTxt=='水利部'){
                this.achType='yj2'
            }else{
                this.achType='yj3'
            }
            this.ajax();
        },
        // jumpDetail(el){
        //     if(this.selecTxt=='住建部'){
        //         this.$router.push({path:'/zjDetail',query:{id:el.proId}})
        //     }else if(this.selecTxt=='水利部'){
        //         this.$router.push({path:'/slDetail',query:{id:el.pkid}})
        //     }else{
        //         this.$router.push({path:'/jtDetail',query:{id:el.pkid}})
        //     }
        // }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style scoped lang="less">
.box{
    background: #f5f5f5;
    padding: 18px 32px;
    
}
.more{
    padding-top: 167px;
    text-align: center;
    img{
        width: 180px;
        margin-bottom: 58px
    }
    p{
        color: #111;
        font-size: 28px;
        span{
            color: #FE6603;
            font-size: 32px;
            margin-left: 10px;
            display: inline-block
        }
    }
}
</style>
