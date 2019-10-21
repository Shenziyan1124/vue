<template>
 <div class="right">
     <router-view></router-view>
 </div>
</template>
<script>
import API from "../../common/js/API"
export default {
}
</script>
<style scoped lang="stylus">
@import "../../common/stylus/index.styl"
.right{
    flex 1
    background #fff
}
</style>