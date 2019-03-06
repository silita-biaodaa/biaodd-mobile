<!-- 模型： DOM 结构 -->
<template>
    <div class="fixHead">
        <div class="left">
            <img src="../assets/logo.png"/>
            <span>
                湖南
                <van-icon name="arrow-down"/>
            </span>
        </div>
        <div class="right">
            <div class="btn" @click="upload">下载APP</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'fixHead', // 结构名称
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
        upload(){
            var u = navigator.userAgent;
            var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            var isAndroid = u.indexOf('Android') > -1; /*android终端或者uc浏览器*/
            if (isIOS) {
                window.location.href = 'https://itunes.apple.com/cn/app/标大大/id1278802484?mt=8'
            } else if (isAndroid) {
                window.location.href = 'http://www.biaodaa.com/file/biaodaa.apk'
            } else {
                window.location.href = 'http://www.biaodaa.com/file/biaodaa.apk';
            }
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style scoped lang="less">
.fixHead{
    padding: 0 32px;
    height: 112px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    width: 100%;
    box-sizing: border-box;
    .left{
        display: flex;
        align-items:center;
        img{
            margin-right: 24px;
            width: 176px;
        }
        span{
            font-size: 28px;
            display: flex;
            align-items: center;
            .van-icon{
                margin-left: 12px;
                color: #999
            }
        }
    }
    .right{
        .btn{
            background: #FE6603;
            width: 164px;
            height: 64px;
            border-radius: 8px;
            text-align: center;
            line-height: 64px;
            color: #fff;
            font-size: 28px
        }
    }
}
</style>
