// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//axios
import axios from "axios"
Vue.prototype.$axios = axios;


//重置样式
import "./assets/css/base.css"

//UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// //vuex
// import Vuex from 'vuex'
// Vue.use(Vuex)
import store from "./store/index"

//filter过滤器
import Filter from "./filter/index"
for(var i in Filter){  
  Vue.filter(i,Filter[i])
}

import common from "./components/common/index"
for(var a in common){
    Vue.component(a, common[a])
}




Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
