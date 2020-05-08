<!-- 模型： DOM 结构 -->
<template>
    <div class="zhongbCon newNotice">
        <div @click="topush(obj)" >
            <div class="top">
                <div class="left-name">
                    <p class="icon">
                        <img src="../assets/icon-ry.png"/>
                    </p>
                    <p class="tit">{{obj.name}}</p>
                </div>
                <div class="under" v-if="obj.isUnder" @click.stop="jumpgo">押证</div>
            </div>
            <template>
                <p v-show="obj.comName" >
                    <span class="left-txt">注册单位</span>
                    <span>：{{obj.comName}}</span></p>
                <p>
                    <span class="left-txt">注册类别</span>
                    <span>：{{obj.category}}</span>
                </p>
                <p v-show="obj.certNo" >
                    <span class="left-txt">证书编号</span>
                    <span>：{{obj.certNo}}</span>
                </p>
                <p v-show="obj.major" >
                    <span class="left-txt">专&nbsp&nbsp&nbsp业</span>
                    <span>：</span>
                    <span>{{obj.major}}</span>
                </p>
            </template>
        </div>
        <v-vip :mask="isvip" :txt="'开通会员才可查看人员详情'"></v-vip>
    </div>
</template>
<script>
export default {
    name: 'ryCon', // 结构名称
    data() {
        return {
            // 数据模型
            // isload:false,
            isvip:false,
        }
    },
    watch: {
        // 监控集合
    },
    props: {
        // 集成父级参数
        obj:{},
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
        // if( sessionStorage.getItem('permissions') == null || sessionStorage.getItem('permissions') == '') {
        //     this.isVip=false;
        // }
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
        topush(o) {
            if(!sessionStorage.getItem('xtoken')) {
                 this.isvip=true;
                 this.modalHelper.afterOpen();
                 return false
            }
            // if(sessionStorage.getItem('permissions') == null || sessionStorage.getItem('permissions') == ''){
            //     this.isvip=true;
            //     this.modalHelper.afterOpen();
            //     return false
            // }
            sessionStorage.setItem('peoploDetail',JSON.stringify(this.obj))
            this.$router.push({path:'/peopleDetail'})
            
        },
        jumpgo(){
             if(!sessionStorage.getItem('xtoken')) {
                 this.isvip=true;
                 this.modalHelper.afterOpen();
                 return false
              }
                if(!this.judgeVip()){
                    this.isvip=true;
                    this.modalHelper.afterOpen();
                    return false
                }
                sessionStorage.setItem('peoploDetail',JSON.stringify(this.obj))
                this.$router.push({path:'/peopleDetail',query:{type:'yz'}})
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style scoped lang="less">
.tit{
    font-size: 32px;
    font-weight: bold;
    color: #000;
    margin-bottom: 26px;
    max-width: 100%;
    // overflow: hidden;
    // text-overflow:ellipsis;
    // white-space:nowrap
}
p{
    font-size: 28px;
    margin-bottom: 26px;
    overflow: hidden;
    span{
        color: #999;
    }
    .left-txt{
        // display: inline-block;
        // text-align-last: justify;
        width: 112px;
        // display: flex;
        // justify-content: space-between;
    }
}
p:last-child{
    margin-bottom: 0
}
.newNotice .top{
    margin-bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 26px;
    .left-name{
        display: flex;
        align-items: center;
        width: calc(100% - 92px);
        
        p{
            margin-bottom: 0;
        }
    }
    .under{
        width: 92px;
        height: 42px;
        border: 1PX solid #FE6603;
        color: #FE6603;
        border-radius: 10px;
        text-align: center;
    }
}
</style>
