<template>
  <div>
    <h1>{{$route.name}}</h1>
    <!-- <div class="btn"> <el-button @click="isok=true">添加</el-button></div> -->
    <v-pop :isok="isok"></v-pop>

    <div class="wrap">
      <el-table :data="d" height="250" border style="width: 100%">
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
            <el-button type="primary" @click="handleClick(scope.row)" size="small">查看</el-button>
            <el-button type="danger" @click="del(scope.row.id)" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      

    </div>
  </div>
</template>
<script>
import API from "../common/js/API";
import {mapGetters,mapActions} from 'vuex'
export default {
  data() {
    return {
      d: [],
      isok: true,
      user:[]
    };
  },
  mounted() {
    this.info();
  },
  methods: {
    info() {
      this.$axios({
        url: API.findManage,
        method: "post"
      }).then(rst => {
        if (rst.data.isok) {
          this.d = rst.data.data;
        }
      });
    },
    handleClick(a) {
      this.$axios({
        url: API.findManage,
        method: "post",
        data: { id: a.id }
      }).then(rst => {
        console.log(rst);
        
        if (rst.data.isok) {
         
          this.$store.dispatch("changeName",this.dialogFormVisible=true)

          this.$store.dispatch("changeId",rst.data.data[0])

        //   console.log(this.$store.state);
          
          
        }
      });
    },
    del(id) {
      this.$axios({
        url: API.delManage,
        method: "post",
        data: { id: id }
      });

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

};
</script>
<style scoped lang="stylus">
@import '../common/stylus/index.styl';

h1 {
  font-size: 30px;
  color: $skybule;
  padding-left: 10px;
}

.btn {
  margin-left: 10px;
}

.wrap {
  margin: 0 auto;
  width: 80%;
}
</style>