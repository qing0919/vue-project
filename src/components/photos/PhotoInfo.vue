<template>
    <div class="photoinfo-container">
        <h3 class="title">{{photoinfo.title}}</h3>
        <div class="subtitle">
            <span>发表时间：{{photoinfo.add_time | dateFormat}}</span>
            <span>点击：{{photoinfo.click}}次</span>
        </div>
        <hr>

        <!-- 缩略图区域-->
        <!--<img class="preview-img" v-for="(item,index) in list" :src="item.src" height="100"-->
               <!--:key="item.src">-->
        <vue-preview :slides="list" @close="handleClose"></vue-preview>
        <!-- 图片内容区域 -->
        <div class="content" v-html="photoinfo.content"></div>
        <!-- 放置现成的评论子组件 -->
        <!-- 这里涉及到父组件向子组件传值，父组件要把id传给子组件 -->
        <cmt-box :id="id"></cmt-box>
    </div>
</template>

<script>
  // 1、导入评论子组件
    import comment from '../subcomponents/comment.vue'
    export default{
        data(){
            return {
                id:this.$route.params.id ,   //从路由中获取到的图片Id
                photoinfo:{     //图片详情
                    title:'不疯魔，不成活',
                    add_time:new Date(),
                    click:108,
                    content:'<p style="color:#000;">人不是从娘胎里出来就一成不变的，相反，生活会逼迫他一次又一次脱胎换骨；' +
                    '爱情首先是一种本能，要么生下来就会，要么永远都不会；' +
                    '任何年龄段的女人都有她在那个年龄段所呈现出来的无法复刻的美，她因年龄而减损的，' +
                    '又因性格而弥补回来，更因勤劳而赢得了更多；</p>'
                },
                list:[     //缩略图的数组
                    {src:"https://raw.githubusercontent.com/qing0919/camera/master/zzh1.jpg",w:400,h:600,
                     msrc:"https://raw.githubusercontent.com/qing0919/camera/master/zzh1.jpg"},
                    {src:"https://raw.githubusercontent.com/qing0919/camera/master/zzh2.jpg",w:400,h:600,
                        msrc:"https://raw.githubusercontent.com/qing0919/camera/master/zzh2.jpg"},
                    {src:"https://raw.githubusercontent.com/qing0919/camera/master/zzh3.jpg",w:400,h:600,
                        msrc:"https://raw.githubusercontent.com/qing0919/camera/master/zzh3.jpg"},
                    {src:"https://raw.githubusercontent.com/qing0919/camera/master/zzh4.jpg",w:400,h:600,
                        msrc:"https://raw.githubusercontent.com/qing0919/camera/master/zzh4.jpg"},
                    {src:"https://raw.githubusercontent.com/qing0919/camera/master/zzh5.jpg",w:400,h:600,
                        msrc:"https://raw.githubusercontent.com/qing0919/camera/master/zzh5.jpg"},
                    {src:"https://raw.githubusercontent.com/qing0919/camera/master/zzh6.jpg",w:400,h:600,
                        msrc:"https://raw.githubusercontent.com/qing0919/camera/master/zzh6.jpg"}
                ]
            };
        },
        created(){
//            this.getPhotoInfo();
//            this.getThumbs();
        },
        methods:{
//          获取图片的详情
            getPhotoInfo(){
                this.$http.get('api/getimageInfo/'+this.id).then(result => {
                    this.photoinfo=result.body.message[0];
                });
            },
//          获取缩略图
            getThumbs(){
                this.$http.get('api/getthumimages/'+this.id).then(result => {
                    if(result.body.status === 0){
//                        循环每个图片的数据，补全图片的宽和高
                        result.body.message.forEach(item => {
                            item.w=600;
                            item.h=400;
                        });
//                        把完整的数据保存到 list 中
                        this.list=result.body.message;
                    }
                })
            },
            handleClose () {
                console.log('close event')
            }
        },
//    2、注册评论子组件
        components:{
            'cmt-box':comment
        }
    }
</script>

<style>
     /* 这里如果换成scss的写法样式会无效，故改成传统css的写法  */
    .my-gallery img{
        height:80px;
        width:50px;
        box-shadow: 0 0 9px #999;
    }
    .my-gallery figure{
        display: inline-block;
        margin:5px;
    }
</style>

<style lang="scss" scoped>
    .photoinfo-container{
        padding:5px;
        .title{
            text-align: center;
            font-size: 16px;
            color:#26a2ff;
            margin:15px 0;
        }
        .subtitle{
            font-size: 13px;
            color:#666;
            display: flex;
            justify-content: space-between;
        }
        .content{
            font-size: 13px;
            line-height: 30px;
        }

    }

</style>