<template>
  <div>
    <h1>{{$route.name}}</h1>
    <el-tabs v-model="activeName">
      <el-tab-pane label="水站" name="first"></el-tab-pane>
      <el-tab-pane label="水站评论" name="second"></el-tab-pane>
    </el-tabs>


    <v-waterbox v-if="activeName == 'first'"></v-waterbox>

    <div class="box2" v-if="activeName == 'second'">
      <div class="smallbox">
        <el-select v-model="value" placeholder="请选择">
          <el-option label="全部" value></el-option>
          <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>

      </div>

      <el-table :data="comment" height="250" border style="width: 100%">
        <el-table-column type="index" label="序号" width="150px"></el-table-column>
        <el-table-column prop="name" label="用户名称" ></el-table-column>
        <el-table-column prop="content" label="评论内容"></el-table-column>
        <el-table-column prop="time" label="时间">
          <template slot-scope="scope">
            <span>{{scope.row.time | transTime}}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="230">
          <template slot-scope="scope">
            <el-button type="danger" @click="del(scope.row.id)" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import API from "../common/js/API";
export default {
  data() {
    return {
      activeName: "first",
      tableData: [],
      dialogFormVisible: false,
      form: {
        img: "",
        name: "",
        score: "",
        count: "",
        likeNum: "",
        readNum: "",
        address: "",
        len: "",
        des: "",
        tel: "",
        price: "",
        id: ""
      },
      btn: "确   定",
      options: [],
      value: "",
      comment: [],
    };
  },
  mounted() {
    this.info();
    this.getComment()
  },
  methods: {
    info() {
      this.$axios({
        url: API.findWater
      }).then(rst => {
        if (rst.data.isok) {      
          this.tableData = rst.data.data;
          this.options = rst.data.data;
        }
      });
    },
    getComment(params){
     this.$axios({
      url: API.findComment,
      params:params
     }).then(rst => {       
      this.comment = rst.data.data;
     });
    },
    yangshi(a) {
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
      this.form = {};
      this.btn = "确   定";
    },
    queding(id) {
      console.log(id);
      
      if (id == undefined) {
        this.$axios({
          url: API.addWater,
          params: this.form
        }).then(rst => {
          if (rst.data.isok) {
            this.dialogFormVisible = false;
            this.$message({ type: "success", message: rst.data.info });
            this.info();
          } else {
            this.$message({ type: "info", message: rst.data.info });
          }
        });
      } else {
        this.$axios({
          url: API.updateWater,
          params: this.form
        }).then(rst => {
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
    del(id) {
      this.$axios({
        url: API.delWater,
        params: { id: id }
      })
      this.yangshi()
    },
    chakan(id) {
      this.$axios({
        url: API.findWater,
        method: "get",
        params: { id: id }
      }).then(rst => {
        console.log(rst);
        this.form = rst.data.data[0];
        this.dialogFormVisible = true;
        this.btn = "修 改";
      });
    }
  },
  watch: {
    value() {
      this.getComment({waterId:this.value })
    }
  }
};
</script>
<style scoped lang="stylus">
@import '../common/stylus/index.styl';

.el-tabs {
  width: 90%;
  margin: 0 auto;
}

.el-table {
  border: 1px solid #ebeef5;
  margin-top: 10px;
}

.box, .box2, .box3 {
  width: 90%;
  margin: 0 auto;
}

.smallbox {
  text-align: center;

  .el-select {
    width: 60%;
  }
}


</style>