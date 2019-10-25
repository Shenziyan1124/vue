<template>
  <div>
    <h1>{{$route.name}}</h1>
    <el-tabs v-model="activeName">
      <el-tab-pane label="家政banner" name="first"></el-tab-pane>
      <el-tab-pane label="人员管理" name="second"></el-tab-pane>
    </el-tabs>

    <v-homekeepingbox v-if="activeName == 'first'"></v-homekeepingbox>

    <div class="box2" v-if="activeName == 'second'">
      <el-button type="primary" plain @click="tianjia">添加</el-button>
      <div class="smallbox">
        <el-select v-model="value" placeholder="请选择">
          <el-option label="全部" value></el-option>
          <el-option v-for="item in options" :key="item.value" :label="item" :value="item"></el-option>
        </el-select>
      </div>

      <el-table :data="tablepeple" border style="width: 100%" height="350">
        <el-table-column type="index" label="序号" width="150px"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="tel" label="电话"></el-table-column>
        <el-table-column prop="price" label="价格"></el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column prop="edu" label="学历"></el-table-column>
        <el-table-column prop="type" label="服务类型"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" plain @click="chakan(scope.row.id)" size="small">查看</el-button>
            <el-button type="danger" @click="delpeple(scope.row.id)" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="添加家政人员" :visible.sync="dialogFormVisible">
        <div>
          <span>姓名</span>
          <el-input v-model="user.name" placeholder="请输入姓名"></el-input>
        </div>

        <div>
          <span>年龄</span>
          <el-input v-model="user.age" placeholder="请输入年龄" type="number"></el-input>
        </div>

        <div>
          <span>电话</span>
          <el-input v-model="user.tel" placeholder="请输入电话"></el-input>
        </div>

        <div>
          <span>资格认证</span>
          <div class="renzheng">
            <el-checkbox-group v-model="user.qualification">
              <el-checkbox v-for="(item,index) in checkList" :key="index" :label="item"></el-checkbox>
            </el-checkbox-group>
          </div>
        </div>

        <div>
          <span>服务项目</span>
          <el-checkbox-group v-model="user.type">
            <el-checkbox v-for="(item,index) in checkList123" :key="index" :label="item"></el-checkbox>
          </el-checkbox-group>
        </div>

        <div>
          <span>学历</span>
          <!-- {{value}} -->
          <el-select v-model="user.edu" placeholder="请选择">
            <el-option v-for="item in options1" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </div>

        <div>
          <span>工作年限</span>
          <el-input v-model="user.year" placeholder="请输入工作年限 eg:3年" type="number"></el-input>
        </div>

        <div>
          <span>级别</span>
          <el-input v-model="user.vNum" placeholder="请输入级别 eg:V7"></el-input>
        </div>

        <div>
          <span>价格</span>
          <el-input v-model="user.price" placeholder="请输入价格 eg:30元/小时"></el-input>
        </div>

        <div>
          <span>城市</span>
          <el-input v-model="user.city" placeholder="请输入城市 eg:武汉"></el-input>
        </div>

        <div>
          <span>经验</span>
          <el-input v-model="user.experience" placeholder="请输入经验 eg:3年"></el-input>
        </div>

        <div>
          <span>点赞数量</span>
          <el-input v-model="user.readNum" placeholder="点赞数量" type="number"></el-input>
        </div>

        <div>
          <span>关注人数</span>
          <el-input v-model="user.likeNum" placeholder="关注人数" type="number"></el-input>
        </div>

        <div>
          <span>距离</span>
          <el-input v-model="user.len" placeholder="请输入距离 eg:2.4km"></el-input>
        </div>

        <div>
          <span>自我评价</span>
          <el-input v-model="user.info" placeholder="请输入自我评价"></el-input>
        </div>

        <div>
          <span>免冠照片</span>
          <el-input v-model="user.img" placeholder="请添加免冠照片"></el-input>
          <!-- <el-upload action="#" list-type="picture-card" :auto-upload="false">
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
          </el-upload>-->
        </div>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible=false">取 消</el-button>
          <el-button type="primary" @click="quedingpeple(user.id)">{{btn}}</el-button>
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
      btn: "确 定",
      activeName: "first",
      tablepeple: [], //家政人员
      dialogFormVisible: false,
      options: [], //搜索input框
      value1: "",
      options1: ["小学", "初中", "高中", "大学", "硕士", "博士"], //添加
      checkList: [], //人员资格证书
      checkList123: [], //家政服务类型
      value: "",
      user: {
        img: "",
        name: "",
        age: "",
        edu: "",
        year: "",
        vNum: "",
        price: "",
        city: "",
        experience: "",
        readNum: "",
        likeNum: "",
        len: "",
        tel: "",
        info: "",
        qualification: [],
        type: []
      }
    };
  },
  mounted() {
    this.infopeople(); //家政人员渲染

    this.$axios({
      url: API.getQualification
    }).then(rst => {
      // this.user.qualification = rst.data.qualification;
      this.checkList = rst.data.qualification;
    }); //获取人员资格证书

    this.$axios({
      url: API.getHomeType
    }).then(rst => {
      this.options = rst.data.type;
      this.checkList123 = rst.data.type;
    }); //获取家政服务类型
  },
  methods: {
    infopeople() {
      this.$axios({
        url: API.findHomeWorker
      }).then(rst => {
        if (rst.data.isok) {
          this.tablepeple = rst.data.data;
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
            url: API.delHomeWorker,
            params: { id: id }
          });

          this.infopeople();
        })

        .catch(err => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    delpeple(id) {
      this.$axios({
        url: API.findHomeWorker,
        params: { id: id }
      });

      this.yangshi(id);
    },
    tianjia() {
      this.dialogFormVisible = true;
      this.user = {
        img: "",
        name: "",
        age: "",
        edu: "",
        year: "",
        vNum: "",
        price: "",
        city: "",
        experience: "",
        readNum: "",
        likeNum: "",
        len: "",
        tel: "",
        info: "",
        qualification: [],
        type: []
      };
    },
    quedingpeple(id) {
      if (id == undefined) {
        this.$axios({
          url: API.addHomeWorker,
          params: this.user
        })
          .then(rst => {
          

            if (rst.data.isok) {
              this.dialogFormVisible = false;
              this.$message({ type: "success", message: rst.data.info });
              this.infopeople();
            } else {
              this.$message({ type: "info", message: rst.data.info });
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
       var tel = /^[1]([3-9])[0-9]{9}$/;
       if (!tel.test(this.user.tel)) {
          alert("手机号格式不正确")
          return
       }
        this.$axios({
          url: API.updateHomeWorker,
          params: this.user
        }).then(rst => {
          if (rst.data.isok) {
            this.$message({ type: "success", message: rst.data.info });
            this.infopeople();
            this.dialogFormVisible = false;
          }
        });
      }

    },
    chakan(id) {
      this.$axios({
        url: API.findHomeWorker,
        params: { id: id }
      }).then(rst => {
        this.user = rst.data.data[0];
        //  console.log(typeof(this.user.type));
        this.user.type = JSON.parse(this.user.type);
        this.user.qualification = JSON.parse(this.user.qualification);

        this.dialogFormVisible = true;
        this.btn = "修 改";
      });
    }
  },

  watch: {
    value() {
      this.$axios({
        url: API.findHomeWorker,
        params: { type: this.value }
      }).then(rst => {
        this.tablepeple = rst.data.data;
      });
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

.el-input, .el-checkbox-group, .el-select {
  width: 80%;
  margin: 10px auto;
  text-align: left;
  line-height: 50px;
  // float left
}

span {
  width: 100px;
  text-align: left;
  // height 50px
  display: inline-block;
  // line-height: 70px;
  font-size: 16px;
  vertical-align: middle;
}
</style>