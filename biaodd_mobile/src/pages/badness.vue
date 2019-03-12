<!-- 模型： DOM 结构 -->
<template>
    <div class="ness">
       <top-back :title='name'></top-back>

      <div class="award-list">
        <v-con :type="'bl'"  v-for="(el,i) in blList" :key="i" :obj='el'></v-con>
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
            name:'不良记录',
            blList:[],
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
          console.log(this.id);
          
            let that=this;
            this.$http({
                method:'post',
                url: '/company/undesirable/' + that.id ,
            }).then(function(res){
                if(res.data.data.allNum > 0 ) {
                  res.data.data.undesirable.forEach(el => {
                    el.list.forEach(el => {
                      that.blList.push(el)
                    })
                  })
                } else {
                  that.blList.length = 0
                }  
            })
        },
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style scoped lang='less'>
.ness {
  background-color: #f5f5f5;
  .award-list {
    padding: 110px 35px 5px;
  }
}
</style>
