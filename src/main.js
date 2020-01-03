// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import * as axios from '@/assets/axiosServer.js'
import $axios from 'axios';
import './icons'

Vue.config.productionTip = false

Vue.prototype.axios = $axios; // axios原生调用
Vue.prototype.$axios = axios; // axiosServer.js接口调用
Vue.prototype.beforeAvatarUpload = function (file) { // 上传图片大小限制
  const fileSize = file.size / 1024 < 513;
  if (!fileSize) {
    this.$message.error('上传图片大小不能超过512KB!');
  }
  return fileSize;
}
Vue.prototype.checkLogin = function () { // 检查登录状态
  sessionStorage.clear();
  this.$router.push({
    path: "/"
  });
};
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})

// 请求拦截器
// $axios.interceptors.request.use(res => {
//   res.headers.common['token'] = sessionStorage.getItem('token') || ''
//   return res;
// });
