<!-- 模型： DOM 结构 -->
<template>
    <div class="recode pop-box">
        <div class="recode-list" >
            <ul>
              <li v-for="(el,i) in keep" :key="i" @click="changeA(el)" :class="el.active ? 'active' : ''" >{{el.name}}</li>
            </ul>
            <div class="list-title" v-show="ishow" >
              认证等级
            </div>
            <ul v-show="ishow" >
              <li v-for="(el,i) in grade" :key="i" :class="el.active ? 'active' : ''" @click="changeB(el)" >{{el.name}}</li>
            </ul>
        </div>
        <div class="recode-btn" >
          <button @click="recordFn" style="backgroundColor:#fff;color:#000" >重置</button>
          <button  @click="sureFn" >确定</button>
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
                name:'安全认证',
                code:'aqrz',
                active:false,
              },
              {
                name:'安全考评优良企业',
                code:'reviewFine',
                active:false,
              },
            ],
            grade:[
              {
                name:'全部',
                active:true,
              },
               {
                name:'省级优秀',
                active:false,
              },
               {
                name:'省级合格',
                active:false,
              },
               {
                name:'市级优秀',
                active:false,
              },
               {
                name:'市级合格',
                active:false,
              },
            ],
            arrSafe:[],
            ishow:false,
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
            if(data.honorCate.code != '') {
              if(data.honorCate.code == 'reviewFine') {
                 this.keep[1].active = true
              }
               let arr = data.honorCate.code.split(',')
               if(arr[0].indexOf('aqrz') > -1 ) {
                 this.keep[0].active = true
                 this.ishow = true
               }
               if(arr[0].indexOf('||') > -1) {
                 this.grade[0].active = false
                 for(let i of this.grade) {
                   if(arr[0].indexOf(i.name) > -1) {
                     i.active = true
                     this.arrSafe.push(i.name)
                   }
                 }
               }
               if(arr[1].indexOf('reviewFine') > -1 ) {
                 this.keep[1].active = true
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
          el.active = !el.active
          if(this.keep[0].active) {
            this.ishow = true
            // this.grade[0].active = true
          } else {
            this.ishow = false
             for (let i of this.grade) {
               i.active = false
            }
            this.grade[0].active = true
          }
        },
        changeB(el) {
          if(el.name == '全部') {
              for (let i of this.grade) {
               i.active = false
             }
              this.grade[0].active = true
              this.arrSafe = []
          } else {
            this.grade[0].active = false
            el.active = !el.active
            if(el.active) {
              this.arrSafe.push(el.name)
            } else {
              let i = this.arrSafe.indexOf(el.name)
              this.arrSafe.splice(i,1)
              if(this.arrSafe.length == 0) {
                this.grade[0].active = true
              }
            }
            
          }
        },
        sureFn() {
          let arr = []
          if(this.keep[0].active) {
            if(this.grade[0].active) {
              arr.push(this.keep[0].code)
            } else {
              let str = this.arrSafe.join('/')
              let arr1 = []
              arr1.push(this.keep[0].code)
              arr1.push(str)
              let str1 = arr1.join("||")
              arr.push(str1)
            }
          }
          if(this.keep[1].active) {
             arr.push(this.keep[1].code)
          }
          let str2 = arr.join(',')
          this.$emit('sureFn',{str:str2});
        },
        recordFn() {
          for (let i of this.keep) {
            i.active = false
          }
          this.ishow = false
           for (let i of this.grade) {
            i.active = false
          }
          this.arrSafe = []
          this.grade[0].active = true
          this.$emit('recordFn',{str:''});
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less'>
.recode {
  .recode-list {
    ul {
      margin-bottom: 25px;
    }
    .active {
      background-color: #FE6603;
      color: #fff !important;
      border: none;
    }
    .list-title {
      line-height: 56px;
      font-size: 28px;
      margin-bottom: 20px;
    }
  }
}
</style>
