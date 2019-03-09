<!-- 模型： DOM 结构 -->
<template>
    <div class="assess">
        <ul>
            <li v-for="(o,i) of assessList" :key="i">
                <span :class="{'active':o.class}" @click="tapFn(i)">{{o.name}}</span>
            </li>
        </ul>
        <div class="btn">
            <button class="canle" @click="canleFn">取消</button>
            <button class="sure" @click="sureFn">确定</button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'assess', // 结构名称
    data() {
        return {
            // 数据模型
            assessList:[
                {
                    name:'综合评估法2',
                    class:false,
                },{
                    name:'综合评估法1',
                    class:false,
                },{
                    name:'固定标价评分法',
                    class:false,
                },{
                    name:'合理定价抽取法',
                    class:false,
                },{
                    name:'技术评分最低标价法',
                    class:false,
                },{
                    name:'合理低价法',
                    class:false,
                },{
                    name:'经评审最低报价法',
                    class:false,
                },{
                    name:'其他',
                    class:false,
                },{
                    name:'百分制综合评分法',
                    class:false,
                }
            ],
            selectPush:[],
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
        tapFn(i){
            let that=this;
            if(!that.assessList[i].class){
                that.selectPush.push(that.assessList[i].name);
                that.assessList[i].class=true;
            }else{
                for(let x in that.selectPush){
                    if(that.selectPush[x]==that.assessList[i].name){
                        that.selectPush.splice(x,1)
                    }
                }
                that.assessList[i].class=false;
            }
            
        },
        sureFn(){
            let str=this.selectPush.join('||');
            this.$parent.mask=false;
            this.$emit('sureFn',str);
        },
        canleFn(){
            this.$parent.mask=false;
            this.$emit('canleFn',str);
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style scoped lang="less">
.assess{
    position: absolute;
    height: 705px;
    background: #f5f5f5;
    bottom: -705px;
    left: 0;
    z-index: 9;
    width: 100%;
    padding:50px 0;
    box-sizing: border-box;
    ul{
        display: flex;
        flex-wrap: wrap;
        padding: 0 32px;
        margin-bottom: 150px;
        li{
            text-align: center;
            margin-bottom: 32px;
            // width: 50%;
            span{
                margin-right: 60px;
                padding: 15px 40px;
                display: inline-block;
                border-radius:10px;
                text-align: center;
                color: #999;
                border: 1PX solid #CCBEBE;
                background: #fff;
            }
            .active{
                border-color: #FE6603;
                background: #FE6603;
                color: #fff;
            }
        }
    }
    .btn{
        display: flex;
        button{
            height: 84px;
            flex-grow:1;
        }
        .sure{
            background: #FE6603;
            border: 1PX solid #FE6603;
            color: #fff;
        }
        .canle{
            border: 1PX solid #CCBEBE;
            color: #333;
            background: #fff;
        }
    }
    
}
</style>
