<template>
    <div>
        <ul class="mui-table-view">
        <!-- 使用 v-for 来循环渲染新闻列表页-->
            <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
                <router-link :to="'/home/newsinfo/'+item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        <h1>{{item.title}}</h1>
                        <p class='mui-ellipsis'>
                            <!--可以通过给过滤器传递参数来指定格式化时间的模板-->
                            <!--<span>发表时间：{{item.add_time | dateFormat('YYYY-MM-DD')}}</span>-->
                            <span>发表时间：{{item.add_time | dateFormat}}</span>

                            <span>点击：{{item.click}}次</span>
                        </p>
                    </div>   
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import {Toast} from "mint-ui";
    export default{
        data(){
            return {
                newslist:[   //新闻列表
                    {id:1,img_url:"https://raw.githubusercontent.com/it-shell/helloword/master/imges/muwu.jpg",
                        title:'幸福',add_time:new Date(),click:3},
                    {id:2,img_url:"https://raw.githubusercontent.com/it-shell/helloword/master/imges/shuijiao.jpg",
                        title:'人生',add_time:new Date(),click:10},
                    {id:3,img_url:"https://raw.githubusercontent.com/it-shell/helloword/master/imges/yuantiao.jpg",
                        title:'生活',add_time:new Date(),click:8}
                ]
            }
         },
//        created(){
//            this.getNewsList();
//        },
        methods:{
            getNewsList(){    //获取新闻列表
                this.$http.get('api/getnewslist').then(result => {
//                    result.body,status为0表示获取数据成功，为1表示获取数据失败
                    if(result.body.status==='0'){
//                        如果没有失败，应该把数据保存到data上
                        this.newslist=result.body.message
                    }else{
                        Toast('获取新闻列表失败！')
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .mui-table-view{
        li{
            h1{
                font-size: 14px;
            }
            .mui-ellipsis{
                font-size: 12px;
                color:#226aff;
                /*用css3的弹性布局来实现两端对齐*/
                display: flex;
                justify-content: space-between;
            }
        }
    }
</style>