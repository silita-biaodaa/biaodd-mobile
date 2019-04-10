<!-- 模型： DOM 结构 -->
<template>
    <div class="popup-box isvip" v-if="mask">
        <div class="box-con">
            <div class="top-box">
                <span>{{txt}}</span>
            </div>
            <div class="bom-box">
                <span class="canel" @click="canelFn">取消下载</span>
                <span class="sure" @click="sureFn">下载APP</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'isvip', // 结构名称
    data() {
        return {
            // 数据模型
        }
    },
    watch: {
        // 监控集合
    },
    props: {
        // 集成父级参数
        val:{
            default:''
        },
        mask:{
            default:false
        },
        txt:{
            default:'查看更多资讯，请下载标大大APP'
        }

    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
        // let str=sessionStorage.getItem('permissions');
        // this.dataArr=str;
    },
    beforeMount() {
        // console.group('挂载前状态  ===============》beforeMount');
    },
    mounted() {
        // console.group('挂载结束状态===============》mounted');
        // if(this.dataArr.indexOf(this.val)!=-1){
            // this.isTrue=true;
        // }
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
        sureFn(){//点击下载APP
            this.modalHelper.beforeClose();
            window.location.href='https://a.app.qq.com/o/simple.jsp?pkgname=com.yaobang.biaodada';
        },
        canelFn(){
            this.modalHelper.beforeClose();
            this.$parent.isvip=false;
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
.isvip{
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 100vh;
    background: rgba(0,0,0,.5);
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 0;
    .box-con{
        width: 548px;
        height: 291px;
        border-radius: 10px;
        background: #fff;
    }
    .top-box{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 196px;
        span{
        width: 360px;
        display: inline-block;
        color: #999;
        }
    }
    .bom-box{
        border-top: 1PX solid #F2F2F2;
        height: 90px;
        line-height: 90px;
        display: flex;
        span{
        display: inline-block;
        width: calc((100% - 1PX)/2);
        text-align: center;
        }
        .canel{
        border-right: 1PX solid #F2F2F2;
        color: #333;
        }
        .sure{
        color: #FE6603
        }
    }
}
</style>
