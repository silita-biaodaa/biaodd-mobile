<!-- 模型： DOM 结构 -->
<template>
    <div class="zhongbCon newNotice">
        <div @click="topush(obj)">
            <div class="top">
                <p class="icon">
                    <img src="../../assets/icon-gong.png.png" alt="">
                </p>
                <p class="tit">{{obj.title}}</p>
            </div>
            <div class="center">法&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp院：{{obj.court}}</div>
            <div class="center">案&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp号：{{obj.caseNo}}</div>
            <div class="center">发布时间：{{obj.dateStr}}</div>
        </div>
        <v-dia v-if="isload"></v-dia>
        <v-vip :mask="isvip1" :txt="'开通会员才能查看法务信息'" @canel="fwCanelFn"></v-vip>

    </div>
</template>
<script>
import dialog from '@/components/dialog'
export default {
    name: 'lawde', // 结构名称
    data() {
        return {
            // 数据模型
             isload:false,
             isvip1:false,
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
    components: {
      'v-dia':dialog
    },
    created() {
        // console.group('创建完毕状态===============》created');
        this.swith()
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
          if(sessionStorage.getItem('xtoken')) {
             if(sessionStorage.getItem('permissions')) {
               this.$router.push({path:'/lawtext',query:{id:o.id}})
             } else {
               this.isvip1= true
             }
          } else {
              this.modalHelper.afterOpen();
              this.isload = true 
          }
      },
      fwCanelFn(){
          this.isvip1=false
      },
      swith() {
         var date = new Date(this.obj.dateStr.replace(/-/g, '/'));
         let newDateYear = date.getFullYear()
         let newDateMonth = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
         let newDateDay = date.getDate() + '' < 10 ? '0' + date.getDate() + '' : date.getDate() + ''
         this.obj.dateStr = newDateYear + '年' + newDateMonth + '月' + newDateDay + '日'  
      }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
</style>
