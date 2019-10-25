<template>
  <div>
    <h1>{{$route.name}}</h1>

    <div class="wrap">
      <el-button @click="tianjia">添加</el-button>
      <el-table :data="d" height="350" border style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="des" label="属性"></el-table-column>
        <el-table-column prop="time" label="时间">
          <template slot-scope="scope">
            <span>{{scope.row.time | transTime}}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="primary" @click="handleClick(scope.row.id)" size="small">查看</el-button>
            <el-button type="danger" @click="del(scope.row.id)" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="添加|修改管理员" :visible.sync="dialogFormVisible">
      <el-form :model="user">
        <el-form-item label="账号" :label-width="formLabelWidth">
          <el-input v-model="user.name" placeholder="请输入账号" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="user.pass" placeholder="请输入密码" show-password></el-input>
        </el-form-item>

        <el-form-item label="请确认密码" :label-width="formLabelWidth" v-if="isok">
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
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add(user.id)">{{btn}}</el-button>
      </div>

      <!-- {{d}} -->
    </el-dialog>
  </div>
</template>
<script>
import API from "../common/js/API";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      d: [],
      user: {
        name: "",
        pass: "",
        time: "",
        des: ""
      },
      dialogFormVisible: false,
      queren: "",
      btn: "确 定",
      formLabelWidth: "120px",
      isok: true,
      totime: ""
    };
  },
  mounted() {
    this.info();
  },
  methods: {
    info(id) {
      this.$axios({
        url: API.findManage,
        method: "post",
        data: id
      }).then(rst => {
        if (rst.data.isok) {
          this.d = rst.data.data;
        }
      });
    },
    handleClick(id) {
      this.$axios({
        url: API.findManage,
        method: "post",
        data: { id: id }
      }).then(rst => {
        this.isok = false;
        this.btn = "修 改";
        (this.dialogFormVisible = true), (this.user = rst.data.data[0]);
      });
    },
    del(id) {
      this.info(id);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(rst => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.$axios({
            url: API.delManage,
            method: "post",
            data: { id: id }
          });

          this.info();
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    tianjia() {
      this.dialogFormVisible = true;
      this.isok = true;
      this.user = {};
      this.queren = "";
    },
    add(id) {
      if (id == undefined) {
        this.$axios({
          url: API.addManage,
          method: "post",
          data: {
            name: this.user.name,
            pass: this.user.pass,
            time: this.user.time,
            des: this.user.des
          }
        }).then(rst => {
          if (rst.data.isok) {
            this.dialogFormVisible = false;
            this.$message({ message: rst.data.info, type: "success" });
            this.info();
          } else {
            this.$message.error(rst.data.info);
          }
        });
      } else {
        this.$axios({
          url: API.updateManage,
          method: "post",
          data: this.user
        }).then(rst => {
          console.log(rst);
          if (rst.data.isok) {
            this.info();
            this.dialogFormVisible = false;
            this.$message({ type: "success", message: rst.data.info });
          } else {
            this.$message({ type: "info", message: rst.data.info });
          }
        });
      }
    },
    timetime(obj) {
      this.totime = new Date(obj);
      this.user.time = this.totime.getTime();      
    }
  }
};
</script>
<style scoped lang="stylus">
@import '../common/stylus/index.styl';

.btn {
  width: 90%;
  margin: 0 auto;
  margin-left: 10px;
}

.el-button {
  margin-bottom: 10px;
}

.wrap {
  width: 90%;
  margin: 0 auto;
}
</style>