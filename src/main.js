import Vue from "vue";
import App from "./App.vue";
import "./assets/base.scss";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

// 导入路由
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8888/api/private/v1/";
Vue.prototype.$axios = axios;

Vue.use(ElementUI);
// 导入路由
import router from "./router.js";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  // 挂载到vue上
  router
}).$mount("#app");
