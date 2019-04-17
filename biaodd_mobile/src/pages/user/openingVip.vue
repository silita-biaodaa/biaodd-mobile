<!-- 模型： DOM 结构 -->
<template>
    <div class="openingVip">
        <top-back :title='"开通会员"'></top-back>
        <button @click="testFn">test</button>
    </div>
</template>
<script>
import topBack from '@/components/topback'
export default {
    name: 'openingVip', // 结构名称
    data() {
        return {
            // 数据模型
            userid:''
        }
    },
    watch: {
        // 监控集合
    },
    props: {
        // 集成父级参数
    },
    components: {
       'top-back':topBack,
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
        this.$http({
            method:'post',
            url: '/vip/queryFeeStandard',
            data:{
                channel:'1004',
            }
        }).then(function(res){
            console.log(res);
        }).catch(function(res){
            
        })
        this.userid=sessionStorage.getItem('userid')
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
        testFn(){
            let that=this;
            this.$http({
                method:'post',
                url: '/wxPay/unifiedOrder',
                data:{
                    channel:'1004',
                    stdCode:'month',
                    userId:this.userid
                }
            }).then(function(res){
                console.log(res);
            }).catch(function(res){
                
            })
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
button{
    padding-top:90px
}
</style>
