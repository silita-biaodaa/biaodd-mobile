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
                    name:'全部',
                    class:false,
                },{
                    name:'经评审最低报价法',
                    class:false,
                },{
                    name:'综合评估法Ⅰ',
                    class:false,
                },{
                    name:'合理低价法',
                    class:false,
                },{
                    name:'固定标价评分法',
                    class:false,
                },{
                    name:'综合评估法Ⅱ',
                    class:false,
                },{
                    name:'技术评分最低标价法',
                    class:false,
                },{
                    name:'其他',
                    class:false,
                },{
                    name:'百分制综合评分法',
                    class:false,
                },{
                    name:'合理定价抽取法',
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
        selectArr:{

        }
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
        // console.log(this.selectArr);
        if(this.selectArr.length>0){
            for(let x of this.assessList){
                for(let y of this.selectArr){
                    if(x.name==y){
                        x.class=true
                    }
                }
            }
            for(let y of this.selectArr){
                this.selectPush.push(y);
            }
        }
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
            if(i==9){
                for(let x of that.assessList){
                    x.class=false
                }
                that.assessList[i].class=true;
                that.selectPush=[];
                return false
            }else{
                that.assessList[9].class=false;
            }

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
            this.$emit('sureFn',{str:str,select:this.selectPush});
        },
        canleFn(){
            this.$parent.mask=false;
            this.$emit('canleFn');
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style scoped lang="less">
.assess{
    position: absolute;
    background: #f5f5f5;
    bottom:0;
    transform: translateY(100%);
    left: 0;
    z-index: 9;
    width: 100%;
    padding:50px 0 0;
    box-sizing: border-box;
    ul{
        display: flex;
        flex-wrap: wrap;
        padding: 0 32px;
        margin-bottom: 130px;
        li{
            text-align: center;
            margin-bottom: 32px;
            // width: 50%;
            span{
                margin-right: 40px;
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
@media screen and (max-width: 321px) {
    .assess ul li span{
        margin-right: 10px;
    }
}
@media screen and (min-width:376px){
    .assess ul li span{
        margin-right: 60px;
    }
}
</style>
