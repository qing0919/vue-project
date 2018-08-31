<template>
    <div class="goodsinfo-container">
        <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>

        <!-- 商品轮播图区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper-box :lunbotuList="lunbotu" :isfull="false"></swiper-box>
                </div>
            </div>
        </div>

        <!-- 商品购买区域 -->
        <div class="mui-card">
            <div class="mui-card-header">{{goodsinfo.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价：<del>￥{{goodsinfo.market_price}}</del>&nbsp;&nbsp;&nbsp;&nbsp;销售价：<span class="now_price">￥{{goodsinfo.sell_price}}</span>
                    </p>
                    <p>购买数量:&nbsp;&nbsp;<numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox></p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                        <!-- 分析：如何实现加入购物车的时候，拿到选择的数量 -->
                        <!-- 按钮属于 goodsinfo 页面，数字属于 numberbox 组件-->
                        <!-- 由于涉及到了父子组件的嵌套，所以无法直接在 goodsinfo 页面中获取到选中的商品数量值 -->
                        <!-- 这里就涉及到了 子组件 向 父组件 传值的问题（事件调用机制）-->
                        <!-- 事件调用的本质：父向子传递方法，子调用这个方法，同时把数据当做参数传递给这个方法 -->
                    </p>
                </div>
            </div>
        </div>

        <!-- 商品参数区域 -->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner card_info">
                    <p>商品货号：{{goodsinfo.goods_no}}</p>
                    <p>库存情况：{{goodsinfo.stock_quantity}}件</p>
                    <p>上架时间：{{goodsinfo.add_time | dateFormat}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
    // 导入轮播图组件
    import swiper from '../subcomponents/swiper.vue'
//    导入数字选择框组件
    import goodsinfo_numbox from '../subcomponents/goodsinfo_numbox.vue'
    export default{
        data(){
//        必须要在 data 中写 return ，否则会报错
            return {
                id:this.$route.params.id,
                lunbotu:[    //轮播图的数据
//                    {src:"https://raw.githubusercontent.com/qing0919/camera/master/phone1%20.jpg"},
//                    {src:"https://raw.githubusercontent.com/qing0919/camera/master/phone2.jpg"},
//                    {src:"https://raw.githubusercontent.com/qing0919/camera/master/phone3.jpg"}
                    {img:"https://raw.githubusercontent.com/qing0919/camera/master/phone1%20.jpg"},
                    {img:"https://raw.githubusercontent.com/qing0919/camera/master/phone2.jpg"},
                    {img:"https://raw.githubusercontent.com/qing0919/camera/master/phone3.jpg"}
                ],
                goodsinfo:{      //获取到的商品的空对象
                    title:'小米（Mi） 小米8 16G双网通版',
                    market_price:2399,
                    sell_price:2199,
                    goods_no:'SD29186220',
                    stock_quantity:60,
                    add_time:new Date()
                },
                ballFlag:false,    //控制小球的隐藏和显示的标识符
                selectedCount:1    //用来保存用户选中的商品数量，默认用户买1个
            };
        },
        created(){
//            this.getLunbotu();
        },
        methods:{
            getLunbotu(){
                this.$http.get('api/gethumimages/'+this.id).then(result => {
                    if(result.body.status===0){
//                        先循环轮播图数组的每一项，给 item 添加 img 属性，因为轮播图
//                        组件中，只认识 item.img，不认识 item.src
                        result.body.message.forEach(item => {
                            item.img=item.src;
                        })
                        this.lunbotu=result.body.message;
                    }
                })
            },
            getGoodsInfo(){
//                获取商品的信息
                this.$http.get('api/goods/getinfo/'+this.id).then(result => {
                    if(result.body.status===0){
                        this.goodsinfo=result.body.message[0];
                    }
                })
            },
            goDesc(id){
//                点击使用编程式导航跳转到图文介绍页面
                this.$router.push({name:'goodsdesc',params:{id}})
            },
            goComment(id){
//                点击使用编程式导航跳转到商品评论页面
                this.$router.push({name:'goodscomment',params:{id}})
            },
            addToShopCar(){
//                添加到购物车
                this.ballFlag=!this.ballFlag;
//              {id:商品的id,count:要购买的数量，price:商品的单价，selected:false}
//              拼接出一个要保存到 store 中 car 数组里的商品信息对象
                var goodsinfo={
                    id:this.id,
                    count:this.selectedCount,
                    price:this.goodsinfo.sell_price,
                    selected:true
                };
//                调用 store 中的 mutations 来将商品加入购物车
                this.$store.commit('addToCar',goodsinfo);
            },
            beforeEnter(el){
                el.style.transform="translate(0,0)";
            },
            enter(el,done){
                el.offsetWidth;

//                小球动画优化思路：
//                1、先分析导致动画不准确的本质原因：我们把小球最终移到的位置，已经局限在了
//                某一分辨率下的滚动条未滚动的情况；
//                2、只要分辨率和测试的时候不一样，或者滚动条有一定的滚动距离之后，问题就出现了；
//                3、因此经过我们分析得到结论：不能把位置的横纵坐标直接写死了，而应该根据不同情况，
//                动态计算这个坐标值；
//                4、经过分析，得出解决思路：先得到徽标的横纵坐标，在得到小球的横纵坐标，然后求x轴和
//                y轴的差值，得到的结果，就是横纵坐标要位移的距离；
//                5、如何获取徽标和小球的位置？？？ domObject.getBoundingClientRect()
//                这个方法返回一个矩形对象，包含四个属性：left,top,right,bottom，分别表示元素各边与页面上边和左边的距离；
//
//                 6、获取小球在页面中的位置
                const ballPosition=this.$refs.ball.getBoundingClientRect();
//                7、获取徽标在页面中的位置
                const badgePosition=document.getElementById('badge').getBoundingClientRect();
                const xDistance=badgePosition.left-ballPosition.left;
                const yDistance=badgePosition.top-ballPosition.top;

//                模板字符串
                el.style.transform=`translate(${xDistance}px,${yDistance}px)`;
//                cubic-bezier 是一种动画效果，类似于 ease
                el.style.transition='all 1s cubic-bezier(0.4,-0.3,1,0.68)';
                done();
            },
            afterEnter(el){
                this.ballFlag=!this.ballFlag;
            },
            getSelectedCount(count){
//                当子组件把选中的数量传递给父组件的时候，把选中的值保存到data上
                this.selectedCount=count;
                console.log('父组件拿到的数量为'+this.selectedCount);
            }
        },
        components:{
            "swiper-box":swiper,
            "numbox":goodsinfo_numbox
        }
    }
</script>

<style lang="scss" scoped>
    .goodsinfo-container{
        background-color: #eee;
        overflow: hidden;
        p{
            color:#000;
        }
        .now_price{
            color:red;
            font-size: 16px;
            font-weight: bold;
        }
        .card_info{
            p{
                color:#bbb;
            }
        }
        .mui-card-footer{
            /* 按钮的父元素启用了弹性布局，因此两个按钮横排放置，使用 br 标签不生效*/
            display: block;
            button{
                margin:15px 0;
            }
        }
        .ball{
            width:15px;
            height:15px;
            border-radius:50%;
            background-color: red;
            position: absolute;
            top:390px;
            left:145px;
            z-index: 99;
        }
    }
</style>