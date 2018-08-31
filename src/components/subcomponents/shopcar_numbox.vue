<template>
    <div class="mui-numbox" data-numbox-min='1' style="height:25px;">
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" :value="initcount" @change="countChange" ref="numbox" readonly/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
    <!-- 子组件什么时候把数据传递给父组件 -->
    <!-- 当文本框中的数量发生改变时就触发事件，将子组件的值传递给父组件 -->
</template>

<script>
    import mui from '../../lib/mui/js/mui.min'
    export default{
        mounted(){
//          初始化数字选择框组件
        mui(".mui-numbox").numbox();
        },
        methods:{
            countChange(){
    //          数量改变了
//                console.log(this.$refs.numbox.value);
//                每当数量值改变，则立即把最新的数量同步到购物车的 store 中，覆盖之前的数量值
                this.$store.commit("updateGoodsInfo",
                        {id:this.goodsid,
                         count:this.$refs.numbox.value
                        });
            }
        },
        props:['initcount','goodsid']
    }
</script>

<style lang="scss" scoped>

</style>