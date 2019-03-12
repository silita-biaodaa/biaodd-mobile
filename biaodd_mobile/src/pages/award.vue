<!-- 模型： DOM 结构 -->
<template>
    <div class="award">
       <top-back :title='name'></top-back>

      <div class="award-list">
      <v-con :type="'gb'"  v-for="(el,i) in goodList" :key="i" :obj='el' ></v-con>
      </div>

      
    </div>
</template>
<script>
import topBack from '@/components/topback'
import listCon from '@/components/enterprise/listCon'
export default {
    name: 'award', // 结构名称
    data() {
        return {
            // 数据模型
            name:'获奖信息',
            goodList:[],
            id:''
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
       'v-con':listCon,
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
        this.id = this.$route.query.id
        this.ajax()
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
        ajax(){
            let that=this;
            this.$http({
                method:'post',
                url: '/company/reputation/' + that.id ,
                data:that.data
            }).then(function(res){
                if(res.data.data.allNum > 0 ) {
                  res.data.data.reputation.forEach(el => {
                    el.list.forEach(el => {
                      el.list.forEach(el => {
                         that.goodList.push(el)
                      })
                    })
                  })
                } else {
                  that.goodList.length = 0
                }  
            })
        },
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style scoped lang='less'>
.award {
  background-color: #f5f5f5;
  .award-list {
    padding: 110px 35px 5px;
  }
}
</style>
