<!-- 模型： DOM 结构 -->
<template>
    <div class="goodList" >
       <!-- 荣耀列表 -->
      <template v-if="type == 'glory'" >
            <div class="glory-list" >
              <div class="glory-title" >
                {{obj.awardName}}
              </div>
              <p>
                <span>{{obj.pkid ? '评定日期': '有效期至'}}：</span><span>{{obj.valided ? obj.valided : obj.issued}}</span>
              </p>
            </div>
      </template>
     <!--公路  -->
      <template v-if="type == 'road'" >
            <div class="glory-list" >
              <div class="glory-title" >
                安全认证 —省级优秀（湖南省）
              </div>
              <p>
                评价省份：<span>2010-11-11</span>
              </p>
            </div>
      </template>
    <!-- 水利 -->
      <template v-if="type == 'water'" >
            <div class="glory-list" >
              <div class="glory-title" >
                安全认证 —省级优秀（湖南省）
              </div>
              <p>
                评价类型：<span>2010-11-11</span>
              </p>
              <p>
                有效期至：<span>2010-11-11</span>
              </p>
            </div>
      </template>
     <!--  不良 -->
       <template v-if="type == 'bad'" >
            <div class="list-bad" >
                <div class="glory-title" >
                  {{obj.review}}
                </div>
                <div  class="bad-name" v-show="obj.projName" > 
                  <div class="bad-left" >
                     项目名称：
                  </div>
                  <div  class="bad-right" >
                    {{obj.projName}}
                  </div>
                </div>
                <div  class="bad-name" > 
                  <div class="bad-left" >
                     评定原因：
                  </div>
                  <div  class="bad-right"  v-show="obj.remark" >
                     {{obj.remark}}
                  </div>
                </div>
                <div  class="bad-name"  v-show="obj.issued" > 
                  <div class="bad-left" >
                     评定时间：
                  </div>
                  <div  class="bad-right" >
                    {{obj.issued}}
                  </div>
                </div>
            </div>
      </template>
      
      <!-- 获奖  -->
      <template v-if="type == 'win'"  >
            <div class="list-bad"  @click.stop="toWin(obj)"   >
                <div class="glory-title" >
                  {{obj.projName}}
                </div>
                <div class="bid-type" >
                  <div class="type-yelle" v-show="obj.joinType" >
                    {{obj.joinType}}
                  </div>
                  <div class="type-blue"  v-show="obj.projType" >
                    {{obj.projType}}
                  </div>
                </div>
                <div  class="bad-name" > 
                  <div class="bad-left" >
                     奖项名称：
                  </div>
                  <div  class="bad-right" >
                    {{obj.awardName}}
                  </div>
                </div>
                <div  class="bad-name" > 
                  <div class="bad-left" >
                     获奖日期：
                  </div>
                  <div  class="bad-right" >
                     {{obj.issued}}
                  </div>
                </div>
            </div>
      </template>

    </div>
</template>
<script>
export default {
    name: 'templateName', // 结构名称
    data() {
        return {
            // 数据模型a
        }
    },
    watch: {
        // 监控集合
    },
    props: {
        // 集成父级参数
         type:{
            default:''
        },
        obj:{}
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
        toWin(o) {
            this.$router.push({path:'/prise',query:{id:o.pkid}})
          }
        }
    }


</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
.goodList {
  .glory-list {
     padding: 0 14px;
     min-height: 110px;
     display: flex;
     flex-direction:column;
     justify-content: center;
     border-bottom: 1PX solid #F2F2F2;
     p {
     font-size:24px;
     color:#ccc;
     line-height: 46px;
    }
   }
    .glory-title {
      font-size:28px;
      line-height: 46px;
      font-weight: 550;
    }
  .list-bad {
    padding-top: 20px;
    .bad-name {
      overflow: hidden;
      display: flex;
      font-size: 24px;
      line-height: 46px;
      .bad-left {
        width: 19%;
      }
      .bad-right {
        width: 79%;
      }
    }
    .bid-type {
      display: flex;
      div {
        height: 36px;
        line-height: 36px;
        font-size: 20px;
        padding: 0 15px;
        margin: 15px 15px 15px 0 ;
      }
      .type-yelle {
        background-color: #FDEFE3;
        color: #EF873A;
      }
      .type-blue {
        background-color: #E3E6FD;
        color: #3A76F0;
      }
    }
  }
}
</style>
