<!-- 模型： DOM 结构 -->
<template>
    <div class="good">
      <template v-if="isajax1&&isajax2">
        <template v-if="goodList.length>0||blList.length>0">
          <div class="bear"  :class="{'active':isGood==true}" v-if="goodList.length>0">
            <div class="good-top"  @click="jumpGood" >
              获奖信息
              <van-icon :name="goodArrow"/>
            </div>
            <div class="good-list">
              <v-con :type="'gb'"  v-for="(el,i) in goodList" :key="i" :obj='el'></v-con>
            </div>         
          </div>
          <div class="bear" :class="{'active':isDad==true}" v-if="blList.length>0">
            <div class="good-top" @click="jumpDad" >
              不良记录
              <van-icon :name="dadArrow"/>
            </div>
            <div class="good-list">
              <v-con :type="'bl'"  v-for="(el,i) in blList" :key="i" :obj='el'></v-con>
            </div>         
          </div>
        </template>
        <template v-else>
          <n-not :isError="isError"></n-not>
        </template>
      </template>
      <template v-else>
        <van-loading size="50px"></van-loading>
      </template>
    </div>
</template>
<script>
import listCon from '@/components/enterprise/listCon'
import notList from '@/components/not'
export default {
    name: 'good', // 结构名称
    data() {
        return {
            // 数据模型
            id:'',
            goodList:[],
            blList:[],
            isajax1:false,//获奖是否加载完
            isajax2:false,//不良是否加载完
            isError:false,//是否加载失败
            isDad:false,
            isGood:false,
            dadArrow:'arrow-up',
            goodArrow:'arrow-up',
        }
    },
    watch: {
        // 监控集合
    },
    props: {
        // 集成父级参数
    },
    components: {
       'v-con':listCon,
       'n-not':notList
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
        this.id = this.$route.query.id
        this.ajax()
        this.gainBl()
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
                // data:that.data
            }).then(function(res){
                if(res.data.data.allNum > 0 ) {
                  res.data.data.reputation.forEach(el => {
                    el.list.forEach(el => {
                      el.list.forEach(el => {
                         that.goodList.push(el)
                      })
                    })
                  })
                  that.goodList.length = 3
                } else {
                  that.goodList.length = 0
                }
                that.isajax1=true
                
            }).catch(function(res){
                that.isajax1=true;
                that.isError=true;
            })
        },
        gainBl() {
           let that=this;
            this.$http({
                method:'post',
                url: '/reputation/undesirable',
                data:{
                  comId:that.id
                }
            }).then(function(res){
              //  console.log(res.data.data.undesirable.list,1)
               if(res.data.data.undesirable) {
                 if(res.data.data.undesirable.length>0){
                   that.blList = res.data.data.undesirable
                 }
                 
               }
               that.isajax2=true
            }).catch(function(res){
                that.isajax2=true;
                that.isError=true;
            })
        },
        jumpGood() {
          let that=this
          if(that.goodList.length == 0) {
            return
          }
          this.isGood=!this.isGood;
          if(this.goodArrow=='arrow-up'){
            this.goodArrow='arrow'
          }else{
            this.goodArrow='arrow-up'
          }
          
        },
        jumpDad() {
          if(this.blList.length == 0) {
            return
          }
          this.isDad=!this.isDad;
          if(this.dadArrow=='arrow-up'){
            this.dadArrow='arrow'
          }else{
            this.dadArrow='arrow-up'
          }
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style scoped lang='less'>
.good {
  .bear {
    background-color: #f5f5f5;
    overflow: hidden;
    height: 100%;
    // transition: height .5s;    
    .good-top {
      padding: 0 35px;
      font-size: 32px;
      color:#333;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 87px;
      background-color: #fff;
      font-weight: 550;
      box-sizing: border-box;
      margin-bottom: 17px;
      i {
        font-size: 42px;
      }
    }
    .good-list {
      padding: 0 33px 10px;
    }
    .gpp {
      padding-bottom: 100px;
    }
  }
  .active{
    height: 87px;
  }
}

</style>
