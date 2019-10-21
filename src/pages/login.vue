<template>
  <div>
    <div class="mark pr">
      <div class="login pa">
        <h3>登录</h3>
        <el-select v-model="user.type" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>

        <el-input v-model="user.name" placeholder="请输入账号"></el-input>

        <el-input v-model="user.pass" placeholder="请输入密码" show-password clearable></el-input>

        <div class="text-center">
          <el-button type="primary" plain @click="denglu">登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import API from "../common/js/API";
import qs from "qs";
export default {
  data() {
    return {
      options: [
        {
          value: "0",
          label: "超级管理员"
        },
        {
          value: "1",
          label: "普通管理员"
        }
      ],
      user: {
        name: "admin",
        pass: "123",
        type: "1"
      }
    };
  },
  methods: {
    denglu() {
      this.$axios({
        url: API.login,
        method: "post",
        data: this.user
      })
        .then(rst => {
          console.log(rst);
          sessionStorage.setItem("type",rst.data.type)
          sessionStorage.setItem("username",this.user.name)

          if (rst.data.isok) {
             this.$message({ message: "登陆成功", type: "success"});
            this.$router.push("/index");
          } else {
            this.$message.error(rst.data.info);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style scoped lang="stylus">
@import '../common/stylus/index.styl';

.mark {
  width: 100vw;
  height: 100vh;
  background: #ffe7ba;

  .login {
    width: 400px;
    height: 300px;
    left: 0;
    right: 0px;
    top: 0px;
    bottom: 0px;
    margin: auto;
    background: #fff;
    border-radius: 20px;
    text-align: center;

    h3 {
      font-size: 40px;
      line-height: 60px;
      color: $000;
    }
  }
}

.el-input {
  width: 80%;
  margin: 10px;
}

.el-select {
  width: 80%;
}
</style>