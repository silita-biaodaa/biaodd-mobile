<!-- 模型： DOM 结构 -->
<template>
    <div class="recode pop-box">
        <div class="recode-list" >
            <ul>
              <li v-for="(el,i) in keep" :key="i" :class="el.active ? 'active' : ''" @click="changeA(el)" >{{el.name}}</li>
            </ul>
        </div>
        <div class="recode-btn" >
          <button  @click="recordFn" style="backgroundColor:#fff;color:#000" >重置</button>
          <button @click="sureFn" >确定</button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'recode', // 结构名称
    data() {
        return {
            // 数据模型a
            keep:[
              {
                name:'湘内企业',
                code:'hunan',
                active:true,
              },
              {
                name:'入湘企业',
                code:'enterCompany',
                active:false,
              },
              {
                name:'湘内企业+入湘企业',
                code:'enterHunan',
                active:false,
              }
            ],
            name:''
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
        if(sessionStorage.getItem('companyScreenNum')) {
            let data=JSON.parse(sessionStorage.getItem('companyScreenNum'))
            if(data.isBei.code != '') {
              this.keep[0].active = false
              for (let i of this.keep) {
                if(data.isBei.code == i.code ) {
                  i.active = true
                  this.name = i.code
                }
              }
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
        changeA(el) {
          for (let i of this.keep) {
            i.active = false
          }
          el.active = true
          this.name = el.code
        },
        sureFn() {
           this.$emit('sureFn',{str:this.name});
        },
        recordFn() {
          for (let i of this.keep) {
            i.active = false
          }

          this.name = this.keep[0].code
          this.$emit('sureFn',{str:this.name});
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less'>
.recode {
 .active {
   background-color: #FE6603;
   color: #fff !important;
   border: none;
 }
}

</style>
