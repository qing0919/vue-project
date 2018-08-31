//入口文件
import Vue from 'vue'
//配置vuex的步骤
// 3.1、装包
// npm i vuex -S
// 3.2、导入包
import Vuex from 'vuex'
// 3.3、注册 vuex 到 vue 中
Vue.use(Vuex)

//1.1导入路由的包
import VueRouter from 'vue-router'

//1.2安装路由
Vue.use(VueRouter)

//导入格式化时间的插件
import moment from 'moment'
//定义全局的过滤器来格式化时间
Vue.filter('dateFormat',function(dateStr,pattern = "YYYY-MM-DD HH:mm:ss"){
//moment() 直接调用得到的是当前时间，要对给定时间进行格式化，要在moment中传递参数
//  将dataStr按照pattern格式来进行格式化时间
  return moment(dateStr).format(pattern)
})

//2.1导入vue-resource
import VueResource from 'vue-resource'
//2.2安装vue-resource
Vue.use(VueResource)
//全局配置一下请求的根路径
Vue.http.options.root='http://vue.studyit.io'
//全局设置 post 时候表单数据格式组织形式，application/x-www-form-urlencoded
Vue.http.options.emulateJSON=true

import app from './app.vue'
//按需导入mint-ui中的组件
//import {Header,Swipe, SwipeItem,Button,Lazyload} from 'mint-ui'
//Vue.component(Header.name,Header)
//Vue.component(Swipe.name, Swipe)
//Vue.component(SwipeItem.name, SwipeItem)
//Vue.component(Button.name, Button)
//Vue.use(Lazyload)
//要使用懒加载的话，则不能按需导入组件了，必须全部导入,否则懒加载的小图标出不来
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

import VuePreview from 'vue-preview'
Vue.use(VuePreview)

//1.3 导入自己的router.js路由模块
import router from './router'
//导入mui的样式
import './lib/mui/css/mui.min.css'
//导入mui的图标样式
import './lib/mui/css/icons-extra.css'

// 每次刚进入网站，肯定会调用 main.js ，在刚调用的时候，先从本地存储中把购物车的数据读出来放到 store 中
var car=JSON.parse(localStorage.getItem('car') || '[]')

// 3.4 new Vuex.Store() 实例，得到一个数据仓储对象
var store=new Vuex.Store({
    state:{
    //  如果在组件中想要访问store中的数据，只能通过 this.$store.state.变量名 来访问
    //  将购物车中的商品的数据，用一个数组存储起来，在 car 数组中，存储一些商品的对象，
    //    暂时可以将商品对象设计成这个样子
    //    {id:商品的id,count:要购买的数量，price:商品的单价，selected:false}
        car:car
    },
    mutations:{
        addToCar(state,goodsinfo){
        // 点击加入购物车，把商品信息保存到 store 中的 car 上；
        //  1、如果购物车之中，之前就已经有这个对应的商品了，那么只需更新数量；
        //  2、如果购物车之前没有这个商品，则直接把商品信息 push 到 car 中即可；
        //    不需要用forEach遍历整个car 数组，如果找到 car 中有对应的信息即停止

        //    假设在购物车中没有找到对应的商品
            var flag=false;
            state.car.some(item => {
                if(item.id===goodsinfo.id){
                    item.count += parseInt(goodsinfo.count);
                    flag=true;
                //    用 return true 来终止后续的循环
                    return true;
                }
            })

            // 如果最终循环完毕，得到的 flag 还是 false，则把商品数据直接 push 到购物车中
            if(!flag){
               state.car.push(goodsinfo);
            }
        //    当更新 car 之后，把 car 数组保存到本地的 localStorage 中
            localStorage.setItem('car',JSON.stringify(state.car));
        },
        updateGoodsInfo(state,goodsinfo){
        //    修改购物车中商品的数量值
            state.car.some(item => {
                if(item.id==goodsinfo.id){
                    item.count=parseInt(goodsinfo.count);
                    return true;
                }
            })
        //  当修改完商品的数量，把最新的购物车数据保存到本地存储中
            localStorage.setItem('car',JSON.stringify(state.car));
        },
        removeFromCar(state,id){
        //    根据 Id 从 store 中的购物车中删除对应的那条商品数据
            state.car.some((item,i) => {
                if(item.id==id){
                    state.car.splice(i,1);
                    return true;
                }
            })
        //   将删除完毕后的最新的购物车数据同步到本地存储中
            localStorage.setItem('car',JSON.stringify(state.car));
        },
        updateGoodsSelected(state,info){
            state.car.some(item => {
                if(item.id==info.id){
                    item.selected=info.selected;
                    return true;
                }
            })
            //把最新的所有购物车商品的状态保存到 store 中去
            localStorage.setItem('car',JSON.stringify(state.car));
        }
    },
    getters:{
    //    注意：这里的 getters 只负责对外提供数据，不负责修改数据，如果想要修改 state 中的数据，
    //    请去找 mutations
    //    optCount:function(state){
    //        return '当前最新的count值是：'+state.count
    //    }
    //    经过回顾对比，发现 getters 中的方法，和组件中的过滤器比较类似，因为过滤器和 getters 都没有
    //    修改原数据，都是把原数据做了一层包装，提供给了调用者；
    //    其次，getters 也和 computed 比较像，只要 state 中的数据发生变化了，如果 getters 正好也引用了
    //    这个数据，那么就会立即触发 getters 的重新求值；

    //    相当于计算属性，也相当于 filters
        getAllCount(state){
            var c=0;
            state.car.forEach(item => {
                c+=item.count;
            })
            return c;
        },
        getGoodsCount(state){
            var o={};
            state.car.forEach(item => {
                o[item.id]=item.count;
            })
            return o;
        },
        getGoodsSelected(state){
            var o={};
            state.car.forEach(item => {
                o[item.id]=item.selected;
            })
            return o;
        },
        getGoodsCountAndAmount(state){
            var o={
                count:0,   //勾选的数量
                amount:0   //勾选的总价
            };
            state.car.forEach(item => {
                if(item.selected){
                    o.count+=item.count;
                    o.amount+=item.price * item.count;
                }
            })
            return o;
        }
    }
})
var vm=new Vue({
  el:'#app',
  render:c => c(app),
//  1.4 挂载路由对象到我们的vm实例上
  router:router,
//  3.5 将 store 挂载到 vm 实例中
//  只要挂载到了vm上，任何组件都能使用 store 来存取数据
  store:store
})