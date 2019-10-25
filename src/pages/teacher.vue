<template>
  <div>
    <h1>{{$route.name}}</h1>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="家教banner" name="first"></el-tab-pane>
      <el-tab-pane label="家教类型" name="second"></el-tab-pane>
      <el-tab-pane label="家教排行" name="third"></el-tab-pane>
    </el-tabs>

    <div class="box" v-if="activeName == 'first'">
      <el-button type="primary" plain @click="tianjiabanner">添加</el-button>
      <el-table :data="tableData" style="width: 100%" height="350" border>
        <el-table-column type="index" label="序号"  width="150px"></el-table-column>

        <el-table-column prop="img" label="图片" >
          <template slot-scope="scope">
            <img :src="scope.row.img" style="width:40%;height: 40%;" />
          </template>
        </el-table-column>

        <el-table-column prop="des" label="描述" ></el-table-column>

        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="danger" @click="delbanner(scope.row.id)" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="添加家教banner" :visible.sync="dialogFormVisible" class="wrap">
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
          <el-button type="primary" @click="quedingbanner">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <v-teachertype v-if="activeName == 'second'"></v-teachertype>

    <!-- <div class="box3" v-if="activeName == 'third'">
      <el-button type="primary" plain @click="tianjiatype">添加</el-button>
      <el-table :data="tableDatapaihang" style="width: 100%" height="350" border>
        <el-table-column type="index" label="序号" ></el-table-column>

        <el-table-column prop="img" label="图片" >
          <template slot-scope="scope">
            <img :src="scope.row.img" style="width:50%;height: 50%;" />
          </template>
        </el-table-column>

        <el-table-column prop="num" label="报名人数" ></el-table-column>

        <el-table-column prop="img" label="授课机构">
          <template slot-scope="scope">
            <img :src="scope.row.img" style="width:50%;height: 50%;" />
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作" >
          <template slot-scope="scope">
            <el-button type="danger" @click="delTop(scope.row.id)" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="添加家教排行" :visible.sync="dialogFormVisible" class="wrap">
        <el-form :model="formpaihang">
          <el-form-item label="图片" :label-width="formLabelWidth">
            <el-input v-model="formpaihang.img" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="机构名称" :label-width="formLabelWidth">
            <el-input v-model="formpaihang.teacherImg" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="报名人数" :label-width="formLabelWidth">
            <el-input v-model="formpaihang.num" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="quedingTop">确 定</el-button>
        </div>
      </el-dialog>
    </div>-->

    <v-teachertop v-if="activeName == 'third'"></v-teachertop>
  </div>
</template>
<script>
import API from "../common/js/API";
export default {
  data() {
    return {
      activeName: "first",
      tableData: [],
      formLabelWidth: "120px",
      dialogFormVisible: false,
      form: {
        img: "",
        des: ""
      },

      formpaihang: {
        img: "",
        num: "",
        teacherImg: ""
      }
    };
  },
  methods: {
    info() {
      this.$axios({
        url: API.teacherBanner
      }).then(rst => {
        this.tableData = rst.data.data;
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
    infotype() {
      this.$axios({
        url: API.teacherType
      }).then(rst => {
        // console.log(rst);
        this.tableDatatype = rst.data.data;
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
          //  this.infoTop();

          this.info();
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    quedingbanner() {
      this.$axios({
        url: API.addTeacherBanner,
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
    },
    tianjiabanner() {
      this.dialogFormVisible = true;
      this.form = {};
    },
    delbanner(id) {
      this.$axios({
        url: API.delTeacherBanner,
        params: { id: id }
      });
      this.yangshi();
    }
  },
  mounted() {
    if (this.activeName == "first") {
      this.info();
    } else if (this.activeName == "second") {
      this.infotype();
    } else {
      this.infoTop();
    }
  },
  watch: {
    activeName(oldname, newname) {
      if (newname == "first") {
        this.info();
      } else if (newname == "second") {
        this.infotype();
      } else {
        this.infoTop();
      }
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