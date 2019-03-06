<!-- 模型： DOM 结构 -->
<template>
    <div class="fixHead">
        <div class="left">
            <img src="../assets/logo.png"/>
            <span>
                {{address}}
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
            address:'湖南'
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
        this.getAddress();
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
        upload(){//点击下载APP
            window.location.href='https://a.app.qq.com/o/simple.jsp?pkgname=com.yaobang.biaodada';
            // var u = navigator.userAgent;
            // var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            // var isAndroid = u.indexOf('Android') > -1; /*android终端或者uc浏览器*/
            // if (isIOS) {
            //     window.location.href = 'https://itunes.apple.com/cn/app/标大大/id1278802484?mt=8'
            // } else if (isAndroid) {
            //     window.location.href = 'http://www.biaodaa.com/file/biaodaa.apk'
            // } else {
            //     window.location.href = 'http://www.biaodaa.com/file/biaodaa.apk';
            // }
        },
        getAddress(){//获取地址
            if (navigator.geolocation){ 
                navigator.geolocation.getCurrentPosition(this.getLocation,this.showError); 
            }else{ 
                alert("浏览器不支持地理定位。"); 
            } 
        },
        getLocation(position){//获取经纬度
            let latlon = position.coords.latitude+','+position.coords.longitude;
            let url = 'http://maps.google.cn/maps/api/geocode/json?latlng='+latlon+'&language=CN';
            this.$http({
                method:'get',
                url:url,
            }).then(function(res){
                console.log(res);
            })
        },
        showError(error){ 
            switch(error.code) { 
                case error.PERMISSION_DENIED: 
                alert("定位失败,用户拒绝请求地理定位"); 
                break; 
                case error.POSITION_UNAVAILABLE: 
                alert("定位失败,位置信息是不可用"); 
                break; 
                case error.TIMEOUT: 
                alert("定位失败,请求获取用户位置超时"); 
                break; 
                case error.UNKNOWN_ERROR: 
                alert("定位失败,定位系统失效"); 
                break; 
            } 
        },

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
    z-index: 999;
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
