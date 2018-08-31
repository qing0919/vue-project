<template>
   <div class="swiper-container">
       <mt-swipe :auto="4000">
           <!-- 在组件中，使用v-for循环的话，一定要使用key属性-->
           <!-- 将来谁使用轮播图组件，谁为我们传递 lunbotuList，因此涉及到了父组件向子组件传值的问题-->
           <mt-swipe-item v-for="item in lunbotuList" :key="item.title">
               <!-- 如果 isfull 为真，则给 img 添加 full 类-->
               <img :src="item.img" alt="" :class="{full:isfull}">
           </mt-swipe-item>
       </mt-swipe>
   </div>

    <!-- 分析：为什么商品详情中的轮播图那么丑 -->
    <!-- 1、首页中的图片，它的宽和高都是使用了100%的宽度 -->
    <!-- 2、在商品详情页面中，轮播图的图片，如果也使用宽高为100%的话，页面不好看-->
    <!-- 3、商品详情页面中的轮播图，期望高度是100%，宽度为自适应-->
    <!-- 4、经过分析，得到问题的原因：首页中的轮播图和商品详情中的轮播图，分歧点是：宽度
    到底是100%还是自适应-->
    <!-- 5、既然这两个轮播图其他方面都是没有冲突的，只是宽度有分歧，那么我们可以定义一个属性，让
    使用轮播图的调用者，手动指定是否为100%的宽度-->

</template>

<script>
    export default{
        props:["lunbotuList","isfull"]
    };
</script>

<style lang="scss" scoped>
    .mint-swipe{
        height:200px;
        .mint-swipe-item{
            text-align:center;
        /*scss中交集选择器的写法*/
        /*&:nth-child(1){*/
        /*background-color: red;*/
        /*}*/
        /*&:nth-child(2){*/
        /*background-color: yellowgreen;*/
        /*}*/
        /*&:nth-child(3){*/
        /*background-color: purple;*/
        /*}*/
            img{
                height:100%;
            }
        }
    }

    .full{
        width:100%;
    }
</style>