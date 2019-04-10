<!-- 模型： DOM 结构 -->
<template>
    <div class="user">
        <top-back :title='"个人信息"'></top-back>
        <div class="tx-box">
            <img src="../../assets/icon-tpux.png.png"/>
            <span>{{data.nickname}}</span>
        </div>
        <section>
            <ul>
                <li>
                    <span>昵称</span>
                    <div>
                        <input type="text" placeholder="请填写昵称" v-model="data.nickname"/>
                    </div>
                </li>
                <li>
                    <span>姓名</span>
                    <div>
                        <input type="text" placeholder="请填写真实姓名" v-model="data.name"/>
                    </div>
                </li>
                <li>
                    <span>性别</span>
                    <div class="sex-box">
                        <p class="sex" :class="[o.class,i==sexNum ?'active': '']" v-for="(o,i) of sexList" :key="i" @click="selectSex(i)">{{o.name}}</p>
                    </div>
                </li>
                <li>
                    <span>公司</span>
                    <div>
                        <input type="text" placeholder="请填写您的公司名称" v-model="data.company"/>
                    </div>
                </li>
                <li>
                    <span>职务</span>
                    <div>
                        <input type="text" placeholder="请填写您担任的职务" v-model="data.title"/>
                    </div>
                </li>
            </ul>
        </section>
        <div class="u-btn" @click="changeNew" >  
            确定
        </div>
         <div class="toast"  v-if="isShow" >
           {{hint}}
        </div>
    </div>
</template>
<script>
import topBack from '@/components/topback'
export default {
    name: 'user', // 结构名称
    data() {
        return {
            // 数据模型
            hint:'',
            isShow:false,
            sexList:[
                {
                    name:'女',
                    class:'girl'
                },
                {
                    name:'男',
                    class:'boy'
                },
            ],
            sexNum:2,
            data:{
                nickname:'',
                name:'',
                sex:0,
                company:'',
                title:'',
                img:''
            }
        }
    },
    watch: {
        // 监控集合
    },
    props: {
        // 集成父级参数
    },
    components: {
       'top-back':topBack,
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
        this.gainNew()
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
        selectSex(i){
            this.sexNum=i;
            this.data.sex=i;
        },
        gainNew() {
             let that=this;
               this.$http({
                   method:'post',
                   url: '/userCenter/refreshUserInfo',
                   data:{}
               }).then(function(res){
                   that.data.nickname = res.data.data.nikeName
                   that.data.name = res.data.data.userName ? res.data.data.userName : ''
                   that.data.company = res.data.data.inCompany ? res.data.data.inCompany : ''
                   that.data.title = res.data.data.position ? res.data.data.position : ''
                   that.data.sex = res.data.data.sex
                   that.sexNum = res.data.data.sex
               })
         },
         changeNew() {
              let that=this;
               this.$http({
                   method:'post',
                   url: '/userCenter/updateUserInfo',
                   data:{
                      nikeName:that.data.nickname,
                      sex:that.data.sex,
                      inCompany:that.data.company,
                      position:that.data.title,
                      userName:that.data.name
                   }
               }).then(function(res){
                  if(res.data.code == 1) {
                      that.hint = '信息更新成功',
                      that.isShow = true
                      localStorage.setItem('xtoken',res.data.data.xtoken)
                      setTimeout(() => {
                        that.isShow = false;
                      },1500);
                      that.$router.push('/centre')
                  }
               })
         }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style  lang='less' scoped>
.arrow.van-icon{
    font-size: 42px;
    color: #666;
}
input::placeholder{
    color: #ddd;
}
.user{
    background: #fff;
    min-height: 100vh;
}
.tx-box{
    padding-top: 147px;
    text-align: center;
    margin-bottom: 82px;
    img{
        width: 139px;
        height: 139px;
        display: block;
        margin: 0 auto 20px;
    }
    span{
        font-size: 28px;
    }
}
section{
    padding-left: 34px;
    li{
        border-top: 1PX solid #F2F2F2;
        padding-right: 38px;
        height: 104px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .sex-box{
            flex-direction: row-reverse;
        }
        div{
            display: flex;
            align-items: center;
            .sex{
                padding-left: 55px;
                height: 38px;
                line-height: 1
            }
            .boy{
                background: url(../../assets/icon-nan1.png) no-repeat;
                background-size: auto 100%;
                margin-right: 80px
            }
            .boy.active{
                background-image: url(../../assets/icon-nan2.png);
            }
            .girl.active{
                background-image: url(../../assets/icon-nv2.png);
            }
            .girl{
                background: url(../../assets/icon-nv1.png) no-repeat;
                background-size: auto 100%;
            }
        }
        span{
            letter-spacing:64px;
            color: #333;
            font-weight: bold;
        }
        input{
            border: none;
            outline: none;
            text-align: right;
        }

    }
    li:last-child{
        border-bottom: 1PX solid #f2f2f2;
    }
}
.u-btn {
   width: 77%;
   margin: 100px auto 0;
   background-color: #FE6603;
   height: 88px;
   border-radius: 44px;
   line-height: 88px;
   text-align: center;
   color:#fff;
}
</style>
