<template>
    <!-- 问题：我们不知道什么时候能够拿到 max 值，但是，总归有一刻，会得到一个真正的 max 值-->
    <!-- 我们可以使用 watch 属性监听，来监听父组件传递过来的 max 值，不管 watch 会被触发几次，-->
    <!-- 但是最后一次，肯定是一个合法的 max 数值-->
    <div class="mui-numbox" data-numbox-min='1' :data-numbox-max='max'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChange" ref="numbox"/>
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
//                每当文本框中的数据被修改的时候，立即把最新的数据，通过事件调用，传递给父组件
//                console.log(this.$refs.numbox.value);
                this.$emit("getcount",parseInt(this.$refs.numbox.value));
            }
        },
        watch:{
//            属性监听
            "max":function(newVal,oldVal){
//                设置最大值为 newVal
                mui(".mui-numbox").numbox().setOption("max",newVal);
            }
        },
        props:["max"]
    }
</script>

<style lang="scss" scoped>

</style>