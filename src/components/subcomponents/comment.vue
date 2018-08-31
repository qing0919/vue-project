//因为很多页面都有评论部分，所以 发表评论 这一部分可以单独抽离为一个组件，方便共用
<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入要评论的内容（最多吐槽120字）" maxlength="120" v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
        <div class="cmt-list">
            <div class="cmt-item">
                <div class="cmt-title">
                    第1楼&nbsp;&nbsp;用户：匿名用户&nbsp;&nbsp;发表时间：2012-12-12 12:12:12
                </div>
                <div class="cmt-body">
                    龙非夜：“山有木兮木有枝，心悦芸兮芸不知？落花已作风前舞，流水依旧只东去。”
                    人生只有一次，少一秒遇见你，生命中便少了有你的一秒钟，下辈子，我们未必会再遇到彼此。
                </div>
            </div>

            <div class="cmt-item">
                <div class="cmt-title">
                    第2楼&nbsp;&nbsp;用户：匿名用户&nbsp;&nbsp;发表时间：2012-12-12 12:12:12
                </div>
                <div class="cmt-body">
                    龙非夜&芸汐：时光静好，与君语；天下纷争，与君谋；繁华落尽，与君老。愿得一人心，白首不相离
                    孤独，是明明她就在眼前，睁眼可见，他却依然茕茕孑立；
                </div>
            </div>

            <div class="cmt-item">
                <div class="cmt-title">
                    第3楼&nbsp;&nbsp;用户：匿名用户&nbsp;&nbsp;发表时间：2012-12-12 12:12:12
                </div>
                <div class="cmt-body">
                    处高出旁观，才能看到真正的热闹，一旦置身其中，极有可能会变成别人眼中的热闹。
                    一见钟情并非初见便钟情，而是一个举动，一句话，甚至是一个笑容，一张怒脸，便让人永生难忘，刻骨铭心。
                </div>
            </div>
        </div>
        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
    export default{
        data(){
            return {
                pageIndex:1 ,  //默认展示第一页数据
                comments:[] ,   //所有的评论数据
                msg:''        //评论输入的内容
            }
        },
//        created(){
//            this.getComments()
//        },
        methods:{
            getComments(){    //获取评论
//                这里的url需要传递id，而id在NewsInfo中接收了，而这个组件作为子组件，
//                想要拿到 NewsInfo 中的id，就涉及到了父组件向子组件传值的问题
//                父组件向子组件传值：先在调用子组件的地方进行属性绑定，而后在子组件的props
//                属性中进行声明
                this.$http.get("api/getcomments/"+this.id+"?pageindex="+
                    this.pageIndex).then(result => {
                    if(result.body.status===0){
//                        this.comments=result.body.message;
//                        每当获取评论数据的时候，不要把老数据清空覆盖，应该在老数据后面拼接上
//                        新数据，这样老数据和新数据才能一起显示出来
                        this.comments=this.comments.concat(result.body.message);
                    }else{
                        Toast('加载评论失败！')
                    }
                })
            },
            getMore(){
                this.pageIndex++;
                this.getComments();
            },
            postComment(){     //发表评论
//          校验评论内容是否为空
                if(this.msg.trim().length===0){
                    return Toast('评论内容不能为空！')
                }
//          参数 1：请求的URL地址
//          参数 2：提交给服务器的数据对象 {content:this.msg}
//          参数 3：定义提交的时候，表单中数据的格式 { emulateJSON:true }
                this.$http.post('api/postcomment/' + this.$route.params.id,
                        { content:this.msg.trim() }).then( result => {
//                            trim()方法，去除字符串左右两端的空格
                            if(result.body.status===0){
//                              拼接出一个评论对象
                                var cmt={
                                    user_name:'匿名用户',
                                    add_time:Date.now(),
                                    content:this.msg.trim()
                                };
                                this.comments.unshift(cmt);
                                this.msg="";
                            }
                        })
            }
        },
        props:["id"]
    };
</script>

<style lang="scss" scoped>
    .cmt-container{
        h3{
            font-size: 18px;
        }
        textarea{
            font-size: 14px;
            height:85px;
            margin-bottom: 2px;
        }
        .cmt-list{
            .cmt-item{
                font-size: 14px;
                line-height: 30px;
                .cmt-title{
                    background-color: #ccc;
                    margin-top:5px;
                }
                .cmt-body{
                    text-indent: 2em;
                }
            }
        }
    }
</style>