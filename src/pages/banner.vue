<template>
  <div>
    <h1>{{$route.name}}</h1>
    <div class="bigbox">
      <el-button type="primary" plain @click="tianjia" style="margin-top:10px">添加</el-button>
    <div class="box">
      <el-table :data="tableData" height="350"  border style="width: 100%">
        <el-table-column type="index" label="序号" width="150px" ></el-table-column>
        <el-table-column prop="img" label="图片" >
        <!--插入图片链接的代码-->
        <template slot-scope="scope" >
        <img :src="scope.row.img" style="width: 40%;height: 40%;" />
        </template>
        </el-table-column>
        <el-table-column prop="des" label="描述" ></el-table-column>
        <el-table-column fixed="right" label="操作" >
          <template slot-scope="scope">
            <el-button type="danger" @click="del(scope.row.id)" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="添加banner" :visible.sync="dialogFormVisible" class="wrap">
      <el-form :model="form">
        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-input v-model="form.img" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="form.des" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="queding">确 定</el-button>
      </div>
    </el-dialog>
    </div>
  </div>
</template>
<script>
import API from "../common/js/API";
export default {
  data() {
    return {
      tableData: [],
      formLabelWidth: "120px",
      dialogFormVisible: false,
      form: {
        img: "",
        des: ""
      }
    };
  },
  mounted() {
    this.info();
  },
  methods: {
    info(id) {
      this.$axios({
        url: API.banner,
        params: id
      }).then(rst => {
        this.tableData = rst.data.data;
      });
    },
    del(id) {
      this.info(id)
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
        url: API.delBanner,
        params: { id: id }
      })
          this.info();
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    queding() {
      this.$axios({
        url: API.addBanner,
        params: this.form
      }).then(rst => {
        // console.log(rst);
        if (rst.data.isok) {
          this.info()
          this.$message({ type: "success", message: rst.data.info});
        }else{
          this.$message({type: "info", message: rst.data.info});
        }
      });
      this.dialogFormVisible = false;
    },
    tianjia(){
      this.dialogFormVisible = true;
      this.form={img:"",des:""}
    }
  }
};
</script>
<style scoped lang="stylus">
@import '../common/stylus/index.styl';

.bigbox{
  width 90%;
  margin 0 auto 
}
.box {
  margin: 10px auto;
  position: relative;
}

.wrap {
  // width: 80%;
  height: 500px;
  // background: #fff;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  z-index: 10000;
}

// .el-form-item>>>.el-form-item__label{
//    text-align center;
//    padding 0
//    font-size 18px
// }

</style>