<!-- 模型： DOM 结构 -->
<template>
    <div class="followBtn">
        <div class="nofollow" @click="nofollowFn" v-if="!isFollow">+关注</div>
        <div class="follow" @click="followFn" v-else>已关注</div>
    </div>
</template>
<script>
export default {
    name: 'followBtn', // 结构名称
    data() {
        return {
            // 数据模型
            isFollow:false
        }
    },
    watch: {
        // 监控集合
    },
    props: {
        // 集成父级参数
        type:{
            default:''
        },
        id:{
            default:''
        },
        collected:{
            default:false
        },
        source:{
            default:''
        }
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
        this.isFollow=this.collected;
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
            this.isFollow=false
        },
        nofollowFn(){//关注
            this.isFollow=true;
            if(this.type=='zhaob'){//招标   type=0
                let that=this;
                this.$http({
                    method:'post',
                    url:'/userCenter/collectionNotice',
                    data:{
                        source:that.source,
                        type: "0",
                        noticeid:that.id,
                        userid:''
                    }
                }).then(function(res){

                })
            }else if(this.type='zhongb'){//中标  type=2

            }else{//公司

            }
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
.nofollow{
    width: 100px;
    height: 40px;
    border: 1PX solid #FE6603;
    background: #fff;
    color: #FE6603;
    font-size: 28px;
    text-align: center;
    border-radius: 10px;
    line-height: 40px;
}
.follow{
    width: 100px;
    height: 40px;
    border: 1PX solid #FE6603;
    background: #FE6603;
    color: #fff;
    font-size: 28px;
    text-align: center;
    border-radius: 10px;
    line-height: 40px;
}
</style>
