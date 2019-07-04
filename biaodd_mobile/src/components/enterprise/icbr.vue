<!-- 模型： DOM 结构 -->
<template>
    <div class="icbr">
        <div class="letter-title"  >
            <div class="letter-name">
              <p>
               {{obj.comName}}
              </p>
            </div>
            <div class="letter-lead">
              <span class="person ">
                 统一社会信用代码&nbsp&nbsp&nbsp
              </span>
              <span >
                  {{obj.legalPerson}}
              </span>
            </div>
            <div class="letter-lead">
              <span class="person ">
                 联系电话&nbsp&nbsp&nbsp
              </span>
              <span >
                  {{obj.legalPerson}}
              </span>
            </div>
            <div class="letter-lead">
              <span class="person ">
                 公司地址&nbsp&nbsp&nbsp
              </span>
              <span class="letter-dizhi" >
                  {{obj.legalPerson}}
              </span>
            </div>
          </div>
    </div>
</template>
<script>
export default {
    name: 'icbr', // 结构名称
    data() {
        return {
            // 数据模型
        }
    },
    watch: {
        // 监控集合
    },
    props: {
        // 集成父级参数
        obj:{
         default:{}
        },
        isVip:{
         default:false
        },
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
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' >
.letter-dizhi {
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    max-width: 70%;
}
</style>
