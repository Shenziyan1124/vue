<template>
 <div class="left">
     <a href="#">管理员管理</a>
     <a href="#">用户管理</a>
     <a href="#">通知管理</a>
     <a href="#">设备管理</a>

 </div>
</template>
<script>
import API from "../../common/js/API"
export default {
}
</script>
<style scoped lang="stylus">
@import "../../common/stylus/index.styl"
.left{
    height 100%;
    width 150px;
    background #cccccc
    text-align center

    a{
        display block
        font-size 20px
        color #fff
        line-height 40px
    }
}
</style>