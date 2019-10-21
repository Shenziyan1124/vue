<template>
  <div class="left">
    <router-link to="/index/admin" active-class="select">管理员管理</router-link>
    <router-link to="/index/banner" active-class="select">banner管理</router-link>
    <router-link to="/index/tacher" active-class="select">家教管理</router-link>
    <router-link to="/index/water" active-class="select">水站管理</router-link>
    <router-link to="/index/maintain" active-class="select">家政管理</router-link>
    <router-link to="/index/housekeeping" active-class="select">维修管理</router-link>
    <router-link to="/index/modifier" active-class="select">修改密码</router-link>
  </div>
</template>
<script>
import API from "../../common/js/API";
export default {};
</script>
<style scoped lang="stylus">
@import '../../common/stylus/index.styl';

.left {
  height: 100%;
  width: 150px;
  background: #cccccc;
  text-align: center;

  a {
    display: block;
    font-size: 16px;
    color: #fff;
    line-height: 40px;
  }
}

.select {
  background: #388E8E;
}
</style>