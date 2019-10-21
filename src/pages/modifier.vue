<template>
  <div>
    <h1>{{$route.name}}</h1>

    <div>
      <span>账号</span>
      <el-input placeholder="请输入内容" v-model="name" :disabled="true"></el-input>
    </div>
    <div>
      <span>原始密码</span>
      <el-input placeholder="请输入密码" v-model="oldpass" show-password></el-input>
    </div>
    <div>
      <span>新密码</span>
      <el-input placeholder="请输入密码" v-model="newpass" show-password></el-input>
    </div>
    <div>
      <span>确认密码</span>
      <el-input placeholder="请输入密码" v-model="queren" show-password></el-input>
    </div>

    <div class="text-center">
      <el-button type="warning" @click="xiugai">修改</el-button>
    </div>
  </div>
</template>
<script>
import API from "../common/js/API";
export default {
  data() {
    return {
      name: "",
      oldpass: "",
      newpass: "",
      queren: ""
    };
  },
  mounted() {
    this.name = sessionStorage.getItem("username");
  },
  methods: {
    xiugai() {
      this.$axios({
        url: API.changePassManage,
        method: "post",
        data: { name: this.name, oldpass: this.oldpass, newpass: this.newpass }
      }).then(rst => {
        if (this.newpass != this.queren) {
          this.$message.error("两次密码不同");
          return;
        }

        if (this.newpass == this.oldpass) {
          this.$message.error("新密码和旧密码重复");
          return;
        }
        if (rst.data.isok) {
          this.$message({
            message: rst.data.info,
            type: "success"
          });
        } else {
          this.$message.error(rst.data.info);
        }
      });
    }
  }
};
</script>
<style scoped lang="stylus">
@import '../common/stylus/index.styl';

span {
  display: inline-block;
  width: 80px;
  text-align: center;
}

.el-input {
  width: 80%;
  margin: 10px;
}
</style>