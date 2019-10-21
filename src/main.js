// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//重置样式
import "./assets/css/base.css"

//axios
import axios from "axios"
Vue.prototype.$axios = axios;

//filter过滤器
import Filter from "./filter/index"
for(var i in Filter){
  Vue.filter(i, Filter[i])
}




Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
