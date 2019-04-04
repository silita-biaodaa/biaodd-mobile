<!-- 模型： DOM 结构 -->
<template>
    <div class="user">
        <top-back :title='"个人信息"'></top-back>
        <div class="tx-box">
            <img src="../../assets/icon-tpux.png.png"/>
            <span>12322113366</span>
        </div>
        <section>
            <ul>
                <li>
                    <span>昵称</span>
                    <div>
                        <input type="text" placeholder="请填写昵称" v-model="data.nickname"/>
                    </div>
                </li>
                <li>
                    <span>姓名</span>
                    <div>
                        <input type="text" placeholder="请填写真实姓名" v-model="data.name"/>
                    </div>
                </li>
                <li>
                    <span>性别</span>
                    <div class="sex-box">
                        <p class="sex" :class="[o.class,i==sexNum ?'active': '']" v-for="(o,i) of sexList" :key="i" @click="selectSex(i)">{{o.name}}</p>
                    </div>
                </li>
                <li>
                    <span>公司</span>
                    <div>
                        <input type="text" placeholder="请填写您的公司名称" v-model="data.company"/>
                    </div>
                </li>
                <li>
                    <span>职务</span>
                    <div>
                        <input type="text" placeholder="请填写您担任的职务" v-model="data.title"/>
                    </div>
                </li>
            </ul>
        </section>
    </div>
</template>
<script>
import topBack from '@/components/topback'
export default {
    name: 'user', // 结构名称
    data() {
        return {
            // 数据模型
            sexList:[
                {
                    name:'女',
                    class:'girl'
                },
                {
                    name:'男',
                    class:'boy'
                },
            ],
            sexNum:0,
            data:{
                nickname:'',
                name:'',
                sex:0,
                company:'',
                title:'',
            }
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
        selectSex(i){
            this.sexNum=i;
            this.data.sex=i;
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
.arrow.van-icon{
    font-size: 42px;
    color: #666;
}
input::placeholder{
    color: #ddd;
}
.tx-box{
    padding-top: 147px;
    text-align: center;
    margin-bottom: 82px;
    img{
        width: 139px;
        height: 139px;
        display: block;
        margin: 0 auto 20px;
    }
    span{
        font-size: 28px;
    }
}
section{
    padding-left: 34px;
    li{
        border-top: 1PX solid #F2F2F2;
        padding-right: 34px;
        height: 104px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .sex-box{
            flex-direction: row-reverse;
        }
        div{
            display: flex;
            align-items: center;
            .sex{
                padding-left: 55px;
                height: 38px;
                line-height: 1
            }
            .boy{
                background: url(../../assets/icon-nan1.png) no-repeat;
                background-size: auto 100%;
                margin-right: 80px
            }
            .boy.active{
                background-image: url(../../assets/icon-nan2.png);
            }
            .girl.active{
                background-image: url(../../assets/icon-nv2.png);
            }
            .girl{
                background: url(../../assets/icon-nv1.png) no-repeat;
                background-size: auto 100%;
            }
        }
        span{
            letter-spacing:64px;
            color: #333;
            font-weight: bold;
        }
        input{
            border: none;
            outline: none;
            text-align: right;
        }

    }
    li:last-child{
        border-bottom: 1PX solid #f2f2f2;
    }
}
</style>
