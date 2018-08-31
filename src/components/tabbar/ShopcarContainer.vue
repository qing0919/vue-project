<template>
    <div class="shopcar-container">
        <!-- 商品列表项区域 -->
        <div class="goods-list">
            <div class="mui-card" v-for="(item,i) in goodslist" :key="item.id">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <mt-switch v-model="$store.getters.getGoodsSelected[item.id]"
                                    @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
                        <img :src="item.thumb_path" alt="">
                        <div class="info">
                            <h1>{{item.title}}</h1>
                            <p>
                                <span class="price">￥{{item.sell_price}}</span>
                                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                                <!-- 问题：如何从购物车中获取商品的数量呢？ -->
                                <!-- 1、我们可以先创建一个空对象，然后循环购物车中所有商品的数据，
                                把当前循环商品的这条 id 作为对象的属性名，count 值作为对象的属性值，
                                这样，当把所有的商品循环一遍，就会得到一个对象：{87：4，88：5} -->
                                <a href="#" @click.prevent="remove(item.id,i)">删除</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 结算区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner totalPrice">
                    <div class="left">
                        <p>总计(不含运费)</p>
                        <p>已勾选商品 <span class="red">{{$store.getters.getGoodsCountAndAmount.count}}</span> 件，总价<span class="red">￥{{$store.getters.getGoodsCountAndAmount.amount}}</span></p>
                    </div>
                    <mt-button type="danger">去结算</mt-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import numbox from '../subcomponents/shopcar_numbox.vue'
    export default{
        data(){
            return {
//                购物车中所有商品的数据
                goodslist:[
                    {id:87,sell_price:2199,thumb_path:"https://raw.githubusercontent.com/qing0919/camera/master/phone1%20.jpg",title:'小米（Mi） 小米8 16G双网通版'},
                    {id:88,sell_price:2199,thumb_path:"https://raw.githubusercontent.com/qing0919/camera/master/phone2.jpg",title:'华为 P20 4000万莱卡三摄 AI摄行大师'},
                    {id:89,sell_price:2199,thumb_path:"https://raw.githubusercontent.com/qing0919/camera/master/phone3.jpg",title:'华为 荣耀 4000万莱卡三摄 AI摄行大师'}
                ]
            }
        },
//        created(){
//            this.getGoodsList();
//        }
        methods:{
            getGoodsList(){
//            1、获取到 store 中所有的商品 Id,然后拼接出一个用逗号分隔的字符串
                var idArr=[];
                this.$store.state.car.forEach(item => idArr.push(item.id));
//                如果购物车中没有商品，则直接返回，不需要请求数据接口，否则会报错；
                if(idArr.length<=0){
                    return;
                }
//                获取购物车商品列表
                this.$http.get("api/goods/getshopcarlist"+idArr.join(",")).then(result =>{
                    if(result.body.status === 0){
                        this.goodslist=result.body.message;
                    }
                });
            },
            remove(id,index){
                this.goodslist.splice(index,1);
                this.$store.commit('removeFromCar',id);
            },
            selectedChanged(id,val){
//                console.log(id+'---'+val);
               this.$store.commit('updateGoodsSelected',{id:id,selected:val});
            }
        },
        components:{
            numbox
        }
}
</script>

<style lang="scss" scoped>
    .shopcar-container{
        background-color: #eee;
        overflow: hidden;
        .goods-list{
            .mui-card-content-inner{
                display: flex;
                /* 纵向居中 */
                align-items: center;
            }
            img{
                width:60px;
                height:60px;
                margin:0 5px;
            }
            .info{
                display:flex;
                flex-direction:column;
                justify-content:space-between;
                h1{
                    font-size: 14px;
                }
                .price{
                    color:red;
                    font-weight: bold;
                }
            }
        }
        .totalPrice{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .red{
                color:red;
                font-weight: bold;
                font-size:16px;
            }
        }
    }
</style>