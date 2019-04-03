// 导入axios
import axios from "axios";
import router from "./router";

export default {
  install(Vue) {
    axios.defaults.baseURL = "http://localhost:8888/api/private/v1/";
    Vue.prototype.$axios = axios;

    // 请求拦截
    axios.interceptors.request.use(
      function(config) {
        // Do something before request is sent

        // 添加请求头
        config.headers.Authorization = window.sessionStorage.getItem("token");
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
        // 非法token判断
        if(response.data.meta.msg==='无效token'&&response.data.meta.status===400){
          // 打回登录页
          Vue.prototype.$message.warning('伪造token,请回登录页')
          // 删除伪造的token
          window.sessionStorage.removeItem('token')
          // 去登录页
          router.push('/login')
          return
        }
        if ([200, 201, 204].indexOf(response.data.meta.status) != -1) {
          Vue.prototype.$message.success(response.data.meta.msg);
        } else {
          Vue.prototype.$message.warning(response.data.meta.msg);
        }
        return response;
      },
      function(error) {
        // Do something with response error
        return Promise.reject(error);
      }
    );
  }
};
