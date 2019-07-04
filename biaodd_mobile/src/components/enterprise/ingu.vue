<!-- 模型： DOM 结构 -->
<template>
    <div class="ingu">
      <div class="gu-i" > 
        <img :src="imgs" alt="">
        <span class="gu-col" :class="i%3 == 0 ? 'i-first' : (i%3 == 1 ? 'i-two':'i-three')" >
          {{i +1 }}
        </span>
      </div>
      <div>
        <p>
          <span style="color:#999;">股东&nbsp&nbsp</span>
          <span>{{obj.inv}}</span>
        </p>
         <p>
          <span style="color:#999;" >认缴出资额&nbsp&nbsp</span>
          <span>{{obj.liSubConAm ? obj.liSubConAm + '万元' : ''}}</span>
        </p>
      </div>
    </div>
</template>
<script>
export default {
    name: 'ingu', // 结构名称
    data() {
        return {
            // 数据模型a
            listimg :[
              {
                img:require('../../assets/pic-sek.png.png'),
              }
              ,{
                img:require('../../assets/pic-sek.png(1).png'),
              },{
                img:require('../../assets/pic-sek.png(2).png'),
              }
            ]

        }
    },
    watch: {
        // 监控集合
        
    },
    computed: {
      imgs() {
        return this.listimg[this.i%3].img
      }
    },
    props: {
        // 集成父级参数
        obj:{
          default:{}
        },
        i:{
          default:0
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
    methods: {
        // 方法 集合
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
.ingu {
  height:166px;
  background:rgba(255,255,255,1);
  box-shadow:0px 6px 6px 0px rgba(0, 0, 0, 0.03);
  border-radius:8px;
  margin: 0 35px;
  padding-top: 30px;
  box-sizing: border-box;
  display: flex;
  margin-bottom: 10px;
  .gu-i {
    width: 68px;
    height: 102px;
    line-height: 102px;
    padding-left: 15px;
    box-sizing: border-box;
    margin-right: 20px;
    position: relative;
    img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
    }
    .gu-col {
      position: absolute;
    }
  }
  p {
    line-height: 52px;
    font-size: 32px;
  }
  .i-first {
    color:rgba(239,135,58,1);
  }
  .i-two {
    color:rgba(58,118,240,1);
  }
  .i-three {
    color:rgba(214,85,136,1);
  }
}
</style>
