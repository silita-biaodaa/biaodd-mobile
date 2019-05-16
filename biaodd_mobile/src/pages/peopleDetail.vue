<!-- 模型： DOM 结构 -->
<template>
    <div class="peopleDetail">
        <div class="top">
            <div class="head-box">
                <van-icon name="arrow-left" class="top-left" @click="$router.go(-1)" />
                <p>
                    {{obj.name}}
                    <span>({{obj.sex}})</span>
                </p>
            </div>
            <div class="nav" ref="scroll">
                <ul>
                    <li v-for="(o,i) in navList" :key="i" :class="navNum==i?'active':''" @click="navTap(i)">
                        <p>{{o}}</p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="content">
            <!-- list -->
            <template v-if="isajax">
                <template v-if="list.length>0">
                    <v-rycon :type="navNum" v-for="(el,i) in list" :key="i" :obj='el'></v-rycon>
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
import ryContent from '@/components/ryListCon'
import not from '@/components/not'
export default {
    name: 'peopleDetail', // 结构名称
    data() {
        return {
            // 数据模型
            obj:null,
            navList:['注册证书','个人业绩','不良记录','变更记录','押证详情'],
            navNum:0,
            list:[],
            isajax:false,//是否在加载过程中
            isError:false,//是否加载失败
            data:{
                comId:'',
                idCard:'',
                sex:'',
                name:'',
                tabCode:'',
                tabType:'',
            },
            ajaxUrl:'/person/detail'
        }
    },
    watch: {
        // 监控集合
    },
    props: {
        // 集成父级参数
    },
    components: {
        'v-rycon':ryContent,
        'v-not':not
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
        let obj=JSON.parse(sessionStorage.getItem('peoploDetail'));
        this.obj=obj;
        this.data={
            comId:obj.comId,
            idCard:obj.idCard,
            sex:obj.sex,
            name:obj.name,
            tabCode:obj.tabCode,
            tabType:'registerCert',
        }
        if(this.$route.query.type=='yz'){
            this.navNum=4;
            this.data={
                innerid:this.obj.innerid,
                type:'detail'
            }
            this.ajaxUrl='/under/query'
        }
        this.ajax();
    },
    beforeMount() {
        // console.group('挂载前状态  ===============》beforeMount');
    },
    mounted() {
        // console.group('挂载结束状态===============》mounted');
        this.$nextTick(function() {
            // console.log('执行完后，执行===============》mounted');
            if(this.navNum==4){
                this.$refs.scroll.scrollLeft=200;
            }
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
        ajax(){
            let that=this;
            this.$http({
                method:'post',
                url: this.ajaxUrl,
                data:that.data
            }).then(function(res){
                that.isajax=true;
                if(that.navNum==0){
                    that.list=res.data.data.personQualificat
                }else if(that.navNum==1){
                    that.list=res.data.data.prosonProjectList
                }else if(that.navNum==2){
                    that.list=res.data.data.badRecord
                }else if(that.navNum==3){
                    that.list=res.data.data.changeRecord
                }else if(that.navNum==4){
                    that.list=res.data.data
                }
            }).catch(function(res){
                that.isajax=true;
                that.isError=true;
            })
        },
        navTap(i){
            this.navNum=i;
            this.list=[];
            this.isajax=false;
            this.isError=false;
            this.ajaxUrl='/person/detail';
            if(i==0){
                this.data.tabType='registerCert'
            }else if(i==1){
                this.data.tabType='personProject'
            }else if(i==2){
                this.data.tabType='badRecord'
            }else if(i==3){
                this.data.tabType='changeRecord'
            }else if(i==4){
                this.data={
                    innerid:this.obj.innerid,
                    type:'detail'
                }
                this.ajaxUrl='/under/query'
            }
            this.ajax();
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
.top{
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    width: 100%;
    background: #F5F5F5;
    .head-box{
        position: relative;
        height: 90px;
        width: 100%;
        background-color: #FE6603;
        line-height: 90px;
        text-align: center;
        color:#fff;
        margin-bottom: 16px;
        font-size: 36px;
        .top-left {
            font-size: 50px;
            color:#fff;
            position: absolute;
            left: 20px;
            top: 50%;
            transform: translateY(-50%);
        }
        p{
            color: #fff;
            font-size: 36px;
            span{
                color: #fff;
                font-size: 28px;
                margin-left: 20px;
            }
        }
    }
    .nav{
        background: #fff;
        height:92px;
        overflow-x: scroll;
        box-shadow:0px 3px 9px 1px rgba(4,0,0,0.1);
        ul{
            height:92px;
            display: flex;
            justify-content: space-between;
            width: 130%; 
            min-width: 100%;
            flex-wrap: nowrap;
            overflow-x:scroll;
            overflow-y: hidden;
            li{
                box-sizing: border-box;
                width: 20%;
                text-align: center;
                padding: 20px 32px 0;
                p{
                    border-bottom: 4px solid transparent;
                }
            }
            .active{
                p{
                    color: #FE6603;
                    border-color: #FE6603;
                    padding-bottom: 20px
                }
            }
        }
    }
}
.content{
    padding:212px 32px 0;
}
.peopleDetail{
    background: #F5F5F5;
    min-height: calc(100vh - 101px);
}


@media screen and (max-width: 375px) {
    .top  .nav ul{
        width: 150%;
    }
}
</style>
