<template>
  <div>
    <h1>{{$route.name}}</h1>
    <el-tabs v-model="activeName">
      <el-tab-pane label="维修" name="first"></el-tab-pane>
      <el-tab-pane label="维修评论" name="second"></el-tab-pane>
    </el-tabs>

    <!-- <div class="box" v-if="activeName == 'first'">
      <el-button type="primary" plain @click="tianjia">添加</el-button>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="序号" width="230"></el-table-column>
        <el-table-column prop="name" label="维修名称" width="180"></el-table-column>
        <el-table-column prop="tel" label="电话" width="180"></el-table-column>
        <el-table-column prop="type" label="类型"></el-table-column>
        <el-table-column fixed="right" label="操作" width="230">
          <template slot-scope="scope">
            <el-button type="primary" @click="chakan(scope.row.id)" plain size="small">查看</el-button>
            <el-button type="danger" @click="del(scope.row.id)" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="添加维修" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off" placeholder="名称"></el-input>
          </el-form-item>

          <el-form-item label="评分" :label-width="formLabelWidth">
            <el-input v-model="form.score" type="number" autocomplete="off" placeholder="0-5分之间"></el-input>
          </el-form-item>

          <el-form-item label="类型" :label-width="formLabelWidth">
            <el-input v-model="form.type" type="number" autocomplete="off" placeholder="月销量"></el-input>
          </el-form-item>

          <el-form-item label="点赞数量" :label-width="formLabelWidth">
            <el-input v-model="form.likeNum" type="number" autocomplete="off" placeholder="点赞数量"></el-input>
          </el-form-item>

          <el-form-item label="关注人数" :label-width="formLabelWidth">
            <el-input v-model="form.readNum" type="number" autocomplete="off" placeholder="浏览量"></el-input>
          </el-form-item>

          <el-form-item label="商家地址" :label-width="formLabelWidth">
            <el-input v-model="form.address" autocomplete="off" placeholder="商家地址"></el-input>
          </el-form-item>

          <el-form-item label="距离" :label-width="formLabelWidth">
            <el-input v-model="form.len" autocomplete="off" placeholder="距离"></el-input>
          </el-form-item>

          <el-form-item label="商家信息" :label-width="formLabelWidth">
            <el-input v-model="form.info" autocomplete="off" placeholder="商家信息"></el-input>
          </el-form-item>

          <el-form-item label="电话" :label-width="formLabelWidth">
            <el-input v-model="form.tel" autocomplete="off" placeholder="联系电话"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="queding(form.id)">{{btn}}</el-button>
        </div>
      </el-dialog>
    </div> -->
    <v-maintanbox v-if="activeName == 'first'"></v-maintanbox>

    <div class="box2" v-if="activeName == 'second'">
      <div class="smallbox">
        <el-select v-model="value" placeholder="请选择">
          <el-option label="全部" value></el-option>
          <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </div>

      <el-table :data="comment" height="250" border style="width: 100%">
        <el-table-column type="index" label="序号" width="150px"></el-table-column>
        <el-table-column prop="name" label="用户名称" ></el-table-column>
        <el-table-column prop="content" label="评论内容"></el-table-column>
        <!-- <el-table-column prop="time" label="时间"></el-table-column> -->
        <el-table-column prop="time" label="时间">
          <template slot-scope="scope">
            <span>{{scope.row.time | transTime}}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" >
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
        name: "",
        score: "",
        info: "",
        likeNum: "",
        readNum: "",
        address: "",
        len: "",
        des: "",
        tel: "",
        type: "",
        id: ""
      },
      formLabelWidth: "120px",
      btn: "确   定",
      options: [],
      value: "全部",
      comment: []
    };
  },
  mounted() {
    this.getComment();
  },
  methods: {
    getComment(params){
      this.$axios({
         url:API.findRepairComment,
         params:params
      }).then(rst=>{
        this.comment = rst.data.data;
      })
    },
    tianjia() {
      this.dialogFormVisible = true;
      this.form = {};
      this.btn = "确   定";
    },
    queding(id) {
      if (id == undefined) {
        this.$axios({
          url: API.addRepair,
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
          url: API.updateRepair,
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

      // console.log(id)
    },
    del(id) {
      this.$axios({
        url: API.delRepair,
        params: { id: id }
      });
      this.yangshi();
    },
    chakan(id) {
      this.$axios({
        url: API.findRepair,
        method: "get",
        params: { id: id }
      }).then(rst => {
        console.log(rst);
        this.form = rst.data.data[0];
        this.dialogFormVisible = true;
        this.btn = "修 改";
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
    }
  },
  watch: {
    value(){
        this.getComment({repairId:this.value})
    }
  },
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