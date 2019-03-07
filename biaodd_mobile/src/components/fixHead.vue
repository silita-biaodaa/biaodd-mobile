<!-- 模型： DOM 结构 -->
<template>
    <div class="fixHead">
        <div class="left">
            <img src="../assets/logo.png"/>
            <span v-if="isshow" @click="addTap">
                {{address}}
                <van-icon :name="iconName"/>
            </span>
        </div>
        <div class="right">
            <div class="btn" @click="upload">下载APP</div>
        </div>
        <v-addr @addObj="returnAddress" v-if="mask" :add="address"></v-addr>
    </div>
</template>
<script>
import addr from '@/components/address'
export default {
    name: 'fixHead', // 结构名称
    data() {
        return {
            // 数据模型
            address:'',
            mask:false,
            iconName:'arrow-down'
        }
    },
    watch: {
        // 监控集合
    },
    props: {
        // 集成父级参数
        isshow:{
            default:false,
        },
    },
    components:{
        'v-addr':addr
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
        this.address=sessionStorage.getItem('address');
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
        },
        returnAddress(option){
            this.iconName='arrow-down'
            this.address=option;
            this.$emit('address',option);
        },
        addTap(){
            this.mask=!this.mask
            if(this.iconName=='arrow-down'){
                this.iconName='arrow-up'
            }else{
                this.iconName='arrow-down'
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
