import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// 导入路由
import router from './router.js'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 挂载到vue上
  router
}).$mount('#app')
