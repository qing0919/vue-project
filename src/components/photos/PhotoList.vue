<template>
    <div>
        <!-- 顶部滑动条区域 -->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item',item.id==0 ? 'mui-active' : '']" v-for="item in cates"
                       :key="item.id" @tap="getPhotoListByCateId(0)">
                        {{item.title}}
                    </a>
                </div>
            </div>

        </div>

        <!-- 图片列表区域 -->
        <ul class="photo-list">
            <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/'+item.id" tag="li">
                <img v-lazy="item.img_url">
                <div class="info">
                    <h1 class="info-title">{{item.title}}</h1>
                    <div class="info-body">{{item.zhaiyao}}</div>
                </div>
            </router-link>
        </ul>
    </div>
</template>

<script>
    //1、导入mui的js文件
    import mui from '../../lib/mui/js/mui.min.js'

    export default{
        data(){
            return {
                cates:[    //所有分类的列表数组
                    {id:0,title:'全部'},
                    {id:1,title:'摄影器材'},
                    {id:2,title:'明星写真'},
                    {id:3,title:'家居生活'},
                    {id:4,title:'全民健身'},
                    {id:5,title:'深夜阅读'},
                    {id:6,title:'时尚舞蹈'}
                ],
                list:[       //图片列表的数组
                    {id:1,img_url:"https://raw.githubusercontent.com/it-shell/helloword/master/imges/muwu.jpg",
                     title:'喜欢张哲瀚的笑容',zhaiyao:'张哲瀚是一个很努力的小哥哥呀，运动全能，而且被别有毅力，篮球打的极好，' +
                    '为人低调，真的是一个非常正能量的偶像了！！！'},
                    {id:2,img_url:"https://raw.githubusercontent.com/it-shell/helloword/master/imges/shuijiao.jpg",
                     title:'生活应该怎样',zhaiyao:'别再应该努力的时候选择安逸，趁年轻的时候就应该去追求梦想。想做的事情要尽早去做，' +
                    '否则老拖着，很有可能一辈子都不会去做了。人不能沦为赚钱的机器，努力工作的同时，也应该好好的享受生活！！！'},
                    {id:3,img_url:"https://raw.githubusercontent.com/it-shell/helloword/master/imges/yuantiao.jpg",
                     title:'关于梦想',zhaiyao:'梦想嘛，总是要有的呀，万一实现了呢？不管什么事情，只要我们在做，就应该尽自己的最大' +
                    '努力去做到最好，这样才不辜负自己。生活中要时常反省自己，别总是抱怨，要积极向上，充满阳光。老天对待每一个人都是公平的，' +
                    '越是努力的人，越会被上天眷顾。记住，机会总是留给有准备的人。加油，做最好的自己！！！'}
                ]
            };
        },
        created(){
//          this.getAllCategory();
//          默认进入页面，就主动请求所有图片列表的数据
//          this.getPhotoListByCateId(0)
        },
        mounted(){  //当组件中的DOM结构被渲染好，并放到页面中后，会执行这个钩子函数
//        要操作DOM元素，最好在mounted中操作，因为这时候的DOM元素是最新的
            //    2、初始化滑动控件
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        },
        methods:{
            getAllCategory(){
                //获取所有的图片分类
                this.$http.get("api/getimgcategory").then(result => {
                    if(result.body.status===0){
                        //手动拼接出一个最完美的列表
                        result.body.message.unshift({title:'全部',id:0});
                        this.cates=result.body.message;
                    }
                });
            }
//            getPhotoListByCateId(cateId){
//                //根据分类Id,获取图片列表
//                this.$http.get('api/getimages/'+cateId).then(result => {
//                    if(result.body.status===0){
//                        this.list=result.body.message;
//                    }
//                });
//            }
        }
    };
</script>

<style lang="scss" scoped>
    *{
        /* chrome 为了提高页面的滑动流畅度而新折腾出来的一个东西 */
        /* touch-action 属性用于指定某个给定的区域是否允许用户操作，以及如何响应用户操作，
            （比如浏览器自带的滑动、缩放等），pan-y 表示启用单指垂直平移手势。可以与 pan-x,
            pan-left,pan-right和/或者pinch-zoom 组合使用*/
        touch-action:pan-y;
    }

    .photo-list{
        list-style:none;
        margin:0;
        padding:10px;
        padding-bottom:0;
        li{
            background-color:#ccc;
            text-align:center;
            margin-bottom:10px;
            box-shadow:0 0 10px #999;
            position:relative;
            img{
                width:100%;
                vertical-align: middle;
            }
            img[lazy=loading] {
                width: 40px;
                height: 300px;
                margin: auto;
            }
            .info{
                color:#fff;
                text-align:left;
                position:absolute;
                bottom:0;
                background-color:rgba(0,0,0,0.4);
                max-height:120px;
                .info-title{
                    font-size: 14px;
                }
                .info-body{
                    font-size: 13px;
                }
            }
        }
    }
</style>