import Vue from "vue";
import App from "./App.vue";
import "./assets/base.scss";
// 引入echarts

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

// 导入myaxios
import myaxios from './myaxios.js'
// 要use一下
Vue.use(myaxios);
// 注册全局组件
import mybreak from './components/mybreak.vue'
Vue.component('my-bread',mybreak)

// 全局过滤器
Vue.filter('formatTime', function (value,formatTime) {
 return 
  
})

// 导入路由
import router from "./router.js";



new Vue({
  // ...
})


Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  // 挂载到vue上
  router
}).$mount("#app");
