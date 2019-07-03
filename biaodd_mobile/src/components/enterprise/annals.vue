<!-- 模型： DOM 结构 -->
<template>
    <div class="annals">
        <top-back :title="'年报详情'"></top-back>

        <div class="tab-an" :class="isinfo ? 'tab-hide' : 'tab-show' " @click="isinfo = !isinfo"  >
           <div class="tab-list" >
              <div class="tab-name" >
                 <img src="../../assets/icon-jibxx.png.png" alt="">
                 基本信息
              </div>
              <div>
                   <van-icon name="arrow-down"  v-if="isinfo" />
                   <van-icon name="arrow-up" v-else />
              </div>
            </div>
            <an-info></an-info>
        </div>

        <div class="tab-an" :class="insite ? 'tab-hide' : 'tab-show' " @click="insite = !insite" >
           <div class="tab-list" >
              <div class="tab-name" >
                 <img src="../../assets/icon-wzh.png.png" alt="" class="site-img" >
                 网站信息
              </div>
              <div>
                   <van-icon name="arrow-down"  v-if="insite" />
                   <van-icon name="arrow-up" v-else />
              </div>
            </div>
             <an-site></an-site>
        </div>

        <div class="tab-an" :class="shareholder ? 'tab-hide' : 'tab-show' "  @click="shareholder = !shareholder" >
           <div class="tab-list" >
              <div class="tab-name" >
                 <img src="../../assets/icon-gud.png.png" alt="" class="share-img" >
                 股东及出资信息
              </div>
              <div>
                   <van-icon name="arrow-down"  v-if="shareholder" />
                   <van-icon name="arrow-up" v-else />
              </div>
            </div>
            <an-share></an-share>
        </div>

        <div class="tab-an" :class="invest ? 'tab-hide' : 'tab-show' "  @click="invest = !invest" >
           <div class="tab-list" >
              <div class="tab-name" >
                 <img src="../../assets/icon-duiwai.png.png" alt="" class="invest-img" >
                 对外投资信息
              </div>
              <div>
                   <van-icon name="arrow-down"  v-if="invest" />
                   <van-icon name="arrow-up" v-else />
              </div>
            </div>
            <an-vest></an-vest>
        </div>

        <div class="tab-an" :class="asset ? 'tab-hide' : 'tab-show' " @click="asset = !asset" >
           <div class="tab-list" >
              <div class="tab-name" >
                 <img src="../../assets/icon-zich.png.png" alt="" class="asset-img" >
                 资产状况
              </div>
              <div>
                   <van-icon name="arrow-down"  v-if="asset" />
                   <van-icon name="arrow-up" v-else />
              </div>
            </div>
               <an-set></an-set>
        </div>

        <div class="tab-an" :class="assure ? 'tab-hide' : 'tab-show' " @click="assure = !assure" >
           <div class="tab-list" >
              <div class="tab-name" >
                 <img src="../../assets/icon-danbao.png.png" alt="" class="assure-img" >
                 对外提供保证担保信息
              </div>
              <div>
                   <van-icon name="arrow-down"  v-if="assure" />
                   <van-icon name="arrow-up" v-else />
              </div>
            </div>
            <div class="tab-no" >
              暂无信息 !
            </div>
        </div>

        <div class="tab-an" :class="security ? 'tab-hide' : 'tab-show' " @click="security = !security" >
           <div class="tab-list" >
              <div class="tab-name" >
                 <img src="../../assets/icon-sheb.png.png" alt=""  class="security-img">
                 社保信息
              </div>
              <div>
                   <van-icon name="arrow-down"  v-if="security" />
                   <van-icon name="arrow-up" v-else />
              </div>
            </div>
            <an-cury></an-cury>
        </div>
            
    </div>
</template>
<script>
import topBack from '@/components/topback'
export default {
    name: 'annals', // 结构名称
    data() {
        return {
            // 数据模型
            isinfo:true, // 基本信息控制
            insite:true, // 网站信息
            shareholder:true, // 股东
            invest:true, // 投资
            asset:true, // 资产
            assure:true, // 担保
            security:true, // 社保
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
    },
    beforeMount() {
        // console.group('挂载前状态  ===============》beforeMount');
    },
    components: {
      'top-back':topBack,
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
        changeF() {
          
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
.annals {
    min-height: 100vh;
    background-color: #F8F8F8;
    padding: 130px 29px 110px;
    box-sizing: border-box;
    .tab-an {
      box-shadow:0px 6px 6px 0px rgba(0, 0, 0, 0.03);
      border-radius:8px;
      margin-bottom: 20px;
      padding: 0 14px 20px;
      box-sizing: border-box;
      background-color: #fff;
    }
    .tab-hide {
      height: 120px;
      overflow: hidden;
    }
    .tab-show {
      width: auto;
    }
    .tab-list {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 120px;
      border-bottom: 1PX solid #F2F2F2;
      img {
        width: 35px;
        height: 40px;
        margin-right: 20px;
      }
      .tab-name {
        font-size: 32px;
        color: #333;
        display: flex;
        align-items: center;
      }
      i {
        font-size: 40px;
        color: #666;
      }
      .site-img {
        width: 40px;
      }
      .share-img {
        width: 42px;
        height: 35px;
      }
      .invest-img {
        width: 36px;
        height: 39px;
      }
      .asset-img {
        width: 36px;
        height: 36px;
      }
      .assure-img {
        width: 34px;
        height: 42px; 
      }
      .security-img {
        width: 41px;
        height: 30px;
      }
    }
    .tab-no {
      height: 88px;
      line-height: 88px;
      text-align: center;
      font-size: 28px;
      color: #ccc;
    }
}
</style>
