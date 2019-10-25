<template>
  <div class="left">
    <router-link to="/index/admin" active-class="select" v-if="admin==0">管理员管理</router-link>
    <router-link to="/index/banner" active-class="select" v-if="admin==!0">banner管理</router-link>
    <router-link to="/index/tacher" active-class="select" v-if="admin==!0">家教管理</router-link>
    <router-link to="/index/water" active-class="select" v-if="admin==!0"> 水站管理</router-link>
    <router-link to="/index/maintain" active-class="select" v-if="admin==!0">维修管理</router-link>
    <router-link to="/index/housekeeping" active-class="select" v-if="admin==!0">家政管理</router-link>
    <router-link to="/index/modifier" active-class="select" v-if="admin==!0">修改密码</router-link>
  </div>
</template>
<script>
import API from "../../common/js/API";
export default {
   data() {
     return {
      admin:sessionStorage.getItem("type")
     }
   },
};
</script>
<style scoped lang="stylus">
@import '../../common/stylus/index.styl';

.left {
  height: 100%;
  width: 150px;
  background: #4A708B
  text-align: center;

  a {
    display: block;
    font-size: 16px;
    color #fff
    line-height: 40px;
  }
  a:hover{
    background 	#CD5B45
    border-radius 20px
  }
}

.select {
  background:	#FF7256
  border-radius 20px
 
}
</style>