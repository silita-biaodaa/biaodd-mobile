<!-- 模型： DOM 结构 -->
<template>
    <div class="zhongbCon newNotice">
        <div @click="topush(obj)">
            <div class="top">
                <p class="icon">
                    <img src="../assets/icon-qi.png"/>
                </p>
                <p class="tit">{{obj.comName}}</p>
            </div>
            <div class="center">法定代表：{{obj.legalPerson}}</div>
            <div class="center">联系方式：{{phone}}</div>
            <div class="center">企业地址：{{obj.comAddress}}</div>
        </div>
        <template v-if="follow">
            <div class="follow-box">
                <span @click="noFollow">取消关注</span>
            </div>
        </template>
        <v-dia v-if="isload"></v-dia>
    </div>
</template>
<script>
import dialog from '@/components/dialog'
export default {
    name: 'zhongbCon', // 结构名称
    data() {
        return {
            // 数据模型
              isload:false
        }
    },
    computed:{
        phone(){
            if(this.obj.phone) {
                let arr=this.obj.phone.split(';');
               return arr[0]
            }
            
        }
    },
    watch: {
        // 监控集合
    },
    props: {
        // 集成父级参数
        obj:{},
        follow:{
            default:false
        },
        title:{
             default:''
        },
        orderNo:{
            default:''
        }
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
    components: {
        'v-dia':dialog
    },
    methods: {
        // 方法 集合.
         topush(o) {
             if(this.title == '') {
                if(sessionStorage.getItem('xtoken')) {
                    this.$router.push({path:'/letter',query:{id:o.comId,source:o.regisAddress,name:o.comName}})
                } else {
                    this.modalHelper.afterOpen();
                    this.isload = true 
                }
             } else {
                 if(this.title.indexOf('公路') >= 0 ) {
                      this.$router.push({path:'/wayquery',query:{id:o.comId,orderNo:this.orderNo}})
                 } else if(this.title.indexOf('水利') >= 0 ) {
                      this.$router.push({path:'/waterquery',query:{id:o.comId,orderNo:this.orderNo}})
                 } else {
                      this.$router.push({path:'/loadquery',query:{id:o.comId,orderNo:this.orderNo}})
                 }
             }
        },
        noFollow(){
            this.$emit('nofollow',{id:this.obj.comId})
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style scoped lang="less">
</style>
