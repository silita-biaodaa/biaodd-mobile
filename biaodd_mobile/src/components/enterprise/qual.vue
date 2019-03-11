<!-- 模型： DOM 结构 -->
<template>
    <div class="qual">
        <!-- tab -->
        <div class="tab">
            <span :class="tabNum==i?'active':''"  v-for="(o,i) of navList" :key="i" @click="tabTap(o.qualType,i)">{{o.qualType}}</span>
        </div>
        <div class="box">
            <!-- total -->
            <!-- list -->
            <van-pull-refresh v-model="loading" @refresh="onRefresh">
                <van-list finished-text="没有更多了" @load="onLoad">
                    <v-con :type="'zz'" v-for="(o,i) of list" :key="i" :obj="o"></v-con>
                </van-list>
            </van-pull-refresh>
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
            id:'5d86f82e66452e2db067e42ca327c629',
            list:[],
            data:{},
            navList:[
                {
                    qualType:'全部'
                }
            ],
            loading:false,
            tabNum:0
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
          this.ajax();
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
        onRefresh(){

        },
        onLoad(){

        },
        ajax(){
            let that=this;
            this.$http({
                method:'post',
                url: '/company/qual/' + that.id,
                data:{
                }
            }).then(function(res){
                that.data=res.data.data;
                for(let x of that.data){
                    that.navList.push(x);
                    that.list=that.list.concat(x.list)
                }
            })
        },
        tabTap(type,i){
            let that=this;
            that.list=[];
            that.tabNum=i;
            for(let x of that.data){
                if(type=='全部'){
                    that.list=that.list.concat(x.list)
                }else{
                    if(x.qualType==type){
                        that.list=x.list;
                        return false
                    }
                }
            }
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style scoped lang="less">
.tab{
    background: #fff;
    height: 80px;
    padding: 0 32px;
    display: flex;
    justify-content:space-between;
    align-items: center;
    flex-wrap:wrap
    span{
        border-bottom:4px solid transparent;
        padding-bottom: 9px
    }
    .active{
        border-bottom:4px solid #FE6603;
        color: #FE6603
    }
}
.box{
    background: #f5f5f5;
    padding: 18px 32px;
}
</style>
