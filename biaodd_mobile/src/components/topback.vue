<!-- 模型： DOM 结构 -->
<template>
  <div class="top-nav">
        <van-icon name="arrow-left" class="top-left" @click="$router.go(-1)" />
        {{title}}
        <template v-if="isFollow">
            <van-icon name="like" @click="followFn" v-if="follow"/>
            <van-icon name="like-o" @click="nofollowFn" v-else/>
        </template>
        <template v-if="isOrder">
            <p @click="mask=true">开发票</p>
        </template>
        <v-popup :mask="mask"></v-popup>
   </div>
</template>
<script>
// let moment = require("moment");
import popup from '@/components/popup'
export default {
    name: 'topBack', // 结构名称
    data() {
        return {
            // 数据模型
            mask:false,
            // follow:true,//是否关注
        }
    },
    watch: {
        // 监控集合
    },
    props: {
        // 集成父级参数
        title:'',
        isOrder:{
            default:false
        },
        isFollow:{
            default:false
        },
        type:{
            default:''
        },
        id:{
            default:''
        },
        collected:{
        },
        source:{
            default:''
        },
        collect:{
            default:''
        },

    },
    components: {
       'v-popup':popup,
    },
    computed:{
        follow(){
            if(this.collected){
                return true;
            }else{
                return false;
            }
        }
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
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
        followFn(){//取消关注
            let that=this;
            if(this.type!='qy'){
                this.$http({
                    method:'post',
                    url:'/userCenter/cancelCollectionNotice',
                    data:{
                        source:that.source,
                        noticeid:that.id,
                    }
                }).then(function(res){
                    that.$parent.collected=false;
                    that.$toast('取消关注成功')
                })
            }else{
                this.$http({
                    method:'post',
                    url:'/userCenter/cancelCollectionCompany',
                    data:{
                        companyid:that.id,
                    }
                }).then(function(res){
                    that.$parent.collected=false;
                    that.$toast('取消关注成功')
                })
            }
        },
        nofollowFn(){//关注
            if(this.type=='zhaob'){//招标   type=0
                let that=this;
                this.$http({
                    method:'post',
                    url:'/userCenter/collectionNotice',
                    data:{
                        source:that.source,
                        type: collect,
                        noticeid:that.id,
                    }
                }).then(function(res){
                    that.$parent.collected=true;
                    that.$toast('关注成功')
                })
            }else if(this.type=='zhongb'){//中标  type=2
                let that=this;
                this.$http({
                    method:'post',
                    url:'/userCenter/collectionNotice',
                    data:{
                        source:that.source,
                        type: "2",
                        noticeid:that.id,
                    }
                }).then(function(res){
                    that.$parent.collected=true;
                    that.$toast('关注成功')
                })
            }else{//公司
                let that=this;
                this.$http({
                    method:'post',
                    url:'/userCenter/collectionCompany',
                    data:{
                        companyid:that.id,
                    }
                }).then(function(res){
                    if(res.data.code==1){
                        that.$parent.collected=true;
                        that.$toast('关注成功')
                    }
                })
            }
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style scoped lang="less">
.top-nav {
    height: 90px;
    width: 100%;
    background-color: #FE6603;
    line-height: 90px;
    text-align: center;
    color:#fff;
    font-size: 36px;
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    .top-left {
        font-size: 40px;
        color:#fff;
        position: absolute;
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
    }
    p{
        color: #fff;
        position: absolute;
        right:35px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 24px
    }
    .van-icon-like,.van-icon-like-o{
        color: #fff;
        position: absolute;
        right:35px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 40px;
    }
}
</style>
