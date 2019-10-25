<template>
  <div>
    <el-dialog title="添加|修改管理员" :visible.sync="$store.state.dialogFormVisible">
      <el-form :model="user">
        <el-form-item label="账号" :label-width="formLabelWidth">
          <el-input v-model="user.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="user.pass" placeholder="请输入密码" show-password></el-input>
        </el-form-item>

        <el-form-item label="请确认密码" :label-width="formLabelWidth">
          <el-input v-model="queren" placeholder="请输入密码" show-password></el-input>
        </el-form-item>

        <el-form-item label="属性" :label-width="formLabelWidth">
          <el-input v-model="user.des" placeholder="请输入描述"></el-input>
        </el-form-item>

        <el-form-item label="时间" :label-width="formLabelWidth">
          <el-date-picker v-model="user.time" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="$store.state.dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>

      {{$store.state.id}}
      <!-- {{d}} -->
    </el-dialog>
  </div>
</template>
<script>
import API from "../../common/js/API";
import { mapGetters, mapActions } from "vuex";
// name 账号 pass 密码 time 时间 (时间戳) 	des 描述
export default {
  data() {
    return {
      user: {
        name: "",
        pass: "",
        time: "",
        des: ""
      },
     
      queren: "",
      dialogFormVisible: false,
      formLabelWidth: "120px"
    };
  },

  mounted() {
    this.$axios({
      url: API.findManage,
      method: "post",
      data: { id: this.d.id }
    }).then(rst => {
      console.log(1);
      //  console.log(rst.data.data[0]);
      // this.user = rst.data.data[0];
    });
  },

  computed: {
    ...mapGetters({
      d: "id"
    })
  },

  methods: {
    info() {
      this.$axios({
        url: API.findManage,
        method: "post"
      }).then(rst => {
        // this.$router.go(0)
      });
    },
    add() {
      this.$axios({
        url: API.addManage,
        method: "post",
        data: this.user
      }).then(rst => {
        if (this.queren != this.user.pass) {
          this.$message.error("两次密码不一致");
          return;
        }
        this.info();
        if (rst.data.isok) {
          this.$message({ message: rst.data.info, type: "success" });
          this.$store.dispatch("changeName", (this.dialogFormVisible = false));

          this.$emit("getD",)
        } else {
          this.$message.error(rst.data.info);
        }
      });
    },

  }
};
</script>
<style scoped lang="stylus">
@import '../../common/stylus/index';

.title {
  padding: 20px 20px 10px;

  .el-dialog__title {
    color: #ff8247 !important;
    display: inline-block;
  }

  .el-icon-close {
    float: right;
  }
}

.box {
  width: 500px;
  height: 500px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  background: #fff;

  .wrap {
    padding: 30px 20px;
  }

  span {
    padding: 24px;
    font-size: 14px;
  }

  .queren {
    padding-left: 19px;
    padding-right: 0;
  }

  .el-input {
    width: 75%;
    margin: 10px;
  }
}
</style>