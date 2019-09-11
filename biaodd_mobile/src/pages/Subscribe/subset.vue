<!-- 模型： DOM 结构 -->
<template>
    <div class="subset">
        <top-back :title=" this.iArea ? '项目地区':'我的订阅'" @topArea='closeArea' ></top-back>
        <!-- 地区 -->
        <div class="set-public" >
          <h4>选择业务所在地</h4>
          <div class="set-areas" >
             <div class="block" v-for="(el,i) in areaArr" :key="i" @click.stop="delArea(el,i)" >
               {{el.name}}
               <van-icon name="cross" />
             </div>
          </div>
          <div class="areas-btn"  @click="addArea" >
             + 添加地区
          </div>
        </div>

        <!-- 关键字 -->
         <div class="set-public" >
          <h4>添加公告关键词 ({{this.cruxs.length}}/5)</h4>
          <div class="crux" >
            <span style="color:red;" >*</span>填写更多公告相关的关键词，项目更全面哦！最多可添加5个关键词
          </div>
          <div class="set-areas" v-show="this.cruxs.length != 0 " >
             <div class="block" v-for="(el,i) in cruxs" :key="i" @click="delstate(el)" >
                {{el}}
               <van-icon name="cross" />
             </div>
          </div>
          <div class="crux-put" >
            <van-icon name="search" />
            <input type="text" placeholder="请输入公告关键词" v-model="incurx" >
            <div class="crux-btn" @click.stop="pushCrux" >
              + 添加
            </div>
          </div>
          <div class="crux-hint" >
             <div class="c-title"  style="marginRight:5px;" > 
               推荐关键词：
             </div>
             <div class="c-title c-black" @click="recommend(el)" v-for="(el,i) in hot" :key="i"  >
               {{el}}
             </div>
          </div>
        </div>

        <!-- 资质 -->
        <div class="set-public" >
          <h4>添加资质 ({{this.apiArr.length}}/3)</h4>
          <div class="crux" >
            <span style="color:red;" >*</span>添加资质信息，项目更精准哦！最多可添加3个资质
          </div>
          <div class="set-api" >
             <div class="a-block" v-for="(el,i) in apiArr" :key="i" >
               <span>{{el.name}}</span>
               <van-icon name="cross" @click="delApi(i)"  />
             </div>
          </div>
          <div class="areas-btn" @click="addApi" :class="this.apiArr.length == 0 ? 'btn-top': ''" >
             + 添加资质
          </div>
        </div>

        <div class="sub-push" >
          <h3>开启推送</h3>
          <van-switch
            v-model="checked"
            active-color="#FE6603"
            inactive-color="#ccc"
             size="28px"
          />
        </div>

        <div class="b-hint" >
          <div>
              <span style="color:red;" >*</span>温馨提示
          </div>
          <div>
            招标订阅仅展示近7天的招标信息，如需查看更多招标信息请前往招标模块进行搜索！
          </div>
        </div>

        <div class="bottom-btn"  @click.stop="subscribe" >
          开启订阅
        </div>

         <v-apt :bizType="1" :subset='1' :arr='[]' @setSub='aptSure' v-if="iSub"></v-apt>
         <sub-Area v-if="iArea" @subcity='aArea'  ></sub-Area>

        <div  class="sub-hint"  v-show="iShow" >
           {{msg}}
        </div>
    </div>
</template>
<script>
import aptitude from '@/components/aptitude'
import subArea from '@/pages/Subscribe/subArea'
export default {
    name: 'subset', // 结构名称
    data() {
        return {
            // 数据模型a
          iShow:false,
          checked:true,  // 是否推送开关
          cruxs:[], // 关键字数据 
          hot:[], // 热词
          incurx:'', 
          msg:'',
          iSub:false,
          apiArr:[], // 资质数组
          iArea:false,
          areaArr:[], //地区数据
          areaCode:[],  //地区code
          same:[],
          Nosame:[],
          Nosa:false,
          areaStr:[]
        }
    },
    watch: {
        // 监控集合
    },
    props: {
        // 集成父级参数
    },
    components: {
      'v-apt':aptitude,
      'sub-Area':subArea,
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
        sessionStorage.removeItem('subapi')
        this.ajax()
        this.gainCode()
        
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
        sessionStorage.removeItem('subapi')
    },
    destroyed() {
        // console.group('销毁完成状态===============》destroyed');
    },
    methods: {
        // 方法 集合
      ajax(){
        //招标
        let that=this;
        this.$http({
            method:'post',
            url: '/foundation//hot/words',
            data:{
              type:'zhaobiao',
              limit:10
            }
        }).then(function(res){
           if(res.data.code == 1) {
             that.hot = res.data.data
           }
        })
      },
      gainCode() {
        let that=this;
           this.$http({
                method:'post',
                url: '/subscribe/gain/condition',
                data: {
                  pkid:null
                }
            }).then(function(res){
             if(res.data.code == 1) {
               if(res.data.data.regions == null) {
                 return 
               } 
               that.areaArr = JSON.parse(localStorage.getItem('subarea'))
               that.areaCode = res.data.data.regions.split(';')
               that.cruxs = res.data.data.keywords.split(',')
               that.areaStr =  res.data.data.regionName.split(';')
               that.checked =  res.data.data.isPush ==1 ? true : false
               let arr = []
               if(res.data.data.qualCode != '') {
                  let arr1 = res.data.data.qualCode.split(',')
                  let arr2 = res.data.data.qualName.split(',')
                  for (var i = 0; i<arr1.length;i++ ) {
                    var obj =  {}
                    obj.name = arr2[i]
                    obj.code = arr1[i]
                    arr.push(obj)
                  }
                  that.apiArr = arr
                  sessionStorage.setItem('subapi',JSON.stringify(arr))
               }
            
             }
            })
        },
      subscribe() {
          let that=this;
          if(that.areaCode.length == 0) {
            this.msg = '请选择业务所在地'
            this.openTime()
            return
          }
          if(that.cruxs.length == 0) {
            this.msg = '请添加关键词'
            this.openTime()
            return
          }
          let areaName = that.areaStr.join(';')   //省份中文名
          let codeArr = that.areaCode.join(';')   // 省份code
          let cruxArr = that.cruxs.join(',')   // 关键字
          let apiArr = JSON.parse(sessionStorage.getItem('subapi')) ? JSON.parse(sessionStorage.getItem('subapi')) : []
          let apiCode = []
          let apiName =[]
          let apiStr = ''
          let apiSn = ''
          if(apiArr.length > 0) {
            for (var i =0; i < apiArr.length;i++ ) {
              apiCode.push(apiArr[i].code)
              apiName.push(apiArr[i].name)
            }
            apiStr = apiCode.join(',')
            apiSn = apiName.join(',')
          }
          this.$http({
              method:'post',
              url: '/subscribe/save/condition',
              data:{
                regionName:areaName,  // 所在地得展示数据
                regions:codeArr,
                keywords:cruxArr,
                qualCode:apiStr,
                qualName:apiSn,
                isPush:that.checked ? '1' : 0,
                subType:'zhaobiao'
              }
          }).then(function(res){
             if(res.data.code == 1) {
               that.$router.push({path:'/subscribe',query:{form:1}})
             }
          })
      },
        pushCrux() {
          if(this.cruxs.length >= 5) {
            this.msg = '最多可添加5个关键词'
            this.openTime()
            return
          }
          if(this.incurx ==  '') {
            this.msg = '请输入公告关键字'
            this.openTime()
            return
          }
          if(this.cruxs.indexOf(this.incurx) >= 0) {
            this.msg = '请勿重复输入相同关键字'
            this.openTime()
            return
          }
          this.cruxs.push(this.incurx)
          this.incurx = ''
        },
        recommend(el) {
          if(this.cruxs.length >= 5) {
            this.msg = '最多可添加5个关键词'
            this.openTime()
            return
          }
          if(this.cruxs.indexOf(el) >= 0) {
            this.msg = '请勿重复输入相同关键字'
            this.openTime()
            return
          }
          this.cruxs.push(el)
        },
        openTime() {
           this.iShow = true
            setTimeout(() => {
              this.iShow = false
            }, 1500);
        },
        delstate(el) {
          var index = this.cruxs.indexOf(el)
          this.cruxs.splice(index, 1)
        },
        addApi() {
          if(this.apiArr.length >= 3) {
            this.msg = '最多可添加3条资质'
            this.openTime()
            return
          }
          this.iSub = true
        },
        aptSure(option) {
          if(option.msg == 1) {
            this.iSub = false
            return 
          }
          this.apiArr = option.list
          sessionStorage.setItem('subapi',JSON.stringify(this.apiArr))
          this.iSub = false
        },
        delApi(i) {
          this.apiArr.splice(i,1)
          sessionStorage.removeItem('subapi')
          sessionStorage.setItem('subapi',JSON.stringify(this.apiArr))
        },
        addArea() {
          this.iArea = true
        },
        closeArea() {
           this.iArea = false
        },
        aArea(el) {
          this.iArea = false
          this.Nosa = false
          
          if(this.areaArr.length == 0) {
            if(el.code) {
              for (let o of el.list) { 
                    this.areaArr.push(o)
                 }
            } else {
              this.areaArr = el.list
            }
            if(el.del == 1 ) {
              this.areaCode.push(el.source)
            } else {
               this.areaCode.push(el.code)
            }
            this.bination()
            return 
          }
     
            for (let i of this.areaCode) {
              if(i.indexOf(el.source) >= 0) {
                  this.Nosa = true
                  let str = i
                  // if(i == el.source ) {
                  //   return 
                  // }
                  let arr = str.split('||')
                   let str1 = ''
                   let arr1 = []
                  if(arr[1]) {
                    str1 = arr[1]  
                    arr1 = str1.split(',')
                  } else {
                    str1 = arr[0]
                  } 
                  // arr1 之前已经保存code 里面得数据
                   if(el.del == 1 ) { 
                      this.array_diff(this.areaArr,arr1)
                      this.areaCode.splice(this.areaCode.indexOf(i),1)
                      this.areaCode.push(el.source)
                      for (let o of el.list) { 
                       this.areaArr.push(o)
                      }
                   } else {
                      // arr2 重新选择之后得code
                      let arr2 = el.code.split('||')
                      // str2 市级code
                      let str2 = arr2[1]
                      // arr3 市级code 数组
                      let arr3 = str2.split(',')

                      let arr4 =[]
                      if(arr1.length > 0) {
                        for (var h = 0; h < arr1.length; h++) {
                          for (var j = 0; j < arr3.length; j++) {
                              if(arr1[h] ==  arr3[j] ) {
                                this.Nosame.push(arr1[h])   // 相同数据
                              } 
                          }
                        }
                        arr4 = arr1.concat(arr3)
                      } else {
                         for (var f = 0; f < arr3.length; f++) {
                              arr4.push(arr3[f])
                         }
                      }
                      let arr5 = new Set(arr4)
                      this.array_diff(arr1,this.Nosame)
                      this.areaCode.splice(this.areaCode.indexOf(i),1)
                      let str5 = el.source + "||" + [...arr5].join(',')
                      this.areaCode.push(str5)
                      let size = 0
                       let p = ''
                      if( this.Nosame.length >=0 ) {
                        p = arr1[arr1.length - 1]
                          for (var t = 0; t < this.areaArr.length; t++) { 
                            if(p == this.areaArr[t].code ) {
                              size = t
                              break
                            }
                          }
                          for (var l = 0; l < el.list.length; l++) {
                            for (var k = 0; k < this.Nosame.length; k++) {
                               if(this.Nosame[k] ==  el.list[l].code) {
                                 el.list.splice(l, 1);
                                 k = k-1
                               }
                            }
                         }
                      }
                       for (var d = 0; d < this.areaArr.length; d++) {
                         if( this.areaArr[d].code == el.source) {
                           this.areaArr.splice(d,1)
                           break
                         }
                       }
                      
                      for (let o of el.list) { 
                          this.areaArr.splice(size,0,o)
                          size++
                      }
                      this.Nosame = []
                   }
                 this.bination()  
                 return
              } 
            }
             if(!this.Nosa ) {
                 for (let o of el.list) { 
                    this.areaArr.push(o)
                 }
                 if(el.del == 1 ) {
                    this.areaCode.push(el.source)
                 } else {
                    this.areaCode.push(el.code)
                 }
                 this.bination()
                 return
              }
        },
        // 两个数组去重
        array_diff(a, b,c) { 
          for (var i = 0; i < b.length; i++) {
            for (var j = 0; j < a.length; j++) {
              if(a[j].code) {
                 if (a[j].code == b[i]) {
                 a.splice(j, 1);
                 j = j - 1;
                }
              } else {
                  if (a[j] == b[i]) {
                   a.splice(j, 1);
                   j = j - 1;
                  }
              }
             
            }
          }
          return a;
        },
        delArea(el,i) {
           this.areaArr.splice(i,1)
           for (var o = 0; o < this.areaCode.length; o++) {
             if(this.areaCode[o].indexOf(el.code)>= 0 ) {
                let st = this.areaCode[o]
                let ar = st.split('||')
                if(ar[0] == el.code) {
                  this.areaCode.splice(o,1)
                  this.bination()
                  return 
                } else {
                  let ar1 = ar[1].split(",")
                   for (var s = 0; s < ar1.length; s++) {
                     if(ar1[s] == el.code) {
                       ar1.splice(s,1)
                       let st2 = ar[0] + "||" + ar1.join(',')
                        this.areaCode.splice(o,1)
                        this.areaCode.push(st2)
                        this.bination()
                        return
                     }
                   }
                }
                
             }
               
           }
          
        },
        bination() {
              this.areaStr = []
              let Aarr =  []
              let allArea = JSON.parse(localStorage.getItem('filter')).area
              let first = ''
              for (let i =0;i<this.areaCode.length;i++) {
                let sarr =this.areaCode[i].split('||')
                  for (let j =0;j<allArea.length;j++) {
                    if(allArea[j].code == sarr[0]) {
                      first = allArea[j].name
                    }
                    if(sarr.length == 2 ) {
                      let d = allArea[j].data
                      let sarr1 = sarr[1].split(',')
                      for (let u =0;u<sarr1.length;u++) { 
                        for (let f =0;f<d.length;f++) { 
                            if(d[f].code == sarr1[u]) {
                              Aarr.push(d[f].name)
                              break
                            }
                        }
                      }
                    } else {
                      break
                    }
                  }
                let str = first + "||" + Aarr.join(',')
                Aarr = []
                this.areaStr.push(str)
              }
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
.subset {
  padding-top: 90px;
  background:rgba(245,245,245,1);
  min-height: 100vh;
  box-sizing: border-box;
  .set-public {
    background-color: #fff;
    padding: 38px 32px 48px;
    box-sizing: border-box;
    margin-bottom: 16px;
    h4 {
      font-size: 36px;
      color: #333;
    }
    // 地区
    .set-areas {
      display: flex;
      flex-wrap:wrap;
      margin-top: 58px;
      .block {
        min-width: 146px;
        height: 64px;
        font-size: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        background:rgba(245,245,245,1);
        border-radius:10px;
        margin-bottom: 30px;
        margin-right: 30px;
        padding: 0 30px;
        box-sizing: border-box;
      }
    }
    .areas-btn {
       width: 321px;
       height: 84px;
       border: 1PX solid #FE6603;
       border-radius:10px;
       margin: 36px auto 0;
       line-height: 84px;
       text-align: center;
       font-size: 36px;
       color: #FE6603;
    }
    .btn-top {
      margin-top: 78px !important;
    }
    // 关键字
    .crux {
      font-size: 22px;
      color:#999;
      margin-top: 21px;
      margin-bottom: 35px;
    }
    .crux-put {
      width: 100%;
      height: 92px;
      border: 1PX solid #FE6603;
      border-radius:10px;
      box-sizing: border-box;
      margin-top: 58px;
      display: flex;
      align-items: center;
      .crux-btn {
        width: 168px;
        background-color: #FE6603;
        line-height: 92px;
        text-align: center;
        color: #fff;
        font-size: 32px;
        border-radius:10px
      }
      i {
        padding: 0 10px;
      }
      input {
        width: 73%;
        height: 100%;
        background:none;  
        outline:none;  
        border:none;
      }
    }
    .crux-hint {
        display: flex;
        flex-wrap:wrap;
        .c-title {
          font-size: 24px;
          color:#333;
          line-height: 56px;
          margin-right: 30px;
          margin-top: 24px;
        }
        .c-black {
          padding: 0 15px;
          border-radius:10px;
          background-color: #F2F2F2;
        }
      }
      .a-block {
        height: 64px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding:0 20px;
        font-size:28px;
        color: #333;
        width: 100%;
        background-color: #F5F5F5;
        margin-bottom: 30px;
        box-sizing: border-box;
        span{
             display: inline-block;
             max-width: 650px;
             overflow: hidden;
             text-overflow:ellipsis;
             white-space:nowrap;
         }
      }
  }
  .sub-push {
    padding: 0 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 110px;
    background-color: #fff;
    h3 {
      font-size: 36px;
    }
  }
  .b-hint {
    padding: 35px 32px 44px;
    div {
     font-size: 28px;
     color: #999;
     line-height:48px;
    }
  }
  .bottom-btn {
    width: 100%;
    height: 100px;
    background-color: #FE6603;
    color: #fff;
    font-size: 36px;
    font-weight: 550;
    line-height: 100px;
    text-align: center;
  }
  .sub-hint {
    position: fixed;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    left: 50%;
    transform: translateX(-50%);
    top: 50%;
    padding: 10px 20px;
    border-radius: 8px;
  }
}
</style>
