<template>
  <div class="header">
    <h2>后台管理系统</h2>
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
  background:	#68838B;
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
  padding-right: 30px;
  vertical-align middle
}

h2{
  display inline-block
  // font-size 30px;
  // text-align left
  padding-left: 150px;
  line-height: 80px;
  font-weight: 600;
  font-size: 28px;
  font-family: '黑体';
  color: #8c888b;
  background: -webkit-linear-gradient(45deg, #70f7fe, #fbd7c6, #fdefac, #bfb5dd, #bed5f5);
  -moz-linear-gradient(45deg, #70f7fe, #fbd7c6, #fdefac, #bfb5dd, #bed5f5);
  -ms-linear-gradient(45deg, #70f7fe, #fbd7c6, #fdefac, #bfb5dd, #bed5f5);
  color: transparent;
  /* 设置字体颜色透明 */
  -webkit-background-clip: text;
  /* 背景裁剪为文本形式 */
  animation: ran 10s linear infinite;
  /* 动态10s展示 */
}
@keyframes ran {
  from {
    backgroud-position: 0 0;
  }

  to {
    background-position: 2000px 0;
  }
}
</style>