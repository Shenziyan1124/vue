import Vue from 'vue'
import Router from 'vue-router'

import index from "../pages/index.vue";
import login from "../pages/login.vue";
import welcome from "../pages/welcome.vue";

import admin from "../pages/admin.vue";
import banner from "../pages/banner.vue"; //banner

import tacher from "../pages/teacher.vue"; //teach
import water from "../pages/water.vue"; //水站管理
import maintain from "../pages/maintain.vue"; //维修管理
import housekeeping from "../pages/housekeeping.vue"; //家政服务
import modifier from "../pages/modifier.vue";//修改密码


Vue.use(Router)

export default new Router({
  routes: [
     {
       path:"/index",
       component:index,
       children:[
         {
           path:"welcome",
           component:welcome
         },
         {
           path:"admin",
           component:admin,
           name:"管理员管理"
         },
         {
          path:"banner",
          component:banner,
          name:"banner管理"
         },
         {
          path:"tacher",
          component:tacher,
          name:"家教管理"
         },
         {
          path:"water",
          component:water,
          name:"水站管理"
         },
         {
          path:"maintain",
          component:maintain,
          name:"维修管理"
         },
         {
          path:"housekeeping",
          component:housekeeping,
          name:"家政管理"
         },
         {
          path:"modifier",
          component:modifier,
          name:"修改密码"
         },
         {
           path:"",
           component:welcome
         }
       ]
     },
     {
       path :"/login",
       component:login
     },
     {
       path:"*",
       component:login
     }
  ]
})
