<template>
  <div class="header">
    <div class="box">
      <h1>{{a}}</h1>
      <el-button type="warning" plain @click="tuichu">退出登录</el-button>
    </div>
  </div>
</template>
<script>
import API from "../../common/js/API";
export default {
  data() {
    return {
      a: ""
    };
  },
  methods: {
    tuichu() {
      sessionStorage.removeItem("username");
      sessionStorage.removeItem("type");
      this.$router.replace("/login");
    }
  },

  mounted() {
    this.a = sessionStorage.getItem("username");
  }
};
</script>
<style scoped lang="stylus">
@import '../../common/stylus/index.styl';

.header {
  width: 100vw;
  height: 80px;
  background: #3B3B3B;
}

.box {
  float: right;
  line-height: 80px;
  text-align: right;

  .el-button {
    margin-top: 20px;
    margin-right: 50px;
  }
}

h1 {
  display: inline-block;
  font-size: 30px;
  color: #fff;
  padding-right: 10px;
}
</style>