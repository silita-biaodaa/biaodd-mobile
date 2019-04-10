<!-- 模型： DOM 结构 -->
<template>
    <div class="isvip">
        <!-- <template v-if="isTrue">
            <slot></slot>
        </template> -->
        <!-- <template v-else> -->
            <div class="tipBoxs">
                <p>该功能需要会员权限</p>
                <img src="../assets/pic-huiyuan.png.png" @click="jumpApp">
            </div>
        <!-- </template> -->
    </div>
</template>
<script>
export default {
    name: 'isvip', // 结构名称
    data() {
        return {
            // 数据模型
            // dataArr:'',//承载已拥有权限的数组
            // isTrue:false,
        }
    },
    watch: {
        // 监控集合
    },
    props: {
        // 集成父级参数
        val:{
            default:''
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
        jumpApp(){//点击下载APP
            window.location.href='https://a.app.qq.com/o/simple.jsp?pkgname=com.yaobang.biaodada';
        },
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
.isvip{
    background: rgba(0,0,0,.8);
    height: 100vh;
    position: fixed;
    top: 0;
    width: 100%;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}
.tipBoxs{
    background: #fff;
    width: 80%;
    padding: 0 35px;
    img{
        max-width:100% ;
    }
}
</style>
