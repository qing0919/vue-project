<template>
    <div class="goodsDesc">
        <h1>{{info.title}}</h1>
        <hr>
        <div class="goodsDesc-content" v-html="info.content"></div>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                id:this.$route.params,
                info:{
                    title:'小米（Mi） 小米8 128G双网通版',
                    content:'<p>小米8 双频GPS手机，支持L1+L5 双频定位，双频信号协同工作，在城市复杂环境中，' +
                    '有效改善导航精准度。<img src="https://raw.githubusercontent.com/qing0919/camera/master/mi_1%20.jpeg">' +
                    '前后2000万柔光双摄，照亮你的美。<img src="https://raw.githubusercontent.com/qing0919/camera/master/mi_2.jpg"></p>'
                }
            };
        },
        created(){
            this.getInfo();
        },
        methods:{
            getInfo(){
                this.$http.get('api/goods/getdesc/'+this.id).then(result => {
                    if(result.body.status===0){
                        this.info=result.body.message[0];
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
    .goodsDesc{
        padding:0 5px;
        h1{
            font-size: 18px;
            color:#226aff;
            text-align: center;
            height:30px;
            line-height: 30px;
        }
        /* 要对拿回来的数据里面的标签进行修改样式，需要把 scoped 去掉，否则样式设置无效*/
        .goodsDesc-content{
            img{
                width:100%;
            }
            p{
                color:#0f0f0f;
            }
        }
    }
</style>