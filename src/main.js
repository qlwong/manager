import Vue from "vue";
import App from "./App.vue";
import "./assets/base.scss";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

// 请求拦截
axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// 响应拦截
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);
// 导入路由
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8888/api/private/v1/";
Vue.prototype.$axios = axios;


// 导入路由
import router from "./router.js";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  // 挂载到vue上
  router
}).$mount("#app");
