<template>
    <div>
        <!--轮播图-->
        <!--用v-for循环渲染轮播图-->
            <swiper-box :lunbotuList="lunbotuList" :isfull="true"></swiper-box>
        <!--<mt-swipe :auto="4000">-->
            <!--<mt-swipe-item>1</mt-swipe-item>-->
            <!--<mt-swipe-item>2</mt-swipe-item>-->
            <!--<mt-swipe-item>3</mt-swipe-item>-->
        <!--</mt-swipe>-->

        <!--九宫格 到 六宫格-->
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newslist">
                    <!--<span class="mui-icon mui-icon-home"></span>-->
                    <img src="../../images/news.jpg" alt="">
                    <div class="mui-media-body">新闻资讯</div></router-link></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photolist">
                    <img src="../../images/share.jpg" alt="">
                    <div class="mui-media-body">图片分享</div></router-link></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodlist">
                    <img src="../../images/shopping.jpg" alt="">
                    <div class="mui-media-body">商品购买</div></router-link></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../images/say.jpg" alt="">
                    <div class="mui-media-body">留言反馈</div></a></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../images/movie.png" alt="">
                    <div class="mui-media-body">视频专区</div></a></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../images/contact.jpg" alt="">
                    <div class="mui-media-body">联系我们</div></a></li>
            </ul>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
//    导入轮播图组件
    import swiper from '../subcomponents/swiper.vue'
    export default{
        data(){
            return {
                lunbotuList:[
                    {img:"https://raw.githubusercontent.com/qing0919/camera/master/zzh7.jpg",title:"zzh1"},
                    {img:"https://raw.githubusercontent.com/qing0919/camera/master/zzh8.jpg",title:"zzh2"},
                    {img:"https://raw.githubusercontent.com/qing0919/camera/master/zzh11.jpg",title:"zzh3"}
                ]
            };
        },
//        created(){
//            this.getLunbotu();
//        },
        methods:{
            getLunbotu(){   //获取轮播图数据的方法
                this.$http.get('http://vue/api/getlunbo').then(result => {
//                    所有数据都在body中放置的
//                    console.log(result.body)
                    if(result.body.status===0){
//                     成功获取数据
                        this.lunbotuList=result.body.message;
                    }else{
//                        获取数据失败
//                        弹框提示用户加载轮播图失败
                        Toast("加载轮播图失败");
                    }
                })
            }
        },
        components:{
            "swiper-box":swiper
        }
    }
</script>

<style lang="scss" scoped>
    .mui-grid-view.mui-grid-9{
        background-color: #fff;

        .mui-table-view-cell{
            border:0;
        }
        img{
            width:75px;
            height:75px;
        }
    }
</style>