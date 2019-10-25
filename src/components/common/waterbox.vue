<template>
  <div>
    <div class="box">
      <el-button type="primary" plain @click="tianjia">添加</el-button>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="序号" width="150px"></el-table-column>
        <el-table-column prop="name" label="水站名称"></el-table-column>
        <el-table-column prop="tel" label="电话"></el-table-column>
        <el-table-column prop="price" label="价格"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="chakan(scope.row.id)" plain size="small">查看</el-button>
            <el-button type="danger" @click="del(scope.row.id)" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="添加水站" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off" placeholder="名称"></el-input>
          </el-form-item>

          <el-form-item label="评分" :label-width="formLabelWidth">
            <el-input v-model="form.score" type="number" autocomplete="off" placeholder="0-5分之间"></el-input>
          </el-form-item>

          <el-form-item label="月销售量" :label-width="formLabelWidth">
            <el-input v-model="form.count" type="number" autocomplete="off" placeholder="月销量"></el-input>
          </el-form-item>

          <el-form-item label="点赞数量" :label-width="formLabelWidth">
            <el-input v-model="form.likeNum" type="number" autocomplete="off" placeholder="点赞数量"></el-input>
          </el-form-item>

          <el-form-item label="浏览量" :label-width="formLabelWidth">
            <el-input v-model="form.readNum" type="number" autocomplete="off" placeholder="浏览量"></el-input>
          </el-form-item>

          <el-form-item label="商家地址" :label-width="formLabelWidth">
            <el-input v-model="form.address" autocomplete="off" placeholder="商家地址"></el-input>
          </el-form-item>

          <el-form-item label="距离" :label-width="formLabelWidth">
            <el-input v-model="form.len" autocomplete="off" placeholder="距离"></el-input>
          </el-form-item>

          <el-form-item label="商家信息" :label-width="formLabelWidth">
            <el-input v-model="form.des" autocomplete="off" placeholder="商家信息"></el-input>
          </el-form-item>

          <el-form-item label="电话" :label-width="formLabelWidth">
            <el-input v-model="form.tel" autocomplete="off" placeholder="联系电话"></el-input>
          </el-form-item>

          <el-form-item label="价格" :label-width="formLabelWidth">
            <el-input v-model="form.price" autocomplete="off" placeholder="价格"></el-input>
          </el-form-item>

          <el-form-item label="图片" :label-width="formLabelWidth">
            <el-input v-model="form.img" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="queding(form.id)">{{btn}}</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import API from "../../common/js/API.js";
export default {
  data() {
    return {
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
       formLabelWidth: "120px",
      btn: "确   定",
      options: [],
      value: "",
      comment: []
    };
  },
  mounted() {
    this.info();
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

    yangshi(id) {
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
            url: API.delWater,
            params: { id: id }
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

      // console.log(id)
    },
    del(id) {
      this.$axios({
        url: API.findWater,
        params: { id: id }
      });
      this.yangshi(id);
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
  }
};
</script>
<style scoped lang="stylus">
@import "../../common/stylus/index";
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

.el-form-item>>>.el-form-item__label{
   text-align center;
   padding 0
}
</style>