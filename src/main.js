import Vue from 'vue'
import App from './App.vue'

// 导入路由
import router from './router.js'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 挂载到vue上
  router
}).$mount('#app')
