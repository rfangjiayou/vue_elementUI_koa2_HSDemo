// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App';

import router from './router';
import VueRouter from 'vue-router';

import Axios from 'axios';
import qs  from 'qs';

Vue.use(ElementUI);
Vue.use(VueRouter);

// Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$axios = Axios;
Vue.prototype.$qs = qs;


Vue.config.productionTip = false

require('./assets/js/main.js')

router.beforeEach((to, from, next) => {
    /* var user = store.state.user;
    if (user && user.token) { // 判断是否有token
      if (to.meta.roles && to.meta.roles.indexOf(user.role) === -1) {//页面有权限要求但用户不符合
          alert('403')
          if(from.path == '/login'){
              next('/')
          }else{
              next({path: from.path})
          }
      } else {//页面没有权限要求就直接访问
          next()
      }
    } else if(to.path != '/login'){//没有token的话让跳转到登录页，并传递当前准备访问的路由
        next({path:'/login', query: {redirect: to.fullPath}})
    } else{
        next()
    } */
    console.log('sss');
    next()
});

// axios 请求拦截器处理请求数据
Axios.interceptors.request.use((config) => {
    let token = localStorage.getItem('token');
    config.headers.common['Authorization'] = 'Bearer ' + token;
    return config;
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    render: h => h(App),
    router
    /* components: { App },
    template: '<App/>' */
})
