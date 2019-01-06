import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 引入axios
import axios from 'axios'
// 引入qs
import qs from 'qs'

// 将axios与qs挂在原型上
Vue.prototype.axios = axios;
Vue.prototype.qs = qs;

Vue.config.productionTip = false
// 全局守卫  来拦截cookie不存在的用户
router.beforeEach((to,from,next) => {
  axios.defaults.withCredentials = true;
  axios.get("http://172.16.4.225:9090/getcookie")
  .then(success => {
    let result = success.data;
    if(result.code || to.path==="/login"){
      // 放行
      next();
    }else{
      // 返回去登录页面
      next("/login");
    }
  })
  .catch(err =>{
    throw err;
  })
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');

