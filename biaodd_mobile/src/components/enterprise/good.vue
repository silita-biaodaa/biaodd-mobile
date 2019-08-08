<!-- 模型： DOM 结构 -->
<template>
<div class="good" >
     <div class="tab-an" :class="glory ? 'tab-hide' : 'tab-show' " @click="glory = !glory"  >
           <div class="tab-list" >
              <div class="tab-name" >
                 <img src="../../assets/icon-rongy.png.png" class="good-glory" alt="">
                 企业荣耀 ({{award}})
              </div>
              <div>
                   <van-icon name="arrow-down"  v-if="glory" />
                   <van-icon name="arrow-up" v-else />
              </div>
            </div>
            <!--  列表 -->
            <good-List :type="'glory'" v-for="(el,i) in awards" :key="i" :obj='el' ></good-List>

      </div>

       <div class="tab-an" :class="winning ? 'tab-hide' : 'tab-show' " @click="winning = !winning"  >
           <div class="tab-list" >
              <div class="tab-name" >
                 <img src="../../assets/icon-gongch.png.png"  class="good-winning" alt="">
                 工程获奖 ({{win}})
              </div>
              <div>
                   <van-icon name="arrow-down"  v-if="winning" />
                   <van-icon name="arrow-up" v-else />
              </div>
            </div>
            <div class="tab-an" :class="el.show ? 'win-hide' : 'tab-show' " @click.stop="el.show = !el.show" style="box-shadow:none;"  v-for="(el,i) in wins" :key="i" >
                <div class="tab-list" style="border:none;"  >
                   <div class="tab-name"  style="width:90%"  >
                      <div class="tab-long" >{{el.awards}}</div>({{el.values.length}})
                   </div>
                   <div>
                        <van-icon name="arrow-down"  v-if="el.show" />
                        <van-icon name="arrow-up" v-else />
                   </div>
                 </div>
                 <good-List :type="'win'"  v-for="(el,i) in el.values" :key="i" :obj='el'  ></good-List>
            </div>
      </div>

      <!-- <div class="tab-an" :class="road ? 'tab-hide' : 'tab-show' " @click="road = !road"  >
           <div class="tab-list" >
              <div class="tab-name" >
                 <img src="../../assets/icon-gongl.png.png"  class="good-road" alt="">
                 公路信用等级 (0)
              </div>
              <div>
                   <van-icon name="arrow-down"  v-if="road" />
                   <van-icon name="arrow-up" v-else />
              </div>
            </div>
            <good-List :type="'road'" ></good-List>
      </div> -->

      <!-- <div class="tab-an" :class="water ? 'tab-hide' : 'tab-show' " @click="water = !water"  >
           <div class="tab-list" >
              <div class="tab-name" >
                 <img src="../../assets/icon-shuil.png.png"  class="good-water" alt="">
                 水利信用等级 (0)
              </div>
              <div>
                   <van-icon name="arrow-down"  v-if="water" />
                   <van-icon name="arrow-up" v-else />
              </div>
            </div>
              <good-List :type="'water'" ></good-List>
      </div> -->

        <div class="tab-an" :class="bad ? 'tab-hide' : 'tab-show' " @click="bad = !bad"  >
            <div class="tab-list" >
              <div class="tab-name" >
                 <img src="../../assets/icon-bul.png.png"  class="good-bad" alt="">
                 不良记录 ({{under}})
              </div>
              <div>
                   <van-icon name="arrow-down"  v-if="bad" />
                   <van-icon name="arrow-up" v-else />
              </div>
            </div>
             <good-List :type="'bad'" v-for="(el,i) in unders" :key="i" :obj='el' ></good-List>
        </div>

</div>
</template>
<script>
import goodList from '@/components/enterprise/goodList'
export default {
    name: 'good', // 结构名称
    data() {
        return {
            // 数据模型
           glory:true,
           winning:true,
           road:true,
           water:true,
           bad:true,
           id:'',
           source:'',
           award:0,
           awards:[],
           under:0,
           unders:[],
           win:0,
           wins:[]
        }
    },
    watch: {
        // 监控集合
    },
    props: {
        // 集成父级参数
    },
    components: {
      'good-List':goodList,
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
         this.id = this.$route.query.id
         this.source = this.$route.query.source
         this.gainList()
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
        gainList() {
           let that=this;
            this.$http({
                method:'post',
                url: 'reputation/new/company' ,
                data:{
                   comId:that.id,
                   source:that.source,
                   reqType:'WAP'
                }
            }).then(function(res){
              if(res.data.code == 1) {
                that.awards = res.data.data.companyAwards
                that.award = res.data.data.companyAwards.length
                that.unders = res.data.data.under
                that.under = res.data.data.under.length
                for(let i of res.data.data.projectAwards) {
                  i.show = true
                }
                that.wins = res.data.data.projectAwards
                that.win = res.data.data.projectAwards.length
              }
                
                console.log(res);
                // that.list  = res.data.data
            })
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less'>
.good {
  padding: 15px 30px;
  background-color: #F8F8F8;
  box-sizing: border-box;
   .tab-list  img {
     width: 41px;
   }  
  .good-glory {
    height: 48px;
  }
  .good-winning {
    height: 39px;
  }
  .good-road {
    height: 34px;
  }
  .good-water {
    width: 36px;
    height: 36px;
  }
  .win-hide {
    height: 80px;
    overflow: hidden;
  }
  .tab-long {
    overflow: hidden;/*超出部分隐藏*/
    white-space: nowrap;/*不换行*/
    text-overflow:ellipsis;/*超出部分文字以...显示*/
    max-width: 90%;
  }
  
 
}

</style>
