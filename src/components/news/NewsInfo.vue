<template>
    <div class="newsinfo-container">
        <!-- 大标题 -->
        <h3 class="title">{{newsinfo.title}}</h3>
        <!-- 子标题 -->
        <p class="subtitle">
            <span>发表时间：{{newsinfo.add_time | dateFormat}}</span>
            <span>点击次数：{{newsinfo.click}}次</span>
        </p>
        <hr>
        <!-- 内容区域 -->
        <div class="content" v-html="newsinfo.content"></div>
        <!-- 评论组件 -->
        <comment-box :id="this.id"></comment-box>
    </div>
</template>

<script>
    //导入评论子组件
    import comment from '../subcomponents/comment.vue'
    import {Toast} from 'mint-ui'
    export default{
        data(){
            return {    //将URL地址中传递过来的 Id 值,挂载到data上，方便以后调用
                id:this.$route.params.id,
                //模拟后台数据
                newsinfo:{     //新闻详情的对象
                    title:'7018米！中国科学家又迎来历史性突破',
                    click:2,
                    add_time:new Date(),
                    content:'<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2日，吉林大学主要承担研发的“地壳一号”万米钻机正式宣布完成“首秀”：' +
                    '完钻井深7018米，创造了亚洲国家大陆科学钻井新纪录，标志着我国成为继俄罗斯和德国之后，' +
                    '世界上第三个拥有实施万米大陆钻探计划专用装备和相关技术的国家。</p>'+
                    '<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;十年磨一“钻”！“向地球深部进军”科学钻探是获取地球深部物质、'+
                    '了解地球内部信息最直接、有效、可靠的方法，是地球科学发展不可缺少的重要支撑，'+
                    '也是解决人类社会发展面临的资源、能源、环境等重大问题不可缺少的重要技术手段。'+
                    '20世纪70年代以来，很多发达国家陆续实施了多项科学钻探计划。具有代表性的有苏联科拉半岛12262米超深钻，'+
                    '是目前世界上最深井；德国KTB超深钻，9101米，排名第二。</p>'+
                    '<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1996年2月，德国、美国和中国作为第一批成员，发起了国际大陆科学钻探计划。' +
                    '目前，我国已成功申请到“大别—苏鲁”大陆超深钻、中国环境科学钻探青海湖工程、' +
                    '科钻一井和二井工程等多项ICDP项目，在大陆科学钻探领域取得令人瞩目的成绩。</p>'
                }
            };
        },
    //    created(){
    //        getNewsInfo()
    //    },
        methods:{
            getNewsInfo(){   //获取新闻详情
                this.$http.get('api/getnew/'+this.id).then(result => {
                    if(result.body.status===0){
                        this.newsinfo=result.body.message[0]
                    }else{
                        Toast('获取新闻详情失败！')
                    }
                })
            }
        },
        components:{
            //用来注册子组件的节点
            "comment-box":comment
        }
    };
</script>

<style lang="scss" scoped>
    .newsinfo-container{
        padding:0 4px;
        .title{
            text-align: center;
            font-size: 16px;
            margin:15px 0;
            color:red;
        }
        .subtitle{
            font-size: 14px;
            color:#226aff;
            display: flex;
            justify-content: space-between;
        }
        .content{

        }
    }
</style>