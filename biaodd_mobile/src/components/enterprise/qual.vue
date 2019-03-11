<!-- 模型： DOM 结构 -->
<template>
    <div class="qual">
        <!-- tab -->
        <div class="tab"></div>
        <div class="box">
            <!-- total -->
            <!-- list -->
            <van-list>
                <v-con :type="'zz'"></v-con>
            </van-list>
        </div>
        
    </div>
</template>
<script>
import listCon from '@/components/enterprise/listCon'
export default {
    name: 'qual', // 结构名称
    data() {
        return {
            // 数据模型
            id:'5d86f82e66452e2db067e42ca327c629'
        }
    },
    watch: {
        // 监控集合
    },
    props: {
        // 集成父级参数
    },
    components:{
        'v-con':listCon,
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
        //   this.id = this.$route.query.id
          let that=this;
            this.$http({
                method:'post',
                url: '/company/qual/' + that.id,
                data:{
                }
            }).then(function(res){
                console.log(res.data)
            })
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
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style scoped lang="less">
.tab{
    background: #fff;
    height: 80px;
}
.box{
    background: #f5f5f5;
    padding: 18px 32px;
}
</style>
