<template>
    <div class="goodsComment">
        <!-- 3、以标签的形式使用评论子组件 -->
        <goodsComment></goodsComment>
    </div>
</template>

<script>
    // 1、导入评论子组件
    import goodsComment from '../subcomponents/comment.vue'
    export default{
//        2、注册评论子组件
       components:{
           goodsComment
       }
    }
</script>

<style lang="scss" scoped>

</style>