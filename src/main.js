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
// 高德地图
import AMap from 'vue-amap'
Vue.use(AMap)
// 初始化地图
AMap.initAMapApiLoader({
  // 高德的key
  key: '3ab4f8834420771a249ceb40dd2edfb3',
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor']
})

Vue.config.productionTip = false

Vue.prototype.axios = $axios; // axios原生调用
Vue.prototype.$axios = axios; // axiosServer.js接口调用
Vue.prototype.beforeAvatarUpload = function (file) { // 上传图片大小限制
  const fileSize = file.size / 1024 < 513;
  if (!fileSize) {
    this.$message.error('上传图片大小不能超过512KB!');
  }
  return fileSize;
};
Vue.prototype.formatDate = function (now) { // 时间戳转换
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let date = now.getDate();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();
  if (month < 10) {
    month = '0' + month;
  };
  if (date < 10) {
    date = '0' + date;
  };
  if (hour < 10) {
    hour = '0' + hour;
  };
  if (minute < 10) {
    minute = '0' + minute;
  };
  if (second < 10) {
    second = '0' + second;
  };
  return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
};
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
