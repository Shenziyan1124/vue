<template>
  <div class="wrap">
      <v-header></v-header>
      <div class="box">
              <v-left></v-left>
      <v-right></v-right>
      </div>
  </div>
</template>
<script>
import API from "../common/js/API"
import vLeft from "../components/views/left";
import vRight from "../components/views/right";
import vHeader from "../components/views/header";

export default {
  components: {
    vLeft,
    vRight,
    vHeader
  },

};
</script>
<style scoped lang="stylus">
@import "../common/stylus/index.styl"
.wrap {
  width 100vw;
  height 100vh
  display: flex;
  flex-direction column;
}

.box{
  flex 1;
  display flex;
}
</style>