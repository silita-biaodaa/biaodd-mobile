<template>
<div class="bid">
  <div class="b-search"  >
    <input type="text" placeholder="请输入关键字进行搜索" v-model="search" >
    <img src="../assets/icon-chaz.png.png" alt="">
  </div>
  <div>
    <v-zb v-for="(o,i) of zbList" :key="i" :obj="o"></v-zb>
  </div>
</div>
</template>
<script>
import zbCon from '@/components/zbContent'
export default {
    data () {
      return {
        search:'',
        zbList:[]
      }
    },
    methods: {

    },
    components:{
        'v-zb':zbCon
    },
}
</script>
<style lang="less" scoped>
.bid {
  .b-search {
    height: 153px;
    width: 100%;
    padding: 28px 34px;
    background-color: #f5f5f5;
    box-sizing: border-box; 
    position: relative;
    input {
      outline:  none;
      height: 97px;
      line-height: 97px;
      width: 100%;
      border: 0;
      padding: 0 65px 0 25px;
      font-size: 28px;
      box-sizing: border-box;
    }
    img {
      position: absolute;
      right: 54px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>