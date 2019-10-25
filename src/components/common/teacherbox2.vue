<template>
  <div>
    <div class="box2">
      <el-button type="primary" plain @click="tianjiatype">添加</el-button>
      <el-table :data="tableDatatype" style="width: 100%" height="350" border>
        <el-table-column type="index" label="序号"  width="150px"></el-table-column>

        <el-table-column prop="img" label="图片">
          <template slot-scope="scope">
            <img :src="scope.row.img" style="width:50%;height: 50%;" />
          </template>
        </el-table-column>

        <el-table-column prop="type" label="描述"></el-table-column>

        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="danger" @click="deltype(scope.row.id)" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="添加家教类型" :visible.sync="dialogFormVisible" class="wrap">
        <el-form :model="formtype">
          <el-form-item label="图片" :label-width="formLabelWidth">
            <el-input v-model="formtype.img" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="类型" :label-width="formLabelWidth">
            <el-input v-model="formtype.type" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="quedingtype">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import API from "../../common/js/API";
export default {
  data() {
    return {
      tableDatatype: [],
      formLabelWidth: "120px",
      dialogFormVisible: false,
      formtype: {
        img: "",
        type: ""
      }
    };
  },
  mounted() {
    this.infotype();
    this.infoTop();
  },
  methods: {
    infotype() {
      this.$axios({
        url: API.teacherType
      }).then(rst => {
        // console.log(rst);
        this.tableDatatype = rst.data.data;
      });
    },
    infoTop() {
      this.$axios({
        url: API.teacherTop
      }).then(rst => {
        if (rst.data.isok) {
          this.tableDatapaihang = rst.data.data;
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
            url: API.delTeacherType,
            params: { id: id }
          });

          this.infotype();
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    tianjiatype() {
      this.dialogFormVisible = true;
      this.formtype = {};
    },
    quedingtype() {
      this.$axios({
        url: API.addTeacherType,
        params: { img: this.formtype.img, type: this.formtype.type }
      }).then(rst => {
        console.log(rst);
        if (rst.data.isok) {
          this.infotype();
          this.dialogFormVisible = false;
          this.$message({ type: "success", message: rst.data.info });
        } else {
          this.$message({ type: "info", message: rst.data.info });
        }
      });
    },
    deltype(id) {
      this.$axios({
        url: API.teacherType,
        params: { id: id }
      });
      this.yangshi(id);
    }
  }
};
</script>
<style scoped lang="stylus">
@import '../../common/stylus/index.styl';

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

.wrap {
  height: 500px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  z-index: 10000;
}

.el-form-item>>>.el-form-item__label{
   text-align center;
   padding 0
   font-size 18px
}
</style>