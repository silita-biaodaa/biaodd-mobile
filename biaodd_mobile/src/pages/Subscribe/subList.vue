<!-- 模型： DOM 结构 -->
<template>
    <div class="subList" @click="jump" >
       <div class="scri-list" >
         <div class="scri-title" >
           <div class="scri-read" v-show="obj.isRead == 0" >
             <div class="title-read" ></div> 
           </div>
           <p v-html="obj.title" ></p>
         </div>
         <!-- 正文 -->
         <div class="scri-text" >  
           (正文：<p  v-html="obj.content" ></p>)
         </div>
         <!-- x项目类型 -->
         <div class="scri-type" >
           <div class="type-list"  :class="1%2 == 1 ? 'odd': 'even'" v-show="obj.projectType"  >
             {{obj.projectType}}
           </div>
           <div class="type-list"  :class="2%2 == 1 ? 'odd': 'even'" v-show="obj.noticeType"  >
             {{obj.noticeType}}
           </div>
         </div>

          <div class="scri-w" v-show="obj.regions" >
            <span style="color:#999">项目地区：</span>{{obj.regions}}
          </div>
           <div class="scri-w"  >
            <span style="color:#999">评标办法：</span>{{obj.pbMode ? obj.pbMode : '详见原文'}}
          </div>
           <div class="scri-w" v-show="obj.pubDate" >
            <span style="color:#999">发布时间：</span>{{obj.pubDate}}
          </div>

       </div>
    </div>
</template>
<script>
export default {
    name: 'subList', // 结构名称
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
        jump() {
          if(this.obj.type == 1) {
              this.$router.push({path:'/article',query:{id:this.obj.pkid,source:this.obj.source}})
          } else {
             this.$router.push({path:'/notice',query:{id:this.obj.pkid,source:this.obj.source}})
          }
            let that=this; 
            this.$http({
                 method:'post',
                 url: '/newnocite/read',
                 data: {
                    ntId:that.obj.pkid,
                    subType:'zhaobiao',
                    source:that.obj.source
                 }
             }).then(function(res){
               
             })
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
.subList {
  .scri-list {
    background-color: #fff;
    padding: 40px 32px;
    box-sizing: border-box;
    border-bottom: 1PX solid #f0f0f0;
    .scri-title {
      display: flex;
      line-height: 42px;
      font-size: 32px;
      .title-read {
        width: 8px;
        height: 8px;
        background-color: red;
        border-radius: 50%;
      }
      .scri-read {
        width: 20px;
        height: 42px;
        display: flex;
        align-items: center;
      }
    }
    .scri-text {
      font-size: 24px;
      color: #999;
      margin: 26px 0;
      display: flex;
      p {
        overflow: hidden;/*超出部分隐藏*/
        text-overflow:ellipsis;/* 超出部分显示省略号 */
        white-space: nowrap;
        max-width: 80%;
      }
    }
    .scri-type {
      display: flex;
      .type-list {
        padding: 0 14px;
        line-height: 40px;
        font-size: 20px;
        margin: 0 16px 19px 0; 
      }
      .odd {
        background-color:rgba(253,239,227,1);
        color: #EF873A;
      }
      .even {
        background-color:rgba(227,230,253,1);
        color: #3A76F0;
      }
    }
    .scri-w {
      font-size: 28px;
      color: #333;
      margin-bottom: 24px;
    }
  }
}
</style>
