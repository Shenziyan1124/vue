<template>
  <div>
    <div class="box">
      <el-button type="primary" plain @click="tianjia">添加</el-button>

      <el-table :data="tableData" border height="350" style="width: 100%">
        <el-table-column type="index" label="序号"  width="130"></el-table-column>
        <!-- <el-table-column prop="img" label="图片" width="230"></el-table-column> -->

        <el-table-column prop="img" label="图片" >
          <template slot-scope="scope">
            <img :src="scope.row.img" style="width: 40%;height: 40%;" />
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="danger" @click="del(scope.row.id)" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="添加家政banner" :visible.sync="dialogFormVisible">
        <el-upload action="#" list-type="picture-card" :auto-upload="false">
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{file}">
            <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
            <span class="el-upload-list__item-actions">
              <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                <i class="el-icon-zoom-in"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleDownload(file)"
              >
                <i class="el-icon-download"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="queding">确 定</el-button>
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
      activeName: "first",
      props: ["tableData"],
      dialogFormVisible : false,
      tableData:[],
      dialogImageUrl:
        "http://b.hiphotos.baidu.com/image/pic/item/32fa828ba61ea8d3fcd2e9ce9e0a304e241f5803.jpg",
      dialogVisible: false,
      disabled: false,
    };
  },
  mounted() {
    this.info(); //家政banner渲染
  },
  methods: {
    info(id) {
      this.$axios({
        url: API.homeBanner,
      }).then(rst => {
        if (rst.data.isok) {
          this.tableData = rst.data.data;
        }
      });
    },
    tianjia() {
      this.dialogFormVisible = true;
    },
    queding() {
      this.$axios({
        url: API.addHomeBanner,
        params: { img: this.dialogImageUrl }
      }).then(rst => {
        console.log(rst);
        if (rst.data.isok) {
          this.dialogFormVisible = false;
          this.info();
        }
      });
    },
    del(id) {
      this.$axios({
        url:API.homeBanner,
        params:{id:id}
      })
      this.yangshi(id);
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
            url:API.delHomeBanner,
            params:{id:id}
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

.el-input, .el-checkbox-group, .el-select {
  width: 80%;
  margin: 10px;
}
</style>